export type Parser = (html: string, contextLocalName?: string) => string;
export declare let parse: Parser;
export declare let parseFrag: Parser;
export declare function register(func: Parser, fragFunc: Parser): void;
//# sourceMappingURL=parser.d.ts.map