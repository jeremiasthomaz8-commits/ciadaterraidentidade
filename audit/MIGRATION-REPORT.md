# Cia da Terra — relatório de migração

Atualização 2: o cliente solicitou em seguida a cor #9b6eaf, as fontes Editor’s Note e Isidora Sans e a ativação do envio de documentos. O upload está agora implementado com armazenamento privado e área restrita; os pontos abaixo sobre ausência de upload descrevem a primeira versão e são substituídos pelo relatório `REVISION-2.md`.

Auditoria realizada em 19/11/2026, com navegação real no site, leitura dos arquivos públicos do aplicativo e extração estática dos conteúdos. Fonte principal: https://www.ciadaterrafarmacia.com.br/.

## Implementação entregue

23 URLs concretas do site original foram mapeadas: início, institucional, mascote, catálogo, 12 detalhes de serviços, orçamento, receita, contato, blog e três artigos. A página de privacidade é adicional. São 24 páginas em cada idioma, totalizando 48 HTMLs pré-renderizados. As rotas portuguesas existentes foram mantidas; as versões inglesas usam `/en/` e mantêm a página correspondente ao alternar o idioma.

O inventário completo em `migration-inventory.csv` e `migration-inventory.json` informa URL original, título, propósito, seções, mídias, CTAs, funções, nova rota, rota inglesa e situação. `source-content.json`, `structured-content.json` e `content/original-articles.json` preservam os textos extraídos para comparação, incluindo os trechos que não foram publicados por falta de comprovação.

## Constatações e correções

- A abertura direta de rotas do site original retorna 404; a navegação interna do aplicativo funciona. O novo site gera HTML por rota.
- `robots.txt` e `sitemap.xml` originais retornaram 404. Foram criados novos arquivos; esta versão privada de revisão está em `noindex` e `Disallow: /`.
- A rota `/servicos/shot` mostrava a página de Suplementos. Foi recuperada a descrição de Shot do catálogo e a rota passou a apresentar o serviço correto. Suplementos foi preservado em sua própria rota.
- Manipulação magistral e suplementos estavam definidos no aplicativo, embora não apresentados entre os dez cards principais. Ambos foram incluídos na navegação de soluções.
- O blog e seus três artigos estavam definidos em dados estáticos do aplicativo, sem link no menu principal. Slugs, autoria e datas foram preservados; os corpos receberam edição editorial e tradução. Os textos originais integrais continuam nos arquivos de auditoria.
- O metadado da mascote dizia Terra, enquanto a página e a imagem dizem Gaia. O nome visível Gaia foi adotado.
- O endereço visível em contato e rodapé é Rua Anchieta, 214, Vila Boaventura. O JSON-LD original usava 514 e outro domínio; foram usados os dados da página visível. O e-mail também foi extraído da página de contato.
- As redes sociais foram extraídas do código dos botões: WhatsApp `5511961205406`, Instagram `ciadaterrafarmaciamanipulacao`, Facebook `ciadaterrafarmacia`.
- Não foram encontrados depoimentos, avaliações, FAQ ou páginas legais no aplicativo auditado. Não foram inventados depoimentos, perguntas frequentes ou termos comerciais. Os acordeões usam apenas informações de atendimento existentes.
- Não há checkout na nova versão. Os formulários preparam uma conversa real no WhatsApp; o usuário confirma o envio no próprio aplicativo. O site não afirma que uma mensagem foi entregue.

## Conteúdo preservado com edição e pendências explícitas

Esta é uma implementação funcional para revisão, e não uma certificação de que todo o conteúdo original está apto à publicação farmacêutica. A migração não é uma reprodução literal integral das alegações antigas.

