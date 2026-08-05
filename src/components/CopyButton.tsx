"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
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
