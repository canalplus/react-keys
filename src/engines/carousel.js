export function getPrev(elements, index, circular = true) {
  if (!circular && index === 0) {
    return null;
  }
  return index > 0 ? index - 1 : elements.length - 1;
}

export function getNext(elements, index, circular = true) {
  if (!circular && index === elements.length - 1) {
    return null;
  }
  return index < elements.length - 1 ? index + 1 : 0;
}

export function build(elements, size, index, circular = true) {
  const carousel = [elements[index]];
  const bounds = Math.floor(size / 2);
  let prev = index;
  let next = index;
  let leftbound = false;
  let rightbound = false;
  for (let i = 0; i < bounds; i++) {
    next = getNext(elements, next, circular);
    prev = getPrev(elements, prev, circular);
    if (!leftbound && prev === null) {
      leftbound = true;
    }
    if (!rightbound && next === null) {
      rightbound = true;
    }
    carousel.push(!rightbound ? elements[next] : null);
    carousel.unshift(!leftbound ? elements[prev] : null);
  }
  return carousel;
}
