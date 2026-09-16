import type { Macro } from "./types.ts";

export type MacroDef = {
  id: Macro;
  name: string;
  flow: string[];
  notes: string;
};

export const macros: Record<Macro, MacroDef> = {
  "trust-corporate": {
    id: "trust-corporate",
    name: "信頼コーポレート",
    flow: ["トップ", "事業・サービス", "実績・事例", "会社概要", "お問い合わせ"],
    notes:
      "ネイビー／墨。ヒーローは短い約束＋資料請求。フッターに会社概要・プライバシー。英語ナビ禁止。",
  },
  "booking-local": {
    id: "booking-local",
    name: "地域店舗の予約",
    flow: ["トップ", "メニュー／診療案内", "スタッフ・設備", "予約", "アクセス", "店舗情報"],
    notes:
      "予約を第1CTA。電話番号をヘッダー固定。フォームは姓名＋フリガナ。地図と診療時間を同じ視線に。",
  },
  "dense-media": {
    id: "dense-media",
    name: "高密度メディア",
    flow: ["トップ", "記事一覧", "記事", "特集", "会社概要"],
    notes:
      "見出し階層とタイムスタンプ（YYYY年M月D日）。本文16px・行間1.8。広告枠と本文を混同しない。",
  },
  "worldview-lp": {
    id: "worldview-lp",
    name: "世界観LP",
    flow: ["ヒーロー", "世界観", "体験・客室／製品", "予約・購入", "FAQ", "会社概要"],
    notes:
      "生成り／金のアクセント。写真はオリジナルまたは権利クリアなものだけ。コピーはオリジナル。",
  },
  "comparison-ec": {
    id: "comparison-ec",
    name: "比較・購入EC",
    flow: ["トップ", "一覧", "商品詳細", "カート", "購入", "特商法", "マイページ"],
    notes:
      "価格は税込表示。特商法の法定記載。フィルタと在庫。赤いのはセールバッジのみ。",
  },
  "gov-public": {
    id: "gov-public",
    name: "行政・公共",
    flow: ["トップ", "手続き一覧", "暮らしの情報", "申請フォーム", "組織・条例"],
    notes:
      "公共トーン。読みやすさ・検索・多言語への分岐。装飾より分類。本文は16px以上。",
  },
  recruiting: {
    id: "recruiting",
    name: "採用",
    flow: ["トップ", "人・文化", "職種一覧", "選考フロー", "エントリー"],
    notes:
      "候補者向け。数字と制度を先に。エントリーフォームは姓名フリガナ必須。",
  },
  "finance-public": {
    id: "finance-public",
    name: "金融・公共性",
    flow: ["トップ", "商品比較", "リスク・注意", "口座開設／申込", "会社概要"],
    notes:
      "信頼ネイビー。注意書きを本文サイズで。金利・手数料は表で比較。赤は警告のみ。",
  },
};

export function getMacro(id: Macro): MacroDef {
  return macros[id];
}
