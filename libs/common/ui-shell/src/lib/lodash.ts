import Stack  from './Stack'

function isObject(value) {
    const type = typeof value
    return value != null && (type === 'object' || type === 'function')
}

/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1
const CLONE_FLAT_FLAG = 2
const CLONE_SYMBOLS_FLAG = 4

export function cloneDeep(value: any) {
    return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG)
}


/** Built-in value references. */
const propertyIsEnumerable = Object.prototype.propertyIsEnumerable

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeGetSymbols = Object.getOwnPropertySymbols

function getSymbols(object: any) {
    if (object == null) {
        return [];
    }
    object = Object(object);
    return nativeGetSymbols(object).filter((symbol) => propertyIsEnumerable.call(object, symbol));
}

function getAllKeysIn(object) {
    const result = []
    for (const key in object) {
        result.push(key)
    }
    if (!Array.isArray(object)) {
        result.push(...getSymbolsIn(object))
    }
    return result
}

function getSymbolsIn(object) {
    const result = []
    while (object) {
        result.push(...getSymbols(object))
        object = Object.getPrototypeOf(Object(object))
    }
    return result
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

function initCloneArray(array) {
    const { length } = array
    const result = new array.constructor(length)

    // Add properties assigned by `RegExp#exec`.
    if (length && typeof array[0] === 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index
        result.input = array.input
    }
    return result
}

function copyArray(source, array) {
    let index = -1
    const length = source.length

    array || (array = new Array(length))
    while (++index < length) {
        array[index] = source[index]
    }
    return array
}

const argsTag = '[object Arguments]'
const arrayTag = '[object Array]'
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const mapTag = '[object Map]'
const numberTag = '[object Number]'
const objectTag = '[object Object]'
const regexpTag = '[object RegExp]'
const setTag = '[object Set]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const weakMapTag = '[object WeakMap]'

const arrayBufferTag = '[object ArrayBuffer]'
const dataViewTag = '[object DataView]'
const float32Tag = '[object Float32Array]'
const float64Tag = '[object Float64Array]'
const int8Tag = '[object Int8Array]'
const int16Tag = '[object Int16Array]'
const int32Tag = '[object Int32Array]'
const uint8Tag = '[object Uint8Array]'
const uint8ClampedTag = '[object Uint8ClampedArray]'
const uint16Tag = '[object Uint16Array]'
const uint32Tag = '[object Uint32Array]'

const cloneableTags = {}
cloneableTags[argsTag] = cloneableTags[arrayTag] =
    cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
    cloneableTags[boolTag] = cloneableTags[dateTag] =
    cloneableTags[float32Tag] = cloneableTags[float64Tag] =
    cloneableTags[int8Tag] = cloneableTags[int16Tag] =
    cloneableTags[int32Tag] = cloneableTags[mapTag] =
    cloneableTags[numberTag] = cloneableTags[objectTag] =
    cloneableTags[regexpTag] = cloneableTags[setTag] =
    cloneableTags[stringTag] = cloneableTags[symbolTag] =
    cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
    cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true
cloneableTags[errorTag] = cloneableTags[weakMapTag] = false

function initCloneObject(object) {
    return (typeof object.constructor === 'function' && !isPrototype(object))
        ? Object.create(Object.getPrototypeOf(object))
        : {}
}

const objectProto = Object.prototype

function isPrototype(value) {
    const Ctor = value && value.constructor
    const proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto

    return value === proto
}

function baseAssignValue(object, key, value) {
    if (key == '__proto__') {
        Object.defineProperty(object, key, {
            'configurable': true,
            'enumerable': true,
            'value': value,
            'writable': true
        })
    } else {
        object[key] = value
    }
}

function assignValue(object, key, value) {
    const objValue = object[key]

    if (!(hasOwnProperty.call(object, key) && eq(objValue, value))) {
        if (value !== 0 || (1 / value) === (1 / objValue)) {
            baseAssignValue(object, key, value)
        }
    } else if (value === undefined && !(key in object)) {
        baseAssignValue(object, key, value)
    }
}

function cloneTypedArray(typedArray, isDeep) {
    const buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length)
}

function eq(value, other) {
    return value === other || (value !== value && other !== other)
}

function copyObject(source, props, object, customizer?) {
    const isNew = !object
    object || (object = {})

    for (const key of props) {
        let newValue = customizer
            ? customizer(object[key], source[key], key, object, source)
            : undefined

        if (newValue === undefined) {
            newValue = source[key]
        }
        if (isNew) {
            baseAssignValue(object, key, newValue)
        } else {
            assignValue(object, key, newValue)
        }
    }
    return object
}

function copySymbolsIn(source, object) {
    return copyObject(source, getSymbolsIn(source), object)
}

function getTag(value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]'
    }
    return toString.call(value)
}

function copySymbols(source, object) {
    return copyObject(source, getSymbols(source), object)
}

function cloneArrayBuffer(arrayBuffer) {
    const result = new arrayBuffer.constructor(arrayBuffer.byteLength)
    new Uint8Array(result).set(new Uint8Array(arrayBuffer))
    return result
}

function cloneDataView(dataView, isDeep) {
    const buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength)
}

