# Verificação — 19/11/2026

História verificada: o visitante explora páginas institucionais, serviços e artigos em português ou inglês, mantém a página ao mudar de idioma e pode iniciar atendimento nos canais oficiais.

## Evidências

- Build de produção Next.js 16.4.6: compilação e TypeScript concluídos; 48 páginas de conteúdo pré-renderizadas, além das páginas técnicas de erro.
- `static-checks.json`: 48 páginas, 1.774 ocorrências de links internos/externos, 160 imagens e 96 blocos JSON-LD verificados, sem erro de referência local, HTML lang, título, descrição, canonical ou hreflang.
- Todos os 24 caminhos em português e 24 em inglês foram abertos no navegador Chromium em largura CSS de 320 px. Cada página apresentou um H1. As duas ocorrências de overflow encontradas em português (catálogo e título de Dermocosméticos) foram corrigidas e retestadas; todas as versões inglesas passaram sem overflow.
- Homepage também medida em 320, 376, 390, 768, 1.025, 1.440 e 1.920 px, sem overflow horizontal. O navegador estava com escala de 90%; o teste usa a largura CSS efetiva lida no DOM.
- Revisão visual de homepage desktop e celular, institucional desktop, contato tablet, detalhe de serviço celular. Grades, textos longos, menu e dock receberam ajustes a partir das capturas.
- PT → EN: H1 traduzido, `html lang=en`, URL `/en/`. Navegação subsequente permanece em inglês. EN → PT em uma página interna preserva a rota; recarregamento mantém a seleção.
- Busca de soluções testada em inglês, incluindo filtro de cápsulas e limpeza. Todos os 12 serviços retornam ao limpar a busca.
- Filtro de blog: Nutrição retorna um artigo; Todos retorna três.
- Menu móvel abre, fecha após navegação e responde a Escape. Tab vai do botão ao primeiro link e Shift+Tab retorna ao botão, com foco visível.
- Acordeão de horários abre o conteúdo verificado e fecha com Enter; `aria-expanded` acompanha o estado.
- Dock móvel expande e expõe exatamente os três destinos oficiais extraídos do site original. Links externos usam `noopener noreferrer`.
- Formulário vazio em inglês: validação exibe “Please fill out this field.”, continua na página e não mostra confirmação de envio.
- Console Chromium: nenhuma mensagem `error` ou `warn` na sessão de validação.

## Limites e pendências

- As URLs externas dos canais foram conferidas contra a fonte oficial; não foi enviada mensagem comercial de teste para a empresa. O envio final é realizado pelo visitante no WhatsApp.
- Formulário de receitas e armazenamento de documentos de saúde não fazem parte desta versão; falta infraestrutura segura aprovada. A rota orienta a procurar a equipe oficial.
- Não houve auditoria automatizada completa de WCAG, teste com leitor de tela, Safari ou Firefox. Foco, nomes acessíveis, idioma, semântica, contraste principal e teclado foram revisados, sem alegar certificação WCAG.
- Core Web Vitals de produção não foram medidos. Imagens WebP, fontes locais, carregamento tardio de imagens secundárias, dimensões reservadas e páginas estáticas foram implementados, mas as metas LCP/CLS/INP exigem medição na hospedagem e dispositivos finais.
- Cabeçalhos de segurança são declarados em `public/_headers` e na prévia local. A aplicação de cada cabeçalho deve ser verificada no provedor definitivo.
- Revisão jurídica e farmacêutica, comprovações institucionais, aprovação das imagens e vídeo de referência permanecem conforme `MIGRATION-REPORT.md`.
