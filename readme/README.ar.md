# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · **العربية**

[الموقع](https://equalang.com) · [الأسعار](https://equalang.com/pricing) · [وثائق المطورين](https://equalang.com/developers) · [مفاتيح API](https://equalang.com/api-keys)

> **كلمات مفتاحية:** ترجمة المستندات، ترجمة pdf، ترجمة ملف pdf مع الحفاظ على التنسيق، ترجمة ملف وورد، ترجمة docx، ترجمة بوربوينت، ترجمة ملف اكسل، ترجمة epub، ترجمة ملفات srt، ترجمة الترجمة المصاحبة للفيديو، ترجمة النص في الصور، ترجمة فيديو، تحويل الصوت إلى نص، تفريغ صوتي، مترجم بالذكاء الاصطناعي، واجهة برمجة للترجمة، mcp server، model context protocol، claude mcp، cursor mcp، translation api

**ترجم الملف، واحتفظ بالتنسيق.** خادم MCP لـ[Equalang](https://equalang.com) - مترجم بالذكاء الاصطناعي يعمل على الملفات كاملة: ملف PDF يعود PDF، والعرض التقديمي يعود عرضًا تقديميًا، والجداول والصور والمعادلات في أماكنها. كما يترجم الترجمات المصاحبة والصور، ويحوّل الصوت والفيديو إلى ترجمة مصاحبة مترجمة أو نص مفرَّغ، ويترجم السلاسل النصية بالجملة. يعمل في Claude Code وClaude Desktop وCodex وCursor وWindsurf وCline وVS Code وكل عميل MCP آخر.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## المزايا

- **الصيغة التي تدخل هي التي تخرج** - PDF وDOCX وPPTX وXLSX وEPUB وHTML وTXT تعود بالصيغة نفسها، قابلة للتحرير كما كانت، والجداول والصور والمعادلات وتخطيط الصفحة في أماكنها
- **الترجمات المصاحبة والصور** - SRT وVTT تحتفظان بتوقيتهما، مع إمكانية إظهار السطر الأصلي فوق الترجمة؛ وJPG وPNG وWebP وBMP تعود وقد تُرجم النص الموجود داخل الصورة
- **الصوت والفيديو** - MP3 وM4A وWAV وFLAC وOGG وAAC وOpus وMP4 وMOV وWebM وMKV تصبح ترجمة مصاحبة مترجمة، أو نصًا مفرَّغًا باللغة المنطوقة (SRT وVTT وTXT وJSON)
- **نصوص بالجملة** - سلاسل نصية منفصلة تُترجم بالترتيب، أو نص طويل واحد (حتى 100,000 حرف) يقسّمه Equalang بنفسه عند حدود الجمل؛ أكثر من 100 لغة للنصوص، و12 للملفات
- **ملفات كاملة، بلا نسخ ولصق** - حتى 100 MB للملف، من مسار أو رابط URL عام؛ لا شيء تقسّمه على مربعات النص
- **لا يستهلك أي توكنات** - يمرّر الوكيل مسارًا أو رابط URL ويتلقى مسارات؛ ملف PDF من 300 صفحة لا يدخل المحادثة أبدًا
- **السعر قبل المهمة** - تجيب `estimate_cost` بأقصى ما يمكن أن تكلفه المهمة، مجانًا؛ المهام الفاشلة والملغاة لا تكلف شيئًا؛ ويُحتسب التسجيل بحسب الكلام المسموع فعلًا؛ والنقاط لا تنتهي صلاحيتها أبدًا

## احصل على مفتاح

سجّل في <https://equalang.com> وأنشئ مفتاحًا من <https://equalang.com/api-keys>. تبدأ الحسابات الجديدة بنقاط مجانية - تكفي لتجربة مستند ورؤية ما يعود.

يوضع المفتاح في متغير بيئة ضمن إعدادات عميل MCP، ولا يوضع في رابط URL أبدًا. يُعرض مرة واحدة؛ ولا يحتفظ Equalang إلا بقيمة التجزئة (hash) الخاصة به. من دون مفتاح يعمل الخادم مع ذلك ويعرض أدواته؛ والأداة التي تحتاج إلى المفتاح تجيب بطريقة الحصول عليه.

## التثبيت

يتطلب Node 18 أو أحدث.

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

يجعل `-s user` الخادم متاحًا في كل مشروع؛ أما النطاق الافتراضي، `local`، فيحمّل الخادم فقط في المجلد الذي نُفّذ منه الأمر.
</details>

<details>
<summary><b>OpenAI Codex</b></summary>

```bash
codex mcp add equalang --env EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```
</details>

<details>
<summary><b>Claude Desktop وCursor وWindsurf وCline وغيرها من العملاء الذين يُعدّون عبر JSON</b></summary>

أضف هذا إلى إعدادات MCP الخاصة بالعميل - `claude_desktop_config.json` أو `~/.cursor/mcp.json` أو `~/.codeium/windsurf/mcp_config.json`، أو الملف الذي تذكره وثائق عميلك:

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

تفضّل مهارة؟ يقدّم [equalang-skill](https://github.com/equalang/equalang-skill) العمليات نفسها على هيئة Agent Skill - سكربت Python واحد، ولا شيء للتثبيت.

## الأدوات

| الأداة | ما تفعله |
| --- | --- |
| `translate_file` | تترجم ملفًا (مسار أو رابط URL عام) إلى لغة أخرى وتحفظ النتيجة بجواره. |
| `transcribe_recording` | تدوّن ما يُقال في ملف صوتي أو مرئي، نصًا موقوتًا (SRT وVTT وTXT وJSON). |
| `translate_text` | تترجم سلاسل نصية منفصلة، بالترتيب - أو نصًا طويلًا واحدًا يقسّمه Equalang بنفسه عند حدود الجمل. |
| `estimate_cost` | ترفع ملفًا من دون بدء أي شيء؛ وتجيب بأقصى ما يمكن أن تكلفه مهمة عليه، وبـ`file_id` يبدأ المهمة من دون رفع ثانٍ. مجانية. |
| `check_job` | تستأنف متابعة مهمة، وتحفظ نتائجها عند اكتمالها. |
| `cancel_job` | توقف مهمة في قائمة الانتظار أو قيد التنفيذ. المهمة الملغاة لا تُحتسب تكلفتها. |
| `get_credit_balance` | رصيد الحساب من النقاط. |
| `list_languages` | رموز اللغات وأسماؤها، مقروءة من الـAPI الحي. لا تحتاج إلى مفتاح. |

## أربعة أمور تستحق المعرفة

**اللغات.** تبدو الرموز هكذا: `en` و`zh-CN` و`ja`. لا توجد قائمة مضمّنة في هذه الحزمة: `list_languages` تقرأ الرموز والأسماء من الـAPI الحي (وهي للملفات أقل منها للنصوص)، فأي لغة يضيفها Equalang تصبح متاحة من دون تحديث. احذف لغة المصدر ليجري اكتشافها تلقائيًا.

**النقاط.** العمل يستهلك نقاط الحساب - وهو الرصيد نفسه في الموقع - لذا يطلب الخادم من النموذج أن يذكر التكلفة ويحصل على الموافقة أولًا؛ والرقم يأتي من `estimate_cost`.

**المهام تستغرق دقائق.** تنتظر الأداة مهمتها، لكن ليس أكثر مما يسمح به العميل للاستدعاء (50 s افتراضيًا، و`wait_seconds` حتى 240). بعد ذلك يتلقى النموذج معرّف المهمة ويُطلب منه استدعاء `check_job`، التي تحفظ النتائج في مكانها الصحيح.

**الحدود.** حتى 100 MB للملف؛ وتقبل `translate_text` حتى 50 نصًا بطول 5,000 حرف (20,000 للاستدعاء الواحد)، أو نصًا واحدًا حتى 100,000.

## أسئلة شائعة

**هل يحتفظ ملف PDF المترجَم بتنسيقه؟**
نعم - وهذا هو بيت القصيد. يُعاد النص إلى مكانه، وتبقى الجداول والصور والمعادلات في أماكنها؛ ويظل ملف DOCX أو PPTX أو XLSX قابلًا للتحرير.

**هل يُرسَل مستندي إلى النموذج؟**
لا. يرفع الخادم الملف إلى Equalang ويجيب بمسار. ورقة بحثية من 300 صفحة لا تكلف أي توكنات.

**هل يستطيع ترجمة النص داخل الصورة؟**
نعم. يُتعرَّف على النص في JPG أو PNG أو WebP أو BMP، ثم يُترجم ويُرسم من جديد داخل الصورة.

**كم تكلف المهمة؟**
تخبرك `estimate_cost` قبل أن يبدأ أي شيء، وهي مجانية. الأسعار في <https://equalang.com/pricing>.

## كيف بُني

ثلاثة قرارات، لكل منها سببه:

1. **الملف لا يمر عبر النموذج أبدًا.** ليس في MCP نوع للملفات، وملف PDF بحجم 5 MB داخل نتيجة أداة يكلّف ثروة من السياق من دون أن يقول شيئًا. تأخذ الأداة *مكان الملف* - مسارًا مطلقًا على هذا الجهاز، أو رابط `http(s)` عامًا - وتجيب بـ*مكان كتابة النتائج*. يُسلَّم الرابط إلى Equalang ليجلبه بنفسه؛ فلا يُنزَّل شيء هنا لمجرد رفعه من جديد.
2. **المهمة تعيش داخل استدعاء أداة واحد.** إرجاع معرّف مهمة والتعويل على النموذج في الاستعلام المتكرر حلقةٌ تُهجر في منتصفها. الأداة تنتظر - متوقفة بين كل استعلام وآخر المدة التي يطلبها `Retry-After` الخاص بالـAPI، ومبلّغة بالتقدم العميلَ الذي طلبه - لكن ليس أكثر مما يسمح به العميل للاستدعاء (50 s افتراضيًا، و`wait_seconds` حتى 240). بعد ذلك يتلقى النموذج المعرّف ويُطلب منه استدعاء `check_job`؛ ويتذكر الخادم أين توضع نتائج تلك المهمة.
3. **إجابات الـAPI تُنقل كما هي، لا تُخمَّن.** إمكانية إعادة المحاولة بعد الفشل يحددها `retryable` الخاص بالـAPI، لا قراءةٌ لرموز الحالة. وما قد تكلفه المهمة هو `quote` الخاص بالـAPI، لا سعرٌ منسوخ في هذه الحزمة. وقائمة اللغات تُقرأ من مستند OpenAPI الخاص بالـAPI. والطلب الذي ينشئ مهمة يحمل `Idempotency-Key` واحدًا عبر إعادات المحاولة التي يجريها هذا العميل نفسه، فلا يمكن أن تتحول إجابة ضائعة إلى مهمة ثانية مدفوعة.

تُقال الإجابة مرتين - نصًا لكل عميل و`structuredContent` لمن يقرؤه - ويُذكر كل ملف مكتوب أيضًا بوصفه `resource_link`، وهي طريقة MCP في قول "هذا ملف" من دون حمل بايتاته. وما يصدق على كل أداة (مسارات تدخل، مسارات تخرج، السؤال قبل الإنفاق) يُقال مرة واحدة، في `instructions` الخاصة بالخادم. النتائج لا تستبدل ملفًا قائمًا أبدًا: الاسم المأخوذ يُضاف إليه ` (1)`. والمسارات النسبية مرفوضة - فهذه العملية لا تشارك الوكيل دليل عمله.

## التطوير

```bash
npm install && npm run build
node selftest.mjs                                          # البروتوكول، قائمة الأدوات، الأداة التي لا تحتاج إلى مفتاح
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # ومهام حقيقية (تستهلك النقاط)
node check-api.mjs                                         # المسارات والحقول وما تعد به أوصاف الأدوات، مقابل عقد الـAPI الحي
```

يوجّه `EQUALANG_BASE_URL` الخادم إلى نشر آخر.

## روابط

- [Equalang](https://equalang.com) · [الأسعار](https://equalang.com/pricing) · [وثائق المطورين](https://equalang.com/developers)
- الـAPI للوكلاء: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) - العمليات نفسها على هيئة Agent Skill
- للاستفسارات: <support@equalang.com>

## الترخيص

[Apache-2.0](../LICENSE) © Equalang
