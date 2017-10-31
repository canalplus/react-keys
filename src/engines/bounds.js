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
    marginLeft: isHorizontalInside(wrapper, focusedElSpace)
      ? marginLeft
      : calculMarginOnLeft(wrapper, focusedEl, gap, boundedGap, leftGap),
    marginTop: isVerticalInside(wrapper, focusedElSpace)
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

  if (selectedId === nextId) {
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

  if (geo.horizontal === 'left' && !isInsideLeft(wrapper, nextElSpace, gap)) {
    newMarginLeft = calculMarginOnLeft(
      wrapper,
      nextEl,
      gap,
      boundedGap,
      leftGap
    );
  } else if (
    (geo.horizontal === 'right' || geo.horizontal === 'equal') &&
    !isInsideRight(wrapper, nextElSpace, gap)
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

  if (geo.vertical === 'top' && !isInsideTop(wrapper, nextElSpace, gap)) {
    newMarginTop = calculMarginOnTop(wrapper, nextEl, gap, boundedGap, topGap);
  } else if (
    (geo.vertical === 'down' || geo.horizontal === 'equal') &&
    !isInsideDown(wrapper, nextElSpace, gap)
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

export function isVerticalInside(wrapper, nextElSpace) {
  return (
    isInsideTop(wrapper, nextElSpace, 0) &&
    isInsideDown(wrapper, nextElSpace, 0)
  );
}

export function isHorizontalInside(wrapper, nextElSpace) {
  return (
    isInsideLeft(wrapper, nextElSpace, 0) &&
    isInsideRight(wrapper, nextElSpace, 0)
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
  const isLastGap = top - (wrapper.top + lastGap) < 0;
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
  return computedDown > downLimit && !isLastGap
    ? -(downLimit - wrapper.down)
    : -(computedDown - wrapper.down);
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
  const isLastGap = right + lastGap > rightLimit;
  const computedRight = right + (isLastGap ? lastGap : gap);
  return computedRight > rightLimit && !isLastGap
    ? -(rightLimit - wrapper.right)
    : -(computedRight - wrapper.right);
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
  const isLastGap = left - (wrapper.left + lastGap) < 0;
  const computedLeft = left - (isLastGap ? lastGap : gap);
  const finalLeft = computedLeft - wrapper.left;
  return finalLeft < 0 && !isLastGap ? 0 : -finalLeft;
}
