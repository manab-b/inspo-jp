import type { CritiqueIssue } from "../data/types.ts";

const ENGLISH_NAV = /\b(Home|About|Contact|Services?|Pricing|Blog|Works?|Company|News)\b/;

export function critiqueJpUi(urlOrCode: string): CritiqueIssue[] {
  const issues: CritiqueIssue[] = [];
  const text = urlOrCode;

  if (ENGLISH_NAV.test(text)) {
    issues.push({
      id: "english-nav",
      severity: "error",
      message: "英語ナビ（Home / About / Contact など）が残っています。",
      hint: "診療案内・会社概要・お問い合わせのように和文ラベルへ置き換えてください。",
    });
  }

  if (/\bInter\b/.test(text)) {
    issues.push({
      id: "inter-font",
      severity: "error",
      message: "Inter が指定されています。和文UIの主書体には向きません。",
      hint: "Noto Sans JP / Noto Serif JP / Shippori Mincho を使ってください。",
    });
  }

  if (
    /text-\[[0-9]px\]|text-\[[1][0-4]px\]|font-size:\s*([0-9]|1[0-4])px|text-xs\b/.test(
      text,
    )
  ) {
    issues.push({
      id: "tiny-text",
      severity: "warning",
      message: "本文またはUIが15px未満の可能性があります。",
      hint: "本文は16px、行間1.75–2.0、タップ領域44pxを確保してください。",
    });
  }

  const looksLikeForm = /<form|type=["']text["']|お名前|氏名|input/i.test(text);
  if (looksLikeForm && !/フリガナ|ふりがな|セイ|メイ/.test(text)) {
    issues.push({
      id: "missing-furigana",
      severity: "error",
      message: "フォームにフリガナ（セイ／メイ）がありません。",
      hint: "姓／名と別にフリガナセイ・フリガナメイを必須にしてください。",
    });
  }

  if (!/特商法|特定商取引|会社概要/.test(text)) {
    issues.push({
      id: "missing-legal",
      severity: "warning",
      message: "会社概要または特商法へのリンクが見つかりません。",
      hint: "フッターに 会社概要 または 特定商取引法に基づく表記 を置いてください。",
    });
  }

  return issues;
}
