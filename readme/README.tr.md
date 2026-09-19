# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · **Türkçe** · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[Web sitesi](https://equalang.com) · [Fiyatlandırma](https://equalang.com/pricing) · [Geliştirici belgeleri](https://equalang.com/developers) · [API anahtarları](https://equalang.com/api-keys)

> **Anahtar kelimeler:** belge çevirisi, doküman çeviri, pdf çeviri, pdf çevirici, pdf çeviri format bozulmadan, word belgesi çeviri, powerpoint sunum çeviri, excel çeviri, epub çeviri, altyazı çeviri, srt çeviri, resimdeki yazıyı çevirme, video çeviri, ses dosyasını yazıya çevirme, sesi yazıya dökme, yapay zeka çeviri, mcp server, mcp sunucusu, model context protocol, claude mcp, cursor mcp, translation api

**Dosyayı çevirin, düzeni koruyun.** [Equalang](https://equalang.com) için bir MCP sunucusu. Equalang, dosyaları bütün halinde çeviren bir yapay zekâ çevirmenidir: PDF yine PDF olarak, sunum yine sunum olarak geri gelir; tablolar, görseller ve formüller yerli yerinde kalır. Altyazıları ve resimleri de çevirir, ses ve videoyu çevrilmiş altyazıya ya da döküme dönüştürür, metinleri toplu halde çevirir. Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code ve diğer tüm MCP istemcilerinde çalışır.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Özellikler

- **Hangi biçimde girdiyse o biçimde çıkar** – PDF, DOCX, PPTX, XLSX, EPUB, HTML ve TXT aynı biçimde, düzenlenebilir halde geri gelir; tablolar, görseller, formüller ve sayfa düzeni yerinde kalır
- **Altyazılar ve resimler** – SRT ve VTT zamanlamasını korur, istenirse kaynak satır çevirinin üstünde yer alır; JPG, PNG, WebP ve BMP, resmin içindeki metin çevrilmiş olarak geri gelir
- **Ses ve video** – MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM ve MKV çevrilmiş altyazıya ya da konuşulan dilde bir döküme dönüşür (SRT, VTT, TXT, JSON)
- **Toplu metin** – ayrı dizeler sırasıyla çevrilir ya da Equalang'ın cümle sınırlarından kendisinin böldüğü tek bir uzun metin (100.000 karaktere kadar); metin için 100+, dosyalar için 12 dil
- **Bütün dosyalar, kopyala-yapıştır yok** – dosya başına en fazla 100 MB, bir yoldan ya da herkese açık bir URL'den; metin kutularına bölüp yapıştıracak bir şey yok
- **Token harcamaz** – ajan bir yol ya da URL verir, karşılığında yollar alır; 300 sayfalık bir PDF konuşmaya hiç girmez
- **İşten önce fiyat** – `estimate_cost`, bir işin en fazla kaça mal olabileceğini ücretsiz söyler; başarısız olan ve iptal edilen işler ücretlendirilmez; bir kayıt, gerçekten duyulan konuşma kadar ücretlendirilir; kredilerin süresi dolmaz

## Anahtar alın

<https://equalang.com> adresinde kaydolun ve <https://equalang.com/api-keys> adresinde bir anahtar oluşturun. Yeni hesaplar ücretsiz kredilerle başlar – bir belgeyi çevirtip geriye ne geldiğini görmeye yeter.

Anahtar, MCP istemcisinin yapılandırmasındaki bir ortam değişkenine yazılır, asla bir URL'ye değil. Yalnızca bir kez gösterilir; Equalang onun sadece hash'ini saklar. Anahtar olmadan da sunucu başlar ve araçlarını listeler; anahtar gerektiren bir araç, anahtarın nasıl alınacağını söyleyerek yanıt verir.

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
| `translate_text` | Ayrı dizeleri sırasıyla çevirir – ya da Equalang'ın cümle sınırlarından kendisinin böldüğü tek bir uzun metni. |
| `estimate_cost` | Hiçbir şey başlatmadan dosyayı yükler; o dosyadaki bir işin en fazla kaça mal olabileceğini ve işi ikinci bir yükleme olmadan başlatan bir `file_id` döndürür. Ücretsizdir. |
| `check_job` | Bir işi kaldığı yerden yeniden ele alır ve iş bittiğinde sonuçlarını kaydeder. |
| `cancel_job` | Kuyruktaki ya da çalışan bir işi durdurur. İptal edilen iş ücretlendirilmez. |
| `get_credit_balance` | Hesabın kredileri. |
| `list_languages` | Canlı API'den okunan dil kodları ve adları. Anahtar gerektirmez. |

## Bilmeye değer dört şey

**Diller.** Kodlar `en`, `zh-CN`, `ja` biçimindedir. Bu pakete gömülü bir liste yoktur: `list_languages` kodları ve adları canlı API'den okur (dosyalar için metne göre daha az dil vardır), böylece Equalang'ın eklediği bir dil güncelleme gerekmeden kullanılabilir. Kaynak dilin algılanması için onu boş bırakın.

**Krediler.** İşler hesabın kredilerini harcar – web sitesindekiyle aynı bakiye – bu yüzden sunucu modele önce maliyeti söylemesini ve onay almasını bildirir; rakam `estimate_cost` aracından gelir.

**İşler dakikalar sürer.** Araç kendi işini bekler, ama istemcinin bir çağrıya tanıdığı süreyi aşmaz (varsayılan 50 sn, `wait_seconds` en fazla 240). Sonrasında model iş kimliğini alır ve sonuçları ait oldukları yere kaydeden `check_job` aracını çağırması söylenir.

**Sınırlar.** Dosya başına en fazla 100 MB; `translate_text` her biri 5.000 karakterlik en fazla 50 metin (çağrı başına 20.000) ya da 100.000 karaktere kadar tek bir metin alır.

## Sık sorulan sorular

**Çevrilen PDF düzenini korur mu?**
Evet – zaten bütün mesele bu. Metin eski yerine konur; tablolar, görseller ve formüller yerinde kalır; DOCX, PPTX ya da XLSX düzenlenebilir kalır.

**Belgem modele gönderiliyor mu?**
Hayır. Sunucu dosyayı Equalang'a yükler ve bir yol ile yanıt verir. 300 sayfalık bir makale hiç token harcamaz.

**Bir resmin içindeki metni çevirebilir mi?**
Evet. JPG, PNG, WebP ya da BMP içindeki metin tanınır, çevrilir ve resme yeniden işlenir.

**Bir iş kaça mal olur?**
`estimate_cost` bunu hiçbir şey başlamadan önce söyler ve ücretsizdir. Fiyatlar <https://equalang.com/pricing> adresindedir.

## Nasıl tasarlandı

Üç karar, her birinin bir gerekçesi var:

1. **Dosya asla modelin içinden geçmez.** MCP'de dosya türü yoktur ve bir araç sonucundaki 5 MB'lık bir PDF, hiçbir şey söylemeden bağlamda bir servete mal olur. Araç, *dosyanın nerede olduğunu* alır – bu makinedeki mutlak bir yol ya da herkese açık bir `http(s)` URL'si – ve *sonuçların nereye yazıldığını* bildirir. URL Equalang'a verilir, o da dosyayı kendisi çeker; hiçbir şey sırf yeniden yüklenmek üzere buraya indirilmez.
2. **Bir iş tek bir araç çağrısının içinde yaşar.** Bir iş kimliği döndürüp modelin yoklama yapacağına güvenmek, yarı yolda bırakılan bir döngüdür. Araç bekler – bakışlar arasında API'nin `Retry-After` değerinin istediği kadar durarak ve ilerleme isteyen istemciye ilerlemeyi bildirerek – ama istemcinin bir çağrıya tanıdığı süreyi aşmaz (varsayılan 50 sn, `wait_seconds` en fazla 240). Sonrasında model kimliği alır ve `check_job` aracını çağırması söylenir; sunucu o işin sonuçlarının nereye ait olduğunu hatırlar.
3. **API'nin yanıtları tahmin edilmez, aktarılır.** Bir hatanın yeniden denenip denenemeyeceğini durum kodlarının yorumu değil, API'nin `retryable` alanı belirler. Bir işin kaça mal olabileceği bu pakete kopyalanmış bir tarife değil, API'nin `quote` değeridir. Dil listesi API'nin OpenAPI belgesinden okunur. İş oluşturan bir istek, bu istemcinin kendi yeniden denemeleri boyunca tek bir `Idempotency-Key` taşır; böylece kaybolan bir yanıt ikinci, ücretlendirilmiş bir işe dönüşemez.

Bir yanıt iki kez söylenir – her istemci için metin olarak ve onu okuyanlar için `structuredContent` olarak – ve yazılan her dosya ayrıca bir `resource_link` olarak belirtilir; MCP, baytlarını taşımadan "işte bir dosya" demeyi böyle yapar. Her araç için geçerli olan şey (yollar girer, yollar çıkar, harcamadan önce sor) bir kez, sunucunun `instructions` alanında söylenir. Sonuçlar asla üzerine yazmaz: alınmış bir ada ` (1)` eklenir. Göreli yollar reddedilir – bu süreç ajanın çalışma dizinini paylaşmaz.

## Geliştirme

```bash
npm install && npm run build
node selftest.mjs                                          # protokol, araç listesi, anahtarsız araç
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # ve gerçek işler (kredi harcar)
node check-api.mjs                                         # yollar, alanlar ve araç açıklamalarının vaat ettikleri, API'nin canlı sözleşmesine karşı
```

`EQUALANG_BASE_URL` sunucuyu başka bir dağıtıma yönlendirir.

## Bağlantılar

- [Equalang](https://equalang.com) · [Fiyatlandırma](https://equalang.com/pricing) · [Geliştirici belgeleri](https://equalang.com/developers)
- Ajanlar için API: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) – aynı işlemler, Agent Skill olarak
- Sorular: <support@equalang.com>

## Lisans

[Apache-2.0](../LICENSE) © Equalang
