const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const {JSDOM}=require('jsdom');
const root=path.join(__dirname,'..'),context={window:{}};
for(const f of ['catalog.js','test-data.js','test-data-more.js'])vm.runInNewContext(fs.readFileSync(path.join(root,f),'utf8'),context);
const T=context.window.PharmacoTests,profiles=context.window.PharmacoCatalog.profiles;
const NEW=['constitution','ohaeng','bigfive','teto','stress'];
function seeded(seed){return()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648;};}

for(const id of NEW)test(id+' has a 60+ unique pool, valid results and an even 15-question draw',()=>{
 const c=T[id];assert.equal(c.count,15);assert(c.questions.length>=60,id+' pool '+c.questions.length);
 assert.equal(new Set(c.questions.map(q=>q.id)).size,c.questions.length);assert.equal(new Set(c.questions.map(q=>q.prompt)).size,c.questions.length);
 assert(c.questions.every(q=>q.prompt.length>5&&q.choices.length===2&&q.choices.every(x=>x.length>=4)&&q.choices[0]!==q.choices[1]));
 assert.equal(new Set(c.questions.flatMap(q=>q.choices)).size,c.questions.length*2,'choices are not reused');
 for(const r of c.results){assert(profiles.some(p=>p.id===r.profile.id));assert(r.info&&r.info.title&&r.info.text.length>30);assert(c.labels[r.id]);}
 const seen=new Set();
 for(let n=0;n<600;n++){
  const qs=c.selectQuestions();assert.equal(qs.length,15);assert.equal(new Set(qs.map(q=>q.id)).size,15);qs.forEach(q=>seen.add(q.id));
  const exposure={};qs.forEach(q=>(q.types||[q.axis]).forEach(t=>exposure[t]=(exposure[t]||0)+1));
  const counts=Object.values(exposure);assert(Math.max(...counts)-Math.min(...counts)<=1,id+' unbalanced '+JSON.stringify(exposure));
  if(c.questions[0].facet){for(const axis of new Set(qs.map(q=>q.axis))){const f={};qs.filter(q=>q.axis===axis).forEach(q=>f[q.facet]=(f[q.facet]||0)+1);const v=Object.values(f);assert.equal(Object.keys(f).length,4);assert(Math.max(...v)-Math.min(...v)<=1);}}
 }
 assert.equal(seen.size,c.questions.length,'every pool question can appear');
});

test('pair tests compare every type evenly and never repeat the same question',()=>{
 for(let n=0;n<300;n++){
  const o=T.ohaeng.selectQuestions(),e={};o.forEach(q=>q.types.forEach(t=>e[t]=(e[t]||0)+1));assert.equal(Object.values(e).join(),'6,6,6,6,6');
  const pairs={};o.forEach(q=>{const k=[...q.types].sort().join();pairs[k]=(pairs[k]||0)+1});assert.equal(Object.keys(pairs).length,10);assert(Object.values(pairs).every(v=>v===1||v===2));
  const c=T.constitution.selectQuestions(),x={};c.forEach(q=>q.types.forEach(t=>x[t]=(x[t]||0)+1));assert.equal(Object.values(x).sort().join(),'3,3,3,3,3,3,4,4,4');
  assert.equal(new Set(c.map(q=>[...q.types].sort().join())).size,15);
 }
});

for(const id of NEW)test(id+' can reach every result by answering consistently',()=>{
 const c=T[id],found=new Set(),random=seeded(7);
 for(let n=0;n<40;n++){
  const qs=c.selectQuestions(random);
  if(qs[0].types){for(const r of c.results){const a=qs.map(q=>q.types.indexOf(r.id)===-1?null:q.types.indexOf(r.id));const out=c.score(a,qs);assert.equal(out.id,r.id);found.add(out.id);}}
  else for(let mask=0;mask<64;mask++){
   const axes=[...new Set(c.questions.map(q=>q.axis))];
   const a=qs.map(q=>{const k=axes.indexOf(q.axis);return id==='bigfive'?(k===mask%5?(mask>=5&&mask<10?1:0):(Math.random()<0.5?0:1)):((mask>>k)&1);});
   if(id==='bigfive'){const t=axes[mask%5];const pole=mask>=5&&mask<10?1:0;qs.forEach((q,i)=>{if(q.axis!==t)a[i]=i%2;});const out=c.score(a,qs);if(out.id.startsWith(t))assert.equal(out.id,t+(pole?'_L':'_H'));found.add(out.id);}
   else{const out=c.score(a,qs);assert(c.results.some(r=>r.id===out.id));found.add(out.id);}
  }
 }
 if(id==='bigfive')for(const r of c.results){const qs=c.selectQuestions(random),t=r.id[0],pole=r.id.endsWith('_L')?1:0;const a=qs.map((q,i)=>q.axis===t?pole:i%2?null:0);
  // 나머지 차원은 한쪽 응답 + 무응답이 섞여 평균이 1이 될 수 있으므로, 대상 차원만 남기고 모두 무응답 처리합니다.
  const only=qs.map((q,i)=>q.axis===t?pole:null);assert.equal(c.score(only,qs).id,r.id);found.add(r.id);}
 assert.equal(found.size,c.results.length);
});

