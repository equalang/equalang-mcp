# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · **Français** · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[Site web](https://equalang.com) · [Tarifs](https://equalang.com/pricing) · [Documentation développeur](https://equalang.com/developers) · [Clés API](https://equalang.com/api-keys)

> **Mots-clés :** traduire un pdf, traducteur pdf, traduire un pdf en gardant la mise en page, traduction de documents, traduire un document word, traduire un docx, traduire un powerpoint, traduire un fichier excel, traduire un epub, traduire des sous-titres, traducteur srt, traduire une image, traduire le texte d'une image, traduire une vidéo, transcription audio en texte, traducteur ia, mcp server, serveur mcp, model context protocol, claude mcp, cursor mcp, translation api

**Traduisez le fichier, gardez la mise en page.** Un serveur MCP pour [Equalang](https://equalang.com), un traducteur IA qui travaille sur des fichiers entiers : un PDF revient en PDF, une présentation en présentation, tableaux, images et formules à leur place. Il traduit aussi les sous-titres et les images, transforme l'audio et la vidéo en sous-titres traduits ou en transcription, et traduit des textes courts par lots. Fonctionne dans Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code et tout autre client MCP.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Essayez de demander

- « Traduis ~/Documents/contract.pdf en français en gardant la mise en page. »
- « Traduis pitch-deck.pptx en anglais et en allemand. »
- « Traduis https://example.com/whitepaper.pdf en français et enregistre-le dans ~/Downloads. »
- « Combien coûterait la traduction de thesis.docx en anglais ? »
- « Fais des sous-titres français pour interview.mp4, avec la ligne d'origine au-dessus de chaque traduction. »
- « Transcris standup.m4a avec les horodatages. »
- « Traduis en français le texte de menu.jpg. »
- « Traduis les textes de locales/en.json en espagnol, en allemand et en italien. »

## Fonctionnalités

- **Documents** : PDF, DOCX, PPTX, XLSX, EPUB, HTML et TXT reviennent dans le même format, toujours modifiables, tableaux, images, formules et mise en page à leur place
- **Sous-titres et images** : SRT et VTT gardent leur minutage, avec au besoin la ligne d'origine au-dessus de la traduction ; JPG, PNG, WebP et BMP reviennent avec le texte de l'image traduit
- **Audio et vidéo** : MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM et MKV deviennent des sous-titres traduits, ou une transcription dans la langue parlée (SRT, VTT, TXT, JSON)
- **Texte par lots** : des textes courts traduits dans l'ordre, ou un seul long texte (jusqu'à 100 000 caractères) qu'Equalang découpe lui-même par phrases
- **Langues** : plus de 100 pour le texte et 12 pour les fichiers, avec la langue source détectée quand vous l'omettez

## Obtenir une clé

Inscrivez-vous sur <https://equalang.com> et créez une clé sur <https://equalang.com/api-keys>. Les nouveaux comptes reçoivent des crédits gratuits, de quoi traduire un document pour essayer.

La clé va dans une variable d'environnement de la configuration du client MCP, jamais dans une URL. Sans clé, le serveur démarre quand même et liste ses outils ; un outil qui a besoin de la clé répond en indiquant comment en obtenir une.

La clé peut aussi être enregistrée une seule fois par machine, dans `~/.config/equalang/.env`, que le skill Equalang lit aussi :

```bash
# Remplacez el_your_key par votre clé
mkdir -p ~/.config/equalang && echo 'EQUALANG_API_KEY=el_your_key' > ~/.config/equalang/.env && chmod 600 ~/.config/equalang/.env
```

Le serveur prend d'abord `EQUALANG_API_KEY` dans son environnement et ne lit le fichier que s'il n'y en a pas : une clé dans la configuration du client l'emporte, et avec le fichier la configuration du client n'a plus besoin d'`env`.

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
| `translate_text` | Traduit des textes courts, dans l'ordre, ou bien un seul long texte, qu'Equalang découpe lui-même par phrases. |
| `estimate_cost` | Envoie un fichier sans rien lancer ; répond avec le coût maximal d'une tâche sur ce fichier, et un `file_id` qui lance la tâche sans second envoi. Gratuit. |
| `check_job` | Reprend une tâche et enregistre ses résultats une fois qu'elle est terminée. |
| `cancel_job` | Arrête une tâche en file d'attente ou en cours. Une tâche annulée n'est pas facturée. |
| `get_credit_balance` | Les crédits du compte. |
| `list_languages` | Tous les codes et noms de langues. Ne nécessite pas de clé. |

Les codes de langue ressemblent à `en`, `zh-CN`, `ja` ; `list_languages` en donne la liste complète. Une tâche prend des minutes : un outil attend jusqu'à `wait_seconds` (50 s par défaut, 240 au maximum), puis rend un identifiant de tâche que `check_job` reprendra.

## Liens

- [Equalang](https://equalang.com) · [Tarifs](https://equalang.com/pricing) · [Documentation développeur](https://equalang.com/developers)
- API pour les agents : [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill) : les mêmes opérations sous forme d'Agent Skill
- Questions : <support@equalang.com>

## Licence

[Apache-2.0](../LICENSE) © Equalang
