# Equalang MCP 服务器

[English](../README.md) · **简体中文** · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

让智能体用上 [Equalang](https://equalang.com)：整份文件翻译并保留版式，转写录音，翻译文本。

- **文档** - PDF、DOCX、PPTX、XLSX、EPUB、HTML、TXT - 译文保持原格式，表格、图片和公式都在原位。
- **字幕**（SRT、VTT）和**图片**（JPG、PNG、WebP、BMP）。
- **音频和视频** - MP3、M4A、WAV、FLAC、OGG、AAC、Opus、MP4、MOV、WebM、MKV - 返回翻译好的字幕，或原语言的转写文本。

智能体传入路径或 URL，拿回的也是路径。文件内容不会进入对话。

## 安装

在 <https://equalang.com/api-keys> 创建密钥，然后把服务器加到你的客户端：

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

Claude Code：`claude mcp add --transport stdio equalang --env EQUALANG_API_KEY=el_... -- npx -y @equalang/mcp`  
Codex：`codex mcp add equalang --env EQUALANG_API_KEY=el_... -- npx -y @equalang/mcp`

需要 Node 18 或更高版本。没有密钥时服务器照常启动并列出工具；需要密钥的工具会告诉你如何获取。

## 工具

| 工具 | 作用 |
| --- | --- |
| `translate_file` | 把文件（路径或公开 URL）翻译成另一种语言，结果保存在原文件旁边。 |
| `transcribe_recording` | 把音频或视频里说的话写成带时间轴的文本（SRT、VTT、TXT、JSON）。 |
| `translate_text` | 按顺序翻译最多 50 条简短的纯文本。 |
| `estimate_cost` | 只上传文件，不启动任何任务；返回该文件上一个任务最多要花多少，以及一个 `file_id`，凭它启动任务无需再次上传。免费。 |
| `check_job` | 重新接上一个任务，并在它完成后保存结果。 |
| `cancel_job` | 停止排队中或运行中的任务。已取消的任务不收费。 |
| `get_credit_balance` | 账户的积分。 |
| `list_languages` | 语言代码和名称，从线上 API 读取。无需密钥。 |

**积分。** 任务消耗账户的积分 - 与网站是同一个余额 - 所以服务器要求模型先报出费用并征得同意；这个数字来自 `estimate_cost`。录音按实际听到的语音计费，所以通常低于估算。

**语言。** 代码形如 `en`、`zh-CN`、`ja`。本包不内置语言列表：`list_languages` 从线上 API 读取代码和名称（文件支持的语言比文本少），所以 Equalang 新增的语言无需更新即可使用。不填源语言则自动检测。

**格式和限制。** 支持上面列出的格式，单个文件最大 100 MB；`translate_text` 最多接受 50 条文本，每条 5,000 字符，每次调用 20,000 字符。

## 设计思路

三个决定，各有其理由：

1. **文件从不经过模型。** MCP 没有文件类型，而把一个 5 MB 的 PDF 放进工具结果，要耗掉大量上下文，却什么也没说。工具接收的是*文件在哪里* - 本机的绝对路径，或公开的 `http(s)` URL - 返回的是*结果写到了哪里*。URL 直接交给 Equalang，由它自己抓取；不会先下载到本地再上传一遍。
2. **一个任务活在一次工具调用里。** 返回任务 id 再指望模型去轮询，这种循环往往半途而废。工具会等 - 每次查看之间按 API 的 `Retry-After` 要求的时长暂停，并向请求了进度的客户端汇报进度 - 但不会超过客户端允许一次调用的时长（默认 50 秒，`wait_seconds` 最高 240）。超时后模型拿到 id，并被告知去调用 `check_job`；服务器记得该任务的结果应该放在哪里。
3. **API 的回答是转述的，不是猜的。** 失败能否重试，看的是 API 的 `retryable`，而不是对状态码的解读。任务最多花多少，是 API 的 `quote`，而不是抄进本包的费率。语言列表读自 API 的 OpenAPI 文档。创建任务的请求在本客户端自身的多次重试中使用同一个 `Idempotency-Key`，所以一次丢失的响应不会变成第二个被计费的任务。

每个回答说两遍 - 以文本形式给所有客户端，以 `structuredContent` 形式给会读它的客户端 - 写出的每个文件还会以 `resource_link` 标出，这是 MCP 不携带字节而表达“这里有个文件”的方式。对所有工具都成立的规则（路径进、路径出、花钱前先问）只在服务器的 `instructions` 里说一次。结果从不覆盖：名字被占用时加上 ` (1)`。相对路径会被拒绝 - 本进程与智能体并不共用工作目录。

## 开发

```bash
npm install && npm run build
node selftest.mjs                                          # 协议、工具列表、无需密钥的工具
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # 加上真实任务（消耗积分）
node check-api.mjs                                         # 对照 API 的线上契约，检查路径、字段以及工具描述所承诺的内容
```

`EQUALANG_BASE_URL` 可让服务器指向另一套部署。API 本身：<https://equalang.com/llms.txt>。

Apache-2.0。
