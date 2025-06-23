var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HTMLTemplateElement_content;
import { Element } from "../element.js";
import { DocumentFragment } from "../document-fragment.js";
import { getElementAttributesString, getOuterOrInnerHtml } from "../utils.js";
import { fragmentNodesFromString } from "../../deserialize.js";
import { CTOR_KEY } from "../../constructor-lock.js";
export class HTMLTemplateElement extends Element {
    constructor(parentNode, attributes, key, content) {
        super("TEMPLATE", parentNode, attributes, key);
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
        Object.defineProperty(this, "__contentIsSet", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        _HTMLTemplateElement_content.set(this, null);
        __classPrivateFieldSet(this, _HTMLTemplateElement_content, content, "f");
        this.__contentIsSet = true;
    }
    get content() {
        return __classPrivateFieldGet(this, _HTMLTemplateElement_content, "f");
    }
    _setOwnerDocument(document) {
        super._setOwnerDocument(document);
        if (this.__contentIsSet) {
            this.content._setOwnerDocument(document);
        }
    }
    _shallowClone() {
        const frag = new DocumentFragment();
        const attributes = this
            .getAttributeNames()
            .map((name) => [name, this.getAttribute(name)]);
        return new HTMLTemplateElement(null, attributes, CTOR_KEY, frag);
    }
    cloneNode(deep = false) {
        const newNode = super.cloneNode(deep);
        if (deep) {
            const destContent = newNode.content;
            for (const child of this.content.childNodes) {
                destContent.appendChild(child.cloneNode(deep));
            }
        }
        return newNode;
    }
    get innerHTML() {
        return getOuterOrInnerHtml(this, false);
    }
    // Replace children in the `.content`
    set innerHTML(html) {
        const content = this.content;
        // Remove all children
        for (const child of content.childNodes) {
            child._setParent(null);
        }
        const mutator = content._getChildNodesMutator();
        mutator.splice(0, content.childNodes.length);
        // Parse HTML into new children
        if (html.length) {
            const parsed = fragmentNodesFromString(html, this.localName);
            mutator.push(...parsed.childNodes[0].childNodes);
            for (const child of content.childNodes) {
                child._setParent(content);
                child._setOwnerDocument(content.ownerDocument);
            }
        }
    }
    get outerHTML() {
        return `<template${getElementAttributesString(this)}>${this.innerHTML}</template>`;
    }
}
_HTMLTemplateElement_content = new WeakMap();
