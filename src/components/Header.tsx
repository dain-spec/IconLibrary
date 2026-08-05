export function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="#2563EB" />
        <rect x="7" y="7" width="8" height="8" rx="2" fill="white" />
        <rect x="17" y="7" width="8" height="8" rx="2" fill="white" fillOpacity="0.75" />
        <rect x="7" y="17" width="8" height="8" rx="2" fill="white" fillOpacity="0.75" />
        <rect x="17" y="17" width="8" height="8" rx="2" fill="white" />
      </svg>
      <span className="text-sm font-semibold text-ink">Icon Library</span>
    </header>
  );
}
