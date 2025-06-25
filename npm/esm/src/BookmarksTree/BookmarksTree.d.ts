/**
 * Copyright (c) 2025 grakeice
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { type HTMLDocument } from "../deps.js";
/**
 * A class representing a bookmark tree in Netscape Bookmark format
 *
 * This class extends Map and manages folders (BookmarksTree) and bookmarks (URL strings)
 * in a hierarchical structure.
 *
 * @example
 * ```typescript
 * const tree = new BookmarksTree();
 * tree.set("Google", "https://google.com");
 *
 * const folder = new BookmarksTree();
 * folder.set("GitHub", "https://github.com");
 * tree.set("Development", folder);
 * ```
 */
export declare class BookmarksTree extends Map<string, string | BookmarksTree> {
    /**
     * Creates a new BookmarksTree instance
     */
    constructor();
    /**
     * Converts the BookmarksTree to a JSON object
     *
     * Folders are recursively converted to objects, and bookmarks are preserved as strings.
     *
     * @returns JSON object representation of the bookmark data
     *
     * @example
     * ```typescript
     * const tree = new BookmarksTree();
     * tree.set("Google", "https://google.com");
     * const json = tree.toJSON();
     * // { "Google": "https://google.com" }
     * ```
     */
    toJSON(): Record<string, unknown>;
    /**
     * Creates a BookmarksTree from a JSON object
     *
     * String properties are treated as bookmarks, and object properties are
     * recursively processed as folders.
     *
     * @param json The source JSON object to convert
     * @returns A new BookmarksTree instance
     *
     * @example
     * ```typescript
     * const json = { "Google": "https://google.com", "Development": { "GitHub": "https://github.com" } };
     * const tree = BookmarksTree.fromJSON(json);
     * ```
     */
    static fromJSON(json: Record<string, unknown>): BookmarksTree;
    /**
     * Creates a BookmarksTree from an HTML document (Netscape Bookmark format)
     *
     * Parses Netscape Bookmark format HTML and generates a BookmarksTree that preserves
     * the hierarchical structure. H3 elements within DT elements are treated as folders,
     * and A elements are treated as bookmarks.
     *
     * @param dom The HTML document to parse
     * @returns A new BookmarksTree instance
     *
     * @example
     * ```typescript
     * const parser = new DOMParser();
     * const dom = parser.parseFromString(bookmarkHtml, "text/html");
     * const tree = BookmarksTree.fromDOM(dom);
     * ```
     */
    static fromDOM(dom: HTMLDocument): BookmarksTree;
    /**
     * Converts the BookmarksTree to an HTML document
     *
     * Generates an HTML document in Netscape Bookmark format.
     *
     * @returns HTML document in Netscape Bookmark format
     *
     * @example
     * ```typescript
     * const tree = new BookmarksTree();
     * tree.set("Google", "https://google.com");
     * const dom = tree.toDOM();
     * ```
     */
    toDOM(): HTMLDocument;
    /**
     * Gets the BookmarksTree as an HTML string in Netscape Bookmark format
     *
     * Generates a complete HTML document string including DOCTYPE, metadata, and body
     * in Netscape Bookmark format.
     *
     * @returns HTML string in Netscape Bookmark format
     *
     * @example
     * ```typescript
     * const tree = new BookmarksTree();
     * tree.set("Google", "https://google.com");
     * const html = tree.HTMLText;
     * console.log(html); // <!DOCTYPE NETSCAPE-Bookmark-file-1>...
     * ```
     */
    get HTMLText(): string;
}
//# sourceMappingURL=BookmarksTree.d.ts.map