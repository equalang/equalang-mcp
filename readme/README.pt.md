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
- **Texto em lote**: strings separadas traduzidas em ordem, ou um único texto longo (até 100.000 caracteres) que o próprio Equalang corta por frases; mais de 100 idiomas para texto, 12 para arquivos
- **Arquivos inteiros, sem copiar e colar**: até 100 MB por arquivo, a partir de um caminho ou de uma URL pública; nada para dividir em caixas de texto
- **Não gasta tokens**: o agente passa um caminho ou uma URL e recebe caminhos de volta; um PDF de 300 páginas nunca entra na conversa
- **O preço antes do job**: `estimate_cost` responde, de graça, com o máximo que um job pode custar; jobs com falha ou cancelados não custam nada; uma gravação é cobrada pela fala efetivamente ouvida; os créditos nunca expiram

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

## Quatro coisas que vale a pena saber

**Idiomas.** Os códigos têm o formato `en`, `zh-CN`, `ja`. Não há lista embutida neste pacote: `list_languages` lê os códigos e nomes da API em produção (menos para arquivos do que para texto), então um idioma que o Equalang adicionar fica disponível sem atualização. Omita o idioma de origem para que ele seja detectado.

**Créditos.** O trabalho consome os créditos da conta, o mesmo saldo do site, por isso o servidor instrui o modelo a informar o custo e obter a concordância antes; o número vem de `estimate_cost`.

**Jobs levam minutos.** Uma ferramenta espera pelo seu job, mas não além do que o cliente permite a uma chamada (50 s por padrão, `wait_seconds` até 240). Depois disso, o modelo recebe o id do job e a orientação de chamar `check_job`, que salva os resultados onde eles devem ficar.

**Limites.** Até 100 MB por arquivo; `translate_text` aceita até 50 textos de 5.000 caracteres (20.000 por chamada), ou um único texto de até 100.000.

## Perguntas frequentes

**O PDF traduzido mantém o layout?**
Sim, essa é a ideia. O texto é recolocado onde estava, e tabelas, imagens e fórmulas ficam no lugar; um DOCX, PPTX ou XLSX continua editável.

**Meu documento é enviado ao modelo?**
Não. O servidor envia o arquivo ao Equalang e responde com um caminho. Um artigo de 300 páginas não gasta tokens.

**Ele consegue traduzir o texto dentro de uma imagem?**
Sim. O texto de um JPG, PNG, WebP ou BMP é reconhecido, traduzido e redesenhado na imagem.

**Quanto custa um job?**
`estimate_cost` informa antes de qualquer coisa começar, e é gratuito. Os preços estão em <https://equalang.com/pricing>.

## Como foi construído

Três decisões, cada uma com seu motivo:

1. **Um arquivo nunca passa pelo modelo.** O MCP não tem tipo de arquivo, e um PDF de 5 MB no resultado de uma ferramenta custa uma fortuna em contexto para não dizer nada. Uma ferramenta recebe *onde o arquivo está* (um caminho absoluto nesta máquina ou uma URL `http(s)` pública) e responde com *onde os resultados foram gravados*. Uma URL é entregue ao Equalang, que a busca por conta própria; nada é baixado aqui só para ser enviado de novo.
2. **Um job vive dentro de uma única chamada de ferramenta.** Devolver um id de job e confiar que o modelo fará polling é um loop que acaba abandonado no meio do caminho. A ferramenta espera, pausando entre as consultas pelo tempo que o `Retry-After` da API pedir e reportando o progresso ao cliente que o solicitou, mas não além do que o cliente permite a uma chamada (50 s por padrão, `wait_seconds` até 240). Depois disso, o modelo recebe o id e a orientação de chamar `check_job`; o servidor lembra onde os resultados daquele job devem ficar.
3. **As respostas da API são repetidas, não adivinhadas.** Se uma falha pode ser tentada de novo é o `retryable` da API, não uma interpretação de códigos de status. Quanto um job pode custar é o `quote` da API, não uma tarifa copiada para este pacote. A lista de idiomas é lida do documento OpenAPI da API. Uma requisição que cria um job leva uma única `Idempotency-Key` em todas as novas tentativas deste cliente, de modo que uma resposta perdida não vira um segundo job cobrado.

Uma resposta é dita duas vezes, como texto para todos os clientes e como `structuredContent` para os que o leem, e cada arquivo gravado também é indicado como um `resource_link`, que é como o MCP diz "aqui está um arquivo" sem carregar seus bytes. O que vale para todas as ferramentas (caminhos na entrada, caminhos na saída, perguntar antes de gastar) é dito uma vez só, nas `instructions` do servidor. Os resultados nunca sobrescrevem: um nome já usado recebe ` (1)`. Caminhos relativos são recusados: este processo não compartilha o diretório de trabalho do agente.

## Desenvolvimento

```bash
npm install && npm run build
node selftest.mjs                                          # protocolo, lista de ferramentas, a ferramenta sem chave
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # e jobs reais (consome créditos)
node check-api.mjs                                         # caminhos, campos e o que as descrições das ferramentas prometem, contra o contrato atual da API
```

`EQUALANG_BASE_URL` aponta o servidor para outra implantação.

## Links

- [Equalang](https://equalang.com) · [Preços](https://equalang.com/pricing) · [Documentação para desenvolvedores](https://equalang.com/developers)
- API para agentes: [llms.txt](https://equalang.com/llms.txt) · [llms-full.txt](https://equalang.com/llms-full.txt) · [OpenAPI](https://equalang.com/api/backend/v1/openapi.json)
- [equalang-skill](https://github.com/equalang/equalang-skill): as mesmas operações como Agent Skill
- Dúvidas: <support@equalang.com>

## Licença

[Apache-2.0](../LICENSE) © Equalang
