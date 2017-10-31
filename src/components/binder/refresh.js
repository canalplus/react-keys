import ReactDOM from 'react-dom';
import { findBinder } from '../../redux/helper';
import { globalStore } from '../../listener';
import { NAME } from '../../constants';
import {
  calculateElSpace,
  downLimit,
  hasElementsDiff,
  hasWrapperDiff,
  rightLimit,
} from '../../engines/helpers';
import { createList, refresh } from '../../engines/mosaic';
import { _updateBinder, updatePosition } from '../../redux/actions';

export function refreshState() {
  const dom = ReactDOM.findDOMNode(this);
  const {
    id,
    filter,
    wrapper,
    selector,
    refreshStrategy,
    direction,
    visibilityOffset,
  } = this.innerProps;
  const binder = findBinder(globalStore.getState()[NAME].binders, id);
  if (!binder) {
    return;
  }
  const nextWrapper = calculateElSpace(
    wrapper ? document.querySelector(wrapper) : document.body
  );
  const nextElements = createList(dom, selector, filter);

  const hasDiff =
    hasElementsDiff(nextElements, binder.elements) ||
    (hasWrapperDiff(nextWrapper, binder.wrapper, direction) &&
      nextElements.length > 0);
  if (hasDiff) {
    const options = {
      marginLeft: binder.marginLeft,
      marginTop: binder.marginTop,
      offset: visibilityOffset,
      wrapper: nextWrapper,
    };
    let { elements, selectedElement } = refresh(
      nextElements,
      binder.selectedId,
      options
    );

    if (
      refreshStrategy === 'previous' &&
      binder.selectedId &&
      !isPresent(elements, binder.selectedId)
    ) {
      const previousElement = findPreviousElement(
        binder.selectedId,
        binder.elements,
        elements
      );
      selectedElement = previousElement;
    }

    _updateBinder({
      id: id,
      wrapper: nextWrapper,
      downLimit: downLimit(elements),
      rightLimit: rightLimit(elements),
      elements: elements,
      nextEl: selectedElement,
      selectedId: selectedElement.id,
      prevDir: null,
    });
    if (binder.elements.length > 0) {
      updatePosition(id, selectedElement.id);
    }
  }
}

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
