"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Motion", href: "/motion" },
  { label: "MultiColor Icon", href: "/icon/multicolor" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full w-52 shrink-0 flex-col gap-0.5 overflow-y-auto border-r border-border px-3 py-4">
      {NAV.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex h-7 items-center rounded-r-md pl-3 pr-3 text-sm transition-colors ${
              active
                ? "bg-accent/10 font-medium text-accent"
                : "text-ink hover:bg-surface-hover"
            }`}
          >
            {active && (
              <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 bg-accent" />
            )}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
