# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · **简体中文** · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[官网](https://equalang.com) · [价格](https://equalang.com/pricing) · [开发者文档](https://equalang.com/developers) · [API 密钥](https://equalang.com/api-keys)

> **关键词：** 文档翻译、PDF翻译、PDF翻译保留排版、文档翻译保留格式、Word文档翻译、PPT翻译、Excel翻译、EPUB电子书翻译、论文翻译、字幕翻译、SRT字幕翻译、图片翻译、视频翻译、音频转文字、语音转文字、AI翻译、mcp server、model context protocol、claude mcp、cursor mcp、translation api

**翻译文件，版式不变。** 这是 [Equalang](https://equalang.com) 的 MCP 服务器。Equalang 是一款整份文件直接翻译的 AI 翻译工具：PDF 进去，PDF 出来；演示文稿进去，演示文稿出来，表格、图片和公式都在原位。它还能翻译字幕和图片，把音频和视频变成翻译好的字幕或转写文本，并批量翻译字符串。可用于 Claude Code、Claude Desktop、Codex、Cursor、Windsurf、Cline、VS Code，以及其他所有 MCP 客户端。

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## 功能

- **什么格式进，什么格式出**：PDF、DOCX、PPTX、XLSX、EPUB、HTML 和 TXT 译完仍是原格式，依然可编辑，表格、图片、公式和页面版式都在原位
- **字幕和图片**：SRT 和 VTT 保留时间轴，还可以选择把原文放在译文上方；JPG、PNG、WebP 和 BMP 返回时，图中的文字已经译好
- **音频和视频**：MP3、M4A、WAV、FLAC、OGG、AAC、Opus、MP4、MOV、WebM 和 MKV 可变成翻译好的字幕，或原语言的转写文本（SRT、VTT、TXT、JSON）
- **批量文本**：多条独立的字符串按顺序翻译，或一整篇长文本（最多 100,000 字符），由 Equalang 自行按句切分；文本支持 100+ 种语言，文件支持 12 种
- **整份文件，不用粘贴**：单个文件最大 100 MB，来自路径或公开 URL；不必拆开了往文本框里贴
- **不花 token**：智能体传入路径或 URL，拿回的也是路径；一份 300 页的 PDF 从头到尾不进入对话
- **先报价，再开工**：`estimate_cost` 免费告诉你一个任务最多要花多少；失败和取消的任务不收费；录音按实际听到的语音计费；积分永不过期

## 获取密钥

在 <https://equalang.com> 注册，然后在 <https://equalang.com/api-keys> 创建密钥。新账户自带免费积分——足够翻一份文档，看看效果如何。

密钥放在 MCP 客户端配置的环境变量里，绝不要放进 URL。它只显示一次；Equalang 只保存它的哈希值。没有密钥时服务器照常启动并列出工具；需要密钥的工具会告诉你如何获取。

## 安装

需要 Node 18 或更高版本。

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

`-s user` 让它在所有项目中可用；默认作用域 `local` 只在运行该命令的目录里加载服务器。
</details>

<details>
<summary><b>OpenAI Codex</b></summary>

```bash
codex mcp add equalang --env EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```
</details>

<details>
<summary><b>Claude Desktop、Cursor、Windsurf、Cline 及其他用 JSON 配置的客户端</b></summary>

把下面这段加到客户端的 MCP 配置里——`claude_desktop_config.json`、`~/.cursor/mcp.json`、`~/.codeium/windsurf/mcp_config.json`，或你的客户端文档里指定的文件：

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

更想用技能？[equalang-skill](https://github.com/equalang/equalang-skill) 以 Agent Skill 的形式提供同样的操作——一个 Python 脚本，无需安装任何东西。

## 工具

| 工具 | 作用 |
| --- | --- |
| `translate_file` | 把文件（路径或公开 URL）翻译成另一种语言，结果保存在原文件旁边。 |
| `transcribe_recording` | 把音频或视频里说的话写成带时间轴的文本（SRT、VTT、TXT、JSON）。 |
| `translate_text` | 按顺序翻译多条独立的字符串，或一整篇长文本，由 Equalang 自行按句切分。 |
| `estimate_cost` | 只上传文件，不启动任何任务；返回该文件上一个任务最多要花多少，以及一个 `file_id`，凭它启动任务无需再次上传。免费。 |
| `check_job` | 重新接上一个任务，并在它完成后保存结果。 |
| `cancel_job` | 停止排队中或运行中的任务。已取消的任务不收费。 |
| `get_credit_balance` | 账户的积分。 |
| `list_languages` | 语言代码和名称，从线上 API 读取。无需密钥。 |

## 值得知道的四件事

**语言。** 代码形如 `en`、`zh-CN`、`ja`。本包不内置语言列表：`list_languages` 从线上 API 读取代码和名称（文件支持的语言比文本少），所以 Equalang 新增的语言无需更新即可使用。不填源语言则自动检测。

**积分。** 任务消耗账户的积分，与网站是同一个余额，所以服务器要求模型先报出费用并征得同意；这个数字来自 `estimate_cost`。

**任务要跑几分钟。** 工具会等它的任务完成，但不会超过客户端允许一次调用的时长（默认 50 秒，`wait_seconds` 最高 240）。超时后模型拿到任务 id，并被告知去调用 `check_job`，由它把结果保存到该放的位置。

**限制。** 单个文件最大 100 MB；`translate_text` 最多接受 50 条文本，每条 5,000 字符（每次调用 20,000），或一条最多 100,000 字符的文本。

## 常见问题

**翻译后的 PDF 还保留原来的排版吗？**
保留——这正是它的意义所在。文字放回原来的位置，表格、图片和公式原地不动；DOCX、PPTX 和 XLSX 仍可编辑。

**我的文档会被发给模型吗？**
不会。服务器把文件上传到 Equalang，返回的是一个路径。一篇 300 页的论文不花一个 token。

**能翻译图片里的文字吗？**
能。JPG、PNG、WebP 或 BMP 中的文字会被识别、翻译，再画回图片里。

**一个任务要花多少？**
`estimate_cost` 会在任何任务开始之前告诉你，而且免费。价格见 <https://equalang.com/pricing>。

## 设计思路

三个决定，各有其理由：

1. **文件从不经过模型。** MCP 没有文件类型，而把一个 5 MB 的 PDF 放进工具结果，要耗掉大量上下文，却什么也没说。工具接收的是*文件在哪里*——本机的绝对路径，或公开的 `http(s)` URL——返回的是*结果写到了哪里*。URL 直接交给 Equalang，由它自己抓取；不会先下载到本地再上传一遍。
2. **一个任务活在一次工具调用里。** 返回任务 id 再指望模型去轮询，这种循环往往半途而废。工具会等——每次查看之间按 API 的 `Retry-After` 要求的时长暂停，并向请求了进度的客户端汇报进度——但不会超过客户端允许一次调用的时长（默认 50 秒，`wait_seconds` 最高 240）。超时后模型拿到 id，并被告知去调用 `check_job`；服务器记得该任务的结果应该放在哪里。
3. **API 的回答是转述的，不是猜的。** 失败能否重试，看的是 API 的 `retryable`，而不是对状态码的解读。任务最多花多少，是 API 的 `quote`，而不是抄进本包的费率。语言列表读自 API 的 OpenAPI 文档。创建任务的请求在本客户端自身的多次重试中使用同一个 `Idempotency-Key`，所以一次丢失的响应不会变成第二个被计费的任务。

每个回答说两遍——以文本形式给所有客户端，以 `structuredContent` 形式给会读它的客户端——写出的每个文件还会以 `resource_link` 标出，这是 MCP 不携带字节而表达“这里有个文件”的方式。对所有工具都成立的规则（路径进、路径出、花钱前先问）只在服务器的 `instructions` 里说一次。结果从不覆盖：名字被占用时加上 ` (1)`。相对路径会被拒绝——本进程与智能体并不共用工作目录。

## 开发

```bash
npm install && npm run build
node selftest.mjs                                          # 协议、工具列表、无需密钥的工具
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # 加上真实任务（消耗积分）
node check-api.mjs                                         # 对照 API 的线上契约，检查路径、字段以及工具描述所承诺的内容
```

`EQUALANG_BASE_URL` 可让服务器指向另一套部署。

## 链接

- [Equalang](https://equalang.com) · [价格](https://equalang.com/pricing) · [开发者文档](https://equalang.com/developers)
- 面向智能体的 API：[llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill)：同样的操作，以 Agent Skill 的形式提供
- 有问题：<support@equalang.com>

## 许可证

[Apache-2.0](../LICENSE) © Equalang
