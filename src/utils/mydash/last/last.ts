function last<T>(list: Array<T>): T | undefined {
  if (!Array.isArray(list) || !list.length) {
    return undefined;
  }

  return list[list.length - 1];
}
