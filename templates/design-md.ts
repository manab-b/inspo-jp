export const designMdTemplate = `# DESIGN.md

日本向けUIの実装メモ。参照サイトのロゴ・写真・文言は複製しない。
返すのは配色比・余白・IA・コンポーネント構造と、オリジナルJSXのみ。

## ブリーフ
{{brief}}

## マクロ
- ID: {{macroId}}
- 名前: {{macroName}}
- フロー: {{flow}}
- メモ: {{macroNotes}}

## トーンとオーディエンス
- 業界: {{industry}}
- トーン: {{tone}}
- オーディエンス: {{audience}}
- デバイス: {{device}}
- 法令セット: {{legal}}

## タイポグラフィ
- ゴシック: Noto Sans JP（UI・本文）
- 明朝: Noto Serif JP または Shippori Mincho（見出し・世界観）
- 本文: 16px / line-height 1.75–2.0
- 日付: YYYY年M月D日
- 価格: ¥12,000（税込）

## 色の意味（比率はオリジナル提案）
- 墨 sumi: 本文 {{sumi}}
- 紺 navy: 信頼 {{navy}}
- 生成り kinari: 地／ラグジュアリー {{kinari}}
- アクセント: セール・警告の赤は最小 {{accent}}

## 余白
- セクション上下: {{sectionY}}
- ガター: {{gutter}}
- コンテンツ幅: {{contentMax}}
- タップ領域: 44px以上

## IA
{{ia}}

## フォーム
姓 / 名 / フリガナセイ / フリガナメイ / メール / 電話 / 郵便番号 / 都道府県 / 住所 / ご用件

## フッター必須
会社概要 または 特定商取引法に基づく表記、プライバシーポリシー

## コンポーネント
{{components}}

## 禁止
- 英語ナビ（Home / About / Contact）
- Inter など欧文書体を和文UIの主書体にすること
- 12px級の本文
- ロゴ・写真・キャッチコピーのトレース
`;
