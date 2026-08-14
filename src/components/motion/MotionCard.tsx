"use client";

import Lottie from "lottie-react";
import type { MotionAsset } from "@/lib/motion";
import { useLottieData } from "@/lib/useLottieData";

export function MotionCard({
  asset,
  isSelected,
  onClick,
}: {
  asset: MotionAsset;
  isSelected?: boolean;
  onClick: () => void;
}) {
  const animationData = useLottieData(asset.type === "json" ? asset.src : "");

  return (
    <button
      onClick={onClick}
      data-card-id={asset.id}
      title={asset.title}
      aria-label={asset.title}
      aria-pressed={isSelected}
      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border bg-[#FAFAFA] p-2 transition-colors hover:bg-[#F0F0F0] focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-accent ${
        isSelected ? "border-accent" : "border-border"
      }`}
    >
      {asset.type === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset.src} alt={asset.title} className="h-full w-full object-contain" />
      ) : (
        animationData && (
          <Lottie animationData={animationData} loop autoplay className="h-full w-full" />
        )
      )}
    </button>
  );
}
