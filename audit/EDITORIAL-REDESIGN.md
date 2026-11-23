# Redesign editorial — referência Essentia Pharma

## Baseline

50 páginas PT/EN: 48 páginas de conteúdo e duas áreas restritas. Onze templates compartilham navegação, rodapé e dock social. Doze serviços, três artigos, busca, filtros, informações de atendimento, formulário comercial, orçamento e envio real de documentos. Não existem depoimentos autorizados, feed de Instagram, newsletter ou vídeo institucional aprovado.

O snapshot anterior ao trabalho fica no estado local ignorado `.sites/editorial-baseline.json`. A comparação confere rotas, metadados, JSON-LD, parágrafos, destinos e contratos dos formulários. Os módulos de conteúdo, upload e backend são comparados por SHA-256.

## Referência observada

Inspeção do site renderizado em 19/11/2026: https://essentia.com.br/ e a página `/nosso-dna/`, em desktop e celular. A referência combina cabeçalho institucional com submenus, hero fotográfico amplo, categorias circulares com setas, narrativas assimétricas, um grande painel interativo de diferenciais e separação clara entre conteúdo editorial e contato. O celular reorganiza navegação e conteúdo em uma coluna. Capturas de pesquisa ficam fora do código, na pasta de visualizações da conversa.

Não foram copiados textos, fotografias, marcas, alegações nem serviços da referência.

## Direção e tokens

- Branco `#ffffff` como base; superfície fria `#f7f6f8`; roxo aprovado `#9b6eaf`; texto `#302735`; secundário `#655c6c`; dourado `#e5b30f` restrito à identidade e detalhes.
- Editor’s Note nos títulos, em peso regular, com escala fluida e linhas controladas. Isidora Sans em corpo, navegação e controles. Corpo de 16–18 px. Textos sobre roxo continuam brancos conforme aprovação anterior.
- Container de 1320 px, grid de 12 colunas equivalente, margens fluidas e seções de 64–120 px. Imagens amplas com recortes distintos por função; raios discretos, sem coleções de cartões iguais.
- Botões sólidos e de contorno, sem sombras decorativas, controles com foco visível e animações acionadas pela pessoa.

## Composição planejada e revisão

```text
Cabeçalho: marca | institucional | soluções | conteúdos | contato | idioma | orçamento
Hero: título editorial aberto + fotografia ampla de botânica/manipulação
Categorias: título + coleção navegável de formas, setas nas laterais
Institucional: texto à esquerda / imagem à direita + selo com apenas símbolo
Diferenciais: imagem + lista interativa com os textos já aprovados
Soluções: uma apresentação principal e duas composições secundárias
Receita: chamada ampla com envio real preservado
Conexão: identidade Cia da Terra + canais oficiais, sem feed fictício
Editorial: artigos com imagens grandes / informações de atendimento em acordeão
Contato e rodapé: hierarquia clara, serviços, dados comerciais e legais completos
```

A primeira alternativa manteria um hero arredondado em duas colunas e três cartões iguais. Foi descartada por repetir a composição anterior. A solução adota hero sem moldura, novo ritmo editorial, hierarquia de serviços assimétrica e diferenciais interativos. A fotografia continua identificada como conceitual quando aplicável; não representa laboratório ou equipe reais.

As páginas internas recebem o mesmo sistema de títulos, imagens, espaçamentos, leitura, formulários e navegação. Backend R2, consentimento, permissões, retenção e APIs permanecem intactos.

## Validação concluída

- Build de produção com 50 páginas, sitemap com 48 URLs públicas e Worker de 2,65 MiB comprimidos.
- Comparação baseline/final: todas as 50 rotas, parágrafos anteriores, destinos principais, títulos, descrições, JSON-LD e contratos de campos preservados. Sete módulos de conteúdo, upload, área restrita e backend mantêm o SHA-256 anterior.
- Verificação de 2.840 links, 168 imagens e 96 blocos JSON-LD sem erros.
- Navegador: 50 páginas em 320 px, 50 páginas em 1440 px e 12 apresentações em tablet de 768 px sem overflow horizontal. Formulários e home foram reconferidos depois de consolidar a ordem de importação dos estilos.
- Busca sem acento, estado vazio, filtro de artigos, persistência de idioma e troca para a rota equivalente funcionando. Menus funcionam por clique, teclado, Escape e no drawer mobile. Carrossel conserva setas, toque e teclado; todos os 12 serviços estão disponíveis.
- Acordeão de diferenciais usa exclusivamente os textos institucionais existentes. Não foram acrescentados depoimentos, certificações, vídeos, tecnologia de laboratório ou feed social fictícios.
- Formulário em inglês enviou um PDF fictício com observações, recebeu protocolo e apresentou arquivo e notas na área restrita local. O mock é apenas de desenvolvimento e fica em memória; nenhum dado de paciente foi usado. Testes do backend continuam cobrindo persistência e recuperação dos bytes, autorização, origem, token, consentimento, limites e exclusão.
- Console do navegador sem erros ou avisos. Movimento reduzido mantém os controles funcionais; fontes e imagens permanecem locais. Nenhuma dependência nova foi adicionada.

Evidências: `editorial-regression.json`, `editorial-browser-checks.json`, `static-checks.json`, `intake-checks.json`, `editorial-desktop.jpg` e `editorial-mobile.jpg` nesta pasta.

## Ajuste posterior: seção de envio de receitas

A composição de três colunas foi substituída por uma linha principal de texto e ação, seguida de uma faixa de atendimento e entrega. O símbolo decorativo grande foi retirado; ícones pequenos e consistentes acompanham o botão e as duas informações. No celular, o botão ocupa a largura disponível e as informações permanecem visíveis abaixo. Revisão em 1440 px e 320 px, PT/EN, sem overflow; o CTA abre o formulário real em sua rota localizada. Conteúdo e backend preservados pela comparação de regressão. Captura: `banner-reordered-desktop.jpg`.
