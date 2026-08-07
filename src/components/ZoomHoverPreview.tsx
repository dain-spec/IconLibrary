"use client";

import { useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { MagnifierIcon } from "./MagnifierIcon";

const OVERLAY_SIZE = 256;
const VIEWPORT_MARGIN = 8;

export function ZoomHoverPreview({
  bgClassName,
  large,
  children,
}: {
  bgClassName: string;
  large: ReactNode;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  function handleEnter() {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const top = Math.min(
      Math.max(rect.top + rect.height / 2 - OVERLAY_SIZE / 2, VIEWPORT_MARGIN),
      window.innerHeight - OVERLAY_SIZE - VIEWPORT_MARGIN
    );
    const left = Math.min(
      Math.max(rect.left + rect.width / 2 - OVERLAY_SIZE / 2, VIEWPORT_MARGIN),
      window.innerWidth - OVERLAY_SIZE - VIEWPORT_MARGIN
    );
    setPosition({ top, left });
    setHovered(true);
  }

  return (
    <div ref={containerRef} className="relative">
      {children}
      <button
        type="button"
        onMouseEnter={handleEnter}
        onMouseLeave={() => setHovered(false)}
        aria-label="크게 보기"
        className="absolute right-2 top-2 rounded-md bg-white/80 p-1.5 text-muted transition-colors hover:text-ink"
      >
        <MagnifierIcon />
      </button>
      {hovered &&
        createPortal(
          <div
            onMouseEnter={handleEnter}
            onMouseLeave={() => setHovered(false)}
            className={`fixed z-50 flex items-center justify-center rounded-xl border border-border shadow-lg ${bgClassName}`}
            style={{
              top: position.top,
              left: position.left,
              width: OVERLAY_SIZE,
              height: OVERLAY_SIZE,
            }}
          >
            {large}
          </div>,
          document.body
        )}
    </div>
  );
}
