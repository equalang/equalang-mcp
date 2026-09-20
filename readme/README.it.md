# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · **Italiano** · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[Sito web](https://equalang.com) · [Prezzi](https://equalang.com/pricing) · [Documentazione per sviluppatori](https://equalang.com/developers) · [Chiavi API](https://equalang.com/api-keys)

> **Parole chiave:** traduzione documenti, tradurre pdf, traduttore pdf, tradurre pdf mantenendo il layout, tradurre documento word, tradurre powerpoint, tradurre file excel, tradurre epub, traduzione sottotitoli, tradurre srt, tradurre testo in un'immagine, traduzione video, trascrizione audio, da audio a testo, traduttore ai, mcp server, model context protocol, claude mcp, cursor mcp, translation api

**Traduci il file, conserva l'impaginazione.** Un server MCP per [Equalang](https://equalang.com), un traduttore AI che lavora su file interi: un PDF torna come PDF, una presentazione come presentazione, con tabelle, immagini e formule dov'erano. Traduce anche sottotitoli e immagini, trasforma audio e video in sottotitoli tradotti o in una trascrizione, e traduce stringhe in blocco. Funziona in Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code e in ogni altro client MCP.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Funzionalità

- **Stesso formato in ingresso e in uscita** – PDF, DOCX, PPTX, XLSX, EPUB, HTML e TXT tornano nello stesso formato, ancora modificabili, con tabelle, immagini, formule e impaginazione al loro posto
- **Sottotitoli e immagini** – SRT e VTT conservano i tempi, volendo con la riga originale sopra la traduzione; JPG, PNG, WebP e BMP tornano con il testo nell'immagine tradotto
- **Audio e video** – MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM e MKV diventano sottotitoli tradotti, oppure una trascrizione nella lingua parlata (SRT, VTT, TXT, JSON)
- **Testo in blocco** – stringhe separate tradotte nell'ordine dato, oppure un unico testo lungo (fino a 100.000 caratteri) che Equalang divide da sé in frasi
- **Oltre 100 lingue** – oltre 100 per il testo e 12 per i file, con la lingua di origine rilevata automaticamente se la ometti

## Ottieni una chiave

Registrati su <https://equalang.com> e crea una chiave su <https://equalang.com/api-keys>. I nuovi account partono con crediti gratuiti: abbastanza per far passare un documento e vedere che cosa torna indietro.

La chiave va in una variabile d'ambiente nella configurazione del client MCP, mai in un URL. Viene mostrata una sola volta; Equalang ne conserva soltanto un hash. Senza chiave il server si avvia comunque ed elenca i suoi strumenti; uno strumento che ha bisogno della chiave risponde spiegando come ottenerla.

## Installazione

Richiede Node 18 o successivo.

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

`-s user` lo rende disponibile in ogni progetto; con l'ambito predefinito, `local`, il server viene caricato solo nella directory da cui è stato eseguito il comando.
</details>

<details>
<summary><b>OpenAI Codex</b></summary>

```bash
codex mcp add equalang --env EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```
</details>

<details>
<summary><b>Claude Desktop, Cursor, Windsurf, Cline e altri client configurati tramite JSON</b></summary>

Aggiungi questo alla configurazione MCP del client – `claude_desktop_config.json`, `~/.cursor/mcp.json`, `~/.codeium/windsurf/mcp_config.json`, oppure il file indicato nella documentazione del tuo client:

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

Preferisci una skill? [equalang-skill](https://github.com/equalang/equalang-skill) offre le stesse operazioni come Agent Skill: un solo script Python, niente da installare.

## Strumenti

| Strumento | Cosa fa |
| --- | --- |
| `translate_file` | Traduce un file (percorso o URL pubblico) in un'altra lingua e salva il risultato accanto all'originale. |
| `transcribe_recording` | Mette per iscritto ciò che viene detto in un file audio o video, come testo con i tempi (SRT, VTT, TXT, JSON). |
| `translate_text` | Traduce stringhe separate, nell'ordine dato – oppure un unico testo lungo, che Equalang divide da sé in frasi. |
| `estimate_cost` | Carica un file senza avviare nulla; risponde con il costo massimo di un job su quel file e con un `file_id` che avvia il job senza un secondo caricamento. Gratuito. |
| `check_job` | Riprende un job e, una volta terminato, ne salva i risultati. |
| `cancel_job` | Ferma un job in coda o in esecuzione. Un job annullato non viene addebitato. |
| `get_credit_balance` | I crediti dell'account. |
| `list_languages` | Codici e nomi delle lingue, letti dall'API in tempo reale. Non richiede chiave. |

I codici delle lingue hanno la forma `en`, `zh-CN`, `ja`; `list_languages` li legge dall'API in tempo reale, quindi una lingua aggiunta da Equalang è disponibile senza aggiornamenti. I job durano minuti – uno strumento aspetta fino a `wait_seconds` (50 s per impostazione predefinita, 240 al massimo), poi restituisce l'id del job per `check_job`.

## Link

- [Equalang](https://equalang.com) · [Prezzi](https://equalang.com/pricing) · [Documentazione per sviluppatori](https://equalang.com/developers)
- API per agenti: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) – le stesse operazioni come Agent Skill
- Domande: <support@equalang.com>

## Licenza

[Apache-2.0](../LICENSE) © Equalang
