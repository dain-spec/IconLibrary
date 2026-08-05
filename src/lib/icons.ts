import fs from "node:fs";
import path from "node:path";
import { iconMeta, type IconMeta } from "@/data/icons";

export interface Icon extends IconMeta {
  svg: string;
}

const ICONS_DIR = path.join(process.cwd(), "public", "icons");

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
  const files = fs
    .readdirSync(ICONS_DIR)
    .filter((file) => file.endsWith(".svg"))
    .sort();

  return files.map((file) => {
    const id = file.replace(/\.svg$/, "");
    const svg = fs.readFileSync(path.join(ICONS_DIR, file), "utf-8");
    return { ...metaFor(id), svg };
  });
}

export function getIconById(id: string): Icon | undefined {
  return getAllIcons().find((icon) => icon.id === id);
}
