export function rangeRight(start: number, end?: number, step?: number): number[] {
    return range(start, end, step, true);
}

export function range(start: number, end?: number, step?: number, isRight?: boolean): number[] {
    const result: number[] = [];

    if (end === undefined) {
        end = start;
        start = 0;
    }

    const range = end - start;

    if (!range) {
        return result;
    }

    if (step === undefined) {
        step = range < 0 ? -1 : 1;
    }

    const length = Math.abs(range / step) ^ 0;

    for (let i = 0; i < length; i++) {
        result.push(start + i * step);
    }

    return isRight ? result.reverse() : result;
}
