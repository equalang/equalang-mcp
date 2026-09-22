# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · **简体中文** · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[官网](https://equalang.com) · [价格](https://equalang.com/pricing) · [开发者文档](https://equalang.com/developers) · [API 密钥](https://equalang.com/api-keys)

> **关键词：** 文档翻译、PDF翻译、PDF翻译保留排版、文档翻译保留格式、Word文档翻译、PPT翻译、Excel翻译、EPUB电子书翻译、论文翻译、字幕翻译、SRT字幕翻译、图片翻译、视频翻译、音频转文字、语音转文字、AI翻译、mcp server、model context protocol、claude mcp、cursor mcp、translation api

**翻译文件，版式不变。** 这是 [Equalang](https://equalang.com) 的 MCP 服务器。Equalang 是一款整份文件直接翻译的 AI 翻译工具：PDF 进去，PDF 出来；演示文稿进去，演示文稿出来，表格、图片和公式都在原位。它还能翻译字幕和图片，把音频和视频变成翻译好的字幕或转写文本，并批量翻译短文本。可用于 Claude Code、Claude Desktop、Codex、Cursor、Windsurf、Cline、VS Code，以及其他所有 MCP 客户端。

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## 试试这样说

- “把 ~/Documents/contract.pdf 翻译成中文，排版保持不变。”
- “把 pitch-deck.pptx 翻译成英文和日文。”
- “把 https://example.com/whitepaper.pdf 翻译成中文，存到 ~/Downloads。”
- “把 thesis.docx 翻译成英文，大概要花多少积分？”
- “给 interview.mp4 做中文字幕，每句上面保留原文。”
- “把 standup.m4a 转成带时间戳的文字稿。”
- “把 menu.jpg 翻成中文，给我一张翻好的图片。”
- “把 novel.epub 翻译成中文。”

## 功能

- **文档**：PDF、DOCX、PPTX、XLSX、EPUB、HTML 和 TXT 译完仍是原格式，依然可编辑，表格、图片、公式和页面版式都在原位
- **字幕和图片**：SRT 和 VTT 保留时间轴，还可以选择把原文放在译文上方；JPG、PNG、WebP 和 BMP 返回时，图中的文字已经译好
- **音频和视频**：MP3、M4A、WAV、FLAC、OGG、AAC、Opus、MP4、MOV、WebM 和 MKV 可变成翻译好的字幕，或原语言的转写文本（SRT、VTT、TXT、JSON）
- **批量文本**：多条短文本按原顺序翻译，或一整篇长文本（最多 100,000 字符），由 Equalang 自行按句切分
- **语言**：文本 100+ 种，文件 12 种；不填源语言就自动识别

## 获取密钥

在 <https://equalang.com> 注册，然后在 <https://equalang.com/api-keys> 创建密钥。新账户自带免费积分，够翻一份文档试试手。

密钥放在 MCP 客户端配置的环境变量里，绝不要放进 URL。没有密钥时服务器照常启动并列出工具；需要密钥的工具会告诉你如何获取。

密钥也可以在每台机器上只存一次，放进 `~/.config/equalang/.env`（Equalang 技能也读这个文件）：

```bash
# 把 el_your_key 换成你的密钥
mkdir -p ~/.config/equalang && echo 'EQUALANG_API_KEY=el_your_key' > ~/.config/equalang/.env && chmod 600 ~/.config/equalang/.env
```

服务器先看自己的环境变量里有没有 `EQUALANG_API_KEY`，没有才读这个文件：客户端配置里写了密钥就以它为准；有了这个文件，客户端配置里就不必再写 `env`。

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
| `translate_text` | 按原顺序翻译多条短文本，或一整篇长文本，由 Equalang 自行按句切分。 |
| `estimate_cost` | 只上传文件，不启动任何任务；返回该文件上一个任务最多要花多少，以及一个 `file_id`，凭它启动任务无需再次上传。免费。 |
| `check_job` | 重新接上一个任务，并在它完成后保存结果。 |
| `cancel_job` | 停止排队中或运行中的任务。已取消的任务不收费。 |
| `get_credit_balance` | 账户的积分。 |
| `list_languages` | 全部语言代码和名称。无需密钥。 |

语言代码形如 `en`、`zh-CN`、`ja`，全部列表用 `list_languages` 查。任务要跑几分钟——工具最多等 `wait_seconds` 那么久（默认 50 秒，最高 240），然后交回一个任务 id，用 `check_job` 接着取结果。

## 链接

- [Equalang](https://equalang.com) · [价格](https://equalang.com/pricing) · [开发者文档](https://equalang.com/developers)
- 面向智能体的 API：[llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill)：同样的操作，以 Agent Skill 的形式提供
- 有问题：<support@equalang.com>

## 许可证

[Apache-2.0](../LICENSE) © Equalang
