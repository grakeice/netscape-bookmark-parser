/**
 * Copyright (c) 2025 grakeice
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
	entryPoints: [
		{
			name: ".",
			path: "./mod.ts",
		},
		{
			name: "./web",
			path: "./mod_web.ts",
		},
	], // Denoで実装したモジュールのエントリーポイント
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
		keywords: ["bookmark", "parser", "netscape"],
	},
	postBuild() {
		// ライセンスとREADMEをコピー
		Deno.copyFileSync("LICENSE", "npm/LICENSE");
		Deno.copyFileSync("README.md", "npm/README.md");
		Deno.copyFileSync("README-ja.md", "npm/README-ja.md");

		// mod_web.d.ts から polyfills import を削除
		const modWebDtsPath = "npm/esm/mod_web.d.ts";
		try {
			const content = Deno.readTextFileSync(modWebDtsPath);
			const modifiedContent = content.replace(
				/import "\.\/_dnt\.polyfills\.js";\n?/g,
				""
			);
			Deno.writeTextFileSync(modWebDtsPath, modifiedContent);
			console.log("✅ Removed polyfills import from mod_web.d.ts");
		} catch (error) {
			console.warn(
				"⚠️ Could not modify mod_web.d.ts:",
				error instanceof Error ? error.message : String(error)
			);
		}

		// mod_web.js からも削除（存在する場合）
		const modWebJsPath = "npm/esm/mod_web.js";
		try {
			const content = Deno.readTextFileSync(modWebJsPath);
			const modifiedContent = content.replace(
				/import "\.\/_dnt\.polyfills\.js";\n?/g,
				""
			);
			Deno.writeTextFileSync(modWebJsPath, modifiedContent);
			console.log("✅ Removed polyfills import from mod_web.js");
		} catch (error) {
			console.warn(
				"⚠️ Could not modify mod_web.js:",
				error instanceof Error ? error.message : String(error)
			);
		}
	},
	scriptModule: false,
});
