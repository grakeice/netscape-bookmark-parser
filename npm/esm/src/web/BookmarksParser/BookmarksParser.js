/**
 * Copyright (c) 2025 grakeice
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { DOMParser } from "../deps.js";
import { BookmarksTree } from "../BookmarksTree/index.js";
export class BookmarksParser {
    static parse(data) {
        const dom = new DOMParser().parseFromString(data, "text/html");
        const tree = BookmarksTree.fromDOM(dom);
        return tree;
    }
}
