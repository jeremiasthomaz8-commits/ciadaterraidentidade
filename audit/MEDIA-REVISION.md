# Ajustes de imagens, categorias e alinhamento

- A foto anterior de cápsulas vinha de um banner de 1920 × 500 px. O recorte em uma caixa quase quadrada ampliava a imagem pela altura e deixava o assunto fora do quadro.
- `assets/source/capsules-reframed.png` é uma nova composição ilustrativa gerada a partir desse banner, de 1254 × 1254 px, com cápsulas e folha centralizadas e margem para os diferentes formatos. Não é uma fotografia de instalações, equipe ou produto real da farmácia. O original foi preservado em `assets/source/original-hero.png`.
- Duas versões AVIF (1254 e 768 px) são servidas por `content/media.ts`, com `srcset` e `sizes`, sem ampliação artificial do arquivo. A seleção compartilhada substitui a foto antiga na narrativa da home, no destaque e nas páginas de serviço que a utilizavam, em PT/EN. Os textos alternativos identificam a composição ilustrativa.
- O espaço da foto institucional agora respeita a proporção quadrada. O ponto de enquadramento das fotos dos destaques fica centralizado.
- O carrossel exibe somente os 12 ícones vetoriais e seus nomes. O ícone de chocolate representa uma barra dividida em pedaços. A largura das células é calculada para caberem grupos inteiros de 6, 4, 2 ou 1 itens, conforme o espaço disponível. Setas avançam por grupos completos; toque e encaixe por item continuam ativos. Não há barra de rolagem visível.
- O grid de destaques e os cartões secundários alinham suas imagens pelo topo, sem centralização vertical dentro de linhas mais altas.

## Verificação

`media-revision-checks.json` registra nove larguras entre 320 e 1920 px: zero itens parciais, zero fotos entre categorias, 12 ícones presentes e zero overflow horizontal. Nos layouts com duas colunas, a diferença entre os topos das duas imagens superiores foi 0 px. A segunda página de categorias em desktop e o avanço no celular mantiveram itens inteiros.

As páginas de cápsulas e pastilhas carregaram o novo arquivo, centralizado, em PT/EN. A comparação de regressão preservou as 50 rotas, textos, metadados, destinos, campos dos formulários e hashes dos módulos de negócio/backend. Links e imagens foram verificados sem erros. Worker comprimido: 2,90 MiB; nenhum novo pacote foi instalado.
