# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · **Español** · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[Sitio web](https://equalang.com) · [Precios](https://equalang.com/pricing) · [Documentación para desarrolladores](https://equalang.com/developers) · [Claves de API](https://equalang.com/api-keys)

> **Palabras clave:** traducir pdf, traductor de pdf, traducir pdf manteniendo formato, traductor de documentos, traducir documento word, traducir docx, traducir powerpoint, traducir excel, traducir epub, traducir subtítulos, traductor srt, traducir imagen, traducir texto de una imagen, traducir vídeo, transcribir audio a texto, traductor con ia, mcp server, servidor mcp, model context protocol, claude mcp, cursor mcp, translation api

**Traduce el archivo, conserva la maquetación.** Un servidor MCP para [Equalang](https://equalang.com), un traductor con IA que trabaja con archivos enteros: un PDF vuelve como PDF y una presentación como presentación, con las tablas, las imágenes y las fórmulas donde estaban. También traduce subtítulos e imágenes, convierte audio y vídeo en subtítulos traducidos o en una transcripción, y traduce cadenas de texto en lote. Funciona en Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code y cualquier otro cliente MCP.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Características

- **El formato que entra es el que sale**: PDF, DOCX, PPTX, XLSX, EPUB, HTML y TXT vuelven en el mismo formato, todavía editables, con tablas, imágenes, fórmulas y maquetación de página en su sitio
- **Subtítulos e imágenes**: SRT y VTT conservan sus tiempos, con la línea original encima de la traducción si se quiere; JPG, PNG, WebP y BMP vuelven con el texto de la imagen traducido
- **Audio y vídeo**: MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM y MKV se convierten en subtítulos traducidos, o en una transcripción en el idioma hablado (SRT, VTT, TXT, JSON)
- **Texto en lote**: cadenas separadas traducidas en orden, o un solo texto largo (hasta 100.000 caracteres) que Equalang corta por frases por sí mismo; más de 100 idiomas para texto, 12 para archivos
- **Archivos enteros, sin copiar y pegar**: hasta 100 MB por archivo, desde una ruta o una URL pública; nada que trocear en cuadros de texto
- **No gasta tokens**: el agente pasa una ruta o una URL y recibe rutas; un PDF de 300 páginas nunca entra en la conversación
- **El precio antes del trabajo**: `estimate_cost` responde, gratis, con lo máximo que puede costar un trabajo; los trabajos fallidos y cancelados no cuestan nada; una grabación se cobra por el habla realmente escuchada; los créditos no caducan

## Consigue una clave

Regístrate en <https://equalang.com> y crea una clave en <https://equalang.com/api-keys>. Las cuentas nuevas empiezan con créditos gratis, suficientes para pasar un documento y ver qué vuelve.

La clave va en una variable de entorno de la configuración del cliente MCP, nunca en una URL. Se muestra una sola vez; Equalang solo guarda un hash de ella. Sin clave, el servidor arranca igualmente y lista sus herramientas; una herramienta que necesita la clave responde indicando cómo conseguirla.

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
| `translate_text` | Traduce cadenas separadas, en orden, o bien un solo texto largo, que Equalang corta por frases por sí mismo. |
| `estimate_cost` | Sube un archivo sin iniciar nada; responde con lo máximo que puede costar un trabajo sobre él y con un `file_id` que inicia el trabajo sin una segunda subida. Gratis. |
| `check_job` | Retoma un trabajo y guarda sus resultados cuando ha terminado. |
| `cancel_job` | Detiene un trabajo en cola o en curso. Un trabajo cancelado no se cobra. |
| `get_credit_balance` | Los créditos de la cuenta. |
| `list_languages` | Códigos y nombres de idiomas, leídos de la API en vivo. No necesita clave. |

## Cuatro cosas que conviene saber

**Idiomas.** Los códigos tienen la forma `en`, `zh-CN`, `ja`. Este paquete no incluye ninguna lista: `list_languages` lee los códigos y los nombres de la API en vivo (menos para archivos que para texto), de modo que un idioma que Equalang añada está disponible sin actualizar. Omite el idioma de origen para que se detecte.

**Créditos.** El trabajo gasta los créditos de la cuenta, el mismo saldo que en el sitio web, así que el servidor le indica al modelo que diga el coste y obtenga la conformidad primero; la cifra sale de `estimate_cost`.

**Los trabajos tardan minutos.** Una herramienta espera a su trabajo, pero no más de lo que un cliente le permite a una llamada (50 s por defecto, `wait_seconds` hasta 240). Después, el modelo recibe el id del trabajo y la indicación de llamar a `check_job`, que guarda los resultados donde corresponde.

**Límites.** Hasta 100 MB por archivo; `translate_text` admite hasta 50 textos de 5.000 caracteres (20.000 por llamada), o un solo texto de hasta 100.000.

## Preguntas frecuentes

**¿El PDF traducido conserva su maquetación?**
Sí, de eso se trata. El texto se vuelve a colocar donde estaba, y las tablas, las imágenes y las fórmulas se quedan en su sitio; un DOCX, PPTX o XLSX sigue siendo editable.

**¿Se envía mi documento al modelo?**
No. El servidor sube el archivo a Equalang y responde con una ruta. Un artículo de 300 páginas no gasta tokens.

**¿Puede traducir el texto que hay dentro de una imagen?**
Sí. El texto de un JPG, PNG, WebP o BMP se reconoce, se traduce y se vuelve a dibujar en la imagen.

**¿Cuánto cuesta un trabajo?**
`estimate_cost` lo dice antes de que empiece nada, y es gratis. Los precios están en <https://equalang.com/pricing>.

## Cómo está construido

Tres decisiones, cada una con su razón:

1. **Un archivo nunca pasa por el modelo.** MCP no tiene tipo de archivo, y un PDF de 5 MB en el resultado de una herramienta cuesta una fortuna en contexto para no decir nada. Una herramienta recibe *dónde está un archivo* (una ruta absoluta en esta máquina, o una URL `http(s)` pública) y responde con *dónde se escribieron los resultados*. Una URL se entrega a Equalang, que la descarga por su cuenta; aquí no se descarga nada solo para volver a subirlo.
2. **Un trabajo vive dentro de una sola llamada a la herramienta.** Devolver un id de trabajo y confiar en que el modelo haga polling es un bucle que se abandona a medias. La herramienta espera, haciendo entre consulta y consulta la pausa que pida el `Retry-After` de la API e informando del progreso al cliente que lo haya pedido, pero no más de lo que un cliente le permite a una llamada (50 s por defecto, `wait_seconds` hasta 240). Después, el modelo recibe el id y la indicación de llamar a `check_job`; el servidor recuerda dónde van los resultados de ese trabajo.
3. **Las respuestas de la API se repiten, no se adivinan.** Si un fallo se puede reintentar lo dice el `retryable` de la API, no una lectura de códigos de estado. Lo que puede costar un trabajo lo dice el `quote` de la API, no una tarifa copiada en este paquete. La lista de idiomas se lee del documento OpenAPI de la API. Una petición que crea un trabajo lleva un único `Idempotency-Key` a lo largo de los reintentos propios de este cliente, de modo que una respuesta perdida no puede convertirse en un segundo trabajo cobrado.

Una respuesta se da dos veces, como texto para todos los clientes y como `structuredContent` para los que lo leen, y cada archivo escrito se nombra además como `resource_link`, que es la forma en que MCP dice «aquí hay un archivo» sin transportar sus bytes. Lo que vale para todas las herramientas (rutas de entrada, rutas de salida, preguntar antes de gastar) se dice una sola vez, en las `instructions` del servidor. Los resultados nunca sobrescriben: un nombre ya ocupado recibe ` (1)`. Las rutas relativas se rechazan: este proceso no comparte el directorio de trabajo del agente.

## Desarrollo

```bash
npm install && npm run build
node selftest.mjs                                          # protocolo, lista de herramientas, la herramienta sin clave
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # y trabajos reales (gasta créditos)
node check-api.mjs                                         # rutas, campos y lo que prometen las descripciones de las herramientas, contra el contrato en vivo de la API
```

`EQUALANG_BASE_URL` apunta el servidor a otro despliegue.

## Enlaces

- [Equalang](https://equalang.com) · [Precios](https://equalang.com/pricing) · [Documentación para desarrolladores](https://equalang.com/developers)
- API para agentes: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill): las mismas operaciones como Agent Skill
- Preguntas: <support@equalang.com>

## Licencia

[Apache-2.0](../LICENSE) © Equalang
