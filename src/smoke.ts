import { seedUrls } from "../data/seed-urls.ts";
import { critiqueJpUi } from "./critique.ts";
import { recommendJp } from "./recommend.ts";

const brief = "新宿の歯科医院サイトを作って。信頼感重視、予約導線あり";
const result = recommendJp(brief);

const bookingLike = new Set(["booking", "beauty", "food", "lodging"]);
if (!bookingLike.has(result.parsed.industry)) {
  throw new Error(`industry should be booking-like, got ${result.parsed.industry}`);
}

if (!result.exemplars.length) {
  throw new Error("exemplars should be non-empty");
}

if (seedUrls.length < 90) {
  throw new Error(`catalog must be >= 90, got ${seedUrls.length}`);
}

const englishNavSample = `
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>
`;
const issues = critiqueJpUi(englishNavSample);
if (!issues.some((issue) => issue.id === "english-nav")) {
  throw new Error("critique should find English nav");
}

console.log(
  JSON.stringify(
    {
      ok: true,
      industry: result.parsed.industry,
      macro: result.parsed.macro,
      exemplars: result.exemplars.map((e) => e.slug),
      catalog: seedUrls.length,
      critique: issues.map((i) => i.id),
    },
    null,
    2,
  ),
);
