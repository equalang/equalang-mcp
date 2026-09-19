# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · **Deutsch** · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[Website](https://equalang.com) · [Preise](https://equalang.com/pricing) · [Entwicklerdokumentation](https://equalang.com/developers) · [API-Schlüssel](https://equalang.com/api-keys)

> **Stichwörter:** pdf übersetzen, pdf übersetzer, pdf übersetzen layout beibehalten, dokumente übersetzen, word dokument übersetzen, docx übersetzen, powerpoint übersetzen, excel übersetzen, epub übersetzen, untertitel übersetzen, srt übersetzen, bild übersetzen, text im bild übersetzen, video übersetzen, audio transkribieren, sprache in text, ki übersetzer, mcp server, model context protocol, claude mcp, cursor mcp, translation api

**Datei übersetzen, Layout behalten.** Ein MCP-Server für [Equalang](https://equalang.com) – einen KI-Übersetzer, der mit ganzen Dateien arbeitet: Ein PDF kommt als PDF zurück, eine Präsentation als Präsentation, Tabellen, Bilder und Formeln bleiben, wo sie waren. Er übersetzt außerdem Untertitel und Bilder, macht aus Audio und Video übersetzte Untertitel oder ein Transkript und übersetzt Strings in großen Mengen. Läuft in Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code und jedem anderen MCP-Client.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Funktionen

- **Format rein, Format raus** – PDF, DOCX, PPTX, XLSX, EPUB, HTML und TXT kommen im selben Format zurück, weiterhin bearbeitbar, Tabellen, Bilder, Formeln und Seitenlayout an ihrem Platz
- **Untertitel und Bilder** – SRT und VTT behalten ihr Timing, auf Wunsch mit der Originalzeile über der Übersetzung; JPG, PNG, WebP und BMP kommen mit übersetztem Text im Bild zurück
- **Audio und Video** – aus MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM und MKV werden übersetzte Untertitel oder ein Transkript in der gesprochenen Sprache (SRT, VTT, TXT, JSON)
- **Text in großen Mengen** – einzelne Strings, in ihrer Reihenfolge übersetzt, oder ein langer Text (bis zu 100.000 Zeichen), den Equalang selbst an Satzgrenzen teilt; über 100 Sprachen für Text, 12 für Dateien
- **Ganze Dateien, kein Copy-and-paste** – bis zu 100 MB pro Datei, von einem Pfad oder einer öffentlichen URL; nichts, was man auf Textfelder aufteilen müsste
- **Kostet keine Tokens** – der Agent übergibt einen Pfad oder eine URL und bekommt Pfade zurück; ein 300-seitiges PDF gelangt nie in die Unterhaltung
- **Der Preis vor dem Auftrag** – `estimate_cost` nennt kostenlos den Höchstbetrag, den ein Auftrag kosten kann; fehlgeschlagene und abgebrochene Aufträge kosten nichts; eine Aufnahme wird nach der tatsächlich gehörten Sprache berechnet; Credits verfallen nie

## Schlüssel holen

Registriere dich unter <https://equalang.com> und erstelle einen Schlüssel unter <https://equalang.com/api-keys>. Neue Konten starten mit kostenlosen Credits – genug, um ein Dokument durchlaufen zu lassen und zu sehen, was zurückkommt.

Der Schlüssel gehört in eine Umgebungsvariable in der Konfiguration des MCP-Clients, nie in eine URL. Er wird nur einmal angezeigt; Equalang speichert lediglich einen Hash davon. Ohne Schlüssel startet der Server trotzdem und listet seine Tools auf; ein Tool, das den Schlüssel braucht, antwortet mit dem Hinweis, wie man einen bekommt.

## Installation

Benötigt Node 18 oder neuer.

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

`-s user` macht ihn in jedem Projekt verfügbar; der Standard-Scope `local` lädt den Server nur in dem Verzeichnis, in dem der Befehl ausgeführt wurde.
</details>

<details>
<summary><b>OpenAI Codex</b></summary>

```bash
codex mcp add equalang --env EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```
</details>

<details>
<summary><b>Claude Desktop, Cursor, Windsurf, Cline und andere per JSON konfigurierte Clients</b></summary>

Füge das in die MCP-Konfiguration des Clients ein – `claude_desktop_config.json`, `~/.cursor/mcp.json`, `~/.codeium/windsurf/mcp_config.json` oder die Datei, die dein Client dokumentiert:

```json
{
  "mcpServers": {
    "equalang": {
      "command": "npx",
      "args": ["-y", "@equalang/mcp"],
      "env": { "EQUALANG_API_KEY": "el_your_key" }
    }
  }
}
```
</details>

<details>
<summary><b>VS Code</b></summary>

```bash
code --add-mcp '{"name":"equalang","command":"npx","args":["-y","@equalang/mcp"],"env":{"EQUALANG_API_KEY":"el_your_key"}}'
```
</details>

Lieber ein Skill? [equalang-skill](https://github.com/equalang/equalang-skill) bietet dieselben Operationen als Agent Skill an – ein einziges Python-Skript, nichts zu installieren.

## Tools

| Tool | Was es tut |
| --- | --- |
| `translate_file` | Übersetzt eine Datei (Pfad oder öffentliche URL) in eine andere Sprache und speichert das Ergebnis daneben. |
| `transcribe_recording` | Schreibt auf, was in einer Audio- oder Videodatei gesagt wird, als Text mit Zeitmarken (SRT, VTT, TXT, JSON). |
| `translate_text` | Übersetzt einzelne Strings, in ihrer Reihenfolge – oder einen langen Text, den Equalang selbst an Satzgrenzen teilt. |
| `estimate_cost` | Lädt eine Datei hoch, ohne etwas zu starten; antwortet mit dem Höchstbetrag, den ein Auftrag damit kosten kann, und einer `file_id`, die den Auftrag ohne zweiten Upload startet. Kostenlos. |
| `check_job` | Nimmt einen Auftrag wieder auf und speichert seine Ergebnisse, sobald er fertig ist. |
| `cancel_job` | Stoppt einen wartenden oder laufenden Auftrag. Ein abgebrochener Auftrag wird nicht berechnet. |
| `get_credit_balance` | Die Credits des Kontos. |
| `list_languages` | Sprachcodes und -namen, aus der Live-API gelesen. Braucht keinen Schlüssel. |

## Vier Dinge, die man wissen sollte

**Sprachen.** Codes sehen aus wie `en`, `zh-CN`, `ja`. In dieses Paket ist keine Liste eingebaut: `list_languages` liest Codes und Namen aus der Live-API (für Dateien weniger als für Text), sodass eine Sprache, die Equalang hinzufügt, ohne Update verfügbar ist. Lass die Quellsprache weg, damit sie erkannt wird.

**Credits.** Arbeit verbraucht die Credits des Kontos – dasselbe Guthaben wie auf der Website –, daher weist der Server das Modell an, zuerst die Kosten zu nennen und die Zustimmung einzuholen; die Zahl dafür liefert `estimate_cost`.

**Aufträge dauern Minuten.** Ein Tool wartet auf seinen Auftrag, aber nicht länger, als ein Client einem Aufruf zugesteht (standardmäßig 50 s, `wait_seconds` bis 240). Danach bekommt das Modell die Auftrags-ID und die Anweisung, `check_job` aufzurufen, das die Ergebnisse dort speichert, wo sie hingehören.

**Limits.** Bis zu 100 MB pro Datei; `translate_text` nimmt bis zu 50 Texte mit je 5.000 Zeichen (20.000 pro Aufruf) oder einen Text mit bis zu 100.000.

## Häufige Fragen

**Behält das übersetzte PDF sein Layout?**
Ja – genau darum geht es. Der Text wird dorthin zurückgesetzt, wo er war, und Tabellen, Bilder und Formeln bleiben an ihrem Platz; ein DOCX, PPTX oder XLSX bleibt bearbeitbar.

**Wird mein Dokument an das Modell geschickt?**
Nein. Der Server lädt die Datei zu Equalang hoch und antwortet mit einem Pfad. Ein 300-seitiges Paper kostet keine Tokens.

**Kann er den Text in einem Bild übersetzen?**
Ja. Text in einem JPG, PNG, WebP oder BMP wird erkannt, übersetzt und wieder ins Bild gezeichnet.

**Was kostet ein Auftrag?**
Das sagt `estimate_cost`, bevor irgendetwas startet, und zwar kostenlos. Die Preise stehen unter <https://equalang.com/pricing>.

## Wie er gebaut ist

Drei Entscheidungen, jede mit einem Grund:

1. **Eine Datei läuft nie durch das Modell.** MCP kennt keinen Dateityp, und ein 5-MB-PDF in einem Tool-Ergebnis kostet ein Vermögen an Kontext, ohne etwas zu sagen. Ein Tool nimmt entgegen, *wo eine Datei liegt* – ein absoluter Pfad auf diesem Rechner oder eine öffentliche `http(s)`-URL – und antwortet damit, *wohin die Ergebnisse geschrieben wurden*. Eine URL wird an Equalang weitergereicht, das sie selbst abruft; nichts wird hier heruntergeladen, nur um wieder hochgeladen zu werden.
2. **Ein Auftrag lebt innerhalb eines Tool-Aufrufs.** Eine Auftrags-ID zurückzugeben und darauf zu vertrauen, dass das Modell pollt, ergibt eine Schleife, die auf halbem Weg aufgegeben wird. Das Tool wartet – es pausiert zwischen den Abfragen so lange, wie das `Retry-After` der API verlangt, und meldet den Fortschritt an einen Client, der darum gebeten hat – aber nicht länger, als ein Client einem Aufruf zugesteht (standardmäßig 50 s, `wait_seconds` bis 240). Danach bekommt das Modell die ID und die Anweisung, `check_job` aufzurufen; der Server merkt sich, wohin die Ergebnisse dieses Auftrags gehören.
3. **Die Antworten der API werden wiedergegeben, nicht erraten.** Ob ein Fehler wiederholt werden kann, sagt das `retryable` der API, nicht eine Deutung von Statuscodes. Was ein Auftrag kosten kann, sagt das `quote` der API, nicht ein in dieses Paket kopierter Tarif. Die Sprachliste wird aus dem OpenAPI-Dokument der API gelesen. Eine Anfrage, die einen Auftrag anlegt, trägt über die eigenen Wiederholungen dieses Clients hinweg einen einzigen `Idempotency-Key`, sodass aus einer verlorenen Antwort kein zweiter, berechneter Auftrag werden kann.

Eine Antwort wird zweimal gegeben – als Text für jeden Client und als `structuredContent` für die, die es lesen – und jede geschriebene Datei wird zusätzlich als `resource_link` genannt; so sagt MCP „hier ist eine Datei“, ohne ihre Bytes mitzuführen. Was für jedes Tool gilt (Pfade rein, Pfade raus, vor dem Ausgeben fragen), steht einmal in den `instructions` des Servers. Ergebnisse überschreiben nie: Ein vergebener Name bekommt ` (1)`. Relative Pfade werden abgelehnt – dieser Prozess teilt nicht das Arbeitsverzeichnis des Agenten.

## Entwicklung

```bash
npm install && npm run build
node selftest.mjs                                          # Protokoll, Tool-Liste, das Tool ohne Schlüssel
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # und echte Aufträge (verbraucht Credits)
node check-api.mjs                                         # Pfade, Felder und was die Tool-Beschreibungen versprechen, gegen den Live-Vertrag der API
```

`EQUALANG_BASE_URL` richtet den Server auf ein anderes Deployment aus.

## Links

- [Equalang](https://equalang.com) · [Preise](https://equalang.com/pricing) · [Entwicklerdokumentation](https://equalang.com/developers)
- API für Agenten: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) – dieselben Operationen als Agent Skill
- Fragen: <support@equalang.com>

## Lizenz

[Apache-2.0](../LICENSE) © Equalang
