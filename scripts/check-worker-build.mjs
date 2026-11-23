import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import worker from '../dist/server/index.js';
const ctx={waitUntil:()=>{}};
for(const [path,expected]of [['/','Cada fórmula'],['/en/','Every formula'],['/farmacia/','Onde o cuidado'],['/enviar-receita/','Envie sua receita']]){const response=await worker.fetch(new Request('https://test.example'+path),{},ctx);assert.equal(response.status,200);assert.ok((await response.text()).includes(expected));}
const font=await worker.fetch(new Request('https://test.example/fonts/editors-note-400.otf'),{},ctx);assert.equal(font.status,200);assert.equal(font.headers.get('Content-Type'),'font/otf');assert.deepEqual(Buffer.from(await font.arrayBuffer()),await fs.readFile('public/fonts/editors-note-400.otf'));
assert.equal((await worker.fetch(new Request('https://test.example/servicos'),{},ctx)).status,308);
assert.equal((await worker.fetch(new Request('https://test.example/not-a-page/'),{},ctx)).status,404);
assert.equal((await worker.fetch(new Request('https://test.example/atendimentos/'),{},ctx)).status,302);
assert.equal((await worker.fetch(new Request('https://test.example/%61tendimentos/'),{},ctx)).status,302);
assert.equal((await worker.fetch(new Request('https://test.example/api/solicitacoes'),{},ctx)).status,401);
console.log('Compiled Worker: pages, font bytes, redirects, 404 and protected routes passed.');
