import type { LegalKind } from "./types.ts";

export type LegalBlock = {
  siteType: LegalKind;
  requiredItems: string[];
  notes: string;
};

const tokushohoFields = [
  "販売業者",
  "運営統括責任者",
  "所在地",
  "電話番号",
  "メールアドレス",
  "販売価格（税込／税抜の別）",
  "商品代金以外の必要料金（送料・手数料）",
  "支払方法",
  "支払時期",
  "引き渡し時期",
  "返品・交換・キャンセルについて",
];

export const legalBlocks: Record<LegalKind, LegalBlock> = {
  corporate: {
    siteType: "corporate",
    requiredItems: [
      "会社概要（商号、所在地、代表者）",
      "お問い合わせ窓口",
      "プライバシーポリシー",
    ],
    notes: "フッターから会社概要へ。採用やIRがある場合は独立させる。",
  },
  ec: {
    siteType: "ec",
    requiredItems: [
      "特定商取引法に基づく表記",
      ...tokushohoFields,
      "プライバシーポリシー",
      "利用規約",
    ],
    notes: "ECは特商法ページを独立させ、購入導線とフッターの両方から辿れるようにする。",
  },
  booking: {
    siteType: "booking",
    requiredItems: [
      "医院／店舗名",
      "所在地・電話番号",
      "診療時間／営業時間と休診日",
      "予約キャンセルポリシー",
      "プライバシーポリシー",
      "会社概要 または 運営者情報",
    ],
    notes: "医療・店舗は予約前に時間とアクセスが見えること。通信販売が無い場合も運営者情報は出す。",
  },
  media: {
    siteType: "media",
    requiredItems: [
      "運営者・編集方針",
      "会社概要",
      "プライバシーポリシー",
      "お問い合わせ",
    ],
    notes: "記事と広告の境界を明示。引用元は本文で示す（ロゴ複製はしない）。",
  },
  municipality: {
    siteType: "municipality",
    requiredItems: [
      "組織名",
      "所在地",
      "問い合わせフォームまたは電話",
      "個人情報の取り扱い",
      "サイトポリシー／ウェブアクセシビリティ",
    ],
    notes: "公共サイトは手続きの主体と問い合わせ先を各ページで迷わせない。",
  },
};

export function getLegalBlocks(siteType: LegalKind): LegalBlock {
  return legalBlocks[siteType];
}
