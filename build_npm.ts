/**
 * Copyright (c) 2025 grakeice
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
	entryPoints: ["./mod.ts"], // Denoで実装したモジュールのエントリーポイント
	outDir: "./npm", // 出力先のディレクトリ
	shims: { deno: true }, // Deno名前空間などDeno独自の実装をNode.jsやブラウザで実行できるshimに置き換える設定
	typeCheck: false, // 型チェックを無効化
	test: false,
	package: {
		// package.jsonの内容
		name: "netscape-bookmark-parser",
		version: Deno.args[0],
		author: "grakeice",
		license: "MIT",
		repository: "https://github.com/grakeice/netscape-bookmark-parser",
	},
	postBuild() {
		// steps to run after building and before running the tests
		Deno.copyFileSync("LICENSE", "npm/LICENSE");
		Deno.copyFileSync("README.md", "npm/README.md");
		Deno.copyFileSync("README-ja.md", "npm/README-ja.md");
	},
	scriptModule: false,
});
