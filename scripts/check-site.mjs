import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";
const root = path.resolve("out");
const original = JSON.parse(
  await fs.readFile("audit/source-content.json", "utf8"),
);
const articles = JSON.parse(
  await fs.readFile("content/original-articles.json", "utf8"),
);
const routes = [
  ...original.routes.filter((r) => !r.includes(":")),
  "/privacidade",
  ...articles.map((a) => "/blog/" + a.slug),
];
const errors = [];
let links = 0,
  images = 0,
  jsonld = 0;
for (const locale of ["pt-BR", "en"])
  for (const route of routes) {
    const url =
      (locale === "en" ? "/en" : "") + (route === "/" ? "" : route) + "/";
    const filename = path.join(root, url, "index.html");
    let html;
    try {
      html = await fs.readFile(filename, "utf8");
    } catch {
      errors.push("Missing route " + url);
      continue;
    }
    const $ = load(html);
    const check = (value, message) => {
      if (!value) errors.push(url + ": " + message);
    };
    check($("html").attr("lang") === locale, "incorrect HTML lang");
    check($("h1").length === 1, "expected one h1");
    check($("title").text().includes("Cia da Terra"), "missing page title");
    check(
      $("meta[name=description]").attr("content")?.length > 20,
      "missing description",
    );
    check(
      $("link[rel=canonical]").attr("href")?.endsWith(url),
      "incorrect canonical",
    );
    for (const lang of ["pt-BR", "en", "x-default"])
      check(
        $(`link[hreflang="${lang}"]`).length > 0,
        "missing hreflang " + lang,
      );
    check(
      $("meta[name=robots]").attr("content")?.includes("noindex"),
      "review site must not be indexed",
    );
    for (const node of $("a[href]").toArray()) {
      const target = $(node).attr("href");
      links++;
      if (target.startsWith("#")) {
        if (target.length > 1)
          check($("#" + target.slice(1)).length > 0, "broken anchor " + target);
        continue;
      }
      if (!target.startsWith("/")) continue;
      const filename = path.join(
        root,
        decodeURIComponent(target.split(/[?#]/)[0]),
      );
      try {
        let info = await fs.stat(filename);
        if (info.isDirectory())
          await fs.access(path.join(filename, "index.html"));
      } catch {
        errors.push(url + ": broken internal link " + target);
      }
    }
    for (const node of $("img").toArray()) {
      images++;
      const src = $(node).attr("src");
      check($(node).attr("alt") !== undefined, "image missing alt");
      try {
        await fs.access(path.join(root, src));
      } catch {
        errors.push(url + ": missing image " + src);
      }
    }
    for (const node of $('script[type="application/ld+json"]').toArray()) {
      jsonld++;
      try {
        JSON.parse($(node).text());
      } catch {
        errors.push(url + ": invalid JSON-LD");
      }
    }
    for (const channel of [
      "https://wa.me/5511961205406",
      "https://www.instagram.com/ciadaterrafarmaciamanipulacao",
      "https://www.facebook.com/ciadaterrafarmacia",
    ])
      check(
        $("a")
          .toArray()
          .some((n) => $(n).attr("href") === channel),
        "missing official social link " + channel,
      );
    for (const node of $(
      "input:not([type=checkbox]),textarea,select",
    ).toArray()) {
      const id = $(node).attr("id");
      check(id && $(`label[for="${id}"]`).length > 0, "unlabelled form field");
    }
  }
const report = {
  date: "2026-11-19",
  pages: routes.length * 2,
  internalAndExternalLinksChecked: links,
  imagesChecked: images,
  jsonLdBlocksChecked: jsonld,
  errors,
};
await fs.writeFile("audit/static-checks.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
