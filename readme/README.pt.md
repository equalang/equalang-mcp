# equalang-mcp

[![npm](https://img.shields.io/npm/v/@equalang/mcp.svg)](https://www.npmjs.com/package/@equalang/mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../LICENSE)
[![MCP](https://img.shields.io/badge/Model_Context_Protocol-stdio-000000.svg)](https://modelcontextprotocol.io)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933.svg)](https://nodejs.org)

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · **Português** · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

[Site](https://equalang.com) · [Preços](https://equalang.com/pricing) · [Documentação para desenvolvedores](https://equalang.com/developers) · [Chaves de API](https://equalang.com/api-keys)

> **Palavras-chave:** traduzir pdf, tradutor de pdf, traduzir pdf mantendo a formatação, tradutor de documentos, traduzir documento word, traduzir docx, traduzir powerpoint, traduzir excel, traduzir epub, traduzir legendas, tradutor de legendas srt, traduzir imagem, traduzir texto de imagem, traduzir vídeo, transcrever áudio em texto, tradutor com ia, mcp server, servidor mcp, model context protocol, claude mcp, cursor mcp, translation api

**Traduza o arquivo, mantenha o layout.** Um servidor MCP para o [Equalang](https://equalang.com), um tradutor com IA que trabalha com arquivos inteiros: um PDF volta como PDF, uma apresentação como apresentação, com tabelas, imagens e fórmulas onde estavam. Também traduz legendas e imagens, transforma áudio e vídeo em legendas traduzidas ou em transcrição, e traduz strings em lote. Funciona no Claude Code, Claude Desktop, Codex, Cursor, Windsurf, Cline, VS Code e em qualquer outro cliente MCP.

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

## Recursos

- **O formato que entra é o que sai**: PDF, DOCX, PPTX, XLSX, EPUB, HTML e TXT voltam no mesmo formato, ainda editáveis, com tabelas, imagens, fórmulas e layout de página no lugar
- **Legendas e imagens**: SRT e VTT mantêm a sincronização, opcionalmente com a linha original acima da tradução; JPG, PNG, WebP e BMP voltam com o texto da imagem traduzido
- **Áudio e vídeo**: MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM e MKV viram legendas traduzidas ou uma transcrição no idioma falado (SRT, VTT, TXT, JSON)
- **Texto em lote**: strings separadas traduzidas em ordem, ou um único texto longo (até 100.000 caracteres) que o próprio Equalang corta por frases
- **Mais de 100 idiomas**: mais de 100 para texto e 12 para arquivos, com o idioma de origem detectado quando você o omite

## Obtenha uma chave

Crie uma conta em <https://equalang.com> e gere uma chave em <https://equalang.com/api-keys>. Contas novas começam com créditos gratuitos, o suficiente para passar um documento e ver o que volta.

A chave vai em uma variável de ambiente na configuração do cliente MCP, nunca em uma URL. Ela é exibida uma única vez; o Equalang guarda apenas um hash dela. Sem chave, o servidor ainda inicia e lista suas ferramentas; uma ferramenta que precisa da chave responde explicando como obtê-la.

## Instalação

Requer Node 18 ou superior.

<details open>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add equalang -s user -e EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```

`-s user` o deixa disponível em todos os projetos; o escopo padrão, `local`, carrega o servidor apenas no diretório em que o comando foi executado.
</details>

<details>
<summary><b>OpenAI Codex</b></summary>

```bash
codex mcp add equalang --env EQUALANG_API_KEY=el_your_key -- npx -y @equalang/mcp
```
</details>

<details>
<summary><b>Claude Desktop, Cursor, Windsurf, Cline e outros clientes configurados por JSON</b></summary>

Adicione isto à configuração MCP do cliente (`claude_desktop_config.json`, `~/.cursor/mcp.json`, `~/.codeium/windsurf/mcp_config.json` ou o arquivo que o seu cliente documenta):

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

Prefere uma skill? O [equalang-skill](https://github.com/equalang/equalang-skill) oferece as mesmas operações como Agent Skill: um único script Python, nada para instalar.

## Ferramentas

| Ferramenta | O que faz |
| --- | --- |
| `translate_file` | Traduz um arquivo (caminho ou URL pública) para outro idioma e salva o resultado ao lado dele. |
| `transcribe_recording` | Transcreve o que é dito em um arquivo de áudio ou vídeo, como texto com marcação de tempo (SRT, VTT, TXT, JSON). |
| `translate_text` | Traduz strings separadas, em ordem, ou então um único texto longo, que o próprio Equalang corta por frases. |
| `estimate_cost` | Envia um arquivo sem iniciar nada; responde com o máximo que um job sobre ele pode custar e um `file_id` que inicia o job sem um segundo envio. Gratuito. |
| `check_job` | Retoma um job e salva os resultados quando ele termina. |
| `cancel_job` | Interrompe um job na fila ou em execução. Um job cancelado não é cobrado. |
| `get_credit_balance` | Os créditos da conta. |
| `list_languages` | Códigos e nomes de idiomas, lidos da API em produção. Não precisa de chave. |

Os códigos de idioma têm o formato `en`, `zh-CN`, `ja`; `list_languages` os lê da API em produção, então um idioma que o Equalang adicionar fica disponível sem atualização. Um job leva minutos: uma ferramenta espera até `wait_seconds` (50 s por padrão, 240 no máximo) e então devolve o id do job para `check_job`.

## Perguntas frequentes

**O PDF traduzido mantém o layout?**
Sim, essa é a ideia. O texto é recolocado onde estava, e tabelas, imagens e fórmulas ficam no lugar; um DOCX, PPTX ou XLSX continua editável.

**Meu documento é enviado ao modelo?**
Não. O servidor envia o arquivo ao Equalang e responde com um caminho. Um artigo de 300 páginas não gasta tokens.

**Ele consegue traduzir o texto dentro de uma imagem?**
Sim. O texto de um JPG, PNG, WebP ou BMP é reconhecido, traduzido e redesenhado na imagem.

**Quanto custa um job?**
`estimate_cost` informa antes de qualquer coisa começar, e é gratuito. Os preços estão em <https://equalang.com/pricing>.

## Links

- [Equalang](https://equalang.com) · [Preços](https://equalang.com/pricing) · [Documentação para desenvolvedores](https://equalang.com/developers)
- API para agentes: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill): as mesmas operações como Agent Skill
- Dúvidas: <support@equalang.com>

## Licença

[Apache-2.0](../LICENSE) © Equalang
