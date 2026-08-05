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
      className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-5 text-left transition-colors hover:bg-surface-hover"
    >
      <span
        className="h-10 w-10 [&_svg]:h-10 [&_svg]:w-10"
        dangerouslySetInnerHTML={{ __html: icon.svg }}
      />
      <span className="w-full truncate text-center text-xs text-muted">
        {icon.id}
      </span>
    </button>
  );
}