function initCloneByTag(object: any, tag: any, isDeep: boolean) {
    const Ctor = object.constructor
    switch (tag) {
        case arrayBufferTag:
            return cloneArrayBuffer(object)

        case boolTag:
        case dateTag:
            return new Ctor(+object)

        case dataViewTag:
            return cloneDataView(object, isDeep)

        case float32Tag: case float64Tag:
        case int8Tag: case int16Tag: case int32Tag:
        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
            return cloneTypedArray(object, isDeep)

        case mapTag:
            return new Ctor

        case numberTag:
        case stringTag:
            return new Ctor(object)

        case regexpTag:
            return cloneRegExp(object)

        case setTag:
            return new Ctor

        case symbolTag:
            return cloneSymbol(object)
    }
}

const symbolValueOf = Symbol.prototype.valueOf

function cloneSymbol(symbol) {
    return Object(symbolValueOf.call(symbol))
}

const reFlags = /\w*$/
function cloneRegExp(regexp) {
    const result = new regexp.constructor(regexp.source, reFlags.exec(regexp))
    result.lastIndex = regexp.lastIndex
    return result
}

const MAX_SAFE_INTEGER = 9007199254740991
function isLength(value) {
    return typeof value === 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
}

function isArrayLike(value) {
    return value != null && typeof value !== 'function' && isLength(value.length)
}
function isObjectLike(value) {
    return typeof value === 'object' && value !== null
}
function isArguments(value) {
    return isObjectLike(value) && getTag(value) == '[object Arguments]'
}

function arrayLikeKeys(value, inherited?) {
    const isArr = Array.isArray(value)
    const isArg = !isArr && isArguments(value)
    //const isBuff = !isArr && !isArg && isBuffer(value)
    const isBuff = false
    //const isType = !isArr && !isArg && !isBuff && isTypedArray(value)
    const isType = false
    const skipIndexes = isArr || isArg || isBuff || isType
    const length = value.length
    const result = new Array(skipIndexes ? length : 0)
    let index = skipIndexes ? -1 : length
    while (++index < length) {
        result[index] = `${index}`
    }
    for (const key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) &&
            !(skipIndexes && (
                // Safari 9 has enumerable `arguments.length` in strict mode.
                (key === 'length' ||
                    // Skip index properties.
                    isIndex(key, length))
            ))) {
            result.push(key)
        }
    }
    return result
}

/** Used to detect unsigned integer values. */
const reIsUint = /^(?:0|[1-9]\d*)$/
function isIndex(value, length) {
    const type = typeof value
    length = length == null ? MAX_SAFE_INTEGER : length

    return !!length &&
        (type === 'number' ||
            (type !== 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length)
}

function keys(object) {
    return isArrayLike(object)
        ? arrayLikeKeys(object)
        : Object.keys(Object(object))
}

function getAllKeys(object) {
    const result = keys(object)
    if (!Array.isArray(object)) {
        result.push(...getSymbols(object))
    }
    return result
}

function baseClone(value, bitmask, customizer?, key?, object?, stack?) {
    let result
    const isDeep = bitmask & CLONE_DEEP_FLAG
    const isFlat = bitmask & CLONE_FLAT_FLAG
    const isFull = bitmask & CLONE_SYMBOLS_FLAG

    if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value)
    }
    if (result !== undefined) {
        return result;
    }
    if (!isObject(value)) {
        return value;
    }
    const isArr = Array.isArray(value)
    const tag = getTag(value)
    if (isArr) {
        result = initCloneArray(value)
        if (!isDeep) {
            return copyArray(value, result)
        }
    } else {
        const isFunc = typeof value === 'function'

        //        if (isBuffer(value)) {
        //            return cloneBuffer(value, isDeep)
        //        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
            result = (isFlat || isFunc) ? {} : initCloneObject(value)
            if (!isDeep) {
                return isFlat
                    ? copySymbolsIn(value, copyObject(value, keysIn(value), result))
                    : copySymbols(value, Object.assign(result, value))
            }
        } else {
            if (isFunc || !cloneableTags[tag]) {
                return object ? value : {}
            }
            result = initCloneByTag(value, tag, isDeep !== 0)
        }
    }
    // Check for circular references and return its corresponding clone.
    stack || (stack = new Stack)
    const stacked = stack.get(value)
    if (stacked) {
        return stacked
    }
    stack.set(value, result)

    if (tag == mapTag) {
        value.forEach((subValue, key) => {
            result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack))
        })
        return result
    }

    if (tag == setTag) {
        value.forEach((subValue) => {
            result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack))
        })
        return result
    }

    //if (isTypedArray(value)) {
    //    return result
    //}

    const keysFunc = isFull
        ? (isFlat ? getAllKeysIn : getAllKeys)
        : (isFlat ? keysIn : keys)

    const props = isArr ? undefined : keysFunc(value)
    arrayEach(props || value, (subValue, key) => {
        if (props) {
            key = subValue
            subValue = value[key]
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack))
    })
    return result
}

function arrayEach(array, iteratee) {
    let index = -1
    const length = array.length

    while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
            break
        }
    }
    return array
}

function keysIn(object) {
    const result = []
    for (const key in object) {
        result.push(key)
    }
    return result
}
