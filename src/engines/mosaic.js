import { hasDiff } from '../hasDiff';

export function createCoordsObject(el) {
  const { left, top, width, height } = el.getBoundingClientRect();
  return {
    id: el.id,
    right: left + width,
    down: top + height,
    left,
    top,
  };
}

export const rightArray = (elCoords, coords) => coords
  .filter(el => elCoords.right <= el.left)
  .sort(elementSort(elCoords, calculRightScore));

export const leftArray = (elCoords, coords) => coords
  .filter(el => elCoords.left >= el.right)
  .sort(elementSort(elCoords, calculLeftScore));

export const downArray = (elCoords, coords) => coords
  .filter(el => elCoords.down <= el.top)
  .sort(elementSort(elCoords, calculDowScore));

export const upArray = (elCoords, coords) => coords
  .filter(el => elCoords.top >= el.down)
  .sort(elementSort(elCoords, calculUpScore));

export const findElement = array => array[0] ? array[0].id : undefined;

export const elementSort = (elCoords, score) =>
  (prev, next) => score(prev, elCoords) - score(next, elCoords);

export const calculRightScore =
  (el, elCoords) => Math.abs(el.top - elCoords.top) + Math.abs(el.left - elCoords.right);

export const calculLeftScore =
  (el, elCoords) => Math.abs(el.top - elCoords.top) + Math.abs(el.right - elCoords.left);

export const calculUpScore =
  (el, elCoords) => Math.abs(el.down - elCoords.top) + Math.abs(el.left - elCoords.left);

export const calculDowScore =
  (el, elCoords) => Math.abs(el.top - elCoords.down) + Math.abs(el.left - elCoords.left);

export function build(mosaic, options) {
  const mosaicCoords = mosaic
    .filter(el => el.id !== "")
    .filter(el => [].slice.call(el.classList).indexOf(options.filter) === -1)
    .map((createCoordsObject));

  return mosaicCoords.map((el) => ({
    id: el.id,
    left: findElement(leftArray(el, mosaicCoords)),
    right: findElement(rightArray(el, mosaicCoords)),
    up: findElement(upArray(el, mosaicCoords)),
    down: findElement(downArray(el, mosaicCoords)),
  }));
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
