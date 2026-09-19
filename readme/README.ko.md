# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · **한국어** · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[웹사이트](https://equalang.com) · [요금](https://equalang.com/pricing) · [개발자 문서](https://equalang.com/developers) · [API 키](https://equalang.com/api-keys)

> **키워드:** 문서 번역, PDF 번역, PDF 번역 레이아웃 유지, 서식 유지 번역, 워드 번역, PPT 번역, 엑셀 번역, EPUB 번역, 논문 번역, 자막 번역, SRT 자막 번역, 이미지 번역, 영상 번역, 음성 텍스트 변환, 녹음 받아쓰기, AI 번역기, mcp server, model context protocol, claude mcp, cursor mcp, translation api

**파일은 번역하고, 레이아웃은 그대로.** [Equalang](https://equalang.com)을 위한 MCP 서버입니다. Equalang은 파일을 통째로 다루는 AI 번역기입니다. PDF는 PDF로, 슬라이드는 슬라이드로 돌아오고 표와 이미지, 수식은 제자리에 남습니다. 자막과 이미지도 번역하고, 오디오와 비디오를 번역된 자막이나 전사문으로 바꾸며, 문자열을 대량으로 번역합니다. Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code를 비롯한 모든 MCP 클라이언트에서 동작합니다.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## 기능

- **넣은 형식 그대로** - PDF, DOCX, PPTX, XLSX, EPUB, HTML, TXT는 같은 형식으로, 편집 가능한 상태로 돌아오며 표와 이미지, 수식, 페이지 레이아웃이 제자리에 남습니다
- **자막과 이미지** - SRT와 VTT는 타이밍을 유지하고, 원하면 번역문 위에 원문을 함께 넣을 수 있습니다. JPG, PNG, WebP, BMP는 이미지 속 글자가 번역된 채로 돌아옵니다
- **오디오와 비디오** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM, MKV는 번역된 자막으로, 또는 원래 말한 언어의 전사문(SRT, VTT, TXT, JSON)으로 바뀝니다
- **대량 텍스트** - 개별 문자열을 순서대로 번역하거나, 긴 텍스트 하나(최대 100,000자)를 Equalang이 직접 문장 단위로 나눠 번역합니다. 텍스트는 100개 이상, 파일은 12개 언어를 지원합니다
- **파일 통째로, 붙여넣기 없이** - 파일당 최대 100 MB, 경로나 공개 URL로 넘기면 됩니다. 텍스트 상자에 쪼개 넣을 필요가 없습니다
- **토큰이 들지 않습니다** - 에이전트는 경로나 URL을 넘기고 경로를 돌려받습니다. 300쪽짜리 PDF도 대화에는 들어오지 않습니다
- **작업 전에 가격부터** - `estimate_cost`가 작업에 들 수 있는 최대 비용을 무료로 알려 줍니다. 실패하거나 취소된 작업은 과금되지 않고, 녹음은 실제로 들린 음성만큼만 과금되며, 크레딧은 만료되지 않습니다

## 키 받기

<https://equalang.com>에서 가입하고 <https://equalang.com/api-keys>에서 키를 만드세요. 새 계정에는 무료 크레딧이 들어 있습니다. 문서 하나를 돌려 보고 결과를 확인하기에 충분한 양입니다.

키는 MCP 클라이언트 설정의 환경 변수에 넣고, URL에는 절대 넣지 마세요. 키는 한 번만 표시되며, Equalang은 키의 해시만 보관합니다. 키가 없어도 서버는 시작되고 도구 목록을 보여 줍니다. 키가 필요한 도구는 키를 받는 방법을 알려 주는 것으로 응답합니다.

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
| `translate_text` | 개별 문자열을 순서대로 번역합니다. 긴 텍스트 하나도 가능하며, 이때는 Equalang이 직접 문장 단위로 나눕니다. |
| `estimate_cost` | 아무 작업도 시작하지 않고 파일만 업로드합니다. 그 파일로 하는 작업에 들 수 있는 최대 비용과, 다시 업로드하지 않고 작업을 시작할 수 있는 `file_id`를 돌려줍니다. 무료입니다. |
| `check_job` | 작업을 다시 이어받고, 끝났으면 결과를 저장합니다. |
| `cancel_job` | 대기 중이거나 실행 중인 작업을 중지합니다. 취소된 작업은 과금되지 않습니다. |
| `get_credit_balance` | 계정의 크레딧. |
| `list_languages` | 실제 API에서 읽어 온 언어 코드와 이름. 키가 필요 없습니다. |

## 알아 두면 좋은 네 가지

**언어.** 코드는 `en`, `zh-CN`, `ja`처럼 생겼습니다. 이 패키지에는 언어 목록이 내장되어 있지 않습니다. `list_languages`가 실제 API에서 코드와 이름을 읽어 오므로(파일은 텍스트보다 지원 언어가 적습니다), Equalang이 언어를 추가하면 업데이트 없이 바로 쓸 수 있습니다. 원본 언어를 생략하면 자동으로 감지합니다.

**크레딧.** 작업은 계정의 크레딧, 즉 웹사이트와 같은 잔액을 씁니다. 그래서 서버는 모델에게 비용을 먼저 밝히고 동의를 받으라고 지시하며, 그 숫자는 `estimate_cost`에서 나옵니다.

**작업은 몇 분씩 걸립니다.** 도구는 작업이 끝나기를 기다리지만, 클라이언트가 호출 하나에 허용하는 시간을 넘기지는 않습니다(기본 50초, `wait_seconds`로 최대 240). 그 뒤에는 모델이 작업 id를 받고 `check_job`을 호출하라는 안내를 받으며, `check_job`이 결과를 제자리에 저장합니다.

**제한.** 파일당 최대 100 MB. `translate_text`는 5,000자 이내의 텍스트를 최대 50개(호출당 20,000자), 또는 100,000자 이내의 텍스트 하나를 받습니다.

## 자주 묻는 질문

**번역된 PDF의 레이아웃이 유지되나요?**
네, 바로 그것이 핵심입니다. 텍스트는 원래 자리에 다시 들어가고 표와 이미지, 수식은 제자리에 남습니다. DOCX, PPTX, XLSX는 편집 가능한 상태 그대로입니다.

**제 문서가 모델로 전송되나요?**
아니요. 서버는 파일을 Equalang에 업로드하고 경로로 답할 뿐입니다. 300쪽짜리 논문에도 토큰은 들지 않습니다.

**이미지 속 글자도 번역할 수 있나요?**
네. JPG, PNG, WebP, BMP 속 글자를 인식해 번역한 뒤 이미지에 다시 그려 넣습니다.

**작업 비용은 얼마인가요?**
무엇이든 시작되기 전에 `estimate_cost`가 알려 주며, 무료입니다. 요금은 <https://equalang.com/pricing>에서 확인하세요.

## 만든 방식

세 가지 결정과 각각의 이유입니다.

1. **파일은 절대 모델을 거치지 않습니다.** MCP에는 파일 타입이 없고, 도구 결과에 5 MB짜리 PDF를 실으면 아무 말도 하지 않으면서 컨텍스트만 엄청나게 잡아먹습니다. 도구는 *파일이 어디 있는지*(이 컴퓨터의 절대 경로 또는 공개 `http(s)` URL)를 받고 *결과가 어디에 쓰였는지*로 답합니다. URL은 Equalang에 그대로 넘기고 Equalang이 직접 가져옵니다. 다시 업로드하려고 여기서 내려받는 일은 없습니다.
2. **작업은 도구 호출 하나 안에서 끝납니다.** 작업 id를 돌려주고 모델이 폴링해 주기를 기대하면 그 루프는 중간에 버려지기 마련입니다. 도구가 직접 기다립니다. API의 `Retry-After`가 요구하는 만큼 확인 사이에 쉬고, 진행 상황을 요청한 클라이언트에는 보고합니다. 다만 클라이언트가 호출 하나에 허용하는 시간을 넘기지는 않습니다(기본 50초, `wait_seconds`로 최대 240). 그 뒤에는 모델이 id를 받고 `check_job`을 호출하라는 안내를 받습니다. 그 작업의 결과가 어디에 저장되어야 하는지는 서버가 기억합니다.
3. **API의 답은 추측하지 않고 그대로 전합니다.** 실패를 재시도할 수 있는지는 상태 코드를 해석한 결과가 아니라 API의 `retryable`입니다. 작업 비용은 이 패키지에 베껴 둔 요율이 아니라 API의 `quote`입니다. 언어 목록은 API의 OpenAPI 문서에서 읽습니다. 작업을 만드는 요청은 이 클라이언트 자체의 재시도 내내 하나의 `Idempotency-Key`를 쓰므로, 응답이 유실되어도 과금되는 두 번째 작업이 생기지 않습니다.

응답은 두 번 전달됩니다. 모든 클라이언트를 위한 텍스트로, 그리고 읽을 줄 아는 클라이언트를 위한 `structuredContent`로 말입니다. 또 기록된 파일 하나하나를 `resource_link`로도 알립니다. 이것이 MCP에서 바이트를 싣지 않고 "여기 파일이 있다"고 말하는 방식입니다. 모든 도구에 공통인 사항(경로를 받고 경로를 돌려준다, 쓰기 전에 묻는다)은 서버의 `instructions`에 한 번만 적습니다. 결과는 절대 덮어쓰지 않습니다. 이미 있는 이름에는 ` (1)`이 붙습니다. 상대 경로는 거부합니다. 이 프로세스는 에이전트의 작업 디렉터리를 공유하지 않기 때문입니다.

## 개발

```bash
npm install && npm run build
node selftest.mjs                                          # 프로토콜, 도구 목록, 키가 필요 없는 도구
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # 실제 작업까지 (크레딧 소모)
node check-api.mjs                                         # 경로, 필드, 도구 설명이 약속하는 내용을 API의 실제 계약과 대조
```

`EQUALANG_BASE_URL`로 서버가 다른 배포를 가리키게 할 수 있습니다.

## 링크

- [Equalang](https://equalang.com) · [요금](https://equalang.com/pricing) · [개발자 문서](https://equalang.com/developers)
- 에이전트용 API: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) - 같은 작업을 Agent Skill로 제공
- 문의: <support@equalang.com>

## 라이선스

[Apache-2.0](../LICENSE) © Equalang
