# Equalang MCP サーバー

[English](../README.md) · [简体中文](README.zh-CN.md) · **日本語** · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

エージェントに [Equalang](https://equalang.com) を。レイアウトを保ったままファイルを丸ごと翻訳し、録音を文字に起こし、文字列を翻訳します。

- **ドキュメント** - PDF, DOCX, PPTX, XLSX, EPUB, HTML, TXT - 同じ形式のまま、表・画像・数式も元の位置で返ってきます。
- **字幕** (SRT, VTT) と **画像** (JPG, PNG, WebP, BMP)。
- **音声と動画** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM, MKV - 翻訳済みの字幕、または話されている言語のままの書き起こしとして返ってきます。

エージェントはパスか URL を渡し、パスを受け取ります。ファイルの中身が会話に入ることはありません。

## インストール

<https://equalang.com/api-keys> でキーを作成し、クライアントにサーバーを追加します:

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

Node 18 以降が必要です。キーがなくてもサーバーは起動し、ツール一覧を返します。キーが必要なツールは、キーの取得方法を答えます。

## ツール

| ツール | 機能 |
| --- | --- |
| `translate_file` | ファイル (パスまたは公開 URL) を別の言語に翻訳し、結果を元ファイルの隣に保存します。 |
| `transcribe_recording` | 音声・動画ファイルで話されている内容を、タイムスタンプ付きテキスト (SRT, VTT, TXT, JSON) として書き起こします。 |
| `translate_text` | 短いプレーンテキストを最大 50 件、順番どおりに翻訳します。 |
| `estimate_cost` | 何も開始せずにファイルをアップロードし、そのファイルに対するジョブの費用の上限と、再アップロードなしでジョブを開始できる `file_id` を返します。無料。 |
| `check_job` | ジョブの確認を再開し、完了していれば結果を保存します。 |
| `cancel_job` | 待機中または実行中のジョブを停止します。キャンセルしたジョブは課金されません。 |
| `get_credit_balance` | アカウントのクレジット残高。 |
| `list_languages` | 言語コードと名称。稼働中の API から読み取ります。キー不要。 |

**クレジット。** 処理はアカウントのクレジット - ウェブサイトと同じ残高 - を消費するため、サーバーはモデルに対し、先に費用を伝えて同意を得るよう指示します。その金額の出どころが `estimate_cost` です。録音は実際に聞き取られた発話分だけ課金されるので、たいてい見積もりより安くなります。

**言語。** コードは `en`、`zh-CN`、`ja` のような形式です。このパッケージに言語リストは組み込まれていません。`list_languages` が稼働中の API からコードと名称を読み取る (ファイル向けはテキスト向けより少ない) ため、Equalang が追加した言語はアップデートなしで使えます。ソース言語を省略すると自動検出されます。

**形式と上限。** 上記の形式で、1 ファイル 100 MB まで。`translate_text` は 5,000 文字までのテキストを最大 50 件、1 回の呼び出しで 20,000 文字まで受け付けます。

## 設計

3 つの判断と、それぞれの理由:

1. **ファイルはモデルを通らない。** MCP にはファイル型がなく、5 MB の PDF をツール結果に載せれば、何も伝えないままコンテキストを大量に消費します。ツールが受け取るのは*ファイルの場所* - このマシン上の絶対パス、または公開 `http(s)` URL - で、返すのは*結果を書き出した場所*です。URL は Equalang に渡され、Equalang が自分で取得します。アップロードし直すためだけにここへダウンロードすることはありません。
2. **ジョブは 1 回のツール呼び出しの中で完結する。** ジョブ id を返してモデルのポーリングに任せると、そのループは途中で放棄されます。ツールは待ちます - 確認の合間は API の `Retry-After` が求める時間だけ休み、進捗を求めたクライアントには進捗を報告しながら - ただし、クライアントが 1 回の呼び出しに許す時間は超えません (デフォルト 50 s、`wait_seconds` は最大 240)。それを過ぎるとモデルは id を受け取り、`check_job` を呼ぶよう伝えられます。そのジョブの結果の保存先はサーバーが覚えています。
3. **API の答えは推測せず、そのまま伝える。** 失敗を再試行できるかどうかは API の `retryable` で決まり、ステータスコードの解釈では決めません。ジョブの費用の上限は API の `quote` であり、このパッケージに写した料金表ではありません。言語リストは API の OpenAPI ドキュメントから読み取ります。ジョブを作成するリクエストは、このクライアント自身のリトライを通じて同じ `Idempotency-Key` を使うため、応答が失われても、課金される 2 つ目のジョブにはなりません。

答えは 2 通りで返されます - すべてのクライアント向けのテキストと、それを読めるクライアント向けの `structuredContent` - さらに、書き出した各ファイルは `resource_link` としても示されます。これは MCP がバイト列を運ばずに「ここにファイルがある」と伝える方法です。すべてのツールに共通すること (パスを受け取りパスを返す、消費の前に確認する) は、サーバーの `instructions` に一度だけ書かれています。結果が上書きされることはなく、使用済みの名前には ` (1)` が付きます。相対パスは拒否されます - このプロセスはエージェントと作業ディレクトリを共有していないためです。

## 開発

```bash
npm install && npm run build
node selftest.mjs                                          # プロトコル、ツール一覧、キー不要のツール
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # さらに実際のジョブ (クレジットを消費)
node check-api.mjs                                         # パス、フィールド、ツール説明が約束する内容を、API の現行コントラクトと照合
```

`EQUALANG_BASE_URL` でサーバーの接続先を別のデプロイに変更できます。API 本体: <https://equalang.com/llms.txt>。

Apache-2.0.
