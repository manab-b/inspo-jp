export function LegalTokushoho() {
  const rows = [
    ["販売業者", "合同会社 青葉"],
    ["運営統括責任者", "青葉 太郎"],
    ["所在地", "東京都新宿区西新宿1-1-1"],
    ["電話番号", "03-1234-5678"],
    ["メールアドレス", "info@example.jp"],
    ["販売価格", "各商品ページに税込価格を表示"],
    ["商品代金以外の必要料金", "送料 ¥500（税込）。離島は実費"],
    ["支払方法", "クレジットカード、銀行振込"],
    ["支払時期", "注文確定時"],
    ["引き渡し時期", "注文から5営業日以内に発送"],
    ["返品・交換について", "未開封に限り到着後8日以内"],
  ];
  return (
    <section className="mx-auto max-w-[800px] px-6 py-16 text-[#1a1a1a]" data-node-label="特商法">
      <h2 className="text-[22px] tracking-[0.04em]">特定商取引法に基づく表記</h2>
      <table className="mt-8 w-full border-t border-[#e6e1d8] text-left text-[16px] leading-[1.8]">
        <tbody>
          {rows.map(([th, td]) => (
            <tr key={th} className="border-b border-[#e6e1d8]">
              <th className="w-[36%] py-4 font-medium text-[#1b365d]">{th}</th>
              <td className="py-4">{td}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
