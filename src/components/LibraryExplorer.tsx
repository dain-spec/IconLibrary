"use client";

import { useMemo, useState } from "react";
import type { Icon } from "@/lib/icons";
import { IconCard } from "./IconCard";
import { IconDetailPanel } from "./IconDetailPanel";

export function LibraryExplorer({ icons }: { icons: Icon[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("전체");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const categories = useMemo(
    () => ["전체", ...Array.from(new Set(icons.map((icon) => icon.category)))],
    [icons]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return icons.filter((icon) => {
      const matchesCategory = category === "전체" || icon.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = [icon.id, icon.category, ...icon.tags.ko, ...icon.tags.en]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [icons, query, category]);

  const selected = icons.find((icon) => icon.id === selectedId) ?? null;

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <h1 className="text-2xl font-semibold text-ink">Icon Library</h1>
          <p className="mt-1 text-sm text-muted">
            {icons.length}개의 아이콘을 검색하고 코드를 복사하세요.
          </p>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="이름, 태그로 검색 (예: 문서, money, list)"
            className="mt-6 w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
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
        <IconDetailPanel icon={selected} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}
