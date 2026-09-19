# Equalang MCP 服务器

[English](README.md)

让 Agent 用上 [Equalang](https://equalang.com)：整份文件翻译并保留版式、音视频转写、批量文本翻译。

- **文档**（PDF、DOCX、PPTX、XLSX、EPUB、HTML、TXT）译完仍是原格式，表格、图片、公式都在原位。
- **字幕**（SRT、VTT）和**图片**（JPG、PNG、WebP、BMP）。
- **音频和视频**（MP3、M4A、WAV、FLAC、OGG、AAC、Opus、MP4、MOV、WebM、MKV）：得到翻译后的字幕，或原语言的转写稿。

Agent 传入路径或 URL，拿回的是结果文件的路径；文件内容不会进入对话。

## 安装

在 <https://equalang.com/api-keys> 创建密钥，然后把服务器加进客户端配置：

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

Claude Code：`claude mcp add equalang -e EQUALANG_API_KEY=el_... -- npx -y @equalang/mcp`  
Codex：`codex mcp add equalang --env EQUALANG_API_KEY=el_... -- npx -y @equalang/mcp`

需要 Node 18 及以上。没有密钥时服务器照常启动并列出工具；需要密钥的工具会回答如何获取。

## 工具

| 工具 | 作用 |
| --- | --- |
| `translate_file` | 把文件（本机路径或公开 URL）翻译成另一种语言，结果存到原文件旁边。 |
| `transcribe_recording` | 把音视频里说的话写成带时间轴的文本（SRT、VTT、TXT、JSON）。 |
| `translate_text` | 按顺序翻译最多 50 条短文本。 |
| `estimate_cost` | 只上传、不开工：回答这个文件最多要花多少积分，并给出 `file_id`，之后开工不必再传一次。免费。 |
| `check_job` | 接着看一个任务；完成后保存结果。 |
| `cancel_job` | 停掉排队中或进行中的任务。取消的任务不扣费。 |
| `get_credit_balance` | 账户积分。 |
| `list_languages` | 语言代码和名称，读自线上 API，无需密钥。 |

任务消耗账户积分（与网页端同一份余额），所以会花钱的工具都要求模型先报价并征得同意；数字来自 `estimate_cost`。音视频按实际听到的语音结算，通常比估算少。

## 设计

1. **文件不经过模型。** MCP 没有文件类型，把 5 MB 的 PDF 塞进工具结果只会白白烧上下文。工具收的是"文件在哪"（本机绝对路径，或公开的 `http(s)` URL），答的是"结果写到了哪"。URL 直接交给 Equalang 去取，不会先下载到本机再上传。
2. **一个任务活在一次工具调用里。** 把任务号交还给模型、指望它自己轮询，这个循环常常半路被放弃。所以工具自己等——两次查询之间按 API 的 `Retry-After` 停顿——但不超过客户端给一次调用的时限（默认 50 秒，`wait_seconds` 最多 240）。超时后模型拿到任务号并被告知用 `check_job`；服务器记得这个任务的结果该放哪。
3. **复述 API 的答案，而不是自己猜。** 能否重试看 API 的 `retryable`，不靠解读状态码；一个任务最多花多少看 API 的 `quote`，不在包里抄一份费率；语言列表读自 API 的 OpenAPI 文档。创建任务的请求在客户端自己的重试之间带同一个 `Idempotency-Key`，应答丢失也不会变成第二个被扣费的任务。

结果不会覆盖已有文件：重名时加 ` (1)`。相对路径会被拒绝——这个进程和 Agent 不在同一个工作目录。

## 开发

```bash
npm install && npm run build
node selftest.mjs                                            # 协议、工具列表、无需密钥的工具
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # 再加真实任务（消耗积分）
node check-api.mjs                                           # 客户端用到的每个路径和字段仍在 API 契约里
```

`EQUALANG_BASE_URL` 可指向其他部署。API 本身见 <https://equalang.com/llms.txt>。

Apache-2.0。
