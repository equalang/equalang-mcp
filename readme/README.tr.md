# Equalang MCP sunucusu

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · **Türkçe** · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

Bir ajana [Equalang](https://equalang.com)'ı kazandırın: dosyaları düzenini koruyarak bütün halinde çevirin, kayıtları yazıya dökün, metinleri çevirin.

- **Belgeler** - PDF, DOCX, PPTX, XLSX, EPUB, HTML, TXT - aynı biçimde geri gelir; tablolar, görseller ve formüller yerli yerinde kalır.
- **Altyazılar** (SRT, VTT) ve **resimler** (JPG, PNG, WebP, BMP).
- **Ses ve video** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM, MKV - çevrilmiş altyazı olarak ya da konuşulan dilde bir döküm olarak geri gelir.

Ajan bir yol ya da URL verir, karşılığında yollar alır. Dosya içeriği konuşmaya hiç girmez.

## Kurulum

<https://equalang.com/api-keys> adresinde bir anahtar oluşturun, ardından sunucuyu istemcinize ekleyin:

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

Node 18 veya üzeri gerekir. Anahtar olmadan da sunucu başlar ve araçlarını listeler; anahtar gerektiren bir araç, anahtarın nasıl alınacağını söyleyerek yanıt verir.

## Araçlar

| Araç | Ne yapar |
| --- | --- |
| `translate_file` | Bir dosyayı (yol ya da herkese açık URL) başka bir dile çevirir ve sonucu dosyanın yanına kaydeder. |
| `transcribe_recording` | Bir ses ya da video dosyasında söylenenleri zaman damgalı metin olarak yazar (SRT, VTT, TXT, JSON). |
| `translate_text` | En fazla 50 kısa düz metni sırasıyla çevirir. |
| `estimate_cost` | Hiçbir şey başlatmadan dosyayı yükler; o dosyadaki bir işin en fazla kaça mal olabileceğini ve işi ikinci bir yükleme olmadan başlatan bir `file_id` döndürür. Ücretsizdir. |
| `check_job` | Bir işi kaldığı yerden yeniden ele alır ve iş bittiğinde sonuçlarını kaydeder. |
| `cancel_job` | Kuyruktaki ya da çalışan bir işi durdurur. İptal edilen iş ücretlendirilmez. |
| `get_credit_balance` | Hesabın kredileri. |
| `list_languages` | Canlı API'den okunan dil kodları ve adları. Anahtar gerektirmez. |

**Krediler.** İşler hesabın kredilerini harcar - web sitesindekiyle aynı bakiye - bu yüzden sunucu modele önce maliyeti söylemesini ve onay almasını bildirir; rakam `estimate_cost` aracından gelir. Bir kayıt, gerçekten duyulan konuşma kadar ücretlendirilir, dolayısıyla çoğunlukla tahminden ucuza gelir.

**Diller.** Kodlar `en`, `zh-CN`, `ja` biçimindedir. Bu pakete gömülü bir liste yoktur: `list_languages` kodları ve adları canlı API'den okur (dosyalar için metne göre daha az dil vardır), böylece Equalang'ın eklediği bir dil güncelleme gerekmeden kullanılabilir. Kaynak dilin algılanması için onu boş bırakın.

**Biçimler ve sınırlar.** Yukarıdaki biçimler, dosya başına en fazla 100 MB; `translate_text` her biri 5,000 karakterlik en fazla 50 metin, çağrı başına 20,000 karakter alır.

## Nasıl tasarlandı

Üç karar, her birinin bir gerekçesi var:

1. **Dosya asla modelin içinden geçmez.** MCP'de dosya türü yoktur ve bir araç sonucundaki 5 MB'lık bir PDF, hiçbir şey söylemeden bağlamda bir servete mal olur. Araç, *dosyanın nerede olduğunu* alır - bu makinedeki mutlak bir yol ya da herkese açık bir `http(s)` URL'si - ve *sonuçların nereye yazıldığını* bildirir. URL Equalang'a verilir, o da dosyayı kendisi çeker; hiçbir şey sırf yeniden yüklenmek üzere buraya indirilmez.
2. **Bir iş tek bir araç çağrısının içinde yaşar.** Bir iş kimliği döndürüp modelin yoklama yapacağına güvenmek, yarı yolda bırakılan bir döngüdür. Araç bekler - bakışlar arasında API'nin `Retry-After` değerinin istediği kadar durarak ve ilerleme isteyen istemciye ilerlemeyi bildirerek - ama istemcinin bir çağrıya tanıdığı süreyi aşmaz (varsayılan 50 sn, `wait_seconds` en fazla 240). Sonrasında model kimliği alır ve `check_job` aracını çağırması söylenir; sunucu o işin sonuçlarının nereye ait olduğunu hatırlar.
3. **API'nin yanıtları tahmin edilmez, aktarılır.** Bir hatanın yeniden denenip denenemeyeceğini durum kodlarının yorumu değil, API'nin `retryable` alanı belirler. Bir işin kaça mal olabileceği bu pakete kopyalanmış bir tarife değil, API'nin `quote` değeridir. Dil listesi API'nin OpenAPI belgesinden okunur. İş oluşturan bir istek, bu istemcinin kendi yeniden denemeleri boyunca tek bir `Idempotency-Key` taşır; böylece kaybolan bir yanıt ikinci, ücretlendirilmiş bir işe dönüşemez.

Bir yanıt iki kez söylenir - her istemci için metin olarak ve onu okuyanlar için `structuredContent` olarak - ve yazılan her dosya ayrıca bir `resource_link` olarak belirtilir; MCP, baytlarını taşımadan "işte bir dosya" demeyi böyle yapar. Her araç için geçerli olan şey (yollar girer, yollar çıkar, harcamadan önce sor) bir kez, sunucunun `instructions` alanında söylenir. Sonuçlar asla üzerine yazmaz: alınmış bir ada ` (1)` eklenir. Göreli yollar reddedilir - bu süreç ajanın çalışma dizinini paylaşmaz.

## Geliştirme

```bash
npm install && npm run build
node selftest.mjs                                          # protokol, araç listesi, anahtarsız araç
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # ve gerçek işler (kredi harcar)
node check-api.mjs                                         # yollar, alanlar ve araç açıklamalarının vaat ettikleri, API'nin canlı sözleşmesine karşı
```

`EQUALANG_BASE_URL` sunucuyu başka bir dağıtıma yönlendirir. API'nin kendisi: <https://equalang.com/llms.txt>.

Apache-2.0.
