"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_WIDTH = 448; // 28rem
const MIN_WIDTH = 320; // 20rem
const MAX_WIDTH = 720; // 45rem

export function useResizablePanelWidth() {
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(DEFAULT_WIDTH);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      startXRef.current = e.clientX;
      startWidthRef.current = width;
      setIsDragging(true);
    },
    [width]
  );

  useEffect(() => {
    if (!isDragging) return;

    function handleMove(e: PointerEvent) {
      const delta = startXRef.current - e.clientX;
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidthRef.current + delta));
      setWidth(next);
    }

    function handleUp() {
      setIsDragging(false);
    }

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleUp);
    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
    };
  }, [isDragging]);

  return { width, isDragging, onPointerDown };
}
