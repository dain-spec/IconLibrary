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
  // Individual Figma node IDs for the 교육 set, from the "wrap" frame (2898:16431).
  "교육-책": "2898:16433",
  "교육-펼친 책": "2898:16556",
  "교육-책과 연필": "3141:9315",
  "교육-가이드": "2898:16633",
  "교육-책들": "2898:16575",
  "교육-학사모와 책": "5207:14726",
  "교육-학사모": "5207:14739",
  // Individual Figma node IDs for the 교육 book-badge set, from the "wrap" frame (8064:18350).
  "교육-계산기": "8064:18431",
  "교육-설정": "8064:18440",
  "교육-코인": "8095:18407",
  "교육-회사": "8095:18417",
  // Individual Figma node IDs for the 클립보드 badge set, from the "wrap" frame (8095:18420).
  "클립보드-계산기": "8095:18469",
  "클립보드-설정": "8095:18499",
  "클립보드-코인": "8095:18478",
  "클립보드-회사": "8095:18489",
  // Individual Figma node IDs for the 기호 set, from the "wrap" frame (5215:15070).
  "기호-체크 그린": "1469:2072",
  "기호-체크": "1469:2062",
  "기호-삭제": "1461:2237",
  "기호-물음표": "1461:2225",
  "기호-링크": "1490:50",
  "기호-느낌표 보류": "5215:14986",
  "기호-느낌표": "1461:2227",
  // Individual Figma node IDs for the 그래프 set, from the "wrap" frame (2898:17404).
  "그래프-도넛 그래프": "2898:17340",
  "그래프-막대 그래프": "2898:17380",
  "그래프-막대 그래프 화살표": "2898:17382",
  "그래프-브라우저 그래프": "2898:17392",
  // Individual Figma node IDs for the 브라우저/기기 sets, from the "wrap" frame (2933:9218).
  "브라우저-검색": "4406:11454",
  "브라우저-유튜브": "4410:11261",
  "브라우저-전자세금계산서": "7503:19996",
  "브라우저-홈택스 인증": "5215:15831",
  "브라우저-시스템공지": "6936:173",
  "브라우저-Smart A 2.0": "7434:17638",
  "기기-휴대폰": "2898:17900",
  "기기-문자": "5215:15855",
  "기기-PC": "2898:17543",
  "기기-PC 프로젝트": "5215:15879",
  "기기-노트북": "2898:17732",
  "기기-마이크": "4410:11282",
  "기기-팩스": "5215:15923",
  // Individual Figma node IDs for the 일반 set, from the "wrap" frame (5215:15924).
  "일반-설정": "2898:18004",
  "일반-잠금": "2898:17753",
  "일반-잠금해제": "2898:17763",
  "일반-보안": "2898:18024",
  "일반-보안 비밀번호": "2898:18034",
  "일반-공지": "2898:17837",
  "일반-알람": "2898:17221",
  "일반-알람 효과": "3120:102",
  "일반-재생": "2898:17952",
  "일반-플레이어": "2898:17962",
  "일반-펜": "2898:17879",
  "일반-연필": "2898:17889",
  "일반-검색": "2898:17983",
  "일반-멘션": "2898:17243",
  "일반-전송": "2898:17993",
  // Individual Figma node IDs for the 사용자 set, from the "wrap" frame (5215:15931).
  "사용자-사용자": "2898:18066",
  "사용자-사용자 2명": "2898:18076",
  "사용자-사용자 추가": "2898:18086",
  "사용자-신분증": "2898:17711",
  "사용자-신분증 조회": "5215:15968",
  "사용자-사원증": "2898:17721",
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
