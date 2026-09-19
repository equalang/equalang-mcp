# Server MCP Equalang

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · **Bahasa Indonesia** · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

Berikan [Equalang](https://equalang.com) kepada agen: menerjemahkan file utuh dengan tata letak tetap terjaga, mentranskripsikan rekaman, menerjemahkan string.

- **Dokumen** - PDF, DOCX, PPTX, XLSX, EPUB, HTML, TXT - kembali dalam format yang sama, dengan tabel, gambar, dan rumus tetap di tempatnya.
- **Subtitle** (SRT, VTT) dan **gambar** (JPG, PNG, WebP, BMP).
- **Audio dan video** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM, MKV - kembali sebagai subtitle terjemahan, atau sebagai transkrip dalam bahasa yang diucapkan.

Agen memberikan path atau URL dan menerima path sebagai balasan. Isi file tidak pernah masuk ke percakapan.

## Instalasi

Buat kunci di <https://equalang.com/api-keys>, lalu tambahkan server ke klien Anda:

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

Membutuhkan Node 18 atau lebih baru. Tanpa kunci, server tetap berjalan dan menampilkan daftar tool-nya; tool yang membutuhkan kunci akan menjawab dengan cara mendapatkannya.

## Tool

| Tool | Fungsinya |
| --- | --- |
| `translate_file` | Menerjemahkan file (path atau URL publik) ke bahasa lain dan menyimpan hasilnya di samping file asli. |
| `transcribe_recording` | Menuliskan apa yang diucapkan dalam file audio atau video sebagai teks berpenanda waktu (SRT, VTT, TXT, JSON). |
| `translate_text` | Menerjemahkan hingga 50 teks polos pendek, sesuai urutan. |
| `estimate_cost` | Mengunggah file tanpa memulai apa pun; menjawab dengan biaya maksimum sebuah job atas file itu, serta `file_id` yang memulai job tanpa unggahan kedua. Gratis. |
| `check_job` | Melanjutkan pemantauan job, dan menyimpan hasilnya setelah selesai. |
| `cancel_job` | Menghentikan job yang sedang antre atau berjalan. Job yang dibatalkan tidak dikenai biaya. |
| `get_credit_balance` | Kredit akun. |
| `list_languages` | Kode dan nama bahasa, dibaca dari API secara langsung. Tidak memerlukan kunci. |

**Kredit.** Pekerjaan memakai kredit akun - saldo yang sama dengan di situs web - sehingga server meminta model menyebutkan biayanya dan mendapat persetujuan terlebih dahulu; angkanya berasal dari `estimate_cost`. Rekaman ditagih berdasarkan ucapan yang benar-benar terdengar, jadi biasanya lebih murah daripada estimasi.

**Bahasa.** Kode berbentuk seperti `en`, `zh-CN`, `ja`. Tidak ada daftar yang ditanam dalam paket ini: `list_languages` membaca kode dan nama dari API secara langsung (untuk file lebih sedikit daripada untuk teks), sehingga bahasa yang ditambahkan Equalang langsung tersedia tanpa pembaruan. Kosongkan bahasa sumber agar terdeteksi otomatis.

**Format dan batas.** Format-format di atas, hingga 100 MB per file; `translate_text` menerima hingga 50 teks masing-masing 5,000 karakter, 20,000 karakter per panggilan.

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

`EQUALANG_BASE_URL` mengarahkan server ke deployment lain. API-nya sendiri: <https://equalang.com/llms.txt>.

Apache-2.0.
