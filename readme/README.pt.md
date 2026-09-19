# Servidor MCP do Equalang

[English](../README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · **Português** · [Italiano](README.it.md) · [Русский](README.ru.md) · [Polski](README.pl.md) · [Türkçe](README.tr.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [ไทย](README.th.md) · [हिन्दी](README.hi.md) · [العربية](README.ar.md)

Dê o [Equalang](https://equalang.com) a um agente: traduzir arquivos inteiros mantendo o layout, transcrever gravações, traduzir strings.

- **Documentos** - PDF, DOCX, PPTX, XLSX, EPUB, HTML, TXT - voltam no mesmo formato, com tabelas, imagens e fórmulas no lugar.
- **Legendas** (SRT, VTT) e **imagens** (JPG, PNG, WebP, BMP).
- **Áudio e vídeo** - MP3, M4A, WAV, FLAC, OGG, AAC, Opus, MP4, MOV, WebM, MKV - voltam como legendas traduzidas ou como transcrição no idioma falado.

O agente passa um caminho ou uma URL e recebe caminhos de volta. O conteúdo dos arquivos nunca entra na conversa.

## Instalação

Crie uma chave em <https://equalang.com/api-keys> e adicione o servidor ao seu cliente:

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

Requer Node 18 ou superior. Sem chave, o servidor ainda inicia e lista suas ferramentas; uma ferramenta que precisa da chave responde explicando como obtê-la.

## Ferramentas

| Ferramenta | O que faz |
| --- | --- |
| `translate_file` | Traduz um arquivo (caminho ou URL pública) para outro idioma e salva o resultado ao lado dele. |
| `transcribe_recording` | Transcreve o que é dito em um arquivo de áudio ou vídeo, como texto com marcação de tempo (SRT, VTT, TXT, JSON). |
| `translate_text` | Traduz strings separadas, em ordem - ou um único texto longo, que o próprio Equalang corta por frases. |
| `estimate_cost` | Envia um arquivo sem iniciar nada; responde com o máximo que um job sobre ele pode custar e um `file_id` que inicia o job sem um segundo envio. Gratuito. |
| `check_job` | Retoma um job e salva os resultados quando ele termina. |
| `cancel_job` | Interrompe um job na fila ou em execução. Um job cancelado não é cobrado. |
| `get_credit_balance` | Os créditos da conta. |
| `list_languages` | Códigos e nomes de idiomas, lidos da API em produção. Não precisa de chave. |

**Créditos.** O trabalho consome os créditos da conta - o mesmo saldo do site - por isso o servidor instrui o modelo a informar o custo e obter a concordância antes; o número vem de `estimate_cost`. Uma gravação é cobrada pela fala efetivamente ouvida, então costuma custar menos que a estimativa.

**Idiomas.** Os códigos têm o formato `en`, `zh-CN`, `ja`. Não há lista embutida neste pacote: `list_languages` lê os códigos e nomes da API em produção (menos para arquivos do que para texto), então um idioma que o Equalang adicionar fica disponível sem atualização. Omita o idioma de origem para que ele seja detectado.

**Formatos e limites.** Os formatos acima, até 100 MB por arquivo; `translate_text` aceita até 50 textos de 5,000 caracteres (20,000 por chamada), ou um único texto de até 100,000.

## Como foi construído

Três decisões, cada uma com seu motivo:

1. **Um arquivo nunca passa pelo modelo.** O MCP não tem tipo de arquivo, e um PDF de 5 MB no resultado de uma ferramenta custa uma fortuna em contexto para não dizer nada. Uma ferramenta recebe *onde o arquivo está* - um caminho absoluto nesta máquina ou uma URL `http(s)` pública - e responde com *onde os resultados foram gravados*. Uma URL é entregue ao Equalang, que a busca por conta própria; nada é baixado aqui só para ser enviado de novo.
2. **Um job vive dentro de uma única chamada de ferramenta.** Devolver um id de job e confiar que o modelo fará polling é um loop que acaba abandonado no meio do caminho. A ferramenta espera - pausando entre as consultas pelo tempo que o `Retry-After` da API pedir, e reportando o progresso ao cliente que o solicitou - mas não além do que o cliente permite a uma chamada (50 s por padrão, `wait_seconds` até 240). Depois disso, o modelo recebe o id e a orientação de chamar `check_job`; o servidor lembra onde os resultados daquele job devem ficar.
3. **As respostas da API são repetidas, não adivinhadas.** Se uma falha pode ser tentada de novo é o `retryable` da API, não uma interpretação de códigos de status. Quanto um job pode custar é o `quote` da API, não uma tarifa copiada para este pacote. A lista de idiomas é lida do documento OpenAPI da API. Uma requisição que cria um job leva uma única `Idempotency-Key` em todas as novas tentativas deste cliente, de modo que uma resposta perdida não vira um segundo job cobrado.

Uma resposta é dita duas vezes - como texto para todos os clientes e como `structuredContent` para os que o leem - e cada arquivo gravado também é indicado como um `resource_link`, que é como o MCP diz "aqui está um arquivo" sem carregar seus bytes. O que vale para todas as ferramentas (caminhos na entrada, caminhos na saída, perguntar antes de gastar) é dito uma vez só, nas `instructions` do servidor. Os resultados nunca sobrescrevem: um nome já usado recebe ` (1)`. Caminhos relativos são recusados - este processo não compartilha o diretório de trabalho do agente.

## Desenvolvimento

```bash
npm install && npm run build
node selftest.mjs                                          # protocolo, lista de ferramentas, a ferramenta sem chave
EQUALANG_API_KEY=el_... node selftest.mjs file.txt talk.mp3  # e jobs reais (consome créditos)
node check-api.mjs                                         # caminhos, campos e o que as descrições das ferramentas prometem, contra o contrato atual da API
```

`EQUALANG_BASE_URL` aponta o servidor para outra implantação. A API em si: <https://equalang.com/llms.txt>.

Apache-2.0.
