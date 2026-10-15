(function () {
  'use strict';
  var groups = ['mbti','abo','enneagram','dnd'];
  var labels = {mbti:'MBTI',abo:'혈액형',enneagram:'에니어그램',dnd:'D&D성향'};
  // 창작 캐릭터의 추진력·온화함·자유로움·사색 성향. 의료적 궁합과 무관합니다.
  var vectors = {
    mbti:[[3,1,-3,-1],[3,0,3,-2],[1,3,-2,-1],[2,2,3,-2],[3,-1,-2,2],[2,-1,3,3],[2,3,-1,2],[2,2,3,2],[-1,0,-3,1],[0,-1,2,1],[-2,3,-2,0],[-1,2,3,1],[1,-2,-3,3],[-2,-1,2,3],[-2,3,-1,3],[-2,2,3,3]],
    abo:[[1,2,-3,1],[-2,2,-2,3],[3,0,3,0],[-1,2,2,2],[3,2,1,-1],[-1,3,-1,1],[1,0,3,3],[-2,0,-2,3]],
    enneagram:[[1,0,-3,2],[-1,3,-1,0],[3,0,-2,0],[-2,1,3,3],[-2,-1,1,3],[-1,2,-3,2],[2,2,3,0],[3,-2,1,1],[-2,3,0,1]],
    dnd:[[2,3,-3,1],[0,3,0,1],[2,3,3,0],[0,0,-3,2],[-1,1,0,2],[1,0,3,1],[3,-3,-3,2],[1,-3,0,3],[3,-3,3,0]],
    // 운세 전용 8종도 확장 테스트의 결과로 쓰이므로 궁합 계산용 성향을 둡니다.
    fortune:[[2,2,1,0],[0,3,0,1],[3,0,2,-1],[1,0,-3,1],[-3,1,0,2],[-1,1,0,3],[-2,2,1,2],[0,2,-1,1]]
  };
  var catalog = window.PharmacoCatalog;
  function esc(s) { return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function vector(p) { return vectors[p.test][Object.keys(catalog.byTest[p.test]).indexOf(p.resultCode)]; }
  function distance(a,b) { return vector(a).reduce(function(n,v,i){return n+Math.pow(v-vector(b)[i],2);},0); }
  function pairs(profile) {
    return groups.map(function(group){
      var candidates=Object.values(catalog.byTest[group]).filter(function(p){return p.id!==profile.id;});
      candidates.sort(function(a,b){return distance(profile,a)-distance(profile,b)||a.id.localeCompare(b.id);});
      return {group:group,good:candidates[0],bad:candidates[candidates.length-1]};
    });
  }
  function art(p) { return '<div class="character" style="background-image:url(../assets/characters-'+p.sheet+'.png);background-size:'+(p.columns*100)+'% '+(p.rows*100)+'%;background-position:'+(p.pos[0]*100/(p.columns-1))+'% '+(p.pos[1]*100/(p.rows-1))+'%"></div>'; }
  function markup(profile) {
    var matches=pairs(profile);
    return '<section class="compatibility" aria-label="약침 캐릭터 궁합">'+['good','bad'].map(function(kind){
      return '<h2>'+ (kind==='good'?'나와 맞는 약침타입':'나와 맞지 않는 약침타입')+'</h2><div class="compatibility-grid">'+matches.map(function(m){var p=m[kind];return '<div><button type="button" class="compatibility-icon" data-match="'+p.id+'" aria-label="'+esc(labels[m.group]+' '+p.resultCode+' '+p.displayName+' 상세 보기')+'">'+art(p)+'</button><small>'+labels[m.group]+'</small></div>';}).join('')+'</div>';
    }).join('')+'<p class="foot">캐릭터 성격을 바탕으로 만든 재미용 궁합입니다.</p><div class="satisfaction-tooltip" id="match-tooltip" role="tooltip" hidden></div><dialog class="type-dialog" id="match-dialog" aria-labelledby="match-name"><button type="button" class="dialog-close" aria-label="닫기">×</button><div class="match-dialog-content"></div></dialog></section>';
  }
  function bind(root) {
    var tip=root.querySelector('#match-tooltip'),dialog=root.querySelector('#match-dialog');
    root.querySelectorAll('[data-match]').forEach(function(button){
      var p=catalog.profiles.find(function(p){return p.id===button.dataset.match;});
      function show(x,y){tip.textContent=labels[p.test]+' '+p.resultCode+' · '+p.displayName+'\n'+p.nick+' · '+p.core;tip.hidden=false;tip.style.left=Math.max(8,Math.min(x,innerWidth-tip.offsetWidth-8))+'px';tip.style.top=Math.max(8,Math.min(y+18,innerHeight-tip.offsetHeight-8))+'px';}
      button.onpointermove=function(e){show(e.clientX,e.clientY);};
      button.onfocus=function(){var rect=button.getBoundingClientRect();show(rect.left,rect.bottom);};
      button.onpointerleave=button.onblur=function(){tip.hidden=true;};
      button.onclick=function(){tip.hidden=true;dialog.querySelector('.match-dialog-content').innerHTML='<div class="character-frame">'+art(p)+'</div><h2 id="match-name">'+esc(p.displayName)+'</h2><div class="type-row"><span class="nick">'+esc(p.nick)+'</span><span class="code">'+esc(labels[p.test]+' '+p.resultCode)+'</span></div><p>'+esc(p.core)+'</p><div class="type-description">'+p.paragraphs.map(function(t){return '<p>'+esc(t)+'</p>';}).join('')+'</div>';dialog.showModal();};
    });
    dialog.querySelector('.dialog-close').onclick=function(){dialog.close();};
    dialog.onclose=function(){tip.hidden=true;};
    dialog.onclick=function(e){if(e.target===dialog){var box=dialog.getBoundingClientRect();if(e.clientX<box.left||e.clientX>box.right||e.clientY<box.top||e.clientY>box.bottom)dialog.close();}};
  }

  function summary(group,code) {
    var rows, caption='내 성향 한눈에 보기';
    if(group==='mbti') rows=[['E · 외향','I · 내향'],['N · 직관','S · 감각'],['F · 감정','T · 사고'],['P · 인식','J · 판단']].map(function(row){return row.map(function(text){return {id:text[0],text:text,selected:code.indexOf(text[0])!==-1};});});
    if(group==='enneagram') rows=[[1,2,3],[4,5,6],[7,8,9]].map(function(row){return row.map(function(n){var names=['','개혁가','조력가','성취가','개성가','탐구가','충실가','낙천가','도전가','평화가'];return {id:'E'+n,text:n+'번 · '+names[n],selected:code==='E'+n};});});
    if(group==='dnd') {
      rows=[['LG','NG','CG'],['LN','TN','CN'],['LE','NE','CE']].map(function(row,i){return row.map(function(id,j){return {id:id,text:['질서','중립','혼돈'][j]+' '+['선','중립','악'][i],selected:code===id};});});
      caption='내 D&D 성향 · 가로: 질서–중립–혼돈 / 세로: 선–중립–악';
    }
    if(group==='abo') rows=[['A_POS','B_POS','O_POS','AB_POS'],['A_NEG','B_NEG','O_NEG','AB_NEG']].map(function(row){return row.map(function(id){return {id:id,text:id.replace('_POS','+').replace('_NEG','−'),selected:code===id};});});
    return '<table class="result-traits result-traits-'+group+'"><caption>'+caption+'</caption><tbody>'+rows.map(function(row){return '<tr>'+row.map(function(cell){return '<td'+(cell.selected?' class="selected" aria-current="true"':'')+'>'+esc(cell.text)+(cell.selected?'<span class="trait-check" aria-label="내 성향"> ✓</span>':'')+'</td>';}).join('')+'</tr>';}).join('')+'</tbody></table>';
  }
  window.PharmacoCompatibility={pairs:pairs,markup:markup,bind:bind,summary:summary};
})();
