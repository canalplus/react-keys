import { calculateElSpace } from './helpers';
import { isVisible } from './visibility';

export function correctBoundsMargin(focusedId, state) {
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
    marginLeft: isHorizontalInside(wrapper, focusedElSpace, marginLeft)
      ? marginLeft
      : calculMarginOnLeft(wrapper, focusedEl, gap, boundedGap, leftGap),
    marginTop: isVerticalInside(wrapper, focusedElSpace, marginTop)
      ? marginTop
      : calculMarginOnTop(wrapper, focusedEl, gap, boundedGap, topGap),
  };
}

export function boundsMargin(nextId, state, props) {
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
    !isInsideLeft(wrapper, nextElSpace, gap, marginLeft)
  ) {
    newMarginLeft = calculMarginOnLeft(
      wrapper,
      nextEl,
      gap,
      boundedGap,
      leftGap
    );
  } else if (
    (geo.horizontal === 'right' || geo.horizontal === 'equal') &&
    !isInsideRight(wrapper, nextElSpace, gap, marginLeft)
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
    !isInsideTop(wrapper, nextElSpace, gap, newMarginTop)
  ) {
    newMarginTop = calculMarginOnTop(wrapper, nextEl, gap, boundedGap, topGap);
  } else if (
    geo.vertical === 'down' &&
    !isInsideDown(wrapper, nextElSpace, gap, marginTop)
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
}

export function determineGeo(current, next) {
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
}

export function isInsideTop(wrapper, selectedEl, gap, marginTop) {
  const elemPos = selectedEl.top + marginTop;
  return elemPos <= wrapper.height + gap && elemPos > 0;
}

export function isInsideDown(wrapper, selectedEl, gap, marginTop) {
  return wrapper.height >= selectedEl.top + selectedEl.height + marginTop + gap;
}

export function isInsideLeft(wrapper, selectedEl, gap, marginLeft) {
  const elemPos = selectedEl.left + marginLeft;
  return elemPos <= wrapper.width + gap && elemPos > 0;
}

export function isInsideRight(wrapper, selectedEl, gap, marginLeft) {
  return wrapper.width >= selectedEl.left + selectedEl.width + marginLeft + gap;
}

export function isVerticalInside(wrapper, nextElSpace, marginTop) {
  return (
    isInsideTop(wrapper, nextElSpace, 0, marginTop) &&
    isInsideDown(wrapper, nextElSpace, 0, marginTop)
  );
}

export function isHorizontalInside(wrapper, nextElSpace, marginLeft) {
  return (
    isInsideLeft(wrapper, nextElSpace, 0, marginLeft) &&
    isInsideRight(wrapper, nextElSpace, 0, marginLeft)
  );
}

export function calculMarginOnTop(
  wrapper,
  selectedEl,
  gap,
  boundedGap,
  topGap
) {
  const { top } = selectedEl.coords;
  const lastGap = boundedGap || topGap;
  const isLastGap = top + (wrapper.height + lastGap) < 0;
  const computedTop = top - (isLastGap ? lastGap : gap);
  const finalTop = computedTop - wrapper.top;
  return finalTop < 0 && !isLastGap ? 0 : -finalTop;
}

export function calculMarginOnDown(
  wrapper,
  selectedEl,
  gap,
  downLimit,
  boundedGap,
  downGap
) {
  const { down } = selectedEl.coords;
  const lastGap = boundedGap || downGap;
  const isLastGap = down + lastGap > downLimit;
  const computedDown = down + (isLastGap ? lastGap : gap);
  console.log('=> On down', computedDown);
  return computedDown > downLimit && !isLastGap
    ? -(downLimit - wrapper.height)
    : -(computedDown - wrapper.height);
}

export function calculMarginOnRight(
  wrapper,
  selectedEl,
  gap,
  rightLimit,
  boundedGap,
  rightGap
) {
  const { right } = selectedEl.coords;
  const lastGap = boundedGap || rightGap;
  const isLastGap = right + lastGap >= rightLimit;
  const computedRight = right + (isLastGap ? lastGap : gap);

  const result =
    computedRight > rightLimit && !isLastGap
      ? -(rightLimit - wrapper.width)
      : -(computedRight - wrapper.width);

  return result;
}

export function calculMarginOnLeft(
  wrapper,
  selectedEl,
  gap,
  boundedGap,
  leftGap
) {
  const { left } = selectedEl.coords;
  const lastGap = boundedGap || leftGap;
  const isLastGap = left + (wrapper.width + lastGap) > wrapper.width;
  const computedLeft = left - (isLastGap ? lastGap : gap);
  const finalLeft = computedLeft;
  return finalLeft < 0 && !isLastGap ? 0 : -finalLeft;
}
