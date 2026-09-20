# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

**English** · [简体中文](readme/README.zh-CN.md) · [日本語](readme/README.ja.md) · [한국어](readme/README.ko.md) · [Español](readme/README.es.md) · [Français](readme/README.fr.md) · [Deutsch](readme/README.de.md) · [Português](readme/README.pt.md) · [Italiano](readme/README.it.md) · [Русский](readme/README.ru.md) · [Polski](readme/README.pl.md) · [Türkçe](readme/README.tr.md) · [Tiếng Việt](readme/README.vi.md) · [Bahasa Indonesia](readme/README.id.md) · [ไทย](readme/README.th.md) · [हिन्दी](readme/README.hi.md) · [العربية](readme/README.ar.md)

[Website](https://equalang.com) · [Pricing](https://equalang.com/pricing) · [Developer docs](https://equalang.com/developers) · [API keys](https://equalang.com/api-keys)

> **Keywords:** document translation, pdf translator, translate pdf keep layout, docx translation, pptx translation, excel translation, epub translation, subtitle translation, srt translator, image translation, video translation, audio transcription, speech to text, ai translator, mcp server, model context protocol, claude mcp, cursor mcp, translation api

**Translate the file, keep the layout.** An MCP server for [Equalang](https://equalang.com) - an AI translator that works on whole files: a PDF comes back as a PDF, a deck as a deck, with tables, images and formulas where they were. It also translates subtitles and pictures, turns audio and video into translated subtitles or a transcript, and translates strings in bulk. Works in Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code and every other MCP client.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Features

- **Format in, format out** - PDF, DOCX, PPTX, XLSX, EPUB, HTML and TXT come back in the same format, still editable, with tables, images, formulas and page layout in place
- **Subtitles and pictures** - SRT and VTT keep their timing, optionally with the source line above the translation; JPG, PNG, WebP and BMP come back with the text in the picture translated
- **Audio and video** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM and MKV become translated subtitles, or a transcript in the language spoken (SRT, VTT, TXT, JSON)
- **Text in bulk** - separate strings translated in order, or one long text (up to 100,000 characters) that Equalang cuts at sentences itself
- **100+ languages** - 100+ for text and 12 for files, with the source language detected when you leave it out

## Get a key

Sign up at <https://equalang.com> and create a key at <https://equalang.com/api-keys>. New accounts start with free credits - enough to put a document through and see what comes back.

The key goes in an environment variable of the MCP client's config, never in a URL. It is shown once; Equalang keeps only a hash of it. Without a key the server still starts and lists its tools; a tool that needs the key answers with how to get one.

## Install

Needs Node 18 or later.

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

`-s user` puts it in every project; the default scope, `local`, loads the server only in the directory the command was run from.
</details>

<details>
<summary><b>OpenAI Codex</b></summary>

```bash
codex mcp add equalang --env EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```
</details>

<details>
<summary><b>Claude Desktop, Cursor, Windsurf, Cline and other JSON-configured clients</b></summary>

Add this to the client's MCP config - `claude_desktop_config.json`, `~/.cursor/mcp.json`, `~/.codeium/windsurf/mcp_config.json`, or the file your client documents:

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

Prefer a skill? [equalang-skill](https://github.com/equalang/equalang-skill) offers the same operations as an Agent Skill - one Python script, nothing to install.

## Tools

| Tool | What it does |
| --- | --- |
| `translate_file` | Translate a file (path or public URL) into another language and save the result beside it. |
| `transcribe_recording` | Write down what an audio or video file says, as timed text (SRT, VTT, TXT, JSON). |
| `translate_text` | Translate separate strings, in order - or one long text, which Equalang cuts at sentences itself. |
| `estimate_cost` | Upload a file without starting anything; answers with the most a job on it can cost, and a `file_id` that starts the job without a second upload. Free. |
| `check_job` | Pick a job up again, and save its results once it has finished. |
| `cancel_job` | Stop a queued or running job. A cancelled job is not charged. |
| `get_credit_balance` | The account's credits. |
| `list_languages` | Language codes and names, read from the live API. Needs no key. |

Language codes look like `en`, `zh-CN`, `ja`; `list_languages` reads them from the live API, so a language Equalang adds needs no update here. A job takes minutes - a tool waits up to `wait_seconds` (50 s by default, 240 at most), then hands back a job id for `check_job`.

## Links

- [Equalang](https://equalang.com) · [Pricing](https://equalang.com/pricing) · [Developer docs](https://equalang.com/developers)
- API for agents: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) - the same operations as an Agent Skill
- Questions: <support@equalang.com>

## License

[Apache-2.0](LICENSE) © Equalang
