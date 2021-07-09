export default function trim(value: string, exclude = '\\s'): string {
    const pattern = `^[${exclude}]+|[${exclude}]+$`;
    const regEx = new RegExp(pattern, 'g');
    return value.replace(regEx, '');
}
