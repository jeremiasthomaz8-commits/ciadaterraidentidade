import fs from "node:fs/promises";
const source = JSON.parse(
  await fs.readFile("audit/source-content.json", "utf8"),
);
const articles = JSON.parse(
  await fs.readFile("content/original-articles.json", "utf8"),
);
const defs = {
  "/": [
    "Início",
    "Apresentação e navegação",
    "Hero; apresentação; 10 serviços; receita; selos",
    "Banners neutros; Logo_Completo",
    "Receita; história; serviços",
    "Navegação; dock social",
    "Migrado com ajustes; certificações pendentes",
  ],
  "/farmacia": [
    "Quem Somos",
    "Institucional",
    "História; missão; visão; valores; estrutura; qualidade",
    "Logo_Completo; duas imagens externas de outras farmácias",
    "Conhecer a empresa",
    "Conteúdo institucional",
    "Migrado e editado; selos e fotos de terceiros retidos na auditoria",
  ],
  "/nossa-mascote": [
    "Conheça a GAIA",
    "Identidade",
    "Origem; mitologia; significado; etimologia",
    "Gaia_400h; três ícones",
    "Navegação institucional",
    "Conteúdo da mascote",
    "Migrado; metadado Terra corrigido para Gaia",
  ],
  "/servicos": [
    "Nossos Serviços",
    "Catálogo informativo",
    "10 categorias; contato personalizado",
    "Ícones lucide",
    "Detalhes; orçamento",
    "Listagem; links",
    "Migrado; inclui também duas páginas adicionais descobertas",
  ],
  "/orcamento": [
    "Solicite um Orçamento",
    "Solicitação comercial",
    "Dados de contato; interesse; prescrição; mensagem; prazo 24h; entrega",
    "Ícones",
    "WhatsApp",
    "Formulário; preparo de conversa",
    "Adaptado; sem coleta de prescrição; confirmação final ocorre no WhatsApp",
  ],
  "/enviar-receita": [
    "Enviar Receita",
    "Receita e orçamento",
    "Upload PDF/JPG/PNG 10MB; nome; telefone; email; CPF/CNPJ; observações",
    "Ícones",
    "Enviar receita",
    "Upload sensível e integração de backend",
    "Parcial; rota e orientação preservadas, upload depende de aprovação e infraestrutura segura",
  ],
  "/contato": [
    "Entre em Contato",
    "Atendimento",
    "Telefones; email; endereço; horários; loja; formulário; mapa",
    "Ícones; mapa Google",
    "Mensagem via WhatsApp; direções",
    "Contato; validação; mapa",
    "Migrado; mapa como link para reduzir terceiros",
  ],
  "/blog": [
    "Blog",
    "Conteúdo editorial",
    "Três posts; categorias; datas; autores",
    "Placeholders; três URLs Pexels incorretas",
    "Ler artigo",
    "Filtros de categoria",
    "Migrado da fonte estática do aplicativo; acesso direto original 404",
  ],
};
const rows = source.routes
  .filter((r) => !r.includes(":"))
  .map((route) => {
    let d = defs[route];
    if (!d) {
      const service = source.services.find(
        (s) => route === "/servicos/" + s.slug,
      );
      d = [
        service?.title ??
          (route.endsWith("suplementos")
            ? "Suplementos"
            : "Manipulação Magistral"),
        "Serviço informativo",
        "Descrição; características; opções; CTA; cuidados",
        "Ícones; sem fotos próprias",
        "Orçamento; contato",
        "Detalhe e navegação",
        route.endsWith("/shot")
          ? "Corrigido; original exibia Suplementos, dados Shot preservados do catálogo"
          : "Migrado com edição de alegações sem comprovação",
      ];
    }
    return {
      original_url: "https://www.ciadaterrafarmacia.com.br" + route,
      original_title: d[0],
      purpose: d[1],
      sections: d[2],
      media: d[3],
      calls_to_action: d[4],
      functional_requirements: d[5],
      new_route: route === "/" ? "/" : route + "/",
      english_route: route === "/" ? "/en/" : "/en" + route + "/",
      migration_status: d[6],
    };
  });
for (const a of articles)
  rows.push({
    original_url: "https://www.ciadaterrafarmacia.com.br/blog/" + a.slug,
    original_title: a.title,
    purpose: "Artigo educativo",
    sections: "Texto completo; autor; categoria; data; tags",
    media: a.image_url,
    calls_to_action: "Contato; artigos relacionados",
    functional_requirements: "Leitura; navegação; metadados",
    new_route: "/blog/" + a.slug + "/",
    english_route: "/en/blog/" + a.slug + "/",
    migration_status:
      "Migrado com revisão editorial de alegações; original integral arquivado; aprovação farmacêutica pendente",
  });
const fields = Object.keys(rows[0]);
const quote = (v) => '"' + String(v ?? "").replaceAll('"', '""') + '"';
await fs.writeFile(
  "audit/migration-inventory.csv",
  "\ufeff" +
    fields.join(",") +
    "\n" +
    rows.map((r) => fields.map((f) => quote(r[f])).join(",")).join("\n"),
);
await fs.writeFile(
  "audit/migration-inventory.json",
  JSON.stringify(rows, null, 2),
);
console.log(
  "Inventoried " +
    rows.length +
    " concrete original URLs. New privacy page is additional.",
);
