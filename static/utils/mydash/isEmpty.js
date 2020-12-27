function isEmpty(value) {
  const isFalsy = !value;
  if (isFalsy) {
    return true;
  }

  const stringTag = value[Symbol.toStringTag];
  if (stringTag === 'Map' || stringTag === 'Set') {
    return !value.size;
  }

  const isZeroLength = !Object.keys(value).length;
  if (isZeroLength) {
    return true;
  }

  return false;
}