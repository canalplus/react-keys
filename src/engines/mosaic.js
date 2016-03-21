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
  const rightElement = mosaicCoords
    .filter(el => el.top === elCoords.top && el.left > elCoords.left)
    .sort((prev, next) => prev.left - next.left);
  return rightElement[0] ? rightElement[0].id : undefined;
}

export function findLeftElement(elCoords, mosaicCoords) {
  const leftElement = mosaicCoords
    .filter(el => el.top === elCoords.top && el.left < elCoords.left)
    .sort((prev, next) => next.left - prev.left);
  return leftElement[0] ? leftElement[0].id : undefined;
}

export function findDownElement(elCoords, mosaicCoords) {
  const downElement = mosaicCoords
    .filter(el => el.left <= elCoords.left && el.top > elCoords.top)
    .sort((prev, next) => (prev.top - next.top) - (prev.left - next.left));
  return downElement[0] ? downElement[0].id : undefined;
}

export function findUpElement(elCoords, mosaicCoords) {
  const upElement = mosaicCoords
    .filter(el => el.left <= elCoords.left && el.top < elCoords.top)
    .sort((prev, next) => (next.top + next.left) - (prev.top + prev.left));
  return upElement[0] ? upElement[0].id : undefined;
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
