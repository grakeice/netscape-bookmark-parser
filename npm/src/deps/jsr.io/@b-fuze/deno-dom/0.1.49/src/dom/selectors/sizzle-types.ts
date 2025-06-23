import Sizzle from "./sizzle.js";
import type { Element } from "../element.js";
import type { Document } from "../document.js";

export const DOM: (doc: Document) => {
  first(
    selector: string,
    context: Element | Document,
  ): Element | null;
  match(
    selector: string,
    context: Element | Document,
  ): boolean;
  select(
    selector: string,
    context: Element | Document,
  ): Element[];
} = Sizzle as any;
