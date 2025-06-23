import { Node } from "./node.js";
import type { Element } from "./element.js";
import type { DocumentFragment } from "./document-fragment.js";
export declare const upperCaseCharRe: RegExp;
export declare const lowerCaseCharRe: RegExp;
/**
 * Convert JS property name to dataset attribute name without
 * validation
 */
export declare function getDatasetHtmlAttrName(name: string): `data-${string}`;
export declare function getDatasetJavascriptName(name: string): string;
export declare function getElementsByClassName(element: any, classNames: string[], search: Node[]): Node[];
/**
 * .innerHTML/.outerHTML implementation without recursion to avoid stack
 * overflows
 */
export declare function getOuterOrInnerHtml(parentElement: Element, asOuterHtml: boolean): string;
export declare function getElementAttributesString(element: Element): string;
export declare function insertBeforeAfter(node: Node, nodes: (Node | string)[], before: boolean): void;
export declare function isDocumentFragment(node: Node): node is DocumentFragment;
/**
 * Sets the new parent for the children via _setParent() on all
 * the child nodes and removes them from the DocumentFragment's
 * childNode list.
 *
 * A helper function for appendChild, etc. It should be called
 * _after_ the children are already pushed onto the new parent's
 * childNodes.
 */
export declare function moveDocumentFragmentChildren(fragment: DocumentFragment, newParent: Node): void;
//# sourceMappingURL=utils.d.ts.map