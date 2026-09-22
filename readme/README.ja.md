# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · **日本語** · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[ウェブサイト](https://equalang.com) · [料金](https://equalang.com/pricing) · [開発者向けドキュメント](https://equalang.com/developers) · [API キー](https://equalang.com/api-keys)

> **キーワード:** ドキュメント翻訳, PDF 翻訳, PDF 翻訳 レイアウト保持, PDF 翻訳 レイアウトそのまま, Word 翻訳, パワーポイント 翻訳, エクセル 翻訳, EPUB 翻訳, 論文 翻訳, 字幕翻訳, SRT 翻訳, 画像翻訳, 動画翻訳, 音声 文字起こし, 動画 文字起こし, AI 翻訳, mcp server, model context protocol, claude mcp, cursor mcp, translation api

**ファイルを翻訳しても、レイアウトはそのまま。** [Equalang](https://equalang.com) の MCP サーバーです。Equalang はファイルを丸ごと扱う AI 翻訳ツールで、PDF は PDF のまま、スライドはスライドのまま、表・画像・数式も元の位置で返ってきます。字幕や画像の翻訳、音声・動画からの翻訳済み字幕や書き起こしの作成、短いテキストの一括翻訳にも対応。Claude Code、Claude Desktop、Codex、Cursor、Windsurf、Cline、VS Code をはじめ、あらゆる MCP クライアントで動きます。

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## こんなふうに頼めます

- 「~/Documents/contract.pdf を日本語に翻訳して。レイアウトはそのままで」
- 「pitch-deck.pptx を英語と中国語に翻訳して」
- 「https://example.com/whitepaper.pdf を日本語に翻訳して ~/Downloads に保存して」
- 「thesis.docx を英語に翻訳すると、いくらかかる？」
- 「interview.mp4 に日本語字幕を付けて。各行の上に原文も残して」
- 「standup.m4a をタイムスタンプ付きで文字起こしして」
- 「menu.jpg の日本語版の画像を作って」
- 「novel.epub を日本語に翻訳して」

## 特長

- **ドキュメント** - PDF、DOCX、PPTX、XLSX、EPUB、HTML、TXT は同じ形式のまま、編集可能な状態で返ってきます。表、画像、数式、ページレイアウトも元の位置のままです
- **字幕と画像** - SRT と VTT はタイミングを保持し、訳文の上に原文を併記することもできます。JPG、PNG、WebP、BMP は画像内の文字が翻訳された状態で返ってきます
- **音声と動画** - MP3、M4A、WAV、FLAC、OGG、AAC、Opus、MP4、MOV、WebM、MKV を、翻訳済みの字幕、または話されている言語のままの書き起こし (SRT、VTT、TXT、JSON) にします
- **テキストの一括翻訳** - 短いテキストを順番どおりに翻訳。長いテキスト 1 件 (100,000 文字まで) も渡せ、その場合は Equalang が文の区切りで分割します
- **言語** - テキストは 100 以上、ファイルは 12 の言語に対応。ソース言語を省略すると自動検出されます

## キーを取得する

<https://equalang.com> で登録し、<https://equalang.com/api-keys> でキーを作成します。新規アカウントには無料クレジットが付いてきます。ドキュメントを 1 本試すには十分です。

キーは MCP クライアントの設定の環境変数に入れます。URL には決して入れないでください。キーがなくてもサーバーは起動し、ツール一覧を返します。キーが必要なツールは、キーの取得方法を答えます。

キーはマシンごとに一度、`~/.config/equalang/.env` に保存しておくこともできます（Equalang スキルも同じファイルを読みます）。

```bash
# el_your_key をあなたのキーに置き換えてください
mkdir -p ~/.config/equalang && echo 'EQUALANG_API_KEY=el_your_key' > ~/.config/equalang/.env && chmod 600 ~/.config/equalang/.env
```

サーバーはまず環境変数 `EQUALANG_API_KEY` を確認し、なければこのファイルを読みます。クライアント設定にキーがあればそちらが優先され、このファイルがあればクライアント設定に `env` は不要です。

## インストール

Node 18 以降が必要です。

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

`-s user` を付けるとすべてのプロジェクトで使えます。デフォルトのスコープ `local` では、コマンドを実行したディレクトリでだけサーバーが読み込まれます。
</details>

<details>
<summary><b>OpenAI Codex</b></summary>

```bash
codex mcp add equalang --env EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```
</details>

<details>
<summary><b>Claude Desktop、Cursor、Windsurf、Cline など、JSON で設定するクライアント</b></summary>

クライアントの MCP 設定 (`claude_desktop_config.json`、`~/.cursor/mcp.json`、`~/.codeium/windsurf/mcp_config.json`、またはお使いのクライアントのドキュメントにあるファイル) に次を追加します:

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

スキルのほうがよければ、[equalang-skill](https://github.com/equalang/equalang-skill) が同じ操作を Agent Skill として提供しています。Python スクリプト 1 本で、インストールは不要です。

## ツール

| ツール | 機能 |
| --- | --- |
| `translate_file` | ファイル (パスまたは公開 URL) を別の言語に翻訳し、結果を元ファイルの隣に保存します。 |
| `transcribe_recording` | 音声・動画ファイルで話されている内容を、タイムスタンプ付きテキスト (SRT、VTT、TXT、JSON) として書き起こします。 |
| `translate_text` | 短いテキストを順番どおりに翻訳します。長いテキスト 1 件も渡せ、その場合は Equalang が文の区切りで分割します。 |
| `estimate_cost` | 何も開始せずにファイルをアップロードし、そのファイルに対するジョブの費用の上限と、再アップロードなしでジョブを開始できる `file_id` を返します。無料。 |
| `check_job` | ジョブの確認を再開し、完了していれば結果を保存します。 |
| `cancel_job` | 待機中または実行中のジョブを停止します。キャンセルしたジョブは課金されません。 |
| `get_credit_balance` | アカウントのクレジット残高。 |
| `list_languages` | すべての言語コードと名称。キー不要。 |

言語コードは `en`、`zh-CN`、`ja` のような形式で、全リストは `list_languages` にあります。ジョブには数分かかります。ツールは `wait_seconds` まで待ち (デフォルト 50 s、最大 240)、そのあとは `check_job` で受け取るためのジョブ id を返します。

## リンク

- [Equalang](https://equalang.com) · [料金](https://equalang.com/pricing) · [開発者向けドキュメント](https://equalang.com/developers)
- エージェント向け API: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) - 同じ操作を Agent Skill として提供
- お問い合わせ: <support@equalang.com>

## ライセンス

[Apache-2.0](../LICENSE) © Equalang
