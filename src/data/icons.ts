export type IconStyle = "multicolor" | "monochrome";

export interface IconMeta {
  id: string;
  category: string;
  tags: {
    ko: string[];
    en: string[];
  };
  figmaNodeId?: string;
}

export const FIGMA_FILE_KEY = "R6ZgOUWOgCZEgu38S8mhJl";

export const iconMeta: IconMeta[] = [
  {
    id: "ic_sign_flat",
    category: "서비스",
    tags: { ko: ["전자결재", "결재", "사인"], en: ["signature", "approval"] },
    figmaNodeId: "10897:2168",
  },
  {
    id: "ic_msg_flat",
    category: "서비스",
    tags: { ko: ["메시지", "쪽지"], en: ["message"] },
    figmaNodeId: "3598:9646",
  },
  {
    id: "ic_mail_flat",
    category: "서비스",
    tags: { ko: ["메일", "이메일"], en: ["mail", "email"] },
    figmaNodeId: "3535:9585",
  },
  {
    id: "ic_drive_flat",
    category: "서비스",
    tags: { ko: ["드라이브", "저장소", "파일"], en: ["drive", "storage"] },
    figmaNodeId: "10897:1945",
  },
  {
    id: "ic_board_flat",
    category: "서비스",
    tags: { ko: ["게시판"], en: ["board"] },
    figmaNodeId: "10897:2195",
  },
  {
    id: "ic_chat_flat",
    category: "서비스",
    tags: { ko: ["대화", "채팅"], en: ["chat", "talk"] },
    figmaNodeId: "6521:15554",
  },
  {
    id: "ic_alphamention_flat",
    category: "서비스",
    tags: { ko: ["멘션", "알림"], en: ["mention"] },
    figmaNodeId: "3531:9592",
  },
];

export function figmaLinkFor(nodeId: string): string {
  return `https://www.figma.com/design/${FIGMA_FILE_KEY}?node-id=${nodeId.replace(":", "-")}`;
}
