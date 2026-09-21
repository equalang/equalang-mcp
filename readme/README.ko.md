# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · **한국어** · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[웹사이트](https://equalang.com) · [요금](https://equalang.com/pricing) · [개발자 문서](https://equalang.com/developers) · [API 키](https://equalang.com/api-keys)

> **키워드:** 문서 번역, PDF 번역, PDF 번역 레이아웃 유지, 서식 유지 번역, 워드 번역, PPT 번역, 엑셀 번역, EPUB 번역, 논문 번역, 자막 번역, SRT 자막 번역, 이미지 번역, 영상 번역, 음성 텍스트 변환, 녹음 받아쓰기, AI 번역기, mcp server, model context protocol, claude mcp, cursor mcp, translation api

**파일은 번역하고, 레이아웃은 그대로.** [Equalang](https://equalang.com)을 위한 MCP 서버입니다. Equalang은 파일을 통째로 다루는 AI 번역기입니다. PDF는 PDF로, 슬라이드는 슬라이드로 돌아오고 표와 이미지, 수식은 제자리에 남습니다. 자막과 이미지도 번역하고, 오디오와 비디오를 번역된 자막이나 전사문으로 바꾸며, 짧은 텍스트를 대량으로 번역합니다. Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code를 비롯한 모든 MCP 클라이언트에서 동작합니다.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## 이렇게 말해 보세요

- “~/Documents/contract.pdf를 한국어로 번역해 줘. 레이아웃은 그대로.”
- “pitch-deck.pptx를 영어와 일본어로 번역해 줘.”
- “https://example.com/whitepaper.pdf를 한국어로 번역해서 ~/Downloads에 저장해 줘.”
- “thesis.docx를 영어로 번역하면 비용이 얼마나 들어?”
- “interview.mp4에 한국어 자막을 만들어 줘. 각 줄 위에 원문도 남겨 줘.”
- “standup.m4a를 타임스탬프와 함께 받아 적어 줘.”
- “menu.jpg에 있는 글자를 한국어로 번역해 줘.”
- “locales/en.json의 문구를 일본어, 중국어, 스페인어로 번역해 줘.”

## 기능

- **문서** - PDF, DOCX, PPTX, XLSX, EPUB, HTML, TXT는 같은 형식으로, 편집 가능한 상태로 돌아오며 표와 이미지, 수식, 페이지 레이아웃이 제자리에 남습니다
- **자막과 이미지** - SRT와 VTT는 타이밍을 유지하고, 원하면 번역문 위에 원문을 함께 넣을 수 있습니다. JPG, PNG, WebP, BMP는 이미지 속 글자가 번역된 채로 돌아옵니다
- **오디오와 비디오** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM, MKV는 번역된 자막으로, 또는 원래 말한 언어의 전사문(SRT, VTT, TXT, JSON)으로 바뀝니다
- **대량 텍스트** - 짧은 텍스트를 순서대로 번역하거나, 긴 텍스트 하나(최대 100,000자)를 Equalang이 직접 문장 단위로 나눠 번역합니다
- **언어** - 텍스트는 100개 이상, 파일은 12개 언어를 지원하며, 원본 언어를 생략하면 자동으로 감지합니다

## 키 받기

<https://equalang.com>에서 가입하고 <https://equalang.com/api-keys>에서 키를 만드세요. 새 계정에는 무료 크레딧이 들어 있어, 문서 하나쯤은 번역해 볼 수 있습니다.

키는 MCP 클라이언트 설정의 환경 변수에 넣고, URL에는 절대 넣지 마세요. 키가 없어도 서버는 시작되고 도구 목록을 보여 줍니다. 키가 필요한 도구는 키를 받는 방법을 알려 주는 것으로 응답합니다.

키는 기기마다 한 번 `~/.config/equalang/.env`에 `EQUALANG_API_KEY=el_your_key` 형식으로 저장해 둘 수도 있습니다. 환경 변수에 키가 없으면 서버가 이 파일을 읽고, Equalang 스킬도 같은 파일을 읽습니다. 이 경우 클라이언트 설정에 `env`가 필요 없습니다.

## 설치

Node 18 이상이 필요합니다.

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

`-s user`를 쓰면 모든 프로젝트에서 사용할 수 있습니다. 기본 범위인 `local`은 명령을 실행한 디렉터리에서만 서버를 불러옵니다.
</details>

<details>
<summary><b>OpenAI Codex</b></summary>

```bash
codex mcp add equalang --env EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```
</details>

<details>
<summary><b>Claude Desktop, Cursor, Windsurf, Cline 등 JSON으로 설정하는 클라이언트</b></summary>

클라이언트의 MCP 설정(`claude_desktop_config.json`, `~/.cursor/mcp.json`, `~/.codeium/windsurf/mcp_config.json`, 또는 사용하는 클라이언트 문서에 나온 파일)에 다음을 추가하세요.

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

스킬이 더 편하신가요? [equalang-skill](https://github.com/equalang/equalang-skill)이 같은 작업을 Agent Skill로 제공합니다. Python 스크립트 하나뿐이고 설치할 것이 없습니다.

## 도구

| 도구 | 하는 일 |
| --- | --- |
| `translate_file` | 파일(경로 또는 공개 URL)을 다른 언어로 번역하고 결과를 원본 옆에 저장합니다. |
| `transcribe_recording` | 오디오나 비디오 파일에서 말한 내용을 타임코드가 붙은 텍스트(SRT, VTT, TXT, JSON)로 받아씁니다. |
| `translate_text` | 짧은 텍스트를 순서대로 번역합니다. 긴 텍스트 하나도 가능하며, 이때는 Equalang이 직접 문장 단위로 나눕니다. |
| `estimate_cost` | 아무 작업도 시작하지 않고 파일만 업로드합니다. 그 파일로 하는 작업에 들 수 있는 최대 비용과, 다시 업로드하지 않고 작업을 시작할 수 있는 `file_id`를 돌려줍니다. 무료입니다. |
| `check_job` | 작업을 다시 이어받고, 끝났으면 결과를 저장합니다. |
| `cancel_job` | 대기 중이거나 실행 중인 작업을 중지합니다. 취소된 작업은 과금되지 않습니다. |
| `get_credit_balance` | 계정의 크레딧. |
| `list_languages` | 모든 언어 코드와 이름. 키가 필요 없습니다. |

언어 코드는 `en`, `zh-CN`, `ja`처럼 생겼고, 전체 목록은 `list_languages`에 있습니다. 작업은 몇 분씩 걸립니다. 도구는 `wait_seconds`까지 기다린 뒤(기본 50초, 최대 240), `check_job`이 이어받을 작업 id를 돌려줍니다.

## 링크

- [Equalang](https://equalang.com) · [요금](https://equalang.com/pricing) · [개발자 문서](https://equalang.com/developers)
- 에이전트용 API: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) - 같은 작업을 Agent Skill로 제공
- 문의: <support@equalang.com>

## 라이선스

[Apache-2.0](../LICENSE) © Equalang
