/**
 * Copyright (c) 2025 grakeice
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { DOMParser, type Element, type HTMLDocument } from "../../deps/jsr.io/@b-fuze/deno-dom/0.1.49/deno-dom-wasm.js";

export class BookmarksTree extends Map<string, string | BookmarksTree> {
	constructor() {
		super();
	}

	toJSON(): Record<string, unknown> {
		const json: Record<string, unknown> = {};

		for (const [key, value] of this.entries()) {
			if (typeof value === "string") {
				json[key] = value;
			} else if (value instanceof BookmarksTree) {
				json[key] = value.toJSON();
			}
		}

		return json;
	}

	static fromJSON(json: Record<string, unknown>): BookmarksTree {
		const tree = new BookmarksTree();

		if (typeof json === "object" && json !== null) {
			for (const [key, value] of Object.entries(json)) {
				if (typeof value === "string") {
					tree.set(key, value);
				} else if (typeof value === "object" && value !== null) {
					tree.set(
						key,
						BookmarksTree.fromJSON(value as Record<string, unknown>)
					);
				}
			}
		}

		return tree;
	}

	static fromDOM(dom: HTMLDocument): BookmarksTree {
		const tree = new BookmarksTree();
		const document = dom;

		const processElement = (element: Element, currentTree: BookmarksTree) => {
			const children = Array.from(element.children);

			for (let i = 0; i < children.length; i++) {
				const child = children[i];

				if (child.tagName === "DT") {
					const h3 = child.querySelector("h3");
					const link = child.querySelector("a");

					if (h3) {
						// フォルダの場合
						const folderName = h3.textContent?.trim() || "";
						if (folderName) {
							const folderTree = new BookmarksTree();
							currentTree.set(folderName, folderTree);
							processElement(child, folderTree);
						}
					} else if (link) {
						// リンクの場合
						const href = link.getAttribute("href");
						const title = link.textContent?.trim() || "";
						if (href && title) {
							currentTree.set(title, href);
						}
					}
				} else if (child.tagName === "DL") {
					// ネストしたDLタグの場合も処理
					processElement(child, currentTree);
				}
			}
		};

		// HTMLのBODY全体から処理を開始
		const body = document.body;
		if (body) {
			processElement(body, tree);
		}

		return tree;
	}

	toDOM(): HTMLDocument {
		return new DOMParser().parseFromString(this.HTMLText, "text/html");
	}

	get HTMLText(): string {
		const createBookmarkList = (
			tree: BookmarksTree,
			indent: string = ""
		): string => {
			let html = `${indent}<DL><p>\n`;

			for (const [key, value] of tree.entries()) {
				if (typeof value === "string") {
					// ブックマークの場合: <DT><A HREF="url">タイトル</A>
					html += `${indent}    <DT><A HREF="${value}">${key}</A>\n`;
				} else if (value instanceof BookmarksTree) {
					// フォルダの場合: <DT><H3>フォルダ名</H3>
					html += `${indent}    <DT><H3>${key}</H3>\n`;
					html += createBookmarkList(value, indent + "    ");
					html += `${indent}    </DL><p>\n`;
				}
			}

			if (indent === "") {
				// ルートレベルの場合は閉じタグを追加
				html += `</DL>\n`;
			}

			return html;
		};

		const htmlTemplate = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<HTML>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmark</TITLE>
<H1>Bookmark</H1>
<BODY>
${createBookmarkList(this)}</BODY>
</HTML>`;
		return htmlTemplate;
	}
}
