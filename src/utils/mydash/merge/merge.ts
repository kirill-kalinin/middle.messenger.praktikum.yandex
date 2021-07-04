import { isObject } from '../is-array-or-object/is-array-or-object';

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    const merged = Object.assign({}, lhs, rhs);
    for (const key of Object.keys(merged)) {
        if (isObject(lhs[key]) && isObject(rhs[key])) {
            merged[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
        }
    }
    return merged;
}

type Indexed<T = unknown> = {
    [key in string]: T;
};

export default merge;
