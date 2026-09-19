# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · **日本語** · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[ウェブサイト](https://equalang.com) · [料金](https://equalang.com/pricing) · [開発者向けドキュメント](https://equalang.com/developers) · [API キー](https://equalang.com/api-keys)

> **キーワード:** ドキュメント翻訳, PDF 翻訳, PDF 翻訳 レイアウト保持, PDF 翻訳 レイアウトそのまま, Word 翻訳, パワーポイント 翻訳, エクセル 翻訳, EPUB 翻訳, 論文 翻訳, 字幕翻訳, SRT 翻訳, 画像翻訳, 動画翻訳, 音声 文字起こし, 動画 文字起こし, AI 翻訳, mcp server, model context protocol, claude mcp, cursor mcp, translation api

**ファイルを翻訳しても、レイアウトはそのまま。** [Equalang](https://equalang.com) の MCP サーバーです。Equalang はファイルを丸ごと扱う AI 翻訳ツールで、PDF は PDF のまま、スライドはスライドのまま、表・画像・数式も元の位置で返ってきます。字幕や画像の翻訳、音声・動画からの翻訳済み字幕や書き起こしの作成、文字列の一括翻訳にも対応。Claude Code、Claude Desktop、Codex、Cursor、Windsurf、Cline、VS Code をはじめ、あらゆる MCP クライアントで動きます。

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## 特長

- **形式はそのまま** - PDF、DOCX、PPTX、XLSX、EPUB、HTML、TXT は同じ形式のまま、編集可能な状態で返ってきます。表、画像、数式、ページレイアウトも元の位置のままです
- **字幕と画像** - SRT と VTT はタイミングを保持し、訳文の上に原文を併記することもできます。JPG、PNG、WebP、BMP は画像内の文字が翻訳された状態で返ってきます
- **音声と動画** - MP3、M4A、WAV、FLAC、OGG、AAC、Opus、MP4、MOV、WebM、MKV を、翻訳済みの字幕、または話されている言語のままの書き起こし (SRT、VTT、TXT、JSON) にします
- **テキストの一括翻訳** - 個別の文字列を順番どおりに翻訳。長いテキスト 1 件 (100,000 文字まで) も渡せ、その場合は Equalang が文の区切りで分割します。テキストは 100 以上、ファイルは 12 の言語に対応
- **ファイル丸ごと、コピペ不要** - 1 ファイル 100 MB まで、パスまたは公開 URL で指定。テキストボックスに小分けで貼り付ける必要はありません
- **トークンを消費しない** - エージェントはパスか URL を渡し、パスを受け取るだけ。300 ページの PDF が会話に入ることはありません
- **始める前に料金がわかる** - `estimate_cost` がジョブの費用の上限を無料で答えます。失敗したジョブとキャンセルしたジョブは無料。録音は実際に聞き取られた発話分だけ課金。クレジットに有効期限はありません

## キーを取得する

<https://equalang.com> で登録し、<https://equalang.com/api-keys> でキーを作成します。新規アカウントには無料クレジットが付いてきます。ドキュメントを 1 本通して、仕上がりを確かめるには十分な量です。

キーは MCP クライアントの設定の環境変数に入れます。URL には決して入れないでください。キーが表示されるのは一度だけで、Equalang が保持するのはそのハッシュだけです。キーがなくてもサーバーは起動し、ツール一覧を返します。キーが必要なツールは、キーの取得方法を答えます。

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
| `translate_text` | 個別の文字列を順番どおりに翻訳します。長いテキスト 1 件も渡せ、その場合は Equalang が文の区切りで分割します。 |
| `estimate_cost` | 何も開始せずにファイルをアップロードし、そのファイルに対するジョブの費用の上限と、再アップロードなしでジョブを開始できる `file_id` を返します。無料。 |
| `check_job` | ジョブの確認を再開し、完了していれば結果を保存します。 |
| `cancel_job` | 待機中または実行中のジョブを停止します。キャンセルしたジョブは課金されません。 |
| `get_credit_balance` | アカウントのクレジット残高。 |
| `list_languages` | 言語コードと名称。稼働中の API から読み取ります。キー不要。 |

## 知っておきたい 4 つのこと

**言語。** コードは `en`、`zh-CN`、`ja` のような形式です。このパッケージに言語リストは組み込まれていません。`list_languages` が稼働中の API からコードと名称を読み取る (ファイル向けはテキスト向けより少ない) ため、Equalang が追加した言語はアップデートなしで使えます。ソース言語を省略すると自動検出されます。

**クレジット。** 処理はアカウントのクレジット、つまりウェブサイトと同じ残高を消費するため、サーバーはモデルに対し、先に費用を伝えて同意を得るよう指示します。その金額の出どころが `estimate_cost` です。

**ジョブには数分かかる。** ツールはジョブの完了を待ちますが、クライアントが 1 回の呼び出しに許す時間は超えません (デフォルト 50 s、`wait_seconds` は最大 240)。それを過ぎるとモデルはジョブ id を受け取り、`check_job` を呼ぶよう伝えられます。`check_job` は結果をあるべき場所に保存します。

**上限。** 1 ファイル 100 MB まで。`translate_text` は 5,000 文字までのテキストを最大 50 件 (1 回の呼び出しで 20,000 文字まで)、または 100,000 文字までのテキスト 1 件を受け付けます。

## よくある質問

**翻訳した PDF のレイアウトは保たれますか?**
はい、それこそがこのツールの狙いです。テキストは元の位置に戻され、表、画像、数式もそのままです。DOCX、PPTX、XLSX は編集可能なまま返ってきます。

**ドキュメントはモデルに送られますか?**
いいえ。サーバーはファイルを Equalang にアップロードし、パスを返すだけです。300 ページの論文でもトークンは消費しません。

**画像の中の文字も翻訳できますか?**
はい。JPG、PNG、WebP、BMP 内の文字を認識して翻訳し、画像の中に描き戻します。

**ジョブの費用はいくらですか?**
何かが始まる前に `estimate_cost` が教えてくれます。しかも無料です。料金は <https://equalang.com/pricing> をご覧ください。

## 設計

3 つの判断と、それぞれの理由:

1. **ファイルはモデルを通らない。** MCP にはファイル型がなく、5 MB の PDF をツール結果に載せれば、何も伝えないままコンテキストを大量に消費します。ツールが受け取るのは*ファイルの場所* (このマシン上の絶対パス、または公開 `http(s)` URL) で、返すのは*結果を書き出した場所*です。URL は Equalang に渡され、Equalang が自分で取得します。アップロードし直すためだけにここへダウンロードすることはありません。
2. **ジョブは 1 回のツール呼び出しの中で完結する。** ジョブ id を返してモデルのポーリングに任せると、そのループは途中で放棄されます。ツールは待ちます。確認の合間は API の `Retry-After` が求める時間だけ休み、進捗を求めたクライアントには進捗を報告します。ただし、クライアントが 1 回の呼び出しに許す時間は超えません (デフォルト 50 s、`wait_seconds` は最大 240)。それを過ぎるとモデルは id を受け取り、`check_job` を呼ぶよう伝えられます。そのジョブの結果の保存先はサーバーが覚えています。
3. **API の答えは推測せず、そのまま伝える。** 失敗を再試行できるかどうかは API の `retryable` で決まり、ステータスコードの解釈では決めません。ジョブの費用の上限は API の `quote` であり、このパッケージに写した料金表ではありません。言語リストは API の OpenAPI ドキュメントから読み取ります。ジョブを作成するリクエストは、このクライアント自身のリトライを通じて同じ `Idempotency-Key` を使うため、応答が失われても、課金される 2 つ目のジョブにはなりません。

答えは 2 通りで返されます。すべてのクライアント向けのテキストと、それを読めるクライアント向けの `structuredContent` です。さらに、書き出した各ファイルは `resource_link` としても示されます。これは MCP がバイト列を運ばずに「ここにファイルがある」と伝える方法です。すべてのツールに共通すること (パスを受け取りパスを返す、消費の前に確認する) は、サーバーの `instructions` に一度だけ書かれています。結果が上書きされることはなく、使用済みの名前には ` (1)` が付きます。相対パスは拒否されます。このプロセスはエージェントと作業ディレクトリを共有していないためです。

## 開発

```bash
npm install && npm run build
node selftest.mjs                                          # プロトコル、ツール一覧、キー不要のツール
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # さらに実際のジョブ (クレジットを消費)
node check-api.mjs                                         # パス、フィールド、ツール説明が約束する内容を、API の現行コントラクトと照合
```

`EQUALANG_BASE_URL` でサーバーの接続先を別のデプロイに変更できます。

## リンク

- [Equalang](https://equalang.com) · [料金](https://equalang.com/pricing) · [開発者向けドキュメント](https://equalang.com/developers)
- エージェント向け API: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) - 同じ操作を Agent Skill として提供
- お問い合わせ: <support@equalang.com>

## ライセンス

[Apache-2.0](../LICENSE) © Equalang
