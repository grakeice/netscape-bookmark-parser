/**
 * Copyright (c) 2025 grakeice
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { DOMParser } from "../deps.js";
import { BookmarksTree } from "../BookmarksTree/index.js";
/**
 * A parser for Netscape Bookmark format files
 *
 * This class provides static methods to parse Netscape Bookmark format HTML strings
 * and convert them into BookmarksTree instances for easier manipulation.
 *
 * @example
 * ```typescript
 * const bookmarkHtml = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
 * <HTML>
 * <BODY>
 * <DL><p>
 *     <DT><A HREF="https://google.com">Google</A>
 *     <DT><H3>Development</H3>
 *     <DL><p>
 *         <DT><A HREF="https://github.com">GitHub</A>
 *     </DL><p>
 * </DL>
 * </BODY>
 * </HTML>`;
 *
 * const tree = BookmarksParser.parse(bookmarkHtml);
 * ```
 */
export class BookmarksParser {
    /**
     * Parses a Netscape Bookmark format HTML string into a BookmarksTree
     *
     * Takes an HTML string in Netscape Bookmark format and converts it into a structured
     * BookmarksTree that preserves the hierarchical organization of folders and bookmarks.
     *
     * @param data The HTML string in Netscape Bookmark format to parse
     * @returns A BookmarksTree representing the parsed bookmark structure
     *
     * @example
     * ```typescript
     * const bookmarkHtml = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
     * <HTML>
     * <BODY>
     * <DL><p>
     *     <DT><A HREF="https://google.com">Google</A>
     *     <DT><H3>Development</H3>
     *     <DL><p>
     *         <DT><A HREF="https://github.com">GitHub</A>
     *     </DL><p>
     * </DL>
     * </BODY>
     * </HTML>`;
     *
     * const tree = BookmarksParser.parse(bookmarkHtml);
     * console.log(tree.get("Google")); // "https://google.com"
     *
     * const folder = tree.get("Development");
     * console.log(folder.get("GitHub")); // "https://github.com"
     * ```
     */
    static parse(data) {
        const dom = new DOMParser().parseFromString(data, "text/html");
        const tree = BookmarksTree.fromDOM(dom);
        return tree;
    }
}
