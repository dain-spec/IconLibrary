"use client";

import type { Icon } from "@/lib/icons";

export function IconCard({
  icon,
  onClick,
}: {
  icon: Icon;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={icon.id}
      aria-label={icon.id}
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-surface transition-colors hover:bg-surface-hover"
    >
      <span
        className="h-6 w-6 [&_svg]:h-6 [&_svg]:w-6"
        dangerouslySetInnerHTML={{ __html: icon.svg }}
      />
    </button>
  );
}
