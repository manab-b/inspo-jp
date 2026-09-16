export type CopyPageType = "hero" | "cta" | "form" | "error" | "nav" | "footer";

export type CopyPatterns = Record<CopyPageType, string[]>;

export const copyPatterns: CopyPatterns = {
  hero: [
    "新宿で、通い続けられる歯科を。",
    "予約から来院まで、迷わない医院サイト。",
    "墨と余白で、信頼が先に立つ。",
    "地域のお客さまに、今日の空き枠を。",
  ],
  cta: [
    "予約する",
    "空き枠を確認する",
    "資料を請求する",
    "カートに入れる",
    "相談する",
  ],
  form: [
    "お名前（姓）",
    "お名前（名）",
    "フリガナ（セイ）",
    "フリガナ（メイ）",
    "ご用件を選択してください",
    "送信する",
  ],
  error: [
    "姓を入力してください。",
    "フリガナは全角カタカナで入力してください。",
    "郵便番号は7桁で入力してください。",
    "送信に失敗しました。時間をおいて再度お試しください。",
  ],
  nav: [
    "診療案内",
    "医師紹介",
    "予約",
    "アクセス",
    "会社概要",
  ],
  footer: [
    "会社概要",
    "特定商取引法に基づく表記",
    "プライバシーポリシー",
    "お問い合わせ",
  ],
};

export function getCopyPatterns(pageType: CopyPageType): string[] {
  return copyPatterns[pageType];
}
