const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const context={window:{},Intl,Date};for(const file of ['catalog.js','fortune-data.js'])vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),context);
const api=context.window.PharmacoFortune,profiles=context.window.PharmacoCatalog.profiles;
test('date maps to one stable card and all 50 cards occur within a 50-day block',()=>{
 const start=Math.floor(Math.floor(Date.UTC(2026,9,15)/86400000)/50)*50,seen=new Set();
 for(let i=0;i<50;i++){const date=new Date((start+i)*86400000).toISOString().slice(0,10),a=api.daily(date),b=api.daily(date);assert.equal(JSON.stringify(a),JSON.stringify(b));seen.add(a.profile.id);assert.equal(a.paragraphs.length,2);assert.equal(Object.keys(a.hints).length,7);assert(!a.paragraphs.some(t=>a.profile.paragraphs.includes(t)))}assert.equal(seen.size,50);
});
test('daily lucky and unlucky casts cover four systems and never overlap',()=>{
 for(let day=1;day<=30;day++){const r=api.daily('2026-10-'+String(day).padStart(2,'0'));assert.equal(r.lucky.length,4);assert.equal(r.unlucky.length,4);assert.equal(new Set(r.lucky.map(p=>p.test)).size,4);assert.equal(new Set([...r.lucky,...r.unlucky].map(p=>p.id)).size,8);assert(!r.unlucky.some(p=>p.id===r.profile.id));assert(r.keywords.length===3)}
});
test('all 50 profiles have a dedicated fortune and retain unique identities',()=>{
 const seen=new Set();for(let day=0;day<120;day++){const r=api.daily(new Date(Date.UTC(2026,0,1+day)).toISOString().slice(0,10));assert(r.energy&&r.caution);assert(r.paragraphs[0].length>40);assert(profiles.some(p=>p.id===r.profile.id));seen.add(r.profile.id)}assert.equal(seen.size,50);
});
