/* 아이콘 검사기 회귀 테스트
 *
 *   node figma-plugin/icon-checker/test.js
 *
 * Figma 노드를 흉내 낸 객체로 code.js 를 직접 돌린다. 플러그인을 Figma 에 올리지 않고도
 * 규칙을 고칠 때마다 갈래가 살아 있는지 확인할 수 있다.
 */
var fs = require('fs');
var path = require('path');
var vm = require('vm');

// ── code.js 를 샌드박스에 올린다 (figma 전역을 흉내 낸다)
var notes = [];
var zoomed = null;
var switchedTo = null;
var ctx = {
  console: console,
  figma: {
    mixed: Symbol('mixed'),
    showUI: function () {},
    ui: { postMessage: function (m) { ctx._posted.push(m); }, set onmessage(v) { ctx._h = v; }, get onmessage() { return ctx._h; }, resize: function () {} },
    on: function () {},
    notify: function (m) { notes.push(m); },
    currentPage: null,
    viewport: { scrollAndZoomIntoView: function (n) { zoomed = n[0].name; } },
    getNodeByIdAsync: function (id) { return Promise.resolve(ctx._db[id] || null); },
    setCurrentPageAsync: function (p) { switchedTo = p.name; ctx.figma.currentPage = p; return Promise.resolve(); }
  },
  __html__: '',
  _posted: [],
  _db: {}
};
var pageA = { type: 'PAGE', name: 'Icons', selection: [], findAll: function () { return []; } };
ctx.figma.currentPage = pageA;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'code.js'), 'utf8'), ctx);

// ── 결과 집계
var pass = 0, fail = 0;
function check(label, got, want) {
  var ok = got === want;
  if (ok) pass++; else fail++;
  console.log('  ' + (ok ? '✓' : '✕') + ' ' + label.padEnd(36) + (ok ? got : got + '   (기대: ' + want + ')'));
}

// ── 노드 만들기
var uid = 0;
function solid(hex) {
  return { type: 'SOLID', color: {
    r: parseInt(hex.slice(1, 3), 16) / 255,
    g: parseInt(hex.slice(3, 5), 16) / 255,
    b: parseInt(hex.slice(5, 7), 16) / 255 } };
}
function base(o) {
  return Object.assign({
    id: 'n' + (++uid), type: 'VECTOR', name: 'Vector', visible: true, opacity: 1,
    fills: [], strokes: [], effects: [], blendMode: 'NORMAL', isMask: false
  }, o);
}
function shape(o) {
  return base(Object.assign({ absoluteBoundingBox: {
    x: o.x === undefined ? 3 : o.x, y: o.y === undefined ? 3 : o.y,
    width: o.w === undefined ? 18 : o.w, height: o.h === undefined ? 18 : o.h } }, o));
}
function group(name, kids, visible) {
  return { id: 'g' + (++uid), type: 'GROUP', name: name, visible: visible !== false, opacity: 1,
    children: kids, effects: [], blendMode: 'PASS_THROUGH',
    absoluteBoundingBox: { x: 3, y: 3, width: 18, height: 18 } };
}
function icon(name, kids) {
  return { id: 'root', type: 'COMPONENT', name: name, visible: true, opacity: 1,
    width: 24, height: 24, fills: [], strokes: [], effects: [], blendMode: 'NORMAL',
    absoluteBoundingBox: { x: 0, y: 0, width: 24, height: 24 }, children: kids };
}
/** 사각 루프들로 vectorNetwork 를 만든다. rects = [[x,y,w,h], ...] */
function vector(name, rects, winding, fill) {
  var vertices = [], segments = [], loops = [];
  var all = { x0: 1e9, y0: 1e9, x1: -1e9, y1: -1e9 };
  rects.forEach(function (r) {
    var x = r[0], y = r[1], w = r[2], h = r[3];
    var v0 = vertices.length;
    vertices.push({ x: x, y: y }, { x: x + w, y: y }, { x: x + w, y: y + h }, { x: x, y: y + h });
    var s0 = segments.length;
    for (var k = 0; k < 4; k++) {
      segments.push({ start: v0 + k, end: v0 + (k + 1) % 4, tangentStart: { x: 0, y: 0 }, tangentEnd: { x: 0, y: 0 } });
    }
    loops.push([s0, s0 + 1, s0 + 2, s0 + 3]);
    all.x0 = Math.min(all.x0, x); all.y0 = Math.min(all.y0, y);
    all.x1 = Math.max(all.x1, x + w); all.y1 = Math.max(all.y1, y + h);
  });
  return base({
    name: name, fills: [solid(fill || '#4BA9FF')],
    vectorNetwork: { vertices: vertices, segments: segments, regions: [{ windingRule: winding || 'EVENODD', loops: loops }] },
    absoluteBoundingBox: { x: all.x0, y: all.y0, width: all.x1 - all.x0, height: all.y1 - all.y0 }
  });
}
function deliverable() {
  return [
    shape({ name: 'Base', fills: [solid('#4BA9FF')] }),
    shape({ name: 'Accent', y: 3, h: 5, fills: [solid('#0B72E6')] }),
    shape({ name: 'Detail', x: 8, y: 10, w: 8, h: 2, fills: [solid('#FFFFFF')] })
  ];
}
function codes(node, only) {
  var rep = ctx.checkIcon(node);
  return rep.findings
    .filter(function (f) { return only ? f.code === only : f.sev !== 'info'; })
    .map(function (f) { return f.code; }).join(',') || '(없음)';
}

