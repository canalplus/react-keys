import ReactDOM from 'react-dom';
import { findBinder } from '../../redux/helper';
import { getBinders, getStore } from '../../store';
import {
  calculateElSpace,
  downLimit,
  hasElementsDiff,
  hasWrapperDiff,
  rightLimit,
} from '../../engines/helpers';
import { build, createList } from '../../engines/mosaic';
import { _updateBinder } from '../../redux/actions';
import { next } from '../../engines/next';

export function refreshState() {
  const dom = ReactDOM.findDOMNode(this);
  const { id, filter, wrapper, selector, direction } = this.innerProps;
  const binder = findBinder(getBinders(), id);
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
    updateState(binder, nextWrapper, nextElements, this.innerProps);
  }
}

export function mountState() {
  const dom = ReactDOM.findDOMNode(this);
  const { id, filter, wrapper, selector } = this.innerProps;
  const binder = findBinder(getBinders(), id);
  if (!binder) {
    return;
  }
  const nextWrapper = calculateElSpace(
    wrapper ? document.querySelector(wrapper) : document.body
  );
  const nextElements = createList(dom, selector, filter);

  updateState(binder, nextWrapper, nextElements, this.innerProps);
}

export const updateState = (binder, nextWrapper, nextElements, props) => {
  const { id, visibilityOffset, refreshStrategy } = props;
  const nextSelection = next(nextElements, binder, refreshStrategy);
  const options = {
    marginLeft: nextSelection.marginLeft,
    marginTop: nextSelection.marginTop,
    offset: visibilityOffset,
    wrapper: nextWrapper,
  };

  const elements = build(nextElements, options);
  const nextEl = elements.find(el => el.id === nextSelection.selectedId);

  const nextState = {
    id,
    wrapper: nextWrapper,
    downLimit: downLimit(elements),
    rightLimit: rightLimit(elements),
    elements: elements,
    prevDir: null,
  };

  _updateBinder({
    ...nextState,
    ...nextSelection,
    nextEl,
  });
};
