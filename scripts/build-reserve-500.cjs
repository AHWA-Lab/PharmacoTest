// 그림 없이 묘사만 있는 예비 캐릭터 500종을 만듭니다. 다른 이미지 AI가 그대로 그릴 수 있도록
// 캐릭터마다 한국어 묘사와 공통 화풍 지시를 합친 프롬프트를 생성합니다.
// 사용: node scripts/build-reserve-500.cjs → reserve-plans.js, research/reserve-500-prompts.json
const fs = require('node:fs'), path = require('node:path');
const root = path.join(__dirname, '..');
const order = ['myth', 'classic', 'world', 'toys', 'jobs', 'memes', 'genre', 'nature'];
const STYLE = 'Cute chibi mascot illustration for a Korean personality-test site. Bold clean dark outlines, big head and small body (chibi proportions), soft pastel shading, warm cream plain background, full body centered with 10% padding, one character only. Wholesome and non-sexual for all ages. No text, letters, logos or watermarks. Do not copy any existing copyrighted character design or any real person\'s face; create an original design from the description.';
const characters = [], categories = [];
for (const file of order) {
  const groups = require('./reserve500/' + file + '.cjs');
  for (const key of Object.keys(groups)) {
    const [label, rows] = groups[key];
    categories.push({ id: key, label, count: rows.length });
    rows.forEach((r) => {
      if (r.length < 8 || r.slice(0, 8).some(v => !v || !String(v).trim())) throw new Error('Incomplete row in ' + key + ': ' + r[0]);
      const [nick, subject, look, prop, pose, expression, colors, persona, motif] = r;
      const id = 'P' + String(characters.length + 1).padStart(3, '0');
      const description = `${subject}. 외형·복장: ${look}. 소품: ${prop}. 동작: ${pose}. 표정: ${expression}. 색감: ${colors}.`;
      characters.push({ id, category: key, nick, subject, look, prop, pose, expression, colors, persona, motif: motif || null, description,
        prompt: STYLE + '\n\nCharacter (described in Korean): ' + description + '\nPersonality to convey: ' + persona + (motif ? '\nInspired by (homage only, original design): ' + motif : '') });
    });
  }
}
if (characters.length !== 500) throw new Error('Expected 500 characters, got ' + characters.length + ' ' + JSON.stringify(categories.map(c => c.id + ':' + c.count)));
const dupes = characters.map(c => c.nick).filter((n, i, a) => a.indexOf(n) !== i);
if (dupes.length) throw new Error('Duplicate nicknames: ' + dupes.join(', '));
const plain = characters.map(({ prompt, ...rest }) => rest);
fs.writeFileSync(path.join(root, 'reserve-plans.js'), '// scripts/build-reserve-500.cjs로 생성합니다. 직접 고치지 말고 scripts/reserve500/*.cjs를 고친 뒤 다시 실행하세요.\nwindow.PharmacoReservePlans = ' + JSON.stringify({ style: STYLE, categories, characters: plain }) + ';\n');
fs.writeFileSync(path.join(root, 'research/reserve-500-prompts.json'), JSON.stringify({ style: STYLE, categories, characters }, null, 2) + '\n');
console.log('wrote', characters.length, 'characters in', categories.length, 'categories');
console.log(categories.map(c => c.label + ' ' + c.count).join(' · '));
