# Server MCP di Equalang

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · **Italiano** · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

Metti [Equalang](https://equalang.com) a disposizione di un agente: traduce file interi conservandone l'impaginazione, trascrive registrazioni, traduce stringhe.

- **Documenti** - PDF, DOCX, PPTX, XLSX, EPUB, HTML, TXT - tornano nello stesso formato, con tabelle, immagini e formule al loro posto.
- **Sottotitoli** (SRT, VTT) e **immagini** (JPG, PNG, WebP, BMP).
- **Audio e video** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM, MKV - tornano come sottotitoli tradotti, oppure come trascrizione nella lingua parlata.

L'agente passa un percorso o un URL e riceve in cambio dei percorsi. Il contenuto dei file non entra mai nella conversazione.

## Installazione

Crea una chiave su <https://equalang.com/api-keys>, poi aggiungi il server al tuo client:

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

Richiede Node 18 o successivo. Senza chiave il server si avvia comunque ed elenca i suoi strumenti; uno strumento che ha bisogno della chiave risponde spiegando come ottenerla.

## Strumenti

| Strumento | Cosa fa |
| --- | --- |
| `translate_file` | Traduce un file (percorso o URL pubblico) in un'altra lingua e salva il risultato accanto all'originale. |
| `transcribe_recording` | Mette per iscritto ciò che viene detto in un file audio o video, come testo con i tempi (SRT, VTT, TXT, JSON). |
| `translate_text` | Traduce fino a 50 brevi testi semplici, nell'ordine dato. |
| `estimate_cost` | Carica un file senza avviare nulla; risponde con il costo massimo di un job su quel file e con un `file_id` che avvia il job senza un secondo caricamento. Gratuito. |
| `check_job` | Riprende un job e, una volta terminato, ne salva i risultati. |
| `cancel_job` | Ferma un job in coda o in esecuzione. Un job annullato non viene addebitato. |
| `get_credit_balance` | I crediti dell'account. |
| `list_languages` | Codici e nomi delle lingue, letti dall'API in tempo reale. Non richiede chiave. |

**Crediti.** Il lavoro consuma i crediti dell'account - lo stesso saldo del sito web - perciò il server dice al modello di indicare prima il costo e ottenere il consenso; la cifra viene da `estimate_cost`. Una registrazione viene addebitata per il parlato effettivamente rilevato, quindi di solito costa meno della stima.

**Lingue.** I codici hanno la forma `en`, `zh-CN`, `ja`. Nel pacchetto non c'è alcun elenco incorporato: `list_languages` legge codici e nomi dall'API in tempo reale (meno per i file che per il testo), quindi una lingua aggiunta da Equalang è disponibile senza aggiornamenti. Ometti la lingua di origine per farla rilevare automaticamente.

**Formati e limiti.** I formati elencati sopra, fino a 100 MB per file; `translate_text` accetta fino a 50 testi da 5,000 caratteri, 20,000 caratteri per chiamata.

## Com'è costruito

Tre decisioni, ciascuna con la sua ragione:

1. **Un file non passa mai attraverso il modello.** MCP non ha un tipo file, e un PDF da 5 MB nel risultato di uno strumento costa una fortuna in contesto senza dire nulla. Uno strumento riceve *dove si trova un file* - un percorso assoluto su questa macchina, oppure un URL `http(s)` pubblico - e risponde con *dove sono stati scritti i risultati*. Un URL viene passato a Equalang, che lo scarica da sé; qui non si scarica nulla solo per ricaricarlo.
2. **Un job vive dentro una sola chiamata di strumento.** Restituire un id di job e confidare che il modello faccia polling è un ciclo che viene abbandonato a metà. Lo strumento aspetta - sospendendosi tra un controllo e l'altro per il tempo richiesto dal `Retry-After` dell'API, e comunicando l'avanzamento al client che lo ha chiesto - ma non oltre quanto un client concede a una chiamata (50 s per impostazione predefinita, `wait_seconds` fino a 240). Dopodiché il modello riceve l'id con l'indicazione di chiamare `check_job`; il server ricorda dove vanno i risultati di quel job.
3. **Le risposte dell'API vengono riportate, non indovinate.** Se un errore si può ritentare lo dice il `retryable` dell'API, non un'interpretazione dei codici di stato. Quanto può costare un job lo dice il `quote` dell'API, non una tariffa copiata in questo pacchetto. L'elenco delle lingue viene letto dal documento OpenAPI dell'API. Una richiesta che crea un job porta la stessa `Idempotency-Key` in tutti i tentativi di questo client, così una risposta persa non può diventare un secondo job addebitato.

Una risposta viene data due volte - come testo per tutti i client e come `structuredContent` per quelli che lo leggono - e ogni file scritto viene indicato anche come `resource_link`, che è il modo in cui MCP dice "ecco un file" senza trasportarne i byte. Ciò che vale per tutti gli strumenti (percorsi in ingresso, percorsi in uscita, chiedere prima di spendere) è detto una sola volta, nelle `instructions` del server. I risultati non sovrascrivono mai: a un nome già occupato si aggiunge ` (1)`. I percorsi relativi vengono rifiutati - questo processo non condivide la directory di lavoro dell'agente.

## Sviluppo

```bash
npm install && npm run build
node selftest.mjs                                          # protocollo, elenco degli strumenti, lo strumento senza chiave
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # e job reali (consuma crediti)
node check-api.mjs                                         # percorsi, campi e ciò che le descrizioni degli strumenti promettono, rispetto al contratto attuale dell'API
```

`EQUALANG_BASE_URL` punta il server verso un altro deployment. L'API stessa: <https://equalang.com/llms.txt>.

Apache-2.0.
