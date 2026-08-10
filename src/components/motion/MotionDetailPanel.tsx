"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Lottie from "lottie-react";
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
    let markup = svgEl.outerHTML;
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
