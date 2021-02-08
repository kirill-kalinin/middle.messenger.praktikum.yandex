function first<T>(list: Array<T>): T | undefined {
  if (!Array.isArray(list) || !list.length) {
    return undefined;
  }

  return list[0];
}
