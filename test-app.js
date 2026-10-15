(function () {
  'use strict';
  var config = window.PharmacoTests[document.body.dataset.test];
  var app = document.getElementById('app');
  var service = window.PharmacoStats;
  var storageKey = 'pharmaco-result-' + config.id;
  var results = {}, saved = null, game = null, timer = null, deadline = 0, version = 0;
  var statistics = null, view = 'start';
  config.results.forEach(function (r) { results[r.id] = r; });
  try {
    var cached = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (cached && results[cached.type]) saved = cached;
  } catch (error) {}
  document.title = config.title + ' · 약침 테스트 모음';
  document.getElementById('collection-name').textContent = config.title;
  function escape(text) { return String(text).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function dateKey() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function persist() { try { localStorage.setItem(storageKey, JSON.stringify(saved)); } catch (error) {} }
  function stop() { if (timer !== null) clearInterval(timer); timer = null; }
  function shuffle(items) {
    var copy = items.slice();
    for (var i = copy.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), item = copy[i]; copy[i] = copy[j]; copy[j] = item; }
    return copy;
  }
  function character(r, extra) {
    return '<div class="character-frame ' + (extra || '') + '" role="img" aria-label="' + escape(r.name + ' ' + r.nick) + '"><div class="character" style="background-image:url(../assets/characters-' + r.sheet + '.png);background-size:' + (r.columns * 100) + '% ' + (r.rows * 100) + '%;background-position:' + (r.pos[0] * 100 / (r.columns - 1)) + '% ' + (r.pos[1] * 100 / (r.rows - 1)) + '%"></div></div>';
  }
  function nav(active) {
    return '<nav class="bottom-nav" aria-label="화면 이동">' + [['restart','다시하기'], ['result','결과보기'], ['all','전체보기'], ['stats','통계보기']].map(function (n) {
      return '<button type="button" class="ghost" data-nav="' + n[0] + '"' + (active === n[0] ? ' aria-current="page"' : '') + (n[0] === 'result' && !saved ? ' disabled title="테스트를 완료하면 결과를 볼 수 있어요"' : '') + '>' + n[1] + '</button>';
    }).join('') + '</nav>';
  }
  function render(html, active, keepScroll) {
    stop(); version++; view = active;
    app.innerHTML = html + (active === 'quiz' ? '' : nav(active));
    app.querySelectorAll('[data-nav]').forEach(function (button) {
      button.onclick = function () {
        var target = button.dataset.nav;
        if (target === 'restart') startQuiz();
        if (target === 'result' && saved) showResult();
        if (target === 'all') showAll();
        if (target === 'stats') showStats();
      };
    });
    if (active !== 'quiz') history.replaceState(null, '', location.pathname + '#' + active);
    if (!keepScroll) window.scrollTo(0, 0);
  }
  function showStart() {
    render('<section class="start"><p class="eyebrow">' + escape(config.eyebrow) + '</p><div class="game-symbol" aria-hidden="true">' + config.emoji + '</div><h1>' + escape(config.title) + '</h1><p class="lead">' + escape(config.lead) + '</p><p class="time-notice">질문당 시간제한 10초</p><p class="foot">시간 안에 고르지 못하면 ‘모르겠다’로 넘어갑니다.</p><ul class="spec"><li>' + config.count + '문항</li><li>결과 ' + config.results.length + '종</li><li>한 문항씩 가볍게</li></ul><button class="go" id="game-go">테스트 시작</button><p class="foot">' + escape(config.note) + '</p></section>', 'start');
    document.getElementById('game-go').onclick = startQuiz;
  }
  function startQuiz() {
    game = { questions: shuffle(config.questions), answers: [], flips: [], i: 0, id: service.id() };
    game.flips = game.questions.map(function () { return Math.random() < 0.5; });
    showQuestion();
  }
  function showQuestion() {
    var question = game.questions[game.i], indices = game.flips[game.i] ? [1, 0] : [0, 1];
    var progress = game.questions.map(function (q, i) { return '<i class="' + (i < game.i ? (game.answers[i] === null ? 'skipped' : 'done') : i === game.i ? 'now' : '') + '"></i>'; }).join('');
    var choices = indices.map(function (index) { return '<button type="button" class="choice" data-choice="' + index + '">' + escape(question.choices[index]) + '</button>'; }).join('<div class="choice-divider"><span class="vs" aria-hidden="true">VS</span><button type="button" class="unknown" id="unknown">모르겠다</button></div>');
    render('<section><div class="rack" style="grid-template-columns:repeat(' + game.questions.length + ',1fr)" role="img" aria-label="' + game.i + '문항 완료, 모르겠다 ' + game.answers.filter(function (a) { return a === null; }).length + '문항">' + progress + '</div><p class="count">' + (game.i + 1) + ' / ' + game.questions.length + '</p><p class="q-title">' + escape(config.id === 'enneagram' ? '지금 내 마음에 더 가까운 쪽' : '둘 중 나와 가까운 쪽') + '</p><div class="choices">' + choices + '</div><div class="countdown" id="countdown" role="timer" aria-label="남은 시간 10초">10</div><button type="button" class="back" id="back"' + (game.i === 0 ? ' disabled' : '') + '>이전 문항</button></section>', 'quiz');
    var token = version;
    deadline = Date.now() + 10000;
    function answer(value) {
      if (token !== version || view !== 'quiz') return;
      if (Date.now() >= deadline) value = null;
      stop(); game.answers.push(value); game.i++;
      if (game.i === game.questions.length) finish(); else showQuestion();
    }
    app.querySelectorAll('[data-choice]').forEach(function (b) { b.onclick = function () { answer(Number(b.dataset.choice)); }; });
    document.getElementById('unknown').onclick = function () { answer(null); };
    document.getElementById('back').onclick = function () { if (game.i > 0) { game.i--; game.answers.pop(); showQuestion(); } };
    var counter = document.getElementById('countdown');
    timer = setInterval(function () {
      if (token !== version) return;
      var remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      counter.textContent = String(remaining); counter.className = 'countdown' + (remaining <= 3 ? ' urgent' : ''); counter.setAttribute('aria-label', '남은 시간 ' + remaining + '초');
      if (!remaining) answer(null);
    }, 100);
  }
  function finish() {
    var outcome = config.score(game.answers, game.questions, dateKey());
    var unanswered = game.answers.filter(function (a) { return a === null; }).length;
    if (unanswered === game.questions.length) {
      outcome = { id: config.results[Math.floor(Math.random() * config.results.length)].id, summary: '모든 문항을 건너뛰어 결과를 무작위로 배정했어요. 다시하기에서 가까운 쪽을 골라보세요.' };
    }
    if (!results[outcome.id]) throw new Error('알 수 없는 결과');
    saved = { type: outcome.id, id: game.id, vote: null, summary: outcome.summary, scores: outcome.scores || null, date: outcome.date || null, skipped: unanswered };
    persist(); service.record(saved.id, saved.type, null, config.id); showResult();
  }
  function paragraphs(r) { return '<div class="type-description">' + r.paragraphs.map(function (p) { return '<p>' + escape(p) + '</p>'; }).join('') + '</div>'; }
  function showResult() {
    if (!saved || !results[saved.type]) { showStart(); return; }
    var r = results[saved.type];
    render('<section><p class="eyebrow">' + escape(config.title) + ' · ' + (saved.id ? '조제 완료' : '결과 카드') + '</p><article class="label"><div class="label-cap"><span>' + escape(r.category) + '</span><span>' + escape(r.label) + '</span></div><div class="label-body"><p class="cat">당신의 약침</p><div class="result-icon" tabindex="0" data-result="' + r.id + '">' + character(r) + '</div><h1 class="vial-name">' + escape(r.name) + '</h1><div class="type-row"><span class="nick">' + escape(r.nick) + '</span><span class="code">' + escape(r.label) + '</span></div><p class="you"><b>' + escape(r.core) + '</b> 타입입니다.</p><p class="foot">' + escape(saved.summary || '') + '</p>' + (saved.skipped ? '<p class="foot">모르겠다 ' + Number(saved.skipped) + '문항은 성향 점수에서 제외했어요.</p>' : '') + window.PharmacoCompatibility.summary(config.id,r.id) + paragraphs(r) + '</div></article><p class="foot">' + escape(config.note) + ' 실제 효능·치료 적합성과는 관계가 없는 창작 캐릭터입니다.</p><div class="feedback" role="group" aria-label="이 결과가 마음에 드나요?"><button type="button" data-vote="1" aria-label="이 결과가 마음에 들어요" aria-pressed="' + (saved.vote === 1) + '"' + (!saved.id ? ' disabled' : '') + '>👍</button><button type="button" data-vote="-1" aria-label="이 결과가 마음에 들지 않아요" aria-pressed="' + (saved.vote === -1) + '"' + (!saved.id ? ' disabled' : '') + '>👎</button></div><p class="foot" id="vote-status" role="status"></p>' + window.PharmacoCompatibility.markup(window.PharmacoCatalog.byTest[config.id][r.id]) + tooltipMarkup() + '</section>', 'result');
    bindTooltips(); window.PharmacoCompatibility.bind(app);
    app.querySelectorAll('[data-vote]').forEach(function (button) {
      button.onclick = function () {
        if (!saved.id) return;
        var choice = Number(button.dataset.vote); saved.vote = saved.vote === choice ? null : choice; persist();
        app.querySelectorAll('[data-vote]').forEach(function (b) { b.setAttribute('aria-pressed', String(Number(b.dataset.vote) === saved.vote)); });
        var status = document.getElementById('vote-status'); status.textContent = '평가 저장 중…';
        service.record(saved.id, saved.type, saved.vote, config.id).then(function (ok) { status.textContent = ok ? '평가가 반영되었습니다.' : '평가를 이 브라우저에 보관했습니다. 공용 통계 연결 시 다시 전송합니다.'; });
      };
    });
  }
  function rowFor(id) { return statistics && statistics.find(function (r) { return r.code === id; }); }
  function satisfaction(r) {
    var stats = rowFor(r.id), up = stats ? Number(stats.up_count) : 0, down = stats ? Number(stats.down_count) : 0;
    var percent = up + down ? Math.round(up / (up + down) * 100) : null;
    var width = percent === null ? 50 : percent;
    var label = percent === null ? '만족도: 집계 전' : '만족도 ' + percent + '% · 불만족 ' + (100 - percent) + '%';
    return '<div class="satisfaction-bar' + (percent === null ? ' no-data' : '') + '" role="img" tabindex="0" aria-label="' + label + '" data-satisfaction="' + label + '"><span class="positive" style="width:' + width + '%"></span><span class="negative" style="width:' + (100 - width) + '%"></span></div>';
  }
  function notice() {
    var status = service.status();
    if (status === 'unconfigured') return '공용 통계 연결 전입니다. 테스트 결과와 평가는 이 브라우저에 보관돼요.';
    if (status === 'error') return '공용 통계를 불러오지 못했습니다. 다시 들어오면 재시도합니다.';
    if (status === 'pending') return '일부 결과가 전송을 기다리고 있습니다.';
    return statistics ? '' : '통계를 불러오는 중…';
  }
  function refresh(active) {
    var token = version;
    service.refresh(config.id).then(function (rows) {
      if (rows) statistics = rows;
      if (token !== version) return;
      var dialog = document.getElementById('type-dialog');
      if (dialog && dialog.open) return;
      if (active === 'all') showAll(true); else showStats(true);
    });
  }
  function tooltipMarkup() { return '<div class="satisfaction-tooltip" id="game-tooltip" role="tooltip" hidden></div>'; }
  function dialogMarkup() { return '<dialog class="type-dialog" id="type-dialog" aria-labelledby="dialog-name"><button type="button" class="dialog-close" id="dialog-close" aria-label="닫기">×</button><div id="dialog-content"></div></dialog>'; }
  function showAll(refreshed) {
    var tiles = config.results.map(function (r) {
      return '<article class="type-tile' + (saved && saved.type === r.id ? ' last-result' : '') + '"><button type="button" class="type-icon" data-result="' + r.id + '" aria-label="' + escape(r.name + ' ' + r.nick) + ' 상세 보기">' + character(r) + '</button><span class="tile-code">' + escape(r.label) + '</span><h2 class="tile-name">' + escape(r.name) + '</h2><p class="tile-nick">' + escape(r.nick) + '</p>' + satisfaction(r) + '</article>';
    }).join('');
    render('<section class="types-page"><p class="eyebrow">' + escape(config.title) + '</p><h1>약침타입 전체보기</h1><div class="types-grid" style="grid-template-columns:repeat(' + config.columns + ',minmax(0,1fr))">' + tiles + '</div><p class="foot">초록: 만족 · 빨강: 불만족. 흐린 막대는 아직 집계된 평가가 없는 타입입니다.</p><p class="foot">' + notice() + '</p>' + tooltipMarkup() + dialogMarkup() + '</section>', 'all', refreshed);
    bindTooltips(); bindDialog(); if (!refreshed) refresh('all');
  }
  function showStats(refreshed) {
    var total = statistics ? statistics.reduce(function (sum, r) { return sum + Number(r.result_count); }, 0) : 0;
    var rows = config.results.map(function (r) {
      var stats = rowFor(r.id), count = statistics ? stats ? Number(stats.result_count) : 0 : null;
      var ratio = total ? count / total * 100 : 0;
      var label = count === null ? '비율 — · 결과건수 — (집계 전)' : ratio.toFixed(1) + '% · ' + count.toLocaleString('ko-KR') + '건';
      return '<div class="stats-row"><div class="stats-avatar"><button type="button" class="stats-icon' + (saved && saved.type === r.id ? ' last-result' : '') + '" data-result="' + r.id + '" aria-label="' + escape(r.name + ' ' + r.nick) + ' 상세 보기"><div class="character" style="background-image:url(../assets/characters-' + r.sheet + '.png);background-size:' + (r.columns * 100) + '% ' + (r.rows * 100) + '%;background-position:' + (r.pos[0] * 100 / (r.columns - 1)) + '% ' + (r.pos[1] * 100 / (r.rows - 1)) + '%"></div></button>' + satisfaction(r) + '</div><div><div class="stats-track" role="img" aria-label="' + escape(r.label + ': ' + label) + '"><span class="stats-fill" style="width:' + ratio + '%"></span></div><p class="stats-value">' + label + '</p></div></div>';
    }).join('');
    render('<section class="stats-page"><p class="eyebrow">' + escape(config.title) + '</p><h1>약침타입 통계보기</h1><p class="foot">' + notice() + '</p><div class="stats-list">' + rows + '</div>' + tooltipMarkup() + dialogMarkup() + '</section>', 'stats', refreshed);
    bindTooltips(); bindDialog(); if (!refreshed) refresh('stats');
  }
  function bindTooltips() {
    var tooltip = document.getElementById('game-tooltip');
    function bind(element, text) {
      function show(x, y) {
        tooltip.textContent = text(); tooltip.hidden = false;
        tooltip.style.maxHeight = Math.max(60, window.innerHeight - y - 26) + 'px';
        tooltip.style.left = Math.max(8, Math.min(x, window.innerWidth - tooltip.offsetWidth - 8)) + 'px';
        tooltip.style.top = Math.max(8, Math.min(y + 18, window.innerHeight - tooltip.offsetHeight - 8)) + 'px';
      }
      element.onpointermove = function (event) { show(event.clientX, event.clientY); };
      element.onpointerleave = element.onblur = function () { tooltip.hidden = true; };
      element.onfocus = function () { var r = element.getBoundingClientRect(); show(r.left, r.bottom); };
    }
    app.querySelectorAll('[data-result]').forEach(function (e) { bind(e, function () { var r = results[e.dataset.result]; return r.name + ' · ' + r.nick + '\n\n' + r.paragraphs.join('\n\n'); }); });
    app.querySelectorAll('[data-satisfaction]').forEach(function (e) { bind(e, function () { return e.dataset.satisfaction; }); e.onclick = e.onfocus; });
  }
  function bindDialog() {
    var dialog = document.getElementById('type-dialog');
    app.querySelectorAll('[data-result]').forEach(function (e) { e.onclick = function () {
      var r = results[e.dataset.result]; document.getElementById('game-tooltip').hidden = true;
      document.getElementById('dialog-content').innerHTML = character(r) + '<h2 id="dialog-name">' + escape(r.name) + '</h2><div class="type-row"><span class="nick">' + escape(r.nick) + '</span><span class="code">' + escape(r.label) + '</span></div><p>' + escape(r.core) + ' 타입입니다.' + '</p>' + paragraphs(r);
      dialog.showModal();
    }; });
    document.getElementById('dialog-close').onclick = function () { dialog.close(); };
    dialog.onclose = function () { document.getElementById('game-tooltip').hidden = true; };
  }
  var incoming = new URLSearchParams(location.search).get('type');
  if (incoming && results[incoming]) {
    if (!saved || saved.type !== incoming) { saved = { type: incoming, id: null, vote: null, summary: '공유된 결과 카드예요. 다시하기로 나의 타입을 찾아보세요.' }; persist(); }
    showResult();
  } else if (location.hash === '#all') showAll();
  else if (location.hash === '#stats') showStats();
  else if (location.hash === '#result' && saved) showResult();
  else showStart();
})();