test('axis scoring breaks ties with the most recent answer and reports percentages',()=>{
 const qs=[{axis:'outer'},{axis:'outer'},{axis:'inner'},{axis:'inner'}];
 assert.equal(T.teto.score([0,1,1,0],qs).id,'ET');assert.equal(T.teto.score([1,0,0,1],qs).id,'TE');
 assert.equal(JSON.stringify(T.teto.score([0,0,1,null],qs).scores),JSON.stringify({outer:100,inner:0}));
 const s=[{axis:'load'},{axis:'load'},{axis:'load'},{axis:'recover'}];assert.equal(T.stress.score([0,0,1,1],s).id,'HL');
});

test('stress self-check shows a 109 safety note and never stores raw answers',()=>{
 assert(T.stress.safety.includes('109'));assert(T.stress.note.includes('진단'));
 const qs=T.stress.selectQuestions();const out=T.stress.score(qs.map(()=>0),qs);assert.equal(Object.keys(out.scores).sort().join(),'load,recover');
});

test('schema maps every test result to a catalog character for the ranking',()=>{
 const sql=fs.readFileSync(path.join(root,'supabase/schema.sql'),'utf8');
 const {rows}=require('../scripts/schema-character-map.cjs');
 for(const [t,code,pid] of rows)assert(sql.includes("('"+t+"','"+code+"','"+pid+"')"),'missing map '+t+':'+code);
 for(const id of NEW)for(const r of T[id].results)assert(sql.includes("('"+id+"','"+r.id+"')"),'missing type '+id+':'+r.id);
 assert(sql.includes('function public.pharmaco_character_stats()'));assert(sql.includes('grant execute on function public.pharmaco_character_stats() to anon'));
 assert.equal(new Set(rows.map(r=>r[2])).size,50);
});

const pages=['mbti','dnd','abo','enneagram','fortune','encyclopedia','constitution','ohaeng','bigfive','teto','stress','ranking','reserve'];
test('every sub page has the 약침 테스트 모음 home badge linking to the hub',()=>{
 for(const p of pages){const doc=new JSDOM(fs.readFileSync(path.join(root,p,'index.html'),'utf8')).window.document;const a=doc.querySelector('header .home-badge');
  assert(a,p);assert.equal(a.getAttribute('href'),'../');assert.equal(a.textContent.trim(),'약침 테스트 모음');assert(a.querySelector('svg'));}
});

function load(route,connected){
 const dom=new JSDOM(fs.readFileSync(path.join(root,route,'index.html'),'utf8'),{url:'https://example.com/PharmacoTest/'+route+'/',runScripts:'outside-only',pretendToBeVisual:true});
 const w=dom.window,calls=[];w.HTMLDialogElement.prototype.showModal=function(){this.open=true};w.HTMLDialogElement.prototype.close=function(){this.open=false};
 Object.defineProperty(w.crypto,'randomUUID',{value:()=>crypto.randomUUID()});
 w.fetch=async(url)=>{calls.push(url);return {ok:true,json:async()=>[{profile_id:'M21',result_count:9,up_count:7,down_count:1},{profile_id:'M05',result_count:4,up_count:4,down_count:0},{profile_id:'M02',result_count:30,up_count:1,down_count:2}]};};
 for(const s of [...w.document.scripts]){const name=new URL(s.src).pathname.replace('/PharmacoTest/','');w.eval(fs.readFileSync(path.join(root,name),'utf8'));if(name==='stats-config.js'&&connected)w.PHARMACO_STATS_CONFIG={url:'https://x.supabase.co',key:'k'};}
 return {w,dom,calls,q:s=>w.document.querySelector(s),all:s=>[...w.document.querySelectorAll(s)]};
}
const settle=async()=>{for(let i=0;i<5;i++)await new Promise(r=>setImmediate(r))};
test('ranking orders characters by Wilson score and supports other sorts',async()=>{
 const b=load('ranking',true);try{
  await settle();assert(b.calls.some(u=>u.endsWith('pharmaco_character_stats')));
  assert.equal(b.all('.podium-card').length,3);assert.equal(b.all('.podium-card').length+b.all('.rank-row').length,50);
  assert(b.q('.podium-1').textContent.includes('중용관리인'),'7/8 beats 4/4 on the Wilson lower bound');
  b.q('[data-sort="ratio"]').click();assert(b.q('.podium-1').textContent.includes('흐름전략가'));
  b.q('[data-sort="count"]').click();assert(b.q('.podium-1').textContent.includes('매듭돌파자'));
  assert(b.q('#rank-status').textContent.includes('15개'));
  b.q('.rank-row [data-profile]').click();assert(b.q('#type-dialog').open);
 }finally{b.dom.window.close()}
 const offline=load('ranking',false);try{await settle();assert.equal(offline.all('.podium-card').length,0);assert.equal(offline.all('.rank-row').length,50);assert(offline.q('#rank-status').textContent.includes('연결 전'));}finally{offline.dom.window.close()}
});