console.log('\n■ 전반');
check('정상 Multicolor — 지적 0건', codes(icon('ic_doc_money_flat', deliverable().concat([
  group('원본', [shape({ name: 'p', strokes: [{ type: 'SOLID', visible: true }], strokeWeight: 1.5 })], false)
]))), '(없음)');
check('보이는 형태 없음 → 즉시 중단', codes(icon('ic_empty_flat', [])), 'C02');
check('fills = mixed 에도 안 죽는다',
  codes(icon('ic_mixed_flat', [shape({ name: 'm', x: 2, y: 2, w: 20, h: 20, fills: ctx.figma.mixed })])), 'C08,M6');

console.log('\n■ C09 네이밍 · 스타일 판별');
check('대문자·하이픈 → 한 건만', codes(icon('IC_Doc-Money', deliverable()), 'C09'), 'C09');
check('색 2종인데 _flat 없음', codes(icon('ic_doc_money', deliverable()), 'C09'), 'C09');
check('Line 은 M 규칙을 타지 않는다',
  codes(icon('ic_folder_thick', [shape({ name: 'p', strokes: [{ type: 'SOLID', visible: true }], strokeWeight: 1.5,
    strokeAlign: 'INSIDE', strokeCap: 'SQUARE', strokeJoin: 'MITER' })])), 'C08,L2,L3,L3,L1,L4');

console.log('\n■ C08 원본 보존');
function c08(kids) { return codes(icon('ic_doc_money_flat', kids), 'C08') + ' / ' + ctx.checkIcon(icon('ic_doc_money_flat', kids)).findings.filter(function (f) { return f.code === 'C08'; }).map(function (f) { return f.sev; }).join(','); }
var srcGroup = function () { return group('원본', [shape({ name: 'p', strokes: [{ type: 'SOLID', visible: true }], strokeWeight: 1.5 })], false); };
check('백업 없음', c08(deliverable()), 'C08 / warn');
check('백업 = stroke 원본', c08(deliverable().concat([srcGroup()])), 'C08 / info');
check('백업 = 배포본 복사', c08(deliverable().concat([group('원본', [shape({ name: 'p', fills: [solid('#4BA9FF')] })], false)])), 'C08 / warn');
check('안쪽에 숨은 노드',
  c08([group('레이어', [shape({ name: 'Base', fills: [solid('#4BA9FF')] }), shape({ name: '숨김', visible: false })])].concat([srcGroup()])),
  'C08,C08 / info,warn');

