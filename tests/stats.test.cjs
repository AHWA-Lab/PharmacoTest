const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../stats.js'), 'utf8');
function client({enabled = true, fetch, storage = new Map()} = {}) {
  const window = {PHARMACO_STATS_CONFIG: enabled ? {url:'https://example.supabase.co', key:'public-key'} : {}, addEventListener(){}};
  vm.runInNewContext(source, {window, crypto:require('node:crypto').webcrypto, fetch, AbortController, setTimeout, clearTimeout,
    localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)}});
  return {api:window.PharmacoStats,storage};
}
test('offline results survive reload and latest vote is sent once on reconnect', async () => {
  const storage = new Map();
  const offline=client({enabled:false,storage});
  const id=offline.api.id();
  await offline.api.record(id,'ESTJ',null);
  await offline.api.record(id,'ESTJ',1);
  const calls=[];
  const online=client({storage,fetch:async (url,options)=>{calls.push([url,JSON.parse(options.body)]);return {ok:true,json:async()=>url.endsWith('pharmaco_stats')?[]:{saved:true}}}});
  await online.api.refresh();
  assert.equal(calls.length,2);
  assert.deepEqual(calls[0][1],{p_id:id,p_code:'ESTJ',p_vote:1});
  assert.equal(storage.get('pharmaco-pending-results-v1'),'{}');
});
test('changing vote while request is in flight sends final choice without losing it', async () => {
  const calls=[];let release;
  const first=new Promise(resolve=>{release=resolve});
  const {api}=client({fetch:async (url,options)=>{calls.push(JSON.parse(options.body));if(calls.length===1)await first;return {ok:true,json:async()=>({saved:true})}}});
  const id=api.id();const sending=api.record(id,'INFP',null);
  api.record(id,'INFP',1);api.record(id,'INFP',-1);release();await sending;
  assert.deepEqual(calls.map(c=>c.p_vote),[null,-1]);
});
test('failed save remains queued and is retried with the same result ID', async () => {
  let fail=true;const calls=[];
  const {api,storage}=client({fetch:async (url,options)=>{calls.push(JSON.parse(options.body));return {ok:!fail,json:async()=>url.endsWith('pharmaco_stats')?[]:{saved:true}}}});
  const id=api.id();assert.equal(await api.record(id,'INTJ',1),false);
  assert.equal(api.status(),'error');assert(storage.get('pharmaco-pending-results-v1').includes(id));
  fail=false;await api.refresh();assert.equal(api.status(),'ready');assert.equal(calls[0].p_id,calls[1].p_id);
});
