import { C_DOWN, C_LEFT, C_RIGHT, C_UP } from '../constants';
import { calculateElSpace } from './helpers';

export function boundsMargin(dir, selectedId, state) {
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
  } = state;
  const selectedEl = elements.find(el => el.id === selectedId);
  const currentEl = calculateElSpace(document.getElementById(selectedId));
  switch (dir) {
    case C_LEFT:
      return {
        marginTop,
        marginLeft: isInsideLeft(wrapper, currentEl, gap)
          ? marginLeft
          : calculMarginOnLeft(wrapper, selectedEl, gap, boundedGap, leftGap),
      };
    case C_UP:
      return {
        marginTop: isInsideTop(wrapper, currentEl, gap)
          ? marginTop
          : calculMarginOnTop(wrapper, selectedEl, gap, boundedGap, topGap),
        marginLeft,
      };
    case C_RIGHT:
      return {
        marginTop,
        marginLeft: isInsideRight(wrapper, currentEl, gap)
          ? marginLeft
          : calculMarginOnRight(wrapper, selectedEl, gap, rightLimit, boundedGap, rightGap),
      };
    case C_DOWN:
      return {
        marginTop: isInsideDown(wrapper, currentEl, gap)
          ? marginTop
          : calculMarginOnDown(wrapper, selectedEl, gap, downLimit, boundedGap, downGap),
        marginLeft,
      };
    default:
      return { marginTop, marginLeft };
  }
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
  const computedTop = top - (top - gap < 0 ? lastGap : gap);
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
  const computedLeft = left - (left - gap < 0 ? lastGap : gap);
  return computedLeft - wrapper.left;
}
