/**
 * Copyright (c) 2025 grakeice
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { type HTMLDocument } from "../../deps/jsr.io/@b-fuze/deno-dom/0.1.49/deno-dom-wasm.js";
export declare class BookmarksTree extends Map<string, string | BookmarksTree> {
    constructor();
    toJSON(): Record<string, unknown>;
    static fromJSON(json: Record<string, unknown>): BookmarksTree;
    static fromDOM(dom: HTMLDocument): BookmarksTree;
    toDOM(): HTMLDocument;
    get HTMLText(): string;
}
//# sourceMappingURL=BookmarksTree.d.ts.map