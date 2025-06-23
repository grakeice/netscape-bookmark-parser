<!--
 Copyright (c) 2025 grakeice

 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# Netscape Bookmark Parser

> **Note:**  
> This README is an AI-generated document. Details are mostly accurate but might include inaccurate description.

A TypeScript/JavaScript library for parsing browser bookmark files (HTML format) and manipulating them as structured data. Compatible with both Deno and Node.js runtimes.

日本語ドキュメント: [`./README-ja.md`](./README-ja.md)

## Features

- **HTML Bookmark File Parsing**: Parse exported HTML bookmark files from Chrome, Firefox, Safari, and other browsers
- **Hierarchical Structure Preservation**: Completely preserve the hierarchical structure of folders and bookmarks
- **Bidirectional Conversion**: Support conversion from HTML to data structure and vice versa
- **JSON Serialization**: Save and restore bookmark trees as JSON
- **Deno & Node.js Support**: Works with both Deno and Node.js runtimes
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## Installation

### Node.js/npm

```bash
npm install netscape-bookmark-parser
```

### Deno

```typescript
import {
	BookmarksParser,
	BookmarksTree,
} from "jsr:@grakeice/netscape-bookmark-parser";
```

## Usage

### Basic Example

```typescript
import { BookmarksParser, BookmarksTree } from "netscape-bookmark-parser";

// Read HTML bookmark file
const htmlContent = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<HTML>
<BODY>
<DL><p>
    <DT><H3>Folder 1</H3>
    <DL><p>
        <DT><A HREF="https://example.com">Example</A>
    </DL><p>
    <DT><A HREF="https://google.com">Google</A>
</DL><p>
</BODY>
</HTML>`;

// Parse HTML and convert to BookmarksTree
const bookmarksTree = BookmarksParser.parse(htmlContent);

// Output as JSON
console.log(JSON.stringify(bookmarksTree.toJSON(), null, 2));

// Convert back to HTML
const htmlDocument = bookmarksTree.toDOM();
console.log(bookmarksTree.HTMLText);
```

### BookmarksTree Operations

```typescript
// Create a new bookmark tree
const tree = new BookmarksTree();

// Add bookmarks
tree.set("Google", "https://google.com");
tree.set("GitHub", "https://github.com");

// Create a folder structure
const devFolder = new BookmarksTree();
devFolder.set("MDN", "https://developer.mozilla.org");
devFolder.set("Stack Overflow", "https://stackoverflow.com");

const toolsFolder = new BookmarksTree();
toolsFolder.set("GitHub", "https://github.com");
toolsFolder.set("VS Code", "https://code.visualstudio.com");

devFolder.set("Tools", toolsFolder);
tree.set("Development", devFolder);

// Convert to JSON
const json = tree.toJSON();

// Restore from JSON
const restoredTree = BookmarksTree.fromJSON(json);

// Check tree structure
console.log(tree.size); // Number of top-level items
console.log(tree.has("Development")); // true
console.log(tree.get("Development") instanceof BookmarksTree); // true
```

### Working with Complex Structures

```typescript
// Parse a complex bookmark file
const complexHtml = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<HTML>
<BODY>
<DL><p>
    <DT><H3>Work</H3>
    <DL><p>
        <DT><H3>Development</H3>
        <DL><p>
            <DT><A HREF="https://github.com">GitHub</A>
            <DT><A HREF="https://stackoverflow.com">Stack Overflow</A>
        </DL><p>
        <DT><A HREF="https://docs.google.com">Google Docs</A>
    </DL><p>
    <DT><H3>Personal</H3>
    <DL><p>
        <DT><A HREF="https://youtube.com">YouTube</A>
        <DT><A HREF="https://twitter.com">Twitter</A>
    </DL><p>
    <DT><A HREF="https://google.com">Google</A>
</DL><p>
</BODY>
</HTML>`;

const tree = BookmarksParser.parse(complexHtml);

// Navigate the tree structure
const workFolder = tree.get("Work") as BookmarksTree;
const devFolder = workFolder.get("Development") as BookmarksTree;
console.log(devFolder.get("GitHub")); // "https://github.com"
```

## API Reference

### BookmarksParser Class

The [`BookmarksParser`](src/BookmarksParser/BookmarksParser.ts) class provides static methods for parsing HTML bookmark files.

#### `BookmarksParser.parse(htmlContent: string): BookmarksTree`

Parses HTML bookmark file content and returns a [`BookmarksTree`](src/BookmarksTree/BookmarksTree.ts) instance.

- **Parameter**: `htmlContent` - HTML bookmark file as string
- **Returns**: Parsed bookmark tree

**Example:**

```typescript
const htmlContent = "<!DOCTYPE NETSCAPE-Bookmark-file-1>...";
const tree = BookmarksParser.parse(htmlContent);
```

### BookmarksTree Class

[`BookmarksTree`](src/BookmarksTree/BookmarksTree.ts) is a class that extends `Map<string, string | BookmarksTree>` to represent the hierarchical structure of bookmarks.

