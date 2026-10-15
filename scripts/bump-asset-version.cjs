// 모든 페이지의 로컬 js/css 주소에 ?v=버전을 붙입니다. 배포할 때마다 실행하면
// 브라우저에 남은 예전 스크립트와 새 페이지가 섞여 화면이 비는 일을 막습니다.
// 사용: node scripts/bump-asset-version.cjs [버전]  (기본값: 현재 시각)
const fs = require('node:fs'), path = require('node:path');
const root = path.join(__dirname, '..');
const version = process.argv[2] || new Date().toISOString().replace(/\D/g, '').slice(0, 12);
const pages = ['index.html', ...fs.readdirSync(root).filter(d => fs.existsSync(path.join(root, d, 'index.html'))).map(d => d + '/index.html')];
for (const page of pages) {
  const file = path.join(root, page), html = fs.readFileSync(file, 'utf8');
  const next = html.replace(/(<(?:script|link)\b[^>]*\b(?:src|href)=")((?:\.\.\/)?[\w.-]+\.(?:js|css))(?:\?v=[\w.-]+)?"/g, '$1$2?v=' + version + '"');
  if (next !== html) fs.writeFileSync(file, next);
}
console.log('asset version', version, 'in', pages.length, 'pages');
