import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { createWorker } from "../worker/index.mjs";
import { MemoryBucket } from "./memory-bucket.mjs";
const root = path.resolve("out");
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".otf": "font/otf",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};
const app = createWorker(async (pathname, request) => {
  let file = path.resolve(root, "." + pathname);
  if (file !== root && !file.startsWith(root + path.sep))
    return new Response("Forbidden", { status: 403 });
  try {
    if ((await fs.stat(file)).isDirectory()) {
      if (!pathname.endsWith("/"))
        return Response.redirect(new URL(pathname + "/", request.url), 308);
      file = path.join(file, "index.html");
    }
  } catch {}
  let body,
    status = 200;
  try {
    body = await fs.readFile(file);
  } catch {
    file = path.join(root, "404.html");
    body = await fs.readFile(file);
    status = 404;
  }
  return new Response(body, {
    status,
    headers: {
      "Content-Type": types[path.extname(file)] ?? "application/octet-stream",
      "Cache-Control": "no-cache",
    },
  });
});
// As with the Sites starter, auth/storage are local mocks, bound only to loopback.
const env = {
  BUCKET: new MemoryBucket(),
  INTAKE_SECRET: "loopback-preview-only",
  RECEIPTS_ADMIN_EMAILS: "local-admin@cia.test",
};
const server = http.createServer(async (req, res) => {
  try {
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers))
      if (value && !key.startsWith("oai-authenticated-user-"))
        headers.set(key, Array.isArray(value) ? value.join(",") : value);
    headers.set("oai-authenticated-user-email", "local-admin@cia.test");
    headers.set("oai-authenticated-user-id", "local_preview");
    const request = new Request("http://127.0.0.1:3000" + req.url, {
      method: req.method,
      headers,
      ...(!["GET", "HEAD"].includes(req.method)
        ? { body: Readable.toWeb(req), duplex: "half" }
        : {}),
    });
    const response = await app.fetch(request, env, {
      waitUntil: (p) => p.catch(() => {}),
    });
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain" }).end("Preview error");
  }
});
server.listen(3000, "127.0.0.1", () =>
  console.log(
    "Local: http://127.0.0.1:3000 (development storage and identity)",
  ),
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => server.close(() => process.exit(0)));
