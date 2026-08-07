export function PanelResizeHandle({
  onPointerDown,
}: {
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      onPointerDown={onPointerDown}
      role="separator"
      aria-orientation="vertical"
      aria-label="패널 너비 조절"
      className="absolute left-0 top-0 z-10 h-full w-1.5 cursor-col-resize touch-none hover:bg-accent/40 active:bg-accent/40"
    />
  );
}
