import fs from "node:fs";
import path from "node:path";

export interface Icon3D {
  id: string;
  title: string;
  category: string;
  src: string;
  tags: string[];
}

const ICONS_3D_DIR = path.join(process.cwd(), "public", "icons", "3d");
const IMAGE_EXTENSION = /\.(png|webp|jpe?g)$/i;

export function getAllIcons3D(): Icon3D[] {
  const categories = fs
    .readdirSync(ICONS_3D_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  return categories.flatMap((category) => {
    const files = fs
      .readdirSync(path.join(ICONS_3D_DIR, category))
      .filter((file) => IMAGE_EXTENSION.test(file))
      .sort();

    return files.map((file) => {
      const title = file.replace(IMAGE_EXTENSION, "");
      return {
        id: `${category}-${title}`,
        title,
        category,
        src: `/icons/3d/${category}/${encodeURIComponent(file)}`,
        tags: [category, ...title.split("+")],
      };
    });
  });
}
