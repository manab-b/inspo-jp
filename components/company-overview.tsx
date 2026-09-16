export function CompanyOverview() {
  const rows = [
    ["商号", "合同会社 青葉"],
    ["所在地", "東京都新宿区西新宿1-1-1"],
    ["代表者", "青葉 太郎"],
    ["設立", "2014年4月1日"],
    ["事業", "歯科診療所の運営"],
  ];
  return (
    <section className="mx-auto max-w-[720px] px-6 py-16 text-[#1a1a1a]" data-node-label="会社概要">
      <h2 className="text-[22px] tracking-[0.04em]">会社概要</h2>
      <table className="mt-8 w-full border-t border-[#e6e1d8] text-left text-[16px] leading-[1.8]">
        <tbody>
          {rows.map(([th, td]) => (
            <tr key={th} className="border-b border-[#e6e1d8]">
              <th className="w-[28%] py-4 font-medium text-[#1b365d]">{th}</th>
              <td className="py-4">{td}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
