# Netscape Bookmark Parser

ブラウザのブックマークファイル（HTML 形式）を解析し、構造化データとして操作できる TypeScript/JavaScript ライブラリです。Deno と Node.js の両方のランタイムに対応しています。

> **注意:**  
> この README は AI による自動生成です。内容はほぼ正確ですが、不正確な説明が含まれる場合があります。

英語版ドキュメント: [`./README.md`](./README.md)

## 特徴

- **HTML ブックマークファイルの解析**: Chrome、Firefox、Safari など各種ブラウザからエクスポートされた HTML ブックマークファイルを解析
- **階層構造の完全保持**: フォルダやブックマークの階層構造を忠実に再現
- **双方向変換**: HTML⇔ データ構造の相互変換に対応
- **JSON シリアライズ**: ブックマークツリーを JSON として保存・復元可能
- **Deno & Node.js 両対応**: どちらのランタイムでも動作
- **型安全**: TypeScript による型定義を完備

## インストール

### Node.js/npm

```bash
npm install netscape-bookmark-parser
```

```typescript
import { BookmarksParser, BookmarksTree } from "netscape-bookmark-parser";
```

### Deno

```typescript
import {
	BookmarksParser,
	BookmarksTree,
} from "jsr:@grakeice/netscape-bookmark-parser";
```

> **注意:** JSR 版は Node.js/Deno ランタイムのみ対応です。ブラウザで利用する場合は npm パッケージをご利用ください。

### ブラウザ

#### オプション 1: ビルドツール利用（推奨）

**Webpack, Vite, Rollup, Parcel 等:**

```typescript
// ブラウザ環境ではweb最適化版を利用
import { BookmarksParser, BookmarksTree } from "netscape-bookmark-parser/web";

// 例: アップロードされたブックマークファイルの解析
function handleFileUpload(event: Event) {
	const file = (event.target as HTMLInputElement).files?.[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = (e) => {
			const htmlContent = e.target?.result as string;
			const bookmarksTree = BookmarksParser.parse(htmlContent);
			console.log(bookmarksTree.toJSON());
		};
		reader.readAsText(file);
	}
}
```

#### オプション 2: CDN + Import Maps

```html
<script type="importmap">
	{
		"imports": {
			"netscape-bookmark-parser/web": "https://cdn.jsdelivr.net/npm/netscape-bookmark-parser@1.1.4/esm/mod_web.js"
		}
	}
</script>
<script type="module">
	import { BookmarksParser, BookmarksTree } from "netscape-bookmark-parser/web";
	const tree = BookmarksParser.parse(htmlContent);
</script>
```

#### オプション 3: CDN 直接インポート

```html
<script type="module">
	import {
		BookmarksParser,
		BookmarksTree,
	} from "https://cdn.jsdelivr.net/npm/netscape-bookmark-parser@1.1.4/esm/mod_web.js";
</script>
```

> **ブラウザサポート:** ブラウザ互換は npm パッケージ経由のみ。JSR パッケージには web 最適化版は含まれません。

> **注意:** web 最適化版は DOMParser 等のネイティブ API を利用し、Node.js 用ポリフィルを含まないため、ブラウザで軽量かつ高速です。

## 使い方

### 基本例

```typescript
import { BookmarksParser, BookmarksTree } from "netscape-bookmark-parser";

// HTMLブックマークファイルを読み込む
const htmlContent = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<HTML>
<BODY>
<DL><p>
    <DT><H3>Folder 1</H3>
    <DL><p>
        <DT><A HREF="https://example.com">Example</A>
    </DL><p>
    <DT><A HREF="https://google.com">Google</A>
</DL><p>
</BODY>
</HTML>`;

// 解析してBookmarksTreeに変換
const bookmarksTree = BookmarksParser.parse(htmlContent);

// JSONとして出力
console.log(JSON.stringify(bookmarksTree.toJSON(), null, 2));

// HTMLに戻す
const htmlDocument = bookmarksTree.toDOM();
console.log(bookmarksTree.HTMLText);
```

### BookmarksTree の操作

```typescript
// 新しいブックマークツリーを作成
const tree = new BookmarksTree();

tree.set("Google", "https://google.com");
tree.set("GitHub", "https://github.com");

