const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {JSDOM}=require('jsdom');
const root=path.join(__dirname,'..');
function boot(route, storage=new Map(), connected=false){
 const file=path.join(root,route,'index.html');
 const dom=new JSDOM(fs.readFileSync(file,'utf8'),{url:'https://example.com/PharmacoTest/'+route+'/',runScripts:'outside-only',pretendToBeVisual:true});
 const w=dom.window,requests=[];let now=0,nextId=0;const timers=new Map();
 w.scrollTo=()=>{};w.Date.now=()=>now;w.setInterval=fn=>{const id=++nextId;timers.set(id,fn);return id};w.clearInterval=id=>timers.delete(id);
 Object.defineProperty(w.crypto,'randomUUID',{value:()=>crypto.randomUUID()});
 for(const [k,v]of storage)w.localStorage.setItem(k,v);
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true};w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'))};
 w.fetch=async(url,options)=>{const body=JSON.parse(options.body);requests.push({url,body});let data;
  if(url.endsWith('pharmaco_test_stats'))data=[{code:w.PharmacoTests&&w.PharmacoTests[body.p_test]?w.PharmacoTests[body.p_test].results[0].id:'M01',result_count:3,up_count:2,down_count:1}];
  else if(url.endsWith('pharmaco_character_stats'))data=[{profile_id:'M21',result_count:9,up_count:7,down_count:1},{profile_id:'M05',result_count:4,up_count:4,down_count:0},{profile_id:'M02',result_count:3,up_count:1,down_count:2}];
  else if(url.endsWith('pharmaco_stats'))data=[{code:'ESTJ',result_count:3,up_count:2,down_count:1}];else data={saved:true};return {ok:true,json:async()=>data};
 };
 for(const script of [...w.document.scripts]){
  if(script.src){const name=new URL(script.src).pathname.replace('/PharmacoTest/','');w.eval(fs.readFileSync(path.join(root,name),'utf8'));if(name==='stats-config.js'&&connected)w.PHARMACO_STATS_CONFIG={url:'https://example.supabase.co',key:'test-public'}}
  else if(script.textContent.trim())w.eval(script.textContent);
 }
 return {w,dom,requests,q:s=>w.document.querySelector(s),all:s=>[...w.document.querySelectorAll(s)],click(s){const e=w.document.querySelector(s);assert(e,'Missing '+s);e.click()},advance(ms){now+=ms;[...timers.values()].forEach(f=>f())},store(){return new Map(Array.from({length:w.localStorage.length},(_,i)=>{const k=w.localStorage.key(i);return[k,w.localStorage.getItem(k)]}))},timerCount:()=>timers.size};
}
const settle=async()=>{for(let i=0;i<5;i++)await new Promise(r=>setImmediate(r))};
for(const [id,count,total]of [['dnd',12,9],['abo',12,8],['enneagram',15,9],['constitution',15,9],['ohaeng',15,5],['bigfive',15,10],['teto',15,4],['stress',15,4]])test(id+' complete game, saved result, all/stats, tooltips, modal and isolated RPC',async()=>{
 const b=boot(id,new Map(),true);
 try{
  assert(b.q('.time-notice').textContent.includes('10초'));assert.equal(b.all('.bottom-nav button').length,4);b.click('#game-go');
  b.advance(10000);assert.equal(b.all('.rack .skipped').length,1);b.click('#unknown');assert.equal(b.all('.rack .skipped').length,2);
  for(let i=2;i<count;i++)b.click('[data-choice="0"]');assert(b.q('.label'));assert.equal(b.timerCount(),0);assert.equal(b.all('.type-description p').length,2);
  b.click('[data-vote="1"]');await settle();assert(b.requests.some(r=>r.url.endsWith('pharmaco_record_test_result')&&r.body.p_test===id&&r.body.p_vote===1));
  const save=b.store();b.click('[data-nav="all"]');await settle();assert.equal(b.all('.type-tile').length,total);assert.equal(b.all('.type-tile.last-result').length,1);
  const icon=b.q('.type-icon');icon.dispatchEvent(new b.w.MouseEvent('pointermove',{bubbles:true,clientX:100,clientY:100}));assert(!b.q('#game-tooltip').textContent.includes('만족도'));assert(b.q('#game-tooltip').textContent.length>100);
  const bar=b.q('.satisfaction-bar');bar.dispatchEvent(new b.w.MouseEvent('pointermove',{bubbles:true,clientX:100,clientY:100}));assert(b.q('#game-tooltip').textContent.includes('만족도'));assert(b.q('#game-tooltip').textContent.length<50);
  icon.click();assert(b.q('#type-dialog').open);assert.equal(b.all('#type-dialog .type-description p').length,2);b.click('#dialog-close');assert(!b.q('#type-dialog').open);
  b.click('[data-nav="stats"]');await settle();assert.equal(b.all('.stats-row').length,total);assert.equal(b.all('.stats-avatar .satisfaction-bar').length,total);assert(b.q('.stats-list').textContent.includes('100.0% · 3건'));assert(b.requests.some(r=>r.url.endsWith('pharmaco_test_stats')&&r.body.p_test===id));
  const restored=boot(id,save);try{restored.click('[data-nav="result"]');assert(restored.q('.label'));assert.equal(restored.q('[data-vote="1"]').getAttribute('aria-pressed'),'true');}finally{restored.dom.window.close()}
 }finally{b.dom.window.close()}
});
test('MBTI still completes with catalog descriptions and common navigation',async()=>{
 const b=boot('mbti');try{b.click('#go');for(let i=0;i<16;i++)b.click('.choice[data-pick="0"]');assert.equal(b.q('.nick').textContent,'활력기관장');assert.equal(b.q('.vial-name').textContent,'삼기활력 약침');b.click('#nav-types');await settle();assert.equal(b.all('.type-tile').length,16);b.click('.type-tile.last-result .type-icon');assert(b.q('#type-dialog').open);b.click('#dialog-close');b.click('#nav-stats');await settle();assert.equal(b.all('.stats-row').length,16);}finally{b.dom.window.close()}
});
test('the encyclopedia lists 50 complete profiles, filters, searches and opens details',()=>{
 const b=boot('encyclopedia');try{
  assert.equal(b.all('.dex-card').length,50);assert.equal(b.all('.dex-prose p').length,100);
  b.click('[data-filter="dnd"]');assert.equal(b.all('.dex-card').length,9);b.click('[data-filter="all"]');
  b.q('#dex-search').value='연아';b.q('#dex-search').dispatchEvent(new b.w.Event('input'));assert.equal(b.all('.dex-card').length,2);
  b.click('.dex-icon');assert(b.q('#type-dialog').open);assert.equal(b.all('#dialog-content .type-description p').length,2);b.click('#dialog-close');assert(!b.q('#type-dialog').open);
  b.q('#dex-search').value='not-a-drug';b.q('#dex-search').dispatchEvent(new b.w.Event('input'));assert(b.q('.dex-empty'));
 }finally{b.dom.window.close()}
});
test('collection has ten playable entries plus encyclopedia, ranking and reserve links; local references exist',()=>{
 const doc=new JSDOM(fs.readFileSync(path.join(root,'index.html'),'utf8')).window.document;
 assert.equal(doc.querySelectorAll('.test-card').length,10);assert.deepEqual([...doc.querySelectorAll('.encyclopedia-link')].map(a=>a.getAttribute('href')),['encyclopedia/','ranking/','reserve/']);
 for(const a of doc.querySelectorAll('a[href]')){const href=a.getAttribute('href');if(!href.startsWith('http'))assert(fs.existsSync(path.join(root,href,'index.html')))}
});
test('fortune has no quiz, one-click reveal, eight mini characters and 50-card statistics',async()=>{
 const b=boot('fortune',new Map(),true);try{
  assert(b.q('#draw-fortune'));assert.equal(b.all('.choice').length,0);assert.equal(b.all('#countdown').length,0);
  b.click('#draw-fortune');assert(b.q('.fortune-result'));assert.equal(b.all('.fortune-mini').length,8);assert.equal(b.all('.fortune-cast-row.lucky .fortune-mini').length,4);assert.equal(b.all('.fortune-cast-row.unlucky .fortune-mini').length,4);assert.equal(b.all('.type-description').length,0);assert.equal(b.all('.fortune-hints dd').length,7);assert.equal(b.all('.confetti i').length,34);
  await settle();const count=b.requests.filter(r=>r.url.endsWith('pharmaco_record_test_result')).length;
  b.click('[data-vote="1"]');await settle();const voted=b.store();
  b.click('[data-nav="restart"]');b.click('#draw-fortune');await settle();assert.equal(b.requests.filter(r=>r.url.endsWith('pharmaco_record_test_result')).length,count+1);assert.equal(b.q('[data-vote="1"]').getAttribute('aria-pressed'),'true');
  b.click('[data-nav="all"]');await settle();assert.equal(b.all('.type-tile').length,50);assert.equal(b.all('.type-tile.last-result').length,1);b.click('.type-icon');assert(b.q('#type-dialog').open);assert.equal(b.all('#dialog-content .type-description').length,0);b.click('#dialog-close');
  b.click('[data-nav="stats"]');await settle();assert.equal(b.all('.stats-row').length,50);assert.equal(b.all('.stats-avatar .satisfaction-bar').length,50);
  const restored=boot('fortune',voted);try{restored.click('[data-nav="result"]');assert(restored.q('.fortune-result'));assert.equal(restored.q('[data-vote="1"]').getAttribute('aria-pressed'),'true')}finally{restored.dom.window.close()}
 }finally{b.dom.window.close()}
});

