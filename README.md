# Cia da Terra — site e guia de marca

Implementação em Next.js App Router, React e TypeScript, com conteúdo pt-BR/en, `next-intl`, páginas HTML pré-renderizadas e CSS responsivo. O SVG oficial é utilizado sem redesenho. A publicação de revisão é privada e usa `noindex`.

```sh
npm ci
npm run build
npm run preview
```

Prévia completa: `http://127.0.0.1:3000`. O servidor local usa identidade e armazenamento de desenvolvimento, mantidos apenas na memória do processo. Para validar o formulário de documentos, use `npm run preview`; `npm run dev` atende somente o frontend Next.js.

O [Guia de Marca](http://127.0.0.1:3000/guia-da-marca/) reúne os fundamentos da marca, a identidade visual e as aplicações em telas, redes sociais e materiais impressos. A página fica em `app/guia-da-marca/`, com os logotipos, as fontes adicionais e os mockups em `public/brand-guide/`.

## Editar

- `content/site.ts`: dados comerciais verificados no site atual, traduções da interface e 12 soluções.
- `content/articles.ts`: versões editoriais dos três artigos, traduzidas e com alegações revistas.
- `content/original-articles.json`: cópia integral dos artigos extraídos do aplicativo original, para comparação.
- `components/`: cabeçalho, rodapé, navegação, dock social, páginas e interações.
- `app/globals.css`: tokens, tipografia, layouts, foco, movimento reduzido e breakpoints.
- `app/brand-update.css`: cor #9b6eaf, botões, carrossel e fontes Editor’s Note / Isidora Sans fornecidas pelo cliente.
- `app/editorial.css`: sistema visual editorial compartilhado, aplicado após os estilos de base e formulários. `components/home-editorial.tsx` reorganiza a home; `components/care-accordion.tsx` apresenta os diferenciais existentes. `content/editorial.ts` concentra a nova interface PT/EN.
- `app/intake.css` e `components/prescription-form.tsx`: envio de documentos e protocolo.
- `worker/index.mjs`: armazenamento privado, validação de arquivos e autorização da área de atendimentos.
- `public/images/logo.svg`: cópia integral de `D:/SVG/Asset 2.svg`.
- `public/images/*.webp`: imagens otimizadas utilizadas no site.
- `content/media.ts` e `public/images/capsules-editorial*.avif`: foto ilustrativa de cápsulas com fonte responsiva compartilhada e enquadramento central. `audit/MEDIA-REVISION.md` registra o ajuste de imagens, os ícones e o carrossel com itens inteiros.
- `assets/source/`: originais das imagens, incluindo três composições conceituais geradas. Não são fotos da empresa, dos funcionários ou dos produtos reais.
- `audit/`: inventário de migração, fontes, pendências e resultados de QA.

`scripts/prepare-assets.mjs` regenera WebP a partir das fontes locais. `scripts/postbuild.mjs` produz sitemap bilíngue e robots. `node scripts/check-site.mjs` verifica todas as páginas e seus links, imagens e metadados.

## Fluxo de contato

O formulário de contato comercial prepara uma conversa no WhatsApp. O formulário `/enviar-receita/` recebe de fato até três documentos PDF/JPG/PNG, junto de contato e observações, e gera um protocolo somente após confirmar o armazenamento. Cada arquivo pode ter até 10 MB; o total é limitado a 20 MB. O aviso opcional pelo WhatsApp contém apenas o protocolo.

Os arquivos e metadados ficam no bucket R2 privado `BUCKET`. A página `/atendimentos/` e os downloads exigem identidade ChatGPT verificada pelo Sites e um e-mail autorizado no segredo `RECEIPTS_ADMIN_EMAILS`. Inicialmente, somente o proprietário do site está autorizado. O segredo `INTAKE_SECRET` assina tokens de envio. Configure esses valores pelas ferramentas de ambiente do Sites, nunca pelo código ou manifesto. Há validação de assinatura dos arquivos, origem, consentimento, tamanhos e limitação de requisições. O acesso aos documentos expira após 30 dias; as rotinas de acesso/limpeza removem os expirados, e a equipe pode excluir a solicitação antes disso.

Testes: `npm run check:intake` verifica armazenamento e recuperação de bytes, vínculo com observações, validações e bloqueios de acesso. `node scripts/check-worker-build.mjs` valida o artefato compilado. Os testes usam documento fictício, sem dados de pacientes.

Redesign editorial: `audit/EDITORIAL-REDESIGN.md` registra a referência Essentia, a direção de composição e a validação. `scripts/redesign-regression.mjs capture` captura as páginas antes de uma alteração em `.sites/` (ignorado); executar o script sem argumento compara a versão nova com esse baseline. O relatório confirma preservação de rotas, textos, metadados, formulários e módulos de conteúdo/backend.

## Antes do domínio definitivo

Leia `audit/MIGRATION-REPORT.md` e `audit/REVISION-2.md`. Permanecem as revisões farmacêutica e jurídica, confirmações institucionais e o vídeo citado no briefing. O envio de documentos já está implementado. Para o domínio definitivo, configure a origem em `content/site.ts` e `scripts/postbuild.mjs`, altere `robots` em `page.tsx` e libere a indexação em `postbuild.mjs`. As rotas originais foram preservadas e a hospedagem normaliza URLs sem barra final com 308.

Publicação Sites: `.openai/hosting.json` mantém a identidade do projeto e o binding R2 `BUCKET`. O build mantém as páginas HTML pré-renderizadas e gera um Worker ESM em `dist/server/index.js`, com os assets públicos incorporados. Documentos recebidos em runtime nunca integram esses assets. Dependências e versões estão fixadas no lockfile.
