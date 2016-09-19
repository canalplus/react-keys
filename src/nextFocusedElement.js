import{ NAME } from './constants';

export function nextFocusedElement(nextElement, store, elements, binderId) {
  if (store.getState) {
    const binderState = store.getState()[NAME][binderId];
    return elements.find(el => el.id === binderState.selectedId) || nextElement;
  }
  return nextElement;
}
