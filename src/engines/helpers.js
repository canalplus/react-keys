import { C_UP, C_DOWN, C_LEFT, C_RIGHT } from '../constants';

export function calculateElSpace(el) {
  const { left, top, width, height } = el.getBoundingClientRect();
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

export function hasDiff(nextEls, prevEls) {
  if (nextEls.length === 0) {
    return false;
  }

  if (prevEls.length === 0 || prevEls.length !== nextEls.length) {
    return true;
  }

  let diff = false;
  let index = 0;
  while (index < nextEls.length && !diff) {
    if (nextEls[index].id !== prevEls[index].id) {
      diff = true;
    }
    index++;
  }

  return diff;
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

export function calculateNewState(direction, nextEl, prevEl, prevDir, elements) {
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
