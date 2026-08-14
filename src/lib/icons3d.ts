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
  // Individual Figma node IDs for the 문서/클립보드/서류함/폴더 sets,
  // from the "wrap" frame (353:176).
  "문서-뉴스": "2898:17795",
  "문서-세금": "2875:379",
  "문서-부가세": "2875:439",
  "문서-영수증": "2875:543",
  "문서-카드코인": "5207:14701",
  "문서-체크": "2875:429",
  "문서-할일": "3188:9325",
  "문서-할일 카드형": "5207:14399",
  "문서-메모": "5207:14429",
  "문서-가위": "2875:450",
  "문서-스캔": "3221:9324",
  "문서-계산기": "5207:14566",
  "문서-시간": "5207:14610",
  "클립보드-서명": "353:199",
  "클립보드-세금": "2875:338",
  "클립보드-기본": "2875:358",
  "클립보드-완료": "2939:9266",
  "클립보드-인증": "5207:14430",
  "클립보드-계산": "5207:14495",
  "클립보드-체크": "2875:368",
  "클립보드-오류": "7083:16564",
  "클립보드-할일": "2875:348",
  "클립보드-사용자": "2905:9117",
  "클립보드-사용자 성장": "2909:9127",
  "클립보드-사용자 나하고": "5207:14512",
  "클립보드-의료비": "6912:16376",
  "클립보드-카드코인": "5207:14725",
  "서류함-PDF": "2898:16644",
  "서류함-홈택스 PDF": "7235:18055",
  "서류함-기본": "5207:14646",
  "서류함-심볼": "3141:9305",
  "서류함-전자세금계산서": "3272:101",
  "폴더-기본": "5213:14901",
  "폴더-AI": "8095:18518",
  "폴더-완료": "7886:17779",
  "폴더-플러스": "3519:217",
  "폴더-검색": "2898:16623",
  "폴더-펜": "8095:18537",
  "폴더-사용자 검색": "5207:14761",
  "폴더-계산": "5207:14773",
  "폴더-나하고": "5207:14785",
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