test('reserve archive shows 100 unique unused characters with art, filters and details',()=>{
 const b=load('reserve');try{
  const data=b.w.PharmacoReserve;assert.equal(data.length,100);
  assert.equal(new Set(data.map(c=>c.animal)).size,100);assert.equal(new Set(data.map(c=>c.nick)).size,100);
  const used=new Set(profiles.map(p=>p.nick));assert(!data.some(c=>used.has(c.nick)));
  const combos=new Set(data.map(c=>[c.outfit,c.hat,c.palette.name,c.theme].join()));assert.equal(combos.size,100);
  assert.equal(b.all('.reserve-card').length,100);assert.equal(b.all('.reserve-card svg').length,100);
  b.q('#group-filters [data-key="myth"]').click();assert.equal(b.all('.reserve-card').length,4);
  b.q('#group-filters [data-key="all"]').click();b.q('#dex-search').value='감초';b.q('#dex-search').dispatchEvent(new b.w.Event('input'));
  assert.equal(b.all('.reserve-card').length,data.filter(c=>c.herb==='감초').length);
  b.q('.reserve-art').click();assert(b.q('#type-dialog').open);assert.equal(b.all('.reserve-facts > div').length,10);
  const prompts=JSON.parse(fs.readFileSync(path.join(root,'research/reserve-character-prompts.json'),'utf8'));assert.equal(prompts.characters.length,100);assert.equal(prompts.sheets.length,10);
 }finally{b.dom.window.close()}
});

test('every result of every quiz renders its result card, traits and compatibility without errors',()=>{
 for(const id of ['dnd','abo','enneagram','constitution','ohaeng','bigfive','teto','stress'])for(const r of T[id].results){
  const dom=new JSDOM(fs.readFileSync(path.join(root,id,'index.html'),'utf8'),{url:'https://example.com/PharmacoTest/'+id+'/?type='+r.id,runScripts:'outside-only',pretendToBeVisual:true});
  const w=dom.window;w.scrollTo=()=>{};const errors=[];w.addEventListener('error',e=>errors.push(e.message));
  try{
   for(const s of [...w.document.scripts]){const name=new URL(s.src).pathname.replace('/PharmacoTest/','');w.eval(fs.readFileSync(path.join(root,name),'utf8'));}
   const q=s=>w.document.querySelector(s);
   assert(q('.label'),id+':'+r.id+' result card');assert.equal(q('.vial-name').textContent,r.name);
   assert.equal(w.document.querySelectorAll('[data-match]').length,8,id+':'+r.id+' compatibility');
   assert(w.document.querySelectorAll('.result-traits .selected').length>=1,id+':'+r.id+' traits');assert.equal(errors.length,0,errors.join());
  }finally{w.close()}
 }
});

test('every page loads local scripts and styles with one shared cache-busting version',()=>{
 const versions=new Set();
 for(const p of ['index.html',...pages.map(x=>x+'/index.html')]){const doc=new JSDOM(fs.readFileSync(path.join(root,p),'utf8')).window.document;
  for(const e of doc.querySelectorAll('script[src],link[rel="stylesheet"]')){const u=e.getAttribute('src')||e.getAttribute('href');if(/^https?:/.test(u))continue;const m=u.match(/\?v=(\w+)$/);assert(m,p+' '+u+' has no version');versions.add(m[1]);}}
 assert.equal(versions.size,1);
});
