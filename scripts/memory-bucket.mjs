// R2-compatible in-memory adapter used only by tests and the loopback preview.
import {createHash} from 'node:crypto';
export class MemoryBucket{
 objects=new Map();
 async put(key,value,options={}){if(options.onlyIf?.etagDoesNotMatch==='*'&&this.objects.has(key))return null;const bytes=typeof value==='string'?Buffer.from(value):Buffer.from(value);const item={key,bytes:Buffer.from(bytes),size:bytes.length,etag:createHash('sha256').update(bytes).digest('hex'),httpMetadata:options.httpMetadata??{}};this.objects.set(key,item);return{key,size:item.size,etag:item.etag};}
 async get(key){const item=this.objects.get(key);if(!item)return null;return{key,size:item.size,etag:item.etag,httpMetadata:item.httpMetadata,body:Uint8Array.from(item.bytes),json:async()=>JSON.parse(item.bytes.toString('utf8')),arrayBuffer:async()=>Uint8Array.from(item.bytes).buffer};}
 async head(key){return this.get(key);}
 async delete(key){for(const item of Array.isArray(key)?key:[key])this.objects.delete(item);}
 async list({prefix='',delimiter,cursor,startAfter,limit=1000}={}){const all=[...this.objects.keys()].filter(key=>key.startsWith(prefix));const entries=[...new Set(all.map(key=>{const tail=key.slice(prefix.length);return delimiter&&tail.includes(delimiter)?prefix+tail.split(delimiter)[0]+delimiter:key;}))].sort().filter(key=>key>(cursor??startAfter??''));const picked=entries.slice(0,limit),truncated=entries.length>picked.length;return{objects:picked.filter(key=>!delimiter||!key.endsWith(delimiter)).map(key=>({key,size:this.objects.get(key)?.size??0})),delimitedPrefixes:picked.filter(key=>delimiter&&key.endsWith(delimiter)),truncated,cursor:truncated?picked.at(-1):undefined};}
}
