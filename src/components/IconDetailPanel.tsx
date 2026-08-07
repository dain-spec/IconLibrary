"use client";

import { useEffect, useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Icon } from "@/lib/icons";
import { figmaLinkFor } from "@/data/icons";
import { dedupeTagsCaseInsensitive } from "@/lib/tags";
import { useResizablePanelWidth } from "@/lib/useResizablePanelWidth";
import { CopyButton } from "./CopyButton";
import { PanelResizeHandle } from "./PanelResizeHandle";
import { ZoomHoverPreview } from "./ZoomHoverPreview";

SyntaxHighlighter.registerLanguage("markup", markup);

const CODE_COLORS = {
  red: "hsl(5, 74%, 59%)",
  purple: "hsl(301, 63%, 40%)",
  blue: "hsl(221, 87%, 60%)",
  orange: "hsl(35, 99%, 36%)",
  string: "hsl(230, 8%, 24%)",
};

// SVG tag names (svg/g/path…) read as purple and string values as black,
// matching the reference design; oneLight otherwise ships tags red and
// strings green.
const svgTheme = {
  ...oneLight,
  tag: { color: CODE_COLORS.purple },
  string: { color: CODE_COLORS.string },
  "attr-value": { color: CODE_COLORS.string },
};

type Tab = "react" | "figma";

const TABS: { key: Tab; label: string }[] = [
  { key: "react", label: "React" },
  { key: "figma", label: "Figma" },
];

function toComponentName(id: string) {
  const segments = id.split("_").map((s) => (s === "ic" ? "icon" : s));
  return segments.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
}

// Sets the root <svg> id so pasting into Figma names the resulting
// top-level Frame after the icon's file name instead of "Frame".
function withFigmaLayerName(svg: string, name: string) {
  return svg.replace(/^<svg /, `<svg id="${name}" `);
}

function CodeBlock({
  content,
  copyText,
  href,
}: {
  content: string;
  copyText?: string;
  href?: string;
}) {
  return (
    <div className="relative">
      <SyntaxHighlighter
        language="markup"
        style={svgTheme}
        customStyle={{
          margin: 0,
          maxHeight: "11.25rem",
          overflow: "auto",
          borderRadius: "0.5rem",
          border: "1px solid #ededed",
          paddingTop: "0.75rem",
          paddingLeft: "0.75rem",
          paddingRight: "0.75rem",
          paddingBottom: "0.75rem",
          fontSize: "0.875rem",
          lineHeight: "1.5",
          background: "#ffffff",
        }}
        codeTagProps={{ style: { whiteSpace: "pre" } }}
      >
        {content}
      </SyntaxHighlighter>
      <div className="absolute right-2 top-2 flex gap-1 rounded-md bg-white/80 p-0.5 shadow-sm">
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title="Figma에서 열기"
            className="rounded-md p-1 text-muted transition-colors hover:bg-surface hover:text-ink"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 3h6v6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
        <CopyButton text={copyText ?? content} variant="icon" />
      </div>
    </div>
  );
}

// Hand-colored instead of run through Prism: the two-line template is fixed
// shape, and Prism's jsx grammar never tokenizes the plain import specifier
// as a class name, so it can't reproduce the reference design's blue on its own.
function ReactCodeBlock({ componentName, iconId }: { componentName: string; iconId: string }) {
  const copyText = `import { ${componentName} } from "@/components/icon"\n\n<${componentName} name="${iconId}" />`;
  return (
    <div className="relative">
      <pre
        className="m-0 overflow-x-auto whitespace-pre rounded-lg p-3 font-mono text-sm"
        style={{ background: "#ffffff", border: "1px solid #ededed", lineHeight: "1.5" }}
      >
        <span style={{ color: CODE_COLORS.red }}>import</span>
        {" { "}
        <span style={{ color: CODE_COLORS.blue }}>{componentName}</span>
        {" } "}
        <span style={{ color: CODE_COLORS.red }}>from</span>{" "}
        <span style={{ color: CODE_COLORS.string }}>&quot;@/components/icon&quot;</span>
        {"\n\n"}
        {"<"}
        <span style={{ color: CODE_COLORS.blue }}>{componentName}</span>{" "}
        <span style={{ color: CODE_COLORS.orange }}>name</span>=
        <span style={{ color: CODE_COLORS.string }}>&quot;{iconId}&quot;</span>{" "}
        {"/>"}
      </pre>
      <div className="absolute right-2 top-2 flex gap-1 rounded-md bg-white/80 p-0.5 shadow-sm">
        <CopyButton text={copyText} variant="icon" />
      </div>
    </div>
  );
}

