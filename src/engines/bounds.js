import { calculateElSpace } from './helpers';
import { isVisible } from './visibility';

export const correctBoundsMargin = (focusedId, state) => {
  const {
    wrapper,
    elements,
    marginLeft,
    marginTop,
    gap,
    boundedGap,
    topGap,
    leftGap,
  } = state;

  const focusedEl = elements.find(el => el.id === focusedId);
  const focusedElSpace = calculateElSpace(document.getElementById(focusedId));
  return {
    marginLeft: isReachableHorizontal(wrapper, focusedElSpace, marginLeft)
      ? marginLeft
      : calculMarginOnLeft(focusedEl, gap, boundedGap, leftGap),
    marginTop: isReachableVertical(wrapper, focusedElSpace, marginTop)
      ? marginTop
      : calculMarginOnTop(wrapper, focusedEl, gap, boundedGap, topGap),
  };
};

export const boundsMargin = (nextId, state, props) => {
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
  let newElements = elements;

  if (!props || selectedId === nextId) {
    return {
      marginLeft: newMarginLeft,
      marginTop: newMarginTop,
      elements: newElements,
    };
  }

  const current = document.getElementById(selectedId);
  const next = document.getElementById(nextId);

  if (!current || !next || !wrapper) {
    return {
      marginLeft: newMarginLeft,
      marginTop: newMarginTop,
      elements: newElements,
    };
  }
  const nextEl = elements.find(el => el.id === nextId);
  const currentElSpace = calculateElSpace(current);
  const nextElSpace = calculateElSpace(next);
  const geo = determineGeo(currentElSpace, nextElSpace);
  if (
    geo.horizontal === 'left' &&
    !isReachableLeft(wrapper, nextElSpace, gap, marginLeft)
  ) {
    newMarginLeft = calculMarginOnLeft(nextEl, gap, boundedGap, leftGap);
  } else if (
    (geo.horizontal === 'right' || geo.horizontal === 'equal') &&
    !isReachableRight(wrapper, nextElSpace, gap, marginLeft)
  ) {
    newMarginLeft = calculMarginOnRight(
      wrapper,
      nextEl,
      gap,
      rightLimit,
      boundedGap,
      rightGap
    );
  }

  if (
    geo.vertical === 'top' &&
    !isReachableTop(wrapper, nextElSpace, gap, newMarginTop)
  ) {
    newMarginTop = calculMarginOnTop(wrapper, nextEl, gap, boundedGap, topGap);
  } else if (
    geo.vertical === 'down' &&
    !isReachableDown(wrapper, nextElSpace, gap, marginTop)
  ) {
    newMarginTop = calculMarginOnDown(
      wrapper,
      nextEl,
      gap,
      downLimit,
      boundedGap,
      downGap,
      marginTop
    );
  }

  if (marginLeft !== newMarginLeft || marginTop !== newMarginTop) {
    newElements = elements.map(el => ({
      ...el,
      isVisible: isVisible(
        wrapper,
        el.coords,
        newMarginLeft,
        newMarginTop,
        props.visibilityOffset
      ),
    }));
  }

  return {
    marginLeft: newMarginLeft,
    marginTop: newMarginTop,
    elements: newElements,
  };
};

export const determineGeo = (current, next) => {
  let vertical = 'equal';
  let horizontal = 'equal';
  if (current.left > next.left) {
    horizontal = 'left';
  } else if (current.left < next.left) {
    horizontal = 'right';
  }
  if (current.top > next.top) {
    vertical = 'top';
  } else if (current.top < next.top) {
    vertical = 'down';
  }
  return { vertical, horizontal };
};

export const isReachableTop = (wrapper, selectedEl, gap, marginTop) => {
  const elemPos = selectedEl.top + marginTop;
  return elemPos <= wrapper.height + gap && elemPos >= 0;
};

export const isReachableDown = (wrapper, selectedEl, gap, marginTop) =>
  wrapper.height >= selectedEl.down + marginTop + gap;

export const isReachableLeft = (selectedEl, gap, marginLeft) =>
  selectedEl.left + marginLeft >= gap;

export const isReachableRight = (wrapper, selectedEl, gap, marginLeft) =>
  wrapper.width >= selectedEl.right - marginLeft + gap;

export const isReachableVertical = (wrapper, nextElSpace, marginTop) => {
  return (
    isReachableTop(wrapper, nextElSpace, 0, marginTop) &&
    isReachableDown(wrapper, nextElSpace, 0, marginTop)
  );
};

export const isReachableHorizontal = (wrapper, nextElSpace, marginLeft) => {
  const rl = isReachableLeft(wrapper, nextElSpace, 0, marginLeft);
  const rr = isReachableRight(wrapper, nextElSpace, 0, marginLeft);
  return (
    isReachableLeft(wrapper, nextElSpace, 0, marginLeft) &&
    isReachableRight(wrapper, nextElSpace, 0, marginLeft)
  );
};

export const calculMarginOnTop = (
  wrapper,
  selectedEl,
  gap,
  boundedGap,
  topGap
) => {
  const { top } = selectedEl.coords;
  const lastGap = boundedGap || topGap;
  const isLastGap = top + (wrapper.height + lastGap) < 0;
  const computedTop = top - (isLastGap ? lastGap : gap);
  const finalTop = computedTop - wrapper.top;
  return finalTop < 0 && !isLastGap ? 0 : -finalTop;
};

export const calculMarginOnDown = (
  wrapper,
  selectedEl,
  gap,
  downLimit,
  boundedGap,
  downGap
) => {
  const { down } = selectedEl.coords;
  const lastGap = boundedGap || downGap;
  const isLastGap = down + lastGap > downLimit;
  const computedDown = down + (isLastGap ? lastGap : gap);
  return computedDown > downLimit && !isLastGap
    ? -(downLimit - wrapper.height)
    : -(computedDown - wrapper.height);
};

export const calculMarginOnRight = (
  wrapper,
  selectedEl,
  gap,
  rightLimit,
  boundedGap,
  rightGap
) => {
  const { right } = selectedEl.coords;
  const lastGap = boundedGap || rightGap;
  const isLastGap = right + lastGap >= rightLimit;
  const computedRight = right + (isLastGap ? lastGap : gap);
  return computedRight > rightLimit && !isLastGap
    ? -(rightLimit - wrapper.width)
    : -(computedRight - wrapper.width);
};

export const calculMarginOnLeft = (selectedEl, gap, boundedGap, leftGap) => {
  const { left } = selectedEl.coords;
  const lastGap = boundedGap || leftGap;
  const isLastGap = selectedEl.left === undefined;
  const computedLeft = left - (isLastGap ? lastGap : gap);
  return computedLeft < 0 && !isLastGap ? 0 : -computedLeft;
};
