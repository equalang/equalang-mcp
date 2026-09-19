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
- **Text in bulk** - separate strings translated in order, or one long text (up to 100,000 characters) that Equalang cuts at sentences itself; 100+ languages for text, 12 for files
- **Whole files, no pasting** - up to 100 MB a file, from a path or a public URL; nothing to split into text boxes
- **Costs no tokens** - the agent passes a path or a URL and gets paths back; a 300-page PDF never enters the conversation
- **The price before the job** - `estimate_cost` answers with the most a job can cost, for free; failed and cancelled jobs cost nothing; a recording is charged for the speech actually heard; credits never expire

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

## Four things worth knowing

**Languages.** Codes look like `en`, `zh-CN`, `ja`. No list is built into this package: `list_languages` reads the codes and names from the live API (fewer for files than for text), so a language Equalang adds is available without an update. Omit the source language to have it detected.

**Credits.** Work spends the account's credits - the same balance as the website - so the server tells the model to name the cost and get agreement first; `estimate_cost` is where the number comes from.

**Jobs take minutes.** A tool waits for its job, but not past what a client allows a call (50 s by default, `wait_seconds` up to 240). After that the model gets the job id and is told to call `check_job`, which saves the results where they belong.

**Limits.** Up to 100 MB a file; `translate_text` takes up to 50 texts of 5,000 characters (20,000 a call), or one text of up to 100,000.

## Questions people ask

**Does the translated PDF keep its layout?**
Yes - that is the point. Text is put back where it was, and tables, images and formulas stay in place; a DOCX, PPTX or XLSX stays editable.

**Is my document sent to the model?**
No. The server uploads the file to Equalang and answers with a path. A 300-page paper costs no tokens.

**Can it translate the text inside a picture?**
Yes. Text in a JPG, PNG, WebP or BMP is recognised, translated and drawn back into the picture.

**What does a job cost?**
`estimate_cost` says before anything starts, and it is free. Prices are at <https://equalang.com/pricing>.

## How it is built

Three decisions, each with a reason:

1. **A file never passes through the model.** MCP has no file type, and a 5 MB PDF in a tool result costs a fortune in context to say nothing. A tool takes *where a file is* - an absolute path on this machine, or a public `http(s)` URL - and answers with *where the results were written*. A URL is handed to Equalang, which fetches it itself; nothing is downloaded here only to be uploaded again.
2. **A job lives inside one tool call.** Returning a job id and trusting the model to poll is a loop that gets abandoned halfway. The tool waits - pausing between looks for as long as the API's `Retry-After` asks, and reporting progress to a client that asked for it - but not past what a client allows a call (50 s by default, `wait_seconds` up to 240). After that the model gets the id and is told to call `check_job`; the server remembers where that job's results belong.
3. **The API's answers are repeated, not guessed.** Whether a failure can be retried is the API's `retryable`, not a reading of status codes. What a job can cost is the API's `quote`, not a rate copied into this package. The language list is read from the API's OpenAPI document. A request that creates a job carries one `Idempotency-Key` across this client's own retries, so a lost answer cannot become a second, charged job.

An answer is said twice - as text for every client and as `structuredContent` for those that read it - and each file written is also named as a `resource_link`, which is how MCP says "here is a file" without carrying its bytes. What is true of every tool (paths in, paths out, ask before spending) is said once, in the server's `instructions`. Results never overwrite: a taken name gets ` (1)`. Relative paths are refused - this process does not share the agent's working directory.

## Develop

```bash
npm install && npm run build
node selftest.mjs                                          # protocol, tool list, the keyless tool
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # and real jobs (spends credits)
node check-api.mjs                                         # paths, fields, and what the tool descriptions promise, against the API's live contract
```

`EQUALANG_BASE_URL` points the server at another deployment.

## Links

- [Equalang](https://equalang.com) · [Pricing](https://equalang.com/pricing) · [Developer docs](https://equalang.com/developers)
- API for agents: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) - the same operations as an Agent Skill
- Questions: <support@equalang.com>

## License

[Apache-2.0](LICENSE) © Equalang
