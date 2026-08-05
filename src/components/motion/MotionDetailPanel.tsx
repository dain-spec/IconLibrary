"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import type { MotionAsset } from "@/lib/motion";
import { CopyButton } from "../CopyButton";

export function MotionDetailPanel({
  asset,
  onClose,
}: {
  asset: MotionAsset;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const fileName = asset.src.split("/").pop() ?? asset.src;

  return (
    <div
      className="h-full shrink-0 overflow-hidden border-l border-border bg-surface transition-[width] duration-300 ease-out"
      style={{ width: visible ? "28rem" : "0px" }}
    >
      <div className="relative h-full w-[28rem] overflow-y-auto p-6">
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
          <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">
            {asset.category}
          </span>
          {asset.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center rounded-xl bg-neutral-900 p-10">
          {asset.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={asset.src} alt={asset.title} className="h-24 w-24 object-contain" />
          ) : (
            <Lottie path={asset.src} loop autoplay className="h-24 w-24" />
          )}
        </div>

        <a
          href={asset.src}
          download={fileName}
          className="mt-5 flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-ink transition-colors hover:bg-surface-hover"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {fileName} 다운로드
        </a>
      </div>
    </div>
  );
}
