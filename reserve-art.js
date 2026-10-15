(function () {
  'use strict';
  // Built-in image_gen illustrations. Each 5 × 2 atlas follows R001–R100 order.
  // Source prompts: research/reserve-image-generation.json. PNG masters are kept beside WebP assets.
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function location(id) {
    if (!/^R(?:0[0-9]{2}|100)$/.test(id)) throw new Error('Unknown reserve character: ' + id);
    var index = Number(id.slice(1)) - 1;
    if (index < 0 || index >= 100) throw new Error('Unknown reserve character: ' + id);
    return { sheet: 'reserve-' + String(Math.floor(index / 10) + 1).padStart(2, '0'), column: index % 5, row: Math.floor(index % 10 / 5) };
  }
  function render(c) {
    var cell = location(c.id);
    return '<span class="reserve-sprite" role="img" aria-label="' + esc(c.animal + ' · ' + c.nick + ' · ' + c.expressionName) + '" data-character="' + c.id + '" style="background-image:url(../assets/reserve/' + cell.sheet + '.webp);background-position:' + cell.column * 25 + '% ' + cell.row * 100 + '%"></span>';
  }
  window.PharmacoReserveArt = { render: render, location: location };
})();
