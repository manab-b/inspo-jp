import { seedUrls } from "../data/seed-urls.ts";
import type { Industry, JpSite, Tone } from "../data/types.ts";

export type SearchJpOptions = {
  query?: string;
  industry?: Industry;
  tone?: Tone;
  limit?: number;
};

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s、。・/]+/)
    .flatMap((part) => part.match(/[a-z0-9一-龯ぁ-んァ-ン-]+/g) ?? [])
    .filter((t) => t.length > 0);
}

function haystack(site: JpSite): string {
  return [
    site.name,
    site.slug,
    site.note,
    site.url,
    site.industry,
    site.tone,
    site.macro,
    site.type,
  ]
    .join(" ")
    .toLowerCase();
}

export function searchJpSites(opts: SearchJpOptions = {}): JpSite[] {
  const limit = opts.limit ?? 10;
  let rows = seedUrls;

  if (opts.industry) {
    rows = rows.filter((s) => s.industry === opts.industry);
  }
  if (opts.tone) {
    rows = rows.filter((s) => s.tone === opts.tone);
  }

  const q = opts.query?.trim();
  if (q) {
    const qs = tokens(q);
    rows = rows
      .map((site) => {
        const h = haystack(site);
        const score = qs.reduce((acc, t) => acc + (h.includes(t) ? 1 : 0), 0);
        return { site, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.site);
  }

  return rows.slice(0, limit);
}

export function listJpCatalog(): Pick<
  JpSite,
  "url" | "slug" | "name" | "industry" | "tone" | "macro" | "density" | "type"
>[] {
  return seedUrls.map(({ url, slug, name, industry, tone, macro, density, type }) => ({
    url,
    slug,
    name,
    industry,
    tone,
    macro,
    density,
    type,
  }));
}

export function findBySlug(slug: string): JpSite | undefined {
  return seedUrls.find((s) => s.slug === slug);
}
