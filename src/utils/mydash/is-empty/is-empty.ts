export default function isEmpty(value: unknown): boolean {
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
