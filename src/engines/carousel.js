export function getPrev(size, index, circular = true) {
  if (!circular && (index === 0 || index === null)) return null;
  return index > 0 ? index - 1 : size - 1;
}

export function getNext(size, index, circular = true) {
  if (!circular && (index === null || index === size - 1)) return null;
  return index < size - 1 ? index + 1 : 0;
}

export function build(children, size, index, circular = true) {
  const carousel = [children[index]];
  const bounds = Math.floor(size / 2);
  let prev = index;
  let next = index;
  for (let i = 0; i < bounds; i++) {
    next = getNext(children.length, next, circular);
    prev = getPrev(children.length, prev, circular);
    carousel[carousel.length] = next !== null ? children[next] : null;
    carousel.unshift(prev !== null ? children[prev] : null);
  }
  return carousel;
}
