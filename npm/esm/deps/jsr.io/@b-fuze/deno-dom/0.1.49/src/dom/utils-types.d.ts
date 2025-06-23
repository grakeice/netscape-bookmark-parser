import type { Element } from "./element.js";
import type { Document } from "./document.js";
import type { DocumentFragment } from "./document-fragment.js";
/**
 * Ugly solution to circular imports... FIXME: Make this better
 */
declare const _default: {
    Element: typeof Element;
    Document: typeof Document;
    DocumentFragment: typeof DocumentFragment;
};
export default _default;
//# sourceMappingURL=utils-types.d.ts.map