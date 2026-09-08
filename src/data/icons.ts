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
];

export function figmaLinkFor(nodeId: string): string {
  return `https://www.figma.com/design/${FIGMA_FILE_KEY}?node-id=${nodeId.replace(":", "-")}`;
}