console.log('\n■ M4 구멍');
function m4(kids) { return codes(icon('ic_test_flat', kids), 'M4'); }
check('도넛 · 덮개 없음', m4([vector('Base', [[2, 2, 20, 20], [8, 8, 8, 8]])]), 'M4');
check('도넛 · 위에 면 얹음', m4([vector('Base', [[2, 2, 20, 20], [8, 8, 8, 8]]), shape({ name: 'Detail', x: 8, y: 8, w: 8, h: 8 })]), '(없음)');
check('도넛 · 작은 면만 얹음', m4([vector('Base', [[2, 2, 20, 20], [8, 8, 8, 8]]), shape({ name: 'Detail', x: 10, y: 10, w: 2, h: 2 })]), 'M4');
check('떨어진 두 조각', m4([vector('Base', [[2, 2, 6, 6], [14, 14, 6, 6]])]), '(없음)');
check('중첩이지만 NONZERO', m4([vector('Base', [[2, 2, 20, 20], [8, 8, 8, 8]], 'NONZERO')]), '(없음)');
check('루프 1개', m4([vector('Base', [[2, 2, 20, 20]])]), '(없음)');

console.log('\n■ M1 M2 M3 M7 — 위반 주입');
var bad = icon('ic_bad_flat', [
  shape({ name: 'stroke', x: 2, y: 2, w: 20, h: 20, fills: [solid('#FF00AA')], strokes: [{ type: 'SOLID', visible: true }], strokeWeight: 1.5 }),
  shape({ name: '반투명', x: 3, y: 3, w: 3, h: 3, fills: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 }, opacity: 0.4 }], opacity: 0.5 }),
  shape({ name: '그라디언트', x: 5, y: 5, w: 4, h: 4, fills: [{ type: 'GRADIENT_LINEAR' }] }),
  shape({ name: '이펙트', x: 6, y: 6, w: 3, h: 3, fills: [solid('#FFA800')], effects: [{ type: 'DROP_SHADOW', visible: true }], blendMode: 'MULTIPLY' }),
  base({ name: 'sub', type: 'BOOLEAN_OPERATION', booleanOperation: 'SUBTRACT', children: [],
    fills: [solid('#8B77FF')], absoluteBoundingBox: { x: 2, y: 2, width: 5, height: 5 } })
]);
check('stroke·opacity·subtract·팔레트밖', codes(bad).split(',').sort().join(','),
  'C08,E1,E2,M1,M2,M2,M3,M6,M7,M7,M7');

console.log('\n■ M9 최소 치수');
check('두께 1.2 → 위반', codes(icon('ic_thin_flat', deliverable().concat([
  shape({ name: 'pill', x: 4, y: 4, w: 1.2, h: 8, fills: [solid('#0B72E6')] })])), 'M9'), 'M9');
check('두께 1.8 → 경고', codes(icon('ic_thin_flat', deliverable().concat([
  shape({ name: 'dot', x: 4, y: 4, w: 1.8, h: 1.8, fills: [solid('#0B72E6')] })])), 'M9'), 'M9');
check('두께 2.0 → 통과', codes(icon('ic_ok_flat', deliverable().concat([
  shape({ name: 'dot', x: 4, y: 4, w: 2, h: 2, fills: [solid('#0B72E6')] })])), 'M9'), '(없음)');

console.log('\n■ focusNode');
var onA = { id: 'a', name: 'Base', removed: false, parent: { type: 'FRAME', parent: pageA } };
var pageB = { type: 'PAGE', name: 'Archive', selection: [], findAll: function () { return []; } };
var onB = { id: 'b', name: 'Accent', removed: false, parent: { type: 'FRAME', parent: pageB } };
ctx._db = { a: onA, b: onB };
function focus(id) {
  notes = []; zoomed = null; switchedTo = null; ctx.figma.currentPage = pageA; pageA.selection = []; pageB.selection = [];
  ctx.figma.ui.onmessage({ type: 'focus', nodeId: id });
  return new Promise(function (r) { setTimeout(function () {
    r((ctx.figma.currentPage.selection.map(function (n) { return n.name; }).join(',') || '-') +
      ' / ' + (switchedTo || '-') + ' / ' + (notes.length ? '알림' : '-'));
  }, 10); });
}
Promise.resolve()
  .then(function () { return focus('a'); }).then(function (r) { check('현재 페이지', r, 'Base / - / -'); })
  .then(function () { return focus('b'); }).then(function (r) { check('다른 페이지', r, 'Accent / Archive / 알림'); })
  .then(function () { return focus('zzz'); }).then(function (r) { check('없는 id', r, '- / - / 알림'); })
  .then(function () {
    console.log('\n' + (fail ? '✕ ' + fail + ' 실패 · ' : '✓ ') + pass + ' 통과\n');
    process.exit(fail ? 1 : 0);
  });
