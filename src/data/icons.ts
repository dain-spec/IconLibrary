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
  {
    id: "ic_doc_tax_flat",
    category: "문서",
    tags: { ko: ["문서", "세금", "세무", "정산"], en: ["document", "tax"] },
    figmaNodeId: "15731:23806",
  },
  {
    id: "ic_doc_aicheck_flat",
    category: "문서",
    tags: { ko: ["문서", "AI", "검토", "확인"], en: ["document", "ai", "check"] },
  },
  {
    id: "ic_doc_search_flat",
    category: "문서",
    tags: { ko: ["문서", "검색", "조회"], en: ["document", "search"] },
    figmaNodeId: "15861:27193",
  },
  {
    id: "ic_doc_minus_flat",
    category: "문서",
    tags: { ko: ["문서", "삭제", "빼기", "제거"], en: ["document", "minus", "remove"] },
    figmaNodeId: "15861:27122",
  },
  {
    id: "ic_doc_percent_flat",
    category: "문서",
    tags: { ko: ["문서", "퍼센트", "비율", "할인"], en: ["document", "percent", "discount"] },
    figmaNodeId: "15928:25971",
  },
  {
    id: "ic_doc_checklist_flat",
    category: "문서",
    tags: { ko: ["문서", "체크리스트", "할일", "목록"], en: ["document", "checklist", "todo"] },
    figmaNodeId: "15928:26057",
  },
  {
    id: "ic_doc_set_flat",
    category: "문서",
    tags: { ko: ["문서", "설정", "세트"], en: ["document", "set", "settings"] },
    figmaNodeId: "12450:21376",
  },
  {
    id: "ic_doc_myset_flat",
    category: "문서",
    tags: { ko: ["문서", "설정", "내 설정"], en: ["document", "my set"] },
  },
  {
    id: "ic_doc_check_flat",
    category: "문서",
    tags: { ko: ["문서", "체크", "확인", "완료"], en: ["document", "check", "done"] },
    figmaNodeId: "15686:23770",
  },
  {
    id: "ic_doc_state_flat",
    category: "문서",
    tags: { ko: ["문서", "상태", "진행"], en: ["document", "state", "status"] },
    figmaNodeId: "15868:27390",
  },
  {
    id: "ic_emoji_smiling_face",
    category: "이모지",
    tags: { ko: ["이모지", "웃음", "행복", "얼굴"], en: ["emoji", "smile", "happy", "face"] },
    figmaNodeId: "5668:14783",
  },
  {
    id: "ic_emoji_slightly_face",
    category: "이모지",
    tags: { ko: ["이모지", "보통", "무표정", "얼굴"], en: ["emoji", "neutral", "face"] },
    figmaNodeId: "5668:14784",
  },
  {
    id: "ic_emoji_cry_face",
    category: "이모지",
    tags: { ko: ["이모지", "눈물", "슬픔", "얼굴"], en: ["emoji", "cry", "sad", "face"] },
    figmaNodeId: "5668:14785",
  },
  {
    id: "ic_emoji_sad_face",
    category: "이모지",
    tags: { ko: ["이모지", "슬픔", "속상", "얼굴"], en: ["emoji", "sad", "face"] },
    figmaNodeId: "7400:16175",
  },
  {
    id: "ic_emoji_heart_face",
    category: "이모지",
    tags: { ko: ["이모지", "사랑", "하트", "얼굴"], en: ["emoji", "love", "heart", "face"] },
    figmaNodeId: "7399:16212",
  },
  {
    id: "ic_card_flat",
    category: "금융",
    tags: { ko: ["카드", "신용카드", "결제"], en: ["card", "credit card", "payment"] },
    figmaNodeId: "15762:699",
  },
  {
    id: "ic_card_money_flat",
    category: "금융",
    tags: { ko: ["카드", "돈", "결제", "포인트"], en: ["card", "money", "payment"] },
    figmaNodeId: "16856:25073",
  },
  {
    id: "ic_receipt_flat",
    category: "금융",
    tags: { ko: ["영수증", "결제", "내역"], en: ["receipt", "payment"] },
    figmaNodeId: "3595:9667",
  },
  {
    id: "ic_passbook_arrow_flat",
    category: "금융",
    tags: { ko: ["통장", "입출금", "계좌"], en: ["passbook", "account", "bank"] },
    figmaNodeId: "11069:21255",
  },
  {
    id: "ic_insurance_flat",
    category: "금융",
    tags: { ko: ["보험", "보장"], en: ["insurance"] },
    figmaNodeId: "15869:27461",
  },
  {
    id: "ic_user_money_flat",
    category: "금융",
    tags: { ko: ["사용자", "돈", "급여", "정산"], en: ["user", "money", "payroll"] },
    figmaNodeId: "15869:27564",
  },
  {
    id: "ic_user_percent_flat",
    category: "금융",
    tags: { ko: ["사용자", "퍼센트", "비율"], en: ["user", "percent"] },
    figmaNodeId: "15885:25416",
  },
  {
    id: "ic_idcard_flat",
    category: "금융",
    tags: { ko: ["신분증", "아이디카드", "본인확인"], en: ["idcard", "identity"] },
    figmaNodeId: "11464:21490",
  },
  {
    id: "ic_goverment_flat",
    category: "금융",
    tags: { ko: ["정부", "관공서", "공공기관"], en: ["government", "public"] },
    figmaNodeId: "15860:26910",
  },
  {
    id: "ic_truck_flat",
    category: "물류",
    tags: { ko: ["트럭", "배송", "물류", "운송"], en: ["truck", "delivery", "logistics"] },
    figmaNodeId: "16801:25123",
  },
  {
    id: "ic_boxes_flat",
    category: "물류",
    tags: { ko: ["박스", "상자", "물류", "재고"], en: ["boxes", "inventory", "logistics"] },
    figmaNodeId: "15918:884",
  },
  {
    id: "ic_box_flat",
    category: "물류",
    tags: { ko: ["박스", "상자", "포장"], en: ["box", "package"] },
    figmaNodeId: "15926:758",
  },
  {
    id: "ic_factory_flat",
    category: "물류",
    tags: { ko: ["공장", "제조", "생산"], en: ["factory", "manufacturing"] },
    figmaNodeId: "15924:707",
  },
  {
    id: "ic_process_flat",
    category: "물류",
    tags: { ko: ["프로세스", "공정", "절차"], en: ["process", "workflow"] },
    figmaNodeId: "15874:719",
  },
  {
    id: "ic_pin_flat",
    category: "위치",
    tags: { ko: ["핀", "위치", "지도"], en: ["pin", "location", "map"] },
    figmaNodeId: "17194:25557",
  },
  {
    id: "ic_place_flat",
    category: "위치",
    tags: { ko: ["장소", "위치", "지도"], en: ["place", "location", "map"] },
    figmaNodeId: "17194:25548",
  },
  {
    id: "ic_dashboard_flat",
    category: "일반",
    tags: { ko: ["대시보드", "현황", "통계"], en: ["dashboard", "overview", "stats"] },
    figmaNodeId: "15926:23822",
  },
  {
    id: "ic_browser_flat",
    category: "일반",
    tags: { ko: ["브라우저", "웹", "인터넷"], en: ["browser", "web"] },
    figmaNodeId: "17155:28039",
  },
  {
    id: "ic_folder_flat",
    category: "일반",
    tags: { ko: ["폴더", "파일", "보관"], en: ["folder", "file"] },
    figmaNodeId: "3665:9656",
  },
  {
    id: "ic_guide_flat",
    category: "일반",
    tags: { ko: ["가이드", "안내", "도움말"], en: ["guide", "help"] },
    figmaNodeId: "16350:24520",
  },
  {
    id: "ic_graph_growth_flat",
    category: "일반",
    tags: { ko: ["그래프", "성장", "상승", "통계"], en: ["graph", "growth", "chart"] },
    figmaNodeId: "16817:1441",
  },
  {
    id: "ic_arrow_right_flat",
    category: "일반",
    tags: { ko: ["화살표", "다음", "이동"], en: ["arrow", "next"] },
    figmaNodeId: "17192:25385",
  },
  {
    id: "ic_cart_flat",
    category: "일반",
    tags: { ko: ["장바구니", "쇼핑", "구매"], en: ["cart", "shopping"] },
    figmaNodeId: "17101:26761",
  },
  {
    id: "ic_contract_flat",
    category: "문서",
    tags: { ko: ["문서", "계약", "계약서"], en: ["document", "contract"] },
    figmaNodeId: "16333:2876",
  },
  {
    id: "ic_doc_play_flat",
    category: "문서",
    tags: { ko: ["문서", "재생", "동영상"], en: ["document", "play", "video"] },
    figmaNodeId: "16350:24813",
  },
  {
    id: "ic_goverment_money_flat",
    category: "금융",
    tags: { ko: ["정부", "관공서", "돈", "세금"], en: ["government", "money", "tax"] },
    figmaNodeId: "16085:24361",
  },
  {
    id: "ic_money_flat",
    category: "금융",
    tags: { ko: ["돈", "원", "화폐"], en: ["money", "currency"] },
    figmaNodeId: "3597:9605",
  },
  {
    id: "ic_map_flat",
    category: "위치",
    tags: { ko: ["지도", "위치"], en: ["map", "location"] },
    figmaNodeId: "17194:25503",
  },
  {
    id: "ic_map_pin_flat",
    category: "위치",
    tags: { ko: ["지도", "핀", "위치"], en: ["map", "pin", "location"] },
    figmaNodeId: "17194:25520",
  },
  {
    id: "ic_calcu_flat",
    category: "일반",
    tags: { ko: ["계산기", "계산"], en: ["calculator", "calc"] },
    figmaNodeId: "3597:9554",
  },
  {
    id: "ic_embedding_flat",
    category: "일반",
    tags: { ko: ["임베딩", "연결"], en: ["embedding", "connect"] },
    figmaNodeId: "16676:24982",
  },
  {
    id: "ic_graph_flat",
    category: "일반",
    tags: { ko: ["그래프", "통계", "차트"], en: ["graph", "chart", "stats"] },
  },
  {
    id: "ic_pc_down_flat",
    category: "일반",
    tags: { ko: ["PC", "다운로드", "컴퓨터"], en: ["pc", "download", "computer"] },
    figmaNodeId: "16350:24703",
  },
  {
    id: "ic_pc_remote_flat",
    category: "일반",
    tags: { ko: ["PC", "원격", "컴퓨터"], en: ["pc", "remote", "computer"] },
    figmaNodeId: "16350:24629",
  },
  {
    id: "ic_play_flat",
    category: "일반",
    tags: { ko: ["재생", "플레이"], en: ["play"] },
    figmaNodeId: "16350:24883",
  },
  {
    id: "ic_set_flat",
    category: "일반",
    tags: { ko: ["설정", "세팅"], en: ["set", "settings"] },
    figmaNodeId: "7813:16307",
  },
  {
    id: "ic_shop_bag_flat",
    category: "일반",
    tags: { ko: ["쇼핑백", "구매", "쇼핑"], en: ["shop", "bag", "shopping"] },
    figmaNodeId: "17148:3020",
  },
  {
    id: "ic_siren_flat",
    category: "일반",
    tags: { ko: ["사이렌", "경보", "알림"], en: ["siren", "alert"] },
    figmaNodeId: "17190:25279",
  },
];

export function figmaLinkFor(nodeId: string): string {
  return `https://www.figma.com/design/${FIGMA_FILE_KEY}?node-id=${nodeId.replace(":", "-")}`;
}
