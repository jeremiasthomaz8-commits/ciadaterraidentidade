import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createWorker} from '../worker/index.mjs';
import {MemoryBucket} from './memory-bucket.mjs';
const base='https://cia-test.example';const app=createWorker(()=>new Response('page'));const bucket=new MemoryBucket();const env={BUCKET:bucket,INTAKE_SECRET:'local-test-secret-only',RECEIPTS_ADMIN_EMAILS:'staff@example.test'};const pending=[];const ctx={waitUntil:p=>pending.push(p)};
const staff={'oai-authenticated-user-email':'staff@example.test'};
async function call(path,init={}){return app.fetch(new Request(base+path,init),env,ctx);}
const fixture=Buffer.from('%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n%%EOF\n');
await fs.mkdir('audit/fixtures',{recursive:true});await fs.writeFile('audit/fixtures/TESTE-SEM-DADOS-DE-PACIENTE.pdf',fixture);
const {token}=await(await call('/api/intake-token')).json();
function data(file=fixture,name='TESTE-SEM-DADOS-DE-PACIENTE.pdf'){const form=new FormData();form.set('name','Teste técnico — sem dados de paciente');form.set('phone','11000000000');form.set('observations','Documento de teste técnico. Não é uma receita, guia ou análise real.');form.set('consent','yes');form.append('files',new File([file],name,{type:'application/pdf'}));return form;}
const headers={Origin:base,'X-Intake-Token':token};
assert.equal((await call('/api/solicitacoes',{method:'POST',body:data()})).status,403);
assert.equal((await call('/api/solicitacoes',{method:'POST',headers:{...headers,Origin:'https://elsewhere.example'},body:data()})).status,403);
assert.equal((await call('/api/solicitacoes',{method:'POST',headers,body:data(Buffer.from('not a pdf'))})).status,400);
assert.equal((await call('/api/solicitacoes',{method:'POST',headers,body:data(Buffer.alloc(10*1024*1024+1))})).status,400);
const noConsent=data();noConsent.delete('consent');assert.equal((await call('/api/solicitacoes',{method:'POST',headers,body:noConsent})).status,400);
const result=await call('/api/solicitacoes',{method:'POST',headers,body:data()});assert.equal(result.status,201);const receipt=await result.json();assert.equal(receipt.status,'received');assert.equal(receipt.count,1);assert.match(receipt.protocol,/^CT-\d{8}-[A-F\d]{12}$/);
assert.equal((await call('/api/solicitacoes')).status,401);assert.equal((await call('/api/solicitacoes',{headers:{'oai-authenticated-user-email':'other@example.test'}})).status,403);
const listed=await(await call('/api/solicitacoes',{headers:staff})).json();assert.equal(listed.records.length,1);assert.equal(listed.records[0].observations,'Documento de teste técnico. Não é uma receita, guia ou análise real.');const file=listed.records[0].files[0];const url=`/api/solicitacoes/${receipt.id}/files/${file.id}`;
assert.equal((await call(url)).status,401);const download=await call(url,{headers:staff});assert.equal(download.status,200);assert.equal(download.headers.get('Content-Type'),'application/pdf');assert.match(download.headers.get('Cache-Control'),/no-store/);assert.deepEqual(Buffer.from(await download.arrayBuffer()),fixture);
assert.equal((await call('/atendimentos/')).status,302);assert.equal((await call('/atendimentos/',{headers:{'oai-authenticated-user-email':'other@example.test'}})).status,403);assert.equal((await call('/atendimentos/',{headers:staff})).status,200);
assert.equal((await call('/api/solicitacoes/'+receipt.id,{method:'DELETE',headers:staff})).status,403);assert.equal((await call('/api/solicitacoes/'+receipt.id,{method:'DELETE',headers:{...staff,...headers}})).status,200);assert.equal((await call(url,{headers:staff})).status,404);
for(let i=0;i<7;i++)assert.equal((await call('/api/solicitacoes',{method:'POST',headers,body:data()})).status,201);assert.equal((await call('/api/solicitacoes',{method:'POST',headers,body:data()})).status,429);
await Promise.all(pending);
const report={date:'2026-11-19',passed:true,checks:['real bytes stored and downloaded','file linked to observations','PDF signature and size validation','consent required','same-origin and signed token required','no anonymous or non-staff reads','staff-only portal and downloads','confirmed removal','rate limit enforced'],usesPatientData:false};await fs.writeFile('audit/intake-checks.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
