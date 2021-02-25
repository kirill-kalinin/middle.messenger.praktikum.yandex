"use strict";
function isEmpty(value) {
    if (!value) {
        return true;
    }
    if (value instanceof Map || value instanceof Set) {
        return !value.size;
    }
    if (value instanceof Map && !Object.keys(value).length) {
        return true;
    }
    return false;
}
//# sourceMappingURL=is-empty.js.map