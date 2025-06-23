import { CTOR_KEY } from "../constructor-lock.js";
import { nodesFromString } from "../deserialize.js";
import { DocumentType, HTMLDocument } from "./document.js";
import type { Element } from "./element.js";

export type DOMParserMimeType =
  | "text/html"
  | "text/xml"
  | "application/xml"
  | "application/xhtml+xml"
  | "image/svg+xml";

export class DOMParser {
  parseFromString(
    source: string,
    mimeType: DOMParserMimeType,
  ): HTMLDocument {
    if (mimeType !== "text/html") {
      throw new Error(`DOMParser: "${mimeType}" unimplemented`); // TODO
    }

    const doc = new HTMLDocument(CTOR_KEY);

    const fakeDoc = nodesFromString(source);
    let htmlNode: Element | null = null;
    let hasDoctype = false;

    for (const child of [...fakeDoc.childNodes]) {
      doc.appendChild(child);

      if (child instanceof DocumentType) {
        hasDoctype = true;
      } else if (child.nodeName === "HTML") {
        htmlNode = <Element> child;
      }
    }

    if (!hasDoctype) {
      const docType = new DocumentType("html", "", "", CTOR_KEY);
      // doc.insertBefore(docType, doc.firstChild);
      if (doc.childNodes.length === 0) {
        doc.appendChild(docType);
      } else {
        doc.insertBefore(docType, doc.childNodes[0]);
      }
    }

    if (htmlNode) {
      for (const child of htmlNode.childNodes) {
        switch ((<Element> child).tagName) {
          case "HEAD":
            doc.head = <Element> child;
            break;
          case "BODY":
            doc.body = <Element> child;
            break;
        }
      }
    }

    return doc;
  }
}
