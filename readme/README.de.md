# Equalang MCP-Server

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · **Deutsch** · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

Gib einem Agenten [Equalang](https://equalang.com): ganze Dateien mit erhaltenem Layout übersetzen, Aufnahmen transkribieren, Strings übersetzen.

- **Dokumente** - PDF, DOCX, PPTX, XLSX, EPUB, HTML, TXT - kommen im selben Format zurück, Tabellen, Bilder und Formeln bleiben an ihrem Platz.
- **Untertitel** (SRT, VTT) und **Bilder** (JPG, PNG, WebP, BMP).
- **Audio und Video** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM, MKV - kommen als übersetzte Untertitel zurück oder als Transkript in der gesprochenen Sprache.

Der Agent übergibt einen Pfad oder eine URL und bekommt Pfade zurück. Dateiinhalte gelangen nie in die Unterhaltung.

## Installation

Erstelle einen Schlüssel unter <https://equalang.com/api-keys> und füge den Server dann deinem Client hinzu:

```json
{
  "mcpServers": {
    "equalang": {
      "command": "npx",
      "args": ["-y", "@equalang/mcp"],
      "env": { "EQUALANG_API_KEY": "el_..." }
    }
  }
}
```

Claude Code: `claude mcp add --transport stdio equalang --env EQUALANG_API_KEY=el_... -- npx -y @equalang/mcp`  
Codex: `codex mcp add equalang --env EQUALANG_API_KEY=el_... -- npx -y @equalang/mcp`

Benötigt Node 18 oder neuer. Ohne Schlüssel startet der Server trotzdem und listet seine Tools auf; ein Tool, das den Schlüssel braucht, antwortet mit dem Hinweis, wie man einen bekommt.

## Tools

| Tool | Was es tut |
| --- | --- |
| `translate_file` | Übersetzt eine Datei (Pfad oder öffentliche URL) in eine andere Sprache und speichert das Ergebnis daneben. |
| `transcribe_recording` | Schreibt auf, was in einer Audio- oder Videodatei gesagt wird, als Text mit Zeitmarken (SRT, VTT, TXT, JSON). |
| `translate_text` | Übersetzt bis zu 50 kurze Klartexte, in ihrer Reihenfolge. |
| `estimate_cost` | Lädt eine Datei hoch, ohne etwas zu starten; antwortet mit dem Höchstbetrag, den ein Auftrag damit kosten kann, und einer `file_id`, die den Auftrag ohne zweiten Upload startet. Kostenlos. |
| `check_job` | Nimmt einen Auftrag wieder auf und speichert seine Ergebnisse, sobald er fertig ist. |
| `cancel_job` | Stoppt einen wartenden oder laufenden Auftrag. Ein abgebrochener Auftrag wird nicht berechnet. |
| `get_credit_balance` | Die Credits des Kontos. |
| `list_languages` | Sprachcodes und -namen, aus der Live-API gelesen. Braucht keinen Schlüssel. |

**Credits.** Arbeit verbraucht die Credits des Kontos - dasselbe Guthaben wie auf der Website -, daher weist der Server das Modell an, zuerst die Kosten zu nennen und die Zustimmung einzuholen; die Zahl dafür liefert `estimate_cost`. Eine Aufnahme wird nach der tatsächlich gehörten Sprache berechnet und kostet deshalb meist weniger als die Schätzung.

**Sprachen.** Codes sehen aus wie `en`, `zh-CN`, `ja`. In dieses Paket ist keine Liste eingebaut: `list_languages` liest Codes und Namen aus der Live-API (für Dateien weniger als für Text), sodass eine Sprache, die Equalang hinzufügt, ohne Update verfügbar ist. Lass die Quellsprache weg, damit sie erkannt wird.

**Formate und Limits.** Die oben genannten Formate, bis zu 100 MB pro Datei; `translate_text` nimmt bis zu 50 Texte mit je 5,000 Zeichen, 20,000 Zeichen pro Aufruf.

## Wie er gebaut ist

Drei Entscheidungen, jede mit einem Grund:

1. **Eine Datei läuft nie durch das Modell.** MCP kennt keinen Dateityp, und ein 5-MB-PDF in einem Tool-Ergebnis kostet ein Vermögen an Kontext, ohne etwas zu sagen. Ein Tool nimmt entgegen, *wo eine Datei liegt* - ein absoluter Pfad auf diesem Rechner oder eine öffentliche `http(s)`-URL - und antwortet damit, *wohin die Ergebnisse geschrieben wurden*. Eine URL wird an Equalang weitergereicht, das sie selbst abruft; nichts wird hier heruntergeladen, nur um wieder hochgeladen zu werden.
2. **Ein Auftrag lebt innerhalb eines Tool-Aufrufs.** Eine Auftrags-ID zurückzugeben und darauf zu vertrauen, dass das Modell pollt, ergibt eine Schleife, die auf halbem Weg aufgegeben wird. Das Tool wartet - es pausiert zwischen den Abfragen so lange, wie das `Retry-After` der API verlangt, und meldet den Fortschritt an einen Client, der darum gebeten hat - aber nicht länger, als ein Client einem Aufruf zugesteht (standardmäßig 50 s, `wait_seconds` bis 240). Danach bekommt das Modell die ID und die Anweisung, `check_job` aufzurufen; der Server merkt sich, wohin die Ergebnisse dieses Auftrags gehören.
3. **Die Antworten der API werden wiedergegeben, nicht erraten.** Ob ein Fehler wiederholt werden kann, sagt das `retryable` der API, nicht eine Deutung von Statuscodes. Was ein Auftrag kosten kann, sagt das `quote` der API, nicht ein in dieses Paket kopierter Tarif. Die Sprachliste wird aus dem OpenAPI-Dokument der API gelesen. Eine Anfrage, die einen Auftrag anlegt, trägt über die eigenen Wiederholungen dieses Clients hinweg einen einzigen `Idempotency-Key`, sodass aus einer verlorenen Antwort kein zweiter, berechneter Auftrag werden kann.

Eine Antwort wird zweimal gegeben - als Text für jeden Client und als `structuredContent` für die, die es lesen - und jede geschriebene Datei wird zusätzlich als `resource_link` genannt; so sagt MCP „hier ist eine Datei“, ohne ihre Bytes mitzuführen. Was für jedes Tool gilt (Pfade rein, Pfade raus, vor dem Ausgeben fragen), steht einmal in den `instructions` des Servers. Ergebnisse überschreiben nie: ein vergebener Name bekommt ` (1)`. Relative Pfade werden abgelehnt - dieser Prozess teilt nicht das Arbeitsverzeichnis des Agenten.

## Entwicklung

```bash
npm install && npm run build
node selftest.mjs                                          # Protokoll, Tool-Liste, das Tool ohne Schlüssel
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # und echte Aufträge (verbraucht Credits)
node check-api.mjs                                         # Pfade, Felder und was die Tool-Beschreibungen versprechen, gegen den Live-Vertrag der API
```

`EQUALANG_BASE_URL` richtet den Server auf ein anderes Deployment aus. Die API selbst: <https://equalang.com/llms.txt>.

Apache-2.0.
