import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import assert from "node:assert/strict";
import { load } from "cheerio";
const baselineFile = ".sites/editorial-baseline.json";
const immutable = [
  "content/site.ts",
  "content/articles.ts",
  "content/intake.ts",
  "worker/index.mjs",
  "components/prescription-form.tsx",
  "components/receipts.tsx",
  ".openai/hosting.json",
];
const clean = (s) => s.replace(/\s+/g, " ").trim();
async function snapshot() {
  const pages = {};
  async function walk(dir) {
    for (const item of await fs.readdir(dir, { withFileTypes: true })) {
      const file = path.join(dir, item.name);
      if (item.isDirectory()) await walk(file);
      else if (item.name === "index.html" && !file.includes("_not-found")) {
        const $ = load(await fs.readFile(file, "utf8"));
        if (!$("main").length) continue;
        const route =
          "/" +
          path.relative("out", path.dirname(file)).replaceAll("\\", "/") +
          "/";
        const key = route === "//" ? "/" : route;
        pages[key] = {
          title: $("title").text(),
          description: $("meta[name=description]").attr("content"),
          h1: clean($("h1").text()),
          paragraphs: [
            ...new Set(
              $("main p,main h2,main h3")
                .toArray()
                .map((e) => clean($(e).text()))
                .filter(Boolean),
            ),
          ],
          links: [
            ...new Set(
              $("main a[href]")
                .toArray()
                .map((e) => $(e).attr("href")),
            ),
          ],
          fields: $("main input,main textarea,main select")
            .toArray()
            .map((e) => ({
              id: $(e).attr("id"),
              name: $(e).attr("name"),
              type: $(e).attr("type"),
              required: $(e).attr("required") !== undefined,
            })),
          jsonld: $('script[type="application/ld+json"]')
            .toArray()
            .map((e) => $(e).text()),
        };
      }
    }
  }
  await walk("out");
  const hashes = {};
  for (const f of immutable)
    hashes[f] = crypto
      .createHash("sha256")
      .update(await fs.readFile(f))
      .digest("hex");
  return { pages, hashes };
}
const current = JSON.parse(JSON.stringify(await snapshot()));
delete current.pages["/404/"];
if (process.argv[2] === "capture") {
  await fs.mkdir(".sites", { recursive: true });
  await fs.writeFile(baselineFile, JSON.stringify(current, null, 2));
  console.log(
    `Captured ${Object.keys(current.pages).length} pages and ${immutable.length} protected modules.`,
  );
} else {
  const baseline = JSON.parse(await fs.readFile(baselineFile, "utf8"));
  delete baseline.pages["/404/"];
  assert.deepEqual(
    Object.keys(current.pages).sort(),
    Object.keys(baseline.pages).sort(),
    "All routes must remain",
  );
  assert.deepEqual(
    current.hashes,
    baseline.hashes,
    "Business content, upload logic and backend must remain unchanged",
  );
  for (const [route, before] of Object.entries(baseline.pages)) {
    const after = current.pages[route];
    for (const key of ["title", "description", "h1", "fields", "jsonld"])
      assert.deepEqual(after[key], before[key], `${route}: ${key}`);
    for (const p of before.paragraphs)
      assert.ok(
        after.paragraphs.includes(p),
        `${route}: missing paragraph: ${p}`,
      );
    for (const link of before.links)
      assert.ok(
        after.links.includes(link),
        `${route}: missing destination: ${link}`,
      );
  }
  const report = {
    date: new Date().toISOString().slice(0, 10),
    passed: true,
    pages: Object.keys(current.pages).length,
    checks: [
      "all routes retained",
      "page metadata and JSON-LD unchanged",
      "all existing paragraphs retained",
      "all existing main destinations retained",
      "form field contracts unchanged",
      "content and backend hashes unchanged",
    ],
  };
  await fs.writeFile(
    "audit/editorial-regression.json",
    JSON.stringify(report, null, 2),
  );
  console.log(JSON.stringify(report, null, 2));
}