#### Constructor

```typescript
const tree = new BookmarksTree();
```

#### Instance Methods

##### `toJSON(): Record<string, unknown>`

Convert tree to JSON object representation.

```typescript
const json = tree.toJSON();
console.log(JSON.stringify(json, null, 2));
```

##### `toDOM(): HTMLDocument`

Convert tree to HTML document object.

```typescript
const htmlDocument = tree.toDOM();
```

##### `get HTMLText(): string`

Get HTML string representation of the bookmark tree.

```typescript
const htmlString = tree.HTMLText;
console.log(htmlString); // Complete HTML bookmark file
```

#### Static Methods

##### `fromJSON(json: Record<string, unknown>): BookmarksTree`

Restore tree from JSON object.

```typescript
const json = { Google: "https://google.com" };
const tree = BookmarksTree.fromJSON(json);
```

##### `fromDOM(dom: HTMLDocument): BookmarksTree`

Create tree from DOM document.

```typescript
const dom = new DOMParser().parseFromString(htmlContent, "text/html");
const tree = BookmarksTree.fromDOM(dom);
```

#### Map Interface

Since `BookmarksTree` extends `Map`, you can use all standard Map methods:

```typescript
// Set bookmarks and folders
tree.set("bookmark", "https://example.com");
tree.set("folder", new BookmarksTree());

// Get values
const url = tree.get("bookmark"); // string
const folder = tree.get("folder"); // BookmarksTree

// Check existence
tree.has("bookmark"); // true

// Delete items
tree.delete("bookmark");

// Iterate
for (const [name, value] of tree) {
	if (typeof value === "string") {
		console.log(`Bookmark: ${name} -> ${value}`);
	} else {
		console.log(`Folder: ${name} (${value.size} items)`);
	}
}
```

## Project Structure

```
src/
├── BookmarksTree/
│   ├── BookmarksTree.ts      # Main bookmark tree class
│   ├── BookmarksTree.test.ts # Comprehensive tests
│   └── index.ts             # Export definitions
└── BookmarksParser/
    ├── BookmarksParser.ts    # HTML parser
    ├── BookmarksParser.test.ts # Parser tests
    └── index.ts             # Export definitions
scripts/
└── build_npm.ts             # NPM build script
.github/
└── workflows/
    └── release.yml          # CI/CD pipeline
npm/                         # Node.js build artifacts
├── esm/                     # ES modules
├── package.json
└── README.md
```

## Supported Formats

### Input Formats

- **Netscape Bookmark File Format**: Standard HTML bookmark file format
- **Chrome Export Format**: HTML files exported from Chrome browser
- **Firefox Export Format**: HTML files exported from Firefox browser
- **Safari Export Format**: HTML files exported from Safari browser
- **Edge Export Format**: HTML files exported from Microsoft Edge
- **Generic HTML**: Any HTML following the Netscape bookmark structure

### Output Formats

- **JSON**: Structured JSON data for easy programmatic access
- **HTML**: Standard Netscape Bookmark File Format compatible with all browsers
- **DOM**: Browser-compatible HTMLDocument objects

### Special Features

- **Unicode Support**: Full support for international characters and emojis
- **URL Validation**: Handles various URL formats (http, https, ftp, file, relative)
- **HTML Entity Handling**: Proper escaping and unescaping of HTML entities
- **Empty Folder Support**: Preserves empty folders in the bookmark structure
- **Duplicate Handling**: Last value wins for duplicate bookmark names

## Output Examples

### JSON Format

```json
{
	"Development": {
		"MDN": "https://developer.mozilla.org",
		"Tools": {
			"GitHub": "https://github.com",
			"Stack Overflow": "https://stackoverflow.com"
		}
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
    <DT><H3>Development</H3>
    <DL><p>
        <DT><A HREF="https://developer.mozilla.org">MDN</A>
        <DT><H3>Tools</H3>
        <DL><p>
            <DT><A HREF="https://github.com">GitHub</A>
            <DT><A HREF="https://stackoverflow.com">Stack Overflow</A>
        </DL><p>
    </DL><p>
    <DT><A HREF="https://google.com">Google</A>
</DL>
</BODY>
</HTML>
```

## Dependencies

