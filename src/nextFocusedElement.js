export const nextFocusedElement = (nextElement, store, elements, binderId) => {
  if (store) {
    const binderState = store.getState()['@@keys'][binderId];
    return elements.find(el => el.id === binderState.selectedId) || nextElement;
  }
  return nextElement;
};
