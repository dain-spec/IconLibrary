"use client";

import { useMemo, useState } from "react";
import type { MotionAsset } from "@/lib/motion";
import { MotionCard } from "./MotionCard";
import { MotionDetailPanel } from "./MotionDetailPanel";

export function MotionExplorer({ assets }: { assets: MotionAsset[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("전체");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const categories = useMemo(
    () => ["전체", ...Array.from(new Set(assets.map((a) => a.category)))],
    [assets]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return assets.filter((asset) => {
      const matchesCategory = category === "전체" || asset.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = [asset.title, asset.category, asset.note ?? "", ...asset.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [assets, query, category]);

  const selected = assets.find((a) => a.id === selectedId) ?? null;

  return (
    <div className="flex h-full overflow-hidden">
      <div className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="이름, 태그로 검색 (예: loader, 로딩, dobi)"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  category === c
                    ? "border-accent bg-accent text-white"
                    : "border-border text-muted hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="mt-16 text-center text-sm text-muted">
              검색 결과가 없습니다.
            </p>
          ) : (
            <div className="mt-6 flex flex-wrap gap-3">
              {filtered.map((asset) => (
                <MotionCard
                  key={asset.id}
                  asset={asset}
                  isSelected={asset.id === selectedId}
                  onClick={() => setSelectedId(asset.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selected && (
        <MotionDetailPanel
          key={selected.id}
          asset={selected}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
