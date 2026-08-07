"use client";

import type { Icon3D } from "@/lib/icons3d";

export function Icon3DCard({
  icon,
  isSelected,
  onClick,
}: {
  icon: Icon3D;
  isSelected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={icon.title}
      aria-label={icon.title}
      aria-pressed={isSelected}
      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border p-2 transition-colors ${
        isSelected
          ? "border-accent bg-accent/10"
          : "border-border bg-surface hover:bg-surface-hover"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon.src} alt={icon.title} className="h-full w-full object-contain" />
    </button>
  );
}
