"use client";

import { useEffect, useState } from "react";
import type { Icon3D } from "@/lib/icons3d";
import { dedupeTagsCaseInsensitive } from "@/lib/tags";
import { useResizablePanelWidth } from "@/lib/useResizablePanelWidth";
import { CopyButton } from "./CopyButton";
import { PanelResizeHandle } from "./PanelResizeHandle";
import { ZoomHoverPreview } from "./ZoomHoverPreview";
import { copyImageToClipboard } from "@/lib/clipboardImage";

export function Icon3DDetailPanel({
  icon,
  onClose,
  onTagClick,
}: {
  icon: Icon3D;
  onClose: () => void;
  onTagClick: (tag: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const { width, isDragging, onPointerDown } = useResizablePanelWidth();

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    setCopyState("idle");
  }, [icon.id]);

  const fileName = decodeURIComponent(icon.src.split("/").pop() ?? icon.src);

  async function handleCopyImage() {
    const success = await copyImageToClipboard(icon.src);
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
          <h2 className="text-xl font-bold text-ink">{icon.title}</h2>
          <CopyButton text={icon.title} variant="icon" />
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {dedupeTagsCaseInsensitive(icon.tags).map((tag) => (
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
            // eslint-disable-next-line @next/next/no-img-element
            <img src={icon.src} alt={icon.title} className="h-80 w-80 object-contain" />
          }
        >
          <div className="mt-5 flex items-center justify-center rounded-xl bg-surface-hover p-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon.src} alt={icon.title} className="h-24 w-24 object-contain" />
          </div>
        </ZoomHoverPreview>

        <div className="mt-5 flex flex-col gap-2">
          <a
            href={icon.src}
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
        </div>
      </div>
    </div>
  );
}
