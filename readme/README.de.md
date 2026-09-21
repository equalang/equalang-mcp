# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · **Deutsch** · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[Website](https://equalang.com) · [Preise](https://equalang.com/pricing) · [Entwicklerdokumentation](https://equalang.com/developers) · [API-Schlüssel](https://equalang.com/api-keys)

> **Stichwörter:** pdf übersetzen, pdf übersetzer, pdf übersetzen layout beibehalten, dokumente übersetzen, word dokument übersetzen, docx übersetzen, powerpoint übersetzen, excel übersetzen, epub übersetzen, untertitel übersetzen, srt übersetzen, bild übersetzen, text im bild übersetzen, video übersetzen, audio transkribieren, sprache in text, ki übersetzer, mcp server, model context protocol, claude mcp, cursor mcp, translation api

**Datei übersetzen, Layout behalten.** Ein MCP-Server für [Equalang](https://equalang.com) – einen KI-Übersetzer, der mit ganzen Dateien arbeitet: Ein PDF kommt als PDF zurück, eine Präsentation als Präsentation, Tabellen, Bilder und Formeln bleiben, wo sie waren. Er übersetzt außerdem Untertitel und Bilder, macht aus Audio und Video übersetzte Untertitel oder ein Transkript und übersetzt kurze Texte in großen Mengen. Läuft in Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code und jedem anderen MCP-Client.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Beispielanfragen

- „Übersetze ~/Documents/contract.pdf ins Deutsche und behalte das Layout bei.“
- „Übersetze pitch-deck.pptx ins Englische und Französische.“
- „Übersetze https://example.com/whitepaper.pdf ins Deutsche und speichere es in ~/Downloads.“
- „Was würde es kosten, thesis.docx ins Englische zu übersetzen?“
- „Erstelle deutsche Untertitel für interview.mp4, mit der Originalzeile über jeder Übersetzung.“
- „Transkribiere standup.m4a mit Zeitstempeln.“
- „Übersetze den Text in menu.jpg ins Deutsche.“
- „Übersetze die Texte in locales/en.json ins Französische, Spanische und Italienische.“

## Funktionen

- **Dokumente** – PDF, DOCX, PPTX, XLSX, EPUB, HTML und TXT kommen im selben Format zurück, weiterhin bearbeitbar, Tabellen, Bilder, Formeln und Seitenlayout an ihrem Platz
- **Untertitel und Bilder** – SRT und VTT behalten ihr Timing, auf Wunsch mit der Originalzeile über der Übersetzung; JPG, PNG, WebP und BMP kommen mit übersetztem Text im Bild zurück
- **Audio und Video** – aus MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM und MKV werden übersetzte Untertitel oder ein Transkript in der gesprochenen Sprache (SRT, VTT, TXT, JSON)
- **Text in großen Mengen** – kurze Texte, in ihrer Reihenfolge übersetzt, oder ein langer Text (bis zu 100.000 Zeichen), den Equalang selbst an Satzgrenzen teilt
- **Sprachen** – über 100 für Text und 12 für Dateien, wobei die Quellsprache erkannt wird, wenn du sie weglässt

## Schlüssel holen

Registriere dich unter <https://equalang.com> und erstelle einen Schlüssel unter <https://equalang.com/api-keys>. Neue Konten bekommen kostenlose Credits – genug, um ein Dokument zu übersetzen und es auszuprobieren.

Der Schlüssel gehört in eine Umgebungsvariable in der Konfiguration des MCP-Clients, nie in eine URL. Ohne Schlüssel startet der Server trotzdem und listet seine Tools auf; ein Tool, das den Schlüssel braucht, antwortet mit dem Hinweis, wie man einen bekommt.

Der Schlüssel kann auch einmal pro Rechner in `~/.config/equalang/.env` liegen, die auch der Equalang-Skill liest:

```bash
# Ersetze el_your_key durch deinen Schlüssel
mkdir -p ~/.config/equalang && echo 'EQUALANG_API_KEY=el_your_key' > ~/.config/equalang/.env && chmod 600 ~/.config/equalang/.env
```

Der Server nimmt `EQUALANG_API_KEY` zuerst aus seiner Umgebung und liest die Datei nur, wenn dort keiner steht: Ein Schlüssel in der Client-Konfiguration hat Vorrang, und mit der Datei braucht die Client-Konfiguration kein `env`.

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
| `translate_text` | Übersetzt kurze Texte, in ihrer Reihenfolge – oder einen langen Text, den Equalang selbst an Satzgrenzen teilt. |
| `estimate_cost` | Lädt eine Datei hoch, ohne etwas zu starten; antwortet mit dem Höchstbetrag, den ein Auftrag damit kosten kann, und einer `file_id`, die den Auftrag ohne zweiten Upload startet. Kostenlos. |
| `check_job` | Nimmt einen Auftrag wieder auf und speichert seine Ergebnisse, sobald er fertig ist. |
| `cancel_job` | Stoppt einen wartenden oder laufenden Auftrag. Ein abgebrochener Auftrag wird nicht berechnet. |
| `get_credit_balance` | Die Credits des Kontos. |
| `list_languages` | Alle Sprachcodes und -namen. Braucht keinen Schlüssel. |

Sprachcodes sehen aus wie `en`, `zh-CN`, `ja`; die vollständige Liste hat `list_languages`. Ein Auftrag dauert Minuten – ein Tool wartet bis zu `wait_seconds` (standardmäßig 50 s, höchstens 240) und gibt dann eine Auftrags-ID zurück, die `check_job` wieder aufnimmt.

## Links

- [Equalang](https://equalang.com) · [Preise](https://equalang.com/pricing) · [Entwicklerdokumentation](https://equalang.com/developers)
- API für Agenten: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) – dieselben Operationen als Agent Skill
- Fragen: <support@equalang.com>

## Lizenz

[Apache-2.0](../LICENSE) © Equalang
