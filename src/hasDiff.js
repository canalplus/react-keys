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
