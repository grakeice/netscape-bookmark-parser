import { Node } from "../node.js";
import { Element } from "../element.js";
import { Document } from "../document.js";
import { DocumentFragment } from "../document-fragment.js";
import { CTOR_KEY } from "../../constructor-lock.js";
export declare class HTMLTemplateElement extends Element {
    #private;
    /**
     * This blocks access to the .#contents property when the
     * super() constructor is running which invokes (our
     * overridden) _setParent() method. Without it, we get
     * the following error thrown:
     *
     *   TypeError: Cannot read private member #content from
     *   an object whose class did not declare it
     *
     * FIXME: Maybe find a cleaner way to do this
     */
    private __contentIsSet;
    constructor(parentNode: Node | null, attributes: [string, string][], key: typeof CTOR_KEY, content: DocumentFragment);
    get content(): DocumentFragment;
    _setOwnerDocument(document: Document | null): void;
    _shallowClone(): HTMLTemplateElement;
    cloneNode(deep?: boolean): HTMLTemplateElement;
    get innerHTML(): string;
    set innerHTML(html: string);
    get outerHTML(): string;
}
//# sourceMappingURL=html-template-element.d.ts.map