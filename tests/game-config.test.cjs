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
for(const id of ['dnd','abo','enneagram'])test(id+' can reach every result and has valid question counts',()=>{
 const c=configs[id];assert.equal(c.questions.length,c.count);const found=new Set();
 for(let mask=0;mask<Math.pow(2,c.count)&&found.size<c.results.length;mask++){
  const answers=c.questions.map((_,i)=>(mask>>>i)&1);const r=c.score(answers,c.questions,'2026-10-15');assert(c.results.some(x=>x.id===r.id));found.add(r.id);
 }
 assert.equal(found.size,c.results.length);
});
