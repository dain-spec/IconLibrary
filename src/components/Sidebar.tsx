"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string };
type NavEntry = { label: string; href: string } | { label: string; children: NavItem[] };

const NAV: NavEntry[] = [
  {
    label: "Motion",
    href: "/motion",
  },
  {
    label: "Icon",
    children: [{ label: "Multicolor", href: "/icon/multicolor" }],
  },
];

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`flex h-7 items-center rounded-r-md text-sm transition-colors ${
        active
          ? "border-l-2 border-accent bg-accent/10 pl-[10px] pr-3 font-medium text-accent"
          : "border-l-2 border-transparent pl-[10px] pr-3 text-ink hover:bg-surface-hover"
      }`}
    >
      {label}
    </Link>
  );
}

function NavGroup({ label, children }: { label: string; children: NavItem[] }) {
  const pathname = usePathname();

  return (
    <div>
      <div className="flex h-7 items-center pl-2 pr-3 text-sm font-medium text-ink">
        {label}
      </div>
      <div className="ml-4 mt-0.5 flex flex-col gap-0.5">
        {children.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            active={pathname === item.href}
          />
        ))}
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full w-52 shrink-0 flex-col gap-0.5 overflow-y-auto border-r border-border px-3 py-4">
      {NAV.map((entry) =>
        "children" in entry ? (
          <NavGroup key={entry.label} label={entry.label} children={entry.children} />
        ) : (
          <NavLink key={entry.href} href={entry.href} label={entry.label} active={pathname === entry.href} />
        )
      )}
    </nav>
  );
}