export function IconDetailPanel({
  icon,
  onClose,
  onTagClick,
}: {
  icon: Icon;
  onClose: () => void;
  onTagClick: (tag: string) => void;
}) {
  const [tab, setTab] = useState<Tab>("react");
  const [visible, setVisible] = useState(false);
  const { width, isDragging, onPointerDown } = useResizablePanelWidth();

  useEffect(() => {
    setVisible(true);
  }, []);

  const componentName = toComponentName(icon.id);
  const figmaLink = icon.figmaNodeId ? figmaLinkFor(icon.figmaNodeId) : "";

  return (
    <div
      className={`relative h-full shrink-0 overflow-hidden border-l border-border bg-surface ${
        isDragging ? "" : "transition-[width] duration-300 ease-out"
      }`}
      style={{ width: visible ? `${width}px` : "0px" }}
    >
      <PanelResizeHandle onPointerDown={onPointerDown} />
      <div className="relative h-full overflow-y-auto p-6" style={{ width: `${width}px` }}>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted hover:text-ink"
          aria-label="닫기"
        >
          ✕
        </button>

        <div className="flex items-center gap-1.5 pr-8">
          <h2 className="text-xl font-bold text-ink">{icon.id}</h2>
          <CopyButton text={icon.id} variant="icon" />
        </div>

        {(icon.tags.ko.length > 0 || icon.tags.en.length > 0) && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {dedupeTagsCaseInsensitive([...icon.tags.ko, ...icon.tags.en]).map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick(tag)}
                className="rounded-full border border-border px-2 py-0.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <ZoomHoverPreview
          large={
            <span
              className="h-80 w-80 [&_svg]:h-80 [&_svg]:w-80"
              dangerouslySetInnerHTML={{ __html: icon.svg }}
            />
          }
        >
          <div className="mt-5 flex items-center justify-center rounded-xl bg-surface-hover p-10">
            <span
              className="h-12 w-12 [&_svg]:h-12 [&_svg]:w-12"
              dangerouslySetInnerHTML={{ __html: icon.svg }}
            />
          </div>
        </ZoomHoverPreview>

        <a
          href={icon.src}
          download={`${icon.id}.svg`}
          className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-ink transition-colors hover:bg-surface-hover"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {icon.id}.svg 다운로드
        </a>

        <div className="mt-5 flex gap-1 border-b border-border">
          {TABS.filter((t) => t.key !== "figma" || figmaLink).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-2 text-sm ${
                tab === t.key
                  ? "border-b-2 border-accent text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "react" ? (
          <div className="mt-3 flex flex-col gap-4">
            <div>
              <p className="mb-1.5 font-mono text-sm font-semibold text-ink">
                {componentName}
              </p>
              <ReactCodeBlock componentName={componentName} iconId={icon.id} />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted">SVG</p>
              <CodeBlock content={icon.svg} />
            </div>
          </div>
        ) : (
          <div className="mt-3 flex flex-col gap-4">
            <a
              href={figmaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-ink transition-colors hover:bg-surface-hover"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 3h6v6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Figma에서 열기
            </a>
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted">SVG</p>
              <CodeBlock content={withFigmaLayerName(icon.svg, icon.id)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
