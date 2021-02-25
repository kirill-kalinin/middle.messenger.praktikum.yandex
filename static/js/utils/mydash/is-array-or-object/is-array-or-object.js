export function isObject(variable) {
    return typeof variable === 'object'
        && variable !== null
        && variable.constructor === Object
        && Object.prototype.toString.call(variable) === '[object Object]';
}
export function isArray(variable) {
    return Array.isArray(variable);
}
export function isArrayOrObject(variable) {
    return isObject(variable) || isArray(variable);
}
//# sourceMappingURL=is-array-or-object.js.map