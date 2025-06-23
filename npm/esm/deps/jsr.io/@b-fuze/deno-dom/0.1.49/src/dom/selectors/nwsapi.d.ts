declare function _default(document: any): {
    lastMatched: undefined;
    lastSelected: undefined;
    matchLambdas: {};
    selectLambdas: {};
    matchResolvers: {};
    selectResolvers: {};
    CFG: {
        operators: string;
        combinators: string;
    };
    M_BODY: string;
    S_BODY: string;
    M_TEST: string;
    S_TEST: string;
    byId: (id: any, context: any) => any[];
    byTag: (tag: any, context: any) => any[];
    byClass: (cls: any, context: any) => any[];
    match: (selectors: any, element: any, callback: any, ...args: any[]) => boolean | undefined;
    first: (selectors: any, context: any, callback: any, ...args: any[]) => any;
    select: (selectors: any, context: any, callback: any, ...args: any[]) => any;
    closest: (selectors: any, element: any, callback: any) => any;
    compile: (selector: any, mode: any, callback: any) => any;
    configure: (option: any, clear: any) => boolean | {
        IDS_DUPES: boolean;
        MIXEDCASE: boolean;
        LOGERRORS: boolean;
        VERBOSITY: boolean;
    };
    emit: (message: any, proto: any) => void;
    Config: {
        IDS_DUPES: boolean;
        MIXEDCASE: boolean;
        LOGERRORS: boolean;
        VERBOSITY: boolean;
    };
    Snapshot: {
        doc: any;
        from: any;
        root: any;
        byTag: (tag: any, context: any) => any[];
        first: (selectors: any, context: any, callback: any, ...args: any[]) => any;
        match: (selectors: any, element: any, callback: any, ...args: any[]) => boolean | undefined;
        ancestor: (selectors: any, element: any, callback: any) => any;
        nthOfType: (element: any, dir: any) => number;
        nthElement: (element: any, dir: any) => number;
        hasAttributeNS: (e: any, name: any) => boolean;
    };
    Version: string;
    install: (all: any) => void;
    uninstall: () => void;
    Operators: {
        '=': {
            p1: string;
            p2: string;
            p3: string;
        };
        '^=': {
            p1: string;
            p2: string;
            p3: string;
        };
        '$=': {
            p1: string;
            p2: string;
            p3: string;
        };
        '*=': {
            p1: string;
            p2: string;
            p3: string;
        };
        '|=': {
            p1: string;
            p2: string;
            p3: string;
        };
        '~=': {
            p1: string;
            p2: string;
            p3: string;
        };
    };
    Selectors: {};
    registerCombinator: (combinator: any, resolver: any) => void;
    registerOperator: (operator: any, resolver: any) => void;
    registerSelector: (name: any, rexp: any, func: any) => void;
};
export default _default;
//# sourceMappingURL=nwsapi.d.ts.map