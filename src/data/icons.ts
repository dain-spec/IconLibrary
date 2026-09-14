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
  {
    id: "ic_contract_flat",
    category: "서비스",
    tags: { ko: ["전자계약", "계약", "계약서"], en: ["contract", "e-contract"] },
    figmaNodeId: "16333:2876",
  },
  {
    id: "ic_mindmap_flat",
    category: "서비스",
    tags: { ko: ["마인드맵"], en: ["mindmap"] },
    figmaNodeId: "12089:21106",
  },
  {
    id: "ic_vote_flat",
    category: "서비스",
    tags: { ko: ["투표"], en: ["vote"] },
    figmaNodeId: "12089:21162",
  },
  {
    id: "ic_camera_flat",
    category: "서비스",
    tags: { ko: ["카메라", "사진"], en: ["camera", "photo"] },
    figmaNodeId: "18664:37413",
  },
  {
    id: "ic_video_flat",
    category: "서비스",
    tags: { ko: ["화상회의", "영상통화"], en: ["video conference", "video call"] },
    figmaNodeId: "10863:1905",
  },
  {
    id: "ic_calender_flat",
    category: "서비스",
    tags: { ko: ["일정", "캘린더"], en: ["calendar", "schedule"] },
    figmaNodeId: "10897:2024",
  },
  {
    id: "ic_note_flat",
    category: "서비스",
    tags: { ko: ["노트", "메모"], en: ["note"] },
    figmaNodeId: "12089:21333",
  },
  {
    id: "ic_address_flat",
    category: "서비스",
    tags: { ko: ["연락처", "주소록"], en: ["contact", "address book"] },
    figmaNodeId: "10897:2067",
  },
  {
    id: "ic_todo_flat",
    category: "서비스",
    tags: { ko: ["할일", "체크리스트"], en: ["todo", "task"] },
    figmaNodeId: "10897:2100",
  },
  {
    id: "ic_tree_flat",
    category: "서비스",
    tags: { ko: ["조직도"], en: ["org chart", "tree"] },
    figmaNodeId: "18788:26971",
  },
  {
    id: "ic_tax_flat",
    category: "서비스",
    tags: { ko: ["세금계산서", "세금"], en: ["tax invoice", "tax"] },
    figmaNodeId: "18110:25663",
  },
  {
    id: "ic_smart_a_10_flat",
    category: "서비스",
    tags: { ko: ["SmartA10"], en: ["SmartA10"] },
    figmaNodeId: "18359:30734",
  },
  {
    id: "ic_career_flat",
    category: "서비스",
    tags: { ko: ["위하고 커리어", "커리어"], en: ["career"] },
    figmaNodeId: "18788:26546",
  },
  {
    id: "ic_translate_flat",
    category: "서비스",
    tags: { ko: ["번역"], en: ["translate"] },
    figmaNodeId: "11469:21613",
  },
  {
    id: "ic_translate_video_flat",
    category: "서비스",
    tags: { ko: ["영상통역", "통역"], en: ["video translation", "interpretation"] },
    figmaNodeId: "18788:26594",
  },
  {
    id: "ic_cloud_flat",
    category: "서비스",
    tags: { ko: ["클라우드"], en: ["cloud"] },
    figmaNodeId: "18788:26636",
  },
  {
    id: "ic_project_management_flat",
    category: "서비스",
    tags: { ko: ["PMS", "프로젝트관리"], en: ["project management"] },
    figmaNodeId: "18788:26686",
  },
  {
    id: "ic_user_management_flat",
    category: "서비스",
    tags: { ko: ["crm", "고객관리"], en: ["crm"] },
    figmaNodeId: "18788:26768",
  },
  {
    id: "ic_cellphone_msg_flat",
    category: "서비스",
    tags: { ko: ["휴대폰", "문자"], en: ["cellphone", "sms"] },
    figmaNodeId: "18788:26824",
  },
  {
    id: "ic_print_flat",
    category: "서비스",
    tags: { ko: ["프린트", "팩스", "인쇄"], en: ["print", "fax"] },
    figmaNodeId: "6886:16278",
  },
  {
    id: "ic_idtime_flat",
    category: "서비스",
    tags: { ko: ["근무시간", "출퇴근"], en: ["work hours", "attendance"] },
    figmaNodeId: "18788:26861",
  },
  {
    id: "ic_pc_edu_flat",
    category: "서비스",
    tags: { ko: ["법정교육", "교육"], en: ["education", "training"] },
    figmaNodeId: "18788:26456",
  },
  {
    id: "ic_noti_flat",
    category: "서비스",
    tags: { ko: ["공지", "알림"], en: ["notice", "announcement"] },
    figmaNodeId: "18794:27035",
  },
  {
    id: "ic_receipt_flat",
    category: "서비스",
    tags: { ko: ["영수증", "경비청구"], en: ["receipt", "expense"] },
    figmaNodeId: "3595:9667",
  },
  {
    id: "ic_calculate_flat",
    category: "서비스",
    tags: { ko: ["계산기", "연말정산"], en: ["calculator", "year-end tax"] },
    figmaNodeId: "3597:9554",
  },
  {
    id: "ic_company_setting_flat",
    category: "서비스",
    tags: { ko: ["수임처관리", "거래처"], en: ["company management"] },
    figmaNodeId: "18794:27267",
  },
  {
    id: "ic_individual_flat",
    category: "서비스",
    tags: { ko: ["개인조정", "개인세무조정"], en: ["individual tax adjustment"] },
    figmaNodeId: "18794:27587",
  },
  {
    id: "ic_logistics_flat",
    category: "서비스",
    tags: { ko: ["물류관리", "물류"], en: ["logistics management"] },
    figmaNodeId: "18794:27605",
  },
  {
    id: "ic_human_flat",
    category: "서비스",
    tags: { ko: ["급여관리", "급여", "인사"], en: ["payroll management", "hr"] },
    figmaNodeId: "18794:27625",
  },
  {
    id: "ic_corporate_flat",
    category: "서비스",
    tags: { ko: ["법인조정", "법인세무조정"], en: ["corporate tax adjustment"] },
    figmaNodeId: "18794:27588",
  },
  {
    id: "ic_accounting_flat",
    category: "서비스",
    tags: { ko: ["회계관리", "회계"], en: ["accounting management"] },
    figmaNodeId: "18794:27643",
  },
  {
    id: "ic_doc_flat",
    category: "문서",
    tags: { ko: ["문서", "기본"], en: ["document"] },
    figmaNodeId: "18557:26385",
  },
  {
    id: "ic_doc_quick_flat",
    category: "문서",
    tags: { ko: ["빠른문서", "문서", "속도"], en: ["document", "quick"] },
    figmaNodeId: "18690:26931",
  },
  {
    id: "ic_doc_myset_flat",
    category: "문서",
    tags: { ko: ["내설정", "문서", "설정"], en: ["document", "my settings"] },
    figmaNodeId: "17337:27909",
  },
  {
    id: "ic_doc_minus_flat",
    category: "문서",
    tags: { ko: ["문서삭제", "문서", "삭제", "제거"], en: ["document", "remove"] },
    figmaNodeId: "15861:27122",
  },
  {
    id: "ic_doc_check_flat",
    category: "문서",
    tags: { ko: ["체크목록", "문서", "체크"], en: ["document", "checklist"] },
    figmaNodeId: "18710:27764",
  },
  {
    id: "ic_memo_flat",
    category: "문서",
    tags: { ko: ["메모", "노트"], en: ["memo", "note"] },
    figmaNodeId: "18359:25679",
  },
  {
    id: "ic_doc_tax_invoice_flat",
    category: "문서",
    tags: { ko: ["세금정산", "문서", "세금"], en: ["document", "tax", "settlement"] },
    figmaNodeId: "15766:971",
  },
  {
    id: "ic_doc_tax_flat",
    category: "문서",
    tags: { ko: ["세무문서", "문서", "세금", "세무"], en: ["document", "tax"] },
    figmaNodeId: "15731:23806",
  },
  {
    id: "ic_doc_finance_flat",
    category: "문서",
    tags: { ko: ["청구서", "문서", "세금", "돈"], en: ["document", "invoice", "finance"] },
    figmaNodeId: "3504:9511",
  },
  {
    id: "ic_doc_complete_flat",
    category: "문서",
    tags: { ko: ["완료", "문서", "확인"], en: ["document", "complete", "done"] },
    figmaNodeId: "13851:22580",
  },
  {
    id: "ic_doc_percent_flat",
    category: "문서",
    tags: { ko: ["퍼센트문서", "문서", "퍼센트", "비율", "할인"], en: ["document", "percent", "discount"] },
    figmaNodeId: "15928:25971",
  },
  {
    id: "ic_doc_aicheck_flat",
    category: "문서",
    tags: { ko: ["AI세무조정", "문서", "AI", "검토", "확인"], en: ["document", "ai", "check"] },
    figmaNodeId: "17337:34650",
  },
  {
    id: "ic_doc_set_flat",
    category: "문서",
    tags: { ko: ["문서설정", "문서", "설정"], en: ["document", "settings"] },
    figmaNodeId: "12450:21376",
  },
  {
    id: "ic_doc_setting_flat",
    category: "문서",
    tags: { ko: ["증빙관리", "증빙", "관리", "설정"], en: ["evidence management", "settings"] },
    figmaNodeId: "13851:22688",
  },
  {
    id: "ic_doc_checklist_flat",
    category: "문서",
    tags: { ko: ["문서검토", "문서", "체크리스트", "검토"], en: ["document", "checklist", "review"] },
    figmaNodeId: "15928:26057",
  },
  {
    id: "ic_doc_search_flat",
    category: "문서",
    tags: { ko: ["문서조회", "문서", "조회", "검색"], en: ["document", "search"] },
    figmaNodeId: "15861:27193",
  },
  {
    id: "ic_doc_money_flat",
    category: "문서",
    tags: { ko: ["정산문서", "문서", "정산", "비용", "돈", "원", "급여"], en: ["document", "money", "finance", "payroll"] },
    figmaNodeId: "14946:24831",
  },
  {
    id: "ic_doc_list_flat",
    category: "문서",
    tags: { ko: ["보고서", "문서", "목록"], en: ["document", "report", "list"] },
    figmaNodeId: "3765:9763",
  },
  {
    id: "ic_doc_result_flat",
    category: "문서",
    tags: { ko: ["결과리포트", "문서", "결과", "리포트"], en: ["document", "result", "report"] },
    figmaNodeId: "13851:22656",
  },
  {
    id: "ic_guide_flat",
    category: "문서",
    tags: { ko: ["가이드", "안내", "도움말"], en: ["guide", "help"] },
    figmaNodeId: "16350:24520",
  },
  {
    id: "ic_doc_camera_flat",
    category: "문서",
    tags: { ko: ["증빙촬영", "증빙", "촬영", "카메라"], en: ["evidence", "camera", "capture"] },
    figmaNodeId: "3500:9652",
  },
  {
    id: "ic_dashboard_flat",
    category: "문서",
    tags: { ko: ["현황", "대시보드", "통계"], en: ["dashboard", "overview", "stats"] },
    figmaNodeId: "15926:23822",
  },
  {
    id: "ic_credit_flat",
    category: "문서",
    tags: { ko: ["크레딧", "카드"], en: ["credit"] },
    figmaNodeId: "11408:21652",
  },
  {
    id: "ic_doc_certifi_flat",
    category: "문서",
    tags: { ko: ["증명서류", "문서", "인증"], en: ["document", "certificate"] },
    figmaNodeId: "18725:30587",
  },
  {
    id: "ic_doc_play_flat",
    category: "문서",
    tags: { ko: ["동영상가이드", "문서", "동영상", "가이드"], en: ["document", "video", "guide"] },
    figmaNodeId: "16350:24813",
  },
  {
    id: "ic_doc_state_flat",
    category: "문서",
    tags: { ko: ["자동전표", "문서", "전표"], en: ["document", "auto slip"] },
    figmaNodeId: "15868:27390",
  },
  {
    id: "ic_doc_note_flat",
    category: "문서",
    tags: { ko: ["노트", "메모", "문서"], en: ["note", "document"] },
    figmaNodeId: "10897:1900",
  },
  {
    id: "ic_news_flat",
    category: "문서",
    tags: { ko: ["뉴스", "소식"], en: ["news"] },
    figmaNodeId: "6108:15127",
  },
  {
    id: "ic_health_flat",
    category: "문서",
    tags: { ko: ["보험", "건강"], en: ["insurance", "health"] },
    figmaNodeId: "18818:30618",
  },
];

export function figmaLinkFor(nodeId: string): string {
  return `https://www.figma.com/design/${FIGMA_FILE_KEY}?node-id=${nodeId.replace(":", "-")}`;
}
