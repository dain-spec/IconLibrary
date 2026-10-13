import fs from "node:fs";
import path from "node:path";
import { withBase } from "@/lib/basePath";

export interface MotionAsset {
  id: string;
  type: "json" | "image" | "lottie";
  title: string;
  src: string;
  thumb?: string;
  category: string;
  tags: string[];
  note?: string;
}

interface RawMotionAsset {
  id: string;
  type: "json" | "image" | "lottie";
  title: string;
  path: string;
  tags: string[];
  note?: string;
}

const MOTION_DIR = path.join(process.cwd(), "public", "motion");
const INDEX_PATH = path.join(MOTION_DIR, "index.json");

function toPublicSrc(rawPath: string): string {
  return withBase(rawPath.replace(/^\.\/assets\//, "/motion/"));
}

function categoryFor(rawPath: string): string {
  const match = rawPath.match(/^\.\/assets\/([^/]+)\//);
  return match ? match[1] : "기타";
}

export function getAllMotionAssets(): MotionAsset[] {
  const raw = fs.readFileSync(INDEX_PATH, "utf-8");
  const parsed = JSON.parse(raw) as { assets: RawMotionAsset[] };

  return parsed.assets.map((asset) => ({
    id: asset.id,
    type: asset.type,
    title: asset.title,
    src: toPublicSrc(asset.path),
    thumb: fs.existsSync(path.join(MOTION_DIR, "thumbs", `${asset.id}.webp`))
      ? withBase(`/motion/thumbs/${asset.id}.webp`)
      : undefined,
    category: categoryFor(asset.path),
    tags: asset.tags,
    note: asset.note,
  }));
}
