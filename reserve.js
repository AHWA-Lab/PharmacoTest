(function () {
  'use strict';
  var list = window.PharmacoReserve, art = window.PharmacoReserveArt;
  var groups = {
    all: ['전체', null],
    mammal: ['포유류', 'calico shiba beagle corgi dachshund samoyed golden pug fennec arcticfox redpanda meerkat redsquirrel guinea chinchilla mouse beaver armadillo pangolin anteater sloth orangutan snowmonkey lemur tarsier kangaroo wombat quokka platypus polarbear moonbear sunbear tiger cheetah leopard lynx manul skunk marten deer reindeer waterdeer alpaca llama camel zebra pony cow buffalo pig boar hippo tapir okapi'],
    bird: ['새', 'puffin parrot toucan flamingo duck chick rooster sparrow magpie whiteeye eagle falcon hummingbird kiwi ostrich mandarinduck'],
    water: ['물속 친구', 'octopus squid puffer goldfish seahorse whale dolphin orca shark stingray crab lobster hermitcrab sealion axolotl'],
    small: ['곤충·파충류', 'turtle iguana gecko treefrog ladybug stagbeetle firefly silkworm ant mantis cicada'],
    myth: ['전설', 'gumiho samjogo griffin hyeonmu']
  };
  var themes = { all: '모든 테마' };
  list.forEach(function (c) { themes[c.theme] = c.themeName; });
  var group = 'all', theme = 'all', query = '', cache = {};
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function picture(c) { return cache[c.id] || (cache[c.id] = art.render(c)); }
  function inGroup(c) { return group === 'all' || groups[group][1].split(' ').indexOf(c.kind) !== -1; }
  function text(c) { return [c.animal, c.nick, c.core, c.traits.join(' '), c.herb, c.outfitName, c.hatName, c.themeName, c.palette.name, c.propName, c.expressionName, c.season, c.element].join(' ').toLocaleLowerCase(); }
  function filters(id, entries, get, set) {
    var box = document.getElementById(id);
    box.innerHTML = Object.keys(entries).map(function (k) { return '<button type="button" class="dex-filter" data-key="' + k + '" aria-pressed="' + (k === get()) + '">' + esc(Array.isArray(entries[k]) ? entries[k][0] : entries[k]) + '</button>'; }).join('');
    box.querySelectorAll('button').forEach(function (b) { b.onclick = function () { set(b.dataset.key); box.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); render(); }; });
  }
  filters('group-filters', groups, function () { return group; }, function (v) { group = v; });
  filters('theme-filters', themes, function () { return theme; }, function (v) { theme = v; });
  document.getElementById('dex-search').oninput = function (e) { query = e.target.value.toLocaleLowerCase().trim(); render(); };
  var dialog = document.getElementById('type-dialog');
  document.getElementById('dialog-close').onclick = function () { dialog.close(); };
  function details(c) {
    return '<dl class="reserve-facts">' + [['동물', c.animal], ['성격', c.traits.join(' · ')], ['동작', c.action], ['표정', c.expressionName], ['복장', c.outfitName + ' · ' + c.palette.name], ['머리', c.hatName], ['소품', c.propName], ['테마', c.themeName], ['약재 모티프', c.herb], ['계절 · 오행', c.season + ' · ' + c.element]].map(function (r) { return '<div><dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join('') + '</dl>';
  }
  function render() {
    var visible = list.filter(function (c) { return inGroup(c) && (theme === 'all' || c.theme === theme) && (!query || text(c).indexOf(query) !== -1); });
    document.getElementById('dex-count').textContent = visible.length + ' / ' + list.length + '마리';
    var grid = document.getElementById('dex-grid');
    grid.innerHTML = visible.length ? visible.map(function (c) {
      return '<article class="reserve-card"><button type="button" class="reserve-art" data-id="' + c.id + '" aria-label="' + esc(c.animal + ' ' + c.nick) + ' 상세 보기">' + picture(c) + '</button><span class="dex-tag">' + c.id + ' · ' + esc(c.animal) + '</span><h2>' + esc(c.nick) + '</h2><p class="reserve-core">' + esc(c.core) + '</p><p class="reserve-quote">“' + esc(c.catchphrase) + '”</p><div class="reserve-chips"><span>' + esc(c.themeName) + '</span><span>' + esc(c.herb) + '</span><span>' + esc(c.outfitName) + '</span></div></article>';
    }).join('') : '<p class="dex-empty">조건에 맞는 캐릭터가 없어요.</p>';
    grid.querySelectorAll('[data-id]').forEach(function (b) { b.onclick = function () {
      var c = list.find(function (x) { return x.id === b.dataset.id; });
      document.getElementById('dialog-content').innerHTML = '<div class="character-frame reserve-dialog-art">' + picture(c) + '</div><h2 id="dialog-name">' + esc(c.nick) + '</h2><div class="type-row"><span class="code">' + c.id + ' · ' + esc(c.animal) + '</span></div><p>' + esc(c.core) + '</p><p class="reserve-quote">“' + esc(c.catchphrase) + '”</p>' + details(c);
      dialog.showModal();
    }; });
  }
  render();
})();
