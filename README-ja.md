# Netscape Bookmark Parser

ブラウザのブックマークファイル（HTML 形式）を解析し、構造化データとして操作するための TypeScript/JavaScript ライブラリです。Deno と Node.js の両方のランタイムに対応しています。

> **注意:**  
> この README は AI 生成されたドキュメントです。詳細はほぼ正確ですが、不正確な説明が含まれる可能性があります。

## 機能

- **HTML ブックマークファイルの解析**: Chrome、Firefox、Safari、その他のブラウザからエクスポートされた HTML ブックマークファイルを解析
- **階層構造の保持**: フォルダとブックマークの階層構造を完全に保持
- **双方向変換**: HTML からデータ構造への変換とその逆の変換をサポート
- **JSON シリアライゼーション**: ブックマークツリーを JSON として保存・復元
- **Deno & Node.js 対応**: Deno と Node.js の両方のランタイムで動作
- **型安全性**: 包括的な型定義によるフル TypeScript サポート

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

> **注意:** JSR 版は Node.js/Deno ランタイム版のみを含んでいます。ブラウザサポートが必要な場合は、npm パッケージをご使用ください。

### ブラウザ

#### オプション 1: ビルドツールの使用（推奨）

**Webpack、Vite、Rollup、Parcel など:**

```typescript
// ブラウザ環境では、Web最適化版を使用
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

#### オプション 2: Import Maps を使用した CDN

```html
<script type="importmap">
	{
		"imports": {
			"netscape-bookmark-parser/web": "https://cdn.jsdelivr.net/npm/netscape-bookmark-parser@1.1.3/esm/mod_web.js"
		}
	}
</script>
<script type="module">
	import { BookmarksParser, BookmarksTree } from "netscape-bookmark-parser/web";

	// ローカルインポートと同じように動作
	const tree = BookmarksParser.parse(htmlContent);
</script>
```

#### オプション 3: CDN を直接インポート

```html
<script type="module">
	import {
		BookmarksParser,
		BookmarksTree,
	} from "https://cdn.jsdelivr.net/npm/netscape-bookmark-parser@1.1.3/esm/mod_web.js";

	// import maps なしでの直接 CDN インポート
</script>
```

> **ブラウザサポート:** ブラウザ互換性は npm パッケージを通してのみ利用可能です。JSR パッケージは、プラットフォーム固有の依存関係のため、Web 最適化版を含んでいません。

> **注意:** Web 最適化版は、ネイティブブラウザ API（DOMParser など）を使用し、Node.js ポリフィルを含まないため、ブラウザ環境でより軽量で高速に動作します。

## 使用方法

### 基本的な例

```typescript
import { BookmarksParser, BookmarksTree } from "netscape-bookmark-parser";

// HTMLブックマークファイルを読み込み
const htmlContent = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<HTML>
<BODY>
<DL><p>
    <DT><H3>フォルダ 1</H3>
    <DL><p>
        <DT><A HREF="https://example.com">例</A>
    </DL><p>
    <DT><A HREF="https://google.com">Google</A>
</DL><p>
</BODY>
</HTML>`;

// HTMLを解析してBookmarksTreeに変換
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

// ブックマークを追加
tree.set("Google", "https://google.com");
tree.set("GitHub", "https://github.com");

// フォルダ構造を作成
const devFolder = new BookmarksTree();
devFolder.set("MDN", "https://developer.mozilla.org");
devFolder.set("Stack Overflow", "https://stackoverflow.com");

const toolsFolder = new BookmarksTree();
toolsFolder.set("GitHub", "https://github.com");
toolsFolder.set("VS Code", "https://code.visualstudio.com");

devFolder.set("ツール", toolsFolder);
tree.set("開発", devFolder);

// JSONに変換
const json = tree.toJSON();

// JSONから復元
const restoredTree = BookmarksTree.fromJSON(json);

// ツリー構造を確認
console.log(tree.size); // トップレベルアイテムの数
console.log(tree.has("開発")); // true
console.log(tree.get("開発") instanceof BookmarksTree); // true
```

