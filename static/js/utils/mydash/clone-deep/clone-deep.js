import { isArrayOrObject, isArray, isObject } from "../is-array-or-object/is-array-or-object.js";
export default function cloneDeep(obj) {
    if (!isArrayOrObject(obj)) {
        return obj;
    }
    let result;
    if (isArray(obj)) {
        result = [];
    }
    else if (isObject(obj)) {
        result = {};
    }
    for (let [key, value] of Object.entries(obj)) {
        result[key] = isArrayOrObject(value)
            ? cloneDeep(value)
            : value;
    }
    return result;
}
//# sourceMappingURL=clone-deep.js.map