import {
  VERTICAL,
  STRATEGY_MIRROR,
  STRATEGY_START,
  CAROUSEL_TYPE,
} from '../constants';
import { getDomElement, getCurrentChildren } from './helpers';
import { findBinder } from '../redux/helper';

export function findIdByStrategy(state, binderId, nextElId = null) {
  if (nextElId) return nextElId;
  const binder = findBinder(state.binders, binderId);
  if (binder.type === CAROUSEL_TYPE) return binder.selectedId;
  const { position, strategy, selectedId, selector, elements, memory } = binder;
  const moved = position === VERTICAL ? 'top' : 'left';
  switch (strategy) {
    case STRATEGY_MIRROR:
      return findMirrorExitId(binderId, selector, moved, state);
    case STRATEGY_START:
      return findStartExitId(selector, moved, binderId);
  }
  return memory ? selectedId : elements[0] && elements[0].id;
}

export function findMirrorExitId(binderId, selector, moved, state) {
  const currentElement = getDomElement(state['current'].selectedId);
  const currentGap = currentElement
    ? currentElement.getBoundingClientRect()[moved]
    : 0;
  const nextFocusedId = getCurrentChildren(getDomElement(binderId), selector)
    .map(el => ({
      id: el.id,
      diff: Math.abs(el.getBoundingClientRect()[moved] - currentGap),
    }))
    .sort((a, b) => a.diff - b.diff);
  return nextFocusedId[0].id;
}

export function findStartExitId(selector, moved, binderId) {
  const dom = getDomElement(binderId);
  const currentContainer = dom.getBoundingClientRect()[moved];
  const nextFocusedId = getCurrentChildren(dom, selector)
    .map(el => ({
      id: el.id,
      [moved]: el.getBoundingClientRect()[moved] - currentContainer,
    }))
    .filter(el => el[moved] >= 0)
    .sort((a, b) => a[moved] - b[moved]);
  return nextFocusedId[0].id;
}