### 複雑な構造の処理

```typescript
// 複雑なブックマークファイルを解析
const complexHtml = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<HTML>
<BODY>
<DL><p>
    <DT><H3>仕事</H3>
    <DL><p>
        <DT><H3>開発</H3>
        <DL><p>
            <DT><A HREF="https://github.com">GitHub</A>
            <DT><A HREF="https://stackoverflow.com">Stack Overflow</A>
        </DL><p>
        <DT><A HREF="https://docs.google.com">Google Docs</A>
    </DL><p>
    <DT><H3>個人</H3>
    <DL><p>
        <DT><A HREF="https://youtube.com">YouTube</A>
        <DT><A HREF="https://twitter.com">Twitter</A>
    </DL><p>
    <DT><A HREF="https://google.com">Google</A>
</DL><p>
</BODY>
</HTML>`;

const tree = BookmarksParser.parse(complexHtml);

// ツリー構造をナビゲート
const workFolder = tree.get("仕事") as BookmarksTree;
const devFolder = workFolder.get("開発") as BookmarksTree;
console.log(devFolder.get("GitHub")); // "https://github.com"
```

## API リファレンス

### Web 最適化版

> **重要:** ブラウザサポートは npm インストールを通してのみ利用可能です。JSR 版にはブラウザ互換ビルドが含まれていません。

ライブラリは、Node.js 依存関係を排除し、ネイティブブラウザ API を使用するブラウザ最適化版を提供しています:

```typescript
// ブラウザ最適化版をインポート（npm のみ）
import { BookmarksParser, BookmarksTree } from "netscape-bookmark-parser/web";
```

### BookmarksParser クラス

[`BookmarksParser`](src/BookmarksParser/BookmarksParser.ts)クラスは、HTML ブックマークファイルを解析するための静的メソッドを提供します。

#### `BookmarksParser.parse(htmlContent: string): BookmarksTree`

HTML ブックマークファイルのコンテンツを解析し、[`BookmarksTree`](src/BookmarksTree/BookmarksTree.ts)インスタンスを返します。

- **パラメータ**: `htmlContent` - 文字列としての HTML ブックマークファイル
- **戻り値**: 解析されたブックマークツリー

**例:**

```typescript
const htmlContent = "<!DOCTYPE NETSCAPE-Bookmark-file-1>...";
const tree = BookmarksParser.parse(htmlContent);
```

### BookmarksTree クラス

[`BookmarksTree`](src/BookmarksTree/BookmarksTree.ts)は、`Map<string, string | BookmarksTree>`を拡張してブックマークの階層構造を表現するクラスです。

#### コンストラクタ

```typescript
const tree = new BookmarksTree();
```

#### インスタンスメソッド

##### `toJSON(): Record<string, unknown>`

ツリーを JSON オブジェクト表現に変換します。

```typescript
const json = tree.toJSON();
console.log(JSON.stringify(json, null, 2));
```

##### `toDOM(): HTMLDocument`

ツリーを HTML ドキュメントオブジェクトに変換します。

```typescript
const htmlDocument = tree.toDOM();
```

##### `get HTMLText(): string`

ブックマークツリーの HTML 文字列表現を取得します。

```typescript
const htmlString = tree.HTMLText;
console.log(htmlString); // 完全なHTMLブックマークファイル
```

#### 静的メソッド

##### `fromJSON(json: Record<string, unknown>): BookmarksTree`

JSON オブジェクトからツリーを復元します。

```typescript
const json = { Google: "https://google.com" };
const tree = BookmarksTree.fromJSON(json);
```

##### `fromDOM(dom: HTMLDocument): BookmarksTree`

DOM ドキュメントからツリーを作成します。

```typescript
const dom = new DOMParser().parseFromString(htmlContent, "text/html");
const tree = BookmarksTree.fromDOM(dom);
```

#### Map インターフェース

`BookmarksTree`は`Map`を拡張しているため、すべての標準 Map メソッドを使用できます：

```typescript
// ブックマークとフォルダを設定
tree.set("bookmark", "https://example.com");
tree.set("folder", new BookmarksTree());

