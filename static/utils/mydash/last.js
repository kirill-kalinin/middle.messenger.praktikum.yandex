function last(list) {
  if (!Array.isArray(list) || !list.length) {
    return undefined;
  }

  return list[list.length - 1];
}