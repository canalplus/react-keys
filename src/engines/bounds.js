import { calculateElSpace } from './helpers';

export function boundsMargin(nextId, state) {
  const {
    wrapper,
    elements,
    marginLeft,
    marginTop,
    downLimit,
    rightLimit,
    gap,
    boundedGap,
    topGap,
    rightGap,
    leftGap,
    downGap,
    selectedId,
  } = state;

  let newMarginLeft = marginLeft;
  let newMarginTop = marginTop;
  const current = document.getElementById(selectedId);
  const next = document.getElementById(nextId);

  if (!current || !next) {
    return { marginLeft: newMarginLeft, marginTop: newMarginTop };
  }
  const nextEl = elements.find(el => el.id === nextId);
  const currentElSpace = calculateElSpace(current);
  const nextElSpace = calculateElSpace(next);

  const selectedElementChanded = state.selectedId !== nextId;
  const currentForGeo = selectedElementChanded ? currentElSpace : { top: state.marginTop, left: state.marginLeft };
  const nextForGeo = selectedElementChanded ? nextElSpace : { top: nextElSpace.top - wrapper.top, left: wrapper.left - nextElSpace.left };

  const geo = determineGeo(currentForGeo, nextForGeo);

  if (geo.horizontal === 'left' && !isInsideLeft(wrapper, nextElSpace, gap)) {
    newMarginLeft = calculMarginOnLeft(wrapper, nextEl, gap, boundedGap, leftGap);
  } else if (geo.horizontal === 'right' && !isInsideRight(wrapper, nextElSpace, gap)) {
    newMarginLeft = calculMarginOnRight(wrapper, nextEl, gap, rightLimit, boundedGap, rightGap);
  }

  if (geo.vertial === 'top' && !isInsideTop(wrapper, nextElSpace, gap)) {
    newMarginTop = calculMarginOnTop(wrapper, nextEl, gap, boundedGap, topGap);
  } else if (geo.vertial === 'down' && !isInsideDown(wrapper, nextElSpace, gap)) {
    newMarginTop = calculMarginOnDown(wrapper, nextEl, gap, downLimit, boundedGap, downGap);
  }

  return { marginLeft: newMarginLeft, marginTop: newMarginTop };
}

export function determineGeo(current, next) {
  let vertial = 'equal';
  let horizontal = 'equal';
  if (current.left > next.left) {
    horizontal = 'left';
  } else if (current.left < next.left) {
    horizontal = 'right';
  }
  if (current.top > next.top) {
    vertial = 'top';
  } else if (current.top < next.top) {
    vertial = 'down';
  }
  return { vertial, horizontal }
}

export function isInsideTop(wrapper, selectedEl, gap) {
  return selectedEl.top >= wrapper.top + gap;
}

export function isInsideDown(wrapper, selectedEl, gap) {
  return wrapper.down >= selectedEl.down + gap;
}

export function isInsideLeft(wrapper, selectedEl, gap) {
  return selectedEl.left >= wrapper.left + gap;
}

export function isInsideRight(wrapper, selectedEl, gap) {
  return wrapper.right >= selectedEl.right + gap;
}

export function calculMarginOnTop(wrapper, selectedEl, gap, boundedGap, topGap) {
  const { top } = selectedEl.coords;
  const lastGap = boundedGap || topGap;
  const nextGap = lastGap + top - wrapper.top;
  const computedTop = top - (top - (wrapper.top + gap) < 0 ? nextGap : gap);
  return computedTop - wrapper.top;
}

export function calculMarginOnDown(wrapper, selectedEl, gap, downLimit, boundedGap, downGap) {
  const { down } = selectedEl.coords;
  const lastGap = boundedGap || downGap;
  const computedDown = down + (down + gap > downLimit ? lastGap : gap);
  return computedDown - wrapper.down;
}

export function calculMarginOnRight(wrapper, selectedEl, gap, rightLimit, boundedGap, rightGap) {
  const { right } = selectedEl.coords;
  const lastGap = boundedGap || rightGap;
  const computedRight = right + (right + gap > rightLimit ? lastGap : gap);
  return computedRight - wrapper.right;
}

export function calculMarginOnLeft(wrapper, selectedEl, gap, boundedGap, leftGap) {
  const { left } = selectedEl.coords;
  const lastGap = boundedGap || leftGap;
  const computedLeft = left - ((left - (wrapper.left + gap)) < 0 ? lastGap : gap);
  return computedLeft - wrapper.left;
}
