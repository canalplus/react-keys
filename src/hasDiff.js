export function hasDiff(nextEls, prevEls) {
  if (nextEls.length === 0) {
    return false;
  }

  if (prevEls.length === 0) {
    return true;
  }

  return prevEls[0].id !== nextEls[0].id || prevEls.length !== nextEls.length;
}
