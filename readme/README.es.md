# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · **Español** · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[Sitio web](https://equalang.com) · [Precios](https://equalang.com/pricing) · [Documentación para desarrolladores](https://equalang.com/developers) · [Claves de API](https://equalang.com/api-keys)

> **Palabras clave:** traducir pdf, traductor de pdf, traducir pdf manteniendo formato, traductor de documentos, traducir documento word, traducir docx, traducir powerpoint, traducir excel, traducir epub, traducir subtítulos, traductor srt, traducir imagen, traducir texto de una imagen, traducir vídeo, transcribir audio a texto, traductor con ia, mcp server, servidor mcp, model context protocol, claude mcp, cursor mcp, translation api

**Traduce el archivo, conserva la maquetación.** Un servidor MCP para [Equalang](https://equalang.com), un traductor con IA que trabaja con archivos enteros: un PDF vuelve como PDF y una presentación como presentación, con las tablas, las imágenes y las fórmulas donde estaban. También traduce subtítulos e imágenes, convierte audio y vídeo en subtítulos traducidos o en una transcripción, y traduce textos cortos en lote. Funciona en Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code y cualquier otro cliente MCP.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Prueba a pedir

- «Traduce ~/Documents/contract.pdf al español y conserva el formato.»
- «Traduce pitch-deck.pptx al inglés y al portugués.»
- «Traduce https://example.com/whitepaper.pdf al español y guárdalo en ~/Downloads.»
- «¿Cuánto costaría traducir thesis.docx al inglés?»
- «Haz subtítulos en español para interview.mp4, con la línea original encima de cada una.»
- «Transcribe standup.m4a con marcas de tiempo.»
- «Traduce al español el texto de menu.jpg.»
- «Traduce los textos de locales/en.json al francés, al alemán y al portugués.»

## Características

- **Documentos**: PDF, DOCX, PPTX, XLSX, EPUB, HTML y TXT vuelven en el mismo formato, todavía editables, con tablas, imágenes, fórmulas y maquetación de página en su sitio
- **Subtítulos e imágenes**: SRT y VTT conservan sus tiempos, con la línea original encima de la traducción si se quiere; JPG, PNG, WebP y BMP vuelven con el texto de la imagen traducido
- **Audio y vídeo**: MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM y MKV se convierten en subtítulos traducidos, o en una transcripción en el idioma hablado (SRT, VTT, TXT, JSON)
- **Texto en lote**: textos cortos traducidos en orden, o un solo texto largo (hasta 100.000 caracteres) que Equalang corta por frases por sí mismo
- **Idiomas**: más de 100 para texto y 12 para archivos, con el idioma de origen detectado cuando no lo indicas

## Consigue una clave

Regístrate en <https://equalang.com> y crea una clave en <https://equalang.com/api-keys>. Las cuentas nuevas vienen con créditos gratis, suficientes para traducir un documento y probarlo.

La clave va en una variable de entorno de la configuración del cliente MCP, nunca en una URL. Sin clave, el servidor arranca igualmente y lista sus herramientas; una herramienta que necesita la clave responde indicando cómo conseguirla.

La clave también puede guardarse una sola vez por equipo, en `~/.config/equalang/.env`, que el skill de Equalang también lee:

```bash
# Sustituye el_your_key por tu clave
mkdir -p ~/.config/equalang && echo 'EQUALANG_API_KEY=el_your_key' > ~/.config/equalang/.env && chmod 600 ~/.config/equalang/.env
```

El servidor toma `EQUALANG_API_KEY` primero de su entorno y solo lee el archivo si ahí no hay ninguna: una clave en la configuración del cliente tiene prioridad, y con el archivo la configuración del cliente no necesita `env`.

## Instalación

Requiere Node 18 o posterior.

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

`-s user` lo deja disponible en todos los proyectos; el ámbito por defecto, `local`, carga el servidor solo en el directorio desde el que se ejecutó el comando.
</details>

<details>
<summary><b>OpenAI Codex</b></summary>

```bash
codex mcp add equalang --env EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```
</details>

<details>
<summary><b>Claude Desktop, Cursor, Windsurf, Cline y otros clientes que se configuran con JSON</b></summary>

Añade esto a la configuración MCP del cliente: `claude_desktop_config.json`, `~/.cursor/mcp.json`, `~/.codeium/windsurf/mcp_config.json`, o el archivo que documente tu cliente:

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

¿Prefieres un skill? [equalang-skill](https://github.com/equalang/equalang-skill) ofrece las mismas operaciones como Agent Skill: un único script de Python, nada que instalar.

## Herramientas

| Herramienta | Qué hace |
| --- | --- |
| `translate_file` | Traduce un archivo (ruta o URL pública) a otro idioma y guarda el resultado junto a él. |
| `transcribe_recording` | Pone por escrito lo que dice un archivo de audio o vídeo, como texto con marcas de tiempo (SRT, VTT, TXT, JSON). |
| `translate_text` | Traduce textos cortos, en orden, o bien un solo texto largo, que Equalang corta por frases por sí mismo. |
| `estimate_cost` | Sube un archivo sin iniciar nada; responde con lo máximo que puede costar un trabajo sobre él y con un `file_id` que inicia el trabajo sin una segunda subida. Gratis. |
| `check_job` | Retoma un trabajo y guarda sus resultados cuando ha terminado. |
| `cancel_job` | Detiene un trabajo en cola o en curso. Un trabajo cancelado no se cobra. |
| `get_credit_balance` | Los créditos de la cuenta. |
| `list_languages` | Todos los códigos y nombres de idiomas. No necesita clave. |

Los códigos de idioma tienen la forma `en`, `zh-CN`, `ja`; `list_languages` tiene la lista completa. Los trabajos tardan minutos: una herramienta espera hasta `wait_seconds` (50 s por defecto, 240 como máximo) y luego devuelve un id de trabajo para que `check_job` lo retome.

## Enlaces

- [Equalang](https://equalang.com) · [Precios](https://equalang.com/pricing) · [Documentación para desarrolladores](https://equalang.com/developers)
- API para agentes: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill): las mismas operaciones como Agent Skill
- Preguntas: <support@equalang.com>

## Licencia

[Apache-2.0](../LICENSE) © Equalang
