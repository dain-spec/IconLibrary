"use client";

import { useState } from "react";
import type { Icon } from "@/lib/icons";
import { figmaLinkFor } from "@/data/icons";
import { CopyButton } from "./CopyButton";

type Tab = "svg" | "react" | "figma";

const TABS: { key: Tab; label: string }[] = [
  { key: "svg", label: "SVG" },
  { key: "react", label: "React" },
  { key: "figma", label: "Figma" },
];

export function IconDetailPanel({
  icon,
  onClose,
}: {
  icon: Icon;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("svg");

  const reactSnippet = `import { Icon } from "@/components/icon"\n\n<Icon name="${icon.id}" />`;
  const figmaLink = icon.figmaNodeId ? figmaLinkFor(icon.figmaNodeId) : "";
  const content = tab === "svg" ? icon.svg : tab === "react" ? reactSnippet : figmaLink;

  return (
    <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose}>
      <div
        className="fixed inset-y-0 right-0 w-full max-w-md overflow-y-auto border-l border-border bg-surface p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span
              className="h-10 w-10 [&_svg]:h-10 [&_svg]:w-10"
              dangerouslySetInnerHTML={{ __html: icon.svg }}
            />
            <div>
              <p className="font-medium text-ink">{icon.id}</p>
              <p className="text-xs text-muted">{icon.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted hover:text-ink"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {(icon.tags.ko.length > 0 || icon.tags.en.length > 0) && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {[...icon.tags.ko, ...icon.tags.en].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex gap-1 border-b border-border">
          {TABS.filter((t) => t.key !== "figma" || figmaLink).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-2 text-sm ${
                tab === t.key
                  ? "border-b-2 border-accent text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative mt-3">
          <pre className="max-h-40 overflow-auto rounded-lg bg-surface-hover p-3 text-xs text-ink">
            <code>{content}</code>
          </pre>
          <div className="absolute right-2 top-2">
            <CopyButton text={content} />
          </div>
        </div>
      </div>
    </div>
  );
}
