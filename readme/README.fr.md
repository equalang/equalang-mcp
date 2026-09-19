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
- **Texte par lots** : des chaînes séparées traduites dans l'ordre, ou un seul long texte (jusqu'à 100 000 caractères) qu'Equalang découpe lui-même par phrases
- **Plus de 100 langues** : plus de 100 pour le texte et 12 pour les fichiers, avec la langue source détectée quand vous l'omettez

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

Les codes de langue ressemblent à `en`, `zh-CN`, `ja` ; `list_languages` les lit depuis l'API en direct, de sorte qu'une langue ajoutée par Equalang est disponible sans mise à jour. Une tâche prend des minutes : un outil attend jusqu'à `wait_seconds` (50 s par défaut, 240 au maximum), puis rend l'identifiant de la tâche pour `check_job`.

## Questions fréquentes

**Le PDF traduit garde-t-il sa mise en page ?**
Oui, c'est tout l'intérêt. Le texte est remis là où il était, et les tableaux, images et formules restent en place ; un DOCX, PPTX ou XLSX reste modifiable.

**Mon document est-il envoyé au modèle ?**
Non. Le serveur envoie le fichier à Equalang et répond par un chemin. Un article de 300 pages ne coûte aucun token.

**Peut-il traduire le texte à l'intérieur d'une image ?**
Oui. Le texte d'un JPG, PNG, WebP ou BMP est reconnu, traduit puis redessiné dans l'image.

**Combien coûte une tâche ?**
`estimate_cost` le dit avant que quoi que ce soit ne démarre, et c'est gratuit. Les tarifs sont sur <https://equalang.com/pricing>.

## Liens

- [Equalang](https://equalang.com) · [Tarifs](https://equalang.com/pricing) · [Documentation développeur](https://equalang.com/developers)
- API pour les agents : [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) : les mêmes opérations sous forme d'Agent Skill
- Questions : <support@equalang.com>

## Licence

[Apache-2.0](../LICENSE) © Equalang
