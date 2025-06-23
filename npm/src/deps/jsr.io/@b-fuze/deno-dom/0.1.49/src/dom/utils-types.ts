import type { Element } from "./element.js";
import type { Document } from "./document.js";
import type { DocumentFragment } from "./document-fragment.js";

/**
 * Ugly solution to circular imports... FIXME: Make this better
 */
export default {
  Element: null as any as typeof Element,
  Document: null as any as typeof Document,
  DocumentFragment: null as any as typeof DocumentFragment,
};
