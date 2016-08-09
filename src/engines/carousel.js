export function getPrev(elements, index) {
  return index > 0 ? index - 1 : elements.length - 1;
}

export function getNext(elements, index) {
  return index < elements.length - 1 ? index + 1 : 0;
}

export function build(elements, size, index) {
  const carousel = [elements[index]];
  const bounds = Math.floor(size / 2);
  let prev = index;
  let next = index;
  for (let i = 0; i < bounds; i++) {
    next = getNext(elements, next);
    prev = getPrev(elements, prev);
    carousel.push(elements[next]);
    carousel.unshift(elements[prev]);
  }
  return carousel;
}
