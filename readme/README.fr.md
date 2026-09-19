# Serveur MCP Equalang

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · **Français** · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

Donnez [Equalang](https://equalang.com) à un agent : traduire des fichiers entiers en conservant leur mise en page, transcrire des enregistrements, traduire des chaînes de texte.

- **Documents** - PDF, DOCX, PPTX, XLSX, EPUB, HTML, TXT - reviennent dans le même format, tableaux, images et formules à leur place.
- **Sous-titres** (SRT, VTT) et **images** (JPG, PNG, WebP, BMP).
- **Audio et vidéo** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM, MKV - reviennent sous forme de sous-titres traduits, ou de transcription dans la langue parlée.

L'agent passe un chemin ou une URL et reçoit des chemins en retour. Le contenu des fichiers n'entre jamais dans la conversation.

## Installation

Créez une clé sur <https://equalang.com/api-keys>, puis ajoutez le serveur à votre client :

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

Claude Code : `claude mcp add --transport stdio equalang --env EQUALANG_API_KEY=el_... -- npx -y @equalang/mcp`  
Codex : `codex mcp add equalang --env EQUALANG_API_KEY=el_... -- npx -y @equalang/mcp`

Nécessite Node 18 ou plus récent. Sans clé, le serveur démarre quand même et liste ses outils ; un outil qui a besoin de la clé répond en indiquant comment en obtenir une.

## Outils

| Outil | Ce qu'il fait |
| --- | --- |
| `translate_file` | Traduit un fichier (chemin ou URL publique) dans une autre langue et enregistre le résultat à côté. |
| `transcribe_recording` | Met par écrit ce que dit un fichier audio ou vidéo, sous forme de texte horodaté (SRT, VTT, TXT, JSON). |
| `translate_text` | Traduit jusqu'à 50 courts textes bruts, dans l'ordre. |
| `estimate_cost` | Envoie un fichier sans rien lancer ; répond avec le coût maximal d'une tâche sur ce fichier, et un `file_id` qui lance la tâche sans second envoi. Gratuit. |
| `check_job` | Reprend une tâche et enregistre ses résultats une fois qu'elle est terminée. |
| `cancel_job` | Arrête une tâche en file d'attente ou en cours. Une tâche annulée n'est pas facturée. |
| `get_credit_balance` | Les crédits du compte. |
| `list_languages` | Codes et noms de langues, lus depuis l'API en direct. Ne nécessite pas de clé. |

**Crédits.** Le travail consomme les crédits du compte - le même solde que sur le site web -, le serveur demande donc au modèle d'annoncer le coût et d'obtenir un accord d'abord ; le chiffre vient de `estimate_cost`. Un enregistrement est facturé pour la parole réellement entendue, il coûte donc généralement moins que l'estimation.

**Langues.** Les codes ressemblent à `en`, `zh-CN`, `ja`. Aucune liste n'est intégrée à ce paquet : `list_languages` lit les codes et les noms depuis l'API en direct (moins nombreux pour les fichiers que pour le texte), de sorte qu'une langue ajoutée par Equalang est disponible sans mise à jour. Omettez la langue source pour qu'elle soit détectée.

**Formats et limites.** Les formats ci-dessus, jusqu'à 100 MB par fichier ; `translate_text` accepte jusqu'à 50 textes de 5,000 caractères, 20,000 caractères par appel.

## Comment il est construit

Trois décisions, chacune avec sa raison :

1. **Un fichier ne passe jamais par le modèle.** MCP n'a pas de type fichier, et un PDF de 5 MB dans un résultat d'outil coûte une fortune en contexte pour ne rien dire. Un outil reçoit *où se trouve un fichier* - un chemin absolu sur cette machine, ou une URL `http(s)` publique - et répond par *où les résultats ont été écrits*. Une URL est transmise à Equalang, qui la récupère lui-même ; rien n'est téléchargé ici pour être aussitôt renvoyé.
2. **Une tâche vit à l'intérieur d'un seul appel d'outil.** Renvoyer un identifiant de tâche et compter sur le modèle pour faire du polling, c'est une boucle qui s'abandonne à mi-chemin. L'outil attend - en marquant entre deux vérifications la pause que demande le `Retry-After` de l'API, et en signalant la progression au client qui l'a demandée - mais pas au-delà de ce qu'un client accorde à un appel (50 s par défaut, `wait_seconds` jusqu'à 240). Ensuite, le modèle reçoit l'identifiant et la consigne d'appeler `check_job` ; le serveur se souvient de l'endroit où vont les résultats de cette tâche.
3. **Les réponses de l'API sont répétées, pas devinées.** Qu'un échec puisse être retenté, c'est le `retryable` de l'API qui le dit, pas une lecture des codes de statut. Ce qu'une tâche peut coûter, c'est le `quote` de l'API, pas un tarif recopié dans ce paquet. La liste des langues est lue dans le document OpenAPI de l'API. Une requête qui crée une tâche porte un seul `Idempotency-Key` à travers les nouvelles tentatives de ce client, de sorte qu'une réponse perdue ne peut pas devenir une seconde tâche facturée.

Une réponse est donnée deux fois - en texte pour tous les clients et en `structuredContent` pour ceux qui le lisent - et chaque fichier écrit est aussi désigné par un `resource_link`, la façon dont MCP dit « voici un fichier » sans en transporter les octets. Ce qui vaut pour tous les outils (des chemins en entrée, des chemins en sortie, demander avant de dépenser) est dit une seule fois, dans les `instructions` du serveur. Les résultats n'écrasent jamais rien : un nom déjà pris reçoit ` (1)`. Les chemins relatifs sont refusés - ce processus ne partage pas le répertoire de travail de l'agent.

## Développement

```bash
npm install && npm run build
node selftest.mjs                                          # protocole, liste des outils, l'outil sans clé
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # et de vraies tâches (consomme des crédits)
node check-api.mjs                                         # chemins, champs et ce que promettent les descriptions des outils, face au contrat en direct de l'API
```

`EQUALANG_BASE_URL` fait pointer le serveur vers un autre déploiement. L'API elle-même : <https://equalang.com/llms.txt>.

Apache-2.0.
