"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Lottie from "lottie-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { MotionAsset } from "@/lib/motion";
import { dedupeTagsCaseInsensitive } from "@/lib/tags";
import { useResizablePanelWidth } from "@/lib/useResizablePanelWidth";
import { CopyButton } from "../CopyButton";
import { PanelResizeHandle } from "../PanelResizeHandle";
import { ZoomHoverPreview } from "../ZoomHoverPreview";
import { useLottieData } from "@/lib/useLottieData";
import { copyImageToClipboard } from "@/lib/clipboardImage";
import {
  applyHexToGroup,
  collectStaticLottieColorCKs,
  groupLottieColorRefs,
  rgb01ToHex,
  type LottieColorGroup,
} from "@/lib/lottieColor";

const XLINK_NS = "http://www.w3.org/1999/xlink";

async function webpDataUrlToPng(dataUrl: string): Promise<string> {
  const img = new Image();
  img.src = dataUrl;
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  canvas.getContext("2d")?.drawImage(img, 0, 0);
  return canvas.toDataURL("image/png");
}

// Figma's SVG import drops WebP data URIs, so embedded images are converted to
// PNG, and layers lottie hides (display="none") are pruned to keep the paste small.
async function serializeSvgForFigma(svgEl: SVGSVGElement): Promise<string> {
  const clone = svgEl.cloneNode(true) as SVGSVGElement;
  clone.querySelectorAll('[display="none"]').forEach((el) => el.remove());
  clone.querySelectorAll("g").forEach((el) => {
    if (el.style.display === "none") el.remove();
  });
  const usedIds = new Set(
    Array.from(clone.querySelectorAll("use")).map((el) =>
      (el.getAttribute("href") ?? el.getAttributeNS(XLINK_NS, "href") ?? "").replace(/^#/, "")
    )
  );
  clone.querySelectorAll("defs > image").forEach((el) => {
    if (!usedIds.has(el.id)) el.remove();
  });
  const cache = new Map<string, Promise<string>>();
  await Promise.all(
    Array.from(clone.querySelectorAll("image")).map(async (el) => {
      const href = el.getAttribute("href") ?? el.getAttributeNS(XLINK_NS, "href") ?? "";
      if (!href.startsWith("data:image/webp")) return;
      let png = cache.get(href);
      if (!png) {
        png = webpDataUrlToPng(href);
        cache.set(href, png);
      }
      const converted = await png;
      if (el.hasAttribute("href")) el.setAttribute("href", converted);
      if (el.hasAttributeNS(XLINK_NS, "href")) el.setAttributeNS(XLINK_NS, "xlink:href", converted);
    })
  );
  flattenGroups(clone);
  return clone.outerHTML;
}

function parseMatrix(value: string | null): DOMMatrix {
  if (!value) return new DOMMatrix();
  try {
    return new DOMMatrix(value);
  } catch {
    return new DOMMatrix();
  }
}

function matrixAttr(m: DOMMatrix): string {
  const r = (n: number) => Math.round(n * 1e5) / 1e5;
  return `matrix(${r(m.a)},${r(m.b)},${r(m.c)},${r(m.d)},${r(m.e)},${r(m.f)})`;
}

// Bounding box of a clipPath/mask that is a single opaque rect or rect-shaped path.
function clipBounds(clipEl: Element): [number, number, number, number] | null {
  if (clipEl.children.length !== 1) return null;
  const shape = clipEl.children[0];
  if (shape.tagName === "rect") {
    const [x, y, w, h] = ["x", "y", "width", "height"].map((k) => parseFloat(shape.getAttribute(k) ?? "0"));
    return [x, y, x + w, y + h];
  }
  const fill = shape.getAttribute("fill");
  if (clipEl.tagName === "mask" && fill && !/^(#fff(fff)?|white)$/i.test(fill)) return null;
  if (shape.getAttribute("fill-opacity") === "0" || shape.getAttribute("opacity") === "0") return null;
  const d = shape.tagName === "path" ? (shape.getAttribute("d") ?? "") : "";
  if (!d || /[^MLCZz\s,.\-\d]/.test(d)) return null;
  const nums = (d.match(/-?\d*\.?\d+/g) ?? []).map(Number);
  if (nums.length < 8 || nums.length % 2) return null;
  const xs = nums.filter((_, i) => i % 2 === 0);
  const ys = nums.filter((_, i) => i % 2 === 1);
  const [x0, y0, x1, y1] = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
  // Every point must sit on a corner, otherwise a curve could bulge inside the box.
  const onCorner = xs.every((x, i) => (x === x0 || x === x1) && (ys[i] === y0 || ys[i] === y1));
  return onCorner ? [x0, y0, x1, y1] : null;
}

// Whether the clip-path/mask on `el` (positioned by `ctm`) changes nothing: it either
// covers the whole canvas, or covers every image the group contains.
function hasNoopClip(svgEl: SVGSVGElement, el: Element, ctm: DOMMatrix): boolean {
  const attr = el.getAttribute("clip-path") ?? el.getAttribute("mask") ?? "";
  const ref = /url\(#([^)]+)\)/.exec(attr)?.[1];
  const clipEl = ref ? svgEl.querySelector(`[id="${ref}"]`) : null;
  const bounds = clipEl ? clipBounds(clipEl) : null;
  if (!bounds) return false;
  const [x0, y0, x1, y1] = bounds;

  const kids = Array.from(el.children);
  if (kids.length && kids.every((k) => k.tagName === "image" && !k.hasAttribute("transform"))) {
    const covers = kids.every((k) => {
      const w = parseFloat(k.getAttribute("width") ?? "");
      const h = parseFloat(k.getAttribute("height") ?? "");
      const kx = parseFloat(k.getAttribute("x") ?? "0");
      const ky = parseFloat(k.getAttribute("y") ?? "0");
      return w > 0 && h > 0 && x0 <= kx && y0 <= ky && x1 >= kx + w && y1 >= ky + h;
    });
    if (covers) return true;
  }

  if (kids.length && kids.every((k) => k.tagName === "path")) {
    const inside = kids.every((k) => {
      const d = k.getAttribute("d") ?? "";
      if (/[^MLCZz\s,.\-\d]/.test(d)) return false;
      const nums = (d.match(/-?\d*\.?\d+(?:e-?\d+)?/g) ?? []).map(Number);
      if (nums.length < 2 || nums.length % 2) return false;
      const m = parseMatrix(k.getAttribute("transform"));
      const pad = k.hasAttribute("stroke") ? parseFloat(k.getAttribute("stroke-width") ?? "1") : 0;
      // Control points enclose the curve, so if they fit the clip the curve does too.
      for (let i = 0; i < nums.length; i += 2) {
        const p = m.transformPoint(new DOMPoint(nums[i], nums[i + 1]));
        if (p.x - pad < x0 || p.x + pad > x1 || p.y - pad < y0 || p.y + pad > y1) return false;
      }
      return true;
    });
    if (inside) return true;
  }

  const pts = [
    ctm.transformPoint(new DOMPoint(x0, y0)),
    ctm.transformPoint(new DOMPoint(x1, y1)),
    ctm.transformPoint(new DOMPoint(x0, y1)),
    ctm.transformPoint(new DOMPoint(x1, y0)),
  ];
  const vb = svgEl.viewBox.baseVal;
  const eps = 0.5;
  return (
    Math.min(...pts.map((p) => p.x)) <= vb.x + eps &&
    Math.min(...pts.map((p) => p.y)) <= vb.y + eps &&
    Math.max(...pts.map((p) => p.x)) >= vb.x + vb.width - eps &&
    Math.max(...pts.map((p) => p.y)) >= vb.y + vb.height - eps
  );
}

// Removes <g> wrappers by pushing their transform/opacity down onto the children.
// Groups that still carry a real clip-path or mask are kept, since dropping those
// would change how the artwork looks.
function flattenGroups(svgEl: SVGSVGElement) {
  const ctms = new Map<Element, DOMMatrix>();
  const measure = (parent: Element, acc: DOMMatrix) => {
    for (const child of Array.from(parent.children)) {
      if (child.tagName === "defs") continue;
      const own = acc.multiply(parseMatrix(child.getAttribute("transform")));
      ctms.set(child, own);
      if (child.tagName === "g") measure(child, own);
    }
  };
  measure(svgEl, new DOMMatrix());
  const unwrap = (parent: Element) => {
    for (const child of Array.from(parent.children)) {
      if (child.tagName === "defs") continue;
      if (child.tagName === "g") unwrap(child);
      if (child.tagName !== "g") continue;
      if (
        (child.hasAttribute("clip-path") || child.hasAttribute("mask")) &&
        hasNoopClip(svgEl, child, ctms.get(child) ?? new DOMMatrix())
      ) {
        child.removeAttribute("clip-path");
        child.removeAttribute("mask");
      }
      if (child.hasAttribute("clip-path") || child.hasAttribute("mask")) continue;
      const m = parseMatrix(child.getAttribute("transform"));
      const opacity = parseFloat(child.getAttribute("opacity") ?? "1");
      for (const grand of Array.from(child.children)) {
        const combined = m.multiply(parseMatrix(grand.getAttribute("transform")));
        if (!combined.isIdentity) grand.setAttribute("transform", matrixAttr(combined));
        if (opacity !== 1) {
          const own = parseFloat(grand.getAttribute("opacity") ?? "1");
          grand.setAttribute("opacity", String(Math.round(own * opacity * 1e4) / 1e4));
        }
        parent.insertBefore(grand, child);
      }
      child.remove();
    }
  };
  unwrap(svgEl);
  svgEl.removeAttribute("style");
  svgEl.querySelectorAll("[style]").forEach((el) => el.removeAttribute("style"));
  svgEl.querySelectorAll("[class]").forEach((el) => el.removeAttribute("class"));
  const used = svgEl.outerHTML;
  svgEl.querySelectorAll("clipPath, mask").forEach((el) => {
    if (!used.includes(`#${el.id})`)) el.remove();
  });
  svgEl.querySelectorAll("defs").forEach((el) => {
    if (!el.children.length) el.remove();
  });
}

function cloneAnimationData(data: object) {
  return JSON.parse(JSON.stringify(data));
}

export function MotionDetailPanel({
  asset,
  onClose,
  onTagClick,
}: {
  asset: MotionAsset;
  onClose: () => void;
  onTagClick: (tag: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const rawData = useLottieData(asset.type === "json" ? asset.src : "");
  const [workingData, setWorkingData] = useState<Record<string, unknown> | null>(null);
  const [colorGroups, setColorGroups] = useState<LottieColorGroup[]>([]);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const previewRef = useRef<HTMLDivElement>(null);
  const { width, isDragging, onPointerDown } = useResizablePanelWidth();

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!rawData) return;
    const cloned = cloneAnimationData(rawData);
    setWorkingData(cloned);
    setColorGroups(groupLottieColorRefs(collectStaticLottieColorCKs(cloned)));
  }, [rawData]);

  useEffect(() => {
    setCopyState("idle");
    setWorkingData(null);
    setColorGroups([]);
  }, [asset.id]);

  const fileName = asset.src.split("/").pop() ?? asset.src;

  function handleColorChange(group: LottieColorGroup, hex: string) {
    applyHexToGroup(group, hex);
    setWorkingData((prev) => (prev ? { ...prev } : prev));
  }

  function handleResetColors() {
    if (!rawData) return;
    const cloned = cloneAnimationData(rawData);
    setWorkingData(cloned);
    setColorGroups(groupLottieColorRefs(collectStaticLottieColorCKs(cloned)));
  }

  async function handleCopyToFigma() {
    const svgEl = previewRef.current?.querySelector("svg");
    if (!svgEl) {
      setCopyState("error");
      return;
    }
    let markup: string;
    try {
      markup = await serializeSvgForFigma(svgEl);
    } catch {
      markup = svgEl.outerHTML;
    }
    if (!/\sxmlns\s*=/.test(markup)) {
      markup = markup.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ');
    }
    try {
      await navigator.clipboard.writeText(markup);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    setTimeout(() => setCopyState("idle"), 1600);
  }

  async function handleCopyImage() {
    const success = await copyImageToClipboard(asset.src);
    setCopyState(success ? "copied" : "error");
    setTimeout(() => setCopyState("idle"), 1600);
  }

  async function handleCopyCanvasFrame() {
    const canvas = previewRef.current?.querySelector("canvas");
    if (!canvas) {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 1600);
      return;
    }
    try {
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("no blob");
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    setTimeout(() => setCopyState("idle"), 1600);
  }

  return (
    <div
      className={`relative h-full shrink-0 overflow-hidden border-l border-border bg-surface ${
        isDragging ? "" : "transition-[width] duration-300 ease-out"
      }`}
      style={{ width: visible ? `${width}px` : "0px" }}
    >
      <PanelResizeHandle onPointerDown={onPointerDown} />
      <div className="relative h-full overflow-y-auto p-6" style={{ width: `${width}px` }}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted hover:text-ink"
          aria-label="닫기"
        >
          ✕
        </button>

        <div className="flex items-center gap-1.5 pr-8">
          <h2 className="text-xl font-bold text-ink">{asset.title}</h2>
          <CopyButton text={asset.title} variant="icon" />
        </div>

        {asset.note && <p className="mt-1 text-sm text-muted">{asset.note}</p>}

        <div className="mt-3 flex flex-wrap gap-1.5">
          {dedupeTagsCaseInsensitive(asset.tags).map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="rounded-full border border-border px-2 py-0.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {tag}
            </button>
          ))}
        </div>

        <ZoomHoverPreview
          large={
            asset.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={asset.src} alt={asset.title} className="h-80 w-80 object-contain" />
            ) : asset.type === "lottie" ? (
              <DotLottieReact src={asset.src} loop autoplay className="h-80 w-80" />
            ) : (
              workingData && (
                <Lottie animationData={workingData} loop autoplay className="h-80 w-80" />
              )
            )
          }
        >
          <div
            ref={previewRef}
            className="mt-3 flex items-center justify-center rounded-xl bg-neutral-900 p-10"
          >
            {asset.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={asset.src} alt={asset.title} className="h-24 w-24 object-contain" />
            ) : asset.type === "lottie" ? (
              <DotLottieReact src={asset.src} loop autoplay className="h-24 w-24" />
            ) : (
              workingData && (
                <Lottie animationData={workingData} loop autoplay className="h-24 w-24" />
              )
            )}
          </div>
        </ZoomHoverPreview>

        {colorGroups.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {colorGroups.map((group, index) => {
              const [r, g, b] = group.refs[0].k;
              const hex = rgb01ToHex(r, g, b);
              return (
                <input
                  key={index}
                  type="color"
                  value={hex}
                  onChange={(e) => handleColorChange(group, e.target.value)}
                  className="h-5 w-5 cursor-pointer rounded-full border border-border p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch-wrapper]:rounded-full [&::-webkit-color-swatch-wrapper]:p-0"
                />
              );
            })}
            <button
              onClick={handleResetColors}
              title="원래 색상으로 되돌리기"
              aria-label="원래 색상으로 되돌리기"
              className="flex h-5 w-5 items-center justify-center text-muted transition-colors hover:text-ink"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 2.6-6.4" strokeLinecap="round" />
                <path d="M3 4v5h5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2">
          <a
            href={asset.src}
            download={fileName}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-ink transition-colors hover:bg-surface-hover"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {fileName} 다운로드
          </a>

          {asset.type === "json" ? (
            <button
              onClick={handleCopyToFigma}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-ink transition-colors hover:bg-surface-hover"
            >
              🎨{" "}
              {copyState === "copied"
                ? "SVG 복사됨"
                : copyState === "error"
                  ? "복사 실패"
                  : "Figma로 SVG 복사"}
            </button>
          ) : asset.type === "lottie" ? (
            <button
              onClick={handleCopyCanvasFrame}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-ink transition-colors hover:bg-surface-hover"
            >
              🖼️{" "}
              {copyState === "copied"
                ? "이미지 복사됨"
                : copyState === "error"
                  ? "복사 실패"
                  : "이미지 복사"}
            </button>
          ) : (
            <button
              onClick={handleCopyImage}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-ink transition-colors hover:bg-surface-hover"
            >
              🖼️{" "}
              {copyState === "copied"
                ? "이미지 복사됨"
                : copyState === "error"
                  ? "복사 실패"
                  : "이미지 복사"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
