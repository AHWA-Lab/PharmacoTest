(function () {
  'use strict';
  var profiles = window.PharmacoCatalog.profiles, tests = window.PharmacoTests, service = window.PharmacoStats;
  var testNames = { mbti: '약침MBTI', fortune: '오늘의 운세' };
  Object.keys(tests).forEach(function (id) { testNames[id] = tests[id].title; });
  var sorts = [['popular', '인기순'], ['up', '👍 많은 순'], ['ratio', '만족도순'], ['count', '등장 많은 순']];
  var active = 'popular', rows = null;
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function art(p) { return '<div class="character" style="background-image:url(../assets/characters-' + p.sheet + '.png);background-size:' + (p.columns * 100) + '% ' + (p.rows * 100) + '%;background-position:' + (p.pos[0] * 100 / (p.columns - 1)) + '% ' + (p.pos[1] * 100 / (p.rows - 1)) + '%"></div>'; }
  // 이 캐릭터가 결과로 등장하는 모든 테스트와 결과 이름.
  var appearances = {};
  profiles.forEach(function (p) { appearances[p.id] = []; if (p.test === 'mbti') appearances[p.id].push(['mbti', p.resultCode]); });
  Object.keys(tests).forEach(function (id) { tests[id].results.forEach(function (r) { appearances[r.profile.id].push([id, r.label]); }); });
  // 이 브라우저에서 내가 남긴 평가(마지막 결과 기준).
  var mine = {};
  function remember(profileId, vote) { if (profileId && (vote === 1 || vote === -1)) mine[profileId] = vote; }
  try {
    var mbti = JSON.parse(localStorage.getItem('pharmaco-last-result') || 'null');
    if (mbti) { var m = profiles.find(function (p) { return p.test === 'mbti' && p.resultCode === mbti.code; }); if (m) remember(m.id, mbti.vote); }
    Object.keys(tests).forEach(function (id) {
      var saved = JSON.parse(localStorage.getItem('pharmaco-result-' + id) || 'null');
      var r = saved && tests[id].results.find(function (x) { return x.id === saved.type; });
      if (r) remember(r.profile.id, saved.vote);
    });
  } catch (error) {}
  function wilson(up, n) {
    if (!n) return -1;
    var z = 1.96, p = up / n;
    return (p + z * z / (2 * n) - z * Math.sqrt((p * (1 - p) + z * z / (4 * n)) / n)) / (1 + z * z / n);
  }
  function entries() {
    var byId = {};
    (rows || []).forEach(function (r) { byId[r.profile_id] = r; });
    return profiles.map(function (p) {
      var r = byId[p.id] || {}, up = Number(r.up_count) || 0, down = Number(r.down_count) || 0, count = Number(r.result_count) || 0, n = up + down;
      return { p: p, up: up, down: down, count: count, n: n, ratio: n ? up / n : -1, score: wilson(up, n) };
    });
  }
  function key(e) { return active === 'up' ? [e.up, e.score, e.count] : active === 'ratio' ? [e.ratio, e.n, e.count] : active === 'count' ? [e.count, e.score, e.up] : [e.score, e.up, e.count]; }
  function ranked() {
    var list = entries().sort(function (a, b) { var x = key(a), y = key(b); for (var i = 0; i < x.length; i++) if (y[i] !== x[i]) return y[i] - x[i]; return a.p.id.localeCompare(b.p.id); });
    var rank = 0;
    list.forEach(function (e, i) {
      var empty = active === 'count' ? !e.count : !e.n;
      if (!i || key(e)[0] !== key(list[i - 1])[0] || key(e)[1] !== key(list[i - 1])[1]) rank = i + 1;
      e.rank = empty ? null : rank;
    });
    return list;
  }
  function bar(e) {
    var percent = e.n ? Math.round(e.up / e.n * 100) : null, width = percent === null ? 50 : percent;
    return '<div class="satisfaction-bar' + (percent === null ? ' no-data' : '') + '" role="img" aria-label="' + (percent === null ? '만족도 집계 전' : '만족도 ' + percent + '%') + '"><span class="positive" style="width:' + width + '%"></span><span class="negative" style="width:' + (100 - width) + '%"></span></div>';
  }
  function chips(p) { return '<span class="rank-tests">' + appearances[p.id].map(function (a) { return '<span>' + esc(testNames[a[0]]) + ' · ' + esc(a[1]) + '</span>'; }).join('') + '</span>'; }
  function numbers(e) {
    return '<span class="rank-votes"><b>👍 ' + e.up.toLocaleString('ko-KR') + '</b><b>👎 ' + e.down.toLocaleString('ko-KR') + '</b><small>' + (e.n ? '만족도 ' + Math.round(e.up / e.n * 100) + '%' : '평가 전') + ' · 결과 ' + e.count.toLocaleString('ko-KR') + '건</small></span>';
  }
  function mark(p) { return mine[p.id] ? '<span class="rank-mine">' + (mine[p.id] === 1 ? '내가 👍' : '내가 👎') + '</span>' : ''; }
  function render() {
    var list = ranked(), podium = rows ? list.filter(function (e) { return e.rank !== null; }).slice(0, 3) : [];
    var podiumIds = podium.map(function (e) { return e.p.id; });
    document.getElementById('rank-podium').innerHTML = podium.map(function (e) {
      return '<li class="podium-card podium-' + e.rank + '"><span class="podium-medal" aria-label="' + e.rank + '위">' + ['🥇', '🥈', '🥉'][e.rank - 1] + '</span><button type="button" class="rank-icon" data-profile="' + e.p.id + '" aria-label="' + esc(e.p.displayName) + ' 상세 보기">' + art(e.p) + '</button><h2>' + esc(e.p.nick) + '</h2><p class="cat">' + esc(e.p.displayName) + '</p>' + mark(e.p) + numbers(e) + bar(e) + '</li>';
    }).join('');
    document.getElementById('rank-list').innerHTML = list.filter(function (e) { return podiumIds.indexOf(e.p.id) === -1; }).map(function (e) {
      return '<li class="rank-row' + (mine[e.p.id] ? ' is-mine' : '') + '"><span class="rank-no">' + (e.rank === null ? '–' : e.rank) + '</span><button type="button" class="rank-icon" data-profile="' + e.p.id + '" aria-label="' + esc(e.p.displayName) + ' 상세 보기">' + art(e.p) + '</button><div class="rank-body"><h2>' + esc(e.p.nick) + ' ' + mark(e.p) + '</h2><p class="cat">' + esc(e.p.displayName) + '</p>' + chips(e.p) + '</div><div class="rank-score">' + numbers(e) + bar(e) + '</div></li>';
    }).join('');
    document.querySelectorAll('[data-profile]').forEach(function (b) { b.onclick = function () { open(b.dataset.profile); }; });
  }
  function open(id) {
    var p = profiles.find(function (x) { return x.id === id; });
    document.getElementById('dialog-content').innerHTML = '<div class="character-frame">' + art(p) + '</div><h2 id="dialog-name">' + esc(p.displayName) + '</h2><div class="type-row"><span class="nick">' + esc(p.nick) + '</span></div><p>' + esc(p.core) + '</p>' + chips(p) + '<div class="type-description">' + p.paragraphs.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div>';
    document.getElementById('type-dialog').showModal();
  }
  document.getElementById('dialog-close').onclick = function () { document.getElementById('type-dialog').close(); };
  var sortBox = document.getElementById('rank-sorts');
  sortBox.innerHTML = sorts.map(function (s) { return '<button type="button" class="dex-filter" data-sort="' + s[0] + '" aria-pressed="' + (s[0] === active) + '">' + s[1] + '</button>'; }).join('');
  sortBox.querySelectorAll('button').forEach(function (b) { b.onclick = function () { active = b.dataset.sort; sortBox.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); render(); }; });
  var status = document.getElementById('rank-status');
  function notice() {
    var s = service.status();
    if (s === 'unconfigured') return '공용 통계 연결 전이라 순위를 집계하지 못했어요. 지금은 캐릭터 목록만 보여드려요.';
    if (s === 'error') return '공용 통계를 불러오지 못했습니다. 잠시 후 다시 들어와 주세요.';
    if (!rows) return '순위를 불러오는 중…';
    var total = rows.reduce(function (n, r) { return n + Number(r.up_count) + Number(r.down_count); }, 0);
    return '지금까지 모인 평가 ' + total.toLocaleString('ko-KR') + '개' + (s === 'pending' ? ' · 일부 평가가 전송을 기다리고 있어요.' : '');
  }
  status.textContent = notice(); render();
  Promise.resolve(service.characters()).then(function (data) { if (data) rows = data; status.textContent = notice(); render(); });
})();
