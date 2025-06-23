/**
 * @param {string} html
 * @returns {string}
 */
export function parse(html: string): string;
/**
 * @param {string} html
 * @param {string} context_local_name
 * @returns {string}
 */
export function parse_frag(html: string, context_local_name: string): string;
export default init;
declare function init(input: any): Promise<any>;
//# sourceMappingURL=deno-wasm.d.ts.map