import {
  VERTICAL,
  EXIT_STRATEGY_MIRROR,
  EXIT_STRATEGY_START,
  EXIT_STRATEGY_MEMORY,
} from '../constants';
import { getDomElement, getCurrentChildren } from './helpers';

export function findIdByStrategy(state, binderId, nextElId = null) {
  if (nextElId) return nextElId;
  const { position, enterStrategy, selectedId, selector, elements } = state[binderId];
  const moved = position === VERTICAL ? 'top' : 'left';
  switch (enterStrategy) {
    case EXIT_STRATEGY_MEMORY:
      return selectedId;
    case EXIT_STRATEGY_MIRROR:
      return findMirrorExitId(binderId, selector, moved, state);
    case EXIT_STRATEGY_START:
      return findStartExitId(selector, moved, binderId);
    default:
      return elements[0].id;
  }
}

export function findMirrorExitId(binderId, selector, moved, state) {
  const currentElement = getDomElement(state['current'].selectedId);
  const currentGap = currentElement ? currentElement.getBoundingClientRect()[moved] : 0;
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
    .filter(el => el[moved] > 0)
    .sort((a, b) => a[moved] - b[moved]);
  return nextFocusedId[0].id;
}

