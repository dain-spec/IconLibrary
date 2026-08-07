"use client";

import { useMemo, useState } from "react";
import type { MotionAsset } from "@/lib/motion";
import { MotionCard } from "./MotionCard";
import { MotionDetailPanel } from "./MotionDetailPanel";
import { SearchClearButton } from "../SearchClearButton";
import { SearchIcon } from "../SearchIcon";

const CATEGORY_ORDER = ["Loader", "기본", "3d", "character"];

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

  const grouped = useMemo(() => {
    const order = [
      ...CATEGORY_ORDER,
      ...Array.from(new Set(filtered.map((asset) => asset.category))).filter(
        (category) => !CATEGORY_ORDER.includes(category)
      ),
    ];
    return order
      .map((category) => ({
        category,
        items: filtered.filter((asset) => asset.category === category),
      }))
      .filter((group) => group.items.length > 0);
  }, [filtered]);

  const selected = assets.find((a) => a.id === selectedId) ?? null;

  function handleTagClick(tag: string) {
    setQuery(tag);
  }

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
              className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-10 text-sm text-ink outline-none focus:border-[#333333]"
            />
            {query && <SearchClearButton onClick={() => setQuery("")} />}
          </div>

          {filtered.length === 0 ? (
            <p className="mt-16 text-center text-sm text-muted">
              검색 결과가 없습니다.
            </p>
          ) : (
            <div className="mt-6 flex flex-col gap-8">
              {grouped.map((group) => (
                <div key={group.category}>
                  <h3 className="mb-3 text-sm font-semibold text-ink">{group.category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {group.items.map((asset) => (
                      <MotionCard
                        key={asset.id}
                        asset={asset}
                        isSelected={asset.id === selectedId}
                        onClick={() => setSelectedId(asset.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selected && (
        <MotionDetailPanel
          asset={selected}
          onClose={() => setSelectedId(null)}
          onTagClick={handleTagClick}
        />
      )}
    </div>
  );
}
