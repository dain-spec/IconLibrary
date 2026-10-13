"use client";

import { useState } from "react";
import Lottie from "lottie-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
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
  // Cards show a tiny static thumbnail; the real animation/image is only fetched
  // while the card is hovered or focused, so opening the page stays light.
  const [active, setActive] = useState(false);
  const animationData = useLottieData(asset.type === "json" && active ? asset.src : "");

  // Keep the thumbnail up until a hovered Lottie JSON has actually loaded.
  const showLive =
    !asset.thumb || (active && (asset.type !== "json" || animationData !== null));

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      data-card-id={asset.id}
      title={asset.title}
      aria-label={asset.title}
      aria-pressed={isSelected}
      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border bg-[#FAFAFA] p-2 transition-colors hover:bg-[#F0F0F0] focus:outline focus:outline-[0.5px] focus:outline-offset-0 focus:outline-accent ${
        isSelected ? "border-accent" : "border-border"
      }`}
    >
      {showLive ? (
        asset.type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset.src} alt={asset.title} className="h-full w-full object-contain" />
        ) : asset.type === "lottie" ? (
          active && <DotLottieReact src={asset.src} loop autoplay className="h-full w-full" />
        ) : (
          animationData && (
            <Lottie animationData={animationData} loop autoplay className="h-full w-full" />
          )
        )
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset.thumb}
          alt={asset.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      )}
    </button>
  );
}
