import { copyPatterns } from "../data/copy-patterns.ts";
import { getLegalBlocks } from "../data/legal-blocks.ts";
import { formSpec } from "../data/form-spec.ts";
import { getMacro } from "../data/macros.ts";
import { jpUiRules } from "../data/rules.ts";
import { seedUrls } from "../data/seed-urls.ts";
import { designMdTemplate } from "../templates/design-md.ts";
import type { ColorRatios, Exemplar, JpSite, Macro, ParsedBrief, SpacingScale } from "../data/types.ts";
import { getComponentById, listComponentIds } from "./components-index.ts";
import { parseBrief } from "./parse-brief.ts";

const iaByMacro: Record<Macro, string[]> = {
  "trust-corporate": ["トップ", "事業", "実績", "会社概要", "お問い合わせ"],
  "booking-local": ["トップ", "診療案内", "予約", "アクセス", "店舗情報"],
  "dense-media": ["トップ", "記事一覧", "記事", "会社概要"],
  "worldview-lp": ["ヒーロー", "世界観", "体験", "予約", "FAQ", "会社概要"],
  "comparison-ec": ["トップ", "一覧", "詳細", "カート", "特商法"],
  "gov-public": ["トップ", "手続き", "申請", "組織"],
  recruiting: ["トップ", "文化", "職種", "選考", "エントリー"],
  "finance-public": ["トップ", "商品", "注意事項", "申込", "会社概要"],
};

function paletteFor(site: JpSite): ColorRatios {
  if (site.tone === "luxury") return { sumi: 0.48, navy: 0.12, kinari: 0.34, accent: 0.06 };
  if (site.tone === "public") return { sumi: 0.58, navy: 0.28, kinari: 0.1, accent: 0.04 };
  if (site.industry === "ec") return { sumi: 0.55, navy: 0.18, kinari: 0.16, accent: 0.11 };
  return { sumi: 0.62, navy: 0.22, kinari: 0.12, accent: 0.04 };
}

function spacingFor(site: JpSite): SpacingScale {
  if (site.density === "sparse") {
    return { sectionY: "96px", gutter: "32px", contentMax: "1040px", tapMin: "44px" };
  }
  if (site.density === "dense") {
    return { sectionY: "48px", gutter: "16px", contentMax: "1200px", tapMin: "44px" };
  }
  return { sectionY: "72px", gutter: "24px", contentMax: "1080px", tapMin: "44px" };
}

function toExemplar(site: JpSite): Exemplar {
  return {
    slug: site.slug,
    name: site.name,
    url: site.url,
    industry: site.industry,
    tone: site.tone,
    density: site.density,
    macro: site.macro,
    ia: iaByMacro[site.macro],
    colorRatios: paletteFor(site),
    spacing: spacingFor(site),
    note: `${site.note} 構造参考のみ。ロゴ・写真・文言は複製しない。`,
  };
}

function pickExemplars(parsed: ParsedBrief, limit = 6): Exemplar[] {
  const scored = seedUrls
    .map((site) => {
      let score = 0;
      if (site.industry === parsed.industry) score += 5;
      if (site.macro === parsed.macro) score += 3;
      if (site.tone === parsed.tone) score += 2;
      if (site.audience === parsed.audience) score += 1;
      return { site, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  const picked = (scored.length ? scored : seedUrls.map((site) => ({ site, score: 0 })))
    .slice(0, limit)
    .map((r) => toExemplar(r.site));

  return picked;
}

function fillDesignMd(parsed: ParsedBrief, exemplars: Exemplar[], macroName: string, macroNotes: string, flow: string[]): string {
  const ratios = exemplars[0]?.colorRatios ?? { sumi: 0.62, navy: 0.22, kinari: 0.12, accent: 0.04 };
  const spacing = exemplars[0]?.spacing ?? {
    sectionY: "72px",
    gutter: "24px",
    contentMax: "1080px",
    tapMin: "44px",
  };
  const ia = (exemplars[0]?.ia ?? iaByMacro[parsed.macro]).map((x) => `- ${x}`).join("\n");
  const components = listComponentIds()
    .map((id) => `- ${id}`)
    .join("\n");

  return designMdTemplate
    .replace("{{brief}}", parsed.raw)
    .replace("{{macroId}}", parsed.macro)
    .replace("{{macroName}}", macroName)
    .replace("{{flow}}", flow.join(" → "))
    .replace("{{macroNotes}}", macroNotes)
    .replace("{{industry}}", parsed.industry)
    .replace("{{tone}}", parsed.tone)
    .replace("{{audience}}", parsed.audience)
    .replace("{{device}}", parsed.device)
    .replace("{{legal}}", parsed.legal)
    .replace("{{sumi}}", String(ratios.sumi))
    .replace("{{navy}}", String(ratios.navy))
    .replace("{{kinari}}", String(ratios.kinari))
    .replace("{{accent}}", String(ratios.accent))
    .replace("{{sectionY}}", spacing.sectionY)
    .replace("{{gutter}}", spacing.gutter)
    .replace("{{contentMax}}", spacing.contentMax)
    .replace("{{ia}}", ia)
    .replace("{{components}}", components);
}

export type RecommendJpResult = {
  parsed: ParsedBrief;
  macro: ReturnType<typeof getMacro>;
  exemplars: Exemplar[];
  designMd: string;
  rules: typeof jpUiRules;
  copy: typeof copyPatterns;
  legal: ReturnType<typeof getLegalBlocks>;
  form: typeof formSpec;
  components: Record<string, string>;
};

export function recommendJp(brief: string): RecommendJpResult {
  const parsed = parseBrief(brief);
  const macro = getMacro(parsed.macro);
  const exemplars = pickExemplars(parsed);
  const designMd = fillDesignMd(parsed, exemplars, macro.name, macro.notes, macro.flow);
  const components: Record<string, string> = {};
  for (const id of listComponentIds()) {
    components[id] = getComponentById(id);
  }

  return {
    parsed,
    macro,
    exemplars,
    designMd,
    rules: jpUiRules,
    copy: copyPatterns,
    legal: getLegalBlocks(parsed.legal),
    form: formSpec,
    components,
  };
}
