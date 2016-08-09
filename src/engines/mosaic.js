import { hasDiff } from '../hasDiff';

function createCoordsObject(el) {
  const bounds = el.getBoundingClientRect();
  return {
    id: el.id,
    left: bounds.left,
    top: bounds.top,
  };
}

export function isBetween(value, max, min) {
  return typeof value === 'number' && value <= max && value >= min;
}

export function findRightElement(elCoords, coords, options) {
  const rightElement = coords
    .filter(el =>
    isBetween(el.top, elCoords.top + options.accuracy, elCoords.top - options.accuracy)
    && el.left > elCoords.left)
    .sort((prev, next) => prev.left - next.left);
  return rightElement[0] ? rightElement[0].id : undefined;
}

export function findLeftElement(elCoords, coords, options) {
  const leftElement = coords
    .filter(el =>
    isBetween(el.top, elCoords.top + options.accuracy, elCoords.top - options.accuracy)
    && el.left < elCoords.left)
    .sort((prev, next) => next.left - prev.left);
  return leftElement[0] ? leftElement[0].id : undefined;
}

export function findDownElement(elCoords, coords, options) {
  const downElement = coords
    .filter(el => el.left <= elCoords.left + options.accuracy && el.top > elCoords.top)
    .sort((prev, next) => (prev.top - next.top) - (prev.left - next.left));
  return downElement[0] ? downElement[0].id : undefined;
}

export function findUpElement(elCoords, coords, options) {
  const upElement = coords
    .filter(el => el.left <= elCoords.left + options.accuracy && el.top < elCoords.top)
    .sort((prev, next) => (next.top + next.left) - (prev.top + prev.left));
  return upElement[0] ? upElement[0].id : undefined;
}


export function build(mosaic, options) {
  const builtMosaic = [];
  const mosaicCoords = mosaic.map(createCoordsObject);

  mosaic.forEach((el) => {
    const elCoords = mosaicCoords.find(e => e.id === el.id);
    const coords = {
      id: el.id,
      left: findLeftElement(elCoords, mosaicCoords, options),
      right: findRightElement(elCoords, mosaicCoords, options),
      up: findUpElement(elCoords, mosaicCoords, options),
      down: findDownElement(elCoords, mosaicCoords, options),
    };
    builtMosaic.push(coords);
  });

  return builtMosaic;
}

export function createList(dom, selector) {
  const elements = dom.querySelectorAll(selector);
  return [].slice.call(elements);
}

export function selectedElement(elements, focusedElementId) {
  const focusedElement = focusedElementId
    ? elements.find(e => e.id === focusedElementId) : null;
  return focusedElement || elements[0];
}

export function refresh(dom, prevElement, selector, focusedElementId, options) {
  const elements = createList(dom, selector);
  if (!hasDiff(elements, prevElement)) {
    return {
      elements: prevElement,
      selectedElement: null,
    };
  }
  const nextElements = build(elements, options);
  return {
    elements: nextElements,
    selectedElement: selectedElement(nextElements, focusedElementId),
  };
}
