# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · **हिन्दी** · [العربية](README.ar.md)

[वेबसाइट](https://equalang.com) · [कीमतें](https://equalang.com/pricing) · [डेवलपर दस्तावेज़](https://equalang.com/developers) · [API कुंजियाँ](https://equalang.com/api-keys)

> **कीवर्ड:** दस्तावेज़ अनुवाद, PDF अनुवाद, PDF ट्रांसलेट कैसे करें, लेआउट बनाए रखते हुए PDF अनुवाद, Word फ़ाइल अनुवाद, PPT अनुवाद, Excel अनुवाद, EPUB अनुवाद, सबटाइटल अनुवाद, SRT ट्रांसलेटर, इमेज ट्रांसलेट, फोटो से टेक्स्ट अनुवाद, वीडियो अनुवाद, ऑडियो से टेक्स्ट, स्पीच टू टेक्स्ट, AI ट्रांसलेटर, mcp server, model context protocol, claude mcp, cursor mcp, translation api

**फ़ाइल का अनुवाद करें, लेआउट वैसा ही रखें।** [Equalang](https://equalang.com) के लिए एक MCP सर्वर। Equalang एक AI ट्रांसलेटर है जो पूरी फ़ाइलों पर काम करता है: PDF वापस PDF बनकर आता है, प्रेज़ेंटेशन वापस प्रेज़ेंटेशन बनकर, और तालिकाएँ, चित्र और सूत्र अपनी जगह पर रहते हैं। यह सबटाइटल और चित्रों का भी अनुवाद करता है, ऑडियो और वीडियो को अनूदित सबटाइटल या ट्रांसक्रिप्ट में बदलता है, और छोटे-छोटे टेक्स्ट का थोक में अनुवाद करता है। Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code और हर दूसरे MCP क्लाइंट में चलता है।

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## ऐसे कहकर देखें

- “~/Documents/contract.pdf का हिंदी में अनुवाद करो, लेआउट वैसा ही रखना।”
- “pitch-deck.pptx का अंग्रेज़ी और जापानी में अनुवाद करो।”
- “https://example.com/whitepaper.pdf का हिंदी में अनुवाद करके ~/Downloads में सेव करो।”
- “thesis.docx का अंग्रेज़ी में अनुवाद करने में कितना ख़र्च आएगा?”
- “interview.mp4 के लिए हिंदी सबटाइटल बनाओ, हर पंक्ति के ऊपर मूल पंक्ति भी रहे।”
- “standup.m4a को टाइमस्टैंप के साथ टेक्स्ट में बदलो।”
- “menu.jpg में लिखे टेक्स्ट का हिंदी में अनुवाद करो।”
- “locales/en.json की स्ट्रिंग्स का बंगाली, तमिल और मराठी में अनुवाद करो।”

## ख़ूबियाँ

- **दस्तावेज़** - PDF, DOCX, PPTX, XLSX, EPUB, HTML और TXT उसी फ़ॉर्मैट में लौटते हैं, संपादन योग्य रहते हैं, और तालिकाएँ, चित्र, सूत्र और पेज लेआउट अपनी जगह पर रहते हैं
- **सबटाइटल और चित्र** - SRT और VTT की टाइमिंग बनी रहती है, चाहें तो अनुवाद के ऊपर मूल पंक्ति भी रखी जा सकती है; JPG, PNG, WebP और BMP इस तरह लौटते हैं कि चित्र के भीतर का टेक्स्ट अनूदित हो चुका होता है
- **ऑडियो और वीडियो** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM और MKV अनूदित सबटाइटल बन जाते हैं, या बोली गई भाषा में ट्रांसक्रिप्ट (SRT, VTT, TXT, JSON)
- **थोक में टेक्स्ट** - छोटे-छोटे टेक्स्ट का उसी क्रम में अनुवाद, या एक लंबा टेक्स्ट (100,000 वर्णों तक) जिसे Equalang ख़ुद वाक्यों पर काटता है
- **भाषाएँ** - टेक्स्ट के लिए 100+ और फ़ाइलों के लिए 12, और स्रोत भाषा न दें तो वह अपने-आप पहचान ली जाती है

## कुंजी पाएँ

<https://equalang.com> पर साइन अप करें और <https://equalang.com/api-keys> पर एक कुंजी बनाएँ। नए खातों को मुफ़्त क्रेडिट मिलते हैं - एक दस्तावेज़ अनुवाद करके देखने के लिए काफ़ी।

कुंजी MCP क्लाइंट के कॉन्फ़िग के एनवायरनमेंट वेरिएबल में जाती है, URL में कभी नहीं। कुंजी के बिना भी सर्वर चालू होता है और अपने टूल की सूची देता है; जिस टूल को कुंजी चाहिए, वह बताता है कि कुंजी कैसे मिलेगी।

कुंजी हर मशीन पर एक बार `~/.config/equalang/.env` में `EQUALANG_API_KEY=el_your_key` के रूप में भी रखी जा सकती है: सर्वर के एनवायरनमेंट में कुंजी न हो तो वह यही फ़ाइल पढ़ता है, और Equalang स्किल भी - तब क्लाइंट कॉन्फ़िग में `env` की ज़रूरत नहीं रहती।

## इंस्टॉल

Node 18 या उससे नया चाहिए।

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

`-s user` इसे हर प्रोजेक्ट में उपलब्ध कराता है; डिफ़ॉल्ट स्कोप `local` सर्वर को सिर्फ़ उसी डायरेक्टरी में लोड करता है जहाँ से कमांड चलाया गया था।
</details>

<details>
<summary><b>OpenAI Codex</b></summary>

```bash
codex mcp add equalang --env EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```
</details>

<details>
<summary><b>Claude Desktop, Cursor, Windsurf, Cline और JSON से कॉन्फ़िगर होने वाले अन्य क्लाइंट</b></summary>

इसे क्लाइंट के MCP कॉन्फ़िग में जोड़ें - `claude_desktop_config.json`, `~/.cursor/mcp.json`, `~/.codeium/windsurf/mcp_config.json`, या वह फ़ाइल जो आपके क्लाइंट के दस्तावेज़ बताते हैं:

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

स्किल ज़्यादा पसंद है? [equalang-skill](https://github.com/equalang/equalang-skill) यही ऑपरेशन एक Agent Skill के रूप में देता है - एक Python स्क्रिप्ट, इंस्टॉल करने को कुछ नहीं।

## टूल

| टूल | क्या करता है |
| --- | --- |
| `translate_file` | किसी फ़ाइल (पाथ या सार्वजनिक URL) का दूसरी भाषा में अनुवाद करता है और नतीजा मूल फ़ाइल के बगल में सहेजता है। |
| `transcribe_recording` | ऑडियो या वीडियो फ़ाइल में जो बोला गया है उसे समय-चिह्नित टेक्स्ट (SRT, VTT, TXT, JSON) के रूप में लिखता है। |
| `translate_text` | छोटे-छोटे टेक्स्ट का, उसी क्रम में, अनुवाद करता है - या एक लंबे टेक्स्ट का, जिसे Equalang ख़ुद वाक्यों पर काटता है। |
| `estimate_cost` | कुछ भी शुरू किए बिना फ़ाइल अपलोड करता है; जवाब में बताता है कि उस पर जॉब की अधिकतम लागत कितनी हो सकती है, और एक `file_id` देता है जिससे दोबारा अपलोड किए बिना जॉब शुरू होता है। निःशुल्क। |
| `check_job` | किसी जॉब को दोबारा पकड़ता है, और पूरा हो जाने पर उसके नतीजे सहेजता है। |
| `cancel_job` | कतार में लगे या चल रहे जॉब को रोकता है। रद्द किए गए जॉब का शुल्क नहीं लगता। |
| `get_credit_balance` | खाते के क्रेडिट। |
| `list_languages` | हर भाषा का कोड और नाम। कुंजी की ज़रूरत नहीं। |

भाषा कोड `en`, `zh-CN`, `ja` जैसे होते हैं; पूरी सूची `list_languages` के पास है। जॉब में कुछ मिनट लगते हैं - टूल `wait_seconds` तक इंतज़ार करता है (डिफ़ॉल्ट 50 s, अधिकतम 240), फिर एक जॉब id लौटा देता है जिसे `check_job` उठा लेता है।

## लिंक

- [Equalang](https://equalang.com) · [कीमतें](https://equalang.com/pricing) · [डेवलपर दस्तावेज़](https://equalang.com/developers)
- एजेंटों के लिए API: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) - यही ऑपरेशन एक Agent Skill के रूप में
- सवाल: <support@equalang.com>

## लाइसेंस

[Apache-2.0](../LICENSE) © Equalang
