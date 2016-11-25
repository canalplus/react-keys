import {
  VERTICAL,
  EXIT_STRATEGY_MIRROR,
  EXIT_STRATEGY_START,
  EXIT_STRATEGY_MEMORY,
} from '../constants';

export function findIdByStrategy(binderState, binderId, nextElId) {
  const { position, enterStrategy, selectedId, selector, elements } = binderState;
  const moved = position === VERTICAL ? 'top' : 'left';
  const dom = document.getElementById(binderId) || document;
  const children = [].slice.call(dom.querySelectorAll(selector));
  switch (enterStrategy) {
    case EXIT_STRATEGY_MEMORY:
      return selectedId;
    case EXIT_STRATEGY_MIRROR:
      return findMirrorExitId(document.getElementById(nextElId), children, moved);
    case EXIT_STRATEGY_START:
      return findStartExitId(children, dom, moved);
    default:
      return elements[0].id;
  }
}

export function findMirrorExitId(leftElement, children, moved) {
  const leftPx = leftElement ? leftElement.getBoundingClientRect()[moved] : 0;
  const nextFocusedId = children
    .map(el => ({
      id: el.id,
      diff: Math.abs(el.getBoundingClientRect()[moved] - leftPx),
    }))
    .sort((a, b) => a.diff - b.diff);
  return nextFocusedId[0].id;
}

export function findStartExitId(children, dom, moved) {
  const leftContainer = dom.getBoundingClientRect()[moved];
  const nextFocusedId = children
    .map(el => ({
      id: el.id,
      [moved]: el.getBoundingClientRect()[moved] - leftContainer,
    }))
    .filter(el => el[moved] > 0)
    .sort((a, b) => a[moved] - b[moved]);
  return nextFocusedId[0].id;
}

