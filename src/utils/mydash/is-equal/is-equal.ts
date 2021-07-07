import { isObject, PlainObject } from "../is-array-or-object/is-array-or-object";

export default function isEqual(a: PlainObject, b: PlainObject): boolean {
    for (let key in a) {
        let result;
        if (isObject(a[key]) && isObject(b[key])) {
            result = isEqual(a[key] as PlainObject<unknown>, b[key] as PlainObject<unknown>);
        } else {
            result = a[key] === b[key];
        }
        if (!result) {
            return false;
        }
    }
    return true;
}
