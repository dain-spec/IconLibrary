"use client";

import type { Icon } from "@/lib/icons";

export function IconCard({
  icon,
  isSelected,
  onClick,
}: {
  icon: Icon;
  isSelected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      data-card-id={icon.id}
      title={icon.id}
      aria-label={icon.id}
      aria-pressed={isSelected}
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border transition-colors focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-accent ${
        isSelected
          ? "border-accent bg-accent/10"
          : "border-border bg-surface hover:bg-surface-hover"
      }`}
    >
      <span
        className="h-6 w-6 [&_svg]:h-6 [&_svg]:w-6"
        dangerouslySetInnerHTML={{ __html: icon.svg }}
      />
    </button>
  );
}
