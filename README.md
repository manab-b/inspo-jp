# Inspo JP

日本向けデザイン MCP サーバーです。日本語ブリーフ、和文書体、特定商取引法、フリガナ付きフォームを扱います。

Nutlope/inspo のスクリーンショットカタログをフォークしたものではありません。参照サイトのロゴ・写真・キャッチコピーは返しません。配色比・余白・IA・コンポーネント構造と、オリジナル JSX のみを返します。

## 必要環境

- Node.js 20 以降（`--experimental-strip-types` が使える 22+ を推奨）

## セットアップ

```bash
git clone https://github.com/manab-b/inspo-jp.git
cd inspo-jp
npm install
npm test
```

サーバー起動（stdio MCP）:

```bash
npm start
# または
node --experimental-strip-types src/server.ts
```

最初に呼ぶツールは `recommend_jp` です。

## Claude Code

`~/.claude.json` またはプロジェクトの MCP 設定:

```json
{
  "mcpServers": {
    "inspo-jp": {
      "command": "node",
      "args": ["--experimental-strip-types", "/ABS/PATH/inspo-jp/src/server.ts"]
    }
  }
}
```

## Cursor

`.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "inspo-jp": {
      "command": "node",
      "args": ["--experimental-strip-types", "/ABS/PATH/inspo-jp/src/server.ts"]
    }
  }
}
```

## ツール

| ツール | 用途 |
| --- | --- |
| `recommend_jp` | ブリーフから推奨一式（最初に呼ぶ） |
| `search_jp_sites` | カタログ語彙検索 |
| `get_jp_copy_patterns` | 日本語コピー例 |
| `get_jp_legal_blocks` | 法令ブロック（EC は特商法） |
| `get_jp_form_spec` | 姓/名/フリガナ付きフォーム仕様 |
| `critique_jp_ui` | 英語ナビ・Inter・小さい文字などを点検 |
| `get_design_system` | デザインシステム（任意 slug） |
| `get_jp_rules` | JP UI ルール |
| `get_reference_jsx` | オリジナル JSX |
| `list_jp_catalog` | カタログ一覧 |

## 著作権

MIT License。カタログの URL は公開サイトへの参照です。サイトのロゴ、写真、文章、商標を複製・再配布する権利は含まれません。生成物では必ずオリジナルの文言と素材を使ってください。
