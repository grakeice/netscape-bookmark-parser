/**
 * Copyright (c) 2025 grakeice
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { DOMParser, Element, type HTMLDocument } from "../../deps/jsr.io/@b-fuze/deno-dom/0.1.49/deno-dom-wasm.js";

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
		const document = new DOMParser().parseFromString(
			`<!DOCTYPE NETSCAPE-Bookmark-file-1>
<HTML>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmark</TITLE>
<H1>Bookmark</H1>
</HTML>`,
			"text/html"
		);
		const body = document.body;

		const createBookmarkList = (tree: BookmarksTree): Element => {
			const dl = document.createElement("DL");
			dl.innerHTML = "<p>";

			for (const [key, value] of tree.entries()) {
				const dt = document.createElement("DT");

				if (typeof value === "string") {
					// ブックマークの場合: <DT><A HREF="url">タイトル</A>
					const anchor = document.createElement("A");
					anchor.setAttribute("HREF", value);
					anchor.textContent = key;
					dt.appendChild(anchor);
				} else if (value instanceof BookmarksTree) {
					// フォルダの場合: <DT><H3>フォルダ名</H3>
					const h3 = document.createElement("H3");
					h3.textContent = key;
					dt.appendChild(h3);

					// フォルダの内容をDLとして追加
					const folderDL = createBookmarkList(value);
					dl.appendChild(dt);
					dl.appendChild(folderDL);
					continue;
				}

				dl.appendChild(dt);
			}

			const p = document.createElement("p");
			dl.appendChild(p);

			return dl;
		};

		// ルートレベルのブックマークリストを作成
		const rootDL = createBookmarkList(this);
		body.appendChild(rootDL);

		return document;
	}
}
