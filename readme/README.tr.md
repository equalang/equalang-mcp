# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · **Türkçe** · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[Web sitesi](https://equalang.com) · [Fiyatlandırma](https://equalang.com/pricing) · [Geliştirici belgeleri](https://equalang.com/developers) · [API anahtarları](https://equalang.com/api-keys)

> **Anahtar kelimeler:** belge çevirisi, doküman çeviri, pdf çeviri, pdf çevirici, pdf çeviri format bozulmadan, word belgesi çeviri, powerpoint sunum çeviri, excel çeviri, epub çeviri, altyazı çeviri, srt çeviri, resimdeki yazıyı çevirme, video çeviri, ses dosyasını yazıya çevirme, sesi yazıya dökme, yapay zeka çeviri, mcp server, mcp sunucusu, model context protocol, claude mcp, cursor mcp, translation api

**Dosyayı çevirin, düzeni koruyun.** [Equalang](https://equalang.com) için bir MCP sunucusu. Equalang, dosyaları bütün halinde çeviren bir yapay zekâ çevirmenidir: PDF yine PDF olarak, sunum yine sunum olarak geri gelir; tablolar, görseller ve formüller yerli yerinde kalır. Altyazıları ve resimleri de çevirir, ses ve videoyu çevrilmiş altyazıya ya da döküme dönüştürür, kısa metinleri toplu halde çevirir. Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code ve diğer tüm MCP istemcilerinde çalışır.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Özellikler

- **Belgeler** – PDF, DOCX, PPTX, XLSX, EPUB, HTML ve TXT aynı biçimde, düzenlenebilir halde geri gelir; tablolar, görseller, formüller ve sayfa düzeni yerinde kalır
- **Altyazılar ve resimler** – SRT ve VTT zamanlamasını korur, istenirse kaynak satır çevirinin üstünde yer alır; JPG, PNG, WebP ve BMP, resmin içindeki metin çevrilmiş olarak geri gelir
- **Ses ve video** – MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM ve MKV çevrilmiş altyazıya ya da konuşulan dilde bir döküme dönüşür (SRT, VTT, TXT, JSON)
- **Toplu metin** – kısa metinler sırasıyla çevrilir ya da Equalang'ın cümle sınırlarından kendisinin böldüğü tek bir uzun metin (100.000 karaktere kadar)
- **Diller** – metin için 100+, dosyalar için 12; kaynak dili boş bıraktığınızda otomatik olarak algılanır

## Anahtar alın

<https://equalang.com> adresinde kaydolun ve <https://equalang.com/api-keys> adresinde bir anahtar oluşturun. Yeni hesaplar ücretsiz kredilerle başlar – bir belgeyi çevirip denemeye yeter.

Anahtar, MCP istemcisinin yapılandırmasındaki bir ortam değişkenine yazılır, asla bir URL'ye değil. Anahtar olmadan da sunucu başlar ve araçlarını listeler; anahtar gerektiren bir araç, anahtarın nasıl alınacağını söyleyerek yanıt verir.

## Kurulum

Node 18 veya üzeri gerekir.

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

`-s user` sunucuyu her projede kullanılabilir kılar; varsayılan kapsam olan `local` ile sunucu yalnızca komutun çalıştırıldığı dizinde yüklenir.
</details>

<details>
<summary><b>OpenAI Codex</b></summary>

```bash
codex mcp add equalang --env EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```
</details>

<details>
<summary><b>Claude Desktop, Cursor, Windsurf, Cline ve JSON ile yapılandırılan diğer istemciler</b></summary>

Bunu istemcinin MCP yapılandırmasına ekleyin – `claude_desktop_config.json`, `~/.cursor/mcp.json`, `~/.codeium/windsurf/mcp_config.json` ya da istemcinizin belgelerinde belirtilen dosya:

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

Beceri mi tercih edersiniz? [equalang-skill](https://github.com/equalang/equalang-skill) aynı işlemleri bir Agent Skill olarak sunar – tek bir Python betiği, kurulacak bir şey yok.

## Araçlar

| Araç | Ne yapar |
| --- | --- |
| `translate_file` | Bir dosyayı (yol ya da herkese açık URL) başka bir dile çevirir ve sonucu dosyanın yanına kaydeder. |
| `transcribe_recording` | Bir ses ya da video dosyasında söylenenleri zaman damgalı metin olarak yazar (SRT, VTT, TXT, JSON). |
| `translate_text` | Kısa metinleri sırasıyla çevirir – ya da Equalang'ın cümle sınırlarından kendisinin böldüğü tek bir uzun metni. |
| `estimate_cost` | Hiçbir şey başlatmadan dosyayı yükler; o dosyadaki bir işin en fazla kaça mal olabileceğini ve işi ikinci bir yükleme olmadan başlatan bir `file_id` döndürür. Ücretsizdir. |
| `check_job` | Bir işi kaldığı yerden yeniden ele alır ve iş bittiğinde sonuçlarını kaydeder. |
| `cancel_job` | Kuyruktaki ya da çalışan bir işi durdurur. İptal edilen iş ücretlendirilmez. |
| `get_credit_balance` | Hesabın kredileri. |
| `list_languages` | Bütün dil kodları ve adları. Anahtar gerektirmez. |

Dil kodları `en`, `zh-CN`, `ja` biçimindedir; tam liste `list_languages` içinde. İşler dakikalar sürer – bir araç en çok `wait_seconds` kadar bekler (varsayılan 50 sn, en fazla 240), sonra `check_job` ile devam edilecek bir iş kimliği verir.

## Bağlantılar

- [Equalang](https://equalang.com) · [Fiyatlandırma](https://equalang.com/pricing) · [Geliştirici belgeleri](https://equalang.com/developers)
- Ajanlar için API: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) – aynı işlemler, Agent Skill olarak
- Sorular: <support@equalang.com>

## Lisans

[Apache-2.0](../LICENSE) © Equalang
