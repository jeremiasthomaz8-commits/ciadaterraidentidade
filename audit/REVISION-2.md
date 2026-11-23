# Ajustes solicitados — versão 2

- Cor principal alterada para `#9b6eaf`. Em ajuste posterior solicitado pelo cliente, todos os textos sobre esse fundo passaram a branco, incluindo cabeçalho, navegação, rodapé, banner e botões roxos.
- Editor’s Note nos títulos e Isidora Sans nos textos e controles, usando os arquivos locais OTF fornecidos pelo cliente. Fontes servidas pelo próprio site.
- Botões e links de ação redesenhados com bordas arredondadas, melhor preenchimento e estados de foco/hover.
- Categorias com setas nas duas laterais, suporte a teclado/toque e barra de rolagem oculta.
- Chamadas decorativas pequenas e legendas conceituais visíveis removidas; a identificação das imagens continua nos textos alternativos e na documentação.
- Ícone de WhatsApp substituído pelo vetor do Simple Icons; missão, visão e valores ganharam ícones específicos.

## Envio de arquivos

A implementação antiga lia o documento no navegador, mas apenas o nome do arquivo entrava na mensagem de WhatsApp. Não havia chamada de upload nessa função. A versão 2 recebe os bytes dos documentos e as observações na mesma solicitação, valida o conteúdo e confirma o armazenamento antes de mostrar o protocolo.

O backend usa um bucket R2 privado. São aceitos até três arquivos PDF/JPG/PNG, de até 10 MB cada e 20 MB no total. Nomes de arquivo não são usados como chaves de armazenamento. Há validação de formato, assinatura binária, campos, origem, token assinado, consentimento e limitação de envios. Não há links públicos de documentos, nem envio automático de mensagens a terceiros.

`/atendimentos/` apresenta os dados e permite baixar os arquivos. A autorização é conferida no servidor a cada listagem e download, usando os cabeçalhos de identidade verificados pelo Sites e a lista de e-mails em `RECEIPTS_ADMIN_EMAILS`. O proprietário do site é o único usuário autorizado inicialmente. Os segredos ficam no ambiente da hospedagem, sem valores no código.

O acesso expira depois de 30 dias. Consultas e rotinas de limpeza excluem registros expirados; a equipe também pode excluir um registro antes do vencimento. A revisão jurídica do aviso e da política de retenção continua necessária para a operação definitiva da farmácia.

## Verificação

`intake-checks.json` registra os testes de armazenamento e download dos bytes originais, observações vinculadas, formatos/tamanhos, consentimento, origem/token, acesso administrativo, remoção e limite de requisições. O teste no navegador selecionou um PDF fictício, enviou o formulário, recebeu protocolo e confirmou arquivo e observações na área restrita local. Não foram usados dados de pacientes.

Foram conferidos no navegador o carregamento das duas fontes, o RGB `155,110,175`, o movimento das categorias por botão, os três ícones institucionais e as páginas principais em 320 px sem overflow horizontal. As 48 páginas de conteúdo continuam com links e metadados verificados; duas páginas adicionais são a área restrita em PT/EN.

Referências técnicas: [Cloudflare R2 Workers API](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/), [Simple Icons WhatsApp SVG](https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/whatsapp.svg). Autenticação e bindings seguem as instruções do plugin Sites.