// 値を取得
const url = tree.get("bookmark"); // string
const folder = tree.get("folder"); // BookmarksTree

// 存在確認
tree.has("bookmark"); // true

// アイテムを削除
tree.delete("bookmark");

// 繰り返し処理
for (const [name, value] of tree) {
	if (typeof value === "string") {
		console.log(`ブックマーク: ${name} -> ${value}`);
	} else {
		console.log(`フォルダ: ${name} (${value.size} アイテム)`);
	}
}
```

## プロジェクト構造

```
src/
├── BookmarksTree/
│   ├── BookmarksTree.ts      # メインブックマークツリークラス
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
- **Chrome エクスポート形式**: Chrome ブラウザからエクスポートされた HTML ファイル
- **Firefox エクスポート形式**: Firefox ブラウザからエクスポートされた HTML ファイル
- **Safari エクスポート形式**: Safari ブラウザからエクスポートされた HTML ファイル
- **Edge エクスポート形式**: Microsoft Edge からエクスポートされた HTML ファイル
- **汎用 HTML**: Netscape ブックマーク構造に従った任意の HTML

### 出力形式

- **JSON**: プログラムからの簡単なアクセスのための構造化 JSON データ
- **HTML**: 全ブラウザ互換の標準 Netscape Bookmark File Format
- **DOM**: ブラウザ互換の HTMLDocument オブジェクト

### 特別な機能

- **Unicode 対応**: 国際文字と絵文字のフルサポート
- **URL 検証**: 様々な URL 形式（http、https、ftp、file、相対）の処理
- **HTML エンティティ処理**: HTML エンティティの適切なエスケープ・アンエスケープ
- **空フォルダサポート**: ブックマーク構造内の空フォルダを保持
- **重複処理**: 重複するブックマーク名は最後の値が優先

## 出力例

### JSON 形式

```json
{
	"開発": {
		"MDN": "https://developer.mozilla.org",
		"ツール": {
			"GitHub": "https://github.com",
			"Stack Overflow": "https://stackoverflow.com"
		}
	},
	"Google": "https://google.com"
}
```

### HTML 形式

```html
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<HTML>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmark</TITLE>
<H1>Bookmark</H1>
<BODY>
<DL><p>
    <DT><H3>開発</H3>
    <DL><p>
        <DT><A HREF="https://developer.mozilla.org">MDN</A>
        <DT><H3>ツール</H3>
        <DL><p>
            <DT><A HREF="https://github.com">GitHub</A>
            <DT><A HREF="https://stackoverflow.com">Stack Overflow</A>
        </DL><p>
    </DL><p>
    <DT><A HREF="https://google.com">Google</A>
</DL>
</BODY>
</HTML>
```

## 依存関係

