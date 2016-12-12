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
  const geo = determineGeo(currentElSpace, nextElSpace);

  if (geo.horizontal === 'left' && !isInsideLeft(wrapper, nextElSpace, gap)) {
    newMarginLeft = calculMarginOnLeft(wrapper, nextEl, gap, boundedGap, leftGap);
  } else if (geo.horizontal === 'right' && !isInsideRight(wrapper, nextElSpace, gap)) {
    newMarginLeft = calculMarginOnRight(wrapper, nextEl, gap, rightLimit, boundedGap, rightGap);
  }

  if (geo.vertial === 'top' && !isInsideTop(wrapper, nextElSpace, gap)) {
    newMarginTop = calculMarginOnTop(wrapper, nextEl, gap, boundedGap, topGap);
  } else if (geo.vertial === 'down' && !isInsideDown(wrapper, nextElSpace, gap)) {
    newMarginTop = calculMarginOnDown(wrapper, nextEl, gap, downLimit, boundedGap, downGap, marginTop);
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
  const isLastGap = top - (wrapper.top + lastGap) < 0;
  const computedTop = top - (isLastGap ? lastGap : gap);
  const finalTop = computedTop - wrapper.top;
  return finalTop < 0 && !isLastGap ? 0 : -finalTop;
}

export function calculMarginOnDown(wrapper, selectedEl, gap, downLimit, boundedGap, downGap) {
  const { down } = selectedEl.coords;
  const lastGap = boundedGap || downGap;
  const isLastGap = down + lastGap > downLimit;
  const computedDown = down + (isLastGap ? lastGap : gap);
  return computedDown > downLimit && !isLastGap
    ? -(downLimit - wrapper.down)
    : -(computedDown - wrapper.down);
}

export function calculMarginOnRight(wrapper, selectedEl, gap, rightLimit, boundedGap, rightGap) {
  const { right } = selectedEl.coords;
  const lastGap = boundedGap || rightGap;
  const isLastGap = right + lastGap > rightLimit;
  const computedRight = right + (isLastGap ? lastGap : gap);
  return computedRight > rightLimit && !isLastGap
    ? -(rightLimit - wrapper.right)
    : -(computedRight - wrapper.right);
}

export function calculMarginOnLeft(wrapper, selectedEl, gap, boundedGap, leftGap) {
  const { left } = selectedEl.coords;
  const lastGap = boundedGap || leftGap;
  const isLastGap = left - (wrapper.left + lastGap) < 0;
  const computedLeft = left - (isLastGap ? lastGap : gap);
  const finalLeft = computedLeft - wrapper.left;
  return finalLeft < 0 && !isLastGap ? 0 : -finalLeft;
}
