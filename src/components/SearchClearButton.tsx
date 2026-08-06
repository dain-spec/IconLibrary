export function SearchClearButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="검색어 지우기"
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-ink"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="9" fill="currentColor" />
        <path d="M6 6L12 12M12 6L6 12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}
