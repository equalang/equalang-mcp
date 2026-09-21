# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · **Bahasa Indonesia** · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[Situs web](https://equalang.com) · [Harga](https://equalang.com/pricing) · [Dokumentasi developer](https://equalang.com/developers) · [Kunci API](https://equalang.com/api-keys)

> **Kata kunci:** terjemahan dokumen, translate pdf, terjemahkan pdf tanpa merusak format, translate file word, translate docx, translate ppt, translate file excel, translate epub, translate subtitle, terjemahkan file srt, translate teks di gambar, translate video, transkripsi audio, ubah suara jadi teks, penerjemah ai, api terjemahan, mcp server, model context protocol, claude mcp, cursor mcp, translation api

**Terjemahkan filenya, pertahankan tata letaknya.** Sebuah server MCP untuk [Equalang](https://equalang.com) - penerjemah AI yang bekerja pada file utuh: PDF kembali sebagai PDF, presentasi sebagai presentasi, dengan tabel, gambar, dan rumus tetap di tempatnya. Ia juga menerjemahkan subtitle dan gambar, mengubah audio dan video menjadi subtitle terjemahan atau transkrip, serta menerjemahkan teks-teks pendek secara massal. Berjalan di Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code, dan semua klien MCP lainnya.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Fitur

- **Dokumen** - PDF, DOCX, PPTX, XLSX, EPUB, HTML, dan TXT kembali dalam format yang sama, tetap bisa diedit, dengan tabel, gambar, rumus, dan tata letak halaman tetap di tempatnya
- **Subtitle dan gambar** - SRT dan VTT mempertahankan timing-nya, dengan opsi baris asli di atas terjemahan; JPG, PNG, WebP, dan BMP kembali dengan teks di dalam gambar sudah diterjemahkan
- **Audio dan video** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM, dan MKV menjadi subtitle terjemahan, atau transkrip dalam bahasa yang diucapkan (SRT, VTT, TXT, JSON)
- **Teks secara massal** - teks-teks pendek diterjemahkan sesuai urutan, atau satu teks panjang (hingga 100,000 karakter) yang dipotong sendiri oleh Equalang per kalimat
- **Bahasa** - 100+ untuk teks dan 12 untuk file, dengan bahasa sumber terdeteksi otomatis saat Anda mengosongkannya

## Dapatkan kunci

Daftar di <https://equalang.com> dan buat kunci di <https://equalang.com/api-keys>. Akun baru langsung mendapat kredit gratis, cukup untuk mencoba satu dokumen.

Kunci ditaruh di variabel lingkungan pada konfigurasi klien MCP, tidak pernah di dalam URL. Tanpa kunci, server tetap berjalan dan menampilkan daftar tool-nya; tool yang membutuhkan kunci akan menjawab dengan cara mendapatkannya.

Kunci juga bisa disimpan sekali per mesin, di `~/.config/equalang/.env` sebagai `EQUALANG_API_KEY=el_your_key`: server membaca file itu bila environment-nya tidak berisi kunci, begitu pula skill Equalang - konfigurasi klien pun tidak perlu `env`.

## Instalasi

Membutuhkan Node 18 atau lebih baru.

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

`-s user` memasangnya di semua proyek; cakupan bawaan, `local`, hanya memuat server di direktori tempat perintah dijalankan.
</details>

<details>
<summary><b>OpenAI Codex</b></summary>

```bash
codex mcp add equalang --env EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```
</details>

<details>
<summary><b>Claude Desktop, Cursor, Windsurf, Cline, dan klien lain yang dikonfigurasi lewat JSON</b></summary>

Tambahkan ini ke konfigurasi MCP klien - `claude_desktop_config.json`, `~/.cursor/mcp.json`, `~/.codeium/windsurf/mcp_config.json`, atau file yang disebutkan dokumentasi klien Anda:

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

Lebih suka skill? [equalang-skill](https://github.com/equalang/equalang-skill) menawarkan operasi yang sama sebagai Agent Skill - satu skrip Python, tidak ada yang perlu diinstal.

## Tool

| Tool | Fungsinya |
| --- | --- |
| `translate_file` | Menerjemahkan file (path atau URL publik) ke bahasa lain dan menyimpan hasilnya di samping file asli. |
| `transcribe_recording` | Menuliskan apa yang diucapkan dalam file audio atau video sebagai teks berpenanda waktu (SRT, VTT, TXT, JSON). |
| `translate_text` | Menerjemahkan teks-teks pendek, sesuai urutan - atau satu teks panjang, yang dipotong sendiri oleh Equalang per kalimat. |
| `estimate_cost` | Mengunggah file tanpa memulai apa pun; menjawab dengan biaya maksimum sebuah job atas file itu, serta `file_id` yang memulai job tanpa unggahan kedua. Gratis. |
| `check_job` | Melanjutkan pemantauan job, dan menyimpan hasilnya setelah selesai. |
| `cancel_job` | Menghentikan job yang sedang antre atau berjalan. Job yang dibatalkan tidak dikenai biaya. |
| `get_credit_balance` | Kredit akun. |
| `list_languages` | Semua kode dan nama bahasa. Tidak memerlukan kunci. |

Kode bahasa berbentuk seperti `en`, `zh-CN`, `ja`; daftar lengkapnya ada di `list_languages`. Job memakan waktu beberapa menit - tool menunggu hingga `wait_seconds` (bawaan 50 s, paling lama 240), lalu mengembalikan id job untuk diambil `check_job`.

## Tautan

- [Equalang](https://equalang.com) · [Harga](https://equalang.com/pricing) · [Dokumentasi developer](https://equalang.com/developers)
- API untuk agen: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) - operasi yang sama sebagai Agent Skill
- Pertanyaan: <support@equalang.com>

## Lisensi

[Apache-2.0](../LICENSE) © Equalang
