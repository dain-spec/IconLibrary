/* 아이콘 검사기 — 아이콘 제작 가이드 (Spec v2) 기계 검사
 *
 * 규칙 출처: docs/ICON_STYLE_GUIDE.md
 *   P05 라이브 영역과 패딩 · P07 Radius · P08 Corner radius 계단
 *   P11 Line 두께 · P14 컬러 시스템 · P21 Export · P22 Naming · P24 QA 체크리스트
 *
 * 현재 범위는 Multicolor(_flat · _face) 전용 규칙 + 3스타일 공통 규칙이다.
 * Line · Fill 은 공통 규칙만 돌고, 스타일 전용 규칙은 RULES_LINE / RULES_FILL 자리에
 * 가이드의 [확인 필요] 항목이 확정되면 채운다.
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. 가이드 상수
// ─────────────────────────────────────────────────────────────────────────────

var CANVAS = 24;

// P14 컬러 시스템 — docs/color-tokens.json 에서 생성한다. 직접 고치지 말고 sync-palette.js 를 돌린다.
var PALETTE = [
  { family: 'Gray', step: '0', hex: '#FFFFFF' },
  { family: 'Gray', step: '50', hex: '#E6ECF2' },
  { family: 'Gray', step: '100', hex: '#D0D8E6' },
  { family: 'Gray', step: '200', hex: '#B0BFCF' },
  { family: 'Gray', step: '300', hex: '#97A7B8' },
  { family: 'Gray', step: '400', hex: '#7D8D9E' },
  { family: 'Gray', step: '500', hex: '#687B8C' },
  { family: 'Gray', step: '600', hex: '#58697A' },
  { family: 'Gray', step: '700', hex: '#3D4B59' },
  { family: 'Gray', step: '800', hex: '#2E3B47' },
  { family: 'Gray', step: '900', hex: '#1F252C' },
  { family: 'Yellow', step: '0', hex: '#FBF8ED' },
  { family: 'Yellow', step: '50', hex: '#FFF7C2' },
  { family: 'Yellow', step: '100', hex: '#FFE96B' },
  { family: 'Yellow', step: '200', hex: '#FFDC38' },
  { family: 'Yellow', step: '300', hex: '#FFC311' },
  { family: 'Yellow', step: '400', hex: '#FFA800' },
  { family: 'Yellow', step: '500', hex: '#FF8A00' },
  { family: 'Yellow', step: '600', hex: '#EF6D00' },
  { family: 'Yellow', step: '700', hex: '#793605' },
  { family: 'Yellow', step: '800', hex: '#602B04' },
  { family: 'Yellow', step: '900', hex: '#3C1C03' },
  { family: 'Brown', step: '0', hex: '#FEF7F4' },
  { family: 'Brown', step: '50', hex: '#F4D0BE' },
  { family: 'Brown', step: '100', hex: '#E9B08D' },
  { family: 'Brown', step: '200', hex: '#D08C64' },
  { family: 'Brown', step: '300', hex: '#B66F49' },
  { family: 'Brown', step: '400', hex: '#A05225' },
  { family: 'Brown', step: '500', hex: '#91391D' },
  { family: 'Brown', step: '600', hex: '#803017' },
  { family: 'Brown', step: '700', hex: '#6B240E' },
  { family: 'Brown', step: '800', hex: '#561903' },
  { family: 'Brown', step: '900', hex: '#3D1402' },
  { family: 'Red', step: '0', hex: '#FFF6F7' },
  { family: 'Red', step: '50', hex: '#FFD6D9' },
  { family: 'Red', step: '100', hex: '#FFB9C0' },
  { family: 'Red', step: '200', hex: '#FF929F' },
  { family: 'Red', step: '300', hex: '#FF6F80' },
  { family: 'Red', step: '400', hex: '#F65369' },
  { family: 'Red', step: '500', hex: '#DF3E56' },
  { family: 'Red', step: '600', hex: '#A9233B' },
  { family: 'Red', step: '700', hex: '#91142F' },
  { family: 'Red', step: '800', hex: '#760823' },
  { family: 'Red', step: '900', hex: '#4F0414' },
  { family: 'Green', step: '0', hex: '#EEFBF4' },
  { family: 'Green', step: '50', hex: '#CDF4E0' },
  { family: 'Green', step: '100', hex: '#86E5B7' },
  { family: 'Green', step: '200', hex: '#5BD59A' },
  { family: 'Green', step: '300', hex: '#12BA73' },
  { family: 'Green', step: '400', hex: '#009F5E' },
  { family: 'Green', step: '500', hex: '#008951' },
  { family: 'Green', step: '600', hex: '#006840' },
  { family: 'Green', step: '700', hex: '#095535' },
  { family: 'Green', step: '800', hex: '#064328' },
  { family: 'Green', step: '900', hex: '#022B18' },
  { family: 'Teal', step: '0', hex: '#EEFBF9' },
  { family: 'Teal', step: '50', hex: '#DEF7F4' },
  { family: 'Teal', step: '100', hex: '#90E5E2' },
  { family: 'Teal', step: '200', hex: '#50D1CE' },
  { family: 'Teal', step: '300', hex: '#19B6B6' },
  { family: 'Teal', step: '400', hex: '#009C9C' },
  { family: 'Teal', step: '500', hex: '#0B807D' },
  { family: 'Teal', step: '600', hex: '#006562' },
  { family: 'Teal', step: '700', hex: '#0A5250' },
  { family: 'Teal', step: '800', hex: '#06413F' },
  { family: 'Teal', step: '900', hex: '#032A28' },
  { family: 'Blue', step: '0', hex: '#F2F9FF' },
  { family: 'Blue', step: '50', hex: '#E3F3FF' },
  { family: 'Blue', step: '100', hex: '#BBE0FF' },
  { family: 'Blue', step: '200', hex: '#7AC7FF' },
  { family: 'Blue', step: '300', hex: '#4BA9FF' },
  { family: 'Blue', step: '400', hex: '#1088FF' },
  { family: 'Blue', step: '500', hex: '#0B72E6' },
  { family: 'Blue', step: '600', hex: '#0A58CC' },
  { family: 'Blue', step: '700', hex: '#13449E' },
  { family: 'Blue', step: '800', hex: '#0D357F' },
  { family: 'Blue', step: '900', hex: '#062155' },
  { family: 'Indigo', step: '0', hex: '#F7F8FF' },
  { family: 'Indigo', step: '50', hex: '#E7EAFF' },
  { family: 'Indigo', step: '100', hex: '#CED6FF' },
  { family: 'Indigo', step: '200', hex: '#A9BBFF' },
  { family: 'Indigo', step: '300', hex: '#87A1FF' },
  { family: 'Indigo', step: '400', hex: '#6582FE' },
  { family: 'Indigo', step: '500', hex: '#4C6DF4' },
  { family: 'Indigo', step: '600', hex: '#3059E7' },
  { family: 'Indigo', step: '700', hex: '#163FAE' },
  { family: 'Indigo', step: '800', hex: '#0F318C' },
  { family: 'Indigo', step: '900', hex: '#071E5F' },
  { family: 'Purple', step: '0', hex: '#F8F7FF' },
  { family: 'Purple', step: '50', hex: '#ECE9FF' },
  { family: 'Purple', step: '100', hex: '#D9D2FF' },
  { family: 'Purple', step: '200', hex: '#BFB4FF' },
  { family: 'Purple', step: '300', hex: '#A698FF' },
  { family: 'Purple', step: '400', hex: '#8B77FF' },
  { family: 'Purple', step: '500', hex: '#755EFF' },
  { family: 'Purple', step: '600', hex: '#6049F1' },
  { family: 'Purple', step: '700', hex: '#3D2FBE' },
  { family: 'Purple', step: '800', hex: '#2A22A0' },
  { family: 'Purple', step: '900', hex: '#111174' }
];
var WHITE = '#FFFFFF';

// P08 코너 라운드 계단
// 가이드는 57종 기준 7단으로 적었으나, 현재 세트 205종의 코너 1387개를 다시 계측하면
// r 2.0 이 94개(6.8%)로 1.5·3.0 보다 많다. 실측을 따라 R-200 을 8번째 단으로 넣었다.
// → 가이드 P08 표에 반영이 필요하다.
var RADIUS_LADDER = [
  { token: 'R-050', value: 0.5 },
  { token: 'R-075', value: 0.75 },
  { token: 'R-100', value: 1.0 },
  { token: 'R-150', value: 1.5 },
  { token: 'R-200', value: 2.0 },
  { token: 'R-220', value: 2.2 },
  { token: 'R-300', value: 3.0 },
  { token: 'R-350', value: 3.5 }
];
var RADIUS_TOL = 0.12;       // 계단 허용 오차
var RADIUS_MIN = 0.5;        // r < 0.5 금지
var RADIUS_KINDS_MAX = 3;    // 한 아이콘 안 코너 라운드 3종 이하
var CORNER_MAX = 5.0;        // 이보다 큰 호는 코너로 세지 않는다

// P08 완전 라운드 표준 변
var FULL_ROUND_SIDES = [1.5, 2.0, 2.7, 5.0, 10.0, 20.0];

// P07 컨테이너 앵커 — 면 최소변 → radius
var CONTAINER_RADIUS = [
  { side: 18, radius: 3.5 },
  { side: 16, radius: 3.0 }
];
var RADIUS_RATIO = 0.19;

// P05 라이브 영역
var PAD_MIN = 1;             // 자유 실루엣 하한
var PAD_BADGE_MIN = 1.8;     // 배지로 넘길 때도 남겨야 하는 여백

// P24 M9 최소 치수
var MIN_SHAPE = 2.0;         // 독립 도형
var MIN_BAR = 1.5;           // 선처럼 쓰는 면의 두께


// P22 Naming
var NAME_RE = /^ic_[a-z0-9]+(_[a-z0-9]+)*$/;
var EMOJI_RE = /^ic_emoji_[a-z0-9]+_face$/;
var LEGACY_TYPOS = ['ic_goverment_flat', 'ic_calcu_flat'];
var KNOWN_SUFFIX = ['thin', 'thick', 'fill', 'flat', 'face'];

var EPS = 0.001;

// ─────────────────────────────────────────────────────────────────────────────
// 2. 작은 도구
// ─────────────────────────────────────────────────────────────────────────────

function round(n, d) {
  var f = Math.pow(10, d === undefined ? 3 : d);
  return Math.round(n * f) / f;
}

function toHex(c) {
  function ch(v) {
    var s = Math.round(v * 255).toString(16).toUpperCase();
    return s.length === 1 ? '0' + s : s;
  }
  return '#' + ch(c.r) + ch(c.g) + ch(c.b);
}

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16)
  };
}

function paletteEntry(hex) {
  for (var i = 0; i < PALETTE.length; i++) if (PALETTE[i].hex === hex) return PALETTE[i];
  return null;
}

/** 팔레트에서 가장 가까운 토큰을 찾아 치환 후보로 제시한다. */
function nearestToken(hex) {
  var a = hexToRgb(hex);
  var best = null;
  var bestD = Infinity;
  for (var i = 0; i < PALETTE.length; i++) {
    var b = hexToRgb(PALETTE[i].hex);
    var d = Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2);
    if (d < bestD) { bestD = d; best = PALETTE[i]; }
  }
  var w = hexToRgb(WHITE);
  var dw = Math.pow(a.r - w.r, 2) + Math.pow(a.g - w.g, 2) + Math.pow(a.b - w.b, 2);
  if (dw < bestD) return { family: '—', step: 'white', hex: WHITE, dist: Math.sqrt(dw) };
  return { family: best.family, step: best.step, hex: best.hex, dist: Math.sqrt(bestD) };
}