for(const route of ['mbti','abo','enneagram','dnd'])test(route+' result has selected traits and eight cross-test compatibility cards',()=>{
 const b=boot(route);try{
  b.click(route==='mbti'?'#go':'#game-go');for(let i=0;i<(route==='mbti'?16:route==='enneagram'?15:12);i++)b.click(route==='mbti'?'.choice[data-pick="0"]':'[data-choice="0"]');
  assert.equal(b.all('.result-traits td').length,route==='mbti'||route==='abo'?8:9);
  assert.equal(b.all('.result-traits .selected').length,route==='mbti'?4:1);
  assert(b.q('.result-traits').compareDocumentPosition(b.q('.type-description'))&b.w.Node.DOCUMENT_POSITION_FOLLOWING);
  const icons=b.all('[data-match]');assert.equal(icons.length,8);assert.equal(new Set(icons.map(x=>x.dataset.match)).size,8);
  const profile=b.w.PharmacoCatalog.profiles.find(p=>p.id===icons[0].dataset.match);
  icons[0].dispatchEvent(new b.w.MouseEvent('pointermove',{clientX:120,clientY:100}));assert(b.q('#match-tooltip').textContent.includes(profile.nick));assert(b.q('#match-tooltip').textContent.includes(profile.resultCode));
  for(const icon of icons){icon.click();assert(b.q('#match-dialog').open);assert.equal(b.all('#match-dialog .type-description p').length,2);assert(b.q('#match-name').textContent.includes('약침'));b.click('#match-dialog .dialog-close');assert(!b.q('#match-dialog').open);}
  for(const p of b.w.PharmacoCatalog.profiles.filter(p=>p.test!=='fortune')){
   const matches=b.w.PharmacoCompatibility.pairs(p);assert.equal(matches.length,4);assert.deepEqual([...matches.map(m=>m.group)].sort(),['abo','dnd','enneagram','mbti']);for(const m of matches){assert.equal(m.good.test,m.group);assert.equal(m.bad.test,m.group);assert.notEqual(m.good.id,m.bad.id);assert.notEqual(m.good.id,p.id);assert.notEqual(m.bad.id,p.id);}
  }
 }finally{b.dom.window.close()}
});
