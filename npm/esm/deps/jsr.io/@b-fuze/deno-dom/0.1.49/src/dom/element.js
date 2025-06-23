var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _DOMTokenList_instances, _a, _DOMTokenList_DOM_TOKEN_LIST_MIN_SET_SIZE, _DOMTokenList__value, _DOMTokenList_value_get, _DOMTokenList_value_set, _DOMTokenList_set, _DOMTokenList_onChange, _DOMTokenList_invalidToken, _DOMTokenList_setIndices, _DOMTokenList_arrayAdd, _DOMTokenList_setAdd, _DOMTokenList_arrayRemove, _DOMTokenList_setRemove, _DOMTokenList_updateClassString, _UninitializedDOMTokenList_instances, _UninitializedDOMTokenList_getInitialized, _b, _Attr_namedNodeMap, _Attr_name, _Attr_value, _Attr_ownerElement, _c, _NamedNodeMap_indexedAttrAccess, _NamedNodeMap_onAttrNodeChange, _NamedNodeMap_attrNodeCache, _NamedNodeMap_map, _NamedNodeMap_length, _NamedNodeMap_capacity, _NamedNodeMap_ownerElement, _Element_instances, _Element_namedNodeMap, _Element_datasetProxy, _Element_currentId, _Element_currentClassName, _Element_hasIdAttribute, _Element_hasClassNameAttribute, _Element_classListInstance, _Element_classList_get;
import { CTOR_KEY } from "../constructor-lock.js";
import { fragmentNodesFromString } from "../deserialize.js";
import { Node, nodesAndTextNodes, NodeType } from "./node.js";
import { NodeList, nodeListMutatorSym } from "./node-list.js";
import { getDatasetHtmlAttrName, getDatasetJavascriptName, getElementsByClassName, getOuterOrInnerHtml, insertBeforeAfter, lowerCaseCharRe, upperCaseCharRe, } from "./utils.js";
import UtilTypes from "./utils-types.js";
import { getLowerCase, getUpperCase } from "./string-cache.js";
export class DOMTokenList {
    constructor(onChange, key) {
        _DOMTokenList_instances.add(this);
        _DOMTokenList__value.set(this, "");
        _DOMTokenList_set.set(this, []);
        _DOMTokenList_onChange.set(this, void 0);
        if (key !== CTOR_KEY) {
            throw new TypeError("Illegal constructor");
        }
        __classPrivateFieldSet(this, _DOMTokenList_onChange, onChange, "f");
    }
    set value(input) {
        __classPrivateFieldSet(this, _DOMTokenList_instances, input, "a", _DOMTokenList_value_set);
        __classPrivateFieldSet(this, _DOMTokenList_set, input
            .trim()
            .split(/[\t\n\f\r\s]+/g)
            .filter(Boolean), "f");
        if (__classPrivateFieldGet(this, _DOMTokenList_set, "f").length > __classPrivateFieldGet(_a, _a, "f", _DOMTokenList_DOM_TOKEN_LIST_MIN_SET_SIZE)) {
            __classPrivateFieldSet(this, _DOMTokenList_set, new Set(__classPrivateFieldGet(this, _DOMTokenList_set, "f")), "f");
        }
        else {
            const deduplicatedSet = [];
            for (const element of __classPrivateFieldGet(this, _DOMTokenList_set, "f")) {
                if (!deduplicatedSet.includes(element)) {
                    deduplicatedSet.push(element);
                }
            }
            __classPrivateFieldSet(this, _DOMTokenList_set, deduplicatedSet, "f");
        }
        __classPrivateFieldGet(this, _DOMTokenList_instances, "m", _DOMTokenList_setIndices).call(this);
    }
    get value() {
        return __classPrivateFieldGet(this, _DOMTokenList__value, "f");
    }
    get length() {
        if (__classPrivateFieldGet(this, _DOMTokenList_set, "f").constructor === Array) {
            return __classPrivateFieldGet(this, _DOMTokenList_set, "f").length;
        }
        else {
            return __classPrivateFieldGet(this, _DOMTokenList_set, "f").size;
        }
    }
    *entries() {
        const array = Array.from(__classPrivateFieldGet(this, _DOMTokenList_set, "f"));
        for (let i = 0; i < array.length; i++) {
            yield [i, array[i]];
        }
    }
    *values() {
        yield* __classPrivateFieldGet(this, _DOMTokenList_set, "f").values();
    }
    *keys() {
        const length = this.length;
        for (let i = 0; i < length; i++) {
            yield i;
        }
    }
    *[(_DOMTokenList__value = new WeakMap(), _DOMTokenList_set = new WeakMap(), _DOMTokenList_onChange = new WeakMap(), _DOMTokenList_instances = new WeakSet(), _DOMTokenList_value_get = function _DOMTokenList_value_get() {
        return __classPrivateFieldGet(this, _DOMTokenList__value, "f");
    }, _DOMTokenList_value_set = function _DOMTokenList_value_set(value) {
        __classPrivateFieldSet(this, _DOMTokenList__value, value, "f");
        __classPrivateFieldGet(this, _DOMTokenList_onChange, "f").call(this, value);
    }, _DOMTokenList_invalidToken = function _DOMTokenList_invalidToken(token) {
        return token === "" || /[\t\n\f\r ]/.test(token);
    }, _DOMTokenList_setIndices = function _DOMTokenList_setIndices() {
        const classes = Array.from(__classPrivateFieldGet(this, _DOMTokenList_set, "f"));
        for (let i = 0; i < classes.length; i++) {
            this[i] = classes[i];
        }
    }, Symbol.iterator)]() {
        yield* __classPrivateFieldGet(this, _DOMTokenList_set, "f").values();
    }
    item(index) {
        index = Number(index);
        if (Number.isNaN(index) || index === Infinity)
            index = 0;
        return this[Math.trunc(index) % 2 ** 32] ?? null;
    }
    contains(element) {
        if (__classPrivateFieldGet(this, _DOMTokenList_set, "f").constructor === Array) {
            return __classPrivateFieldGet(this, _DOMTokenList_set, "f").includes(element);
        }
        else {
            return __classPrivateFieldGet(this, _DOMTokenList_set, "f").has(element);
        }
    }
    add(...elements) {
        const method = (__classPrivateFieldGet(this, _DOMTokenList_set, "f").constructor === Array ? __classPrivateFieldGet(this, _DOMTokenList_instances, "m", _DOMTokenList_arrayAdd) : __classPrivateFieldGet(this, _DOMTokenList_instances, "m", _DOMTokenList_setAdd)).bind(this);
        for (const element of elements) {
            if (__classPrivateFieldGet(_a, _a, "m", _DOMTokenList_invalidToken).call(_a, element)) {
                throw new DOMException("Failed to execute 'add' on 'DOMTokenList': The token provided must not be empty.");
            }
            method(element);
        }
        __classPrivateFieldGet(this, _DOMTokenList_instances, "m", _DOMTokenList_updateClassString).call(this);
    }
    remove(...elements) {
        const method = (__classPrivateFieldGet(this, _DOMTokenList_set, "f").constructor === Array ? __classPrivateFieldGet(this, _DOMTokenList_instances, "m", _DOMTokenList_arrayRemove) : __classPrivateFieldGet(this, _DOMTokenList_instances, "m", _DOMTokenList_setRemove))
            .bind(this);
        const size = this.length;
        for (const element of elements) {
            if (__classPrivateFieldGet(_a, _a, "m", _DOMTokenList_invalidToken).call(_a, element)) {
                throw new DOMException("Failed to execute 'remove' on 'DOMTokenList': The token provided must not be empty.");
            }
            method(element);
        }
        const newSize = this.length;
        if (size !== newSize) {
            for (let i = newSize; i < size; i++) {
                delete this[i];
            }
            __classPrivateFieldGet(this, _DOMTokenList_instances, "m", _DOMTokenList_setIndices).call(this);
        }
        __classPrivateFieldGet(this, _DOMTokenList_instances, "m", _DOMTokenList_updateClassString).call(this);
    }
    replace(oldToken, newToken) {
        const isArrayBacked = __classPrivateFieldGet(this, _DOMTokenList_set, "f").constructor === Array;
        const removeMethod = (isArrayBacked ? __classPrivateFieldGet(this, _DOMTokenList_instances, "m", _DOMTokenList_arrayRemove) : __classPrivateFieldGet(this, _DOMTokenList_instances, "m", _DOMTokenList_setRemove))
            .bind(this);
        const addMethod = (isArrayBacked ? __classPrivateFieldGet(this, _DOMTokenList_instances, "m", _DOMTokenList_arrayAdd) : __classPrivateFieldGet(this, _DOMTokenList_instances, "m", _DOMTokenList_setAdd)).bind(this);
        if ([oldToken, newToken].some((v) => __classPrivateFieldGet(_a, _a, "m", _DOMTokenList_invalidToken).call(_a, v))) {
            throw new DOMException("Failed to execute 'replace' on 'DOMTokenList': The token provided must not be empty.");
        }
        if (!this.contains(oldToken)) {
            return false;
        }
        if (this.contains(newToken)) {
            this.remove(oldToken);
        }
        else {
            removeMethod(oldToken);
            addMethod(newToken);
            __classPrivateFieldGet(this, _DOMTokenList_instances, "m", _DOMTokenList_setIndices).call(this);
            __classPrivateFieldGet(this, _DOMTokenList_instances, "m", _DOMTokenList_updateClassString).call(this);
        }
        return true;
    }
    supports() {
        throw new Error("Not implemented");
    }
    toggle(element, force) {
        if (force !== undefined) {
            const operation = force ? "add" : "remove";
            this[operation](element);
            return false;
        }
        else {
            const contains = this.contains(element);
            const operation = contains ? "remove" : "add";
            this[operation](element);
            return !contains;
        }
    }
    forEach(callback) {
        for (const [i, value] of this.entries()) {
            callback(value, i, this);
        }
    }
}
_a = DOMTokenList, _DOMTokenList_arrayAdd = function _DOMTokenList_arrayAdd(element) {
    const array = __classPrivateFieldGet(this, _DOMTokenList_set, "f");
    if (!array.includes(element)) {
        this[array.length] = element;
        array.push(element);
    }
}, _DOMTokenList_setAdd = function _DOMTokenList_setAdd(element) {
    const set = __classPrivateFieldGet(this, _DOMTokenList_set, "f");
    const { size } = set;
    set.add(element);
    if (size < set.size) {
        this[size] = element;
    }
}, _DOMTokenList_arrayRemove = function _DOMTokenList_arrayRemove(element) {
    const array = __classPrivateFieldGet(this, _DOMTokenList_set, "f");
    const index = array.indexOf(element);
    if (index >= 0) {
        array.splice(index, 1);
    }
}, _DOMTokenList_setRemove = function _DOMTokenList_setRemove(element) {
    __classPrivateFieldGet(this, _DOMTokenList_set, "f").delete(element);
}, _DOMTokenList_updateClassString = function _DOMTokenList_updateClassString() {
    __classPrivateFieldSet(this, _DOMTokenList_instances, Array.from(__classPrivateFieldGet(this, _DOMTokenList_set, "f")).join(" "), "a", _DOMTokenList_value_set);
    if (__classPrivateFieldGet(this, _DOMTokenList_set, "f").constructor === Array &&
        __classPrivateFieldGet(this, _DOMTokenList_set, "f").length > __classPrivateFieldGet(_a, _a, "f", _DOMTokenList_DOM_TOKEN_LIST_MIN_SET_SIZE)) {
        __classPrivateFieldSet(this, _DOMTokenList_set, new Set(__classPrivateFieldGet(this, _DOMTokenList_set, "f")), "f");
    }
};
// Minimum number of classnames/tokens in order to switch from
// an array-backed to a set-backed list
_DOMTokenList_DOM_TOKEN_LIST_MIN_SET_SIZE = { value: 32 };
const initializeClassListSym = Symbol("initializeClassListSym");
const domTokenListCurrentElementSym = Symbol("domTokenListCurrentElementSym");
/**
 * The purpose of this uninitialized DOMTokenList is to consume less memory
 * than the actual DOMTokenList class. By measurements of Deno v2.1.0 (V8 13.0.245.12-rusty)
 * this class consumes 48 bytes while the smallest DOMTokenList consumes 488
 * bytes
 */
