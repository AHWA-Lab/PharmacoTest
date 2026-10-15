(function () {
  'use strict';
  var catalog = window.PharmacoCatalog.profiles;
  var labels = { all: '전체', mbti: 'MBTI', dnd: 'D&D', abo: 'ABO±', enneagram: '에니어그램', fortune: '운세' };
  var active = 'all', query = '';
  var grid = document.getElementById('dex-grid');
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function icon(p) { return '<div class="character-frame" role="img" aria-label="' + esc(p.displayName + ' ' + p.nick) + '"><div class="character" style="background-image:url(../assets/characters-' + p.sheet + '.png);background-size:' + (p.columns * 100) + '% ' + (p.rows * 100) + '%;background-position:' + (p.pos[0] * 100 / (p.columns - 1)) + '% ' + (p.pos[1] * 100 / (p.rows - 1)) + '%"></div></div>'; }
  function prose(p) { return p.paragraphs.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join(''); }
  var filters = document.getElementById('dex-filters');
  filters.innerHTML = Object.keys(labels).map(function (id) { return '<button type="button" class="dex-filter" data-filter="' + id + '" aria-pressed="' + (id === active) + '">' + labels[id] + '</button>'; }).join('');
  filters.querySelectorAll('button').forEach(function (b) { b.onclick = function () { active = b.dataset.filter; filters.querySelectorAll('button').forEach(function (item) { item.setAttribute('aria-pressed', String(item === b)); }); render(); }; });
  document.getElementById('dex-search').oninput = function (event) { query = event.target.value.toLocaleLowerCase().trim(); render(); };
  var dialog = document.getElementById('type-dialog');
  document.getElementById('dialog-close').onclick = function () { dialog.close(); };
  function render() {
    var visible = catalog.filter(function (p) { return (active === 'all' || p.test === active) && (!query || [p.displayName,p.nick,p.core,p.category,p.ingredients.join(' ')].join(' ').toLocaleLowerCase().includes(query)); });
    document.getElementById('dex-count').textContent = visible.length + ' / 50종';
    grid.innerHTML = visible.length ? visible.map(function (p) {
      return '<article class="dex-card"><div class="dex-card-top"><button type="button" class="dex-icon" data-profile="' + p.id + '" aria-label="' + esc(p.displayName) + ' 상세 보기">' + icon(p) + '</button><div><span class="dex-tag">' + (p.test === 'fortune' ? '운세 전용' : labels[p.test] + ' · ' + esc(p.resultCode)) + '</span><h2>' + esc(p.displayName) + '</h2><strong class="dex-nick">' + esc(p.nick) + '</strong><p class="cat">' + esc(p.category) + '</p></div></div><p class="dex-core">' + esc(p.core) + '</p><div class="dex-prose">' + prose(p) + '</div><details class="dex-source"><summary>원료와 캐릭터 모티프</summary><p>구성: ' + esc(p.ingredients.join(', ')) + '</p><p>' + esc(p.materialReading) + '</p><p>' + (p.sourceStatus === 'PDF2024_ONLY' ? '2024 PDF에만 확인된 항목입니다. 현재 조제 여부를 확인한 것이 아닙니다.' : '2026 HWP 처방 구성 기준입니다.') + '</p>' + (p.sourceUrl ? '<a href="' + p.sourceUrl + '" target="_blank" rel="noopener noreferrer">AJAD 공개 소개 ↗</a>' : '') + '</details></article>';
    }).join('') : '<p class="dex-empty">일치하는 약침이 없어요. 다른 이름이나 원료로 찾아보세요.</p>';
    grid.querySelectorAll('[data-profile]').forEach(function (b) { b.onclick = function () {
      var p = catalog.find(function (item) { return item.id === b.dataset.profile; });
      document.getElementById('dialog-content').innerHTML = icon(p) + '<h2 id="dialog-name">' + esc(p.displayName) + '</h2><div class="type-row"><span class="nick">' + esc(p.nick) + '</span><span class="code">' + (p.test === 'fortune' ? '운세 전용' : labels[p.test] + ' · ' + esc(p.resultCode)) + '</span></div><p>' + esc(p.core) + '</p><div class="type-description">' + prose(p) + '</div>';
      dialog.showModal();
    }; });
  }
  render();
})();
