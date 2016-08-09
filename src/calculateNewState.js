import { C_UP, C_DOWN, C_LEFT, C_RIGHT } from './constants';

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