// フォルダ構造を作成
const devFolder = new BookmarksTree();
devFolder.set("MDN", "https://developer.mozilla.org");
devFolder.set("Stack Overflow", "https://stackoverflow.com");

const toolsFolder = new BookmarksTree();
toolsFolder.set("GitHub", "https://github.com");
toolsFolder.set("VS Code", "https://code.visualstudio.com");

devFolder.set("Tools", toolsFolder);
tree.set("Development", devFolder);

// JSONに変換
const json = tree.toJSON();

// JSONから復元
const restoredTree = BookmarksTree.fromJSON(json);

// ツリー構造を確認
console.log(tree.size); // トップレベルのアイテム数
console.log(tree.has("Development")); // true
console.log(tree.get("Development") instanceof BookmarksTree); // true
```

### 複雑な構造の処理

```typescript
// 複雑なブックマークファイルを解析
const complexHtml = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<HTML>
<BODY>
<DL><p>
    <DT><H3>Work</H3>
    <DL><p>
        <DT><H3>Development</H3>
        <DL><p>
            <DT><A HREF="https://github.com">GitHub</A>
            <DT><A HREF="https://stackoverflow.com">Stack Overflow</A>
        </DL><p>
        <DT><A HREF="https://docs.google.com">Google Docs</A>
    </DL><p>
    <DT><H3>Personal</H3>
    <DL><p>
        <DT><A HREF="https://youtube.com">YouTube</A>
        <DT><A HREF="https://twitter.com">Twitter</A>
    </DL><p>
    <DT><A HREF="https://google.com">Google</A>
</DL><p>
</BODY>
</HTML>`;

const tree = BookmarksParser.parse(complexHtml);

// ツリー構造をたどる
const workFolder = tree.get("Work") as BookmarksTree;
const devFolder = workFolder.get("Development") as BookmarksTree;
console.log(devFolder.get("GitHub")); // "https://github.com"
```

## API リファレンス

### Web 最適化版

> **重要:** ブラウザサポートは npm インストールのみ。JSR 版にはブラウザ互換ビルドは含まれません。

このライブラリは Node.js 依存を排除し、ネイティブブラウザ API を利用する web 最適化版を提供します:

```typescript
// npmのみで利用可能なweb最適化版
import { BookmarksParser, BookmarksTree } from "netscape-bookmark-parser/web";
```

### BookmarksParser クラス

`BookmarksParser`は Netscape Bookmark 形式の HTML や JSON を解析し、`BookmarksTree`インスタンスに変換する静的メソッドを提供します。

#### 静的メソッド