function nearestLadder(r) {
  var best = RADIUS_LADDER[0];
  var bestD = Infinity;
  for (var i = 0; i < RADIUS_LADDER.length; i++) {
    var d = Math.abs(RADIUS_LADDER[i].value - r);
    if (d < bestD) { bestD = d; best = RADIUS_LADDER[i]; }
  }
  return { token: best.token, value: best.value, delta: bestD };
}

/**
 * 이름이 규칙에 어긋나도(대문자·하이픈) 접미사는 읽어낸다.
 * 스타일을 못 읽으면 'unknown' 이고, 이때도 Multicolor 규칙은 돌린다 — 이 플러그인의 기본 범위다.
 */
function detectStyle(name) {
  var n = String(name).toLowerCase().replace(/-/g, '_');
  if (EMOJI_RE.test(n)) return 'multicolor';
  if (/_flat$/.test(n)) return 'multicolor';
  if (/_fill$/.test(n)) return 'fill';
  if (/_thin$/.test(n) || /_thick$/.test(n)) return 'line';
  if (/^ic_/.test(n)) return 'line';
  return 'unknown';
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. 노드 수집
// ─────────────────────────────────────────────────────────────────────────────

var SHAPE_TYPES = {
  VECTOR: 1, RECTANGLE: 1, ELLIPSE: 1, POLYGON: 1, STAR: 1, LINE: 1,
  BOOLEAN_OPERATION: 1, TEXT: 1
};

/**
 * 보이는 노드만 훑는다. hidden 은 P24-08 의 원본 백업으로 보고 검사에서 제외한다.
 */
function collect(icon) {
  var shapes = [];
  var groups = [];
  var booleans = [];
  var hidden = [];
  var hiddenTop = [];
  var hiddenDeep = [];

  function walk(node, depth) {
    if (node !== icon && node.visible === false) {
      hidden.push(node);
      // 아이콘 바로 아래에 숨겨 둔 것만 원본 백업으로 본다.
      // 보이는 레이어 안쪽에 섞인 hidden 은 실수로 숨긴 요소일 가능성이 크다.
      (depth === 1 ? hiddenTop : hiddenDeep).push(node);
      return;
    }
    if (node.type === 'BOOLEAN_OPERATION') booleans.push(node);
    if (node !== icon && SHAPE_TYPES[node.type]) shapes.push({ node: node, depth: depth });
    if (node !== icon && (node.type === 'GROUP' || node.type === 'FRAME')) groups.push(node);
    // BOOLEAN_OPERATION 의 자식은 형태가 아니라 재료이므로 더 내려가지 않는다.
    if (node.type !== 'BOOLEAN_OPERATION' && 'children' in node) {
      for (var i = 0; i < node.children.length; i++) walk(node.children[i], depth + 1);
    }
  }
  walk(icon, 0);

  // 레이어 단수 — 그룹 하나로 전체가 감싸여 있으면 한 겹 벗긴다.
  var roots = icon.children ? icon.children.filter(function (n) { return n.visible !== false; }) : [];
  while (roots.length === 1 && (roots[0].type === 'GROUP' || roots[0].type === 'FRAME') && roots[0].children) {
    roots = roots[0].children.filter(function (n) { return n.visible !== false; });
  }

  return {
    shapes: shapes, groups: groups, booleans: booleans,
    hidden: hidden, hiddenTop: hiddenTop, hiddenDeep: hiddenDeep, roots: roots
  };
}

/** 아이콘 프레임 기준 상대 박스. 스케일이 걸려 있어도 24 좌표계로 환산한다. */
function relBox(node, icon, scale) {
  var a = node.absoluteBoundingBox;
  var o = icon.absoluteBoundingBox;
  if (!a || !o) return null;
  return {
    x: (a.x - o.x) / scale,
    y: (a.y - o.y) / scale,
    w: a.width / scale,
    h: a.height / scale
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Radius 계측 — flatten 된 벡터에서 코너를 찾아 반지름을 되돌린다
// ─────────────────────────────────────────────────────────────────────────────

function isStraight(seg) {
  var a = seg.tangentStart || { x: 0, y: 0 };
  var b = seg.tangentEnd || { x: 0, y: 0 };
  return Math.abs(a.x) < EPS && Math.abs(a.y) < EPS && Math.abs(b.x) < EPS && Math.abs(b.y) < EPS;
}

/** 세 점을 지나는 원의 반지름. 원호를 근사한 큐빅이면 실제 radius 와 거의 같다. */
function circumradius(p0, p1, p2) {
  var a = Math.hypot(p1.x - p0.x, p1.y - p0.y);
  var b = Math.hypot(p2.x - p1.x, p2.y - p1.y);
  var c = Math.hypot(p2.x - p0.x, p2.y - p0.y);
  var cross = (p1.x - p0.x) * (p2.y - p0.y) - (p1.y - p0.y) * (p2.x - p0.x);
  var area2 = Math.abs(cross);
  if (area2 < 1e-9) return null;
  return (a * b * c) / (2 * area2);
}

function bezierMid(p0, p1, p2, p3) {
  return {
    x: (p0.x + 3 * p1.x + 3 * p2.x + p3.x) / 8,
    y: (p0.y + 3 * p1.y + 3 * p2.y + p3.y) / 8
  };
}

/**
 * 벡터 네트워크에서 「직선 → 곡선 → 직선」 패턴만 코너 라운드로 본다.
 * 곡선끼리 이어지는 구간은 오브젝트 고유의 둥근 형태(핀 머리·트럭 바퀴)라 계단 밖이어도 정상이다.
 */
function cornerRadiiOfVector(node, scale) {
  var vn = null;
  try { vn = node.vectorNetwork; } catch (e) { return []; }
  if (!vn || !vn.segments || !vn.vertices) return [];

  var segs = vn.segments;
  var verts = vn.vertices;
  var straightAt = {}; // 정점에 붙은 직선 개수

  for (var i = 0; i < segs.length; i++) {
    if (!isStraight(segs[i])) continue;
    straightAt[segs[i].start] = (straightAt[segs[i].start] || 0) + 1;
    straightAt[segs[i].end] = (straightAt[segs[i].end] || 0) + 1;
  }

  var out = [];
  for (var j = 0; j < segs.length; j++) {
    var s = segs[j];
    if (isStraight(s)) continue;
    if (!straightAt[s.start] || !straightAt[s.end]) continue; // 양쪽이 직선일 때만 코너

    var v0 = verts[s.start];
    var v3 = verts[s.end];
    if (!v0 || !v3) continue;
    var p0 = { x: v0.x, y: v0.y };
    var p3 = { x: v3.x, y: v3.y };
    var p1 = { x: p0.x + s.tangentStart.x, y: p0.y + s.tangentStart.y };
    var p2 = { x: p3.x + s.tangentEnd.x, y: p3.y + s.tangentEnd.y };
    var r = circumradius(p0, bezierMid(p0, p1, p2, p3), p3);
    if (r === null || !isFinite(r)) continue;
    r = r / scale;
    // 실측 분포는 4.15 에서 끊긴다. 그보다 큰 호는 코너가 아니라 오브젝트 고유의 곡선이다.
    if (r > CORNER_MAX) continue;
    out.push(round(r, 3));
  }
  return out;
}

/** 편집 가능한 도형(미 flatten)은 cornerRadius 속성을 그대로 읽는다. */
function cornerRadiiOfShape(node, scale) {
  var out = [];
  if (node.type === 'RECTANGLE' || node.type === 'FRAME' || node.type === 'COMPONENT') {
    var keys = ['topLeftRadius', 'topRightRadius', 'bottomRightRadius', 'bottomLeftRadius'];
    for (var i = 0; i < keys.length; i++) {
      var v = node[keys[i]];
      if (typeof v === 'number' && v > 0) out.push(round(v / scale, 3));
    }
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. 검사
// ─────────────────────────────────────────────────────────────────────────────

function Report(icon) {
  this.id = icon.id;
  this.name = icon.name;
  this.style = detectStyle(icon.name);
  this.inferred = false;
  this.findings = [];
}
Report.prototype.add = function (sev, code, title, detail, nodeId, nodeName) {
  this.findings.push({
    sev: sev, code: code, title: title, detail: detail || '',
    nodeId: nodeId || this.id, nodeName: nodeName || ''
  });
};

/** 이름이 스타일을 명시하지 않을 때, 칠해진 색 수로 Multicolor 인지 되짚는다. */
function distinctFillCount(shapes) {
  var seen = {};
  for (var i = 0; i < shapes.length; i++) {
    var n = shapes[i].node;
    if (!n.fills || n.fills === figma.mixed) continue;
    for (var j = 0; j < n.fills.length; j++) {
      var f = n.fills[j];
      if (f.visible === false || f.type !== 'SOLID') continue;
      var hex = toHex(f.color);
      if (hex === WHITE) continue;
      seen[hex] = true;
    }
  }
  return Object.keys(seen).length;
}

function checkIcon(icon) {
  var rep = new Report(icon);
  var box = icon.absoluteBoundingBox;
  var scale = box && icon.width ? box.width / icon.width : 1;
  if (!scale || !isFinite(scale)) scale = 1;

  var bag = collect(icon);
  var shapes = bag.shapes.filter(function (s) { return s.node.absoluteBoundingBox; });

  // 이름에 접미사가 없으면 Line 으로 읽히지만, 색이 2종 이상이면 Multicolor 로 보고 검사한다.
  var hasSuffix = /_(thin|thick|fill|flat|face)$/.test(String(icon.name).toLowerCase());
  if (!hasSuffix && rep.style === 'line' && distinctFillCount(shapes) >= 2) {
    rep.style = 'multicolor';
    rep.inferred = true;
  }

  checkNaming(rep, icon);
  checkCanvas(rep, icon);

  if (!shapes.length) {
    rep.add('error', 'C02', '보이는 형태가 없다',
      bag.hidden.length ? '전부 hidden 이다. 배포 레이어를 보이게 한다.' : '아이콘 안에 표시되는 도형이 하나도 없다.');
    return rep;
  }

  checkLiveArea(rep, icon, shapes, scale);
  checkRadius(rep, icon, shapes, scale);
  checkMinSize(rep, icon, shapes, scale);
  checkEffects(rep, shapes, icon);
  checkFlatten(rep, bag);
  checkBackup(rep, bag);

  if (rep.style === 'multicolor' || rep.style === 'unknown') {
    if (rep.style === 'unknown') {
      rep.add('warn', 'C09', '스타일을 읽을 수 없다',
        '이름에서 스타일 접미사를 찾지 못했다. Multicolor 규칙으로 검사했다.');
    }
    checkNoStroke(rep, shapes, icon);
    checkOpacity(rep, shapes, icon);
    checkSubtract(rep, bag);
    checkHoles(rep, icon, shapes, scale);
    checkLayers(rep, bag);
    checkColors(rep, shapes, icon, scale);
  } else if (rep.style === 'line') {
    checkLineStroke(rep, shapes);
  }

  return rep;
}

// C09 · P22 Naming
function checkNaming(rep, icon) {
  var name = icon.name;
  if (LEGACY_TYPOS.indexOf(name) >= 0) {
    rep.add('info', 'C09', '기존 오탈자 — 유지 대상',
      '`' + name + '` 는 이미 배포된 이름이라 그대로 둔다. 신규 아이콘은 철자를 정확히 쓴다.');
    return;
  }
  if (!/^ic_/.test(name)) {
    rep.add('error', 'C09', '접두사 누락', '이름은 `ic_` 로 시작해야 한다. 현재: `' + name + '`');
    return;
  }
  if (!NAME_RE.test(name)) {
    var why = [];
    if (/[A-Z]/.test(name)) why.push('대문자');
    if (/[ㄱ-ㅎ가-힣]/.test(name)) why.push('한글');
    if (/-/.test(name)) why.push('하이픈');
    if (/\s/.test(name)) why.push('공백');
    if (/__/.test(name)) why.push('연속 밑줄');
    rep.add('error', 'C09', '네이밍 규칙 위반',
      '영문 소문자 + snake_case 만 쓴다' + (why.length ? ' — ' + why.join(' · ') + ' 포함' : '') + '. 현재: `' + name + '`');
    return;
  }
  var tail = name.split('_').pop();
  if (rep.inferred) {
    rep.add('error', 'C09', '`_flat` 접미사 누락',
      '색이 2종 이상이라 Multicolor 로 보고 검사했다. 이름은 `' + name + '_flat` 이어야 한다.');
  } else if (rep.style === 'multicolor' && !/_flat$/.test(name) && !EMOJI_RE.test(name)) {
    rep.add('warn', 'C09', 'Multicolor 접미사 확인',
      'Multicolor 는 `_flat` 또는 `ic_emoji_{표정}_face` 형식이다. 현재: `' + name + '`');
  }
  if (KNOWN_SUFFIX.indexOf(tail) < 0 && rep.style === 'line' && name.split('_').length > 2) {
    rep.add('info', 'C09', '접미사 없음 = Line default',
      '`' + name + '` 는 Line(stroke 1.5) 으로 읽힌다. 의도한 스타일인지 확인한다.');
  }
}

// C01 · P24-01 캔버스
function checkCanvas(rep, icon) {
  var w = round(icon.width, 3);
  var h = round(icon.height, 3);
  if (w !== CANVAS || h !== CANVAS) {
    rep.add('error', 'C01', '캔버스가 24 × 24 가 아니다', '현재 ' + w + ' × ' + h);
  }
  if (icon.type !== 'COMPONENT' && icon.type !== 'FRAME') {
    rep.add('warn', 'C01', '컴포넌트/프레임이 아니다',
      '현재 ' + icon.type + '. 라이브러리 배포는 Component 로 한다.');
  }
}

// C02 · P05 라이브 영역과 패딩
function checkLiveArea(rep, icon, shapes, scale) {
  var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (var i = 0; i < shapes.length; i++) {
    var b = relBox(shapes[i].node, icon, scale);
    if (!b) continue;
    minX = Math.min(minX, b.x); minY = Math.min(minY, b.y);
    maxX = Math.max(maxX, b.x + b.w); maxY = Math.max(maxY, b.y + b.h);
  }
  if (!isFinite(minX)) return;
  var pad = Math.min(minX, minY, CANVAS - maxX, CANVAS - maxY);
  pad = round(pad, 2);
  var span = 'x ' + round(minX, 2) + ' → ' + round(maxX, 2) + ' · y ' + round(minY, 2) + ' → ' + round(maxY, 2);

  if (pad < 0) {
    rep.add('error', 'C02', '캔버스를 넘어간다', '패딩 ' + pad + ' · ' + span);
  } else if (pad < PAD_MIN - 0.01) {
    rep.add('error', 'C02', '패딩 미달',
      '자유 실루엣도 최소 여백 ' + PAD_MIN + ' 은 남긴다. 현재 패딩 ' + pad + ' · ' + span);
  } else if (pad < PAD_BADGE_MIN - 0.01) {
    rep.add('warn', 'C02', '배지 확장 한계선',
      '라이브 영역을 넘길 수 있는 것은 배지뿐이고 그때도 여백 ' + PAD_BADGE_MIN + ' 은 남긴다. 현재 패딩 ' + pad + ' · ' + span);
  } else {
    var area = pad >= 3 - 0.01 ? '18 × 18 (패딩 3 · 사각 컨테이너)'
             : pad >= 2 - 0.01 ? '20 × 20 (패딩 2 · 원형·와이드·유기적)'
             : '자유 실루엣 (패딩 1)';
    rep.add('info', 'C02', '라이브 영역 — ' + area, '패딩 ' + pad + ' · ' + span);
  }
}

// C03 · M8 · P07 P08 Radius
function checkRadius(rep, icon, shapes, scale) {
  var corners = [];   // {r, node}
  for (var i = 0; i < shapes.length; i++) {
    var n = shapes[i].node;
    var rs = n.type === 'VECTOR' ? cornerRadiiOfVector(n, scale) : cornerRadiiOfShape(n, scale);
    for (var j = 0; j < rs.length; j++) corners.push({ r: rs[j], node: n });

    // 컨테이너 앵커 — 변 18 → 3.5, 변 16 → 3.0
    var b = relBox(n, icon, scale);
    if (!b) continue;
    var side = round(Math.min(b.w, b.h), 2);
    for (var k = 0; k < CONTAINER_RADIUS.length; k++) {
      if (Math.abs(side - CONTAINER_RADIUS[k].side) > 0.3) continue;
      if (!rs.length) continue;
      var want = CONTAINER_RADIUS[k].radius;
      var off = rs.filter(function (r) { return Math.abs(r - want) > RADIUS_TOL; });
      if (off.length) {
        rep.add('error', 'C03', '컨테이너 radius 불일치',
          '변 ' + CONTAINER_RADIUS[k].side + ' 컨테이너는 r ' + want + ' 로 통일한다 (변 × ' + RADIUS_RATIO + ').' +
          ' 현재 ' + off.map(function (r) { return 'r ' + r; }).join(' · '),
          n.id, n.name);
      }
    }
  }

  var kinds = {};
  for (var m = 0; m < corners.length; m++) {
    var r = corners[m].r;
    var node = corners[m].node;

    if (r < RADIUS_MIN - RADIUS_TOL) {
      rep.add('error', 'M8', 'r < 0.5 — 금지',
        '24px 에서 각진 코너와 구분되지 않는다. r ' + r + ' → 0.5 로 올린다.', node.id, node.name);
      continue;
    }
    var near = nearestLadder(r);
    if (near.delta > RADIUS_TOL) {
      rep.add('warn', 'M8', '코너 라운드 계단 밖',
        'r ' + r + ' 은 계단(0.5 · 0.75 · 1.0 · 1.5 · 2.0 · 2.2 · 3.0 · 3.5) 밖이다. 가장 가까운 값은 ' +
        near.token + ' = ' + near.value + '.', node.id, node.name);
      kinds[String(r)] = true;
    } else {
      kinds[String(near.value)] = true;
    }
  }

  var kindList = Object.keys(kinds);
  if (kindList.length > RADIUS_KINDS_MAX) {
    rep.add('error', 'M8', '코너 라운드 ' + kindList.length + '종 — 3종 이하로 정리',
      '검출된 값: ' + kindList.sort(function (a, b) { return a - b; }).join(' · '));
  } else if (kindList.length) {
    rep.add('info', 'M8', '코너 라운드 ' + kindList.length + '종',
      kindList.sort(function (a, b) { return a - b; }).join(' · '));
  }
}

// M9 최소 치수
function checkMinSize(rep, icon, shapes, scale) {
  for (var i = 0; i < shapes.length; i++) {
    var n = shapes[i].node;
    var b = relBox(n, icon, scale);
    if (!b) continue;
    var minSide = round(Math.min(b.w, b.h), 2);
    var maxSide = round(Math.max(b.w, b.h), 2);
    if (minSide < MIN_BAR - 0.01) {
      rep.add('error', 'M9', '두께 ' + minSide + ' — 최소 ' + MIN_BAR + ' 미달',
        '`' + n.name + '` ' + minSide + ' × ' + maxSide + '. 선처럼 쓰는 면도 ' + MIN_BAR + ' 이상.',
        n.id, n.name);
    } else if (minSide < MIN_SHAPE - 0.01 && maxSide < MIN_SHAPE * 2) {
      rep.add('warn', 'M9', '독립 도형 ' + minSide + ' — 권장 ' + MIN_SHAPE + ' 미만',
        '`' + n.name + '` ' + minSide + ' × ' + maxSide + '. 24px 에서 뭉개질 수 있다.',
        n.id, n.name);
    }
  }
}

// P21 금지 속성 — effect · blend mode
function checkEffects(rep, shapes, icon) {
  var all = [{ node: icon }].concat(shapes);
  for (var i = 0; i < all.length; i++) {
    var n = all[i].node;
    if (n.effects && n.effects.length) {
      var on = n.effects.filter(function (e) { return e.visible !== false; });
      if (on.length) {
        rep.add('error', 'E1', 'effect 사용 — 금지',
          '`' + n.name + '` 에 ' + on.map(function (e) { return e.type; }).join(' · ') + '. SVG 로 내보내면 filter 가 붙는다.',
          n.id, n.name);
      }
    }
    if (n.blendMode && n.blendMode !== 'NORMAL' && n.blendMode !== 'PASS_THROUGH') {
      rep.add('warn', 'E2', 'blend mode ' + n.blendMode,
        'SVG 에서 `style` 속성으로 나간다. Normal 로 되돌린다.', n.id, n.name);
    }
    if (n.isMask) {
      rep.add('warn', 'E3', 'mask 사용',
        'mask 는 도넛·파이 형태에만 조건부 허용이다. 인라인 시 id 충돌이 나지 않도록 아이콘 id 를 포함한 이름으로 바꾼다.',
        n.id, n.name);
    }
  }
}

// C07 Flatten
function checkFlatten(rep, bag) {
  var bools = bag.booleans.filter(function (n) { return n.booleanOperation !== 'SUBTRACT'; });
  if (bools.length) {
    rep.add('warn', 'C07', 'Boolean 연산이 남아 있다 — ' + bools.length + '개',
      bools.map(function (n) { return n.booleanOperation + ' `' + n.name + '`' ; }).slice(0, 4).join(' · ') +
      '. Union/Subtract 적용 후 Flatten 한다.',
      bools[0].id, bools[0].name);
  }
  var deep = bag.shapes.filter(function (s) { return s.depth > 3; });
  if (deep.length) {
    rep.add('info', 'C07', '중첩 깊이 4단 이상 — ' + deep.length + '개',
      '그룹이 여러 겹이면 배포 SVG 에 빈 `<g>` 가 남는다.');
  }
}

// C08 원본 보존 — P24-08 · P11 배포 형태
// "원본과 배포하는 영역은 분리하여 보존한다". 아이콘 바로 아래에 숨겨 둔 레이어를 백업으로 본다.
function checkBackup(rep, bag) {
  if (!bag.hiddenTop.length) {
    rep.add('warn', 'C08', '원본 백업이 없다',
      'flatten 전 원본 레이어를 아이콘 바로 아래에 두고 hidden 처리한다. ' +
      '배포본은 면으로 굳어 있어 되돌릴 수 없다.');
  } else {
    // 백업이 정말 편집 가능한 원본인지 본다 — 배포본과 똑같이 굳어 있으면 백업 구실을 못 한다.
    var editable = 0;
    for (var i = 0; i < bag.hiddenTop.length; i++) {
      if (hasEditableSource(bag.hiddenTop[i])) editable++;
    }
    if (!editable) {
      rep.add('warn', 'C08', '백업이 원본 형태가 아니다',
        bag.hiddenTop.map(function (n) { return '`' + n.name + '`'; }).join(' · ') +
        ' — 안에 stroke 나 Boolean 이 없다. 배포본을 복사해 둔 것이라면 되돌릴 수 없다.',
        bag.hiddenTop[0].id, bag.hiddenTop[0].name);
    } else {
      rep.add('info', 'C08', '원본 백업 ' + bag.hiddenTop.length + '개',
        bag.hiddenTop.map(function (n) { return n.name; }).join(' · ') + ' · 검사에서 제외했다.');
    }
  }

  if (bag.hiddenDeep.length) {
    rep.add('warn', 'C08', '보이는 레이어 안에 hidden — ' + bag.hiddenDeep.length + '개',
      '백업은 아이콘 바로 아래에 둔다. 안쪽에 숨은 것은 실수로 감춘 요소일 수 있다: ' +
      bag.hiddenDeep.slice(0, 4).map(function (n) { return '`' + n.name + '`'; }).join(' · '),
      bag.hiddenDeep[0].id, bag.hiddenDeep[0].name);
  }
}

/** 되돌릴 수 있는 원본인지 — stroke 나 Boolean 연산이 남아 있으면 편집 가능한 상태다. */
function hasEditableSource(node) {
  if (node.type === 'BOOLEAN_OPERATION') return true;
  if (node.strokes && node.strokes.length) {
    for (var i = 0; i < node.strokes.length; i++) {
      if (node.strokes[i].visible !== false) return true;
    }
  }
  if ('children' in node && node.children) {
    for (var j = 0; j < node.children.length; j++) {
      if (hasEditableSource(node.children[j])) return true;
    }
  }
  return false;
}

// M1 스트로크 0건
function checkNoStroke(rep, shapes, icon) {
  for (var i = 0; i < shapes.length; i++) {
    var n = shapes[i].node;
    if (!n.strokes || !n.strokes.length) continue;
    var on = n.strokes.filter(function (s) { return s.visible !== false; });
    if (!on.length) continue;
    var w = typeof n.strokeWeight === 'number' ? n.strokeWeight : '혼합';
    rep.add('error', 'M1', 'stroke 사용 — Multicolor 금지',
      '`' + n.name + '` stroke ' + w + '. 선처럼 보이는 요소도 면으로 만든다.', n.id, n.name);
  }
}

// M2 불투명도
function checkOpacity(rep, shapes, icon) {
  var all = [{ node: icon }].concat(shapes);
  for (var i = 0; i < all.length; i++) {
    var n = all[i].node;
    if (typeof n.opacity === 'number' && n.opacity < 1 - EPS) {
      rep.add('error', 'M2', 'opacity ' + round(n.opacity, 3),
        '`' + n.name + '` — 톤은 불투명도가 아니라 팔레트 스텝으로 만든다.', n.id, n.name);
    }
    if (n.fills && n.fills !== figma.mixed) {
      for (var j = 0; j < n.fills.length; j++) {
        var f = n.fills[j];
        if (f.visible === false) continue;
        if (typeof f.opacity === 'number' && f.opacity < 1 - EPS) {
          rep.add('error', 'M2', 'fill-opacity ' + round(f.opacity, 3),
            '`' + n.name + '` — 팔레트 스텝으로 대체한다.', n.id, n.name);
        }
      }
    }
  }
}

// M3 Subtract
function checkSubtract(rep, bag) {
  var subs = bag.booleans.filter(function (n) { return n.booleanOperation === 'SUBTRACT'; });
  if (subs.length) {
    rep.add('error', 'M3', 'Subtract 사용 — ' + subs.length + '개',
      'Multicolor 는 subtract 를 쓰지 않는다. 뚫린 자리로 배경색이 비친다. 그 자리에 다른 색 면을 얹는다.',
      subs[0].id, subs[0].name);
  }
}

// M4 구멍 — P21 · P24-M4
// evenodd 로 뚫린 자리에는 아무것도 칠해지지 않아 뒤가 비친다. 흰 배경에서는 구멍도 희게 보여
// 눈에 띄지 않다가, 색 위에 얹는 순간 드러난다. 가이드는 뚫지 말고 "그 자리에 다른 색 면을 얹으라"고 한다.
//
// 걸러내야 하는 두 가지가 있다.
//   1. 루프가 2개라고 구멍은 아니다 — 떨어져 있는 두 조각일 수 있다. 한 루프가 다른 루프 안에 있어야 구멍이다.
//   2. 구멍이어도 다른 면이 그 자리를 덮고 있으면 정상이다 — 가이드가 시킨 상태가 바로 그것이다.
function checkHoles(rep, icon, shapes, scale) {
  // 덮개 후보 — 아이콘 좌표계로 환산한 모든 면의 박스
  var covers = [];
  for (var c = 0; c < shapes.length; c++) {
    var cb = relBox(shapes[c].node, icon, scale);
    if (cb) covers.push({ node: shapes[c].node, box: cb });
  }

  for (var i = 0; i < shapes.length; i++) {
    var n = shapes[i].node;
    if (n.type !== 'VECTOR') continue;
    var vn = null;
    try { vn = n.vectorNetwork; } catch (e) { continue; }
    if (!vn || !vn.regions || !vn.regions.length || !vn.vertices || !vn.segments) continue;

    var rb = relBox(n, icon, scale);
    if (!rb) continue;
    var localAll = networkBox(vn);
    if (!localAll) continue;

    var open = [];
    for (var j = 0; j < vn.regions.length; j++) {
      var region = vn.regions[j];
      if (region.windingRule !== 'EVENODD') continue;
      if (!region.loops || region.loops.length < 2) continue;

      var boxes = [];
      for (var k = 0; k < region.loops.length; k++) boxes.push(loopBox(vn, region.loops[k]));

      for (var h = 0; h < boxes.length; h++) {
        if (!boxes[h]) continue;
        // 다른 루프 안에 들어 있어야 구멍이다
        var nested = false;
        for (var o = 0; o < boxes.length; o++) {
          if (o !== h && boxes[o] && boxInside(boxes[h], boxes[o])) { nested = true; break; }
        }
        if (!nested) continue;

        var hole = toIconSpace(boxes[h], localAll, rb);
        var covered = false;
        for (var m = 0; m < covers.length; m++) {
          if (covers[m].node === n) continue;
          if (boxCovers(hole, covers[m].box)) { covered = true; break; }
        }
        if (!covered) open.push(hole);
      }
    }

    if (open.length) {
      var at = open.map(function (b) {
        return 'x ' + round(b.x0, 1) + '–' + round(b.x1, 1) + ' · y ' + round(b.y0, 1) + '–' + round(b.y1, 1);
      }).slice(0, 3).join(' / ');
      rep.add('warn', 'M4', '덮이지 않은 구멍 — ' + open.length + '개',
        '`' + n.name + '` 의 뚫린 자리를 덮는 면이 없다. 색 배경 위에 올리면 배경이 비친다 — ' +
        '흰 배경에서는 보이지 않는다. 그 자리에 다른 색 면을 얹는다. (' + at + ')',
        n.id, n.name);
    }
  }
}

/** 벡터 네트워크 전체의 로컬 박스 — 정점과 제어점을 모두 감싼다. */
function networkBox(vn) {
  var b = null;
  for (var i = 0; i < vn.segments.length; i++) {
    b = growBySegment(b, vn, vn.segments[i]);
  }
  return b;
}

/** 한 루프(세그먼트 번호 배열)의 로컬 박스. */
function loopBox(vn, loop) {
  if (!loop || !loop.length) return null;
  var b = null;
  for (var i = 0; i < loop.length; i++) {
    var seg = vn.segments[loop[i]];
    if (seg) b = growBySegment(b, vn, seg);
  }
  return b;
}

function growBySegment(b, vn, seg) {
  var v0 = vn.vertices[seg.start];
  var v1 = vn.vertices[seg.end];
  if (!v0 || !v1) return b;
  var ts = seg.tangentStart || { x: 0, y: 0 };
  var te = seg.tangentEnd || { x: 0, y: 0 };
  var pts = [
    { x: v0.x, y: v0.y },
    { x: v1.x, y: v1.y },
    { x: v0.x + ts.x, y: v0.y + ts.y },
    { x: v1.x + te.x, y: v1.y + te.y }
  ];
  for (var i = 0; i < pts.length; i++) {
    if (!b) b = { x0: pts[i].x, y0: pts[i].y, x1: pts[i].x, y1: pts[i].y };
    else {
      b.x0 = Math.min(b.x0, pts[i].x); b.y0 = Math.min(b.y0, pts[i].y);
      b.x1 = Math.max(b.x1, pts[i].x); b.y1 = Math.max(b.y1, pts[i].y);
    }
  }
  return b;
}

/** 벡터 로컬 좌표 → 아이콘 좌표. 회전이 없다고 보고 비례로 옮긴다. */
function toIconSpace(box, localAll, rb) {
  var lw = localAll.x1 - localAll.x0;
  var lh = localAll.y1 - localAll.y0;
  var sx = lw > EPS ? rb.w / lw : 1;
  var sy = lh > EPS ? rb.h / lh : 1;
  return {
    x0: rb.x + (box.x0 - localAll.x0) * sx,
    y0: rb.y + (box.y0 - localAll.y0) * sy,
    x1: rb.x + (box.x1 - localAll.x0) * sx,
    y1: rb.y + (box.y1 - localAll.y0) * sy
  };
}

function boxArea(b) { return Math.max(0, b.x1 - b.x0) * Math.max(0, b.y1 - b.y0); }

/** a 가 b 안에 들어 있고 더 작은가 — 구멍 판정. */
function boxInside(a, b) {
  return a.x0 >= b.x0 - 0.01 && a.y0 >= b.y0 - 0.01 &&
         a.x1 <= b.x1 + 0.01 && a.y1 <= b.y1 + 0.01 &&
         boxArea(a) < boxArea(b) - 0.01;
}

/** 면 b 가 구멍 hole 을 덮는가 — 중심이 안에 있고 6할 이상 겹치면 덮은 것으로 본다. */
function boxCovers(hole, b) {
  var cx = (hole.x0 + hole.x1) / 2;
  var cy = (hole.y0 + hole.y1) / 2;
  if (cx < b.x || cx > b.x + b.w || cy < b.y || cy > b.y + b.h) return false;
  var ox = Math.max(0, Math.min(hole.x1, b.x + b.w) - Math.max(hole.x0, b.x));
  var oy = Math.max(0, Math.min(hole.y1, b.y + b.h) - Math.max(hole.y0, b.y));
  var a = boxArea(hole);
  return a > 0 && (ox * oy) / a >= 0.6;
}

// M5 레이어 구성
// 개수는 판정하지 않는다 — P13 의 Base → Accent → Detail → Badge 는 역할 순서이지
// 노드 개수가 아니다. 역할 하나가 여러 조각으로 나뉘면(브라우저의 상단 바 + 사이드바)
// 자연히 5–6 개가 되고, 원형 컨테이너 + white 글리프처럼 2 개로 끝나는 것도 정상이다.
// 쌓인 순서만 정보로 남긴다.
function checkLayers(rep, bag) {
  if (!bag.roots.length) return;
  rep.add('info', 'M5', '레이어 ' + bag.roots.length + '단',
    bag.roots.map(function (r) { return r.name; }).join(' → ') + ' (아래 → 위)');
}

// M6 hue · M7 토큰
function checkColors(rep, shapes, icon, scale) {
  var families = {};
  var offToken = [];
  var nonSolid = [];

  for (var i = 0; i < shapes.length; i++) {
    var n = shapes[i].node;
    if (!n.fills || n.fills === figma.mixed) continue;
    for (var j = 0; j < n.fills.length; j++) {
      var f = n.fills[j];
      if (f.visible === false) continue;
      if (f.type !== 'SOLID') { nonSolid.push({ node: n, type: f.type }); continue; }
      var hex = toHex(f.color);
      if (hex === WHITE) continue;
      var entry = paletteEntry(hex);
      if (!entry) {
        offToken.push({ node: n, hex: hex });
      } else {
        var b = relBox(n, icon, scale);
        if (!families[entry.family]) families[entry.family] = { count: 0, nodes: [], badgeish: true };
        families[entry.family].count++;
        families[entry.family].nodes.push(n);
        if (b) {
          var cx = b.x + b.w / 2, cy = b.y + b.h / 2;
          if (!(cx > 12 && cy > 12)) families[entry.family].badgeish = false;
        }
      }
    }
  }

  for (var k = 0; k < nonSolid.length; k++) {
    rep.add('error', 'M7', nonSolid[k].type + ' 채우기 — 금지',
      '`' + nonSolid[k].node.name + '` 는 단색 팔레트 토큰으로 채운다.',
      nonSolid[k].node.id, nonSolid[k].node.name);
  }
  for (var m = 0; m < offToken.length; m++) {
    var near = nearestToken(offToken[m].hex);
    rep.add('error', 'M7', '팔레트 밖 색 ' + offToken[m].hex,
      '`' + offToken[m].node.name + '` → 가장 가까운 토큰은 ' + near.family + ' ' + near.step +
      ' `' + near.hex + '` (RGB 거리 ' + round(near.dist, 1) + ')',
      offToken[m].node.id, offToken[m].node.name);
  }

  // P15 — 중립 오브젝트는 Gray 로 칠한다. Gray 는 hue 예산에서 제외한다.
  var hasGray = !!families['Gray'];
  var names = Object.keys(families).filter(function (f) { return f !== 'Gray'; });
  names.sort(function (a, b) { return families[b].count - families[a].count; });
  var grayNote = hasGray ? ' + Gray(중립)' : '';

  if (names.length === 0 && hasGray) {
    rep.add('info', 'M6', '중립 — Gray 단독', '면 ' + families['Gray'].count + '개 + white');
  } else if (names.length === 0) {
    rep.add('warn', 'M6', 'hue 없음', '팔레트 토큰으로 칠해진 면이 없다.');
  } else if (names.length === 1) {
    rep.add('info', 'M6', '주 hue — ' + names[0] + grayNote, '면 ' + families[names[0]].count + '개 + white');
  } else if (names.length === 2) {
    var main = names[0];
    var second = names[1];
    if (families[second].badgeish) {
      rep.add('info', 'M6', '주 hue ' + main + ' + 배지 ' + second + grayNote,
        '두 번째 hue 가 우하단에만 있다 — 배지·신호 용도로 허용.');
    } else {
      rep.add('warn', 'M6', 'hue 2종 — ' + names.join(' · ') + grayNote,
        '두 번째 hue 는 배지·신호에만 쓴다. `' + second + '` 가 우하단 밖에 있다.',
        families[second].nodes[0].id, families[second].nodes[0].name);
    }
  } else {
    rep.add('error', 'M6', 'hue ' + names.length + '종 — ' + names.join(' · ') + grayNote,
      '주 hue 1개 + white 가 기본이다. 두 번째 hue 는 배지·신호에만 쓴다. Gray 는 중립이라 예산에 넣지 않는다.');
  }
}

// L1–L3 · P11 Line
function checkLineStroke(rep, shapes) {
  var want = /_thin$/.test(rep.name) ? 1 : /_thick$/.test(rep.name) ? 2 : 1.5;
  var weights = {};
  var stroked = 0;
  for (var i = 0; i < shapes.length; i++) {
    var n = shapes[i].node;
    if (!n.strokes || !n.strokes.length) continue;
    if (!n.strokes.some(function (s) { return s.visible !== false; })) continue;
    stroked++;
    if (typeof n.strokeWeight === 'number') weights[String(round(n.strokeWeight, 3))] = true;
    if (n.strokeAlign && n.strokeAlign !== 'CENTER') {
      rep.add('error', 'L2', '획 정렬 ' + n.strokeAlign, '`' + n.name + '` — Center 로 맞춘다.', n.id, n.name);
    }
    if (n.strokeCap && n.strokeCap !== figma.mixed && n.strokeCap !== 'ROUND' && n.strokeCap !== 'NONE') {
      rep.add('error', 'L3', '선 끝 ' + n.strokeCap, '`' + n.name + '` — round cap 으로 맞춘다.', n.id, n.name);
    }
    if (n.strokeJoin && n.strokeJoin !== figma.mixed && n.strokeJoin !== 'ROUND') {
      rep.add('error', 'L3', '꺾임 ' + n.strokeJoin, '`' + n.name + '` — round join 으로 맞춘다.', n.id, n.name);
    }
  }
  var list = Object.keys(weights);
  if (!stroked) {
    rep.add('info', 'L4', 'stroke 없음 — outline 완료로 보인다',
      '배포본은 outline stroke 후 면으로 나가야 한다. 원본 레이어에서 두께를 확인한다.');
    return;
  }
  if (list.length > 1) {
    rep.add('error', 'L1', '두께 혼용 — ' + list.join(' · '), '한 아이콘 안에서 두께를 섞지 않는다.');
  } else if (list.length === 1 && Math.abs(Number(list[0]) - want) > 0.01) {
    rep.add('error', 'L1', '두께 ' + list[0] + ' — 기대값 ' + want,
      '`' + rep.name + '` 의 접미사가 요구하는 두께는 ' + want + ' 다.');
  }
  rep.add('warn', 'L4', 'stroke 상태로 남아 있다',
    'outline stroke 후 채워진 도형으로 배포한다. 그대로 두면 SVG 에서 두께가 변형된다.');
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. 대상 찾기
// ─────────────────────────────────────────────────────────────────────────────

function isIconCandidate(node) {
  if (node.type !== 'COMPONENT' && node.type !== 'FRAME') return false;
  return /^ic[_-]/i.test(node.name) || (round(node.width, 2) === CANVAS && round(node.height, 2) === CANVAS);
}

function fromSelection() {
  var out = [];
  var sel = figma.currentPage.selection;
  for (var i = 0; i < sel.length; i++) {
    var n = sel[i];
    if (isIconCandidate(n)) { out.push(n); continue; }
    if (n.type === 'COMPONENT_SET' || n.type === 'SECTION' || n.type === 'GROUP' || n.type === 'FRAME') {
      var found = n.findAll ? n.findAll(isIconCandidate) : [];
      for (var j = 0; j < found.length; j++) out.push(found[j]);
    }
  }
  return dedupe(out);
}

function fromPage() {
  return dedupe(figma.currentPage.findAll(isIconCandidate));
}

function dedupe(list) {
  var seen = {};
  var out = [];
  for (var i = 0; i < list.length; i++) {
    if (seen[list[i].id]) continue;
    seen[list[i].id] = true;
    out.push(list[i]);
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. 실행
// ─────────────────────────────────────────────────────────────────────────────

function run(scope) {
  var targets = scope === 'page' ? fromPage() : fromSelection();
  if (!targets.length) {
    figma.ui.postMessage({
      type: 'result',
      scope: scope,
      reports: [],
      note: scope === 'page'
        ? '이 페이지에서 24 × 24 아이콘을 찾지 못했다.'
        : '선택한 것이 없다. 아이콘 컴포넌트나 그것을 담은 프레임·섹션을 고른다.'
    });
    return;
  }
  var reports = [];
  for (var i = 0; i < targets.length; i++) {
    try {
      reports.push(checkIcon(targets[i]));
    } catch (e) {
      var r = new Report(targets[i]);
      r.add('error', 'X', '검사 중 오류', String(e && e.message ? e.message : e));
      reports.push(r);
    }
  }
  reports.sort(function (a, b) {
    var ae = a.findings.filter(function (f) { return f.sev === 'error'; }).length;
    var be = b.findings.filter(function (f) { return f.sev === 'error'; }).length;
    if (ae !== be) return be - ae;
    return a.name.localeCompare(b.name);
  });
  figma.ui.postMessage({ type: 'result', scope: scope, reports: reports, note: '' });
}

/**
 * 리포트 항목이 가리키는 레이어를 캔버스에서 선택하고 화면에 맞춘다.
 * 검사 뒤 다른 페이지로 옮겨졌거나 지워졌을 수 있으므로 두 경우를 각각 알린다.
 */
function focusNode(nodeId) {
  if (!nodeId) return;
  figma.getNodeByIdAsync(nodeId).then(function (node) {
    if (!node || node.removed) {
      figma.notify('레이어를 찾지 못했다 — 검사 뒤에 지워진 것 같다.');
      return;
    }
    var page = node.parent;
    while (page && page.type !== 'PAGE') page = page.parent;
    if (!page) {
      figma.notify('레이어가 페이지에 붙어 있지 않다.');
      return;
    }
    var select = function () {
      figma.currentPage.selection = [node];
      figma.viewport.scrollAndZoomIntoView([node]);
    };
    if (page === figma.currentPage) { select(); return; }
    // 다른 페이지에 있으면 그 페이지로 옮겨 간다.
    figma.setCurrentPageAsync(page).then(function () {
      select();
      figma.notify('\u2192 ' + page.name);
    });
  }).catch(function (e) {
    figma.notify('레이어로 이동하지 못했다: ' + String(e && e.message ? e.message : e));
  });
}

figma.showUI(__html__, { width: 480, height: 660, themeColors: false });

figma.ui.onmessage = function (msg) {
  if (msg.type === 'check') { run(msg.scope); return; }
  if (msg.type === 'focus') { focusNode(msg.nodeId); return; }
  if (msg.type === 'resize') {
    figma.ui.resize(Math.max(380, msg.width | 0), Math.max(400, msg.height | 0));
  }
};

figma.on('selectionchange', function () {
  figma.ui.postMessage({ type: 'selection', count: figma.currentPage.selection.length });
});
