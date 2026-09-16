export function ContactForm() {
  return (
    <form
      className="mx-auto grid max-w-[720px] gap-6 bg-[#faf7f2] p-8 text-[#1a1a1a]"
      data-node-label="お問い合わせフォーム"
    >
      <h2 className="text-[22px] tracking-[0.04em]">お問い合わせ</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-[16px] leading-[1.75]">
          姓<span className="text-[#9b1c1c]">必須</span>
          <input required name="family-name" autoComplete="family-name" className="min-h-[44px] border border-[#d8d2c8] bg-white px-3" />
        </label>
        <label className="grid gap-2 text-[16px] leading-[1.75]">
          名<span className="text-[#9b1c1c]">必須</span>
          <input required name="given-name" autoComplete="given-name" className="min-h-[44px] border border-[#d8d2c8] bg-white px-3" />
        </label>
        <label className="grid gap-2 text-[16px] leading-[1.75]">
          フリガナセイ<span className="text-[#9b1c1c]">必須</span>
          <input required name="family-name-kana" className="min-h-[44px] border border-[#d8d2c8] bg-white px-3" />
        </label>
        <label className="grid gap-2 text-[16px] leading-[1.75]">
          フリガナメイ<span className="text-[#9b1c1c]">必須</span>
          <input required name="given-name-kana" className="min-h-[44px] border border-[#d8d2c8] bg-white px-3" />
        </label>
      </div>
      <label className="grid gap-2 text-[16px] leading-[1.75]">
        メールアドレス
        <input required type="email" name="email" autoComplete="email" className="min-h-[44px] border border-[#d8d2c8] bg-white px-3" />
      </label>
      <label className="grid gap-2 text-[16px] leading-[1.75]">
        電話番号
        <input type="tel" name="tel" autoComplete="tel" className="min-h-[44px] border border-[#d8d2c8] bg-white px-3" />
      </label>
      <label className="grid gap-2 text-[16px] leading-[1.75]">
        郵便番号
        <input required name="postal-code" inputMode="numeric" autoComplete="postal-code" className="min-h-[44px] border border-[#d8d2c8] bg-white px-3" />
      </label>
      <label className="grid gap-2 text-[16px] leading-[1.75]">
        都道府県
        <input required name="prefecture" autoComplete="address-level1" className="min-h-[44px] border border-[#d8d2c8] bg-white px-3" />
      </label>
      <label className="grid gap-2 text-[16px] leading-[1.75]">
        住所
        <input required name="address" autoComplete="street-address" className="min-h-[44px] border border-[#d8d2c8] bg-white px-3" />
      </label>
      <label className="grid gap-2 text-[16px] leading-[1.75]">
        ご用件
        <textarea required name="inquiry" rows={5} className="border border-[#d8d2c8] bg-white px-3 py-3 text-[16px] leading-[1.75]" />
      </label>
      <button type="submit" className="min-h-[44px] rounded-full bg-[#1b365d] px-8 text-[16px] text-white">
        送信する
      </button>
    </form>
  );
}
