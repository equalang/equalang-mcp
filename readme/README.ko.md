# Equalang MCP 서버

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · **한국어** · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

에이전트에게 [Equalang](https://equalang.com)을 붙여 줍니다. 레이아웃을 유지한 채 파일을 통째로 번역하고, 녹음을 받아쓰고, 문자열을 번역합니다.

- **문서** - PDF, DOCX, PPTX, XLSX, EPUB, HTML, TXT - 는 같은 형식으로 돌아오며, 표와 이미지, 수식이 제자리에 남습니다.
- **자막**(SRT, VTT)과 **이미지**(JPG, PNG, WebP, BMP).
- **오디오와 비디오** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM, MKV - 는 번역된 자막으로, 또는 원래 말한 언어의 전사문으로 돌아옵니다.

에이전트는 경로나 URL을 넘기고 경로를 돌려받습니다. 파일 내용은 대화에 들어오지 않습니다.

## 설치

<https://equalang.com/api-keys>에서 키를 만든 다음, 클라이언트에 서버를 추가하세요.

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

Node 18 이상이 필요합니다. 키가 없어도 서버는 시작되고 도구 목록을 보여 줍니다. 키가 필요한 도구는 키를 받는 방법을 알려 주는 것으로 응답합니다.

## 도구

| 도구 | 하는 일 |
| --- | --- |
| `translate_file` | 파일(경로 또는 공개 URL)을 다른 언어로 번역하고 결과를 원본 옆에 저장합니다. |
| `transcribe_recording` | 오디오나 비디오 파일에서 말한 내용을 타임코드가 붙은 텍스트(SRT, VTT, TXT, JSON)로 받아씁니다. |
| `translate_text` | 짧은 일반 텍스트를 최대 50개까지 순서대로 번역합니다. |
| `estimate_cost` | 아무 작업도 시작하지 않고 파일만 업로드합니다. 그 파일로 하는 작업에 들 수 있는 최대 비용과, 다시 업로드하지 않고 작업을 시작할 수 있는 `file_id`를 돌려줍니다. 무료입니다. |
| `check_job` | 작업을 다시 이어받고, 끝났으면 결과를 저장합니다. |
| `cancel_job` | 대기 중이거나 실행 중인 작업을 중지합니다. 취소된 작업은 과금되지 않습니다. |
| `get_credit_balance` | 계정의 크레딧. |
| `list_languages` | 실제 API에서 읽어 온 언어 코드와 이름. 키가 필요 없습니다. |

**크레딧.** 작업은 계정의 크레딧 - 웹사이트와 같은 잔액 - 을 씁니다. 그래서 서버는 모델에게 비용을 먼저 밝히고 동의를 받으라고 지시하며, 그 숫자는 `estimate_cost`에서 나옵니다. 녹음은 실제로 들린 음성만큼만 과금되므로 보통 견적보다 적게 듭니다.

**언어.** 코드는 `en`, `zh-CN`, `ja`처럼 생겼습니다. 이 패키지에는 언어 목록이 내장되어 있지 않습니다. `list_languages`가 실제 API에서 코드와 이름을 읽어 오므로(파일은 텍스트보다 지원 언어가 적습니다), Equalang이 언어를 추가하면 업데이트 없이 바로 쓸 수 있습니다. 원본 언어를 생략하면 자동으로 감지합니다.

**형식과 제한.** 위에 나온 형식, 파일당 최대 100 MB. `translate_text`는 5,000자 이내의 텍스트를 최대 50개, 호출당 20,000자까지 받습니다.

## 만든 방식

세 가지 결정과 각각의 이유입니다.

1. **파일은 절대 모델을 거치지 않습니다.** MCP에는 파일 타입이 없고, 도구 결과에 5 MB짜리 PDF를 실으면 아무 말도 하지 않으면서 컨텍스트만 엄청나게 잡아먹습니다. 도구는 *파일이 어디 있는지* - 이 컴퓨터의 절대 경로 또는 공개 `http(s)` URL - 를 받고 *결과가 어디에 쓰였는지*로 답합니다. URL은 Equalang에 그대로 넘기고 Equalang이 직접 가져옵니다. 다시 업로드하려고 여기서 내려받는 일은 없습니다.
2. **작업은 도구 호출 하나 안에서 끝납니다.** 작업 id를 돌려주고 모델이 폴링해 주기를 기대하면 그 루프는 중간에 버려지기 마련입니다. 도구가 직접 기다립니다 - API의 `Retry-After`가 요구하는 만큼 확인 사이에 쉬고, 진행 상황을 요청한 클라이언트에는 보고하면서 - 다만 클라이언트가 호출 하나에 허용하는 시간을 넘기지는 않습니다(기본 50초, `wait_seconds`로 최대 240). 그 뒤에는 모델이 id를 받고 `check_job`을 호출하라는 안내를 받습니다. 그 작업의 결과가 어디에 저장되어야 하는지는 서버가 기억합니다.
3. **API의 답은 추측하지 않고 그대로 전합니다.** 실패를 재시도할 수 있는지는 상태 코드를 해석한 결과가 아니라 API의 `retryable`입니다. 작업 비용은 이 패키지에 베껴 둔 요율이 아니라 API의 `quote`입니다. 언어 목록은 API의 OpenAPI 문서에서 읽습니다. 작업을 만드는 요청은 이 클라이언트 자체의 재시도 내내 하나의 `Idempotency-Key`를 쓰므로, 응답이 유실되어도 과금되는 두 번째 작업이 생기지 않습니다.

응답은 두 번 전달됩니다 - 모든 클라이언트를 위한 텍스트로, 그리고 읽을 줄 아는 클라이언트를 위한 `structuredContent`로 - 또 기록된 파일 하나하나를 `resource_link`로도 알립니다. 이것이 MCP에서 바이트를 싣지 않고 "여기 파일이 있다"고 말하는 방식입니다. 모든 도구에 공통인 사항(경로를 받고 경로를 돌려준다, 쓰기 전에 묻는다)은 서버의 `instructions`에 한 번만 적습니다. 결과는 절대 덮어쓰지 않습니다. 이미 있는 이름에는 ` (1)`이 붙습니다. 상대 경로는 거부합니다 - 이 프로세스는 에이전트의 작업 디렉터리를 공유하지 않기 때문입니다.

## 개발

```bash
npm install && npm run build
node selftest.mjs                                          # 프로토콜, 도구 목록, 키가 필요 없는 도구
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # 실제 작업까지 (크레딧 소모)
node check-api.mjs                                         # 경로, 필드, 도구 설명이 약속하는 내용을 API의 실제 계약과 대조
```

`EQUALANG_BASE_URL`로 서버가 다른 배포를 가리키게 할 수 있습니다. API 자체: <https://equalang.com/llms.txt>.

Apache-2.0.
