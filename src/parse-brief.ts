import type { Audience, Device, Industry, LegalKind, Macro, ParsedBrief, Tone } from "../data/types.ts";

const industryMatchers: [RegExp, Industry][] = [
  [/歯科|医院|クリニック|診療所|予約|サロン|エステ|整体/, "booking"],
  [/通販|カート|ショップ|ストア|EC|購入|通販/, "ec"],
  [/自治体|区役所|市役所|県庁|行政|役所|公共/, "municipality"],
  [/採用|求人|転職|リクルート|エントリー/, "recruiting"],
  [/ニュース|メディア|記事|新聞|雑誌/, "media"],
  [/飲食|レストラン|カフェ|グルメ|食堂|弁当/, "food"],
  [/ホテル|旅館|宿泊|リゾート|客室/, "lodging"],
  [/銀行|証券|保険|決済|家計|金融/, "finance"],
  [/美容|化粧品|ヘア|スキン/, "beauty"],
  [/製造|工場|産業|工作|部品/, "manufacturing"],
  [/鉄道|乗換|交通|航空|路線/, "transit"],
  [/SaaS|アプリ|テック|スタートアップ/, "tech"],
  [/会社|企業|コーポレート|IR/, "corporate"],
];

const toneMatchers: [RegExp, Tone][] = [
  [/信頼|安心|堅実|フォーマル/, "trust"],
  [/高級|ラグジュアリー|上品|格式/, "luxury"],
  [/親しみ|やさしい|カジュアル|フレンドリー/, "friendly"],
  [/編集|メディア|ジャーナ/, "editorial"],
  [/行政|公共|公式/, "public"],
  [/ミニマル|余白|シンプル/, "minimal"],
  [/楽しい|ポップ|遊び/, "playful"],
  [/温|あたたか|和/, "warm"],
];

const audienceMatchers: [RegExp, Audience][] = [
  [/法人|B2B|企業向け/, "b2b"],
  [/市民|住民|区民/, "citizen"],
  [/観光|訪日|旅行者/, "visitor"],
  [/候補|求職|学生/, "candidate"],
];

const macroByIndustry: Record<Industry, Macro> = {
  corporate: "trust-corporate",
  ec: "comparison-ec",
  booking: "booking-local",
  municipality: "gov-public",
  recruiting: "recruiting",
  media: "dense-media",
  food: "booking-local",
  lodging: "worldview-lp",
  finance: "finance-public",
  tech: "trust-corporate",
  beauty: "booking-local",
  manufacturing: "trust-corporate",
  transit: "gov-public",
};

const legalByIndustry: Record<Industry, LegalKind> = {
  corporate: "corporate",
  ec: "ec",
  booking: "booking",
  municipality: "municipality",
  recruiting: "corporate",
  media: "media",
  food: "booking",
  lodging: "booking",
  finance: "corporate",
  tech: "corporate",
  beauty: "ec",
  manufacturing: "corporate",
  transit: "municipality",
};

function firstMatch<T>(text: string, table: [RegExp, T][], fallback: T): T {
  for (const [re, value] of table) {
    if (re.test(text)) return value;
  }
  return fallback;
}

function keywords(text: string): string[] {
  return [...text.matchAll(/[一-龯ぁ-んァ-ンA-Za-z0-9]+/g)].map((m) => m[0]);
}

export function parseBrief(brief: string): ParsedBrief {
  const industry = firstMatch(brief, industryMatchers, "corporate");
  const tone = firstMatch(brief, toneMatchers, industry === "municipality" ? "public" : "trust");
  const audience = firstMatch(brief, audienceMatchers, industry === "municipality" ? "citizen" : "b2c");

  let macro: Macro = macroByIndustry[industry];
  if (/世界観|ブランドLP|ストーリー/.test(brief)) macro = "worldview-lp";
  if (/比較|料金表|プラン/.test(brief) && (industry === "ec" || industry === "tech")) {
    macro = "comparison-ec";
  }
  if (/予約導線|予約/.test(brief)) macro = "booking-local";

  let device: Device = "both";
  if (/スマホ|モバイル|SP/.test(brief)) device = "mobile";
  else if (/デスクトップ|PC/.test(brief)) device = "desktop";

  let legal = legalByIndustry[industry];
  if (/特商法|特定商取引/.test(brief)) legal = "ec";

  return {
    raw: brief,
    industry,
    tone,
    audience,
    macro,
    device,
    legal,
    keywords: keywords(brief),
  };
}
