# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · **Tiếng Việt** · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[Trang web](https://equalang.com) · [Bảng giá](https://equalang.com/pricing) · [Tài liệu cho nhà phát triển](https://equalang.com/developers) · [Khóa API](https://equalang.com/api-keys)

> **Từ khóa:** dịch tài liệu, dịch pdf, dịch pdf giữ nguyên định dạng, dịch file word, dịch file docx, dịch powerpoint, dịch file excel, dịch epub, dịch phụ đề, dịch file srt, dịch chữ trong ảnh, dịch video, chuyển giọng nói thành văn bản, chép lời ghi âm, dịch bằng ai, api dịch thuật, mcp server, model context protocol, claude mcp, cursor mcp, translation api

**Dịch tệp, giữ nguyên bố cục.** Một máy chủ MCP cho [Equalang](https://equalang.com) - trình dịch AI làm việc trên trọn tệp: PDF trả về vẫn là PDF, bản trình chiếu vẫn là bản trình chiếu, bảng, hình ảnh và công thức nằm nguyên chỗ cũ. Nó còn dịch phụ đề và hình ảnh, biến âm thanh và video thành phụ đề đã dịch hoặc bản chép lời, và dịch hàng loạt chuỗi văn bản. Dùng được trong Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code và mọi client MCP khác.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Tính năng

- **Định dạng nào vào, định dạng ấy ra** - PDF, DOCX, PPTX, XLSX, EPUB, HTML và TXT trả về đúng định dạng cũ, vẫn chỉnh sửa được, bảng, hình ảnh, công thức và bố cục trang giữ nguyên
- **Phụ đề và hình ảnh** - SRT và VTT giữ nguyên mốc thời gian, tùy chọn kèm dòng gốc phía trên bản dịch; JPG, PNG, WebP và BMP trả về với phần chữ trong ảnh đã được dịch
- **Âm thanh và video** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM và MKV trở thành phụ đề đã dịch, hoặc bản chép lời bằng chính ngôn ngữ được nói (SRT, VTT, TXT, JSON)
- **Văn bản hàng loạt** - các chuỗi riêng lẻ được dịch theo đúng thứ tự, hoặc một văn bản dài (tối đa 100,000 ký tự) do Equalang tự cắt theo câu; hơn 100 ngôn ngữ cho văn bản, 12 cho tệp
- **Trọn tệp, không cần dán** - tối đa 100 MB mỗi tệp, từ một đường dẫn hoặc URL công khai; không phải chia nhỏ vào các ô văn bản
- **Không tốn token** - agent truyền vào một đường dẫn hoặc URL và nhận lại các đường dẫn; một PDF 300 trang không bao giờ đi vào cuộc hội thoại
- **Biết giá trước khi chạy** - `estimate_cost` cho biết mức tối đa một tác vụ có thể tốn, miễn phí; tác vụ thất bại hoặc bị hủy không mất gì; bản ghi âm được tính phí theo phần lời nói thực sự nghe được; credit không bao giờ hết hạn

## Lấy khóa

Đăng ký tại <https://equalang.com> và tạo khóa tại <https://equalang.com/api-keys>. Tài khoản mới có sẵn credit miễn phí - đủ để chạy thử một tài liệu và xem kết quả trả về.

Khóa được đặt trong một biến môi trường ở cấu hình của client MCP, không bao giờ nằm trong URL. Khóa chỉ hiển thị một lần; Equalang chỉ lưu giá trị băm của nó. Không có khóa, máy chủ vẫn khởi động và liệt kê các công cụ; công cụ nào cần khóa sẽ trả lời bằng cách lấy khóa.

## Cài đặt

Cần Node 18 trở lên.

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

`-s user` đưa máy chủ vào mọi dự án; phạm vi mặc định, `local`, chỉ tải máy chủ trong thư mục nơi lệnh được chạy.
</details>

<details>
<summary><b>OpenAI Codex</b></summary>

```bash
codex mcp add equalang --env EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```
</details>

<details>
<summary><b>Claude Desktop, Cursor, Windsurf, Cline và các client cấu hình bằng JSON khác</b></summary>

Thêm đoạn này vào cấu hình MCP của client - `claude_desktop_config.json`, `~/.cursor/mcp.json`, `~/.codeium/windsurf/mcp_config.json`, hoặc tệp mà tài liệu của client chỉ định:

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

Thích dùng skill hơn? [equalang-skill](https://github.com/equalang/equalang-skill) cung cấp cùng các thao tác dưới dạng Agent Skill - một script Python, không phải cài gì.

## Công cụ

| Công cụ | Chức năng |
| --- | --- |
| `translate_file` | Dịch một tệp (đường dẫn hoặc URL công khai) sang ngôn ngữ khác và lưu kết quả ngay cạnh tệp gốc. |
| `transcribe_recording` | Chép lại lời nói trong tệp âm thanh hoặc video thành văn bản có mốc thời gian (SRT, VTT, TXT, JSON). |
| `translate_text` | Dịch các chuỗi riêng lẻ, theo đúng thứ tự - hoặc một văn bản dài, do Equalang tự cắt theo câu. |
| `estimate_cost` | Tải tệp lên mà không khởi chạy gì; trả về chi phí tối đa của một tác vụ trên tệp đó, kèm một `file_id` để khởi chạy tác vụ mà không phải tải lên lần nữa. Miễn phí. |
| `check_job` | Tiếp tục theo dõi một tác vụ, và lưu kết quả khi nó hoàn tất. |
| `cancel_job` | Dừng một tác vụ đang chờ hoặc đang chạy. Tác vụ đã hủy không bị tính phí. |
| `get_credit_balance` | Số credit của tài khoản. |
| `list_languages` | Mã và tên ngôn ngữ, đọc từ API đang chạy. Không cần khóa. |

## Bốn điều nên biết

**Ngôn ngữ.** Mã có dạng `en`, `zh-CN`, `ja`. Gói này không kèm sẵn danh sách nào: `list_languages` đọc mã và tên từ API đang chạy (tệp hỗ trợ ít ngôn ngữ hơn văn bản), nên ngôn ngữ Equalang mới thêm dùng được ngay mà không cần cập nhật. Bỏ trống ngôn ngữ nguồn để tự động phát hiện.

**Credit.** Công việc tiêu credit của tài khoản - cùng số dư với trang web - nên máy chủ yêu cầu mô hình nêu chi phí và được đồng ý trước; con số ấy lấy từ `estimate_cost`.

**Tác vụ mất vài phút.** Công cụ chờ tác vụ của mình, nhưng không quá thời gian client cho phép một lần gọi (mặc định 50 s, `wait_seconds` tối đa 240). Sau đó mô hình nhận id tác vụ và được bảo gọi `check_job`, công cụ này sẽ lưu kết quả vào đúng chỗ.

**Giới hạn.** Tối đa 100 MB mỗi tệp; `translate_text` nhận tối đa 50 đoạn văn bản, mỗi đoạn 5,000 ký tự (mỗi lần gọi 20,000), hoặc một văn bản tối đa 100,000.

## Câu hỏi thường gặp

**PDF đã dịch có giữ nguyên bố cục không?**
Có - đó chính là mục đích. Văn bản được đặt lại đúng chỗ cũ, bảng, hình ảnh và công thức nằm nguyên vị trí; DOCX, PPTX hay XLSX vẫn chỉnh sửa được.

**Tài liệu của tôi có bị gửi cho mô hình không?**
Không. Máy chủ tải tệp lên Equalang và trả lời bằng một đường dẫn. Một bài báo 300 trang không tốn token nào.

**Có dịch được chữ bên trong hình ảnh không?**
Có. Chữ trong JPG, PNG, WebP hoặc BMP được nhận dạng, dịch và vẽ lại vào ảnh.

**Một tác vụ tốn bao nhiêu?**
`estimate_cost` cho biết trước khi bất cứ thứ gì bắt đầu, và hoàn toàn miễn phí. Bảng giá có tại <https://equalang.com/pricing>.

## Cách nó được xây dựng

Ba quyết định, mỗi quyết định có một lý do:

1. **Tệp không bao giờ đi qua mô hình.** MCP không có kiểu tệp, và một PDF 5 MB trong kết quả công cụ ngốn cả đống ngữ cảnh mà chẳng nói được gì. Công cụ nhận *tệp nằm ở đâu* - một đường dẫn tuyệt đối trên máy này, hoặc một URL `http(s)` công khai - và trả lời bằng *kết quả được ghi ở đâu*. URL được chuyển cho Equalang để nó tự tải; không có gì được tải về đây chỉ để rồi tải lên lại.
2. **Một tác vụ nằm gọn trong một lần gọi công cụ.** Trả về id tác vụ rồi trông chờ mô hình tự thăm dò là một vòng lặp hay bị bỏ dở giữa chừng. Công cụ sẽ chờ - nghỉ giữa các lần kiểm tra đúng bằng thời gian `Retry-After` của API yêu cầu, và báo tiến độ cho client nào có yêu cầu - nhưng không quá thời gian client cho phép một lần gọi (mặc định 50 s, `wait_seconds` tối đa 240). Sau đó mô hình nhận id và được bảo gọi `check_job`; máy chủ nhớ kết quả của tác vụ đó phải đặt ở đâu.
3. **Câu trả lời của API được thuật lại, không phải đoán.** Một lỗi có thử lại được hay không là do `retryable` của API, không phải do suy diễn từ mã trạng thái. Một tác vụ có thể tốn bao nhiêu là `quote` của API, không phải một mức giá chép vào gói này. Danh sách ngôn ngữ được đọc từ tài liệu OpenAPI của API. Yêu cầu tạo tác vụ mang cùng một `Idempotency-Key` qua các lần thử lại của chính client này, nên một câu trả lời bị mất không thể biến thành tác vụ thứ hai bị tính phí.

Mỗi câu trả lời được nói hai lần - dạng văn bản cho mọi client và dạng `structuredContent` cho những client đọc được nó - và mỗi tệp được ghi ra còn được nêu dưới dạng `resource_link`, cách MCP nói "đây là một tệp" mà không mang theo byte của nó. Điều đúng với mọi công cụ (đường dẫn vào, đường dẫn ra, hỏi trước khi tiêu) được nói một lần, trong `instructions` của máy chủ. Kết quả không bao giờ ghi đè: tên đã có sẽ được thêm ` (1)`. Đường dẫn tương đối bị từ chối - tiến trình này không dùng chung thư mục làm việc với agent.

## Phát triển

```bash
npm install && npm run build
node selftest.mjs                                          # giao thức, danh sách công cụ, công cụ không cần khóa
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # thêm các tác vụ thật (tiêu credit)
node check-api.mjs                                         # đường dẫn, trường, và những gì mô tả công cụ cam kết, đối chiếu với hợp đồng API đang chạy
```

`EQUALANG_BASE_URL` trỏ máy chủ sang một bản triển khai khác.

## Liên kết

- [Equalang](https://equalang.com) · [Bảng giá](https://equalang.com/pricing) · [Tài liệu cho nhà phát triển](https://equalang.com/developers)
- API dành cho agent: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) - cùng các thao tác, dưới dạng Agent Skill
- Thắc mắc: <support@equalang.com>

## Giấy phép

[Apache-2.0](../LICENSE) © Equalang
