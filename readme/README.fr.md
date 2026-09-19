# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · **Français** · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[Site web](https://equalang.com) · [Tarifs](https://equalang.com/pricing) · [Documentation développeur](https://equalang.com/developers) · [Clés API](https://equalang.com/api-keys)

> **Mots-clés :** traduire un pdf, traducteur pdf, traduire un pdf en gardant la mise en page, traduction de documents, traduire un document word, traduire un docx, traduire un powerpoint, traduire un fichier excel, traduire un epub, traduire des sous-titres, traducteur srt, traduire une image, traduire le texte d'une image, traduire une vidéo, transcription audio en texte, traducteur ia, mcp server, serveur mcp, model context protocol, claude mcp, cursor mcp, translation api

**Traduisez le fichier, gardez la mise en page.** Un serveur MCP pour [Equalang](https://equalang.com), un traducteur IA qui travaille sur des fichiers entiers : un PDF revient en PDF, une présentation en présentation, tableaux, images et formules à leur place. Il traduit aussi les sous-titres et les images, transforme l'audio et la vidéo en sous-titres traduits ou en transcription, et traduit des chaînes de texte par lots. Fonctionne dans Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code et tout autre client MCP.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Fonctionnalités

- **Le format à l'entrée, le même à la sortie** : PDF, DOCX, PPTX, XLSX, EPUB, HTML et TXT reviennent dans le même format, toujours modifiables, tableaux, images, formules et mise en page à leur place
- **Sous-titres et images** : SRT et VTT gardent leur minutage, avec au besoin la ligne d'origine au-dessus de la traduction ; JPG, PNG, WebP et BMP reviennent avec le texte de l'image traduit
- **Audio et vidéo** : MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM et MKV deviennent des sous-titres traduits, ou une transcription dans la langue parlée (SRT, VTT, TXT, JSON)
- **Texte par lots** : des chaînes séparées traduites dans l'ordre, ou un seul long texte (jusqu'à 100 000 caractères) qu'Equalang découpe lui-même par phrases ; plus de 100 langues pour le texte, 12 pour les fichiers
- **Des fichiers entiers, sans copier-coller** : jusqu'à 100 MB par fichier, depuis un chemin ou une URL publique ; rien à découper dans des zones de texte
- **Aucun token consommé** : l'agent passe un chemin ou une URL et reçoit des chemins en retour ; un PDF de 300 pages n'entre jamais dans la conversation
- **Le prix avant la tâche** : `estimate_cost` répond, gratuitement, avec le coût maximal d'une tâche ; les tâches échouées ou annulées ne coûtent rien ; un enregistrement est facturé pour la parole réellement entendue ; les crédits n'expirent jamais

## Obtenir une clé

Inscrivez-vous sur <https://equalang.com> et créez une clé sur <https://equalang.com/api-keys>. Les nouveaux comptes démarrent avec des crédits gratuits, de quoi faire passer un document et voir ce qui en ressort.

La clé va dans une variable d'environnement de la configuration du client MCP, jamais dans une URL. Elle n'est affichée qu'une fois ; Equalang n'en conserve qu'un hash. Sans clé, le serveur démarre quand même et liste ses outils ; un outil qui a besoin de la clé répond en indiquant comment en obtenir une.

## Installation

Nécessite Node 18 ou plus récent.

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

`-s user` le rend disponible dans tous les projets ; la portée par défaut, `local`, ne charge le serveur que dans le répertoire où la commande a été lancée.
</details>

<details>
<summary><b>OpenAI Codex</b></summary>

```bash
codex mcp add equalang --env EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```
</details>

<details>
<summary><b>Claude Desktop, Cursor, Windsurf, Cline et les autres clients configurés en JSON</b></summary>

Ajoutez ceci à la configuration MCP du client (`claude_desktop_config.json`, `~/.cursor/mcp.json`, `~/.codeium/windsurf/mcp_config.json`, ou le fichier que documente votre client) :

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

Vous préférez un skill ? [equalang-skill](https://github.com/equalang/equalang-skill) propose les mêmes opérations sous forme d'Agent Skill : un seul script Python, rien à installer.

## Outils

| Outil | Ce qu'il fait |
| --- | --- |
| `translate_file` | Traduit un fichier (chemin ou URL publique) dans une autre langue et enregistre le résultat à côté. |
| `transcribe_recording` | Met par écrit ce que dit un fichier audio ou vidéo, sous forme de texte horodaté (SRT, VTT, TXT, JSON). |
| `translate_text` | Traduit des chaînes séparées, dans l'ordre, ou bien un seul long texte, qu'Equalang découpe lui-même par phrases. |
| `estimate_cost` | Envoie un fichier sans rien lancer ; répond avec le coût maximal d'une tâche sur ce fichier, et un `file_id` qui lance la tâche sans second envoi. Gratuit. |
| `check_job` | Reprend une tâche et enregistre ses résultats une fois qu'elle est terminée. |
| `cancel_job` | Arrête une tâche en file d'attente ou en cours. Une tâche annulée n'est pas facturée. |
| `get_credit_balance` | Les crédits du compte. |
| `list_languages` | Codes et noms de langues, lus depuis l'API en direct. Ne nécessite pas de clé. |

## Quatre choses à savoir

**Langues.** Les codes ressemblent à `en`, `zh-CN`, `ja`. Aucune liste n'est intégrée à ce paquet : `list_languages` lit les codes et les noms depuis l'API en direct (moins nombreux pour les fichiers que pour le texte), de sorte qu'une langue ajoutée par Equalang est disponible sans mise à jour. Omettez la langue source pour qu'elle soit détectée.

**Crédits.** Le travail consomme les crédits du compte, le même solde que sur le site web ; le serveur demande donc au modèle d'annoncer le coût et d'obtenir un accord d'abord, et le chiffre vient de `estimate_cost`.

**Les tâches prennent des minutes.** Un outil attend sa tâche, mais pas au-delà de ce qu'un client accorde à un appel (50 s par défaut, `wait_seconds` jusqu'à 240). Ensuite, le modèle reçoit l'identifiant de la tâche et la consigne d'appeler `check_job`, qui enregistre les résultats là où ils doivent aller.

