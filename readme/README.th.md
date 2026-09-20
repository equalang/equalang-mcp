# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · **ไทย** · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[เว็บไซต์](https://equalang.com) · [ราคา](https://equalang.com/pricing) · [เอกสารสำหรับนักพัฒนา](https://equalang.com/developers) · [คีย์ API](https://equalang.com/api-keys)

> **คีย์เวิร์ด:** แปลเอกสาร, แปล pdf, แปล pdf รูปแบบเดิม, แปลไฟล์ word, แปลไฟล์ docx, แปล powerpoint, แปลไฟล์ excel, แปล epub, แปลซับไตเติ้ล, แปลไฟล์ srt, แปลข้อความในรูปภาพ, แปลวิดีโอ, ถอดเสียงเป็นข้อความ, แปลงเสียงเป็นข้อความ, โปรแกรมแปลภาษา ai, api แปลภาษา, mcp server, model context protocol, claude mcp, cursor mcp, translation api

**แปลทั้งไฟล์ เลย์เอาต์อยู่ครบ** เซิร์ฟเวอร์ MCP สำหรับ [Equalang](https://equalang.com) - เครื่องมือแปลภาษาด้วย AI ที่ทำงานกับไฟล์ทั้งไฟล์: ส่ง PDF ไปก็ได้ PDF กลับมา ส่งสไลด์ไปก็ได้สไลด์กลับมา ตาราง รูปภาพ และสูตรอยู่ที่เดิมครบ นอกจากนี้ยังแปลคำบรรยายและรูปภาพ เปลี่ยนเสียงและวิดีโอเป็นคำบรรยายที่แปลแล้วหรือบทถอดเสียง และแปลข้อความจำนวนมากในคราวเดียว ใช้ได้ใน Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code และไคลเอนต์ MCP อื่นทุกตัว

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## ฟีเจอร์

- **เข้ารูปแบบไหน ออกรูปแบบนั้น** - PDF, DOCX, PPTX, XLSX, EPUB, HTML และ TXT ได้กลับมาในรูปแบบเดิม ยังแก้ไขต่อได้ ตาราง รูปภาพ สูตร และเลย์เอาต์ของหน้าอยู่ครบ
- **คำบรรยายและรูปภาพ** - SRT และ VTT คงเวลากำกับไว้ตามเดิม เลือกให้แสดงบรรทัดต้นฉบับไว้เหนือคำแปลได้ ส่วน JPG, PNG, WebP และ BMP ได้กลับมาโดยข้อความในภาพถูกแปลแล้ว
- **เสียงและวิดีโอ** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM และ MKV กลายเป็นคำบรรยายที่แปลแล้ว หรือบทถอดเสียงในภาษาที่พูด (SRT, VTT, TXT, JSON)
- **ข้อความจำนวนมาก** - สตริงที่แยกกันถูกแปลตามลำดับ หรือข้อความยาวหนึ่งข้อความ (สูงสุด 100,000 อักขระ) ที่ Equalang ตัดตามประโยคเอง
- **กว่า 100 ภาษา** - กว่า 100 ภาษาสำหรับข้อความ และ 12 ภาษาสำหรับไฟล์ โดยตรวจจับภาษาต้นทางให้เองเมื่อไม่ได้ระบุ

## รับคีย์

สมัครที่ <https://equalang.com> แล้วสร้างคีย์ที่ <https://equalang.com/api-keys> บัญชีใหม่มีเครดิตฟรีให้ตั้งแต่เริ่ม - พอสำหรับลองแปลเอกสารหนึ่งฉบับแล้วดูผลที่ได้กลับมา

คีย์ใส่ไว้ในตัวแปรสภาพแวดล้อมในคอนฟิกของไคลเอนต์ MCP ไม่ใส่ใน URL เด็ดขาด คีย์จะแสดงเพียงครั้งเดียว Equalang เก็บไว้เฉพาะค่าแฮชของคีย์เท่านั้น ถึงไม่มีคีย์ เซิร์ฟเวอร์ก็ยังเริ่มทำงานและแสดงรายการเครื่องมือได้ ส่วนเครื่องมือที่ต้องใช้คีย์จะตอบกลับด้วยวิธีขอคีย์

## ติดตั้ง

ต้องใช้ Node 18 ขึ้นไป

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

`-s user` ทำให้ใช้ได้ในทุกโปรเจกต์ ส่วนขอบเขตเริ่มต้นคือ `local` ซึ่งโหลดเซิร์ฟเวอร์เฉพาะในไดเรกทอรีที่รันคำสั่งเท่านั้น
</details>

<details>
<summary><b>OpenAI Codex</b></summary>

```bash
codex mcp add equalang --env EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```
</details>

<details>
<summary><b>Claude Desktop, Cursor, Windsurf, Cline และไคลเอนต์อื่นที่ตั้งค่าด้วย JSON</b></summary>

เพิ่มส่วนนี้ลงในคอนฟิก MCP ของไคลเอนต์ - `claude_desktop_config.json`, `~/.cursor/mcp.json`, `~/.codeium/windsurf/mcp_config.json` หรือไฟล์ที่เอกสารของไคลเอนต์คุณระบุไว้:

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

อยากใช้สกิลมากกว่า? [equalang-skill](https://github.com/equalang/equalang-skill) ให้การทำงานชุดเดียวกันในรูปของ Agent Skill - สคริปต์ Python ไฟล์เดียว ไม่ต้องติดตั้งอะไร

## เครื่องมือ

| เครื่องมือ | ทำอะไร |
| --- | --- |
| `translate_file` | แปลไฟล์ (พาธหรือ URL สาธารณะ) เป็นอีกภาษาหนึ่ง แล้วบันทึกผลลัพธ์ไว้ข้างไฟล์ต้นฉบับ |
| `transcribe_recording` | ถอดสิ่งที่พูดในไฟล์เสียงหรือวิดีโอออกมาเป็นข้อความพร้อมเวลากำกับ (SRT, VTT, TXT, JSON) |
| `translate_text` | แปลสตริงที่แยกกัน ตามลำดับ - หรือข้อความยาวหนึ่งข้อความ ซึ่ง Equalang จะตัดตามประโยคเอง |
| `estimate_cost` | อัปโหลดไฟล์โดยยังไม่เริ่มงานใด ๆ ตอบกลับด้วยค่าใช้จ่ายสูงสุดที่งานบนไฟล์นั้นอาจใช้ พร้อม `file_id` ที่ใช้เริ่มงานได้โดยไม่ต้องอัปโหลดซ้ำ ไม่มีค่าใช้จ่าย |
| `check_job` | กลับมาติดตามงานต่อ และบันทึกผลลัพธ์เมื่องานเสร็จ |
| `cancel_job` | หยุดงานที่อยู่ในคิวหรือกำลังทำงาน งานที่ยกเลิกจะไม่ถูกคิดค่าใช้จ่าย |
| `get_credit_balance` | เครดิตของบัญชี |
| `list_languages` | รหัสและชื่อภาษา อ่านจาก API ที่ใช้งานจริง ไม่ต้องใช้คีย์ |

รหัสภาษามีหน้าตาแบบ `en`, `zh-CN`, `ja` โดย `list_languages` อ่านรหัสเหล่านี้จาก API ที่ใช้งานจริง ภาษาที่ Equalang เพิ่มเข้ามาจึงไม่ต้องอัปเดตที่นี่ งานใช้เวลาหลายนาที - เครื่องมือจะรอได้ไม่เกิน `wait_seconds` (ค่าเริ่มต้น 50 s, สูงสุด 240) แล้วคืน id ของงานไว้ให้ `check_job`

## ลิงก์

- [Equalang](https://equalang.com) · [ราคา](https://equalang.com/pricing) · [เอกสารสำหรับนักพัฒนา](https://equalang.com/developers)
- API สำหรับเอเจนต์: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) - การทำงานชุดเดียวกันในรูปของ Agent Skill
- สอบถาม: <support@equalang.com>

## สัญญาอนุญาต

[Apache-2.0](../LICENSE) © Equalang
