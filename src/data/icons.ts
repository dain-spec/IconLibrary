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
    id: "ic_doc_money_flat",
    category: "문서",
    tags: {
      ko: ["문서", "정산", "비용", "돈", "원"],
      en: ["document", "money", "finance", "invoice"],
    },
    figmaNodeId: "14946:24831",
  },
  {
    id: "ic_doc_list_flat",
    category: "문서",
    tags: {
      ko: ["문서", "목록", "리스트", "체크리스트"],
      en: ["document", "list", "checklist"],
    },
    figmaNodeId: "3765:9763",
  },
];

export function figmaLinkFor(nodeId: string): string {
  return `https://www.figma.com/design/${FIGMA_FILE_KEY}?node-id=${nodeId.replace(":", "-")}`;
}
