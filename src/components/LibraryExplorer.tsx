"use client";

import { useMemo, useState } from "react";
import type { Icon } from "@/lib/icons";
import { IconCard } from "./IconCard";
import { IconDetailPanel } from "./IconDetailPanel";
import { SearchClearButton } from "./SearchClearButton";
import { SearchIcon } from "./SearchIcon";

export function LibraryExplorer({ icons }: { icons: Icon[] }) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return icons;
    return icons.filter((icon) => {
      const haystack = [icon.id, icon.category, ...icon.tags.ko, ...icon.tags.en]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [icons, query]);

  const selected = icons.find((icon) => icon.id === selectedId) ?? null;

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
              placeholder="이름, 태그로 검색 (예: 문서, money, list)"
              className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-10 text-sm text-ink outline-none focus:border-[#333333]"
            />
            {query && <SearchClearButton onClick={() => setQuery("")} />}
          </div>

          {filtered.length === 0 ? (
            <p className="mt-16 text-center text-sm text-muted">
              검색 결과가 없습니다.
            </p>
          ) : (
            <div className="mt-6 flex flex-wrap gap-3">
              {filtered.map((icon) => (
                <IconCard
                  key={icon.id}
                  icon={icon}
                  isSelected={icon.id === selectedId}
                  onClick={() => setSelectedId(icon.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {selected && (
        <IconDetailPanel
          icon={selected}
          onClose={() => setSelectedId(null)}
          onTagClick={handleTagClick}
        />
      )}
    </div>
  );
}
