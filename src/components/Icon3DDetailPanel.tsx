"use client";

import { useEffect, useState } from "react";
import type { Icon3D } from "@/lib/icons3d";
import { figmaLinkFor } from "@/data/icons";
import { dedupeTagsCaseInsensitive } from "@/lib/tags";
import { useResizablePanelWidth } from "@/lib/useResizablePanelWidth";
import { copyImageToClipboard } from "@/lib/clipboardImage";
import { CODE_COLORS } from "@/lib/codeColors";
import { CopyButton } from "./CopyButton";
import { PanelResizeHandle } from "./PanelResizeHandle";
import { ZoomHoverPreview } from "./ZoomHoverPreview";

type Tab = "react" | "figma";

const TABS: { key: Tab; label: string }[] = [
  { key: "react", label: "React" },
  { key: "figma", label: "Figma" },
];

// Hand-colored to match IconDetailPanel's ReactCodeBlock: a fixed one-line
// shape doesn't need Prism just to get the same red/blue/orange/string look.
function ImgCodeBlock({ src, alt }: { src: string; alt: string }) {
  const copyText = `<img src="${src}" alt="${alt}" />`;
  return (
    <div className="relative">
      <pre
        className="m-0 overflow-x-auto whitespace-pre rounded-lg p-3 font-mono text-sm"
        style={{ background: "#ffffff", border: "1px solid #ededed", lineHeight: "1.5" }}
      >
        {"<"}
        <span style={{ color: CODE_COLORS.blue }}>img</span>{" "}
        <span style={{ color: CODE_COLORS.orange }}>src</span>=
        <span style={{ color: CODE_COLORS.string }}>&quot;{src}&quot;</span>{" "}
        <span style={{ color: CODE_COLORS.orange }}>alt</span>=
        <span style={{ color: CODE_COLORS.string }}>&quot;{alt}&quot;</span>{" "}
        {"/>"}
      </pre>
      <div className="absolute right-2 top-2 flex gap-1 rounded-md bg-white/80 p-0.5 shadow-sm">
        <CopyButton text={copyText} variant="icon" />
      </div>
    </div>
  );
}

export function Icon3DDetailPanel({
  icon,
  onClose,
  onTagClick,
}: {
  icon: Icon3D;
  onClose: () => void;
  onTagClick: (tag: string) => void;
}) {
  const [tab, setTab] = useState<Tab>("react");
  const [visible, setVisible] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const { width, isDragging, onPointerDown } = useResizablePanelWidth();
  const figmaLink = icon.figmaNodeId ? figmaLinkFor(icon.figmaNodeId) : "";

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

        <a
          href={icon.src}
          download={fileName}
          className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-ink transition-colors hover:bg-surface-hover"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {fileName} 다운로드
        </a>

        <div className="mt-5 flex gap-1 border-b border-border">
          {TABS.filter((t) => t.key !== "figma" || figmaLink).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-2 text-sm ${
                tab === t.key
                  ? "border-b-2 border-accent text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "react" ? (
          <div className="mt-3">
            <p className="mb-1.5 text-xs font-medium text-muted">IMG</p>
            <ImgCodeBlock src={icon.src} alt={icon.title} />
          </div>
        ) : (
          <div className="mt-3 flex flex-col gap-3">
            <a
              href={figmaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-ink transition-colors hover:bg-surface-hover"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 3h6v6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Figma에서 열기
            </a>
            <p className="text-sm text-muted">
              이미지를 복사한 뒤 Figma에 붙여넣기(Cmd+V) 하세요.
            </p>
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
        )}
      </div>
    </div>
  );
}
