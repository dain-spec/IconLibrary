"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "아이콘" },
  { href: "/motion", label: "모션" },
];

export function NavTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex h-12 shrink-0 items-center gap-1 border-b border-border px-6">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
              active ? "bg-accent text-white" : "text-muted hover:text-ink"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
