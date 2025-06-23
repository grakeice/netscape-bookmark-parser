/**
 * Copyright (c) 2025 grakeice
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { DOMParser } from "../../deps/jsr.io/@b-fuze/deno-dom/0.1.49/deno-dom-wasm.js";
import { BookmarksTree } from "../BookmarksTree/index.js";

export class Parser {
	static parse(data: string): BookmarksTree {
		const dom = new DOMParser().parseFromString(data, "text/html");
		const tree = BookmarksTree.fromDOM(dom);
		return tree;
	}
}
