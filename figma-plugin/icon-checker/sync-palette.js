/* docs/color-tokens.json → code.js 의 PALETTE 블록을 다시 쓴다.
 * 토큰이 바뀌면 `node figma-plugin/icon-checker/sync-palette.js` 를 한 번 돌린다.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const tokens = JSON.parse(fs.readFileSync(path.join(root, 'docs/color-tokens.json'), 'utf8'));
const target = path.join(__dirname, 'code.js');

const lines = [];
for (const [hue, ramp] of Object.entries(tokens.hues)) {
  for (const step of tokens.steps) {
    const hex = ramp[step];
    if (!hex) continue;
    lines.push("  { family: '" + hue + "', step: '" + step + "', hex: '" + hex.toUpperCase() + "' }");
  }
}

const block =
  '// P14 컬러 시스템 — docs/color-tokens.json 에서 생성한다. 직접 고치지 말고 sync-palette.js 를 돌린다.\n' +
  'var PALETTE = [\n' + lines.join(',\n') + '\n];';

const src = fs.readFileSync(target, 'utf8');
const re = /\/\/ P14 컬러 시스템[\s\S]*?\nvar PALETTE = \[[\s\S]*?\n\];/;
if (!re.test(src)) { console.error('PALETTE 블록을 찾지 못했다.'); process.exit(1); }
fs.writeFileSync(target, src.replace(re, block));
console.log('PALETTE ' + lines.length + '개 갱신 · ' + Object.keys(tokens.hues).length + ' hue');
