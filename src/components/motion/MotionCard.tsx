"use client";

import Lottie from "lottie-react";
import type { MotionAsset } from "@/lib/motion";

export function MotionCard({
  asset,
  isSelected,
  onClick,
}: {
  asset: MotionAsset;
  isSelected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={asset.title}
      aria-label={asset.title}
      aria-pressed={isSelected}
      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border bg-neutral-900 p-2 transition-colors hover:bg-neutral-800 ${
        isSelected ? "border-accent" : "border-border"
      }`}
    >
      {asset.type === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset.src} alt={asset.title} className="h-full w-full object-contain" />
      ) : (
        <Lottie path={asset.src} loop autoplay className="h-full w-full" />
      )}
    </button>
  );
}