- [`@b-fuze/deno-dom`](https://jsr.io/@b-fuze/deno-dom): Deno と Node.js 環境の両方での DOM 解析・操作

## 開発

### 前提条件

- [Deno](https://deno.land/) 1.x 以降

### セットアップ

```bash
git clone https://github.com/grakeice/netscape-bookmark-parser.git
cd netscape-bookmark-parser
```

### 開発コマンド

```bash
# ファイル監視付きの開発サーバーを実行
deno task dev

# 全テストを実行
deno test

# カバレッジ付きテストを実行
deno test --coverage

# コードをフォーマット
deno fmt

# コードをリント
deno lint

# Node.js用にビルド
deno task build:npm

# 特定のバージョンでビルド
deno task build:npm 1.0.0
```

### テストの実行

プロジェクトには全機能の包括的なテストスイートが含まれています：

```bash
# 全テストを実行
deno test

# 特定のテストファイルを実行
deno test src/BookmarksTree/BookmarksTree.test.ts

# 詳細出力でテストを実行
deno test --verbose

# テストを実行してカバレッジレポートを生成
deno test --coverage=coverage_dir
deno coverage coverage_dir
```

### パブリッシュ

プロジェクトは GitHub Actions による自動パブリッシュを使用しています：

1. バージョンタグを作成: `git tag v1.0.0`
2. タグをプッシュ: `git push origin v1.0.0`
3. GitHub Actions が自動的にビルドして NPM と JSR の両方にパブリッシュ

## ブラウザ互換性

### エクスポートファイル対応ブラウザ

- **Chrome/Chromium**: 全バージョン
- **Firefox**: 全バージョン
- **Safari**: 全バージョン
- **Microsoft Edge**: 全バージョン
- **Opera**: 全バージョン
- **Internet Explorer**: 6+（レガシーサポート）

### エクスポートファイルの例

ライブラリは以下からエクスポートされたブックマークファイルを解析できます：

```html
<!-- Chrome/Edge形式 -->
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!--This is an automatically generated file.-->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    <DT><H3 ADD_DATE="1640995200">ブックマークバー</H3>
    <DL><p>
        <DT><A HREF="https://example.com" ADD_DATE="1640995200">例</A>
    </DL><p>
</DL>

<!-- Firefox形式 -->
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>ブックマークメニュー</H1>
<DL><p>
    <DT><H3>ブックマークツールバー</H3>
    <DL><p>
        <DT><A HREF="https://example.com">例のサイト</A>
    </DL><p>
</DL>
```

## エラーハンドリング

ライブラリは様々なエラー条件を適切に処理します：

```typescript
// 無効なHTML
const invalidHtml =
	"<html><body>ブックマークファイルではありません</body></html>";
const tree = BookmarksParser.parse(invalidHtml);
console.log(tree.size); // 0 - 空のツリー

// 空のコンテンツ
const emptyTree = BookmarksParser.parse("");
console.log(emptyTree.size); // 0

// 不正なURLはスキップされる
const htmlWithBadUrls = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<HTML><BODY><DL><p>
    <DT><A HREF="">空のURL</A>
    <DT><A>HREF属性なし</A>
    <DT><A HREF="https://valid.com">有効なリンク</A>
</DL><p></BODY></HTML>`;

const parsedTree = BookmarksParser.parse(htmlWithBadUrls);
console.log(parsedTree.size); // 1 - 有効なリンクのみ含まれる
```

## パフォーマンス

ライブラリはパフォーマンスに最適化されています：

- **メモリ効率**: O(1)検索のためのネイティブ Map 構造を使用
- **ストリーミング対応**: 大きなブックマークファイル（1000+ブックマーク）を処理可能
- **高速解析**: 効率的なツリー走査を伴う DOM ベース解析
- **JSON 変換**: 最適化されたシリアライゼーション/デシリアライゼーション

## TypeScript サポート

完全な TypeScript 定義が含まれています：

```typescript
interface BookmarkValue extends Map<string, string | BookmarksTree> {
	toJSON(): Record<string, unknown>;
	toDOM(): HTMLDocument;
	readonly HTMLText: string;
}

class BookmarksParser {
	static parse(htmlContent: string): BookmarksTree;
}

class BookmarksTree extends Map<string, string | BookmarksTree> {
	toJSON(): Record<string, unknown>;
	static fromJSON(json: Record<string, unknown>): BookmarksTree;
	static fromDOM(dom: HTMLDocument): BookmarksTree;
	toDOM(): HTMLDocument;
	get HTMLText(): string;
}
```

## ライセンス

MIT License - 詳細は[LICENSE](LICENSE)ファイルを参照してください。

## コントリビューション

プルリクエストとイシューレポートを歓迎します！

### コントリビューション方法

1. このリポジトリをフォーク
2. 機能ブランチを作成（`git checkout -b feature/amazing-feature`）
3. テストと共に変更を実装
4. 全テストが通ることを確認（`deno test`）
5. コードをフォーマット（`deno fmt`）
6. 変更をコミット（`git commit -m 'Add some amazing feature'`）
7. ブランチにプッシュ（`git push origin feature/amazing-feature`）
8. プルリクエストを作成

### イシューの報告

イシューを報告する際は、以下を含めてください：

- ブラウザ/環境情報
- サンプルブックマーク HTML（該当する場合）
- 期待される動作と実際の動作
- 再現手順

## 作者

**grakeice**

- GitHub: [@grakeice](https://github.com/grakeice)

## 変更履歴

### v1.1.3（最新）

- 📝 **JSDoc コメント追加**: 主要なクラス・メソッドに JSDoc 形式のコメントを追加し、型情報と API 自動ドキュメント生成を強化
- 📚 **ドキュメント更新**: インストール手順（Node.js/npm）に TypeScript でのインポート例を追加

### v1.1.2

- 📝 **ドキュメント強化**: 最新バージョン参照と改善された例を含む包括的な README ドキュメントの更新
- 🔧 **バージョン一貫性**: 全ドキュメントとコード例でのバージョン番号の同期
- 📚 **コンテンツ更新**: より明確性のためのインストール手順、使用例、API ドキュメントの改良

### v1.1.1

- 🛡️ **セキュリティ強化**: [`BookmarksTree.prototype.HTMLText`](src/BookmarksTree/BookmarksTree.ts) がブックマークのタイトルと URL の HTML エンティティを適切にエスケープするように修正
- 🔧 **コード一貫性**: Node.js とブラウザ版間で HTML エスケープ動作を統一
- 📝 **ドキュメント更新**: セキュリティ考慮事項を含む API ドキュメントの強化
- 🐛 **バグ修正**: マイナーな安定性改善とエッジケース処理

### v1.1.0

- 🌐 **ブラウザサポート**: ブラウザ環境用の Web 最適化版を追加
- 📦 **デュアルエントリーポイント**: Node.js/Deno 用（`./mod.ts`）とブラウザ用（`./mod_web.ts`）の分離ビルド
- ⚡ **ネイティブ DOM API**: ブラウザ版はネイティブ DOMParser と DOM API を使用してパフォーマンス向上
- 🔧 **ビルド最適化**: ブラウザ互換性のためのポリフィル除去を含む強化されたビルドプロセス
- 📚 **ドキュメント更新**: ブラウザ使用例と API リファレンスを追加

### v1.0.1

- ✨ **コア機能**: 完全な HTML ブックマークファイル解析機能
- 🏗️ **BookmarksTree クラス**: Map インターフェースを持つ階層構造管理
- 🔄 **双方向変換**: JSON ↔ HTML ↔ DOM 変換サポート
- 🧪 **包括的テスト**: エッジケースハンドリングを含む完全なテストカバレッジ
- 📦 **マルチランタイムサポート**: ネイティブ Deno と Node.js 互換性
- 🔧 **TypeScript サポート**: 完全な型定義と IntelliSense
- 🤖 **CI/CD パイプライン**: GitHub Actions による自動テストと公開
- 📚 **ドキュメント**: 例と API リファレンスを含む包括的な README
- 🌐 **国際化サポート**: Unicode と多言語ブックマークハンドリング
- ⚡ **パフォーマンス最適化**: 大規模ブックマークコレクションの効率的解析
- 🛡️ **エラーハンドリング**: 不正な HTML と無効な URL の適切な処理

### v0.0.1-pre4

- 初期のプレリリース版
- コア機能の概念実証
- 基本的な解析実装
- 初期テスト設定
