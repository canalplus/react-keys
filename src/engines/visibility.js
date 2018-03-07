export const insideRight = (wrapper, card, marginLeft, offset) =>
  card.left + marginLeft <= wrapper.width + offset;

export const insideLeft = (wrapper, card, marginLeft, offset) =>
  card.right + marginLeft >= 0 - offset;

export const isHorizontalVisible = (
  wrapper,
  card,
  marginLeft = 0,
  offset = 0
) =>
  insideLeft(wrapper, card, marginLeft, offset) &&
  insideRight(wrapper, card, marginLeft, offset);

export const isVerticalVisible = (wrapper, card, marginTop = 0, offset = 0) =>
  insideTop(wrapper, card, marginTop, offset) &&
  insideDown(wrapper, card, marginTop, offset);

export const insideTop = (wrapper, card, marginTop, offset) =>
  card.top + card.height + marginTop >= 0 - offset;

export const insideDown = (wrapper, card, marginTop, offset) =>
  card.top + marginTop <= wrapper.height + offset;

export const isVisible = (wrapper, card, marginLeft, marginTop, offset) => {
  return (
    isHorizontalVisible(wrapper, card, marginLeft, offset) &&
    isVerticalVisible(wrapper, card, marginTop, offset)
  );
};
