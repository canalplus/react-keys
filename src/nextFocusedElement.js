import{ NAME } from './constants';
import { globalStore } from './listener';

export function nextFocusedElement(nextElement, elements, binderId) {
  if (!globalStore.getState()[NAME]) {
    throw new Error('keys state not present un global state');
  }
  const binderState = globalStore.getState()[NAME][binderId] || {};
  return elements.find(el => el.id === binderState.selectedId) || nextElement;
}
