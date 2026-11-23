import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { gzipSync } from "node:zlib";
const root = path.resolve("out");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".otf": "font/otf",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};
const assets = {};
async function walk(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(filename);
    else {
      const relative =
        "/" + path.relative(root, filename).replaceAll("\\", "/");
      if (relative === "/_headers") continue;
      const bytes = await fs.readFile(filename);
      assets[relative] = {
        type: types[path.extname(filename)] ?? "application/octet-stream",
        body: bytes.toString("base64"),
        etag:
          '"' +
          createHash("sha256").update(bytes).digest("hex").slice(0, 32) +
          '"',
      };
    }
  }
}
await walk(root);
let source = await fs.readFile("worker/index.mjs", "utf8");
source = source.replace("/* INLINE_ASSETS */ {}", JSON.stringify(assets));
await fs.mkdir("dist/server", { recursive: true });
await fs.mkdir("dist/.openai", { recursive: true });
await fs.writeFile("dist/server/index.js", source);
await fs.copyFile(".openai/hosting.json", "dist/.openai/hosting.json");
console.log(
  `Built Worker with ${Object.keys(assets).length} assets; compressed ${(gzipSync(source).length / 1024 / 1024).toFixed(2)} MiB.`,
);
