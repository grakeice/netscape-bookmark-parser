/**
 * Copyright (c) 2025 grakeice
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { DOMParser } from "@b-fuze/deno-dom";
import { BookmarksTree } from "../BookmarksTree/index.ts";

export class Parser {
	static parse(data: string): BookmarksTree {
		const dom = new DOMParser().parseFromString(data, "text/html");
		const tree = BookmarksTree.fromDOM(dom);
		return tree;
	}
}
