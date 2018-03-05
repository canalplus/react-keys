import { C_UP, C_DOWN, C_LEFT, C_RIGHT } from '../constants';

export function calculateElSpace(el) {
  if (!el) return;

  const width = el.offsetWidth;
  const height = el.offsetHeight;
  const top = el.offsetTop;
  const left = el.offsetLeft;

  return {
    id: el.id,
    width,
    height,
    left,
    top,
    down: top + height,
    right: left + width,
  };
}

export function downLimit(elements) {
  return Math.max.apply(null, elements.map(el => el.coords.down));
}

export function rightLimit(elements) {
  return Math.max.apply(null, elements.map(el => el.coords.right));
}

export function getCurrentChildren(dom, selector) {
  return [].slice.call(dom.querySelectorAll(selector));
}

export function getDomElement(binderId) {
  return document.getElementById(binderId);
}

export function hasElementsDiff(nextEls, prevEls) {
  if (nextEls.length === 0) {
    return false;
  }

  if (prevEls.length === 0 || prevEls.length !== nextEls.length) {
    return true;
  }

  let diff = false;
  let index = 0;
  const minLength = Math.min(nextEls.length, prevEls.length);
  while (index < minLength && !diff) {
    const nextId = nextEls[index].id || nextEls[index].props.id;
    const prevId = prevEls[index].id || prevEls[index].props.id;
    diff = nextId !== prevId;
    index++;
  }

  return diff;
}

export function hasWrapperDiff(nextWrapper, prevWrapper, direction) {
  if (!nextWrapper || !prevWrapper) return false;
  switch (direction) {
    case 'horizontal':
      return !(
        nextWrapper.width === prevWrapper.width &&
        nextWrapper.height === prevWrapper.height &&
        nextWrapper.left === prevWrapper.left
      );
    case 'vertical':
      return !(
        nextWrapper.width === prevWrapper.width &&
        nextWrapper.height === prevWrapper.height &&
        nextWrapper.top === prevWrapper.top
      );
    default:
      return !(
        nextWrapper.width === prevWrapper.width &&
        nextWrapper.height === prevWrapper.height &&
        nextWrapper.top === prevWrapper.top &&
        nextWrapper.left === prevWrapper.left
      );
  }
}

export function flipflop(direction, nextEl, prevEl, prevDir) {
  let _hasMoved = false;
  let _prevEl = prevEl;
  let _nextEl = nextEl;
  let dir = null;
  switch (direction) {
    case C_UP:
      dir = prevDir === C_DOWN ? C_UP : null;
      break;
    case C_RIGHT:
      dir = prevDir === C_LEFT ? C_RIGHT : null;
      break;
    case C_DOWN:
      dir = prevDir === C_UP ? C_DOWN : null;
      break;
    case C_LEFT:
      dir = prevDir === C_RIGHT ? C_LEFT : null;
      break;
    default:
  }
  if (dir) {
    _hasMoved = true;
    const intermediate = prevEl;
    _prevEl = nextEl;
    _nextEl = intermediate;
  } else {
    dir = prevDir;
  }
  return {
    hasMoved: _hasMoved,
    nextEl: _nextEl,
    prevEl: _prevEl,
    prevDir: dir,
  };
}

export function calculateNewState(
  direction,
  nextEl,
  prevEl,
  prevDir,
  elements
) {
  let _hasMoved = false;
  let _nextEl = nextEl;
  let _prevEl = prevEl;
  let _prevDir = prevDir;
  let response = flipflop(direction, nextEl, prevEl, prevDir);
  if (!response.hasMoved) {
    const intermediate = nextEl;
    if (intermediate[direction]) {
      _nextEl = elements.find(e => e.id === intermediate[direction]);
    }
    if (_nextEl.id !== intermediate.id) {
      _hasMoved = true;
      _prevEl = intermediate;
      _prevDir = direction;
    }
    response = {
      hasMoved: _hasMoved,
      nextEl: _nextEl,
      prevEl: _prevEl,
      prevDir: _prevDir,
    };
  }
  return response;
}