| Item | Tratamento nesta versão | Pendente para publicação definitiva |
| --- | --- | --- |
| História, missão, visão, valores e Gaia | Migrados e traduzidos; ortografia revisada | Aprovação editorial e visual do cliente |
| Serviços e características | Todas as rotas migradas; descrições reorganizadas; formas farmacêuticas preservadas | Revisão farmacêutica de composição, disponibilidade e alegações |
| Artigos | Temas, exemplos e estrutura informativa preservados com revisão; originais completos arquivados | Aprovação farmacêutica da edição e tradução |
| Alegações de eficácia, absorção, resultados e segurança | Garantias e comparações sem suporte foram substituídas por linguagem informativa e avaliação individual | Aprovar o texto; apresentar evidência se desejar restaurar alegações específicas |
| Selos ANVISA, ISO 9001 e certificações | Presentes no arquivo de auditoria, sem reprodução como selos verificados no site | Documentação válida e aprovação para uso |
| CRF e identificação profissional | Transcritos do rodapé original, sem correção inventada | Cliente deve confirmar `4545-2/SP`, nome, CNPJ e identificação exigida |
| Tempo de atuação | “Mais de 20 anos” aparecia nos metadados e não foi transformado em indicador visual | Confirmação da data de início |
| Prazo e entrega | Prazo de orçamento de até 24 horas e entrega nacional preservados do conteúdo atual, com orientação para confirmar condições | Validação operacional dos prazos e cobertura |
| Receita | Rota, contexto e orientação preservados; sem upload, CPF/CNPJ ou armazenamento de dados de saúde | Definir e aprovar backend, acesso, retenção, criptografia, política e integração segura |
| Formulário comercial | Validação e abertura do canal oficial; sem coleta de receita | Validar o atendimento final com a equipe usando dados autorizados |
| Política de privacidade | Novo aviso descreve o comportamento efetivo do site; sem trackers de marketing | Revisão jurídica e identificação do controlador/encarregado conforme aplicável |
| Vídeo de referência | Não recebido; desenho segue a descrição escrita do briefing | Fornecer o vídeo para confronto visual |
| Fotografias | SVG e Gaia oficiais preservados; três composições geradas identificadas como conceituais; foto de cápsulas do site atual reutilizada | Aprovar imagens e confirmar direitos de reutilização das mídias existentes |
| Hospedagem e SEO definitivo | Nova versão privada, domínio separado, canonical e hreflang coerentes | Aprovar lançamento, configurar domínio definitivo e liberar indexação |

As fotos externas apresentadas como laboratório/atendimento no site antigo pertencem a outros sites de farmácias; não foram reutilizadas como documentação da Cia da Terra. As três URLs Pexels dos artigos antigos retornaram imagens inadequadas aos temas (profissional de saúde, interrogação e rua); foram substituídas por composições conceituais, sem representar instalações, funcionários ou produtos reais.

## Referências de apoio à revisão editorial

As alterações removem a ideia de que “natural” garante segurança e de que suplementos substituem alimentação ou garantem resultados. Foram consultadas fontes primárias:

- Anvisa, orientações atualizadas sobre uso de fitoterápicos: https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2026/anvisa-publica-cartilha-e-folder-atualizados-sobre-o-uso-de-fitoterapicos
- Ministério da Saúde, plantas medicinais e fitoterápicos: https://www.gov.br/saude/pt-br/composicao/sectics/plantas-medicinais-e-fitoterapicos
- Anvisa, perguntas frequentes sobre suplementos: https://www.gov.br/anvisa/pt-br/assuntos/alimentos/suplementos-alimentares/perguntas-frequentes
- Anvisa, leitura de rótulos e alegações: https://www.gov.br/anvisa/pt-br/assuntos/alimentos/suplementos-alimentares/lembre-se-de-ler-o-rotulo-com-atencao

Essa consulta não substitui a aprovação jurídica ou farmacêutica exigida no briefing. Não houve alegação de aprovação pela Anvisa nem validação documental das certificações da empresa.

## Redirecionamentos e operação

Não há troca de slug que exija redirecionamento entre páginas migradas. A versão estática usa barra final; a hospedagem deve normalizar a URL sem barra com redirecionamento permanente. A prévia local faz 308. As rotas genéricas `:slug` do aplicativo original foram resolvidas para os registros concretos encontrados; URLs desconhecidas recebem 404. O domínio e a infraestrutura originais não foram alterados.

## Verificação

Resultados automatizados ficam em `static-checks.json`; observações de navegador e limites em `QA.md`. O build de produção e a verificação de tipos foram executados. A revisão local verifica HTML, metadados, imagens, links e dados estruturados. Publicação privada é adequada à revisão; o cumprimento integral dos critérios de produção ainda depende dos itens acima.
