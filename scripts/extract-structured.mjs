import fs from "node:fs";
import { parse } from "@babel/parser";
const source = fs.readFileSync("audit/original-app.js", "utf8");
const ast = parse(source, { sourceType: "module" });
const values = new Map(),
  funcs = new Map();
function literal(n, seen = new Set()) {
  if (!n) return null;
  if (["StringLiteral", "NumericLiteral", "BooleanLiteral"].includes(n.type))
    return n.value;
  if (n.type === "NullLiteral") return null;
  if (n.type === "TemplateLiteral" && n.expressions.length === 0)
    return n.quasis.map((x) => x.value.cooked).join("");
  if (n.type === "UnaryExpression" && n.operator === "!")
    return !literal(n.argument, seen);
  if (n.type === "Identifier" && !seen.has(n.name) && values.has(n.name))
    return literal(values.get(n.name), new Set([...seen, n.name]));
  if (n.type === "ArrayExpression")
    return n.elements.map((x) => literal(x, seen));
  if (n.type === "ObjectExpression")
    return Object.fromEntries(
      n.properties
        .filter((p) => p.type === "ObjectProperty")
        .map((p) => [p.key.name ?? p.key.value, literal(p.value, seen)]),
    );
  return null;
}
for (const n of ast.program.body) {
  if (n.type === "VariableDeclaration")
    for (const d of n.declarations)
      if (d.id.name) values.set(d.id.name, d.init);
  if (n.type === "FunctionDeclaration") funcs.set(n.id.name, n);
}
function visit(n, cb) {
  if (!n || typeof n !== "object") return;
  cb(n);
  for (const [k, v] of Object.entries(n)) {
    if (["loc", "start", "end"].includes(k)) continue;
    if (Array.isArray(v)) v.forEach((x) => visit(x, cb));
    else if (v && typeof v === "object") visit(v, cb);
  }
}
const pages = {};
for (const [name, f] of funcs) {
  if (
    ![
      "Kq",
      "Xq",
      "Tz",
      "RE",
      "Iz",
      "Sz",
      "Cz",
      "jz",
      "r_",
      "n_",
      "i_",
      "Rz",
      "Ez",
      "zz",
      "Hz",
      "Oz",
      "Dz",
      "Fz",
      "Vz",
      "Bz",
    ].includes(name)
  )
    continue;
  const blocks = [],
    lists = [];
  visit(f, (n) => {
    if (
      n.type === "CallExpression" &&
      n.arguments?.[0]?.type === "StringLiteral" &&
      /^(h[1-6]|p|li|span)$/.test(n.arguments[0].value)
    ) {
      const obj = n.arguments[1];
      const child = obj?.properties?.find(
        (p) => p.key?.name === "children",
      )?.value;
      const t = literal(child);
      if (typeof t === "string")
        blocks.push({ tag: n.arguments[0].value, text: t });
    }
    if (n.type === "ArrayExpression") {
      const a = literal(n);
      if (
        a?.length > 1 &&
        a.every(
          (x) =>
            typeof x === "string" || (x && typeof x === "object" && x.title),
        )
      )
        lists.push(a);
    }
  });
  pages[name] = { blocks, lists };
}
const articles = ["KE", "cz", "bz"].map((k) => literal(values.get(k)));
fs.writeFileSync(
  "audit/structured-content.json",
  JSON.stringify({ pages, articles }, null, 2),
);
fs.mkdirSync("content", { recursive: true });
fs.writeFileSync(
  "content/original-articles.json",
  JSON.stringify(articles, null, 2),
);
console.log(
  JSON.stringify(
    {
      articles: articles.map((a) => ({
        slug: a.slug,
        title: a.title,
        date: a.published_at,
        words: a.content.split(/\s+/).length,
      })),
      pages: Object.fromEntries(
        Object.entries(pages).map(([k, v]) => [
          k,
          { blocks: v.blocks.length, lists: v.lists.length },
        ]),
      ),
    },
    null,
    2,
  ),
);
