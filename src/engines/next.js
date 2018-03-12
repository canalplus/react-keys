import { correctBoundsMargin } from './bounds';

export const next = (elements, oldElements, binder, refreshStrategy) => {
  const { selectedId } = binder;
  let nextEl = {};
  if (isPresent(elements, selectedId)) {
    nextEl = elements.find(e => e.id === selectedId);
    const margins = correctBoundsMargin(nextEl.id, binder);
    return { selectedId: nextEl.id, ...margins };
  }
  if (refreshStrategy === 'previous' && selectedId) {
    const nextEl = findPreviousElement(
      binder.selectedId,
      oldElements,
      elements
    );
    const margins = correctBoundsMargin(nextEl.id, binder);
    return {
      selectedId: nextEl.id,
      ...margins,
    };
  }
  if (elements.length > 0) {
    nextEl = elements[0];
    return {
      selectedId: nextEl.id,
      marginLeft: 0,
      marginTop: 0,
    };
  }
  return {
    selectedId: undefined,
    marginLeft: 0,
    marginTop: 0,
  };
};

const findPreviousElement = (selectedId, oldElements, newElements, inc = 0) => {
  const index = oldElements.map(e => e.id).indexOf(selectedId);
  const newIndex = index === 0 ? 0 : index - 1;
  return !isPresent(newElements, oldElements[newIndex].id) &&
    inc < newElements.length
    ? findPreviousElement(
        oldElements[newIndex].id,
        oldElements,
        newElements,
        inc + 1
      )
    : newElements[newIndex];
};

const isPresent = (elements, selectedId) =>
  selectedId !== undefined &&
  elements.map(e => e.id).some(id => id === selectedId);
