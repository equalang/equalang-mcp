# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · **العربية**

[الموقع](https://equalang.com) · [الأسعار](https://equalang.com/pricing) · [وثائق المطورين](https://equalang.com/developers) · [مفاتيح API](https://equalang.com/api-keys)

> **كلمات مفتاحية:** ترجمة المستندات، ترجمة pdf، ترجمة ملف pdf مع الحفاظ على التنسيق، ترجمة ملف وورد، ترجمة docx، ترجمة بوربوينت، ترجمة ملف اكسل، ترجمة epub، ترجمة ملفات srt، ترجمة الترجمة المصاحبة للفيديو، ترجمة النص في الصور، ترجمة فيديو، تحويل الصوت إلى نص، تفريغ صوتي، مترجم بالذكاء الاصطناعي، واجهة برمجة للترجمة، mcp server، model context protocol، claude mcp، cursor mcp، translation api

**ترجم الملف، واحتفظ بالتنسيق.** خادم MCP لـ[Equalang](https://equalang.com) - مترجم بالذكاء الاصطناعي يعمل على الملفات كاملة: ملف PDF يعود PDF، والعرض التقديمي يعود عرضًا تقديميًا، والجداول والصور والمعادلات في أماكنها. كما يترجم الترجمات المصاحبة والصور، ويحوّل الصوت والفيديو إلى ترجمة مصاحبة مترجمة أو نص مفرَّغ، ويترجم النصوص القصيرة بالجملة. يعمل في Claude Code وClaude Desktop وCodex وCursor وWindsurf وCline وVS Code وكل عميل MCP آخر.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## جرّب أن تطلب

- «ترجم ~/Documents/contract.pdf إلى العربية مع الحفاظ على التنسيق.»
- «ترجم pitch-deck.pptx إلى الإنجليزية والفرنسية.»
- «ترجم https://example.com/whitepaper.pdf إلى العربية واحفظه في ~/Downloads.»
- «كم ستكلّف ترجمة thesis.docx إلى الإنجليزية؟»
- «اصنع ترجمة مصاحبة عربية لـ interview.mp4، مع إبقاء السطر الأصلي فوق كل سطر.»
- «حوّل standup.m4a إلى نص مكتوب مع الطوابع الزمنية.»
- «اصنع نسخة عربية من صورة menu.jpg.»
- «ترجم novel.epub إلى العربية.»

## المزايا

- **المستندات** - PDF وDOCX وPPTX وXLSX وEPUB وHTML وTXT تعود بالصيغة نفسها، قابلة للتحرير كما كانت، والجداول والصور والمعادلات وتخطيط الصفحة في أماكنها
- **الترجمات المصاحبة والصور** - SRT وVTT تحتفظان بتوقيتهما، مع إمكانية إظهار السطر الأصلي فوق الترجمة؛ وJPG وPNG وWebP وBMP تعود وقد تُرجم النص الموجود داخل الصورة
- **الصوت والفيديو** - MP3 وM4A وWAV وFLAC وOGG وAAC وOpus وMP4 وMOV وWebM وMKV تصبح ترجمة مصاحبة مترجمة، أو نصًا مفرَّغًا باللغة المنطوقة (SRT وVTT وTXT وJSON)
- **نصوص بالجملة** - نصوص قصيرة تُترجم بالترتيب، أو نص طويل واحد (حتى 100,000 حرف) يقسّمه Equalang بنفسه عند حدود الجمل
- **اللغات** - أكثر من 100 للنصوص و12 للملفات، مع اكتشاف لغة المصدر تلقائيًا حين تتركها فارغة

## احصل على مفتاح

سجّل في <https://equalang.com> وأنشئ مفتاحًا من <https://equalang.com/api-keys>. تبدأ الحسابات الجديدة بنقاط مجانية تكفي لترجمة مستند واحد للتجربة.

يوضع المفتاح في متغير بيئة ضمن إعدادات عميل MCP، ولا يوضع في رابط URL أبدًا. من دون مفتاح يعمل الخادم مع ذلك ويعرض أدواته؛ والأداة التي تحتاج إلى المفتاح تجيب بطريقة الحصول عليه.

ويمكن أيضًا حفظ المفتاح مرة واحدة لكل جهاز في `~/.config/equalang/.env`، وهو الملف الذي تقرؤه مهارة Equalang أيضًا:

```bash
# استبدل el_your_key بمفتاحك
mkdir -p ~/.config/equalang && echo 'EQUALANG_API_KEY=el_your_key' > ~/.config/equalang/.env && chmod 600 ~/.config/equalang/.env
```

يأخذ الخادم `EQUALANG_API_KEY` من بيئته أولًا، ولا يقرأ الملف إلا إذا لم يجده فيها: المفتاح الموجود في إعدادات العميل له الأولوية، ومع وجود الملف لا تحتاج إعدادات العميل إلى `env`.

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
| `translate_text` | تترجم نصوصًا قصيرة، بالترتيب - أو نصًا طويلًا واحدًا يقسّمه Equalang بنفسه عند حدود الجمل. |
| `estimate_cost` | ترفع ملفًا من دون بدء أي شيء؛ وتجيب بأقصى ما يمكن أن تكلفه مهمة عليه، وبـ`file_id` يبدأ المهمة من دون رفع ثانٍ. مجانية. |
| `check_job` | تستأنف متابعة مهمة، وتحفظ نتائجها عند اكتمالها. |
| `cancel_job` | توقف مهمة في قائمة الانتظار أو قيد التنفيذ. المهمة الملغاة لا تُحتسب تكلفتها. |
| `get_credit_balance` | رصيد الحساب من النقاط. |
| `list_languages` | كل رموز اللغات وأسماؤها. لا تحتاج إلى مفتاح. |

تبدو رموز اللغات هكذا: `en` و`zh-CN` و`ja`؛ وفي `list_languages` القائمة الكاملة. المهام تستغرق دقائق - تنتظر الأداة حتى `wait_seconds` (50 s افتراضيًا، و240 على الأكثر)، ثم تعيد معرّف مهمة يلتقطه `check_job`.

## روابط

- [Equalang](https://equalang.com) · [الأسعار](https://equalang.com/pricing) · [وثائق المطورين](https://equalang.com/developers)
- الـAPI للوكلاء: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) - العمليات نفسها على هيئة Agent Skill
- للاستفسارات: <support@equalang.com>

## الترخيص

[Apache-2.0](../LICENSE) © Equalang
