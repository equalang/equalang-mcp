# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · **Polski** · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[Strona](https://equalang.com) · [Cennik](https://equalang.com/pricing) · [Dokumentacja dla programistów](https://equalang.com/developers) · [Klucze API](https://equalang.com/api-keys)

> **Słowa kluczowe:** tłumaczenie dokumentów, tłumacz dokumentów, tłumaczenie pdf, tłumacz pdf, tłumaczenie pdf z zachowaniem formatowania, tłumaczenie plików word, tłumaczenie prezentacji powerpoint, tłumaczenie excel, tłumaczenie epub, tłumaczenie napisów, tłumaczenie napisów srt, tłumaczenie tekstu ze zdjęcia, tłumaczenie filmów, transkrypcja nagrań, zamiana mowy na tekst, tłumacz ai, mcp server, serwer mcp, model context protocol, claude mcp, cursor mcp, translation api

**Przetłumacz plik, zachowaj układ.** Serwer MCP dla [Equalang](https://equalang.com) – tłumacza AI, który pracuje na całych plikach: PDF wraca jako PDF, prezentacja jako prezentacja, a tabele, obrazy i wzory zostają tam, gdzie były. Tłumaczy też napisy i obrazy, zamienia audio i wideo w przetłumaczone napisy albo transkrypcję i hurtowo tłumaczy krótkie teksty. Działa w Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code i każdym innym kliencie MCP.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Spróbuj poprosić

- „Przetłumacz ~/Documents/contract.pdf na polski, zachowując układ.”
- „Przetłumacz pitch-deck.pptx na angielski i niemiecki.”
- „Przetłumacz https://example.com/whitepaper.pdf na polski i zapisz w ~/Downloads.”
- „Ile kosztowałoby przetłumaczenie thesis.docx na angielski?”
- „Zrób polskie napisy do interview.mp4, z oryginalną linią nad każdym tłumaczeniem.”
- „Zrób transkrypcję standup.m4a ze znacznikami czasu.”
- „Przetłumacz na polski tekst z menu.jpg.”
- „Przetłumacz teksty z locales/en.json na niemiecki, czeski i ukraiński.”

## Funkcje

- **Dokumenty** – PDF, DOCX, PPTX, XLSX, EPUB, HTML i TXT wracają w tym samym formacie, nadal edytowalne, z tabelami, obrazami, wzorami i układem strony na swoich miejscach
- **Napisy i obrazy** – SRT i VTT zachowują znaczniki czasu, opcjonalnie z oryginalną linią nad tłumaczeniem; JPG, PNG, WebP i BMP wracają z przetłumaczonym tekstem na obrazie
- **Audio i wideo** – MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM i MKV stają się przetłumaczonymi napisami albo transkrypcją w języku nagrania (SRT, VTT, TXT, JSON)
- **Teksty hurtowo** – krótkie teksty tłumaczone po kolei albo jeden długi tekst (do 100 000 znaków), który Equalang sam dzieli na zdania
- **Języki** – ponad 100 dla tekstu i 12 dla plików, a język źródłowy jest wykrywany, gdy go pominiesz

## Zdobądź klucz

Zarejestruj się na <https://equalang.com> i utwórz klucz na <https://equalang.com/api-keys>. Nowe konta zaczynają z darmowymi kredytami – wystarczy, żeby przetłumaczyć jeden dokument na próbę.

Klucz trafia do zmiennej środowiskowej w konfiguracji klienta MCP, nigdy do adresu URL. Bez klucza serwer i tak się uruchamia i wyświetla listę narzędzi; narzędzie, które potrzebuje klucza, odpowiada informacją, jak go zdobyć.

Klucz może też leżeć raz na komputer w `~/.config/equalang/.env`, który czyta również skill Equalang:

```bash
# Zamień el_your_key na swój klucz
mkdir -p ~/.config/equalang && echo 'EQUALANG_API_KEY=el_your_key' > ~/.config/equalang/.env && chmod 600 ~/.config/equalang/.env
```

Serwer najpierw bierze `EQUALANG_API_KEY` ze swojego środowiska, a plik czyta tylko wtedy, gdy go tam nie ma: klucz w konfiguracji klienta ma pierwszeństwo, a gdy plik istnieje, konfiguracja klienta nie potrzebuje `env`.

## Instalacja

Wymaga Node 18 lub nowszego.

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

`-s user` udostępnia serwer w każdym projekcie; przy domyślnym zakresie, `local`, serwer ładuje się tylko w katalogu, w którym uruchomiono polecenie.
</details>

<details>
<summary><b>OpenAI Codex</b></summary>

```bash
codex mcp add equalang --env EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```
</details>

<details>
<summary><b>Claude Desktop, Cursor, Windsurf, Cline i inne klienty konfigurowane przez JSON</b></summary>

Dodaj to do konfiguracji MCP klienta – `claude_desktop_config.json`, `~/.cursor/mcp.json`, `~/.codeium/windsurf/mcp_config.json` albo pliku wskazanego w dokumentacji twojego klienta:

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

Wolisz skill? [equalang-skill](https://github.com/equalang/equalang-skill) udostępnia te same operacje jako Agent Skill – jeden skrypt w Pythonie, nic do instalowania.

## Narzędzia

| Narzędzie | Co robi |
| --- | --- |
| `translate_file` | Tłumaczy plik (ścieżka lub publiczny URL) na inny język i zapisuje wynik obok niego. |
| `transcribe_recording` | Spisuje to, co pada w pliku audio lub wideo, jako tekst ze znacznikami czasu (SRT, VTT, TXT, JSON). |
| `translate_text` | Tłumaczy krótkie teksty, po kolei – albo jeden długi tekst, który Equalang sam dzieli na zdania. |
| `estimate_cost` | Przesyła plik, niczego nie uruchamiając; w odpowiedzi podaje maksymalny koszt zadania na tym pliku oraz `file_id`, które pozwala uruchomić zadanie bez ponownego przesyłania. Bezpłatne. |
| `check_job` | Wraca do zadania i zapisuje jego wyniki, gdy jest już zakończone. |
| `cancel_job` | Zatrzymuje zadanie oczekujące w kolejce lub w toku. Za anulowane zadanie nie pobiera się opłaty. |
| `get_credit_balance` | Kredyty na koncie. |
| `list_languages` | Wszystkie kody i nazwy języków. Nie wymaga klucza. |

Kody języków wyglądają tak: `en`, `zh-CN`, `ja`; pełną listę ma `list_languages`. Zadania trwają minuty – narzędzie czeka najwyżej `wait_seconds` (domyślnie 50 s, maksymalnie 240), a potem oddaje id zadania, które `check_job` podejmie dalej.

## Linki

- [Equalang](https://equalang.com) · [Cennik](https://equalang.com/pricing) · [Dokumentacja dla programistów](https://equalang.com/developers)
- API dla agentów: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) – te same operacje jako Agent Skill
- Pytania: <support@equalang.com>

## Licencja

[Apache-2.0](../LICENSE) © Equalang
