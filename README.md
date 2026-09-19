# Equalang MCP server

**English** · [简体中文](readme/README.zh-CN.md) · [日本語](readme/README.ja.md) · [한국어](readme/README.ko.md) · [Español](readme/README.es.md) · [Français](readme/README.fr.md) · [Deutsch](readme/README.de.md) · [Português](readme/README.pt.md) · [Italiano](readme/README.it.md) · [Русский](readme/README.ru.md) · [Polski](readme/README.pl.md) · [Türkçe](readme/README.tr.md) · [Tiếng Việt](readme/README.vi.md) · [Bahasa Indonesia](readme/README.id.md) · [ไทย](readme/README.th.md) · [हिन्दी](readme/README.hi.md) · [العربية](readme/README.ar.md)

Give an agent [Equalang](https://equalang.com): translate whole files with their layout kept, transcribe recordings, translate strings.

- **Documents** - PDF, DOCX, PPTX, XLSX, EPUB, HTML, TXT - come back in the same format, tables, images and formulas in place.
- **Subtitles** (SRT, VTT) and **pictures** (JPG, PNG, WebP, BMP).
- **Audio and video** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM, MKV - come back as translated subtitles, or as a transcript in the language spoken.

The agent passes a path or a URL and gets paths back. File contents never enter the conversation.

## Install

Create a key at <https://equalang.com/api-keys>, then add the server to your client:

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

Needs Node 18 or later. Without a key the server still starts and lists its tools; a tool that needs the key answers with how to get one.

## Tools

| Tool | What it does |
| --- | --- |
| `translate_file` | Translate a file (path or public URL) into another language and save the result beside it. |
| `transcribe_recording` | Write down what an audio or video file says, as timed text (SRT, VTT, TXT, JSON). |
| `translate_text` | Translate up to 50 short plain texts, in order. |
| `estimate_cost` | Upload a file without starting anything; answers with the most a job on it can cost, and a `file_id` that starts the job without a second upload. Free. |
| `check_job` | Pick a job up again, and save its results once it has finished. |
| `cancel_job` | Stop a queued or running job. A cancelled job is not charged. |
| `get_credit_balance` | The account's credits. |
| `list_languages` | Language codes and names, read from the live API. Needs no key. |

**Credits.** Work spends the account's credits - the same balance as the website - so the server tells the model to name the cost and get agreement first; `estimate_cost` is where the number comes from. A recording is charged for the speech actually heard, so it usually costs less than the estimate.

**Languages.** Codes look like `en`, `zh-CN`, `ja`. No list is built into this package: `list_languages` reads the codes and names from the live API (fewer for files than for text), so a language Equalang adds is available without an update. Omit the source language to have it detected.

**Formats and limits.** The formats above, up to 100 MB a file; `translate_text` takes up to 50 texts of 5,000 characters, 20,000 characters a call.

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

`EQUALANG_BASE_URL` points the server at another deployment. The API itself: <https://equalang.com/llms.txt>.

Apache-2.0.
