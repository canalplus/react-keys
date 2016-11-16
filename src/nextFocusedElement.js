import{ NAME } from './constants';
import { globalStore } from './listener';
import { ensureState } from './ensure';

export function nextFocusedElement(nextElement, elements, binderId) {
  ensureState();
  const binderState = globalStore.getState()[NAME][binderId] || {};
  return elements.find(el => el.id === binderState.selectedId) || nextElement;
}
