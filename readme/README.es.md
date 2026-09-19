# Servidor MCP de Equalang

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · **Español** · [Français](README.fr.md) · [Deutsch](README.de.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

Dale [Equalang](https://equalang.com) a un agente: traducir archivos enteros conservando su maquetación, transcribir grabaciones, traducir cadenas de texto.

- **Documentos** - PDF, DOCX, PPTX, XLSX, EPUB, HTML, TXT - vuelven en el mismo formato, con tablas, imágenes y fórmulas en su sitio.
- **Subtítulos** (SRT, VTT) e **imágenes** (JPG, PNG, WebP, BMP).
- **Audio y vídeo** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM, MKV - vuelven como subtítulos traducidos, o como transcripción en el idioma hablado.

El agente pasa una ruta o una URL y recibe rutas. El contenido de los archivos nunca entra en la conversación.

## Instalación

Crea una clave en <https://equalang.com/api-keys> y luego añade el servidor a tu cliente:

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

Requiere Node 18 o posterior. Sin clave, el servidor arranca igualmente y lista sus herramientas; una herramienta que necesita la clave responde indicando cómo conseguirla.

## Herramientas

| Herramienta | Qué hace |
| --- | --- |
| `translate_file` | Traduce un archivo (ruta o URL pública) a otro idioma y guarda el resultado junto a él. |
| `transcribe_recording` | Pone por escrito lo que dice un archivo de audio o vídeo, como texto con marcas de tiempo (SRT, VTT, TXT, JSON). |
| `translate_text` | Traduce hasta 50 textos planos cortos, en orden. |
| `estimate_cost` | Sube un archivo sin iniciar nada; responde con lo máximo que puede costar un trabajo sobre él y con un `file_id` que inicia el trabajo sin una segunda subida. Gratis. |
| `check_job` | Retoma un trabajo y guarda sus resultados cuando ha terminado. |
| `cancel_job` | Detiene un trabajo en cola o en curso. Un trabajo cancelado no se cobra. |
| `get_credit_balance` | Los créditos de la cuenta. |
| `list_languages` | Códigos y nombres de idiomas, leídos de la API en vivo. No necesita clave. |

**Créditos.** El trabajo gasta los créditos de la cuenta - el mismo saldo que en el sitio web -, así que el servidor le indica al modelo que diga el coste y obtenga la conformidad primero; la cifra sale de `estimate_cost`. Una grabación se cobra por el habla realmente escuchada, por lo que suele costar menos que la estimación.

**Idiomas.** Los códigos tienen la forma `en`, `zh-CN`, `ja`. Este paquete no incluye ninguna lista: `list_languages` lee los códigos y los nombres de la API en vivo (menos para archivos que para texto), de modo que un idioma que Equalang añada está disponible sin actualizar. Omite el idioma de origen para que se detecte.

**Formatos y límites.** Los formatos anteriores, hasta 100 MB por archivo; `translate_text` admite hasta 50 textos de 5,000 caracteres, 20,000 caracteres por llamada.

## Cómo está construido

Tres decisiones, cada una con su razón:

1. **Un archivo nunca pasa por el modelo.** MCP no tiene tipo de archivo, y un PDF de 5 MB en el resultado de una herramienta cuesta una fortuna en contexto para no decir nada. Una herramienta recibe *dónde está un archivo* - una ruta absoluta en esta máquina, o una URL `http(s)` pública - y responde con *dónde se escribieron los resultados*. Una URL se entrega a Equalang, que la descarga por su cuenta; aquí no se descarga nada solo para volver a subirlo.
2. **Un trabajo vive dentro de una sola llamada a la herramienta.** Devolver un id de trabajo y confiar en que el modelo haga polling es un bucle que se abandona a medias. La herramienta espera - haciendo entre consulta y consulta la pausa que pida el `Retry-After` de la API, e informando del progreso al cliente que lo haya pedido - pero no más de lo que un cliente le permite a una llamada (50 s por defecto, `wait_seconds` hasta 240). Después, el modelo recibe el id y la indicación de llamar a `check_job`; el servidor recuerda dónde van los resultados de ese trabajo.
3. **Las respuestas de la API se repiten, no se adivinan.** Si un fallo se puede reintentar lo dice el `retryable` de la API, no una lectura de códigos de estado. Lo que puede costar un trabajo lo dice el `quote` de la API, no una tarifa copiada en este paquete. La lista de idiomas se lee del documento OpenAPI de la API. Una petición que crea un trabajo lleva un único `Idempotency-Key` a lo largo de los reintentos propios de este cliente, de modo que una respuesta perdida no puede convertirse en un segundo trabajo cobrado.

Una respuesta se da dos veces - como texto para todos los clientes y como `structuredContent` para los que lo leen - y cada archivo escrito se nombra además como `resource_link`, que es la forma en que MCP dice "aquí hay un archivo" sin transportar sus bytes. Lo que vale para todas las herramientas (rutas de entrada, rutas de salida, preguntar antes de gastar) se dice una sola vez, en las `instructions` del servidor. Los resultados nunca sobrescriben: un nombre ya ocupado recibe ` (1)`. Las rutas relativas se rechazan - este proceso no comparte el directorio de trabajo del agente.

## Desarrollo

```bash
npm install && npm run build
node selftest.mjs                                          # protocolo, lista de herramientas, la herramienta sin clave
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # y trabajos reales (gasta créditos)
node check-api.mjs                                         # rutas, campos y lo que prometen las descripciones de las herramientas, contra el contrato en vivo de la API
```

`EQUALANG_BASE_URL` apunta el servidor a otro despliegue. La API en sí: <https://equalang.com/llms.txt>.

Apache-2.0.
