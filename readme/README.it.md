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
- **Testo in blocco** – stringhe separate tradotte nell'ordine dato, oppure un unico testo lungo (fino a 100.000 caratteri) che Equalang divide da sé in frasi; oltre 100 lingue per il testo, 12 per i file
- **File interi, niente copia e incolla** – fino a 100 MB per file, da un percorso o da un URL pubblico; nulla da spezzettare in caselle di testo
- **Non costa token** – l'agente passa un percorso o un URL e riceve in cambio dei percorsi; un PDF di 300 pagine non entra mai nella conversazione
- **Il prezzo prima del job** – `estimate_cost` risponde, gratis, con il costo massimo di un job; i job falliti o annullati non costano nulla; una registrazione viene addebitata per il parlato effettivamente rilevato; i crediti non scadono mai

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

## Quattro cose da sapere

**Lingue.** I codici hanno la forma `en`, `zh-CN`, `ja`. Nel pacchetto non c'è alcun elenco incorporato: `list_languages` legge codici e nomi dall'API in tempo reale (meno per i file che per il testo), quindi una lingua aggiunta da Equalang è disponibile senza aggiornamenti. Ometti la lingua di origine per farla rilevare automaticamente.

**Crediti.** Il lavoro consuma i crediti dell'account – lo stesso saldo del sito web – perciò il server dice al modello di indicare prima il costo e ottenere il consenso; la cifra viene da `estimate_cost`.

**I job durano minuti.** Uno strumento aspetta il proprio job, ma non oltre quanto un client concede a una chiamata (50 s per impostazione predefinita, `wait_seconds` fino a 240). Dopodiché il modello riceve l'id del job con l'indicazione di chiamare `check_job`, che salva i risultati al posto giusto.

**Limiti.** Fino a 100 MB per file; `translate_text` accetta fino a 50 testi da 5.000 caratteri (20.000 per chiamata), oppure un unico testo fino a 100.000.

## Domande frequenti

**Il PDF tradotto conserva l'impaginazione?**
Sì, è proprio questo il punto. Il testo viene rimesso dov'era, e tabelle, immagini e formule restano al loro posto; un DOCX, PPTX o XLSX resta modificabile.

**Il mio documento viene inviato al modello?**
No. Il server carica il file su Equalang e risponde con un percorso. Un articolo di 300 pagine non costa alcun token.

**Può tradurre il testo dentro un'immagine?**
Sì. Il testo in un JPG, PNG, WebP o BMP viene riconosciuto, tradotto e ridisegnato nell'immagine.

**Quanto costa un job?**
Lo dice `estimate_cost` prima che parta qualsiasi cosa, ed è gratuito. I prezzi sono su <https://equalang.com/pricing>.

## Com'è costruito

Tre decisioni, ciascuna con la sua ragione:

1. **Un file non passa mai attraverso il modello.** MCP non ha un tipo file, e un PDF da 5 MB nel risultato di uno strumento costa una fortuna in contesto senza dire nulla. Uno strumento riceve *dove si trova un file* – un percorso assoluto su questa macchina, oppure un URL `http(s)` pubblico – e risponde con *dove sono stati scritti i risultati*. Un URL viene passato a Equalang, che lo scarica da sé; qui non si scarica nulla solo per ricaricarlo.
2. **Un job vive dentro una sola chiamata di strumento.** Restituire un id di job e confidare che il modello faccia polling è un ciclo che viene abbandonato a metà. Lo strumento aspetta – sospendendosi tra un controllo e l'altro per il tempo richiesto dal `Retry-After` dell'API, e comunicando l'avanzamento al client che lo ha chiesto – ma non oltre quanto un client concede a una chiamata (50 s per impostazione predefinita, `wait_seconds` fino a 240). Dopodiché il modello riceve l'id con l'indicazione di chiamare `check_job`; il server ricorda dove vanno i risultati di quel job.
3. **Le risposte dell'API vengono riportate, non indovinate.** Se un errore si può ritentare lo dice il `retryable` dell'API, non un'interpretazione dei codici di stato. Quanto può costare un job lo dice il `quote` dell'API, non una tariffa copiata in questo pacchetto. L'elenco delle lingue viene letto dal documento OpenAPI dell'API. Una richiesta che crea un job porta la stessa `Idempotency-Key` in tutti i tentativi di questo client, così una risposta persa non può diventare un secondo job addebitato.

Una risposta viene data due volte – come testo per tutti i client e come `structuredContent` per quelli che lo leggono – e ogni file scritto viene indicato anche come `resource_link`, che è il modo in cui MCP dice «ecco un file» senza trasportarne i byte. Ciò che vale per tutti gli strumenti (percorsi in ingresso, percorsi in uscita, chiedere prima di spendere) è detto una sola volta, nelle `instructions` del server. I risultati non sovrascrivono mai: a un nome già occupato si aggiunge ` (1)`. I percorsi relativi vengono rifiutati: questo processo non condivide la directory di lavoro dell'agente.

## Sviluppo

```bash
npm install && npm run build
node selftest.mjs                                          # protocollo, elenco degli strumenti, lo strumento senza chiave
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # e job reali (consuma crediti)
node check-api.mjs                                         # percorsi, campi e ciò che le descrizioni degli strumenti promettono, rispetto al contratto attuale dell'API
```

`EQUALANG_BASE_URL` punta il server verso un altro deployment.

## Link

- [Equalang](https://equalang.com) · [Prezzi](https://equalang.com/pricing) · [Documentazione per sviluppatori](https://equalang.com/developers)
- API per agenti: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) – le stesse operazioni come Agent Skill
- Domande: <support@equalang.com>

## Licenza

[Apache-2.0](../LICENSE) © Equalang
