import { isObject, PlainObject } from "../is-array-or-object/is-array-or-object";

type Indexed<T = unknown> = {
    [key in string]: T;
};

export default function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (!isObject(object)) {
        return object;
    }

    const splittedPath = path.split('.');

    let current = object;
    let i = 0;
    while (i < splittedPath.length - 1) {
        if (!isObject(current[splittedPath[i]])) {
            current[splittedPath[i]] = {};
        }
        current = current[splittedPath[i]] as PlainObject<unknown>;
        i++;
    }
    current[splittedPath[i]] = value;
    return object;
}
