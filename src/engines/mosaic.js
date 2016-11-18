import { calculateElSpace, hasDiff } from './helpers';

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

export function build(elements, options) {
  const elementsCoords = elements
    .filter(el => el.id !== "")
    .filter(el => [].slice.call(el.classList).indexOf(options.filter) === -1)
    .map((calculateElSpace));

  return elementsCoords.map((el) => ({
    id: el.id,
    coords: el,
    left: findElement(leftArray(el, elementsCoords)),
    right: findElement(rightArray(el, elementsCoords)),
    up: findElement(upArray(el, elementsCoords)),
    down: findElement(downArray(el, elementsCoords)),
    marginTop: 0,
    marginLeft: 0,
  }));
}

export function createList(dom, selector) {
  const elements = dom.querySelectorAll(selector);
  return [].slice.call(elements);
}

export function selectedElement(elements, focusedId) {
  const focusedEl = focusedId ? elements.find(e => e.id === focusedId) : null;
  return focusedEl || elements[0];
}

export function refresh(dom, prevElement, selector, focusedId, options) {
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
    selectedElement: selectedElement(nextElements, focusedId),
  };
}
