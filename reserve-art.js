(function () {
  'use strict';
  // 예비 캐릭터 100종의 스티커 그림을 SVG로 그립니다. 그림 재료는 reserve-data.js의 필드입니다.
  // 종(species): [귀, 주둥이, 무늬, 꼬리, 등, 다리, 몸색, 배색, 무늬색, 머리색(선택)]
  var S = {
    calico: ['pointy', 'muzzle', 'patch', 'long', '', 'feet', '#fbf3e6', '#ffffff', '#e59a4f'],
    shiba: ['pointy', 'muzzle', 'cheeks', 'curly', '', 'feet', '#e8a15c', '#fff4e4', '#fff4e4'],
    beagle: ['floppy', 'muzzle', 'patch', 'thin', '', 'feet', '#f3e3cc', '#ffffff', '#8b5a36'],
    corgi: ['bigpointy', 'muzzle', 'cheeks', 'stub', '', 'feet', '#f0a55a', '#fff6ea', '#fff6ea'],
    dachshund: ['floppy', 'long', 'none', 'thin', '', 'feet', '#a8603a', '#d9a273', '#7a3f22'],
    samoyed: ['pointy', 'muzzle', 'none', 'fluffy', '', 'feet', '#fbfbf8', '#ffffff', '#e8e4dc'],
    golden: ['floppy', 'muzzle', 'none', 'fluffy', '', 'feet', '#f1c172', '#fbe3b6', '#d99a3e'],
    pug: ['smallflop', 'muzzle', 'mask', 'curly', '', 'feet', '#efd9b4', '#f7e9cf', '#4a3a35'],
    fennec: ['hugepointy', 'muzzle', 'cheeks', 'fluffy', '', 'feet', '#f3d29c', '#fff6e4', '#fff6e4'],
    arcticfox: ['pointy', 'muzzle', 'none', 'fluffy', '', 'feet', '#f6f8fc', '#ffffff', '#cfd8ea'],
    redpanda: ['round', 'muzzle', 'brows', 'ringed', '', 'feet', '#d9633a', '#4a2f2a', '#ffffff'],
    meerkat: ['tiny', 'muzzle', 'mask', 'thin', '', 'feet', '#d8b98a', '#efdcb8', '#6b4a35'],
    redsquirrel: ['tufted', 'muzzle', 'cheeks', 'fluffy', '', 'feet', '#c7612f', '#f6e2c8', '#f6e2c8'],
    guinea: ['tiny', 'muzzle', 'patch', 'none', '', 'feet', '#f6e8d6', '#ffffff', '#c98a4c'],
    chinchilla: ['biground', 'muzzle', 'none', 'fluffy', '', 'feet', '#b9bcc4', '#eceef2', '#8c909a'],
    mouse: ['biground', 'muzzle', 'none', 'thin', '', 'feet', '#c8a888', '#f3e6d6', '#f2a7b0'],
    beaver: ['tiny', 'teeth', 'none', 'flat', '', 'feet', '#9a6a43', '#c9a27a', '#6e4426'],
    armadillo: ['tiny', 'long', 'bands', 'thin', '', 'feet', '#c9b29b', '#e6d6c4', '#9c8571'],
    pangolin: ['none', 'long', 'scales', 'long', '', 'feet', '#b58b5e', '#e8d1b0', '#8a6640'],
    anteater: ['tiny', 'trunk', 'stripe', 'fluffy', '', 'feet', '#9c8a76', '#d6c8b4', '#3a3030'],
    sloth: ['none', 'face', 'mask', 'none', '', 'feet', '#b39c80', '#e8dcc8', '#6b5440'],
    orangutan: ['tiny', 'face', 'none', 'none', '', 'feet', '#d0753a', '#f0c39a', '#a5522a'],
    snowmonkey: ['tiny', 'face', 'none', 'stub', '', 'feet', '#c9c2b8', '#e9a19b', '#d97a72'],
    lemur: ['pointy', 'muzzle', 'mask', 'ringed', '', 'feet', '#b6b6bc', '#ffffff', '#3a3a40'],
    tarsier: ['biground', 'none', 'none', 'thin', '', 'feet', '#c8a27c', '#ecd8bd', '#8a6646'],
    kangaroo: ['tall', 'muzzle', 'cheeks', 'long', '', 'feet', '#c98e5c', '#f1d7b6', '#f1d7b6'],
    wombat: ['tiny', 'muzzle', 'none', 'stub', '', 'feet', '#8f7a66', '#b8a592', '#5b4a3c'],
    quokka: ['tinyround', 'muzzle', 'none', 'thin', '', 'feet', '#a98c6c', '#d9c4a8', '#7a5f45'],
    platypus: ['none', 'duckbill', 'none', 'flat', '', 'feet', '#8a6a52', '#c9ab8c', '#3a3a3a'],
    polarbear: ['round', 'muzzle', 'none', 'stub', '', 'feet', '#fbfbf6', '#ffffff', '#dcd8cc'],
    moonbear: ['round', 'muzzle', 'moon', 'stub', '', 'feet', '#3e3a3c', '#c9b9a6', '#fbf6e9'],
    sunbear: ['tinyround', 'muzzle', 'sunband', 'stub', '', 'feet', '#3a3230', '#e8b86a', '#f2c46e'],
    tiger: ['round', 'muzzle', 'stripes', 'long', '', 'feet', '#f2964a', '#fff6ea', '#3a2a24'],
    cheetah: ['tinyround', 'muzzle', 'spots', 'long', '', 'feet', '#f1c56c', '#fff6e2', '#3a2a24'],
    leopard: ['round', 'muzzle', 'spots', 'long', '', 'feet', '#e9bb6a', '#fff4dc', '#6b4425'],
    lynx: ['tufted', 'muzzle', 'spots', 'stub', '', 'feet', '#c7a882', '#f3e7d3', '#5a4433'],
    manul: ['tiny', 'muzzle', 'stripes', 'fluffy', '', 'feet', '#a7a39c', '#ddd8cf', '#6b665e'],
    skunk: ['tinyround', 'muzzle', 'skunk', 'fluffy', '', 'feet', '#3c3a44', '#ffffff', '#ffffff'],
    marten: ['round', 'muzzle', 'cheeks', 'fluffy', '', 'feet', '#6b4a35', '#f3c34c', '#f3c34c'],
    deer: ['antlers', 'muzzle', 'spots', 'stub', '', 'feet', '#c98a52', '#f4e2c6', '#fff7ea'],
    reindeer: ['antlers', 'muzzle', 'cheeks', 'stub', '', 'feet', '#9a7458', '#e9dcc8', '#e9dcc8'],
    waterdeer: ['side', 'fangs', 'none', 'stub', '', 'feet', '#b89670', '#ebdcc4', '#6b5440'],
    alpaca: ['long', 'muzzle', 'fluff', 'stub', '', 'feet', '#f4e6cf', '#ffffff', '#fbf3e4'],
    llama: ['long', 'muzzle', 'none', 'stub', '', 'feet', '#e6d2b0', '#f6ecda', '#b39470'],
    camel: ['tiny', 'muzzle', 'none', 'thin', 'hump', 'feet', '#d6ac74', '#edd2a8', '#a8814f'],
    zebra: ['pointy', 'muzzle', 'stripes', 'thin', '', 'feet', '#ffffff', '#ffffff', '#2f2f36'],
    pony: ['pointy', 'muzzle', 'mane', 'horse', '', 'feet', '#b97d50', '#e6c7a4', '#6b4228'],
    cow: ['horns', 'muzzle', 'spots', 'thin', '', 'feet', '#ffffff', '#f6c6c6', '#3a3a40'],
    buffalo: ['bighorns', 'muzzle', 'none', 'thin', '', 'feet', '#6a6670', '#9a96a0', '#e8dcc6'],
    pig: ['smallflop', 'pig', 'none', 'curly', '', 'feet', '#f6c1c4', '#fbdadb', '#e79aa1'],
    boar: ['pointy', 'tusks', 'stripes', 'thin', '', 'feet', '#9a6e4c', '#c9a07a', '#e6cca6'],
    hippo: ['tiny', 'hippo', 'none', 'stub', '', 'feet', '#a9a3c4', '#d9cfe6', '#f2b6c4'],
    tapir: ['round', 'trunk', 'none', 'stub', '', 'feet', '#3a3a42', '#f2f2f2', '#f2f2f2'],
    okapi: ['bigpointy', 'muzzle', 'legstripes', 'thin', '', 'feet', '#6a3f35', '#f2e6da', '#ffffff'],
    puffin: ['none', 'puffin', 'whiteface', 'feather', '', 'feet', '#2f2f38', '#ffffff', '#ffffff'],
    parrot: ['crest', 'hook', 'none', 'feather', '', 'feet', '#e2453c', '#f5c84a', '#3c7bd6'],
    toucan: ['none', 'bigbeak', 'whiteface', 'feather', '', 'feet', '#2f2f38', '#fff2c4', '#fff2c4'],
    flamingo: ['none', 'flamingo', 'none', 'feather', '', 'feet', '#f5a3b7', '#fbd0da', '#3a3a40'],
    duck: ['none', 'duckbill', 'neckring', 'feather', '', 'feet', '#b89a7e', '#e6d6c4', '#ffffff', '#3f8f5f'],
    chick: ['tuft', 'beak', 'none', 'none', '', 'feet', '#ffe07a', '#fff2b8', '#f29b2f'],
    rooster: ['comb', 'beak', 'none', 'feather', '', 'feet', '#f6f1e6', '#ffffff', '#e2453c'],
    sparrow: ['none', 'beak', 'cheekspot', 'feather', '', 'feet', '#a57954', '#f1e4d0', '#3a2f2a'],
    magpie: ['none', 'darkbeak', 'none', 'long', '', 'feet', '#2f3038', '#ffffff', '#3a5fa8'],
    whiteeye: ['none', 'beak', 'eyering', 'feather', '', 'feet', '#a7c95a', '#f5f0c8', '#ffffff'],
    eagle: ['crest', 'hook', 'none', 'feather', '', 'feet', '#7a5236', '#f1d79c', '#f1d79c', '#e9cc8a'],
    falcon: ['none', 'hook', 'falcon', 'feather', '', 'feet', '#5b6a80', '#f3ece0', '#2f3540'],
    hummingbird: ['none', 'longbeak', 'none', 'feather', 'wings', 'feet', '#4fb39a', '#e8f6ef', '#d93a6a'],
    kiwi: ['none', 'longbeak', 'none', 'none', '', 'feet', '#8a6a4a', '#b8977a', '#5b4430'],
    ostrich: ['tuft', 'beak', 'none', 'feather', '', 'feet', '#3a3236', '#f3ece4', '#f3ece4', '#e8c2b0'],
    mandarinduck: ['crest', 'redbill', 'whiteface', 'feather', '', 'feet', '#e98a3a', '#f6e7d4', '#ffffff', '#3a6a9a'],
    turtle: ['none', 'none', 'none', 'stub', 'shell', 'feet', '#8bc79a', '#e8f2d6', '#5d9a6d'],
    iguana: ['spikes', 'none', 'stripes', 'long', '', 'feet', '#7cc36a', '#d9efb8', '#4f8f3f'],
    gecko: ['none', 'none', 'spots', 'long', '', 'feet', '#f2d36a', '#fff2c4', '#6b4a35'],
    axolotl: ['frills', 'none', 'none', 'fish', '', 'feet', '#f6b6c8', '#fde0ea', '#e46a8f'],
    treefrog: ['bulge', 'none', 'none', 'none', '', 'feet', '#7fd06a', '#e8f6c8', '#4f9f3f'],
    octopus: ['none', 'none', 'spots', 'none', '', 'tentacles', '#f08a6a', '#fbc4b0', '#d65a40'],
    squid: ['squidfin', 'none', 'spots', 'none', '', 'tentacles', '#f4e2ef', '#ffffff', '#c78ab8'],
    puffer: ['puffspikes', 'none', 'spots', 'fish', '', 'fins', '#f2d36a', '#fff6d2', '#8a6a3a'],
    goldfish: ['fins', 'none', 'none', 'fish', '', 'fins', '#f6893a', '#ffd2a8', '#ffffff'],
    seahorse: ['crest', 'tube', 'bands', 'curly', '', 'fins', '#f2c14a', '#fbe39a', '#d9962a'],
    whale: ['none', 'none', 'grooves', 'fish', '', 'fins', '#4f6fa8', '#e6edf7', '#c4d3ea'],
    dolphin: ['dorsal', 'long', 'none', 'fish', '', 'fins', '#8fb3d9', '#eef4fb', '#6a8fb8'],
    orca: ['dorsal', 'none', 'orca', 'fish', '', 'fins', '#2f3038', '#ffffff', '#ffffff'],
    shark: ['dorsal', 'none', 'gills', 'fish', '', 'fins', '#8a9bb0', '#f2f5f8', '#6a7a90'],
    stingray: ['rayfins', 'none', 'spots', 'thin', '', 'fins', '#b8a28a', '#f2ece2', '#8a7458'],
    crab: ['eyestalks', 'none', 'none', 'none', '', 'feet', '#e8574a', '#f6b4a8', '#b8382c'],
    lobster: ['eyestalks', 'none', 'bands', 'fish', '', 'feet', '#d9473a', '#f2a690', '#a8302a'],
    hermitcrab: ['eyestalks', 'none', 'none', 'none', 'spiral', 'feet', '#f29b7a', '#fbd0c0', '#c96a4a'],
    ladybug: ['antennae', 'none', 'none', 'none', 'ladyshell', 'feet', '#e8453c', '#3e3e46', '#2f2f36'],
    stagbeetle: ['mandibles', 'none', 'none', 'none', 'beetle', 'feet', '#7a5a46', '#a8826a', '#3a2a24'],
    firefly: ['antennae', 'none', 'none', 'none', 'wings', 'feet', '#4e4e66', '#ffe98a', '#ffef9a'],
    silkworm: ['tinyantennae', 'none', 'bands', 'none', '', 'feet', '#f6f3ea', '#ffffff', '#e0d8c6'],
    ant: ['antennae', 'none', 'none', 'none', '', 'feet', '#8a4a3a', '#b8705a', '#5a2a20'],
    mantis: ['antennae', 'none', 'none', 'none', 'wings', 'feet', '#8fd06a', '#d6f0b8', '#5f9f3f'],
    cicada: ['tinyantennae', 'none', 'none', 'none', 'wings', 'feet', '#6a8a5a', '#c9b88a', '#3a4a30'],
    gumiho: ['pointy', 'muzzle', 'foxmarks', 'nine', '', 'feet', '#fbf3ea', '#ffffff', '#e8574a'],
    samjogo: ['crest', 'beak', 'sunaura', 'feather', '', 'three', '#3a3a52', '#5a5a74', '#f2b84a'],
    griffin: ['crest', 'hook', 'none', 'horse', 'wings', 'feet', '#f2d08a', '#fff2d0', '#c9a050', '#f6f2ea'],
    hyeonmu: ['none', 'none', 'scales', 'snake', 'shell', 'feet', '#5f7f8c', '#b8ccd2', '#2f4048'],
    sealion: ['tiny', 'muzzle', 'none', 'fish', '', 'fins', '#a07a5a', '#c9a684', '#6a4a35']
  };
  var THEME = {
    spring: ['#fde3ea', '#f6a9bf', 'petal'], sea: ['#d9f1f5', '#7cc6d6', 'wave'], autumn: ['#fbe7d3', '#ee9a5a', 'maple'],
    winter: ['#e6eefb', '#ffffff', 'snow'], night: ['#e3def5', '#f6cf5a', 'star'], herb: ['#e5f2df', '#7fbf6e', 'sprout'],
    cloud: ['#e4f0fb', '#ffffff', 'cloud'], rain: ['#e2e8ee', '#8fb0cf', 'drop'], festival: ['#fdf1d6', '#f3a84a', 'lamp'], palace: ['#f6eadf', '#d65a4a', 'diamond']
  };
  var OL = '#3a3550', SW = 'stroke="' + OL + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"';
  function shade(hex, amount) {
    var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function f(c) { return Math.max(0, Math.min(255, Math.round(amount < 0 ? c * (1 + amount) : c + (255 - c) * amount))); }
    return '#' + ((1 << 24) + (f(r) << 16) + (f(g) << 8) + f(b)).toString(16).slice(1);
  }
  function el(cx, cy, rx, ry, fill, extra) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="' + fill + '" ' + (extra === undefined ? SW : extra) + '/>'; }
  function circ(cx, cy, r, fill, extra) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + fill + '" ' + (extra === undefined ? SW : extra) + '/>'; }
  function path(d, fill, extra) { return '<path d="' + d + '" fill="' + fill + '" ' + (extra === undefined ? SW : extra) + '/>'; }
  function line(d, color, w) { return '<path d="' + d + '" fill="none" stroke="' + (color || OL) + '" stroke-width="' + (w || 3) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
  function mirror(svg) { return svg + '<g transform="translate(200 0) scale(-1 1)">' + svg + '</g>'; }

  function background(t) {
    var th = THEME[t] || THEME.spring, deco = '', spots = [[24, 30], [176, 26], [18, 112], [182, 98], [34, 176], [168, 170], [58, 18], [146, 192]];
    spots.forEach(function (p, i) {
      var x = p[0], y = p[1], c = th[1], s = i % 2 ? 0.8 : 1.1, o = 'opacity="0.75"';
      var shape = {
        petal: '<ellipse cx="0" cy="0" rx="6" ry="3.5" fill="' + c + '" transform="rotate(' + (i * 40) + ')" ' + o + '/>',
        wave: '<path d="M-10 0q5-5 10 0t10 0" fill="none" stroke="' + c + '" stroke-width="2.5" stroke-linecap="round"/>',
        maple: '<path d="M0-8l2 5 5-2-2 5 5 2-6 1 0 5-4-4-4 4 0-5-6-1 5-2-2-5 5 2z" fill="' + c + '" ' + o + '/>',
        snow: '<path d="M-6 0h12M0-6v12M-4-4l8 8M4-4l-8 8" stroke="#a9bfe0" stroke-width="2" stroke-linecap="round"/>',
        star: '<path d="M0-7l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="' + c + '"/>',
        sprout: '<path d="M0 6V-2M0-2c-6 0-7-6-7-6s6-1 7 6M0 0c5 0 7-5 7-5s-6-1-7 5" fill="' + c + '" stroke="' + shade(c, -0.25) + '" stroke-width="1.5"/>',
        cloud: '<path d="M-10 4a5 5 0 0 1 3-9 7 7 0 0 1 13 1 5 5 0 0 1 4 8z" fill="#fff" stroke="#c8d8ea" stroke-width="1.5"/>',
        drop: '<path d="M0-7c4 6 5 8 5 10a5 5 0 0 1-10 0c0-2 1-4 5-10z" fill="' + c + '" ' + o + '/>',
        lamp: '<circle r="5" fill="' + c + '" ' + o + '/><circle r="9" fill="' + c + '" opacity="0.2"/>',
        diamond: '<path d="M0-6l5 6-5 6-5-6z" fill="' + (i % 2 ? '#4f9a7a' : c) + '" ' + o + '/>'
      }[th[2]];
      deco += '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + shape + '</g>';
    });
    return '<rect width="200" height="200" rx="30" fill="' + th[0] + '"/>' + deco + '<ellipse cx="100" cy="186" rx="54" ry="8" fill="' + OL + '" opacity="0.1"/>';
  }

  function ears(k, body, inner, mark) {
    var lighter = shade(body, 0.35), pink = '#f6b8c4';
    switch (k) {
      case 'round': return mirror(circ(64, 50, 15, body) + circ(64, 50, 7, inner === '#4a2f2a' ? '#ffffff' : lighter, 'stroke="none"'));
      case 'tinyround': return mirror(circ(68, 50, 10, body) + circ(68, 50, 4.5, lighter, 'stroke="none"'));
      case 'tiny': return mirror(circ(68, 50, 7, body));
      case 'pointy': return mirror(path('M60 66L64 28L90 46Z', body) + path('M66 58L67 38L81 48Z', pink, 'stroke="none"'));
      case 'bigpointy': return mirror(path('M58 70L58 18L92 44Z', body) + path('M64 60L64 30L82 46Z', pink, 'stroke="none"'));
      case 'hugepointy': return mirror(path('M62 70L36 6L92 44Z', body) + path('M66 60L48 20L82 46Z', pink, 'stroke="none"'));
      case 'tufted': return mirror(path('M60 66L64 26L90 46Z', body) + line('M64 26L60 14', mark === '#f6e2c8' ? body : OL, 3));
      case 'tall': return mirror(el(72, 30, 9, 24, body).replace('/>', ' transform="rotate(-14 72 30)"/>') + el(72, 32, 4, 15, pink, 'stroke="none" transform="rotate(-14 72 32)"'));
      case 'long': return mirror(el(70, 40, 8, 18, body).replace('/>', ' transform="rotate(-25 70 40)"/>'));
      case 'floppy': return mirror(el(58, 86, 12, 26, mark, SW + ' transform="rotate(18 58 86)"'));
      case 'smallflop': return mirror(path('M66 44Q50 44 54 64Q64 58 74 54Z', mark));
      case 'biground': return mirror(circ(60, 48, 22, body) + circ(60, 48, 13, pink, 'stroke="none"'));
      case 'side': return mirror(el(56, 66, 16, 8, body, SW + ' transform="rotate(-20 56 66)"'));
      case 'horns': return mirror(path('M74 46Q60 40 58 26Q68 32 80 40Z', '#f1e3c4')) + mirror(el(56, 66, 13, 7, body, SW + ' transform="rotate(-20 56 66)"'));
      case 'bighorns': return mirror(path('M78 46Q44 44 40 70Q36 40 76 36Z', '#e8dcc6')) + mirror(el(58, 70, 11, 6, body, SW + ' transform="rotate(-20 58 70)"'));
      case 'antlers': return mirror(line('M78 44L66 18M70 28L56 22M68 22L72 10', '#8a5a36', 5)) + mirror(el(56, 66, 14, 7, body, SW + ' transform="rotate(-20 56 66)"'));
      case 'crest': return path('M92 44Q84 22 96 14Q98 30 100 40Q104 20 116 18Q108 32 108 44Z', mark);
      case 'tuft': return line('M100 42Q96 30 100 24M100 42Q106 32 110 30', OL, 3);
      case 'comb': return path('M86 46Q84 30 94 34Q96 22 104 30Q112 22 114 36Q122 36 116 48Z', '#e2453c');
      case 'antennae': return mirror(line('M88 46Q80 28 72 18', OL, 3) + circ(72, 16, 5, mark));
      case 'tinyantennae': return mirror(line('M90 44Q86 34 82 30', OL, 3));
      case 'mandibles': return mirror(path('M86 50Q66 30 70 12Q78 24 80 22Q78 34 94 44Z', '#5a3a2a'));
      case 'eyestalks': return mirror(line('M86 46L80 26', OL, 4) + circ(80, 22, 8, '#fff') + circ(80, 22, 3.5, OL, 'stroke="none"'));
      case 'fins': return mirror(path('M58 82L36 70L44 96Z', shade(body, 0.2)));
      case 'dorsal': return path('M96 42Q108 14 122 18Q112 30 110 44Z', body);
      case 'squidfin': return path('M100 8L136 46L64 46Z', body);
      case 'rayfins': return mirror(path('M62 90Q20 80 12 112Q40 106 70 118Z', body));
      case 'frills': return mirror(line('M60 74L40 62M58 84L36 82M60 94L40 102', '#e46a8f', 5));
      case 'bulge': return mirror(circ(78, 50, 15, body));
      case 'spikes': return path('M84 44L90 30L96 42L102 26L108 42L116 30L118 46Z', '#4f8f3f');
      case 'puffspikes': return mirror(line('M58 60L48 52M56 80L44 80M58 100L48 108M74 44L68 34', OL, 3));
      default: return '';
    }
  }

  function tail(k, body, belly, mark) {
    switch (k) {
      case 'long': return line('M128 160Q166 158 160 124Q158 112 168 108', OL, 11) + line('M128 160Q166 158 160 124Q158 112 168 108', body, 6);
      case 'thin': return line('M130 162Q156 162 160 140', OL, 7) + line('M130 162Q156 162 160 140', body, 3);
      case 'curly': return path('M128 140a14 14 0 1 1 18 14q-10 2-10-8', 'none', 'stroke="' + OL + '" stroke-width="9" stroke-linecap="round"') + path('M128 140a14 14 0 1 1 18 14q-10 2-10-8', 'none', 'stroke="' + body + '" stroke-width="4" stroke-linecap="round"');
      case 'fluffy': return el(146, 140, 18, 28, body, SW + ' transform="rotate(30 146 140)"') + el(152, 128, 8, 10, mark === body ? shade(body, 0.4) : mark, 'stroke="none" transform="rotate(30 152 128)"');
      case 'ringed': return el(148, 140, 14, 30, body, SW + ' transform="rotate(30 148 140)"') + [0, 1, 2].map(function (i) { return el(148 + i * 5, 148 - i * 12, 12, 3.5, mark === '#ffffff' ? shade(body, -0.35) : mark, 'stroke="none" transform="rotate(30 148 140)"'); }).join('');
      case 'stub': return circ(134, 160, 9, body);
      case 'flat': return el(144, 168, 18, 9, '#6e4426', SW + ' transform="rotate(-20 144 168)"');
      case 'fish': return path('M128 160L160 142L156 172L164 186Z', shade(body, 0.1));
      case 'feather': return path('M128 156L160 138L152 156L166 160L150 166L158 178Z', shade(body, -0.15));
      case 'horse': return path('M130 150Q160 140 158 176Q148 164 136 168Z', mark);
      case 'snake': return line('M128 166Q168 176 162 140Q156 120 172 118', '#3a5a40', 9) + line('M128 166Q168 176 162 140Q156 120 172 118', '#7fb08a', 4);
      case 'nine': return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function (i) { var a = -80 + i * 20; return el(100, 108, 10, 34, body, SW + ' transform="rotate(' + a + ' 100 160)"') + el(100, 78, 6, 8, mark, 'stroke="none" transform="rotate(' + a + ' 100 160)"'); }).join('');
      default: return '';
    }
  }

  function back(k, body, mark) {
    switch (k) {
      case 'shell': return el(100, 142, 50, 40, mark) + path('M100 112l14 10v16l-14 10-14-10v-16z', shade(mark, 0.25), 'stroke="' + shade(mark, -0.3) + '" stroke-width="2"');
      case 'spiral': return circ(140, 138, 30, '#e9d2b4') + line('M140 138m-6 0a6 6 0 1 1 12 0a12 12 0 1 1-24 0a18 18 0 1 1 36 0', '#b8916a', 3);
      case 'ladyshell': return el(100, 146, 46, 40, body) + line('M100 108V184', OL, 3) + [[80, 134], [120, 134], [76, 160], [124, 160], [100, 172]].map(function (p) { return circ(p[0], p[1], 6, mark, 'stroke="none"'); }).join('');
      case 'beetle': return el(100, 146, 46, 40, shade(body, -0.25)) + line('M100 108V184', OL, 3);
      case 'wings': return mirror(el(58, 122, 26, 14, '#ffffffaa', 'stroke="' + OL + '" stroke-width="2" transform="rotate(-30 58 122)"'));
      case 'hump': return el(122, 120, 18, 14, body);
      default: return '';
    }
  }

  function legs(k, body, pose, three) {
    var c = shade(body, -0.08);
    if (k === 'tentacles') return [70, 88, 112, 130].map(function (x, i) { return line('M' + x + ' 168q' + (i % 2 ? 8 : -8) + ' 10 0 18', OL, 11) + line('M' + x + ' 168q' + (i % 2 ? 8 : -8) + ' 10 0 18', body, 6); }).join('');
    if (k === 'fins') return mirror(path('M78 168L64 186L92 182Z', c));
    if (k === 'three') return [80, 100, 120].map(function (x) { return el(x, 178, 8, 6, '#f2b84a'); }).join('');
    if (pose === 'sit') return el(76, 174, 14, 10, c) + el(124, 174, 14, 10, c);
    if (pose === 'run') return el(80, 176, 13, 8, c, SW + ' transform="rotate(-18 80 176)"') + el(122, 168, 13, 8, c, SW + ' transform="rotate(24 122 168)"');
    return el(84, 178, 13, 8, c) + el(116, 178, 13, 8, c);
  }

  function outfit(k, main, accent, behind) {
    var dark = shade(main, -0.25);
    if (behind) {
      if (k === 'cape') return path('M66 124Q50 170 58 186L142 186Q150 170 134 124Z', main);
      if (k === 'hoodie' || k === 'raincoat') return el(100, 118, 38, 14, dark);
      return '';
    }
    switch (k) {
      case 'hanbok': return '<g clip-path="url(#B)">' + '<rect x="56" y="110" width="88" height="40" fill="' + main + '"/>' + '<rect x="56" y="150" width="88" height="40" fill="' + accent + '"/></g>' + line('M84 116L100 140L116 116', '#ffffff', 6) + line('M100 140l-4 22M100 140l10 20', accent === '#ffffff' ? dark : accent, 4) + circ(100, 140, 4, accent === '#ffffff' ? dark : accent, 'stroke="none"');
      case 'cape': return circ(100, 122, 6, accent);
      case 'apron': return path('M78 128h44v36q0 14-22 14t-22-14z', main) + path('M90 148h20v12h-20z', accent, 'stroke="' + OL + '" stroke-width="2"') + line('M80 128Q100 112 120 128', main, 4);
      case 'hoodie': return '<g clip-path="url(#B)"><rect x="56" y="110" width="88" height="80" fill="' + main + '"/></g>' + path('M82 156h36l4 14h-44z', accent, 'stroke="' + OL + '" stroke-width="2"') + line('M94 122v12M106 122v12', '#ffffff', 2.5);
      case 'scarf': return el(100, 122, 32, 9, main) + path('M112 126l8 32l-12 2l-6-30z', main) + line('M110 140h10M112 150h10', accent, 3);
      case 'overall': return '<g clip-path="url(#B)"><rect x="56" y="150" width="88" height="40" fill="' + main + '"/></g>' + path('M86 130h28v22h-28z', main) + line('M86 132L78 118M114 132L122 118', main, 5) + circ(88, 136, 3, accent, 'stroke="none"') + circ(112, 136, 3, accent, 'stroke="none"');
      case 'robe': return '<g clip-path="url(#B)"><rect x="56" y="110" width="88" height="80" fill="' + main + '"/></g>' + line('M86 116L114 150M114 116L96 136', '#ffffff', 4) + '<rect x="66" y="150" width="68" height="8" fill="' + accent + '" ' + SW + '/>';
      case 'vest': return '<g clip-path="url(#B)"><path d="M56 110h36v80h-36zM108 110h36v80h-36z" fill="' + main + '"/></g>' + line('M92 118V176M108 118V176', OL, 2.5) + circ(88, 140, 2.5, accent, 'stroke="none"') + circ(88, 154, 2.5, accent, 'stroke="none"');
      case 'sailor': return path('M72 118h56l-10 22h-36z', main) + path('M96 138l4 12l4-12z', accent);
      case 'raincoat': return '<g clip-path="url(#B)"><rect x="56" y="110" width="88" height="80" fill="' + main + '"/></g>' + line('M100 118V184', dark, 2.5) + [130, 146, 162].map(function (y) { return circ(106, y, 3, accent, 'stroke="none"'); }).join('');
      case 'armor': return path('M76 122h48l-4 34q-20 14-40 0z', '#d8dde6') + path('M86 130h28l-2 18q-12 8-24 0z', main, 'stroke="none"') + circ(80, 128, 2.5, accent, 'stroke="none"') + circ(120, 128, 2.5, accent, 'stroke="none"');
      case 'sweater': return '<g clip-path="url(#B)"><rect x="56" y="110" width="88" height="80" fill="' + main + '"/><rect x="56" y="136" width="88" height="6" fill="' + accent + '"/><rect x="56" y="152" width="88" height="6" fill="' + accent + '"/></g>';
      default: return '';
    }
  }
  var LONG_SLEEVE = { hanbok: 1, hoodie: 1, robe: 1, raincoat: 1, sweater: 1 };

  function face(sp, expression, body, belly, mark, head) {
    var snout = sp[1], m = sp[2], out = '';
    var faceTone = shade(head, 0.45);
    switch (m) {
      case 'patch': out += '<g clip-path="url(#H)">' + el(76, 70, 22, 20, mark, 'stroke="none"') + '</g>'; break;
      case 'mask': out += el(84, 86, 11, 10, mark, 'stroke="none"') + el(116, 86, 11, 10, mark, 'stroke="none"'); break;
      case 'brows': out += el(84, 72, 7, 4, mark, 'stroke="none"') + el(116, 72, 7, 4, mark, 'stroke="none"') + el(74, 100, 9, 7, mark, 'stroke="none"') + el(126, 100, 9, 7, mark, 'stroke="none"'); break;
      case 'cheeks': out += '<g clip-path="url(#H)">' + el(100, 112, 40, 20, mark, 'stroke="none"') + '</g>'; break;
      case 'stripes': out += line('M92 46l4 10M100 44v12M108 46l-4 10', mark, 3) + line('M58 84h10M58 94h8M142 84h-10M142 94h-8', mark, 3); break;
      case 'spots': out += [[78, 56], [120, 54], [64, 76], [134, 78], [100, 50]].map(function (p) { return circ(p[0], p[1], 3.5, mark, 'stroke="none"'); }).join(''); break;
      case 'skunk': out += path('M94 40q6 30 12 0z', mark, 'stroke="none"'); break;
      case 'stripe': out += line('M64 98L78 112', mark, 4); break;
      case 'eyering': out += circ(84, 86, 9, mark, 'stroke="none"') + circ(116, 86, 9, mark, 'stroke="none"'); break;
      case 'whiteface': out += '<g clip-path="url(#H)">' + el(100, 92, 34, 26, mark, 'stroke="none"') + '</g>'; break;
      case 'falcon': out += line('M80 94q-2 10-6 16M120 94q2 10 6 16', mark, 5); break;
      case 'orca': out += el(80, 78, 9, 6, mark, 'stroke="none"') + el(120, 78, 9, 6, mark, 'stroke="none"') + '<g clip-path="url(#H)">' + el(100, 120, 34, 16, mark, 'stroke="none"') + '</g>'; break;
      case 'gills': out += line('M62 92v10M66 90v14M138 92v10M134 90v14', mark, 2.5); break;
      case 'foxmarks': out += path('M100 50l-5 10h10z', mark, 'stroke="none"') + line('M64 90l8-2M136 90l-8-2', mark, 3); break;
      case 'cheekspot': out += circ(66, 98, 5, mark, 'stroke="none"') + circ(134, 98, 5, mark, 'stroke="none"'); break;
      case 'fluff': out += [80, 92, 104, 116].map(function (x) { return circ(x, 46, 10, mark, 'stroke="none"'); }).join(''); break;
      case 'mane': out += path('M92 42Q104 30 114 40Q110 52 98 52Z', mark); break;
      case 'bands': case 'scales': out += line('M66 62q34-10 68 0M62 76q38-10 76 0', mark, 2.5); break;
      case 'sunaura': break;
    }
    // 원숭이류는 얼굴 판을 깝니다.
    if (snout === 'face') out += el(100, 92, 30, 26, belly, 'stroke="none"');
    out += eyes(expression, m === 'mask' || m === 'orca' ? '#ffffff' : OL, head);
    var mouthY = 108;
    switch (snout) {
      case 'muzzle': case 'teeth': case 'fangs': case 'tusks':
        out += el(100, 104, 15, 11, m === 'cheeks' ? mark : faceTone, 'stroke="none"') + el(100, 98, 5, 3.5, OL, 'stroke="none"');
        if (snout === 'teeth') out += '<rect x="96" y="108" width="8" height="7" rx="1" fill="#fff" ' + SW.replace('3', '2') + '/>';
        if (snout === 'fangs') out += path('M93 108l2 8 2-8zM103 108l2 8 2-8z', '#fff', 'stroke="' + OL + '" stroke-width="1.5"');
        if (snout === 'tusks') out += path('M86 106q-4 6 0 10M114 106q4 6 0 10', 'none', 'stroke="#fff6e0" stroke-width="4" stroke-linecap="round"');
        out += mouth(expression, 100, 106); break;
      case 'long': out += el(100, 106, 12, 15, faceTone) + el(100, 96, 5, 3.5, OL, 'stroke="none"') + mouth(expression, 100, 112); break;
      case 'trunk': out += path('M92 96q0 30 8 34q8-4 8-34z', shade(head, 0.15)) + mouth(expression, 100, 102, true); break;
      case 'tube': out += '<rect x="92" y="96" width="16" height="22" rx="7" fill="' + shade(head, 0.15) + '" ' + SW + '/>'; break;
      case 'face': out += el(100, 104, 4, 3, OL, 'stroke="none"') + mouth(expression, 100, 110); break;
      case 'pig': out += el(100, 104, 12, 8, '#f39aa5') + circ(96, 104, 2, OL, 'stroke="none"') + circ(104, 104, 2, OL, 'stroke="none"') + mouth(expression, 100, 116); break;
      case 'hippo': out += el(100, 108, 26, 15, faceTone) + circ(92, 102, 2.2, OL, 'stroke="none"') + circ(108, 102, 2.2, OL, 'stroke="none"') + mouth(expression, 100, 114); break;
      case 'duckbill': case 'redbill': out += el(100, 106, 18, 8, snout === 'redbill' ? '#e2453c' : '#e8a24a') + line('M88 106h24', OL, 1.5); break;
      case 'beak': case 'darkbeak': out += path('M90 98h20l-10 14z', snout === 'darkbeak' ? '#3a3a42' : '#f2a33a'); break;
      case 'hook': out += path('M90 96h20q2 14-10 18q4-8-10-18z', '#f2c14a'); break;
      case 'longbeak': out += path('M96 98h8l-4 30z', '#4a3a35'); break;
      case 'bigbeak': out += path('M92 94q34-4 34 14q-14 10-34 2z', '#f29b2f') + path('M110 94q10 2 14 8', 'none', 'stroke="#e2453c" stroke-width="4"'); break;
      case 'puffin': out += path('M90 96q14-6 22 6q-8 12-22 4z', '#f2733a') + line('M96 98q4 4 0 8', '#f6c84a', 3); break;
      case 'flamingo': out += path('M92 98q16-2 18 6q0 10-8 14q2-10-10-12z', '#f6e6ea') + path('M104 110q2 6-2 8', '#3a3a40'); break;
      default: out += mouth(expression, 100, mouthY - 4);
    }
    if (expression !== 'flat' && expression !== 'determined' && expression !== 'smug') out += el(70, 102, 7, 4.5, '#f6a3b5', 'stroke="none" opacity="0.75"') + el(130, 102, 7, 4.5, '#f6a3b5', 'stroke="none" opacity="0.75"');
    if (expression === 'pout') out += el(68, 102, 11, 8, '#f6a3b5', 'stroke="none" opacity="0.8"') + el(132, 102, 11, 8, '#f6a3b5', 'stroke="none" opacity="0.8"');
    return out;
  }
  function eyes(e, ink, head) {
    var hi = '#ffffff';
    function dot(x, r) { return circ(x, 86, r || 5.5, ink === '#ffffff' ? OL : OL, ink === '#ffffff' ? 'stroke="#fff" stroke-width="2"' : 'stroke="none"') + circ(x + 1.8, 84, 1.8, hi, 'stroke="none"'); }
    function arc(x, up) { return line(up ? 'M' + (x - 6) + ' 88q6-8 12 0' : 'M' + (x - 6) + ' 84q6 8 12 0', ink === '#ffffff' ? '#fff' : OL, 3); }
    switch (e) {
      case 'laugh': case 'tongue': return arc(84, true) + arc(116, true);
      case 'calm': case 'sing': return arc(84, false) + arc(116, false);
      case 'wink': return dot(84) + arc(116, true);
      case 'sleepy': return line('M78 88h12M110 88h12', ink === '#ffffff' ? '#fff' : OL, 3) + '<text x="134" y="60" font-size="14" font-weight="700" fill="' + OL + '" font-family="sans-serif">z</text>';
      case 'sparkle': return circ(84, 86, 7.5, OL, 'stroke="none"') + circ(116, 86, 7.5, OL, 'stroke="none"') + circ(86.5, 83, 2.6, hi, 'stroke="none"') + circ(118.5, 83, 2.6, hi, 'stroke="none"') + circ(81.5, 89, 1.4, hi, 'stroke="none"') + circ(113.5, 89, 1.4, hi, 'stroke="none"') + path('M146 52l2 5 5 2-5 2-2 5-2-5-5-2 5-2z', '#f6cf5a', 'stroke="none"');
      case 'determined': return dot(84) + dot(116) + line('M76 74l14 4M124 74l-14 4', OL, 3);
      case 'shy': return line('M78 88q6 4 12 0M110 88q6 4 12 0', OL, 3);
      case 'surprised': return circ(84, 86, 8, '#fff', 'stroke="' + OL + '" stroke-width="2.5"') + circ(116, 86, 8, '#fff', 'stroke="' + OL + '" stroke-width="2.5"') + circ(84, 87, 4, OL, 'stroke="none"') + circ(116, 87, 4, OL, 'stroke="none"');
      case 'flat': case 'smug': return dot(84) + dot(116) + line('M77 82h14M109 82h14', head === OL ? '#fff' : shade(head, -0.45), 4);
      default: return dot(84) + dot(116);
    }
  }
  function mouth(e, x, y, small) {
    switch (e) {
      case 'grin': return path('M' + (x - 8) + ' ' + y + 'q8 12 16 0z', '#7a3346', 'stroke="' + OL + '" stroke-width="2.5"') + path('M' + (x - 5) + ' ' + y + 'l2 4 2-4z', '#fff', 'stroke="none"');
      case 'laugh': return path('M' + (x - 9) + ' ' + y + 'q9 14 18 0z', '#7a3346', 'stroke="' + OL + '" stroke-width="2.5"') + el(x, y + 6, 4.5, 2.5, '#f27a8a', 'stroke="none"');
      case 'tongue': return path('M' + (x - 7) + ' ' + y + 'q7 6 14 0', 'none', 'stroke="' + OL + '" stroke-width="2.5"') + el(x + 2, y + 6, 4, 5, '#f27a8a');
      case 'surprised': case 'sing': return el(x, y + 3, 4, 5, '#7a3346', 'stroke="' + OL + '" stroke-width="2.5"') + (e === 'sing' ? '<text x="140" y="70" font-size="18" fill="' + OL + '" font-family="sans-serif">♪</text>' : '');
      case 'flat': return line('M' + (x - 6) + ' ' + (y + 2) + 'h12', OL, 2.5);
      case 'smug': return line('M' + (x - 6) + ' ' + (y + 2) + 'q8 2 12-4', OL, 2.5);
      case 'pout': return line('M' + (x - 4) + ' ' + (y + 3) + 'q4-4 8 0', OL, 2.5);
      case 'shy': return line('M' + (x - 6) + ' ' + (y + 2) + 'q3-3 6 0t6 0', OL, 2.5);
      case 'determined': return line('M' + (x - 5) + ' ' + (y + 2) + 'q5 3 10 0', OL, 2.5);
      default: return line('M' + (x - 7) + ' ' + y + 'q3.5 5 7 0q3.5 5 7 0', OL, 2.5);
    }
  }

  function hat(k, main, accent) {
    switch (k) {
      case 'gat': return el(100, 46, 50, 8, '#2f2f3acc') + '<rect x="84" y="18" width="32" height="28" rx="6" fill="#2f2f3acc" ' + SW + '/>' + line('M60 50q2 40 30 54M140 50q-2 40-30 54', '#2f2f3a', 1.5);
      case 'beret': return el(108, 44, 34, 13, main, SW + ' transform="rotate(10 108 44)"') + circ(110, 30, 4, accent === '#ffffff' ? main : accent);
      case 'crown': return path('M78 48L80 24L90 36L100 18L110 36L120 24L122 48Z', '#f6cf5a') + circ(100, 34, 3.5, '#e2453c', 'stroke="none"');
      case 'beanie': return path('M58 66Q60 26 100 24Q140 26 142 66Z', main) + '<rect x="56" y="56" width="88" height="14" rx="7" fill="' + accent + '" ' + SW + '/>' + circ(100, 22, 9, accent);
      case 'flowercrown': return [70, 84, 100, 116, 130].map(function (x, i) { var y = 54 - [0, 10, 14, 10, 0][i]; return circ(x, y, 7, ['#f6a3b5', '#f6cf5a', '#ffffff', '#b8a6f0', '#f6a3b5'][i]) + circ(x, y, 2.5, '#f29b2f', 'stroke="none"'); }).join('');
      case 'headband': return path('M58 70Q60 36 100 34Q140 36 142 70', 'none', 'stroke="' + main + '" stroke-width="7" stroke-linecap="round"') + path('M120 38l14-8v16zM120 38l-4-12 12 4z', accent === '#ffffff' ? main : accent);
      case 'strawhat': return el(100, 50, 56, 12, '#f2d58a') + path('M74 50Q74 20 100 20Q126 20 126 50Z', '#f2d58a') + '<rect x="74" y="40" width="52" height="8" fill="' + main + '"/>';
      case 'goggles': return line('M56 66Q100 52 144 66', '#5a4a3a', 6) + circ(86, 60, 11, '#bfe3f2') + circ(114, 60, 11, '#bfe3f2');
      case 'ribbon': return path('M126 46l20-12v24zM126 46l-18-14v24z', main) + circ(126, 46, 5, accent === '#ffffff' ? shade(main, -0.2) : accent);
      case 'sprout': return line('M100 42V26', '#4f8f3f', 3) + path('M100 30c-12 0-14-10-14-10s12-2 14 10zM100 28c10 0 14-8 14-8s-12-2-14 8z', '#7fcf6a');
      case 'starpin': return path('M128 50l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z', '#f6cf5a');
      case 'towel': return path('M74 46Q76 30 100 30Q124 30 126 46Q100 52 74 46Z', '#ffffff') + line('M84 40h32', '#bcd7ec', 2.5);
      default: return '';
    }
  }

  function prop(k) {
    switch (k) {
      case 'cup': return path('M-12-6h24l-3 16h-18z', '#ffffff') + path('M12-2q8 0 6 6t-8 4', 'none', SW) + line('M-4-12q2-4 0-8M4-12q2-4 0-8', '#c8c0d8', 2);
      case 'leaf': return path('M0 16C-18 4-14-16 0-22C14-16 18 4 0 16Z', '#7fcf6a') + line('M0 14V-18', '#4f8f3f', 2);
      case 'magnifier': return circ(-2, -6, 11, '#d6efff') + line('M6 2l10 12', '#8a5a36', 5);
      case 'flag': return line('M-10 18V-22', '#8a5a36', 3.5) + path('M-10-22h24l-6 8 6 8h-24z', '#e2453c');
      case 'lantern': return line('M0-22v6', OL, 2) + '<rect x="-10" y="-16" width="20" height="26" rx="8" fill="#f6b84a" ' + SW + '/>' + circ(0, -3, 5, '#fff3c4', 'stroke="none"');
      case 'basket': return path('M-16-4h32l-5 18h-22z', '#d9a65a') + line('M-12-4Q0-22 12-4', '#a8763a', 3) + circ(-5, -7, 4, '#e2453c') + circ(4, -8, 4, '#f6cf5a');
      case 'wand': return line('M-8 18L4-8', '#8a5a36', 3.5) + path('M6-22l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z', '#f6cf5a');
      case 'telescope': return '<rect x="-18" y="-6" width="34" height="11" rx="3" fill="#d9a65a" ' + SW + ' transform="rotate(-25)"/>' + circ(14, -10, 5, '#bfe3f2');
      case 'jar': return path('M-12-10h24q6 8 4 18q-2 8-16 8t-16-8q-2-10 4-18z', '#c9875a') + '<rect x="-9" y="-16" width="18" height="7" rx="2" fill="#a8663a" ' + SW + '/>';
      case 'bell': return path('M-12 8q0-22 12-22t12 22z', '#f6cf5a') + circ(0, 11, 3.5, '#a8763a');
      case 'brush': return line('M10-20L-4 8', '#8a5a36', 4) + path('M-4 6q-8 4-8 14q8-2 12-10z', '#3a3a42');
      case 'scroll': return '<rect x="-16" y="-12" width="32" height="24" rx="2" fill="#f6ead0" ' + SW + '/>' + line('M-8-2h6l4 6h8', '#e2453c', 2) + circ(-8, -2, 2, '#e2453c', 'stroke="none"');
      case 'log': return '<rect x="-20" y="-7" width="40" height="14" rx="7" fill="#b8814f" ' + SW + '/>' + el(18, 0, 4, 7, '#e8c79a');
      case 'shield': return path('M0-18l15 6v10q0 14-15 20q-15-6-15-20v-10z', '#8fb3d9') + path('M0-10v18', 'none', 'stroke="#fff" stroke-width="3"');
      case 'hourglass': return path('M-10-16h20l-8 16 8 16h-20l8-16z', '#f6ead0') + path('M-4 10h8l2 4h-12z', '#f2c14a', 'stroke="none"');
      case 'candle': return '<rect x="-6" y="-8" width="12" height="22" rx="2" fill="#fff6e4" ' + SW + '/>' + path('M0-10q6-6 0-14q-6 8 0 14z', '#f6b84a');
      case 'flower': return line('M0 18V0', '#4f8f3f', 3) + [0, 72, 144, 216, 288].map(function (a) { return el(0, -14, 5, 8, '#f6a3b5', SW.replace('3', '2') + ' transform="rotate(' + a + ' 0 -6)"'); }).join('') + circ(0, -6, 4.5, '#f6cf5a');
      case 'shovel': return line('M0-22V6', '#8a5a36', 4) + path('M-8 4h16v8q-8 10-16 0z', '#b8c0cc');
      case 'balloon': return line('M0 0q4 10-2 20', OL, 1.5) + el(0, -14, 13, 15, '#f27a8a');
      case 'rod': return line('M-14 18L16-22', '#8a5a36', 3.5) + line('M16-22q8 14 6 30', OL, 1.5);
      case 'drum': return el(0, -6, 16, 6, '#f6ead0') + path('M-16-6v16q16 10 32 0v-16', '#e2453c') + line('M-8 0v12M8 0v12', '#f6cf5a', 2);
      case 'compass': return circ(0, 0, 14, '#f6ead0') + path('M0-10l4 10-4 10-4-10z', '#e2453c', 'stroke="none"');
      case 'perfume': return path('M-10-4h20v18h-20z', '#d8c6f6') + '<rect x="-4" y="-12" width="8" height="8" fill="#f6cf5a" ' + SW + '/>' + line('M10-14l6-4M12-10h6', '#b8a6f0', 2);
      case 'letter': return '<rect x="-16" y="-11" width="32" height="22" rx="2" fill="#ffffff" ' + SW + '/>' + line('M-16-11L0 2L16-11', OL, 2) + circ(0, 2, 3.5, '#e2453c', 'stroke="none"');
      case 'pinwheel': return line('M0 0v22', '#8a5a36', 3) + ['#f27a8a', '#7fcf6a', '#8fb3d9', '#f6cf5a'].map(function (c, i) { return path('M0 0l0-16q10 4 0 16z', c, SW.replace('3', '2') + ' transform="rotate(' + i * 90 + ')"'); }).join('');
      case 'wateringcan': return path('M-12-8h18v18h-18z', '#8fc1e3') + line('M6-4l12-8', '#8fc1e3', 4) + path('M-12-4q-8 0-6 8', 'none', SW);
      case 'fan': return path('M0 12L-18-10Q0-22 18-10Z', '#f6a3b5') + line('M0 12L-9-14M0 12V-17M0 12L9-14', OL, 1.5);
      case 'umbrella': return path('M-20-4Q0-28 20-4Z', '#8fb3d9') + line('M0-4v20q0 4-4 4', OL, 3);
      case 'fish': return line('M0-20v8', OL, 2) + el(-4, -2, 10, 5, '#8fb3d9') + el(4, 10, 10, 5, '#f6b84a');
      case 'flute': return '<rect x="-20" y="-4" width="40" height="8" rx="4" fill="#d9b86a" ' + SW + ' transform="rotate(-20)"/>';
      case 'horn': return path('M-14 4L4-4q10-8 14 0v12q-4 8-14 0L-14 8z', '#f6cf5a');
      case 'key': return circ(0, -12, 7, '#f6cf5a') + line('M0-5v22M0 10h6M0 16h5', '#f6cf5a', 4);
      case 'shell': return path('M-14 10Q-16-14 0-16Q16-14 14 10Q0 4-14 10Z', '#f6d8c4') + line('M-6 8l2-18M4 8l-2-18', '#d9a68a', 2);
      case 'clover': return line('M0 18V2', '#4f8f3f', 3) + [0, 90, 180, 270].map(function (a) { return circ(0, -6, 6, '#7fcf6a', SW.replace('3', '2') + ' transform="rotate(' + a + ' 0 2)"'); }).join('');
      case 'yarn': return circ(0, 0, 14, '#f6f3ea') + line('M-10-8q10 8 20 0M-12 2q12 8 24 0M-8 10q8 4 16 0', '#d6cfbe', 2);
      case 'mic': return line('M0 2v18', OL, 4) + el(0, -8, 8, 11, '#b8c0cc');
      case 'sun': return circ(0, 0, 13, '#f6b84a') + [0, 45, 90, 135, 180, 225, 270, 315].map(function (a) { return line('M0-17v-5', '#f6b84a', 3).replace('d="', 'transform="rotate(' + a + ')" d="'); }).join('');
      case 'ball': return circ(0, 0, 13, '#ffffff') + path('M-13 0h26', 'none', 'stroke="#e2453c" stroke-width="5"') + circ(0, 0, 13, 'none');
      default: return '';
    }
  }

  function render(c) {
    var sp = S[c.kind];
    if (!sp) throw new Error('Unknown species ' + c.kind);
    var body = sp[6], belly = sp[7], mark = sp[8], head = sp[9] || body, main = c.palette.main, accent = c.palette.accent;
    var pose = c.pose, sleeve = LONG_SLEEVE[c.outfit] ? main : body;
    var hands = {
      hold: [[64, 156], [146, 118]], cheer: [[56, 108], [144, 108]], wave: [[64, 156], [150, 100]],
      hug: [[86, 150], [114, 150]], sit: [[86, 152], [114, 152]], run: [[58, 142], [146, 122]]
    }[pose];
    var propAt = c.prop === 'none' ? null : pose === 'hug' || pose === 'sit' ? [100, 148] : pose === 'cheer' ? [144, 92] : pose === 'wave' ? [64, 150] : hands[1];
    var arm = function (from, to) { return line('M' + from[0] + ' ' + from[1] + 'L' + to[0] + ' ' + to[1], OL, 17) + line('M' + from[0] + ' ' + from[1] + 'L' + to[0] + ' ' + to[1], sleeve, 11) + circ(to[0], to[1], 7.5, body); };
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="' + c.animal + ' ' + c.nick + '">' +
      '<defs><clipPath id="B"><ellipse cx="100" cy="148" rx="36" ry="33"/></clipPath><clipPath id="H"><circle cx="100" cy="84" r="44"/></clipPath></defs>' +
      background(c.theme) +
      back(sp[4] === 'wings' || sp[4] === 'hump' ? sp[4] : '', body, mark) +
      tail(sp[3], body, belly, mark) + outfit(c.outfit, main, accent, true) +
      (sp[4] && sp[4] !== 'wings' && sp[4] !== 'hump' ? back(sp[4], body, mark) : '') +
      legs(sp[5] === 'feet' ? 'feet' : sp[5], body, pose, sp[5] === 'three') +
      (sp[4] === 'ladyshell' || sp[4] === 'beetle' ? '' : el(100, 148, 36, 33, body) + el(100, 156, 22, 19, belly, 'stroke="none"')) +
      (sp[2] === 'moon' ? path('M84 128q16 12 32 0q-16 6-32 0z', mark, 'stroke="none"') : '') + (sp[2] === 'sunband' ? path('M84 126q16 14 32 0', 'none', 'stroke="' + mark + '" stroke-width="6" stroke-linecap="round"') : '') +
      (sp[2] === 'legstripes' ? line('M76 168h16M78 176h14M108 168h16M108 176h14', mark, 2.5) : '') + (sp[2] === 'neckring' ? el(100, 122, 22, 4, mark, 'stroke="none"') : '') + (sp[2] === 'grooves' ? line('M90 150v18M100 150v20M110 150v18', mark, 2) : '') +
      outfit(c.outfit, main, accent, false) +
      (sp[2] === 'sunaura' ? circ(100, 84, 52, 'none', 'stroke="#f2b84a" stroke-width="4" stroke-dasharray="4 7"') : '') +
      ears(sp[0], head, belly, mark) +
      circ(100, 84, 44, head) + face(sp, c.expression, body, belly, mark, head) +
      (sp[0] === 'bulge' ? mirror(circ(78, 50, 9, '#fff', 'stroke="none"')) : '') +
      hat(c.hat, main, accent) +
      arm([72, 134], hands[0]) + arm([128, 134], hands[1]) +
      (propAt ? '<g transform="translate(' + propAt[0] + ' ' + propAt[1] + ')">' + prop(c.prop) + '</g>' : '') +
      '</svg>';
    // 한 페이지에 여러 SVG가 있어도 clipPath id가 겹치지 않게 합니다.
    return svg.replace(/id="B"/g, 'id="B' + c.id + '"').replace(/url\(#B\)/g, 'url(#B' + c.id + ')').replace(/id="H"/g, 'id="H' + c.id + '"').replace(/url\(#H\)/g, 'url(#H' + c.id + ')');
  }
  window.PharmacoReserveArt = { render: render, species: S };
})();
