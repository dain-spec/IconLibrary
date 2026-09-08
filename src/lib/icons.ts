import fs from "node:fs";
import path from "node:path";
import { iconMeta, type IconMeta } from "@/data/icons";

export interface Icon extends IconMeta {
  svg: string;
  src: string;
}

const ICONS_DIR = path.join(process.cwd(), "public", "icons", "multicolor");

function metaFor(id: string): IconMeta {
  return (
    iconMeta.find((m) => m.id === id) ?? {
      id,
      category: "미분류",
      tags: { ko: [], en: [] },
    }
  );
}

export function getAllIcons(): Icon[] {
  const files = fs.readdirSync(ICONS_DIR).filter((file) => file.endsWith(".svg"));
  const fileSet = new Set(files);
  const seen = new Set<string>();

  const readIcon = (file: string): Icon => {
    const id = file.replace(/\.svg$/, "");
    const svg = fs.readFileSync(path.join(ICONS_DIR, file), "utf-8");
    return { ...metaFor(id), svg, src: `/icons/multicolor/${file}` };
  };

  // Ordered per iconMeta (which mirrors the Figma frame order); any file not
  // yet catalogued in iconMeta is appended afterward, alphabetically.
  const ordered = iconMeta
    .map((meta) => `${meta.id}.svg`)
    .filter((file) => fileSet.has(file))
    .map((file) => {
      seen.add(file);
      return readIcon(file);
    });

  const leftovers = files.filter((file) => !seen.has(file)).sort().map(readIcon);

  return [...ordered, ...leftovers];
}

export function getIconById(id: string): Icon | undefined {
  return getAllIcons().find((icon) => icon.id === id);
}
