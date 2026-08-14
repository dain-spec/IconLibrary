import fs from "node:fs";
import path from "node:path";

export interface Icon3D {
  id: string;
  title: string;
  category: string;
  src: string;
  tags: string[];
  figmaNodeId?: string;
}

const ICONS_3D_DIR = path.join(process.cwd(), "public", "icons", "3d");
const IMAGE_EXTENSION = /\.(png|webp|jpe?g)$/i;

// Individual Figma node IDs per weather icon, from the "날씨" frame (5201:14485).
const FIGMA_NODE_IDS: Record<string, string> = {
  "weather-구름조금": "5201:14643",
  "weather-맑음": "5201:14846",
  "weather-기본": "5201:14641",
  "weather-흐림": "5201:14689",
  "weather-소나기": "5201:14712",
  "weather-비": "5201:14774",
  "weather-비+번개": "5201:14776",
  "weather-번개": "5201:14788",
  "weather-눈": "5201:14800",
  "weather-영하": "5201:14812",
  // Individual Figma node IDs per arrow icon, from the "화살표" frame (2875:511).
  "arrow-얇게": "1461:1993",
  "arrow-둥글게": "1461:2046",
  "arrow-기본": "1461:2056",
  "arrow-상승": "1461:2066",
  "arrow-순환 2개": "1469:2103",
  "arrow-순환": "1469:2105",
  "arrow-되돌리기": "1469:2117",
  "arrow-새로고침": "2875:513",
  "arrow-세금": "5234:14512",
  "arrow-다운로드": "2898:17564",
  "arrow-다운로드 얇게": "2898:17585",
};

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
      const id = `${category}-${title}`;
      return {
        id,
        title,
        category,
        src: `/icons/3d/${category}/${encodeURIComponent(file)}`,
        tags: [category, ...title.split("+")],
        // macOS stores these Korean filenames as NFD (decomposed jamo), but
        // the map keys above are typed as NFC — normalize before lookup.
        figmaNodeId: FIGMA_NODE_IDS[id.normalize("NFC")],
      };
    });
  });
}
