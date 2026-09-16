export type Locale = "ja-JP";

export type Industry =
  | "corporate"
  | "ec"
  | "booking"
  | "municipality"
  | "recruiting"
  | "media"
  | "food"
  | "lodging"
  | "finance"
  | "tech"
  | "beauty"
  | "manufacturing"
  | "transit";

export type Tone =
  | "trust"
  | "luxury"
  | "friendly"
  | "editorial"
  | "public"
  | "minimal"
  | "playful"
  | "warm";

export type Density = "sparse" | "comfortable" | "dense";

export type SiteType =
  | "corporate"
  | "lp"
  | "store"
  | "service"
  | "editorial"
  | "public";

export type Writing = "desu-masu" | "dearu" | "plain" | "honorific";

export type Audience = "b2c" | "b2b" | "citizen" | "visitor" | "candidate";

export type Macro =
  | "trust-corporate"
  | "booking-local"
  | "dense-media"
  | "worldview-lp"
  | "comparison-ec"
  | "gov-public"
  | "recruiting"
  | "finance-public";

export type CapturePage =
  | "top"
  | "pricing"
  | "form"
  | "about"
  | "tokushoho"
  | "privacy"
  | "mobile-menu";

export type LegalKind = "corporate" | "ec" | "booking" | "media" | "municipality";

export type Device = "mobile" | "desktop" | "both";

export type JpSite = {
  url: string;
  slug: string;
  name: string;
  note: string;
  locale: Locale;
  industry: Industry;
  tone: Tone;
  density: Density;
  type: SiteType;
  writing: Writing;
  audience: Audience;
  macro: Macro;
  capturePages: CapturePage[];
};

export type SeedUrl = {
  url: string;
  slug: string;
  note: string;
};

export type ParsedBrief = {
  raw: string;
  industry: Industry;
  tone: Tone;
  audience: Audience;
  macro: Macro;
  device: Device;
  legal: LegalKind;
  keywords: string[];
};

export type ColorRatios = {
  sumi: number;
  navy: number;
  kinari: number;
  accent: number;
};

export type SpacingScale = {
  sectionY: string;
  gutter: string;
  contentMax: string;
  tapMin: string;
};

export type Exemplar = {
  slug: string;
  name: string;
  url: string;
  industry: Industry;
  tone: Tone;
  density: Density;
  macro: Macro;
  ia: string[];
  colorRatios: ColorRatios;
  spacing: SpacingScale;
  note: string;
};

export type CritiqueIssue = {
  id: string;
  severity: "error" | "warning";
  message: string;
  hint: string;
};
