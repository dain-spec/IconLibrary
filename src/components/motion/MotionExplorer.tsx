"use client";

import { useMemo, useState } from "react";
import type { MotionAsset } from "@/lib/motion";
import { MotionCard } from "./MotionCard";
import { MotionDetailPanel } from "./MotionDetailPanel";
import { SearchClearButton } from "../SearchClearButton";
import { SearchIcon } from "../SearchIcon";

export function MotionExplorer({ assets }: { assets: MotionAsset[] }) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return assets;
    return assets.filter((asset) => {
      const haystack = [asset.title, asset.category, asset.note ?? "", ...asset.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [assets, query]);

  const selected = assets.find((a) => a.id === selectedId) ?? null;

  return (
    <div className="flex h-full overflow-hidden">
      <div className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="relative">
            <SearchIcon />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="이름, 태그로 검색 (예: loader, 로딩, dobi)"
              className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-10 text-sm text-ink outline-none focus:border-accent"
            />
            {query && <SearchClearButton onClick={() => setQuery("")} />}
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
