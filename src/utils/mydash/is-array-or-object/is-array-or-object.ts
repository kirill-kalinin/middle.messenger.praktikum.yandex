export type PlainObject<T = unknown> = {
    [k in string]: T;
};

export function isObject(variable: unknown): variable is PlainObject {
    return typeof variable === 'object'
        && variable !== null
        && variable.constructor === Object
        && Object.prototype.toString.call(variable) === '[object Object]';
}

export function isArray(variable: unknown): variable is unknown[] {
    return Array.isArray(variable);
}

export function isArrayOrObject(variable: unknown): variable is (unknown[] | PlainObject) {
    return isObject(variable) || isArray(variable);
}
