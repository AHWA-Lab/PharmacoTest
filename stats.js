(function () {
  'use strict';
  var config = window.PHARMACO_STATS_CONFIG || {};
  var enabled = Boolean(config.url && config.key);
  var storageKey = 'pharmaco-pending-results-v1';
  var pending = {};
  var flushing = null;
  var status = enabled ? 'loading' : 'unconfigured';
  var rows = {};
  var activeTest = 'mbti';
  try { pending = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch (error) {}

  function persist() {
    try { localStorage.setItem(storageKey, JSON.stringify(pending)); } catch (error) {}
  }

  async function rpc(name, payload) {
    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 10000);
    try {
      var response = await fetch(config.url.replace(/\/$/, '') + '/rest/v1/rpc/' + name, {
        method: 'POST',
        headers: { apikey: config.key, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      if (!response.ok) throw new Error('통계 서버 연결 오류');
      return await response.json();
    } finally { clearTimeout(timeout); }
  }

  function flush() {
    if (!enabled) return Promise.resolve(false);
    if (flushing) return flushing;
    flushing = (async function () {
      while (Object.keys(pending).length) {
        var id = Object.keys(pending)[0];
        var entry = pending[id];
        await rpc(entry.p_test ? 'pharmaco_record_test_result' : 'pharmaco_record_result', entry);
        // 전송 중 평가가 바뀌었으면 최신 값을 이어서 전송합니다.
        if (pending[id] === entry) { delete pending[id]; persist(); }
      }
      return true;
    })().catch(function () { status = 'error'; return false; }).finally(function () { flushing = null; });
    return flushing;
  }

  async function refresh(test) {
    test = test || activeTest;
    activeTest = test;
    if (!enabled) return null;
    await flush();
    try {
      var data = await rpc(test === 'mbti' ? 'pharmaco_stats' : 'pharmaco_test_stats', test === 'mbti' ? {} : { p_test: test });
      if (!Array.isArray(data)) throw new Error('잘못된 통계 응답');
      rows[test] = data;
      status = Object.keys(pending).length ? 'pending' : 'ready';
    } catch (error) { status = 'error'; }
    return rows[test] || null;
  }

  window.PharmacoStats = {
    id: function () { return crypto.randomUUID(); },
    record: function (id, code, vote, test) {
      if (!id) return Promise.resolve(false);
      activeTest = test || 'mbti';
      pending[id] = { p_id: id, p_code: code, p_vote: vote };
      if (activeTest !== 'mbti') pending[id].p_test = activeTest;
      persist();
      return flush();
    },
    refresh: refresh,
    status: function () { return status; }
  };
  window.addEventListener('online', function () { refresh(); });
})();
