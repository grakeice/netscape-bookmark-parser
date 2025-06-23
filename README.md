<!--
 Copyright (c) 2025 grakeice
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# Bookmark File Parser

A TypeScript/JavaScript library for parsing browser bookmark files (HTML format) and manipulating them as structured data. Compatible with both Deno and Node.js runtimes.

## Features

- **HTML Bookmark File Parsing**: Parse exported HTML bookmark files from Chrome, Firefox, Safari, and other browsers
- **Hierarchical Structure Preservation**: Completely preserve the hierarchical structure of folders and bookmarks
- **Bidirectional Conversion**: Support conversion from HTML to data structure and vice versa
- **JSON Serialization**: Save and restore bookmark trees as JSON
- **Deno & Node.js Support**: Works with both Deno and Node.js runtimes

## Installation

### Node.js/npm

```bash
npm install bookmark-file-parser
```

### Deno

```typescript
import { Parser, BookmarksTree } from "https://deno.land/x/bookmark_file_parser/mod.ts";
```

## Usage

### Basic Example

```typescript
import { Parser, BookmarksTree } from "bookmark-file-parser";

// Read HTML bookmark file
const htmlContent = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<HTML>
<DL><p>
    <DT><H3>Folder 1</H3>
    <DL><p>
        <DT><A HREF="https://example.com">Example</A>
    </DL><p>
    <DT><A HREF="https://google.com">Google</A>
</DL><p>
</HTML>`;

// Parse HTML and convert to BookmarksTree
const bookmarksTree = Parser.parse(htmlContent);

// Output as JSON
console.log(JSON.stringify(bookmarksTree.toJSON(), null, 2));

// Convert back to HTML
const htmlDocument = bookmarksTree.toDOM();
```

### BookmarksTree Operations

```typescript
// Create a new bookmark tree
const tree = new BookmarksTree();

// Add bookmarks
tree.set("Google", "https://google.com");
tree.set("GitHub", "https://github.com");

// Create a folder
const devFolder = new BookmarksTree();
devFolder.set("MDN", "https://developer.mozilla.org");
devFolder.set("Stack Overflow", "https://stackoverflow.com");
tree.set("Development", devFolder);

// Convert to JSON
const json = tree.toJSON();

// Restore from JSON
const restoredTree = BookmarksTree.fromJSON(json);
```

## API Reference

### Parser Class

The [`Parser`](src/Parser/Parser.ts) class provides static methods for parsing HTML bookmark files.

#### `Parser.parse(htmlContent: string): BookmarksTree`

Parses HTML bookmark file content and returns a [`BookmarksTree`](src/BookmarksTree/BookmarksTree.ts) instance.

- **Parameter**: `htmlContent` - HTML bookmark file as string
- **Returns**: Parsed bookmark tree

### BookmarksTree Class

[`BookmarksTree`](src/BookmarksTree/BookmarksTree.ts) is a class that extends `Map<string, string | BookmarksTree>` to represent the hierarchical structure of bookmarks.

#### Methods

- **`toJSON(): Record<string, unknown>`**: Convert tree to JSON object
- **`static fromJSON(json: Record<string, unknown>): BookmarksTree`**: Restore tree from JSON
- **`static fromDOM(dom: HTMLDocument): BookmarksTree`**: Create tree from DOM
- **`toDOM(): HTMLDocument`**: Convert tree to HTML document

## Project Structure

```
src/
├── BookmarksTree/
│   ├── BookmarksTree.ts    # Main bookmark tree class
│   └── index.ts           # Export definitions
└── Parser/
    ├── Parser.ts          # HTML parser
    └── index.ts          # Export definitions
npm/                       # Node.js build artifacts
├── esm/                   # ES modules
├── package.json
└── README.md
```

## Supported Formats

### Input Formats
- **Netscape Bookmark File Format**: Standard HTML bookmark file format
- HTML files exported from Chrome, Firefox, Safari, Edge, and other browsers

### Output Formats
- **JSON**: Structured JSON data
- **HTML**: Standard Netscape Bookmark File Format

## Output Examples

### JSON Format

```json
{
  "Folder 1": {
    "Example": "https://example.com"
  },
  "Google": "https://google.com"
}
```

### HTML Format

```html
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<HTML>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmark</TITLE>
<H1>Bookmark</H1>
<BODY>
<DL><p>
    <DT><H3>Folder 1</H3>
    <DL><p>
        <DT><A HREF="https://example.com">Example</A>
    </DL><p>
    <DT><A HREF="https://google.com">Google</A>
    <p>
</DL>
</BODY>
</HTML>
```

## Dependencies

- [`@b-fuze/deno-dom`](https://jsr.io/@b-fuze/deno-dom): DOM parser and manipulation

## Development

### Setup

```bash
git clone https://github.com/grakeice/bookmark-file-parser.git
cd bookmark-file-parser
```

### Testing with Deno

```bash
deno test
```

### Build for Node.js

```bash
deno task build:npm
```

### Format

```bash
deno fmt
```

### Lint

```bash
deno lint
```

## License

MIT License - See [LICENSE](LICENSE) file for details.

## Contributing

Pull requests and issue reports are welcome.

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a pull request

## Author

grakeice

## Changelog

- v0.0.0: Initial release
  - HTML bookmark file parsing functionality
  - BookmarksTree class for hierarchical structure management
  - JSON/HTML bidirectional conversion
  - Deno & Node.js support