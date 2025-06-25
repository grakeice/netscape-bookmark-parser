/**
 * Copyright (c) 2025 grakeice
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import type { HTMLDocument } from "../deps.js";
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
export declare class BookmarksParser {
    /**
     * Alias for the {@link parseFromHTMLString} method.
     *
     * @param htmlString HTML string in Netscape Bookmark format
     * @returns The parsed BookmarksTree
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
    static parse(htmlString: string): BookmarksTree;
    /**
     * Parses a Netscape Bookmark format HTML string and returns a BookmarksTree.
     *
     * @param htmlString HTML string in Netscape Bookmark format
     * @returns The parsed BookmarksTree
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
     * const tree = BookmarksParser.parseFromHTMLString(bookmarkHtml);
     * ```
     */
    static parseFromHTMLString(htmlString: string): BookmarksTree;
    /**
     * Creates a BookmarksTree from an existing HTMLDocument.
     *
     * This is an alias for {@link BookmarksTree.fromDOM}.
     *
     * Use this when you already have a parsed HTMLDocument and want to convert it to a BookmarksTree.
     *
     * @param dom An HTMLDocument instance
     * @returns The parsed BookmarksTree
     *
     * @example
     * ```typescript
     * const dom = new DOMParser().parseFromString(bookmarkHtml, "text/html");
     * const tree = BookmarksParser.parseFromDOM(dom);
     * ```
     */
    static parseFromDOM(dom: HTMLDocument): BookmarksTree;
    /**
     * Parses a JSON string and returns a BookmarksTree.
     *
     * @param jsonString JSON string representing the bookmark structure
     * @returns The parsed BookmarksTree
     *
     * @example
     * ```typescript
     * const json = '{"Google":"https://google.com","Development":{"GitHub":"https://github.com"}}';
     * const tree = BookmarksParser.parseFromJSONString(json);
     * ```
     */
    static parseFromJSONString(jsonString: string): BookmarksTree;
    /**
     * Parses a JSON object and returns a BookmarksTree.
     *
     * This is an alias for {@link BookmarksTree.fromJSON}.
     *
     * @param jsonObj JSON object representing the bookmark structure
     * @returns The parsed BookmarksTree
     *
     * @example
     * ```typescript
     * const obj = { "Google": "https://google.com", "Development": { "GitHub": "https://github.com" } };
     * const tree = BookmarksParser.parseFromJSON(obj);
     * ```
     */
    static parseFromJSON(jsonObj: Record<string, unknown>): BookmarksTree;
}
//# sourceMappingURL=BookmarksParser.d.ts.map