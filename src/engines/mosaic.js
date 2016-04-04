import {hasDiff} from '../hasDiff';

function createCoordsObject(el) {
  const bounds = el.getBoundingClientRect();
  return {
    id: el.id,
    left: bounds.left,
    top: bounds.top,
  };
}

export function findRightElement(elCoords, mosaicCoords) {
  const rightElements = mosaicCoords
    .filter(el => el.left > elCoords.left)
    .sort((prev, next) =>
    (Math.abs(prev.top - elCoords.top) - Math.abs(next.top - elCoords.top))
    - (next.left - prev.left));
  return rightElements[0] ? rightElements[0].id : undefined;
}

export function findLeftElement(elCoords, mosaicCoords) {
  const leftElements = mosaicCoords
    .filter(el => el.left < elCoords.left)
    .sort((prev, next) => prev.left +
    (Math.abs(prev.top - elCoords.top) - Math.abs(next.top - elCoords.top)));
  return leftElements[0] ? leftElements[0].id : undefined;
}

export function findDownElement(elCoords, mosaicCoords) {
  const downElements = mosaicCoords
    .filter(el => el.top > elCoords.top)
    .sort((prev, next) =>
    (Math.abs(prev.left - elCoords.left) - Math.abs(next.left - elCoords.left))
    - (next.top - prev.top));
  return downElements[0] ? downElements[0].id : undefined;
}

export function findUpElement(elCoords, mosaicCoords) {
  const upElements = mosaicCoords
    .filter(el => el.top < elCoords.top)
    .sort((prev, next) =>
    prev.top +
    (Math.abs(prev.left - elCoords.left) - Math.abs(next.left - elCoords.left)));
  return upElements[0] ? upElements[0].id : undefined;
}


function build(mosaic) {
  const builtMosaic = [];
  const mosaicCoords = mosaic.map(createCoordsObject);

  mosaic.forEach((el) => {
    const elCoords = mosaicCoords.find(e => e.id === el.id);
    const coords = {
      id: el.id,
      left: findLeftElement(elCoords, mosaicCoords),
      right: findRightElement(elCoords, mosaicCoords),
      up: findUpElement(elCoords, mosaicCoords),
      down: findDownElement(elCoords, mosaicCoords),
    };
    builtMosaic.push(coords);
  });

  return builtMosaic;
}

function createList(dom, selector) {
  const elements = dom.querySelectorAll(selector);
  return [].slice.call(elements);
}

function selectedElement(elements, focusedElementId) {
  const focusedElement = focusedElementId
    ? elements.find(e => e.id === focusedElementId) : null;
  return focusedElement || elements[0];
}

export function refresh(dom, prevElement, selector, focusedElementId) {
  const elements = createList(dom, selector);
  if (!hasDiff(elements, prevElement)) {
    return {
      elements: prevElement,
      selectedElement: null,
    };
  }
  const nextElements = build(elements);
  return {
    elements: nextElements,
    selectedElement: selectedElement(nextElements, focusedElementId),
  };
}
