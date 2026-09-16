export function GlobalNav() {
  return (
    <header
      className="border-b border-[#e6e1d8] bg-[#faf7f2]"
      data-node-label="グローバルナビ"
    >
      <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-6 px-6 py-4">
        <a href="#top" className="text-[16px] font-medium tracking-[0.06em] text-[#1a1a1a]">
          青葉歯科医院
        </a>
        <nav aria-label="主要" className="hidden items-center gap-8 md:flex">
          {[
            ["診療案内", "#guide"],
            ["医師紹介", "#doctors"],
            ["予約", "#reserve"],
            ["アクセス", "#access"],
            ["会社概要", "#about"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="min-h-[44px] inline-flex items-center text-[16px] text-[#1a1a1a]"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href="tel:0312345678"
          className="inline-flex min-h-[44px] items-center rounded-full bg-[#1b365d] px-5 text-[16px] text-white"
        >
          03-1234-5678
        </a>
      </div>
    </header>
  );
}
