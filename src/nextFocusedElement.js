export function nextFocusedElement(nextElement, store, elements, binderId) {
  if (store.getState) {
    const binderState = store.getState()['@@keys'][binderId];
    return elements.find(el => el.id === binderState.selectedId) || nextElement;
  }
  return nextElement;
}