class UninitializedDOMTokenList {
    constructor(currentElement) {
        _UninitializedDOMTokenList_instances.add(this);
        // This will always be populated with the current element
        // being queried
        Object.defineProperty(this, _b, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this[domTokenListCurrentElementSym] = currentElement;
    }
    set value(input) {
        this[domTokenListCurrentElementSym][initializeClassListSym]();
        this[domTokenListCurrentElementSym].classList.value = String(input);
    }
    get value() {
        return __classPrivateFieldGet(this, _UninitializedDOMTokenList_instances, "m", _UninitializedDOMTokenList_getInitialized).call(this)?.value ?? "";
    }
    get length() {
        return __classPrivateFieldGet(this, _UninitializedDOMTokenList_instances, "m", _UninitializedDOMTokenList_getInitialized).call(this)?.length ?? 0;
    }
    *entries() {
        const initialized = __classPrivateFieldGet(this, _UninitializedDOMTokenList_instances, "m", _UninitializedDOMTokenList_getInitialized).call(this);
        if (initialized) {
            yield* initialized.entries();
        }
    }
    *values() {
        const initialized = __classPrivateFieldGet(this, _UninitializedDOMTokenList_instances, "m", _UninitializedDOMTokenList_getInitialized).call(this);
        if (initialized) {
            yield* initialized.values();
        }
    }
    *keys() {
        const initialized = __classPrivateFieldGet(this, _UninitializedDOMTokenList_instances, "m", _UninitializedDOMTokenList_getInitialized).call(this);
        if (initialized) {
            yield* initialized.keys();
        }
    }
    *[(_UninitializedDOMTokenList_instances = new WeakSet(), _b = domTokenListCurrentElementSym, _UninitializedDOMTokenList_getInitialized = function _UninitializedDOMTokenList_getInitialized() {
        const currentClassList = this[domTokenListCurrentElementSym].classList;
        if (currentClassList === this) {
            return null;
        }
        return currentClassList;
    }, Symbol.iterator)]() {
        yield* this.values();
    }
    item(index) {
        return __classPrivateFieldGet(this, _UninitializedDOMTokenList_instances, "m", _UninitializedDOMTokenList_getInitialized).call(this)?.item(index) ?? null;
    }
    contains(element) {
        return __classPrivateFieldGet(this, _UninitializedDOMTokenList_instances, "m", _UninitializedDOMTokenList_getInitialized).call(this)?.contains(element) ?? false;
    }
    add(...elements) {
        this[domTokenListCurrentElementSym][initializeClassListSym]();
        this[domTokenListCurrentElementSym].classList.add(...elements);
    }
    remove(...elements) {
        __classPrivateFieldGet(this, _UninitializedDOMTokenList_instances, "m", _UninitializedDOMTokenList_getInitialized).call(this)?.remove(...elements);
    }
    replace(oldToken, newToken) {
        return __classPrivateFieldGet(this, _UninitializedDOMTokenList_instances, "m", _UninitializedDOMTokenList_getInitialized).call(this)?.replace(oldToken, newToken) ?? false;
    }
    supports() {
        throw new Error("Not implemented");
    }
    toggle(element, force) {
        if (force === false) {
            return __classPrivateFieldGet(this, _UninitializedDOMTokenList_instances, "m", _UninitializedDOMTokenList_getInitialized).call(this)?.toggle(element, force) ?? false;
        }
        this[domTokenListCurrentElementSym][initializeClassListSym]();
        this[domTokenListCurrentElementSym].classList.add(element);
        return true;
    }
    forEach(callback) {
        __classPrivateFieldGet(this, _UninitializedDOMTokenList_instances, "m", _UninitializedDOMTokenList_getInitialized).call(this)?.forEach(callback);
    }
}
const setNamedNodeMapOwnerElementSym = Symbol("setNamedNodeMapOwnerElementSym");
const setAttrValueSym = Symbol("setAttrValueSym");
export class Attr extends Node {
    constructor(map, name, value, key) {
        if (key !== CTOR_KEY) {
            throw new TypeError("Illegal constructor");
        }
        super(name, NodeType.ATTRIBUTE_NODE, null, CTOR_KEY);
        _Attr_namedNodeMap.set(this, null);
        _Attr_name.set(this, "");
        _Attr_value.set(this, "");
        _Attr_ownerElement.set(this, null);
        __classPrivateFieldSet(this, _Attr_name, name, "f");
        __classPrivateFieldSet(this, _Attr_value, value, "f");
        __classPrivateFieldSet(this, _Attr_namedNodeMap, map, "f");
    }
    [(_Attr_namedNodeMap = new WeakMap(), _Attr_name = new WeakMap(), _Attr_value = new WeakMap(), _Attr_ownerElement = new WeakMap(), setNamedNodeMapOwnerElementSym)](ownerElement) {
        __classPrivateFieldSet(this, _Attr_ownerElement, ownerElement, "f");
        __classPrivateFieldSet(this, _Attr_namedNodeMap, ownerElement?.attributes ?? null, "f");
        if (ownerElement) {
            this._setOwnerDocument(ownerElement.ownerDocument);
        }
    }
    [setAttrValueSym](value) {
        __classPrivateFieldSet(this, _Attr_value, value, "f");
    }
    _shallowClone() {
        const newAttr = new Attr(null, __classPrivateFieldGet(this, _Attr_name, "f"), __classPrivateFieldGet(this, _Attr_value, "f"), CTOR_KEY);
        newAttr._setOwnerDocument(this.ownerDocument);
        return newAttr;
    }
    cloneNode() {
        return super.cloneNode();
    }
    appendChild() {
        throw new DOMException("Cannot add children to an Attribute");
    }
    replaceChild() {
        throw new DOMException("Cannot add children to an Attribute");
    }
    insertBefore() {
        throw new DOMException("Cannot add children to an Attribute");
    }
    removeChild() {
        throw new DOMException("The node to be removed is not a child of this node");
    }
    get name() {
        return __classPrivateFieldGet(this, _Attr_name, "f");
    }
    get localName() {
        // TODO: When we make namespaces a thing this needs
        // to be updated
        return __classPrivateFieldGet(this, _Attr_name, "f");
    }
    get value() {
        return __classPrivateFieldGet(this, _Attr_value, "f");
    }
    set value(value) {
        __classPrivateFieldSet(this, _Attr_value, String(value), "f");
        if (__classPrivateFieldGet(this, _Attr_namedNodeMap, "f")) {
            __classPrivateFieldGet(this, _Attr_namedNodeMap, "f")[setNamedNodeMapValueSym](__classPrivateFieldGet(this, _Attr_name, "f"), __classPrivateFieldGet(this, _Attr_value, "f"), true);
        }
    }
    get ownerElement() {
        return __classPrivateFieldGet(this, _Attr_ownerElement, "f") ?? null;
    }
    get specified() {
        return true;
    }
    // TODO
    get prefix() {
        return null;
    }
}
const setNamedNodeMapValueSym = Symbol("setNamedNodeMapValueSym");
const getNamedNodeMapValueSym = Symbol("getNamedNodeMapValueSym");
const getNamedNodeMapAttrNamesSym = Symbol("getNamedNodeMapAttrNamesSym");
const getNamedNodeMapAttrNodeSym = Symbol("getNamedNodeMapAttrNodeSym");
const removeNamedNodeMapAttrSym = Symbol("removeNamedNodeMapAttrSym");
export class NamedNodeMap {
    constructor(ownerElement, onAttrNodeChange, key) {
        _NamedNodeMap_onAttrNodeChange.set(this, void 0);
        _NamedNodeMap_attrNodeCache.set(this, {});
        _NamedNodeMap_map.set(this, {});
        _NamedNodeMap_length.set(this, 0);
        _NamedNodeMap_capacity.set(this, 0);
        _NamedNodeMap_ownerElement.set(this, null);
        if (key !== CTOR_KEY) {
            throw new TypeError("Illegal constructor.");
        }
        __classPrivateFieldSet(this, _NamedNodeMap_ownerElement, ownerElement, "f");
        __classPrivateFieldSet(this, _NamedNodeMap_onAttrNodeChange, onAttrNodeChange, "f");
        // Retain ordering of any preceding id or class attributes
        for (const attr of ownerElement.getAttributeNames()) {
            this[setNamedNodeMapValueSym](attr, ownerElement.getAttribute(attr));
        }
    }
    [(_NamedNodeMap_onAttrNodeChange = new WeakMap(), _NamedNodeMap_attrNodeCache = new WeakMap(), _NamedNodeMap_map = new WeakMap(), _NamedNodeMap_length = new WeakMap(), _NamedNodeMap_capacity = new WeakMap(), _NamedNodeMap_ownerElement = new WeakMap(), getNamedNodeMapAttrNodeSym)](attribute) {
        const safeAttrName = "a" + attribute;
        let attrNode = __classPrivateFieldGet(this, _NamedNodeMap_attrNodeCache, "f")[safeAttrName];
        if (!attrNode) {
            attrNode = __classPrivateFieldGet(this, _NamedNodeMap_attrNodeCache, "f")[safeAttrName] = new Attr(this, attribute, __classPrivateFieldGet(this, _NamedNodeMap_map, "f")[safeAttrName], CTOR_KEY);
            attrNode[setNamedNodeMapOwnerElementSym](__classPrivateFieldGet(this, _NamedNodeMap_ownerElement, "f"));
        }
        return attrNode;
    }
    [getNamedNodeMapAttrNamesSym]() {
        const names = [];
        for (const [name, value] of Object.entries(__classPrivateFieldGet(this, _NamedNodeMap_map, "f"))) {
            if (value !== undefined) {
                names.push(name.slice(1)); // Remove "a" for safeAttrName
            }
        }
        return names;
    }
    [getNamedNodeMapValueSym](attribute) {
        const safeAttrName = "a" + attribute;
        return __classPrivateFieldGet(this, _NamedNodeMap_map, "f")[safeAttrName];
    }
    [setNamedNodeMapValueSym](attribute, value, bubble = false) {
        var _d;
        const safeAttrName = "a" + attribute;
        if (__classPrivateFieldGet(this, _NamedNodeMap_map, "f")[safeAttrName] === undefined) {
            __classPrivateFieldSet(this, _NamedNodeMap_length, (_d = __classPrivateFieldGet(this, _NamedNodeMap_length, "f"), _d++, _d), "f");
            if (__classPrivateFieldGet(this, _NamedNodeMap_length, "f") > __classPrivateFieldGet(this, _NamedNodeMap_capacity, "f")) {
                __classPrivateFieldSet(this, _NamedNodeMap_capacity, __classPrivateFieldGet(this, _NamedNodeMap_length, "f"), "f");
                const index = __classPrivateFieldGet(this, _NamedNodeMap_capacity, "f") - 1;
                Object.defineProperty(this, String(__classPrivateFieldGet(this, _NamedNodeMap_capacity, "f") - 1), {
                    get: __classPrivateFieldGet(_c, _c, "f", _NamedNodeMap_indexedAttrAccess).bind(this, __classPrivateFieldGet(this, _NamedNodeMap_map, "f"), index),
                });
            }
        }
        else if (__classPrivateFieldGet(this, _NamedNodeMap_attrNodeCache, "f")[safeAttrName]) {
            __classPrivateFieldGet(this, _NamedNodeMap_attrNodeCache, "f")[safeAttrName][setAttrValueSym](value);
        }
        __classPrivateFieldGet(this, _NamedNodeMap_map, "f")[safeAttrName] = value;
        if (bubble) {
            __classPrivateFieldGet(this, _NamedNodeMap_onAttrNodeChange, "f").call(this, attribute, value);
        }
    }
    /**
     * Called when an attribute is removed from
     * an element
     */
    [removeNamedNodeMapAttrSym](attribute) {
        var _d;
        const safeAttrName = "a" + attribute;
        if (__classPrivateFieldGet(this, _NamedNodeMap_map, "f")[safeAttrName] !== undefined) {
            __classPrivateFieldSet(this, _NamedNodeMap_length, (_d = __classPrivateFieldGet(this, _NamedNodeMap_length, "f"), _d--, _d), "f");
            __classPrivateFieldGet(this, _NamedNodeMap_map, "f")[safeAttrName] = undefined;
            __classPrivateFieldGet(this, _NamedNodeMap_onAttrNodeChange, "f").call(this, attribute, null);
            const attrNode = __classPrivateFieldGet(this, _NamedNodeMap_attrNodeCache, "f")[safeAttrName];
            if (attrNode) {
                attrNode[setNamedNodeMapOwnerElementSym](null);
                __classPrivateFieldGet(this, _NamedNodeMap_attrNodeCache, "f")[safeAttrName] = undefined;
            }
        }
    }
    *[Symbol.iterator]() {
        for (let i = 0; i < this.length; i++) {
            yield this[i];
        }
    }
    get length() {
        return __classPrivateFieldGet(this, _NamedNodeMap_length, "f");
    }
    // FIXME: This method should accept anything and basically
    // coerce any non numbers (and Infinity/-Infinity) into 0
    item(index) {
        if (index >= __classPrivateFieldGet(this, _NamedNodeMap_length, "f")) {
            return null;
        }
        return this[index];
    }
    getNamedItem(attribute) {
        const safeAttrName = "a" + attribute;
        if (__classPrivateFieldGet(this, _NamedNodeMap_map, "f")[safeAttrName] !== undefined) {
            return this[getNamedNodeMapAttrNodeSym](attribute);
        }
        return null;
    }
    setNamedItem(attrNode) {
        if (attrNode.ownerElement) {
            throw new DOMException("Attribute already in use");
        }
        const safeAttrName = "a" + attrNode.name;
        const previousAttr = __classPrivateFieldGet(this, _NamedNodeMap_attrNodeCache, "f")[safeAttrName];
        if (previousAttr) {
            previousAttr[setNamedNodeMapOwnerElementSym](null);
            __classPrivateFieldGet(this, _NamedNodeMap_map, "f")[safeAttrName] = undefined;
        }
        attrNode[setNamedNodeMapOwnerElementSym](__classPrivateFieldGet(this, _NamedNodeMap_ownerElement, "f"));
        __classPrivateFieldGet(this, _NamedNodeMap_attrNodeCache, "f")[safeAttrName] = attrNode;
        this[setNamedNodeMapValueSym](attrNode.name, attrNode.value, true);
    }
    removeNamedItem(attribute) {
        const safeAttrName = "a" + attribute;
        if (__classPrivateFieldGet(this, _NamedNodeMap_map, "f")[safeAttrName] !== undefined) {
            const attrNode = this[getNamedNodeMapAttrNodeSym](attribute);
            this[removeNamedNodeMapAttrSym](attribute);
            return attrNode;
        }
        throw new DOMException("Node was not found");
    }
}
_c = NamedNodeMap;
_NamedNodeMap_indexedAttrAccess = { value: function (map, index) {
        if (index + 1 > this.length) {
            return undefined;
        }
        const attribute = Object
            .keys(map)
            .filter((attribute) => map[attribute] !== undefined)[index]
            ?.slice(1); // Remove "a" for safeAttrName
        return this[getNamedNodeMapAttrNodeSym](attribute);
    } };
const XML_NAMESTART_CHAR_RE_SRC = ":A-Za-z_" +
    String.raw `\u{C0}-\u{D6}\u{D8}-\u{F6}\u{F8}-\u{2FF}\u{370}-\u{37D}` +
    String
        .raw `\u{37F}-\u{1FFF}\u{200C}-\u{200D}\u{2070}-\u{218F}\u{2C00}-\u{2FEF}` +
    String
        .raw `\u{3001}-\u{D7FF}\u{F900}-\u{FDCF}\u{FDF0}-\u{FFFD}\u{10000}-\u{EFFFF}`;
const XML_NAME_CHAR_RE_SRC = XML_NAMESTART_CHAR_RE_SRC +
    String.raw `\u{B7}\u{0300}-\u{036F}\u{203F}-\u{2040}0-9.-`;
const xmlNamestartCharRe = new RegExp(`[${XML_NAMESTART_CHAR_RE_SRC}]`, "u");
const xmlNameCharRe = new RegExp(`[${XML_NAME_CHAR_RE_SRC}]`, "u");
export class Element extends Node {
    get attributes() {
        if (!__classPrivateFieldGet(this, _Element_namedNodeMap, "f")) {
            __classPrivateFieldSet(this, _Element_namedNodeMap, new NamedNodeMap(this, (attribute, value) => {
                const isRemoved = value === null;
                if (value === null) {
                    value = "";
                }
                switch (attribute) {
                    case "class": {
                        if (isRemoved) {
                            __classPrivateFieldSet(this, _Element_hasClassNameAttribute, -1, "f");
                        }
                        else if (__classPrivateFieldGet(this, _Element_hasClassNameAttribute, "f") === -1) {
                            __classPrivateFieldSet(this, _Element_hasClassNameAttribute, __classPrivateFieldGet(this, _Element_hasIdAttribute, "f") + 1, "f");
                        }
                        // This must happen after the attribute is marked removed
                        __classPrivateFieldSet(this, _Element_currentClassName, value, "f");
                        __classPrivateFieldGet(this, _Element_instances, "a", _Element_classList_get).value = value;
                        break;
                    }
                    case "id": {
                        if (isRemoved) {
                            __classPrivateFieldSet(this, _Element_hasIdAttribute, -1, "f");
                        }
                        else if (__classPrivateFieldGet(this, _Element_hasIdAttribute, "f") === -1) {
                            __classPrivateFieldSet(this, _Element_hasIdAttribute, __classPrivateFieldGet(this, _Element_hasClassNameAttribute, "f") + 1, "f");
                        }
                        __classPrivateFieldSet(this, _Element_currentId, value, "f");
                        break;
                    }
                }
            }, CTOR_KEY), "f");
        }
        return __classPrivateFieldGet(this, _Element_namedNodeMap, "f");
    }
    [(_Element_namedNodeMap = new WeakMap(), _Element_datasetProxy = new WeakMap(), _Element_currentId = new WeakMap(), _Element_currentClassName = new WeakMap(), _Element_hasIdAttribute = new WeakMap(), _Element_hasClassNameAttribute = new WeakMap(), _Element_classListInstance = new WeakMap(), _Element_instances = new WeakSet(), _Element_classList_get = function _Element_classList_get() {
        return __classPrivateFieldGet(this, _Element_classListInstance, "f");
    }, initializeClassListSym)]() {
        if (__classPrivateFieldGet(this, _Element_classListInstance, "f").constructor === DOMTokenList) {
            return;
        }
        __classPrivateFieldSet(this, _Element_classListInstance, new DOMTokenList((className) => {
            if (__classPrivateFieldGet(this, _Element_currentClassName, "f") !== className) {
                __classPrivateFieldSet(this, _Element_currentClassName, className, "f");
                if (__classPrivateFieldGet(this, _Element_hasClassNameAttribute, "f") === -1) {
                    __classPrivateFieldSet(this, _Element_hasClassNameAttribute, __classPrivateFieldGet(this, _Element_hasIdAttribute, "f") + 1, "f");
                }
                if (__classPrivateFieldGet(this, _Element_namedNodeMap, "f") &&
                    (this.hasAttribute("class") || className !== "")) {
                    this.attributes[setNamedNodeMapValueSym]("class", className);
                }
            }
        }, CTOR_KEY), "f");
    }
    constructor(tagName, parentNode, attributes, key) {
        super(tagName, NodeType.ELEMENT_NODE, parentNode, key);
        _Element_instances.add(this);
        _Element_namedNodeMap.set(this, null);
        _Element_datasetProxy.set(this, null);
        _Element_currentId.set(this, "");
        _Element_currentClassName.set(this, "");
        _Element_hasIdAttribute.set(this, -1);
        _Element_hasClassNameAttribute.set(this, -1);
        // Only initialize a classList when we need one
        _Element_classListInstance.set(this, new UninitializedDOMTokenList(this));
        for (const attr of attributes) {
            this.setAttribute(attr[0], attr[1]);
        }
        this.nodeName = getUpperCase(tagName);
    }
    get tagName() {
        return this.nodeName;
    }
    get localName() {
        return getLowerCase(this.tagName);
    }
    _shallowClone() {
        // FIXME: This attribute copying needs to also be fixed in other
        // elements that override _shallowClone like <template>
        const attributes = [];
        for (const attribute of this.getAttributeNames()) {
            attributes.push([attribute, this.getAttribute(attribute)]);
        }
        return new Element(this.nodeName, null, attributes, CTOR_KEY);
    }
    get childElementCount() {
        return this._getChildNodesMutator().elementsView().length;
    }
    get className() {
        return __classPrivateFieldGet(this, _Element_currentClassName, "f");
    }
    set className(className) {
        __classPrivateFieldGet(this, _Element_instances, "a", _Element_classList_get).value = className;
    }
    get classList() {
        return __classPrivateFieldGet(this, _Element_instances, "a", _Element_classList_get);
    }
    get outerHTML() {
        return getOuterOrInnerHtml(this, true);
    }
    set outerHTML(html) {
        if (this.parentNode) {
            const { parentElement, parentNode } = this;
            let contextLocalName = parentElement?.localName;
            switch (parentNode.nodeType) {
                case NodeType.DOCUMENT_NODE: {
                    throw new DOMException("Modifications are not allowed for this document");
                }
                // setting outerHTML, step 4. Document Fragment
                // ref: https://w3c.github.io/DOM-Parsing/#dom-element-outerhtml
                case NodeType.DOCUMENT_FRAGMENT_NODE: {
                    contextLocalName = "body";
                    // fall-through
                }
                default: {
                    const { childNodes: newChildNodes } = fragmentNodesFromString(html, contextLocalName).childNodes[0];
                    const mutator = parentNode._getChildNodesMutator();
                    const insertionIndex = mutator.indexOf(this);
                    for (let i = newChildNodes.length - 1; i >= 0; i--) {
                        const child = newChildNodes[i];
                        mutator.splice(insertionIndex, 0, child);
                        child._setParent(parentNode);
                        child._setOwnerDocument(parentNode.ownerDocument);
                    }
                    this.remove();
                }
            }
        }
    }
    get innerHTML() {
        return getOuterOrInnerHtml(this, false);
    }
    set innerHTML(html) {
        // Remove all children
        for (const child of this.childNodes) {
            child._setParent(null);
        }
        const mutator = this._getChildNodesMutator();
        mutator.splice(0, this.childNodes.length);
        // Parse HTML into new children
        if (html.length) {
            const parsed = fragmentNodesFromString(html, this.localName);
            for (const child of parsed.childNodes[0].childNodes) {
                mutator.push(child);
            }
            for (const child of this.childNodes) {
                child._setParent(this);
                child._setOwnerDocument(this.ownerDocument);
            }
        }
    }
    get innerText() {
        return this.textContent;
    }
    set innerText(text) {
        this.textContent = text;
    }
    get children() {
        return this._getChildNodesMutator().elementsView();
    }
    get id() {
        return __classPrivateFieldGet(this, _Element_currentId, "f") || "";
    }
    set id(id) {
        this.setAttribute("id", id);
    }
    get dataset() {
        if (__classPrivateFieldGet(this, _Element_datasetProxy, "f")) {
            return __classPrivateFieldGet(this, _Element_datasetProxy, "f");
        }
        __classPrivateFieldSet(this, _Element_datasetProxy, new Proxy({}, {
            get: (_target, property, _receiver) => {
                if (typeof property === "string") {
                    const attributeName = getDatasetHtmlAttrName(property);
                    return this.getAttribute(attributeName) ?? undefined;
                }
                return undefined;
            },
            set: (_target, property, value, _receiver) => {
                if (typeof property === "string") {
                    let attributeName = "data-";
                    let prevChar = "";
                    for (const char of property) {
                        // Step 1. https://html.spec.whatwg.org/multipage/dom.html#dom-domstringmap-setitem
                        if (prevChar === "-" && lowerCaseCharRe.test(char)) {
                            throw new DOMException("An invalid or illegal string was specified");
                        }
                        // Step 4. https://html.spec.whatwg.org/multipage/dom.html#dom-domstringmap-setitem
                        if (!xmlNameCharRe.test(char)) {
                            throw new DOMException("String contains an invalid character");
                        }
                        // Step 2. https://html.spec.whatwg.org/multipage/dom.html#dom-domstringmap-setitem
                        if (upperCaseCharRe.test(char)) {
                            attributeName += "-";
                        }
                        attributeName += char.toLowerCase();
                        prevChar = char;
                    }
                    this.setAttribute(attributeName, String(value));
                }
                return true;
            },
            deleteProperty: (_target, property) => {
                if (typeof property === "string") {
                    const attributeName = getDatasetHtmlAttrName(property);
                    this.removeAttribute(attributeName);
                }
                return true;
            },
            ownKeys: (_target) => {
                return this
                    .getAttributeNames()
                    .flatMap((attributeName) => {
                    if (attributeName.startsWith?.("data-")) {
                        return [getDatasetJavascriptName(attributeName)];
                    }
                    else {
                        return [];
                    }
                });
            },
            getOwnPropertyDescriptor: (_target, property) => {
                if (typeof property === "string") {
                    const attributeName = getDatasetHtmlAttrName(property);
                    if (this.hasAttribute(attributeName)) {
                        return {
                            writable: true,
                            enumerable: true,
                            configurable: true,
                        };
                    }
                }
                return undefined;
            },
            has: (_target, property) => {
                if (typeof property === "string") {
                    const attributeName = getDatasetHtmlAttrName(property);
                    return this.hasAttribute(attributeName);
                }
                return false;
            },
        }), "f");
        return __classPrivateFieldGet(this, _Element_datasetProxy, "f");
    }
    getAttributeNames() {
        if (!__classPrivateFieldGet(this, _Element_namedNodeMap, "f")) {
            const attributes = [];
            // We preserve the order of the "id" and "class" attributes when
            // returning the list of names with an uninitialized NamedNodeMap
            const startWithClassAttr = Number(__classPrivateFieldGet(this, _Element_hasIdAttribute, "f") > __classPrivateFieldGet(this, _Element_hasClassNameAttribute, "f"));
            for (let i = 0; i < 2; i++) {
                const attributeIdx = (i + startWithClassAttr) % 2;
                switch (attributeIdx) {
                    // "id" attribute
                    case 0: {
                        ~__classPrivateFieldGet(this, _Element_hasIdAttribute, "f") && attributes.push("id");
                        break;
                    }
                    // "class" attribute
                    case 1: {
                        ~__classPrivateFieldGet(this, _Element_hasClassNameAttribute, "f") && attributes.push("class");
                        break;
                    }
                }
            }
            return attributes;
        }
        return this.attributes[getNamedNodeMapAttrNamesSym]();
    }
    getAttribute(rawName) {
        const name = getLowerCase(String(rawName));
        switch (name) {
            case "id": {
                if (~__classPrivateFieldGet(this, _Element_hasIdAttribute, "f")) {
                    return __classPrivateFieldGet(this, _Element_currentId, "f");
                }
                else {
                    return null;
                }
            }
            case "class": {
                if (~__classPrivateFieldGet(this, _Element_hasClassNameAttribute, "f")) {
                    return __classPrivateFieldGet(this, _Element_currentClassName, "f");
                }
                else {
                    return null;
                }
            }
        }
        if (!__classPrivateFieldGet(this, _Element_namedNodeMap, "f")) {
            return null;
        }
        return this.attributes[getNamedNodeMapValueSym](name) ?? null;
    }
    setAttribute(rawName, value) {
        const name = getLowerCase(String(rawName));
        const strValue = String(value);
        let isNormalAttribute = false;
        switch (name) {
            case "id": {
                __classPrivateFieldSet(this, _Element_currentId, strValue, "f");
                if (__classPrivateFieldGet(this, _Element_hasIdAttribute, "f") === -1) {
                    __classPrivateFieldSet(this, _Element_hasIdAttribute, __classPrivateFieldGet(this, _Element_hasClassNameAttribute, "f") + 1, "f");
                }
                break;
            }
            case "class": {
                __classPrivateFieldGet(this, _Element_instances, "a", _Element_classList_get).value = strValue;
                if (__classPrivateFieldGet(this, _Element_hasClassNameAttribute, "f") === -1) {
                    __classPrivateFieldSet(this, _Element_hasClassNameAttribute, __classPrivateFieldGet(this, _Element_hasIdAttribute, "f") + 1, "f");
                }
                break;
            }
            default: {
                isNormalAttribute = true;
            }
        }
        if (__classPrivateFieldGet(this, _Element_namedNodeMap, "f") || isNormalAttribute) {
            this.attributes[setNamedNodeMapValueSym](name, strValue);
        }
    }
    removeAttribute(rawName) {
        const name = getLowerCase(String(rawName));
        switch (name) {
            case "id": {
                __classPrivateFieldSet(this, _Element_currentId, "", "f");
                __classPrivateFieldSet(this, _Element_hasIdAttribute, -1, "f");
                break;
            }
            case "class": {
                __classPrivateFieldGet(this, _Element_instances, "a", _Element_classList_get).value = "";
                __classPrivateFieldSet(this, _Element_hasClassNameAttribute, -1, "f");
                break;
            }
        }
        if (!__classPrivateFieldGet(this, _Element_namedNodeMap, "f")) {
            return;
        }
        this.attributes[removeNamedNodeMapAttrSym](name);
    }
    toggleAttribute(rawName, force) {
        const name = getLowerCase(String(rawName));
        if (this.hasAttribute(name)) {
            if ((force === undefined) || (force === false)) {
                this.removeAttribute(name);
                return false;
            }
            return true;
        }
        if ((force === undefined) || (force === true)) {
            this.setAttribute(name, "");
            return true;
        }
        return false;
    }
    hasAttribute(rawName) {
        const name = getLowerCase(String(rawName));
        switch (name) {
            case "id": {
                return Boolean(~__classPrivateFieldGet(this, _Element_hasIdAttribute, "f"));
            }
            case "class": {
                return Boolean(~__classPrivateFieldGet(this, _Element_hasClassNameAttribute, "f"));
            }
        }
        if (!__classPrivateFieldGet(this, _Element_namedNodeMap, "f")) {
            return false;
        }
        return this.attributes[getNamedNodeMapValueSym](name) !== undefined;
    }
    hasAttributeNS(_namespace, rawName) {
        const name = getLowerCase(String(rawName));
        switch (name) {
            case "id": {
                return Boolean(~__classPrivateFieldGet(this, _Element_hasIdAttribute, "f"));
            }
            case "class": {
                return Boolean(~__classPrivateFieldGet(this, _Element_hasClassNameAttribute, "f"));
            }
        }
        if (!__classPrivateFieldGet(this, _Element_namedNodeMap, "f")) {
            return false;
        }
        // TODO: Use namespace
        return this.attributes[getNamedNodeMapValueSym](name) !== undefined;
    }
    replaceWith(...nodes) {
        this._replaceWith(...nodes);
    }
    remove() {
        this._remove();
    }
    append(...nodes) {
        const mutator = this._getChildNodesMutator();
        mutator.push(...nodesAndTextNodes(nodes, this));
    }
    prepend(...nodes) {
        const mutator = this._getChildNodesMutator();
        mutator.splice(0, 0, ...nodesAndTextNodes(nodes, this));
    }
    before(...nodes) {
        if (this.parentNode) {
            insertBeforeAfter(this, nodes, true);
        }
    }
    after(...nodes) {
        if (this.parentNode) {
            insertBeforeAfter(this, nodes, false);
        }
    }
    get firstElementChild() {
        const elements = this._getChildNodesMutator().elementsView();
        return elements[0] ?? null;
    }
    get lastElementChild() {
        const elements = this._getChildNodesMutator().elementsView();
        return elements[elements.length - 1] ?? null;
    }
    get nextElementSibling() {
        const parent = this.parentNode;
        if (!parent) {
            return null;
        }
        const mutator = parent._getChildNodesMutator();
        const index = mutator.indexOfElementsView(this);
        const elements = mutator.elementsView();
        return elements[index + 1] ?? null;
    }
    get previousElementSibling() {
        const parent = this.parentNode;
        if (!parent) {
            return null;
        }
        const mutator = parent._getChildNodesMutator();
        const index = mutator.indexOfElementsView(this);
        const elements = mutator.elementsView();
        return elements[index - 1] ?? null;
    }
    querySelector(selectors) {
        if (!this.ownerDocument) {
            throw new Error("Element must have an owner document");
        }
        return this.ownerDocument._nwapi.first(selectors, this);
    }
    querySelectorAll(selectors) {
        if (!this.ownerDocument) {
            throw new Error("Element must have an owner document");
        }
        const nodeList = new NodeList();
        const mutator = nodeList[nodeListMutatorSym]();
        for (const match of this.ownerDocument._nwapi.select(selectors, this)) {
            mutator.push(match);
        }
        return nodeList;
    }
    matches(selectorString) {
        return this.ownerDocument._nwapi.match(selectorString, this);
    }
    closest(selectorString) {
        const { match } = this.ownerDocument._nwapi; // See note below
        // deno-lint-ignore no-this-alias
        let el = this;
        do {
            // Note: Not using `el.matches(selectorString)` because on a browser if you override
            // `matches`, you *don't* see it being used by `closest`.
            if (match(selectorString, el)) {
                return el;
            }
            el = el.parentElement;
        } while (el !== null);
        return null;
    }
    // TODO: DRY!!!
    getElementById(id) {
        if (!this._hasInitializedChildNodes()) {
            return null;
        }
        for (const child of this.childNodes) {
            if (child.nodeType === NodeType.ELEMENT_NODE) {
                if (child.id === id) {
                    return child;
                }
                const search = child.getElementById(id);
                if (search) {
                    return search;
                }
            }
        }
        return null;
    }
    getElementsByTagName(tagName) {
        if (!this._hasInitializedChildNodes()) {
            return [];
        }
        const fixCaseTagName = getUpperCase(tagName);
        if (fixCaseTagName === "*") {
            return this._getElementsByTagNameWildcard([]);
        }
        else {
            return this._getElementsByTagName(fixCaseTagName, []);
        }
    }
    _getElementsByTagNameWildcard(search) {
        if (!this._hasInitializedChildNodes()) {
            return search;
        }
        for (const child of this.childNodes) {
            if (child.nodeType === NodeType.ELEMENT_NODE) {
                search.push(child);
                child._getElementsByTagNameWildcard(search);
            }
        }
        return search;
    }
    _getElementsByTagName(tagName, search) {
        if (!this._hasInitializedChildNodes()) {
            return search;
        }
        for (const child of this.childNodes) {
            if (child.nodeType === NodeType.ELEMENT_NODE) {
                if (child.tagName === tagName) {
                    search.push(child);
                }
                child._getElementsByTagName(tagName, search);
            }
        }
        return search;
    }
    getElementsByClassName(className) {
        if (!this._hasInitializedChildNodes()) {
            return [];
        }
        return getElementsByClassName(this, className.trim().split(/\s+/), []);
    }
    getElementsByTagNameNS(_namespace, localName) {
        if (!this._hasInitializedChildNodes()) {
            return [];
        }
        // TODO: Use namespace
        return this.getElementsByTagName(localName);
    }
}
UtilTypes.Element = Element;
