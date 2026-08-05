"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string };
type NavEntry = { label: string; href: string } | { label: string; children: NavItem[] };

const NAV: NavEntry[] = [
  {
    label: "아이콘",
    children: [{ label: "멀티컬러", href: "/icon/multicolor" }],
  },
  {
    label: "모션",
    href: "/motion",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full w-52 shrink-0 flex-col gap-4 overflow-y-auto border-r border-border p-4">
      {NAV.map((entry) => {
        if ("children" in entry) {
          return (
            <div key={entry.label}>
              <p className="px-2 text-xs font-medium uppercase tracking-wide text-muted">
                {entry.label}
              </p>
              <div className="mt-1 flex flex-col gap-0.5">
                {entry.children.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-md px-2 py-1.5 text-sm transition-colors ${
                        active
                          ? "bg-accent text-white"
                          : "text-ink hover:bg-surface-hover"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        }

        const active = pathname === entry.href;
        return (
          <Link
            key={entry.href}
            href={entry.href}
            className={`rounded-md px-2 py-1.5 text-xs font-medium uppercase tracking-wide transition-colors ${
              active ? "text-accent" : "text-muted hover:text-ink"
            }`}
          >
            {entry.label}
          </Link>
        );
      })}
    </nav>
  );
}
