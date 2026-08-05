"use client";

import { useState } from "react";

export function CopyButton({
  text,
  variant = "text",
}: {
  text: string;
  variant?: "text" | "icon";
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  if (variant === "icon") {
    return (
      <button
        onClick={handleCopy}
        title={copied ? "복사됨" : "클릭하여 복사"}
        aria-label="복사"
        className="rounded-md p-1 text-muted transition-colors hover:bg-surface-hover hover:text-ink"
      >
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded-md border border-border px-2.5 py-1 text-xs text-muted transition-colors hover:bg-surface-hover hover:text-ink"
    >
      {copied ? "복사됨" : "복사"}
    </button>
  );
}
