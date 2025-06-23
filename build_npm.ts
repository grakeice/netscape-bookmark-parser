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
	package: {
		// package.jsonの内容
		name: "bookmark-file-parser",
		version: Deno.args[0],
		author: "grakeice",
		license: "MIT",
	},
	postBuild() {
		// steps to run after building and before running the tests
		Deno.copyFileSync("LICENSE", "npm/LICENSE");
		Deno.copyFileSync("README.md", "npm/README.md");
	},
	scriptModule: false,
});
