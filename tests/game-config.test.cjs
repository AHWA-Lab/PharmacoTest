const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..'),context={window:{}};
for(const f of ['catalog.js','test-data.js'])vm.runInNewContext(fs.readFileSync(path.join(root,f),'utf8'),context);
const configs=context.window.PharmacoTests,profiles=context.window.PharmacoCatalog.profiles;
test('all 50 drugs are assigned once across five tests with unique character directions',()=>{
 assert.equal(profiles.length,50);assert.equal(new Set(profiles.map(p=>p.sourceName)).size,50);
 assert.equal(new Set(profiles.map(p=>p.nick)).size,50);assert.equal(new Set(profiles.map(p=>p.art.prop)).size,50);
 for(const [id,count] of Object.entries({mbti:16,dnd:9,abo:8,enneagram:9,fortune:8})){
  const group=profiles.filter(p=>p.test===id);assert.equal(group.length,count);
  assert(fs.existsSync(path.join(root,'assets/characters-'+id+'.png')));
  for(const p of group){assert(p.paragraphs.length===2);assert(p.ingredients.length>0);assert(p.sources.length>0);assert(p.pos[0]<p.columns&&p.pos[1]<p.rows)}
 }
});
for(const id of ['dnd','abo'])test(id+' can reach every result and has valid question counts',()=>{
 const c=configs[id],qs=c.selectQuestions?c.selectQuestions():c.questions;assert.equal(qs.length,c.count);const found=new Set();
 for(let mask=0;mask<Math.pow(2,c.count)&&found.size<c.results.length;mask++){
  const answers=qs.map((_,i)=>(mask>>>i)&1);const r=c.score(answers,qs,'2026-10-15');assert(c.results.some(x=>x.id===r.id));found.add(r.id);
 }
 assert.equal(found.size,c.results.length);
});
test('dnd draws 6 order and 6 care questions from 62 unique situations',()=>{
 const c=configs.dnd;assert.equal(c.questions.length,62);assert.equal(new Set(c.questions.map(q=>q.prompt)).size,62);
 assert(c.questions.every(q=>q.prompt.length>12&&q.choices.length===2&&q.choices[0]!==q.choices[1]));
 assert.equal(c.questions.filter(q=>q.axis==='order').length,31);assert(c.lead.includes('동료'));const seen=new Set();
 for(let n=0;n<400;n++){const qs=c.selectQuestions();assert.equal(new Set(qs.map(q=>q.id)).size,12);assert.equal(qs.filter(q=>q.axis==='order').length,6);qs.forEach(q=>seen.add(q.id));}
 assert.equal(seen.size,62);
});

test('enneagram has 50 original shared-situation pairs and draws 15 balanced unique comparisons',()=>{
 const c=configs.enneagram;assert.equal(c.count,15);assert.equal(c.questions.length,50);
 assert.equal(new Set(c.questions.map(q=>q.id)).size,50);assert.equal(new Set(c.questions.map(q=>q.prompt)).size,50);
 const pairs=new Set();for(const q of c.questions){assert(q.prompt.length>10);assert.equal(q.choices.length,2);assert(q.choices.every(x=>x.length>12));assert.notEqual(q.choices[0],q.choices[1]);assert.notEqual(q.types[0],q.types[1]);pairs.add([...q.types].sort().join(':'));}
 assert.equal(pairs.size,36);const selections=new Set(),seen=new Set();
 for(let n=0;n<500;n++){
  const qs=c.selectQuestions();assert.equal(qs.length,15);assert.equal(new Set(qs.map(q=>q.id)).size,15);assert.equal(new Set(qs.map(q=>[...q.types].sort().join(':'))).size,15);
  const counts={};qs.forEach(q=>{seen.add(q.id);q.types.forEach(t=>counts[t]=(counts[t]||0)+1)});
  assert.equal(Object.keys(counts).length,9);assert.equal(Object.values(counts).filter(n=>n===4).length,3);assert.equal(Object.values(counts).filter(n=>n===3).length,6);selections.add(qs.map(q=>q.id).join(','));
  for(let target=1;target<=9;target++){
   const id='E'+target,answers=qs.map(q=>q.types.includes(id)?q.types.indexOf(id):null);assert.equal(c.score(answers,qs).id,id);
  }
 }
 assert(selections.size>490);assert.equal(seen.size,50);
});
test('enneagram scoring compensates for comparison opportunities and excludes unknowns',()=>{
 const c=configs.enneagram;
 const qs=[...Array.from({length:4},()=>({types:['E1','E2']})),...Array.from({length:3},()=>({types:['E3','E2']}))];
 // E1 wins 3/4 while E2 wins 4/7: raw win totals would incorrectly favor E2.
 const result=c.score([0,0,0,1,1,1,1],qs);assert.equal(result.id,'E1');
 const skipped=c.score([null,null,null,1,null,null,null],qs);assert.equal(skipped.id,'E2');
});
