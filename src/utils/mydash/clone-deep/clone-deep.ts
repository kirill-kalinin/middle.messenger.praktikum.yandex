import { isArrayOrObject, isArray, isObject } from '../is-array-or-object/is-array-or-object';

export default function cloneDeep<T>(obj: T): T {
    if (!isArrayOrObject(obj)) {
        return obj;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any;
    if (isArray(obj)) {
        result = [];
    } else if (isObject(obj)) {
        result = {};
    }

    for (const [key, value] of Object.entries(obj)) {
        result[key] = isArrayOrObject(value)
            ? cloneDeep(value)
            : value;
    }
    return result;
}
