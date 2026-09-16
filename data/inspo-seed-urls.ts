import type { SeedUrl } from "./types.ts";
import { seedUrls } from "./seed-urls.ts";

/** Nutlope-worker-shaped seed rows derived from the Japan catalog. */
export const inspoSeedUrls: SeedUrl[] = seedUrls.map(({ url, slug, note }) => ({
  url,
  slug,
  note,
}));