- [`@b-fuze/deno-dom`](https://jsr.io/@b-fuze/deno-dom): DOM parser and manipulation for both Deno and Node.js environments

## Development

### Prerequisites

- [Deno](https://deno.land/) 1.x or later

### Setup

```bash
git clone https://github.com/grakeice/netscape-bookmark-parser.git
cd netscape-bookmark-parser
```

### Development Commands

```bash
# Run development server with file watching
deno task dev

# Run all tests
deno test

# Run tests with coverage
deno test --coverage

# Format code
deno fmt

# Lint code
deno lint

# Build for Node.js
deno task build:npm

# Build with specific version
deno task build:npm 1.0.0
```

### Running Tests

The project includes comprehensive test suites for all functionality:

```bash
# Run all tests
deno test

# Run specific test file
deno test src/BookmarksTree/BookmarksTree.test.ts

# Run tests with detailed output
deno test --verbose

# Run tests and generate coverage report
deno test --coverage=coverage_dir
deno coverage coverage_dir
```

### Publishing

The project uses automated publishing via GitHub Actions:

1. Create a version tag: `git tag v1.0.0`
2. Push the tag: `git push origin v1.0.0`
3. GitHub Actions will automatically build and publish to both NPM and JSR

## Browser Compatibility

### Supported Browsers for Export Files

- **Chrome/Chromium**: All versions
- **Firefox**: All versions
- **Safari**: All versions
- **Microsoft Edge**: All versions
- **Opera**: All versions
- **Internet Explorer**: 6+ (legacy support)

### Exported File Examples

The library can parse bookmark files exported from:

```html
<!-- Chrome/Edge format -->
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!--This is an automatically generated file.-->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    <DT><H3 ADD_DATE="1640995200">Bookmarks bar</H3>
    <DL><p>
        <DT><A HREF="https://example.com" ADD_DATE="1640995200">Example</A>
    </DL><p>
</DL>

<!-- Firefox format -->
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks Menu</H1>
<DL><p>
    <DT><H3>Bookmarks Toolbar</H3>
    <DL><p>
        <DT><A HREF="https://example.com">Example Site</A>
    </DL><p>
</DL>
```

## Error Handling

The library gracefully handles various error conditions:

```typescript
// Invalid HTML
const invalidHtml = "<html><body>Not a bookmark file</body></html>";
const tree = BookmarksParser.parse(invalidHtml);
console.log(tree.size); // 0 - empty tree

// Empty content
const emptyTree = BookmarksParser.parse("");
console.log(emptyTree.size); // 0

// Malformed URLs are skipped
const htmlWithBadUrls = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<HTML><BODY><DL><p>
    <DT><A HREF="">Empty URL</A>
    <DT><A>No HREF attribute</A>
    <DT><A HREF="https://valid.com">Valid Link</A>
</DL><p></BODY></HTML>`;

const parsedTree = BookmarksParser.parse(htmlWithBadUrls);
console.log(parsedTree.size); // 1 - only valid link included
```

## Performance

The library is optimized for performance:

- **Memory Efficient**: Uses native Map structure for O(1) lookups
- **Streaming Capable**: Can handle large bookmark files (1000+ bookmarks)
- **Fast Parsing**: DOM-based parsing with efficient tree traversal
- **JSON Conversion**: Optimized serialization/deserialization

## TypeScript Support

Full TypeScript definitions included:

```typescript
interface BookmarkValue extends Map<string, string | BookmarksTree> {
	toJSON(): Record<string, unknown>;
	toDOM(): HTMLDocument;
	readonly HTMLText: string;
}

class BookmarksParser {
	static parse(htmlContent: string): BookmarksTree;
}

class BookmarksTree extends Map<string, string | BookmarksTree> {
	toJSON(): Record<string, unknown>;
	static fromJSON(json: Record<string, unknown>): BookmarksTree;
	static fromDOM(dom: HTMLDocument): BookmarksTree;
	toDOM(): HTMLDocument;
	get HTMLText(): string;
}
```

## License

MIT License - See [LICENSE](LICENSE) file for details.

## Contributing

Pull requests and issue reports are welcome!

### How to Contribute

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with tests
4. Ensure all tests pass (`deno test`)
5. Format your code (`deno fmt`)
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Create a pull request

### Reporting Issues

When reporting issues, please include:

- Browser/environment information
- Sample bookmark HTML (if applicable)
- Expected vs actual behavior
- Steps to reproduce

## Author

**grakeice**

- GitHub: [@grakeice](https://github.com/grakeice)

## Changelog

### v1.0.0-pre (Latest)

- 🚀 **Pre-release Version**: Preparing for stable 1.0.0 release
- ✨ **Core Features**: Complete HTML bookmark file parsing functionality
- 🏗️ **BookmarksTree Class**: Hierarchical structure management with Map interface
- 🔄 **Bidirectional Conversion**: JSON ↔ HTML ↔ DOM conversion support
- 🧪 **Comprehensive Testing**: Full test coverage with edge case handling
- 📦 **Multi-Runtime Support**: Native Deno and Node.js compatibility
- 🔧 **TypeScript Support**: Complete type definitions and IntelliSense
- 🤖 **CI/CD Pipeline**: Automated testing and publishing via GitHub Actions
- 📚 **Documentation**: Comprehensive README with examples and API reference
- 🌐 **International Support**: Unicode and multi-language bookmark handling
- ⚡ **Performance Optimized**: Efficient parsing for large bookmark collections
- 🛡️ **Error Handling**: Graceful handling of malformed HTML and invalid URLs

### v0.0.1-pre4

- Early pre-release version
- Core functionality proof of concept
- Basic parsing implementation
- Initial testing setup
