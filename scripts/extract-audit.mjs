import fs from "node:fs";
const source = fs.readFileSync("audit/original-app.js", "utf8");
const literal = /"(?:[^"\\]|\\.)*"/g;
function strings(value) {
  return [...value.matchAll(literal)].map((m) => {
    try {
      return JSON.parse(m[0]);
    } catch {
      return "";
    }
  });
}
const routes = [
  ...new Set([...source.matchAll(/path:"([^"]+)"/g)].map((m) => m[1])),
];
const functions = {};
for (const name of [
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
  "a_",
  "Rz",
  "Ez",
  "zz",
  "Hz",
  "Oz",
  "Dz",
  "Fz",
  "Vz",
  "Bz",
]) {
  const start = source.indexOf("function " + name + "(");
  let end = source.indexOf("function ", start + 10);
  if (end < 0) end = source.length;
  const code = source.slice(start, end);
  functions[name] = {
    text: strings(code).filter(
      (v) =>
        v.includes(" ") &&
        !/^(className|text-|bg-|w-|flex |grid |absolute|inline-|relative|https:|[A-Z]:)/.test(
          v,
        ) &&
        !/(rounded-|leading-|px-|py-|font-)/.test(v),
    ),
    images: strings(code).filter((v) => /\.(png|jpg|jpeg|webp)/.test(v)),
  };
}
const servicesRaw = source.match(/const Qq=(\[.*?\]);function Yq/)[1];
const services = JSON.parse(
  servicesRaw.replace(/([{,])([a-z_]+):/g, '$1"$2":'),
);
fs.writeFileSync(
  "audit/source-content.json",
  JSON.stringify(
    {
      auditedAt: "2026-11-19",
      source: "https://www.ciadaterrafarmacia.com.br/",
      routes,
      functions,
      services,
    },
    null,
    2,
  ),
);
const urls = [
  ...new Set(
    strings(source).filter(
      (v) =>
        /^https?:/.test(v) && /facebook|instagram|wa.me|api.whatsapp/.test(v),
    ),
  ),
];
console.log(
  JSON.stringify(
    {
      routes,
      social: urls,
      functions: Object.fromEntries(
        Object.entries(functions).filter(([k]) =>
          ["RE", "Iz", "Sz", "Cz", "r_", "n_", "i_", "Tz"].includes(k),
        ),
      ),
    },
    null,
    2,
  ),
);
