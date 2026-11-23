// Source is tested directly; build-worker embeds only public, pre-rendered assets.
const ASSETS = /* INLINE_ASSETS */ {};
const MAX_FILE = 10 * 1024 * 1024;
const MAX_TOTAL = 20 * 1024 * 1024;
const MAX_BODY = MAX_TOTAL + 256 * 1024;
const RETENTION = 30 * 24 * 60 * 60 * 1000;
const ID = /^\d{13}-[a-f0-9-]{36}$/;
const FILE_ID = /^[a-f0-9-]{36}\.(pdf|png|jpg)$/;
const encoder = new TextEncoder();
const security = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "X-Frame-Options": "SAMEORIGIN",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};
const json = (body, status = 200, extra = {}) =>
  Response.json(body, {
    status,
    headers: { ...security, "Cache-Control": "private, no-store", ...extra },
  });
function fail(code, status = 400) {
  return json({ error: code }, status);
}
function admin(request, env) {
  const email = request.headers
    .get("oai-authenticated-user-email")
    ?.toLowerCase();
  return (
    !!email &&
    (env.RECEIPTS_ADMIN_EMAILS ?? "")
      .split(",")
      .map((v) => v.trim().toLowerCase())
      .filter(Boolean)
      .includes(email)
  );
}
function sameOrigin(request) {
  const origin = request.headers.get("Origin");
  return (
    !!origin &&
    origin === new URL(request.url).origin &&
    request.headers.get("Sec-Fetch-Site") !== "cross-site"
  );
}
async function digest(secret, value) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return [
    ...new Uint8Array(
      await crypto.subtle.sign("HMAC", key, encoder.encode(value)),
    ),
  ]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("");
}
function equal(a, b) {
  if (a.length !== b.length) return false;
  let different = 0;
  for (let i = 0; i < a.length; i++)
    different |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return different === 0;
}
async function tokenResponse(env) {
  if (!env.INTAKE_SECRET || !env.BUCKET) return fail("unavailable", 503);
  const value = Date.now() + "." + crypto.randomUUID();
  const signature = await digest(env.INTAKE_SECRET, value);
  return json({ token: value + "." + signature });
}
async function tokenValid(request, env) {
  const token = request.headers.get("X-Intake-Token") ?? "";
  const parts = token.split(".");
  if (parts.length !== 3 || !env.INTAKE_SECRET) return false;
  const time = Number(parts[0]);
  if (
    !Number.isFinite(time) ||
    Date.now() - time > 30 * 60 * 1000 ||
    time > Date.now() + 1000
  )
    return false;
  return equal(
    parts[2],
    await digest(env.INTAKE_SECRET, parts[0] + "." + parts[1]),
  );
}
async function limit(request, env) {
  const actor =
    request.headers.get("oai-authenticated-user-id") ??
    request.headers.get("CF-Connecting-IP") ??
    "anonymous";
  const hash = await digest(env.INTAKE_SECRET, actor);
  const hour = Math.floor(Date.now() / 3600000);
  for (let i = 0; i < 8; i++) {
    const slot = await env.BUCKET.put(`limits/${hour}/${hash}/${i}`, "1", {
      onlyIf: { etagDoesNotMatch: "*" },
    });
    if (slot) return true;
  }
  return false;
}
async function readBody(request) {
  const length = Number(request.headers.get("Content-Length") ?? 0);
  if (length > MAX_BODY) throw Error("too_large");
  if (!request.body) throw Error("invalid_form");
  const reader = request.body.getReader();
  let size = 0;
  const chunks = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY) {
      await reader.cancel();
      throw Error("too_large");
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return new Response(bytes, {
    headers: { "Content-Type": request.headers.get("Content-Type") ?? "" },
  }).formData();
}
function fileType(bytes, name) {
  if (
    /\.pdf$/i.test(name) &&
    String.fromCharCode(...bytes.slice(0, 5)) === "%PDF-"
  )
    return { mime: "application/pdf", ext: "pdf" };
  if (
    /\.png$/i.test(name) &&
    [137, 80, 78, 71, 13, 10, 26, 10].every((v, i) => bytes[i] === v)
  )
    return { mime: "image/png", ext: "png" };
  if (
    /\.jpe?g$/i.test(name) &&
    bytes[0] === 255 &&
    bytes[1] === 216 &&
    bytes[2] === 255
  )
    return { mime: "image/jpeg", ext: "jpg" };
  return null;
}
function text(form, key, max) {
  const value = form.get(key);
  if (value !== null && typeof value !== "string") throw Error("invalid_form");
  const result = (value ?? "").trim();
  if (result.length > max) throw Error("invalid_form");
  return result;
}
async function removeRecord(bucket, id, record) {
  for (const file of record?.files ?? [])
    if (FILE_ID.test(file.id))
      await bucket.delete(`receipts/${id}/files/${file.id}`);
  await bucket.delete(`receipts/${id}/metadata.json`);
}
async function readRecord(bucket, id) {
  const stored = await bucket.get(`receipts/${id}/metadata.json`);
  if (!stored) return null;
  const record = await stored.json();
  if (Date.parse(record.expiresAt) < Date.now()) {
    await removeRecord(bucket, id, record);
    return null;
  }
  if (record.status !== "received") return null;
  return record;
}
async function cleanup(bucket) {
  const cutoff = String(9999999999999 - (Date.now() - RETENTION)).padStart(
    13,
    "0",
  );
  const list = await bucket.list({
    prefix: "receipts/",
    delimiter: "/",
    startAfter: "receipts/" + cutoff + "-",
    limit: 10,
  });
  for (const prefix of list.delimitedPrefixes ?? []) {
    const id = prefix.split("/")[1];
    if (ID.test(id)) await readRecord(bucket, id);
  }
  const oldHour = Math.floor(Date.now() / 3600000) - 2;
  const limits = await bucket.list({ prefix: "limits/", limit: 100 });
  for (const object of limits.objects ?? [])
    if (Number(object.key.split("/")[1]) < oldHour)
      await bucket.delete(object.key);
}
async function submit(request, env) {
  if (!env.BUCKET || !env.INTAKE_SECRET) return fail("unavailable", 503);
  if (!sameOrigin(request) || !(await tokenValid(request, env)))
    return fail("forbidden", 403);
  if (!request.headers.get("Content-Type")?.startsWith("multipart/form-data;"))
    return fail("invalid_form");
  let form;
  try {
    form = await readBody(request);
  } catch (error) {
    return fail(
      error.message === "too_large" ? "too_large" : "invalid_form",
      error.message === "too_large" ? 413 : 400,
    );
  }
  let fields;
  try {
    fields = {
      name: text(form, "name", 100),
      phone: text(form, "phone", 30),
      email: text(form, "email", 160),
      observations: text(form, "observations", 3000),
    };
    if (text(form, "website", 200) || text(form, "consent", 10) !== "yes")
      return fail("invalid_form");
  } catch {
    return fail("invalid_form");
  }
  if (
    fields.name.length < 2 ||
    fields.phone.replace(/\D/g, "").length < 10 ||
    (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
  )
    return fail("invalid_fields");
  const incoming = form.getAll("files");
  if (
    incoming.length < 1 ||
    incoming.length > 3 ||
    incoming.some(
      (f) => typeof f === "string" || !f.size || f.size > MAX_FILE,
    ) ||
    incoming.reduce((n, f) => n + (f.size ?? 0), 0) > MAX_TOTAL
  )
    return fail("invalid_files");
  const checked = [];
  for (const file of incoming) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const type = fileType(bytes, file.name);
    if (!type) return fail("invalid_files");
    checked.push({ file, bytes, type });
  }
  if (!(await limit(request, env))) return fail("rate_limited", 429);
  const id =
    String(9999999999999 - Date.now()).padStart(13, "0") +
    "-" +
    crypto.randomUUID();
  const protocol =
    "CT-" +
    new Date().toISOString().slice(0, 10).replaceAll("-", "") +
    "-" +
    id.slice(-12).toUpperCase();
  const saved = [];
  try {
    const files = checked.map(({ file, type }) => ({
      id: crypto.randomUUID() + "." + type.ext,
      name: file.name.replace(/[\x00-\x1f\x7f]/g, "").slice(0, 160),
      type: type.mime,
      size: file.size,
    }));
    const record = {
      id,
      protocol,
      ...fields,
      files,
      status: "uploading",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + RETENTION).toISOString(),
    };
    const metadataKey = `receipts/${id}/metadata.json`;
    saved.push(metadataKey);
    await env.BUCKET.put(metadataKey, JSON.stringify(record), {
      httpMetadata: { contentType: "application/json" },
    });
    for (const [index, { file, bytes, type }] of checked.entries()) {
      const fileId = files[index].id;
      const key = `receipts/${id}/files/${fileId}`;
      const object = await env.BUCKET.put(key, bytes, {
        httpMetadata: {
          contentType: type.mime,
          contentDisposition: "attachment",
        },
      });
      saved.push(key);
      const stored = await env.BUCKET.head(key);
      if (!object || stored?.size !== file.size) throw Error("store_failed");
    }
    record.status = "received";
    const key = metadataKey;
    await env.BUCKET.put(key, JSON.stringify(record), {
      httpMetadata: { contentType: "application/json" },
    });
    const metadata = await env.BUCKET.head(key);
    if (!metadata) throw Error("store_failed");
    return json(
      {
        id,
        protocol,
        count: files.length,
        status: "received",
        expiresAt: record.expiresAt,
      },
      201,
    );
  } catch {
    await Promise.allSettled(saved.map((key) => env.BUCKET.delete(key)));
    return fail("store_failed", 503);
  }
}
async function api(request, env, ctx) {
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/$/, "");
  if (pathname === "/api/intake-token" && request.method === "GET") {
    if (env.BUCKET) ctx.waitUntil(cleanup(env.BUCKET).catch(() => {}));
    return tokenResponse(env);
  }
  if (pathname === "/api/solicitacoes" && request.method === "POST")
    return submit(request, env);
  if (!admin(request, env))
    return fail(
      "unauthorized",
      request.headers.has("oai-authenticated-user-email") ? 403 : 401,
    );
  if (!env.BUCKET) return fail("unavailable", 503);
  if (pathname === "/api/solicitacoes" && request.method === "GET") {
    const cursor = url.searchParams.get("cursor") ?? undefined;
    const result = await env.BUCKET.list({
      prefix: "receipts/",
      delimiter: "/",
      cursor,
      limit: 30,
    });
    const records = (
      await Promise.all(
        (result.delimitedPrefixes ?? []).map((prefix) =>
          readRecord(env.BUCKET, prefix.split("/")[1]),
        ),
      )
    ).filter(Boolean);
    ctx.waitUntil(cleanup(env.BUCKET).catch(() => {}));
    return json({ records, cursor: result.truncated ? result.cursor : null });
  }
  const fileMatch = pathname.match(
    /^\/api\/solicitacoes\/([^/]+)\/files\/([^/]+)$/,
  );
  if (fileMatch && request.method === "GET") {
    const [, id, fileId] = fileMatch;
    if (!ID.test(id) || !FILE_ID.test(fileId)) return fail("not_found", 404);
    const record = await readRecord(env.BUCKET, id);
    const file = record?.files.find((f) => f.id === fileId);
    if (!file) return fail("not_found", 404);
    const stored = await env.BUCKET.get(`receipts/${id}/files/${fileId}`);
    if (!stored) return fail("not_found", 404);
    return new Response(stored.body, {
      headers: {
        ...security,
        "Cache-Control": "private, no-store",
        "Content-Type": file.type,
        "Content-Disposition": `attachment; filename="documento.${fileId.split(".").pop()}"; filename*=UTF-8''${encodeURIComponent(file.name)}`,
        "Content-Security-Policy": "default-src 'none'; sandbox",
      },
    });
  }
  const itemMatch = pathname.match(/^\/api\/solicitacoes\/([^/]+)$/);
  if (itemMatch && request.method === "DELETE") {
    if (!sameOrigin(request) || !(await tokenValid(request, env)))
      return fail("forbidden", 403);
    const id = itemMatch[1];
    if (!ID.test(id)) return fail("not_found", 404);
    const record = await readRecord(env.BUCKET, id);
    if (!record) return fail("not_found", 404);
    await removeRecord(env.BUCKET, id, record);
    return json({ deleted: true });
  }
  return fail("not_found", 404);
}
function embeddedAsset(pathname, request) {
  let key = pathname;
  if (ASSETS[key + "/index.html"])
    return Response.redirect(new URL(key + "/", request.url), 308);
  if (key.endsWith("/")) key += "index.html";
  let asset = ASSETS[key],
    status = 200;
  if (!asset) {
    asset = ASSETS["/404.html"];
    status = 404;
  }
  if (!asset) return new Response("Not found", { status: 404 });
  if (request.headers.get("If-None-Match") === asset.etag)
    return new Response(null, { status: 304, headers: { ETag: asset.etag } });
  const binary = atob(asset.body);
  const data = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new Response(request.method === "HEAD" ? null : data, {
    status,
    headers: {
      ...security,
      "Content-Type": asset.type,
      "Cache-Control": key.startsWith("/_next/static/")
        ? "public, max-age=31536000, immutable"
        : key.endsWith(".html")
          ? "no-cache"
          : "public, max-age=86400",
      ETag: asset.etag,
    },
  });
}
export function createWorker(assetLoader = embeddedAsset) {
  return {
    async fetch(request, env, ctx) {
      let path;
      try {
        path = decodeURIComponent(new URL(request.url).pathname);
      } catch {
        return fail("invalid_path", 400);
      }
      if (path.startsWith("/api/")) {
        try {
          return await api(request, env, ctx);
        } catch {
          return fail("server_error", 503);
        }
      }
      if (/^\/(en\/)?atendimentos(?:\/|$)/.test(path) && !admin(request, env)) {
        if (!request.headers.has("oai-authenticated-user-email"))
          return Response.redirect(
            new URL(
              "/signin-with-chatgpt?return_to=" + encodeURIComponent(path),
              request.url,
            ),
            302,
          );
        return new Response("Acesso restrito à equipe autorizada.", {
          status: 403,
          headers: {
            ...security,
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "private, no-store",
          },
        });
      }
      if (!["GET", "HEAD"].includes(request.method))
        return fail("method_not_allowed", 405);
      return assetLoader(path, request);
    },
  };
}
export default createWorker();
