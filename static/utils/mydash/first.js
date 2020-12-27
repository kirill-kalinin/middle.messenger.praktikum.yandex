function first(list) {
  if (!Array.isArray(list) || !list.length) {
    return undefined;
  }

  return list[0];
}