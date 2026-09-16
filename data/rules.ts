export const jpUiRules = {
  language: {
    ui: "すべてのUI文言は日本語。ナビ・ボタン・プレースホルダに英語を残さない。",
    dates: "日付は YYYY年M月D日（例: 2026年9月16日）。",
    prices: "価格は ¥12,000（税込）のように桁区切りと税込/税抜を明示する。",
    cta: "主CTAは動詞終わり（予約する / 資料を請求する / カートに入れる）。",
  },
  typography: {
    fonts: ["Noto Sans JP", "Noto Serif JP", "Shippori Mincho"],
    bodyPx: "15–16px",
    bodyMinPx: 16,
    lineHeight: "1.75–2.0",
    heading: "見出しは字間を詰めすぎない。和文は letter-spacing: 0.02–0.08em 程度。",
  },
  tap: {
    minPx: 44,
    note: "タップ領域は 44px 以上。隣接リンクの間隔を確保する。",
  },
  forms: {
    name: "姓名は 姓 / 名 を分ける。フリガナは セイ / メイ。",
    address: "郵便番号 → 都道府県 → 市区町村以降。",
    required: ["姓", "名", "フリガナセイ", "フリガナメイ"],
  },
  footer: {
    requiredLinks: ["会社概要 または 特定商取引法に基づく表記", "プライバシーポリシー"],
    note: "フッターに 会社概要 または 特商法 へのリンクを置く。",
  },
  colorMeaning: {
    red: "alert / sale（本文や信頼の主色には使わない）",
    navy: "trust（コーポレート・金融・医療）",
    sumi: "body text（#111–#222 相当の墨）",
    gold: "luxury accent",
    kinari: "luxury / paper ground（生成り）",
  },
  a11y: {
    contrast: "本文は墨 × 紙白でコントラストを確保。薄灰本文は避ける。",
    ruby: "難読語や固有名詞は必要に応じてルビ。フォームのフリガナは必須。",
  },
} as const;

export type JpUiRules = typeof jpUiRules;
