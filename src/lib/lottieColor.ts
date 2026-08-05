// Utilities for finding and editing static Lottie fill/stroke colors.
// Ported from the motion-gilt site's color-edit dialog.

export interface LottieColorRef {
  k: number[];
  a?: number;
}

export interface LottieColorGroup {
  refs: LottieColorRef[];
}

function isStaticLottieColorC(c: unknown): c is LottieColorRef {
  if (!c || typeof c !== "object" || !Array.isArray((c as LottieColorRef).k)) {
    return false;
  }
  const ref = c as LottieColorRef;
  if (ref.k.length !== 4) return false;
  if (!ref.k.every((x) => typeof x === "number" && Number.isFinite(x))) return false;
  if (ref.a === 1) return false;
  return true;
}

export function collectStaticLottieColorCKs(root: unknown): LottieColorRef[] {
  const out: LottieColorRef[] = [];
  function walk(node: unknown) {
    if (!node || typeof node !== "object") return;
    const obj = node as Record<string, unknown>;
    if ((obj.ty === "fl" || obj.ty === "st") && isStaticLottieColorC(obj.c)) {
      out.push(obj.c as LottieColorRef);
    }
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    for (const key of Object.keys(obj)) {
      walk(obj[key]);
    }
  }
  walk(root);
  return out;
}

function colorGroupKey(kArr: number[]): string {
  return kArr.map((x) => Math.round(x * 1e5) / 1e5).join("|");
}

export function groupLottieColorRefs(refs: LottieColorRef[]): LottieColorGroup[] {
  const map = new Map<string, LottieColorRef[]>();
  for (const c of refs) {
    const key = colorGroupKey(c.k);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(c);
  }
  return [...map.values()].map((groupRefs) => ({ refs: groupRefs }));
}

export function rgb01ToHex(r: number, g: number, b: number): string {
  const to255 = (x: number) => Math.max(0, Math.min(255, Math.round(x <= 1 ? x * 255 : x)));
  return `#${[to255(r), to255(g), to255(b)]
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("")}`;
}

export function hexToRgb01(hex: string): { r: number; g: number; b: number } | null {
  const h = hex.replace("#", "").trim();
  if (h.length !== 6) return null;
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  if ([r, g, b].some((x) => Number.isNaN(x))) return null;
  return { r, g, b };
}

export function applyHexToGroup(group: LottieColorGroup, hex: string) {
  const rgb = hexToRgb01(hex);
  if (!rgb) return;
  for (const c of group.refs) {
    c.k[0] = rgb.r;
    c.k[1] = rgb.g;
    c.k[2] = rgb.b;
  }
}
