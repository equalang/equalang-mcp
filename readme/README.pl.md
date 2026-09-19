# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · **Polski** · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[Strona](https://equalang.com) · [Cennik](https://equalang.com/pricing) · [Dokumentacja dla programistów](https://equalang.com/developers) · [Klucze API](https://equalang.com/api-keys)

> **Słowa kluczowe:** tłumaczenie dokumentów, tłumacz dokumentów, tłumaczenie pdf, tłumacz pdf, tłumaczenie pdf z zachowaniem formatowania, tłumaczenie plików word, tłumaczenie prezentacji powerpoint, tłumaczenie excel, tłumaczenie epub, tłumaczenie napisów, tłumaczenie napisów srt, tłumaczenie tekstu ze zdjęcia, tłumaczenie filmów, transkrypcja nagrań, zamiana mowy na tekst, tłumacz ai, mcp server, serwer mcp, model context protocol, claude mcp, cursor mcp, translation api

**Przetłumacz plik, zachowaj układ.** Serwer MCP dla [Equalang](https://equalang.com) – tłumacza AI, który pracuje na całych plikach: PDF wraca jako PDF, prezentacja jako prezentacja, a tabele, obrazy i wzory zostają tam, gdzie były. Tłumaczy też napisy i obrazy, zamienia audio i wideo w przetłumaczone napisy albo transkrypcję i hurtowo tłumaczy teksty. Działa w Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code i każdym innym kliencie MCP.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Funkcje

- **Ten sam format na wejściu i na wyjściu** – PDF, DOCX, PPTX, XLSX, EPUB, HTML i TXT wracają w tym samym formacie, nadal edytowalne, z tabelami, obrazami, wzorami i układem strony na swoich miejscach
- **Napisy i obrazy** – SRT i VTT zachowują znaczniki czasu, opcjonalnie z oryginalną linią nad tłumaczeniem; JPG, PNG, WebP i BMP wracają z przetłumaczonym tekstem na obrazie
- **Audio i wideo** – MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM i MKV stają się przetłumaczonymi napisami albo transkrypcją w języku nagrania (SRT, VTT, TXT, JSON)
- **Teksty hurtowo** – osobne ciągi znaków tłumaczone po kolei albo jeden długi tekst (do 100 000 znaków), który Equalang sam dzieli na zdania; ponad 100 języków dla tekstu, 12 dla plików
- **Całe pliki, bez wklejania** – do 100 MB na plik, ze ścieżki lub publicznego URL; niczego nie trzeba dzielić na kawałki i wklejać w pola tekstowe
- **Nie kosztuje tokenów** – agent podaje ścieżkę lub URL i dostaje z powrotem ścieżki; 300-stronicowy PDF nigdy nie trafia do rozmowy
- **Cena przed zadaniem** – `estimate_cost` podaje, za darmo, maksymalny koszt zadania; zadania nieudane i anulowane nic nie kosztują; za nagranie płaci się tylko za faktycznie usłyszaną mowę; kredyty nigdy nie wygasają

## Zdobądź klucz

Zarejestruj się na <https://equalang.com> i utwórz klucz na <https://equalang.com/api-keys>. Nowe konta zaczynają z darmowymi kredytami – wystarczy, żeby przepuścić dokument i zobaczyć, co wróci.

Klucz trafia do zmiennej środowiskowej w konfiguracji klienta MCP, nigdy do adresu URL. Jest pokazywany tylko raz; Equalang przechowuje wyłącznie jego hash. Bez klucza serwer i tak się uruchamia i wyświetla listę narzędzi; narzędzie, które potrzebuje klucza, odpowiada informacją, jak go zdobyć.

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
| `translate_text` | Tłumaczy osobne ciągi znaków, po kolei – albo jeden długi tekst, który Equalang sam dzieli na zdania. |
| `estimate_cost` | Przesyła plik, niczego nie uruchamiając; w odpowiedzi podaje maksymalny koszt zadania na tym pliku oraz `file_id`, które pozwala uruchomić zadanie bez ponownego przesyłania. Bezpłatne. |
| `check_job` | Wraca do zadania i zapisuje jego wyniki, gdy jest już zakończone. |
| `cancel_job` | Zatrzymuje zadanie oczekujące w kolejce lub w toku. Za anulowane zadanie nie pobiera się opłaty. |
| `get_credit_balance` | Kredyty na koncie. |
| `list_languages` | Kody i nazwy języków, odczytane z działającego API. Nie wymaga klucza. |

## Cztery rzeczy, które warto wiedzieć

**Języki.** Kody wyglądają tak: `en`, `zh-CN`, `ja`. W pakiecie nie ma wbudowanej listy: `list_languages` odczytuje kody i nazwy z działającego API (dla plików jest ich mniej niż dla tekstu), więc język dodany przez Equalang jest dostępny bez aktualizacji. Pomiń język źródłowy, aby został wykryty automatycznie.

**Kredyty.** Praca zużywa kredyty konta – to samo saldo co na stronie – dlatego serwer każe modelowi najpierw podać koszt i uzyskać zgodę; kwota pochodzi z `estimate_cost`.

**Zadania trwają minuty.** Narzędzie czeka na swoje zadanie, ale nie dłużej, niż klient pozwala trwać wywołaniu (domyślnie 50 s, `wait_seconds` do 240). Potem model dostaje id zadania i polecenie wywołania `check_job`, które zapisuje wyniki tam, gdzie ich miejsce.

**Limity.** Do 100 MB na plik; `translate_text` przyjmuje do 50 tekstów po 5000 znaków (20 000 na wywołanie) albo jeden tekst do 100 000.

## Częste pytania

**Czy przetłumaczony PDF zachowuje układ?**
Tak – właśnie o to chodzi. Tekst wraca tam, gdzie był, a tabele, obrazy i wzory zostają na miejscu; DOCX, PPTX i XLSX pozostają edytowalne.

**Czy mój dokument jest wysyłany do modelu?**
Nie. Serwer przesyła plik do Equalang i odpowiada ścieżką. 300-stronicowa praca nie kosztuje żadnych tokenów.

**Czy potrafi przetłumaczyć tekst na obrazie?**
Tak. Tekst w pliku JPG, PNG, WebP lub BMP jest rozpoznawany, tłumaczony i nanoszony z powrotem na obraz.

**Ile kosztuje zadanie?**
`estimate_cost` podaje koszt, zanim cokolwiek ruszy, i jest bezpłatne. Cennik: <https://equalang.com/pricing>.

## Jak to jest zbudowane

Trzy decyzje, każda z uzasadnieniem:

1. **Plik nigdy nie przechodzi przez model.** MCP nie ma typu plikowego, a 5 MB PDF w wyniku narzędzia kosztuje majątek w kontekście i nic nie wnosi. Narzędzie przyjmuje to, *gdzie plik się znajduje* – ścieżkę bezwzględną na tej maszynie albo publiczny URL `http(s)` – i odpowiada tym, *gdzie zapisano wyniki*. URL jest przekazywany do Equalang, który sam pobiera plik; nic nie jest tu pobierane tylko po to, by zostać przesłane ponownie.
2. **Zadanie żyje w obrębie jednego wywołania narzędzia.** Zwrócenie id zadania i liczenie na to, że model będzie odpytywał, to pętla porzucana w połowie. Narzędzie czeka samo – robiąc między sprawdzeniami przerwy tak długie, jak każe `Retry-After` z API, i raportując postęp klientowi, który o to poprosił – ale nie dłużej, niż klient pozwala trwać wywołaniu (domyślnie 50 s, `wait_seconds` do 240). Potem model dostaje id i polecenie wywołania `check_job`; serwer pamięta, gdzie mają trafić wyniki tego zadania.
3. **Odpowiedzi API są powtarzane, a nie zgadywane.** O tym, czy błąd można ponowić, decyduje `retryable` z API, a nie interpretacja kodów statusu. Koszt zadania to `quote` z API, a nie stawka przepisana do tego pakietu. Lista języków jest odczytywana z dokumentu OpenAPI tego API. Żądanie tworzące zadanie niesie jeden `Idempotency-Key` przez wszystkie ponowienia tego klienta, więc utracona odpowiedź nie zamieni się w drugie, płatne zadanie.

Odpowiedź jest podawana dwa razy – jako tekst dla każdego klienta i jako `structuredContent` dla tych, które go czytają – a każdy zapisany plik jest też wskazany jako `resource_link`, czyli tak, jak MCP mówi „oto plik” bez przenoszenia jego bajtów. To, co dotyczy każdego narzędzia (ścieżki na wejściu, ścieżki na wyjściu, pytaj przed wydaniem kredytów), jest powiedziane raz, w `instructions` serwera. Wyniki nigdy niczego nie nadpisują: zajęta nazwa dostaje ` (1)`. Ścieżki względne są odrzucane – ten proces nie dzieli katalogu roboczego z agentem.

## Rozwój

```bash
npm install && npm run build
node selftest.mjs                                          # protokół, lista narzędzi, narzędzie bez klucza
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # oraz prawdziwe zadania (zużywa kredyty)
node check-api.mjs                                         # ścieżki, pola i obietnice z opisów narzędzi, sprawdzane z aktualnym kontraktem API
```

`EQUALANG_BASE_URL` kieruje serwer na inne wdrożenie.

## Linki

- [Equalang](https://equalang.com) · [Cennik](https://equalang.com/pricing) · [Dokumentacja dla programistów](https://equalang.com/developers)
- API dla agentów: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) – te same operacje jako Agent Skill
- Pytania: <support@equalang.com>

## Licencja

[Apache-2.0](../LICENSE) © Equalang
