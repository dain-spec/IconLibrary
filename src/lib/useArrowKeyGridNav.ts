"use client";

import { useEffect, type RefObject } from "react";

const ARROW_KEYS = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);

function isTypingTarget(el: Element | null) {
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || (el as HTMLElement).isContentEditable;
}

// Card position, not list order, decides up/down: cards wrap in flex rows
// whose column count depends on viewport width, so "next row" only exists
// as a DOM layout fact, not something derivable from the ids array alone.
export function useArrowKeyGridNav({
  containerRef,
  ids,
  selectedId,
  onSelect,
}: {
  containerRef: RefObject<HTMLElement | null>;
  ids: string[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!ARROW_KEYS.has(e.key)) return;
      if (isTypingTarget(document.activeElement)) return;
      const container = containerRef.current;
      if (!container || ids.length === 0) return;

      const nodes = ids
        .map((id) => ({
          id,
          el: container.querySelector<HTMLElement>(`[data-card-id="${CSS.escape(id)}"]`),
        }))
        .filter((n): n is { id: string; el: HTMLElement } => !!n.el);
      if (nodes.length === 0) return;

      e.preventDefault();

      const currentIndex = selectedId ? nodes.findIndex((n) => n.id === selectedId) : -1;
      if (currentIndex === -1) {
        selectAndReveal(nodes[0]);
        return;
      }

      if (e.key === "ArrowRight") {
        selectAndReveal(nodes[Math.min(currentIndex + 1, nodes.length - 1)]);
        return;
      }
      if (e.key === "ArrowLeft") {
        selectAndReveal(nodes[Math.max(currentIndex - 1, 0)]);
        return;
      }

      const currentRect = nodes[currentIndex].el.getBoundingClientRect();
      let best: { id: string; el: HTMLElement } | null = null;
      let bestScore = Infinity;
      for (const n of nodes) {
        if (n.id === selectedId) continue;
        const rect = n.el.getBoundingClientRect();
        if (e.key === "ArrowDown" && rect.top <= currentRect.top + 1) continue;
        if (e.key === "ArrowUp" && rect.top >= currentRect.top - 1) continue;
        const verticalDist = Math.abs(rect.top - currentRect.top);
        const horizontalDist = Math.abs(rect.left - currentRect.left);
        const score = verticalDist * 1000 + horizontalDist;
        if (score < bestScore) {
          bestScore = score;
          best = n;
        }
      }
      if (best) selectAndReveal(best);
    }

    function selectAndReveal(node: { id: string; el: HTMLElement }) {
      node.el.focus({ preventScroll: true });
      node.el.scrollIntoView({ block: "nearest", inline: "nearest" });
      onSelect(node.id);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [containerRef, ids, selectedId, onSelect]);
}
