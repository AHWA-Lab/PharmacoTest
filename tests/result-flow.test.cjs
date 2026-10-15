const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
function boot({search='',storage=new Map(),rows=null}={}){
 const elements={},records=[];
 const node=()=>({style:{},attrs:{},setAttribute(k,v){this.attrs[k]=v},getAttribute(k){return this.attrs[k]},getBoundingClientRect(){return {left:20,bottom:100}},showModal(){this.open=true},close(){this.open=false;this.onclose?.()}});
 const choices=[0,1].map(p=>Object.assign(node(),{getAttribute(){return String(p)}}));
 const feedback=[node(),node()];
 const app={innerHTML:'',querySelectorAll(selector){return selector==='.choice'?choices:selector==='.feedback button'?feedback:[]}};elements.app=app;
 const api={id:()=> 'test-run-id',record:(...r)=>{records.push(r);return Promise.resolve(true)},status:()=>rows?'ready':'unconfigured',refresh:()=>Promise.resolve(rows)};
 vm.runInNewContext(source,{document:{getElementById(id){return elements[id] ||= node()}},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},location:{origin:'https://example.com',pathname:'/',search},URLSearchParams,navigator:{},history:{replaceState(){}},setTimeout,window:{PharmacoStats:api,scrollTo(){},innerWidth:390,innerHeight:844}});
 return {app,elements,records,choices,feedback,storage};
}
const settle=()=>new Promise(resolve=>setImmediate(resolve));
test('only quiz completion records a result; votes replace it and returning does not recount',async()=>{
 const b=boot();b.elements.go.onclick();for(let i=0;i<16;i++)b.choices[0].onclick();
 assert.equal(b.records.length,1);const code=b.records[0][1];assert.equal(b.storage.get('pharmaco-last-type'),code);
 b.feedback[0].onclick();await settle();assert.equal(b.records.at(-1)[2],1);
 b.feedback[1].onclick();await settle();assert.equal(b.records.at(-1)[2],-1);
 b.elements['nav-types'].onclick();await settle();assert.equal((b.app.innerHTML.match(/last-result/g)||[]).length,1);
 b.elements['nav-result'].onclick();assert.equal(b.feedback[1].attrs['aria-pressed'],'true');assert.equal(b.records.length,3);
 b.elements['nav-stats'].onclick();await settle();assert.equal((b.app.innerHTML.match(/last-result/g)||[]).length,1);assert.equal((b.app.innerHTML.match(/data-satisfaction=/g)||[]).length,16);
 b.elements['nav-result'].onclick();assert.equal(b.records.length,3);
});
test('shared result is remembered but does not count or accept satisfaction votes',async()=>{
 const b=boot({search:'?type=ISFP'});assert.equal(b.storage.get('pharmaco-last-type'),'ISFP');assert(b.feedback[0].disabled);
 b.feedback[0].onclick();b.elements['nav-stats'].onclick();await settle();assert.equal(b.records.length,0);assert(b.app.innerHTML.includes('stats-icon last-result" data-code="ISFP'));
});
test('server results populate count ratios and satisfaction consistently in both views',async()=>{
 const b=boot({search:'?type=ESTJ',rows:[{code:'ESTJ',result_count:3,up_count:2,down_count:1},{code:'INFP',result_count:1,up_count:0,down_count:0}]});
 b.elements['nav-stats'].onclick();await settle();assert(b.app.innerHTML.includes('75.0% · 3건'));assert(b.app.innerHTML.includes('만족도 67% · 불만족 33%'));
 b.elements['nav-result'].onclick();b.elements['nav-types'].onclick();await settle();assert(b.app.innerHTML.includes('만족도 67% · 불만족 33%'));assert(b.app.innerHTML.includes('만족도: 집계 전'));
});
test('last result marker survives a new page load with the same browser storage',async()=>{
 const storage=new Map([['pharmaco-last-type','INFJ']]);const b=boot({storage});
 // The start page does not overwrite the cache; result viewing updates it.
 assert.equal(storage.get('pharmaco-last-type'),'INFJ');
 const c=boot({search:'?type=ISTP',storage});c.elements['nav-types'].onclick();await settle();assert(c.app.innerHTML.includes('type-icon last-result" data-code="ISTP'));
});

test('all four screens have the same four navigation buttons in order',async()=>{
 const b=boot();
 function check(){
   const nav=b.app.innerHTML.match(/<nav class="bottom-nav"[\s\S]*?<\/nav>/)[0];
   assert.deepEqual([...nav.matchAll(/>(다시하기|결과보기|전체보기|통계보기)<\/button>/g)].map(x=>x[1]),['다시하기','결과보기','전체보기','통계보기']);
 }
 check();b.elements['nav-types'].onclick();await settle();check();b.elements['nav-stats'].onclick();await settle();check();
 b.elements['nav-restart'].onclick();for(let i=0;i<16;i++)b.choices[0].onclick();check();
});
test('saved result and vote can be opened after page reload without recounting',async()=>{
 const storage=new Map(),b=boot({storage});b.elements.go.onclick();for(let i=0;i<16;i++)b.choices[0].onclick();b.feedback[0].onclick();await settle();
 const c=boot({storage});c.elements['nav-result'].onclick();assert.equal(c.records.length,0);assert.equal(c.feedback[0].attrs['aria-pressed'],'true');assert(c.app.innerHTML.includes('조제 완료'));
});
