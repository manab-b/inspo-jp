export function PricingTable() {
  const plans = [
    { name: "検診", price: "¥4,400（税込）", note: "保険診療の自己負担目安" },
    { name: "ホワイトニング", price: "¥12,000（税込）", note: "自由診療・所要40分" },
    { name: "メンテナンス年割", price: "¥26,400（税込）", note: "年3回の定期検診セット" },
  ];
  return (
    <section className="mx-auto max-w-[1080px] px-6 py-16 text-[#1a1a1a]" data-node-label="料金表">
      <h2 className="text-[22px] tracking-[0.04em]">料金</h2>
      <p className="mt-3 text-[16px] leading-[1.8] text-[#444]">価格はすべて税込です。</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className="border border-[#e6e1d8] bg-[#faf7f2] p-6">
            <h3 className="text-[18px]">{plan.name}</h3>
            <p className="mt-4 text-[24px] tracking-[0.02em]">{plan.price}</p>
            <p className="mt-3 text-[16px] leading-[1.75]">{plan.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
