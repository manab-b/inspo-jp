export function Faq() {
  const items = [
    {
      q: "予約のキャンセルはできますか。",
      a: "前日の18時まで、お電話またはフォームから変更できます。",
    },
    {
      q: "初めての来院で必要なものは。",
      a: "保険証とおくすり手帳をお持ちください。問診は来院前に送れます。",
    },
    {
      q: "支払い方法は。",
      a: "窓口では現金・主要クレジットカードに対応しています。自由診療は税込表示です。",
    },
  ];
  return (
    <section className="mx-auto max-w-[720px] px-6 py-16 text-[#1a1a1a]" data-node-label="FAQ">
      <h2 className="text-[22px] tracking-[0.04em]">よくある質問</h2>
      <dl className="mt-8 grid gap-8">
        {items.map((item) => (
          <div key={item.q}>
            <dt className="text-[16px] font-medium leading-[1.8]">{item.q}</dt>
            <dd className="mt-2 text-[16px] leading-[1.8] text-[#333]">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
