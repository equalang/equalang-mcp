# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · **Tiếng Việt** · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[Trang web](https://equalang.com) · [Bảng giá](https://equalang.com/pricing) · [Tài liệu cho nhà phát triển](https://equalang.com/developers) · [Khóa API](https://equalang.com/api-keys)

> **Từ khóa:** dịch tài liệu, dịch pdf, dịch pdf giữ nguyên định dạng, dịch file word, dịch file docx, dịch powerpoint, dịch file excel, dịch epub, dịch phụ đề, dịch file srt, dịch chữ trong ảnh, dịch video, chuyển giọng nói thành văn bản, chép lời ghi âm, dịch bằng ai, api dịch thuật, mcp server, model context protocol, claude mcp, cursor mcp, translation api

**Dịch tệp, giữ nguyên bố cục.** Một máy chủ MCP cho [Equalang](https://equalang.com) - trình dịch AI làm việc trên trọn tệp: PDF trả về vẫn là PDF, bản trình chiếu vẫn là bản trình chiếu, bảng, hình ảnh và công thức nằm nguyên chỗ cũ. Nó còn dịch phụ đề và hình ảnh, biến âm thanh và video thành phụ đề đã dịch hoặc bản chép lời, và dịch hàng loạt văn bản ngắn. Dùng được trong Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code và mọi client MCP khác.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Tính năng

- **Tài liệu** - PDF, DOCX, PPTX, XLSX, EPUB, HTML và TXT trả về đúng định dạng cũ, vẫn chỉnh sửa được, bảng, hình ảnh, công thức và bố cục trang giữ nguyên
- **Phụ đề và hình ảnh** - SRT và VTT giữ nguyên mốc thời gian, tùy chọn kèm dòng gốc phía trên bản dịch; JPG, PNG, WebP và BMP trả về với phần chữ trong ảnh đã được dịch
- **Âm thanh và video** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM và MKV trở thành phụ đề đã dịch, hoặc bản chép lời bằng chính ngôn ngữ được nói (SRT, VTT, TXT, JSON)
- **Văn bản hàng loạt** - các văn bản ngắn được dịch theo đúng thứ tự, hoặc một văn bản dài (tối đa 100,000 ký tự) do Equalang tự cắt theo câu
- **Ngôn ngữ** - hơn 100 cho văn bản và 12 cho tệp, tự động phát hiện ngôn ngữ nguồn khi bạn bỏ trống

## Lấy khóa

Đăng ký tại <https://equalang.com> và tạo khóa tại <https://equalang.com/api-keys>. Tài khoản mới có sẵn credit miễn phí, đủ để dịch thử một tài liệu.

Khóa được đặt trong một biến môi trường ở cấu hình của client MCP, không bao giờ nằm trong URL. Không có khóa, máy chủ vẫn khởi động và liệt kê các công cụ; công cụ nào cần khóa sẽ trả lời bằng cách lấy khóa.

Khóa cũng có thể được lưu một lần cho mỗi máy, trong `~/.config/equalang/.env` dưới dạng `EQUALANG_API_KEY=el_your_key`: máy chủ đọc tệp này khi biến môi trường không có khóa, skill của Equalang cũng vậy - khi đó cấu hình client không cần `env` nữa.

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
| `translate_text` | Dịch các văn bản ngắn, theo đúng thứ tự - hoặc một văn bản dài, do Equalang tự cắt theo câu. |
| `estimate_cost` | Tải tệp lên mà không khởi chạy gì; trả về chi phí tối đa của một tác vụ trên tệp đó, kèm một `file_id` để khởi chạy tác vụ mà không phải tải lên lần nữa. Miễn phí. |
| `check_job` | Tiếp tục theo dõi một tác vụ, và lưu kết quả khi nó hoàn tất. |
| `cancel_job` | Dừng một tác vụ đang chờ hoặc đang chạy. Tác vụ đã hủy không bị tính phí. |
| `get_credit_balance` | Số credit của tài khoản. |
| `list_languages` | Toàn bộ mã và tên ngôn ngữ. Không cần khóa. |

Mã ngôn ngữ có dạng `en`, `zh-CN`, `ja`; `list_languages` có danh sách đầy đủ. Tác vụ mất vài phút - công cụ chờ tối đa `wait_seconds` (mặc định 50 s, tối đa 240), rồi trả lại một id tác vụ để `check_job` theo dõi tiếp.

## Liên kết

- [Equalang](https://equalang.com) · [Bảng giá](https://equalang.com/pricing) · [Tài liệu cho nhà phát triển](https://equalang.com/developers)
- API dành cho agent: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) - cùng các thao tác, dưới dạng Agent Skill
- Thắc mắc: <support@equalang.com>

## Giấy phép

[Apache-2.0](../LICENSE) © Equalang
