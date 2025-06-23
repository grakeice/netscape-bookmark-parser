import NWDom from "./nwsapi.js";
import type { Element } from "../element.js";
import type { Document } from "../document.js";

export const DOM: (doc: Document) => {
  ancestor(
    selector: string,
    context: Element | Document,
    callback?: (element: Element) => void,
  ): Element | null;
  first(
    selector: string,
    context: Element | Document,
    callback?: (element: Element) => void,
  ): Element | null;
  match(
    selector: string,
    context: Element | Document,
    callback?: (element: Element) => void,
  ): boolean;
  select(
    selector: string,
    context: Element | Document,
    callback?: (element: Element) => void,
  ): Element[];
  byId(id: string, from: Element | Document): Element[];
  byTag(tag: string, from: Element | Document): Element[];
  byClass(tag: string, from: Element | Document): Element[];
} = NWDom as any;
