# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · **Bahasa Indonesia** · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[Situs web](https://equalang.com) · [Harga](https://equalang.com/pricing) · [Dokumentasi developer](https://equalang.com/developers) · [Kunci API](https://equalang.com/api-keys)

> **Kata kunci:** terjemahan dokumen, translate pdf, terjemahkan pdf tanpa merusak format, translate file word, translate docx, translate ppt, translate file excel, translate epub, translate subtitle, terjemahkan file srt, translate teks di gambar, translate video, transkripsi audio, ubah suara jadi teks, penerjemah ai, api terjemahan, mcp server, model context protocol, claude mcp, cursor mcp, translation api

**Terjemahkan filenya, pertahankan tata letaknya.** Sebuah server MCP untuk [Equalang](https://equalang.com) - penerjemah AI yang bekerja pada file utuh: PDF kembali sebagai PDF, presentasi sebagai presentasi, dengan tabel, gambar, dan rumus tetap di tempatnya. Ia juga menerjemahkan subtitle dan gambar, mengubah audio dan video menjadi subtitle terjemahan atau transkrip, serta menerjemahkan string secara massal. Berjalan di Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code, dan semua klien MCP lainnya.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Fitur

- **Format masuk, format yang sama keluar** - PDF, DOCX, PPTX, XLSX, EPUB, HTML, dan TXT kembali dalam format yang sama, tetap bisa diedit, dengan tabel, gambar, rumus, dan tata letak halaman tetap di tempatnya
- **Subtitle dan gambar** - SRT dan VTT mempertahankan timing-nya, dengan opsi baris asli di atas terjemahan; JPG, PNG, WebP, dan BMP kembali dengan teks di dalam gambar sudah diterjemahkan
- **Audio dan video** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM, dan MKV menjadi subtitle terjemahan, atau transkrip dalam bahasa yang diucapkan (SRT, VTT, TXT, JSON)
- **Teks secara massal** - string-string terpisah diterjemahkan sesuai urutan, atau satu teks panjang (hingga 100,000 karakter) yang dipotong sendiri oleh Equalang per kalimat; 100+ bahasa untuk teks, 12 untuk file
- **File utuh, tanpa salin-tempel** - hingga 100 MB per file, dari path atau URL publik; tidak ada yang perlu dipecah ke kotak teks
- **Tidak memakan token** - agen memberikan path atau URL dan menerima path sebagai balasan; PDF 300 halaman tidak pernah masuk ke percakapan
- **Harga sebelum job dimulai** - `estimate_cost` menjawab dengan biaya maksimum sebuah job, gratis; job yang gagal atau dibatalkan tidak dikenai biaya; rekaman ditagih berdasarkan ucapan yang benar-benar terdengar; kredit tidak pernah kedaluwarsa

## Dapatkan kunci

Daftar di <https://equalang.com> dan buat kunci di <https://equalang.com/api-keys>. Akun baru langsung mendapat kredit gratis - cukup untuk mencoba satu dokumen dan melihat hasilnya.

Kunci ditaruh di variabel lingkungan pada konfigurasi klien MCP, tidak pernah di dalam URL. Kunci hanya ditampilkan sekali; Equalang hanya menyimpan hash-nya. Tanpa kunci, server tetap berjalan dan menampilkan daftar tool-nya; tool yang membutuhkan kunci akan menjawab dengan cara mendapatkannya.

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
| `translate_text` | Menerjemahkan string-string terpisah, sesuai urutan - atau satu teks panjang, yang dipotong sendiri oleh Equalang per kalimat. |
| `estimate_cost` | Mengunggah file tanpa memulai apa pun; menjawab dengan biaya maksimum sebuah job atas file itu, serta `file_id` yang memulai job tanpa unggahan kedua. Gratis. |
| `check_job` | Melanjutkan pemantauan job, dan menyimpan hasilnya setelah selesai. |
| `cancel_job` | Menghentikan job yang sedang antre atau berjalan. Job yang dibatalkan tidak dikenai biaya. |
| `get_credit_balance` | Kredit akun. |
| `list_languages` | Kode dan nama bahasa, dibaca dari API secara langsung. Tidak memerlukan kunci. |

## Empat hal yang perlu diketahui

**Bahasa.** Kode berbentuk seperti `en`, `zh-CN`, `ja`. Tidak ada daftar yang ditanam dalam paket ini: `list_languages` membaca kode dan nama dari API secara langsung (untuk file lebih sedikit daripada untuk teks), sehingga bahasa yang ditambahkan Equalang langsung tersedia tanpa pembaruan. Kosongkan bahasa sumber agar terdeteksi otomatis.

**Kredit.** Pekerjaan memakai kredit akun - saldo yang sama dengan di situs web - sehingga server meminta model menyebutkan biayanya dan mendapat persetujuan terlebih dahulu; angkanya berasal dari `estimate_cost`.

**Job memakan waktu beberapa menit.** Tool menunggu job-nya, tetapi tidak melebihi waktu yang diizinkan klien untuk satu panggilan (bawaan 50 s, `wait_seconds` hingga 240). Setelah itu model menerima id job dan diminta memanggil `check_job`, yang menyimpan hasilnya di tempat yang semestinya.

**Batas.** Hingga 100 MB per file; `translate_text` menerima hingga 50 teks masing-masing 5,000 karakter (20,000 per panggilan), atau satu teks hingga 100,000.

## Pertanyaan yang sering diajukan

**Apakah PDF hasil terjemahan mempertahankan tata letaknya?**
Ya - justru itu intinya. Teks dikembalikan ke posisi semula, dan tabel, gambar, serta rumus tetap di tempatnya; DOCX, PPTX, atau XLSX tetap bisa diedit.

**Apakah dokumen saya dikirim ke model?**
Tidak. Server mengunggah file ke Equalang dan menjawab dengan sebuah path. Makalah 300 halaman tidak memakan token sama sekali.

**Bisakah ia menerjemahkan teks di dalam gambar?**
Bisa. Teks dalam JPG, PNG, WebP, atau BMP dikenali, diterjemahkan, lalu digambar kembali ke dalam gambar.

**Berapa biaya sebuah job?**
`estimate_cost` memberi tahu sebelum apa pun dimulai, dan itu gratis. Daftar harga ada di <https://equalang.com/pricing>.

## Cara pembuatannya

Tiga keputusan, masing-masing dengan alasannya:

1. **File tidak pernah melewati model.** MCP tidak memiliki tipe file, dan PDF 5 MB di dalam hasil tool menghabiskan konteks sangat banyak tanpa menyampaikan apa pun. Tool menerima *lokasi file* - path absolut di mesin ini, atau URL `http(s)` publik - dan menjawab dengan *lokasi hasil ditulis*. URL diserahkan ke Equalang, yang mengambilnya sendiri; tidak ada yang diunduh ke sini hanya untuk diunggah lagi.
2. **Sebuah job hidup di dalam satu panggilan tool.** Mengembalikan id job lalu berharap model melakukan polling adalah loop yang ditinggalkan di tengah jalan. Tool menunggu - berhenti sejenak di antara pengecekan selama yang diminta `Retry-After` dari API, dan melaporkan progres ke klien yang memintanya - tetapi tidak melebihi waktu yang diizinkan klien untuk satu panggilan (bawaan 50 s, `wait_seconds` hingga 240). Setelah itu model menerima id-nya dan diminta memanggil `check_job`; server mengingat ke mana hasil job itu harus disimpan.
3. **Jawaban API diteruskan, bukan ditebak.** Apakah sebuah kegagalan boleh dicoba ulang ditentukan oleh `retryable` dari API, bukan tafsiran atas kode status. Berapa biaya sebuah job ditentukan oleh `quote` dari API, bukan tarif yang disalin ke paket ini. Daftar bahasa dibaca dari dokumen OpenAPI milik API. Permintaan yang membuat job membawa satu `Idempotency-Key` di semua percobaan ulang klien ini, sehingga jawaban yang hilang tidak bisa menjadi job kedua yang ikut ditagih.

Sebuah jawaban disampaikan dua kali - sebagai teks untuk semua klien dan sebagai `structuredContent` bagi yang membacanya - dan setiap file yang ditulis juga disebut sebagai `resource_link`, yaitu cara MCP mengatakan "ini filenya" tanpa membawa byte-nya. Hal yang berlaku untuk semua tool (path masuk, path keluar, tanya sebelum membelanjakan) dinyatakan satu kali, di `instructions` server. Hasil tidak pernah menimpa: nama yang sudah terpakai diberi ` (1)`. Path relatif ditolak - proses ini tidak berbagi direktori kerja dengan agen.

## Pengembangan

```bash
npm install && npm run build
node selftest.mjs                                          # protokol, daftar tool, tool tanpa kunci
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # dan job sungguhan (memakai kredit)
node check-api.mjs                                         # path, field, dan apa yang dijanjikan deskripsi tool, dicek terhadap kontrak API yang berlaku
```

`EQUALANG_BASE_URL` mengarahkan server ke deployment lain.

## Tautan

- [Equalang](https://equalang.com) · [Harga](https://equalang.com/pricing) · [Dokumentasi developer](https://equalang.com/developers)
- API untuk agen: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) - operasi yang sama sebagai Agent Skill
- Pertanyaan: <support@equalang.com>

## Lisensi

[Apache-2.0](../LICENSE) © Equalang
