# Máy chủ MCP Equalang

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · **Tiếng Việt** · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

Trao [Equalang](https://equalang.com) cho agent: dịch trọn tệp mà vẫn giữ bố cục, chép lời bản ghi âm, dịch chuỗi văn bản.

- **Tài liệu** - PDF, DOCX, PPTX, XLSX, EPUB, HTML, TXT - trả về đúng định dạng cũ, bảng, hình ảnh và công thức nằm nguyên chỗ.
- **Phụ đề** (SRT, VTT) và **hình ảnh** (JPG, PNG, WebP, BMP).
- **Âm thanh và video** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM, MKV - trả về dưới dạng phụ đề đã dịch, hoặc bản chép lời bằng chính ngôn ngữ được nói.

Agent truyền vào một đường dẫn hoặc URL và nhận lại các đường dẫn. Nội dung tệp không bao giờ đi vào cuộc hội thoại.

## Cài đặt

Tạo khóa tại <https://equalang.com/api-keys>, rồi thêm máy chủ vào client của bạn:

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

Cần Node 18 trở lên. Không có khóa, máy chủ vẫn khởi động và liệt kê các công cụ; công cụ nào cần khóa sẽ trả lời bằng cách lấy khóa.

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

**Credit.** Công việc tiêu credit của tài khoản - cùng số dư với trang web - nên máy chủ yêu cầu mô hình nêu chi phí và được đồng ý trước; con số ấy lấy từ `estimate_cost`. Bản ghi âm được tính phí theo phần lời nói thực sự nghe được, nên thường rẻ hơn ước tính.

**Ngôn ngữ.** Mã có dạng `en`, `zh-CN`, `ja`. Gói này không kèm sẵn danh sách nào: `list_languages` đọc mã và tên từ API đang chạy (tệp hỗ trợ ít ngôn ngữ hơn văn bản), nên ngôn ngữ Equalang mới thêm dùng được ngay mà không cần cập nhật. Bỏ trống ngôn ngữ nguồn để tự động phát hiện.

**Định dạng và giới hạn.** Các định dạng nêu trên, tối đa 100 MB mỗi tệp; `translate_text` nhận tối đa 50 đoạn văn bản, mỗi đoạn 5,000 ký tự (mỗi lần gọi 20,000), hoặc một văn bản tối đa 100,000.

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

`EQUALANG_BASE_URL` trỏ máy chủ sang một bản triển khai khác. Bản thân API: <https://equalang.com/llms.txt>.

Apache-2.0.
