import fs from "node:fs/promises";
const origin = "https://cia-da-terra-redesign.pagamentosjeremias.chatgpt.site";
const content = JSON.parse(
  await fs.readFile("audit/source-content.json", "utf8"),
);
const articles = JSON.parse(
  await fs.readFile("content/original-articles.json", "utf8"),
);
const routes = [
  ...content.routes.filter((r) => !r.includes(":")),
  "/privacidade",
  ...articles.map((a) => "/blog/" + a.slug),
];
const location = (r, en = false) =>
  origin + (en ? "/en" : "") + (r === "/" ? "" : r) + "/";
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
  routes
    .flatMap((r) =>
      [false, true].map(
        (en) =>
          `<url><loc>${location(r, en)}</loc><xhtml:link rel="alternate" hreflang="pt-BR" href="${location(r)}"/><xhtml:link rel="alternate" hreflang="en" href="${location(r, true)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${location(r)}"/></url>`,
      ),
    )
    .join("\n") +
  "\n</urlset>";
await fs.writeFile("out/sitemap.xml", sitemap);
await fs.writeFile(
  "out/robots.txt",
  `User-agent: *\nDisallow: /\n\n# Private review version. Enable indexing only with the approved production domain.\nSitemap: ${origin}/sitemap.xml\n`,
);
console.log(
  "Generated bilingual sitemap: " +
    routes.length * 2 +
    " URLs. Private review indexing disabled.",
);
