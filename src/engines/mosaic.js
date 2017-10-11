import { calculateElSpace } from './helpers';

export const rightArray = (elCoords, coords) =>
  coords
    .filter(el => elCoords.right <= el.left)
    .sort(elementSort(elCoords, calculRightScore));

export const leftArray = (elCoords, coords) =>
  coords
    .filter(el => elCoords.left >= el.right)
    .sort(elementSort(elCoords, calculLeftScore));

export const downArray = (elCoords, coords) =>
  coords
    .filter(el => elCoords.down <= el.top)
    .sort(elementSort(elCoords, calculDowScore));

export const upArray = (elCoords, coords) =>
  coords
    .filter(el => elCoords.top >= el.down)
    .sort(elementSort(elCoords, calculUpScore));

export const findElement = array => (array[0] ? array[0].id : undefined);

export const elementSort = (elCoords, score) => (prev, next) =>
  score(prev, elCoords) - score(next, elCoords);

export const calculRightScore = (el, elCoords) =>
  Math.abs(el.top - elCoords.top) + Math.abs(el.left - elCoords.right);

export const calculLeftScore = (el, elCoords) =>
  Math.abs(el.top - elCoords.top) + Math.abs(el.right - elCoords.left);

export const calculUpScore = (el, elCoords) =>
  Math.abs(el.down - elCoords.top) + Math.abs(el.left - elCoords.left);

export const calculDowScore = (el, elCoords) =>
  Math.abs(el.top - elCoords.down) + Math.abs(el.left - elCoords.left);

export function build(elements, options) {
  const elementsCoords = elements.map(calculateElSpace);

  return elementsCoords.map(el => ({
    id: el.id,
    coords: {
      ...el,
      right: el.right - options.marginLeft,
      left: el.left - options.marginLeft,
      top: el.top - options.marginTop,
      down: el.down - options.marginTop,
    },
    left: findElement(leftArray(el, elementsCoords)),
    right: findElement(rightArray(el, elementsCoords)),
    up: findElement(upArray(el, elementsCoords)),
    down: findElement(downArray(el, elementsCoords)),
  }));
}

export function createList(dom, selector, filter) {
  return [].slice
    .call(dom.querySelectorAll(selector))
    .filter(
      el => el.id !== '' && [].slice.call(el.classList).indexOf(filter) === -1
    );
}

export function selectedElement(elements, selectedId) {
  const focusedEl = selectedId ? elements.find(e => e.id === selectedId) : null;
  return focusedEl || elements[0];
}

export function refresh(nextElements, selectedId, options) {
  const returnedElements = build(nextElements, options);

  return {
    elements: returnedElements,
    selectedElement: selectedElement(returnedElements, selectedId),
  };
}
