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
            className={`flex h-7 items-center rounded-r-md text-sm transition-colors ${
              active
                ? "border-l-2 border-accent bg-accent/10 pl-[10px] pr-3 font-medium text-accent"
                : "border-l-2 border-transparent pl-[10px] pr-3 text-ink hover:bg-surface-hover"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
