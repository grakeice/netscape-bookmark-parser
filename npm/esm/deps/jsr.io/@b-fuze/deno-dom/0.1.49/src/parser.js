/**
 * Parser interface
 */
import * as dntShim from "../../../../../../_dnt.shims.js";
export let parse = (_html) => {
    console.error("Error: deno-dom: No parser registered");
    dntShim.Deno.exit(1);
};
export let parseFrag = (_html, _contextLocalName) => {
    console.error("Error: deno-dom: No parser registered");
    dntShim.Deno.exit(1);
};
const originalParse = parse;
export function register(func, fragFunc) {
    if (parse !== originalParse) {
        return;
    }
    parse = func;
    parseFrag = fragFunc;
}