- [`static parse(htmlString: string): BookmarksTree`](#static-parsehtmlstring-string-bookmarkstree)

  - Netscape Bookmark 形式の HTML 文字列を解析し、`BookmarksTree`を返します。
  - [`parseFromHTMLString`](#static-parsefromhtmlstringhtmlstring-string-bookmarkstree)のエイリアス。

  **例:**

  ```typescript
  const html = `<!DOCTYPE NETSCAPE-Bookmark-file-1>\n<HTML><BODY><DL><p>\n  <DT><A HREF=\"https://example.com\">Example</A>\n</DL><p></BODY></HTML>`;
  const tree = BookmarksParser.parse(html);
  console.log(tree.toJSON());
  ```

- [`static parseFromHTMLString(htmlString: string): BookmarksTree`](#static-parsefromhtmlstringhtmlstring-string-bookmarkstree)

  - HTML 文字列を解析し、`BookmarksTree`を返します。

  **例:**

  ```typescript
  const html = `<!DOCTYPE NETSCAPE-Bookmark-file-1>...`;
  const tree = BookmarksParser.parseFromHTMLString(html);
  ```

- [`static parseFromDOM(dom: HTMLDocument): BookmarksTree`](#static-parsefromdomdom-htmldocument-bookmarkstree)

  - 既存の`HTMLDocument`から`BookmarksTree`を生成します。

  **例:**

  ```typescript
  const dom = new DOMParser().parseFromString(html, "text/html");
  const tree = BookmarksParser.parseFromDOM(dom);
  ```

- [`static parseFromJSON(jsonString: string): BookmarksTree`](#static-parsefromjsonjsonstring-string-bookmarkstree)

  - JSON 文字列を解析し、`BookmarksTree`を返します。

  **例:**

  ```typescript
  const json = '{"Google": "https://google.com"}';
  const tree = BookmarksParser.parseFromJSON(json);
  ```

---

### BookmarksTree クラス

`BookmarksTree`は`Map`を継承し、フォルダ（`BookmarksTree`）やブックマーク（URL 文字列）を階層構造で管理します。

#### コンストラクタ

- [`new BookmarksTree()`](#constructor)

  **例:**

  ```typescript
  const tree = new BookmarksTree();
  tree.set("Google", "https://google.com");
  ```

#### インスタンスメソッド

- [`toJSON(): Record<string, unknown>`](#tojson-recordstring-unknown)

  - ツリーを JSON オブジェクトに変換します。

  **例:**

  ```typescript
  const json = tree.toJSON();
  console.log(json);
  ```

- [`toDOM(): HTMLDocument`](#todom-htmldocument)

  - ツリーを Netscape Bookmark 形式の HTML ドキュメントに変換します。

  **例:**

  ```typescript
  const dom = tree.toDOM();
  ```

- [`get HTMLString(): string`](#get-htmlstring-string)

  - Netscape Bookmark 形式の完全な HTML 文字列を取得します。

  **例:**

  ```typescript
  const html = tree.HTMLString;
  console.log(html);
  ```

- [`get HTMLText(): string`](#get-htmltext-string)
  - `HTMLString`のエイリアス（非推奨）。

#### 静的メソッド

- [`static fromJSON(json: Record<string, unknown>): BookmarksTree`](#static-fromjsonjson-recordstring-unknown-bookmarkstree)

  - JSON オブジェクトからツリーを生成します。

  **例:**

  ```typescript
  const json = { Google: "https://google.com" };
  const tree = BookmarksTree.fromJSON(json);
  ```

- [`static fromDOM(dom: HTMLDocument): BookmarksTree`](#static-fromdomdom-htmldocument-bookmarkstree)

  - HTML ドキュメントからツリーを生成します。

  **例:**

  ```typescript
  const dom = new DOMParser().parseFromString(html, "text/html");
  const tree = BookmarksTree.fromDOM(dom);
  ```

## プロジェクト構成

```
src/
├── BookmarksTree/
│   ├── BookmarksTree.ts      # メインのブックマークツリークラス
│   ├── BookmarksTree.test.ts # 包括的テスト
│   └── index.ts             # エクスポート定義
└── BookmarksParser/
    ├── BookmarksParser.ts    # HTMLパーサー
    ├── BookmarksParser.test.ts # パーサーテスト
    └── index.ts             # エクスポート定義
scripts/
└── build_npm.ts             # NPMビルドスクリプト
.github/
└── workflows/
    └── release.yml          # CI/CDパイプライン
npm/                         # Node.jsビルド成果物
├── esm/                     # ESモジュール
├── package.json
└── README.md
```

## サポート形式

### 入力形式

- **Netscape Bookmark File Format**: 標準 HTML ブックマークファイル形式
- **Chrome エクスポート形式**: Chrome からエクスポートされた HTML
- **Firefox エクスポート形式**: Firefox からエクスポートされた HTML
- **Safari エクスポート形式**: Safari からエクスポートされた HTML
- **Edge エクスポート形式**: Microsoft Edge からエクスポートされた HTML
- **汎用 HTML**: Netscape ブックマーク構造に準拠した任意の HTML

### 出力形式

- **JSON**: プログラムから扱いやすい構造化 JSON データ
- **HTML**: 全ブラウザ互換の Netscape Bookmark File Format
- **DOM**: ブラウザ互換の HTMLDocument オブジェクト

### 特別な機能

- **Unicode 対応**: 国際文字や絵文字も完全サポート
- **URL バリデーション**: http, https, ftp, file, 相対パス等多様な URL 形式に対応
- **HTML エンティティ処理**: HTML エンティティの適切なエスケープ/アンエスケープ
- **空フォルダサポート**: 空のフォルダも構造として保持
- **重複処理**: 同名ブックマークは後勝ち

## 依存関係

- [`@b-fuze/deno-dom`](https://jsr.io/@b-fuze/deno-dom): Deno/Node.js 両対応の DOM パーサ・操作

## ブラウザ互換性

### エクスポートファイル対応ブラウザ

- **Chrome/Chromium**: 全バージョン
- **Firefox**: 全バージョン
- **Safari**: 全バージョン
- **Microsoft Edge**: 全バージョン
- **Opera**: 全バージョン
- **Internet Explorer**: 6+（レガシーサポート）

### エクスポートファイル例

ライブラリは以下のようなブックマークファイルを解析できます：

```html
<!-- Chrome/Edge形式 -->
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!--This is an automatically generated file.-->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    <DT><H3 ADD_DATE="1640995200">Bookmarks bar</H3>
    <DL><p>
        <DT><A HREF="https://example.com" ADD_DATE="1640995200">Example</A>
    </DL><p>
</DL>

<!-- Firefox形式 -->
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks Menu</H1>
<DL><p>
    <DT><H3>Bookmarks Toolbar</H3>
    <DL><p>
        <DT><A HREF="https://example.com">Example Site</A>
    </DL><p>
</DL>
```

## ライセンス

MIT License - 詳細は[LICENSE](LICENSE)を参照してください。

## 作者

**grakeice**

- GitHub: [@grakeice](https://github.com/grakeice)

## 変更履歴

### v1.1.4（最新）

- 🛠️ **パーサ改良**（多様なブックマーク HTML 形式への互換性向上・安定性向上）
- 🧹 **コードリファクタリング・追加テスト**
- 🐞 **マイナーバグ修正**
- 📚 **ドキュメント更新**: API リファレンス刷新・説明統一・使用例追加・各種セクション復活

### v1.1.3

- 📝 **JSDoc コメント追加**: 主要クラス・メソッドに JSDoc 形式のコメントを追加し型情報と API 自動ドキュメント生成を強化
- 📚 **ドキュメント更新**: Node.js/npm インストール手順に TypeScript インポート例を追加

### v1.1.2

- 📝 **ドキュメント強化**: 最新バージョン参照と改善例を含む README ドキュメント更新
- 🔧 **バージョン一貫性**: 全ドキュメント・コード例でバージョン番号を統一
- 📚 **内容更新**: インストール手順・使用例・API ドキュメントの明確化

### v1.1.1

- 🛡️ **セキュリティ強化**: [`BookmarksTree.prototype.HTMLText`](src/BookmarksTree/BookmarksTree.ts)がブックマークタイトル・URL の HTML エンティティを適切にエスケープ
- 🔧 **コード一貫性**: Node.js/ブラウザ版間で HTML エスケープ動作を統一
- 📝 **ドキュメント更新**: セキュリティ考慮事項を含む API ドキュメント強化
- 🐛 **バグ修正**: 安定性向上・エッジケース対応

### v1.1.0

- 🌐 **ブラウザサポート**: ブラウザ用 web 最適化版を追加
- 📦 **デュアルエントリーポイント**: Node.js/Deno 用（`./mod.ts`）とブラウザ用（`./mod_web.ts`）を分離
- ⚡ **ネイティブ DOM API**: ブラウザ版は DOMParser 等のネイティブ API で高速化
- 🔧 **ビルド最適化**: ポリフィル除去等によるビルド強化
- 📚 **ドキュメント更新**: ブラウザ利用例・API リファレンス追加

### v1.0.1

- ✨ **コア機能**: HTML ブックマークファイルの完全解析
- 🏗️ **BookmarksTree クラス**: Map インターフェースによる階層構造管理
- 🔄 **双方向変換**: JSON↔HTML↔DOM 変換サポート
- 🧪 **包括的テスト**: エッジケース対応含む完全テストカバレッジ
- 📦 **マルチランタイム対応**: Deno/Node.js 両対応
- 🔧 **TypeScript サポート**: 型定義・IntelliSense 完備
- 🤖 **CI/CD パイプライン**: GitHub Actions による自動テスト・公開
- 📚 **ドキュメント**: 例・API リファレンス含む README
- 🌐 **国際化対応**: Unicode・多言語ブックマーク対応
- ⚡ **パフォーマンス最適化**: 大規模ブックマークも効率的に解析
- 🛡️ **エラーハンドリング**: 不正 HTML・無効 URL も安全に処理

### v0.0.1-pre4

- 初期プレリリース
- コア機能の PoC
- 基本的な解析実装
- 初期テストセットアップ
