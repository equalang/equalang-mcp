# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · **Русский** · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[Сайт](https://equalang.com) · [Цены](https://equalang.com/pricing) · [Документация для разработчиков](https://equalang.com/developers) · [API-ключи](https://equalang.com/api-keys)

> **Ключевые слова:** перевод документов, переводчик документов, перевод pdf, переводчик pdf, перевод pdf с сохранением форматирования, перевод word, перевод презентации pptx, перевод excel, перевод epub, перевод субтитров, перевод srt, перевод текста на картинке, перевод видео, расшифровка аудио, аудио в текст, нейросеть переводчик, mcp server, mcp сервер, model context protocol, claude mcp, cursor mcp, translation api

**Переводите файл — вёрстка остаётся.** MCP-сервер для [Equalang](https://equalang.com) — ИИ-переводчика, который работает с файлами целиком: PDF возвращается как PDF, презентация — как презентация, а таблицы, изображения и формулы остаются на своих местах. Он также переводит субтитры и картинки, превращает аудио и видео в переведённые субтитры или расшифровку и пакетно переводит короткие тексты. Работает в Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code и любом другом MCP-клиенте.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Попробуйте попросить

- «Переведи ~/Documents/contract.pdf на русский, сохрани вёрстку.»
- «Переведи pitch-deck.pptx на английский и китайский.»
- «Переведи https://example.com/whitepaper.pdf на русский и сохрани в ~/Downloads.»
- «Сколько будет стоить перевод thesis.docx на английский?»
- «Сделай русские субтитры к interview.mp4, с исходной строкой над каждым переводом.»
- «Расшифруй standup.m4a с таймкодами.»
- «Сделай русскую версию картинки menu.jpg.»
- «Переведи novel.epub на русский.»

## Возможности

- **Документы** — PDF, DOCX, PPTX, XLSX, EPUB, HTML и TXT возвращаются в том же формате, остаются редактируемыми, а таблицы, изображения, формулы и вёрстка страниц — на месте
- **Субтитры и картинки** — SRT и VTT сохраняют тайминг, при желании с исходной строкой над переводом; JPG, PNG, WebP и BMP возвращаются с переведённым текстом прямо на картинке
- **Аудио и видео** — MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM и MKV превращаются в переведённые субтитры или в расшифровку на языке оригинала (SRT, VTT, TXT, JSON)
- **Текст пакетом** — короткие тексты переводятся с сохранением порядка, либо один длинный текст (до 100 000 символов), который Equalang сам делит по предложениям
- **Языки** — 100+ для текста и 12 для файлов, причём исходный язык определяется автоматически, если его не указать

## Получите ключ

Зарегистрируйтесь на <https://equalang.com> и создайте ключ на <https://equalang.com/api-keys>. Новые аккаунты получают бесплатные кредиты — их хватит, чтобы попробовать на одном документе.

Ключ указывается в переменной окружения в конфигурации MCP-клиента и никогда — в URL. Без ключа сервер всё равно запускается и показывает список инструментов; инструмент, которому нужен ключ, в ответ объясняет, как его получить.

Ключ можно также сохранить один раз на компьютер в `~/.config/equalang/.env` — этот файл читает и скилл Equalang:

```bash
# Замените el_your_key своим ключом
mkdir -p ~/.config/equalang && echo 'EQUALANG_API_KEY=el_your_key' > ~/.config/equalang/.env && chmod 600 ~/.config/equalang/.env
```

Сервер сначала берёт `EQUALANG_API_KEY` из своего окружения и читает файл, только если там ключа нет: ключ в конфигурации клиента имеет приоритет, а при наличии файла `env` в конфигурации клиента не нужен.

## Установка

Нужен Node 18 или новее.

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

`-s user` подключает сервер во всех проектах; с областью по умолчанию, `local`, сервер загружается только в том каталоге, из которого была выполнена команда.
</details>

<details>
<summary><b>OpenAI Codex</b></summary>

```bash
codex mcp add equalang --env EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```
</details>

<details>
<summary><b>Claude Desktop, Cursor, Windsurf, Cline и другие клиенты с настройкой через JSON</b></summary>

Добавьте это в MCP-конфигурацию клиента — `claude_desktop_config.json`, `~/.cursor/mcp.json`, `~/.codeium/windsurf/mcp_config.json` или файл, указанный в документации вашего клиента:

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

Предпочитаете скилл? [equalang-skill](https://github.com/equalang/equalang-skill) предлагает те же операции в виде Agent Skill — один скрипт на Python, ничего не нужно устанавливать.

## Инструменты

| Инструмент | Что делает |
| --- | --- |
| `translate_file` | Переводит файл (путь или публичный URL) на другой язык и сохраняет результат рядом с ним. |
| `transcribe_recording` | Записывает то, что звучит в аудио- или видеофайле, в виде текста с таймкодами (SRT, VTT, TXT, JSON). |
| `translate_text` | Переводит короткие тексты с сохранением порядка — или один длинный текст, который Equalang сам делит по предложениям. |
| `estimate_cost` | Загружает файл, ничего не запуская; возвращает максимальную стоимость задания для него и `file_id`, по которому задание запускается без повторной загрузки. Бесплатно. |
| `check_job` | Возвращается к заданию и сохраняет результаты, когда оно завершено. |
| `cancel_job` | Останавливает задание, которое стоит в очереди или выполняется. За отменённое задание плата не списывается. |
| `get_credit_balance` | Кредиты аккаунта. |
| `list_languages` | Все коды и названия языков. Ключ не нужен. |

Коды языков выглядят так: `en`, `zh-CN`, `ja`; полный список даёт `list_languages`. Задания занимают минуты — инструмент ждёт не дольше `wait_seconds` (по умолчанию 50 с, максимум 240), после чего возвращает id задания, которое подхватит `check_job`.

## Ссылки

- [Equalang](https://equalang.com) · [Цены](https://equalang.com/pricing) · [Документация для разработчиков](https://equalang.com/developers)
- API для агентов: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) — те же операции в виде Agent Skill
- Вопросы: <support@equalang.com>

## Лицензия

[Apache-2.0](../LICENSE) © Equalang
