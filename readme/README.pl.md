# Serwer MCP Equalang

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · **Polski** · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

Daj agentowi [Equalang](https://equalang.com): tłumaczenie całych plików z zachowaniem układu, transkrypcję nagrań, tłumaczenie tekstów.

- **Dokumenty** - PDF, DOCX, PPTX, XLSX, EPUB, HTML, TXT - wracają w tym samym formacie, z tabelami, obrazami i wzorami na swoich miejscach.
- **Napisy** (SRT, VTT) i **obrazy** (JPG, PNG, WebP, BMP).
- **Audio i wideo** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM, MKV - wracają jako przetłumaczone napisy albo jako transkrypcja w języku nagrania.

Agent podaje ścieżkę lub URL i dostaje z powrotem ścieżki. Zawartość plików nigdy nie trafia do rozmowy.

## Instalacja

Utwórz klucz na <https://equalang.com/api-keys>, a potem dodaj serwer do swojego klienta:

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

Wymaga Node 18 lub nowszego. Bez klucza serwer i tak się uruchamia i wyświetla listę narzędzi; narzędzie, które potrzebuje klucza, odpowiada informacją, jak go zdobyć.

## Narzędzia

| Narzędzie | Co robi |
| --- | --- |
| `translate_file` | Tłumaczy plik (ścieżka lub publiczny URL) na inny język i zapisuje wynik obok niego. |
| `transcribe_recording` | Spisuje to, co pada w pliku audio lub wideo, jako tekst ze znacznikami czasu (SRT, VTT, TXT, JSON). |
| `translate_text` | Tłumaczy osobne ciągi znaków, po kolei - albo jeden długi tekst, który Equalang sam dzieli na zdania. |
| `estimate_cost` | Przesyła plik, niczego nie uruchamiając; w odpowiedzi podaje maksymalny koszt zadania na tym pliku oraz `file_id`, które pozwala uruchomić zadanie bez ponownego przesyłania. Bezpłatne. |
| `check_job` | Wraca do zadania i zapisuje jego wyniki, gdy jest już zakończone. |
| `cancel_job` | Zatrzymuje zadanie oczekujące w kolejce lub w toku. Za anulowane zadanie nie pobiera się opłaty. |
| `get_credit_balance` | Kredyty na koncie. |
| `list_languages` | Kody i nazwy języków, odczytane z działającego API. Nie wymaga klucza. |

**Kredyty.** Praca zużywa kredyty konta - to samo saldo co na stronie - dlatego serwer każe modelowi najpierw podać koszt i uzyskać zgodę; kwota pochodzi z `estimate_cost`. Za nagranie płaci się tylko za faktycznie usłyszaną mowę, więc zwykle kosztuje mniej, niż wynosi szacunek.

**Języki.** Kody wyglądają tak: `en`, `zh-CN`, `ja`. W pakiecie nie ma wbudowanej listy: `list_languages` odczytuje kody i nazwy z działającego API (dla plików jest ich mniej niż dla tekstu), więc język dodany przez Equalang jest dostępny bez aktualizacji. Pomiń język źródłowy, aby został wykryty automatycznie.

**Formaty i limity.** Formaty wymienione wyżej, do 100 MB na plik; `translate_text` przyjmuje do 50 tekstów po 5,000 znaków (20,000 na wywołanie) albo jeden tekst do 100,000.

## Jak to jest zbudowane

Trzy decyzje, każda z uzasadnieniem:

1. **Plik nigdy nie przechodzi przez model.** MCP nie ma typu plikowego, a 5 MB PDF w wyniku narzędzia kosztuje majątek w kontekście i nic nie wnosi. Narzędzie przyjmuje to, *gdzie plik się znajduje* - ścieżkę bezwzględną na tej maszynie albo publiczny URL `http(s)` - i odpowiada tym, *gdzie zapisano wyniki*. URL jest przekazywany do Equalang, który sam pobiera plik; nic nie jest tu pobierane tylko po to, by zostać przesłane ponownie.
2. **Zadanie żyje w obrębie jednego wywołania narzędzia.** Zwrócenie id zadania i liczenie na to, że model będzie odpytywał, to pętla porzucana w połowie. Narzędzie czeka samo - robiąc między sprawdzeniami przerwy tak długie, jak każe `Retry-After` z API, i raportując postęp klientowi, który o to poprosił - ale nie dłużej, niż klient pozwala trwać wywołaniu (domyślnie 50 s, `wait_seconds` do 240). Potem model dostaje id i polecenie wywołania `check_job`; serwer pamięta, gdzie mają trafić wyniki tego zadania.
3. **Odpowiedzi API są powtarzane, a nie zgadywane.** O tym, czy błąd można ponowić, decyduje `retryable` z API, a nie interpretacja kodów statusu. Koszt zadania to `quote` z API, a nie stawka przepisana do tego pakietu. Lista języków jest odczytywana z dokumentu OpenAPI tego API. Żądanie tworzące zadanie niesie jeden `Idempotency-Key` przez wszystkie ponowienia tego klienta, więc utracona odpowiedź nie zamieni się w drugie, płatne zadanie.

Odpowiedź jest podawana dwa razy - jako tekst dla każdego klienta i jako `structuredContent` dla tych, które go czytają - a każdy zapisany plik jest też wskazany jako `resource_link`, czyli tak, jak MCP mówi „oto plik” bez przenoszenia jego bajtów. To, co dotyczy każdego narzędzia (ścieżki na wejściu, ścieżki na wyjściu, pytaj przed wydaniem kredytów), jest powiedziane raz, w `instructions` serwera. Wyniki nigdy niczego nie nadpisują: zajęta nazwa dostaje ` (1)`. Ścieżki względne są odrzucane - ten proces nie dzieli katalogu roboczego z agentem.

## Rozwój

```bash
npm install && npm run build
node selftest.mjs                                          # protokół, lista narzędzi, narzędzie bez klucza
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # oraz prawdziwe zadania (zużywa kredyty)
node check-api.mjs                                         # ścieżki, pola i obietnice z opisów narzędzi, sprawdzane z aktualnym kontraktem API
```

`EQUALANG_BASE_URL` kieruje serwer na inne wdrożenie. Samo API: <https://equalang.com/llms.txt>.

Apache-2.0.
