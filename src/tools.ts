import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { copyPatterns, getCopyPatterns, type CopyPageType } from "../data/copy-patterns.ts";
import { getLegalBlocks, legalBlocks } from "../data/legal-blocks.ts";
import { formSpec } from "../data/form-spec.ts";
import { jpUiRules } from "../data/rules.ts";
import type { Industry, LegalKind, Tone } from "../data/types.ts";
import { getComponentById, listComponentIds } from "./components-index.ts";
import { critiqueJpUi } from "./critique.ts";
import { recommendJp } from "./recommend.ts";
import { findBySlug, listJpCatalog, searchJpSites } from "./search.ts";

export const SERVER_INSTRUCTIONS = [
  "Inspo JP は日本向けデザインのMCPです。スクリーンショット撮影は行いません。",
  "エージェントは最初に recommend_jp を呼んでください。ブリーフから業界・トーン・マクロ・参照構造・DESIGN.md・法令・フォーム・オリジナルJSXをまとめて返します。",
  "参照サイトのロゴ・写真・キャッチコピーは複製しないでください。返すのは配色比・余白・IA・コンポーネント構造とオリジナルJSXのみです。",
  "日付は YYYY年M月D日、価格は ¥12,000（税込）、本文16px、タップ44px、フォームは姓/名/フリガナです。",
].join("\n");

function ok(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
  };
}

const industries = [
  "corporate",
  "ec",
  "booking",
  "municipality",
  "recruiting",
  "media",
  "food",
  "lodging",
  "finance",
  "tech",
  "beauty",
  "manufacturing",
  "transit",
] as const;

const tones = [
  "trust",
  "luxury",
  "friendly",
  "editorial",
  "public",
  "minimal",
  "playful",
  "warm",
] as const;

const pageTypes = ["hero", "cta", "form", "error", "nav", "footer"] as const;
const legalKinds = ["corporate", "ec", "booking", "media", "municipality"] as const;

export function registerTools(server: McpServer): void {
  server.tool(
    "recommend_jp",
    "日本語ブリーフから業界・トーン・マクロ・参照サイト構造・DESIGN.md・UIルール・コピー・法令・フォーム・オリジナルJSXを一括で返します。最初にこのツールを呼んでください。",
    { brief: z.string().describe("日本語のデザインブリーフ") },
    async ({ brief }) => ok(recommendJp(brief)),
  );

  server.tool(
    "search_jp_sites",
    "日本サイトカタログを語彙検索します。業界・トーンで絞り込めます。ロゴや文言は返しません。",
    {
      query: z.string().optional().describe("サイト名・スラッグ・メモに対する検索語"),
      industry: z.enum(industries).optional().describe("業界フィルタ"),
      tone: z.enum(tones).optional().describe("トーンフィルタ"),
      limit: z.number().int().min(1).max(100).optional().describe("件数（既定10）"),
    },
    async ({ query, industry, tone, limit }) =>
      ok(
        searchJpSites({
          query,
          industry: industry as Industry | undefined,
          tone: tone as Tone | undefined,
          limit,
        }),
      ),
  );

  server.tool(
    "get_jp_copy_patterns",
    "ヒーロー・CTA・フォーム・エラー・ナビ・フッター向けの日本語コピー例を返します。オリジナル例であり、参照サイトの文言ではありません。",
    {
      page_type: z.enum(pageTypes).describe("ページ要素の種類"),
    },
    async ({ page_type }) =>
      ok({ page_type, patterns: getCopyPatterns(page_type as CopyPageType) }),
  );

  server.tool(
    "get_jp_legal_blocks",
    "サイト種別ごとの必須表記を返します。ECは特定商取引法の法定記載項目を含みます。",
    {
      site_type: z.enum(legalKinds).describe("corporate / ec / booking / media / municipality"),
    },
    async ({ site_type }) => ok(getLegalBlocks(site_type as LegalKind)),
  );

  server.tool(
    "get_jp_form_spec",
    "日本語フォーム仕様を返します。姓・名・フリガナセイ／メイ・email・tel・郵便番号・都道府県・住所・ご用件。",
    {},
    async () => ok({ fields: formSpec }),
  );

  server.tool(
    "critique_jp_ui",
    "URL文字列またはコードを静的に点検します。英語ナビ、Inter、小さい文字、フリガナ不足、法令リンク不足を指摘します。スクリーンショットは使いません。",
    {
      url_or_code: z.string().describe("点検したいURLまたはJSX/HTML"),
    },
    async ({ url_or_code }) => ok({ issues: critiqueJpUi(url_or_code) }),
  );

  server.tool(
    "get_design_system",
    "既定の日本向けデザインシステムを返します。slug を指定するとカタログ上のサイトの構造メモ（配色比・余白・IA）を添えます。",
    {
      slug: z.string().optional().describe("カタログのスラッグ（任意）"),
    },
    async ({ slug }) => {
      const site = slug ? findBySlug(slug) : undefined;
      return ok({
        fonts: jpUiRules.typography.fonts,
        rules: jpUiRules,
        copyKeys: Object.keys(copyPatterns),
        legalKinds: Object.keys(legalBlocks),
        components: listComponentIds(),
        site: site
          ? {
              slug: site.slug,
              name: site.name,
              url: site.url,
              industry: site.industry,
              tone: site.tone,
              density: site.density,
              macro: site.macro,
              note: site.note,
              capturePages: site.capturePages,
            }
          : null,
      });
    },
  );

  server.tool(
    "get_jp_rules",
    "日本向けUIルール（日付・価格・CTA・本文サイズ・タップ・フォーム・色の意味・書体）を返します。",
    {},
    async () => ok(jpUiRules),
  );

  server.tool(
    "get_reference_jsx",
    "オリジナルの参照JSXを id で返します。実在サイトのマークアップではありません。",
    {
      id: z.string().describe("コンポーネントid（例: contact-form）"),
    },
    async ({ id }) => {
      try {
        return ok({ id, jsx: getComponentById(id) });
      } catch {
        return ok({ error: `unknown id: ${id}`, ids: listComponentIds() });
      }
    },
  );

  server.tool(
    "list_jp_catalog",
    "日本サイトカタログの一覧（url / slug / name / industry / tone / macro）を返します。",
    {},
    async () => ok({ count: listJpCatalog().length, sites: listJpCatalog() }),
  );
}