**Limites.** Jusqu'à 100 MB par fichier ; `translate_text` accepte jusqu'à 50 textes de 5 000 caractères (20 000 par appel), ou un seul texte de 100 000 au plus.

## Questions fréquentes

**Le PDF traduit garde-t-il sa mise en page ?**
Oui, c'est tout l'intérêt. Le texte est remis là où il était, et les tableaux, images et formules restent en place ; un DOCX, PPTX ou XLSX reste modifiable.

**Mon document est-il envoyé au modèle ?**
Non. Le serveur envoie le fichier à Equalang et répond par un chemin. Un article de 300 pages ne coûte aucun token.

**Peut-il traduire le texte à l'intérieur d'une image ?**
Oui. Le texte d'un JPG, PNG, WebP ou BMP est reconnu, traduit puis redessiné dans l'image.

**Combien coûte une tâche ?**
`estimate_cost` le dit avant que quoi que ce soit ne démarre, et c'est gratuit. Les tarifs sont sur <https://equalang.com/pricing>.

## Comment il est construit

Trois décisions, chacune avec sa raison :

1. **Un fichier ne passe jamais par le modèle.** MCP n'a pas de type fichier, et un PDF de 5 MB dans un résultat d'outil coûte une fortune en contexte pour ne rien dire. Un outil reçoit *où se trouve un fichier* (un chemin absolu sur cette machine, ou une URL `http(s)` publique) et répond par *où les résultats ont été écrits*. Une URL est transmise à Equalang, qui la récupère lui-même ; rien n'est téléchargé ici pour être aussitôt renvoyé.
2. **Une tâche vit à l'intérieur d'un seul appel d'outil.** Renvoyer un identifiant de tâche et compter sur le modèle pour faire du polling, c'est une boucle qui s'abandonne à mi-chemin. L'outil attend – en marquant entre deux vérifications la pause que demande le `Retry-After` de l'API, et en signalant la progression au client qui l'a demandée – mais pas au-delà de ce qu'un client accorde à un appel (50 s par défaut, `wait_seconds` jusqu'à 240). Ensuite, le modèle reçoit l'identifiant et la consigne d'appeler `check_job` ; le serveur se souvient de l'endroit où vont les résultats de cette tâche.
3. **Les réponses de l'API sont répétées, pas devinées.** Qu'un échec puisse être retenté, c'est le `retryable` de l'API qui le dit, pas une lecture des codes de statut. Ce qu'une tâche peut coûter, c'est le `quote` de l'API, pas un tarif recopié dans ce paquet. La liste des langues est lue dans le document OpenAPI de l'API. Une requête qui crée une tâche porte un seul `Idempotency-Key` à travers les nouvelles tentatives de ce client, de sorte qu'une réponse perdue ne peut pas devenir une seconde tâche facturée.

Une réponse est donnée deux fois – en texte pour tous les clients et en `structuredContent` pour ceux qui le lisent – et chaque fichier écrit est aussi désigné par un `resource_link`, la façon dont MCP dit « voici un fichier » sans en transporter les octets. Ce qui vaut pour tous les outils (des chemins en entrée, des chemins en sortie, demander avant de dépenser) est dit une seule fois, dans les `instructions` du serveur. Les résultats n'écrasent jamais rien : un nom déjà pris reçoit ` (1)`. Les chemins relatifs sont refusés : ce processus ne partage pas le répertoire de travail de l'agent.

## Développement

```bash
npm install && npm run build
node selftest.mjs                                          # protocole, liste des outils, l'outil sans clé
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # et de vraies tâches (consomme des crédits)
node check-api.mjs                                         # chemins, champs et ce que promettent les descriptions des outils, face au contrat en direct de l'API
```

`EQUALANG_BASE_URL` fait pointer le serveur vers un autre déploiement.

## Liens

- [Equalang](https://equalang.com) · [Tarifs](https://equalang.com/pricing) · [Documentation développeur](https://equalang.com/developers)
- API pour les agents : [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) : les mêmes opérations sous forme d'Agent Skill
- Questions : <support@equalang.com>

## Licence

[Apache-2.0](../LICENSE) © Equalang
