import type { Element } from "../element.js";
import type { Document } from "../document.js";
export declare const DOM: (doc: Document) => {
    first(selector: string, context: Element | Document): Element | null;
    match(selector: string, context: Element | Document): boolean;
    select(selector: string, context: Element | Document): Element[];
};
//# sourceMappingURL=sizzle-types.d.ts.map