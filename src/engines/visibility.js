export const insideHorizontal = (wrapper, card, marginLeft, offset) =>
  wrapper.left - offset - marginLeft <= card.left &&
  wrapper.right + offset - marginLeft >= card.right;

export const insideRight = (wrapper, card, marginLeft, offset) =>
  wrapper.left - offset - marginLeft >= card.left &&
  wrapper.left - offset - marginLeft <= card.right;

export const insideLeft = (wrapper, card, marginLeft, offset) =>
  wrapper.right + offset - marginLeft >= card.left &&
  wrapper.right + offset - marginLeft <= card.right;

export const isHorizontalVisible = (
  wrapper,
  card,
  marginLeft = 0,
  offset = 0
) =>
  insideHorizontal(wrapper, card, marginLeft, offset) ||
  insideRight(wrapper, card, marginLeft, offset) ||
  insideLeft(wrapper, card, marginLeft, offset);

export const insideVertical = (wrapper, card, marginTop, offset) =>
  wrapper.top - offset - marginTop <= card.top &&
  wrapper.down + offset - marginTop >= card.down;

export const insideTop = (wrapper, card, marginTop, offset) =>
  wrapper.top - offset - marginTop >= card.top &&
  wrapper.top - offset - marginTop <= card.down;

export const insideDown = (wrapper, card, marginTop, offset) =>
  wrapper.down + offset - marginTop >= card.top &&
  wrapper.down + offset - marginTop <= card.down;

export const isVerticalVisible = (wrapper, card, marginTop = 0, offset = 0) =>
  insideVertical(wrapper, card, marginTop, offset) ||
  insideTop(wrapper, card, marginTop, offset) ||
  insideDown(wrapper, card, marginTop, offset);

export const isVisible = (wrapper, card, marginLeft, marginTop, offset) => {
  return (
    isHorizontalVisible(wrapper, card, marginLeft, offset) &&
    isVerticalVisible(wrapper, card, marginTop, offset)
  );
};
