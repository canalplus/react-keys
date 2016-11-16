import { trigger } from '../events';
import { hasDiff } from '../hasDiff';
import {
  C_LEFT,
  C_RIGHT,
  C_UP,
  C_DOWN,
  VERTICAL,
  EXIT_STRATEGY_MIRROR,
  EXIT_STRATEGY_START,
  EXIT_STRATEGY_MEMORY,
} from '../constants';

export function findIdByStrategy(state, binderId, nextElId) {
  const { position, enterStrategy, selectedId, wChildren, elements } = state[binderId];
  const moved = position === VERTICAL ? 'top' : 'left';
  const dom = document.getElementById(binderId) || document;
  const children = [].slice.call(dom.querySelectorAll(wChildren));
  switch (enterStrategy) {
    case EXIT_STRATEGY_MEMORY:
      return selectedId;
    case EXIT_STRATEGY_MIRROR:
      return findMirrorExitId(document.getElementById(nextElId), children, moved);
    case EXIT_STRATEGY_START:
      return findStartExitId(children, dom, moved);
    default:
      return elements[0].id;
  }
}

export function findMirrorExitId(leftElement, children, moved) {
  const leftPx = leftElement ? leftElement.getBoundingClientRect()[moved] : 0;
  const nextFocusedId = children
    .map(el => ({
      id: el.id,
      diff: Math.abs(el.getBoundingClientRect()[moved] - leftPx),
    }))
    .sort((a, b) => a.diff - b.diff);
  return nextFocusedId[0].id;
}

export function findStartExitId(children, dom, moved) {
  const leftContainer = dom.getBoundingClientRect()[moved];
  const nextFocusedId = children
    .map(el => ({
      id: el.id,
      [moved]: el.getBoundingClientRect()[moved] - leftContainer,
    }))
    .filter(el => el[moved] > 0)
    .sort((a, b) => a[moved] - b[moved]);
  return nextFocusedId[0].id;
}

export function calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props, lastCard, firstCard) {
  const isVertical = props.position === VERTICAL;
  const first = document.getElementById(firstCard.id).getBoundingClientRect();
  const element = document.getElementById(el.id).getBoundingClientRect();
  const last = document.getElementById(lastCard.id).getBoundingClientRect();
  let marginLeft = initialMarginLeft;
  let marginTop = initialMarginTop;
  const { gap, firstGap, lastGap } = props;
  switch (dir) {
    case C_RIGHT:
      if (last.right > wrapperPosition.right && element.right + gap > wrapperPosition.right) {
        marginLeft = initialMarginLeft + element.right - wrapperPosition.right + gap;
      } else if (element.right + gap > wrapperPosition.right && !el[C_RIGHT]) {
        marginLeft = initialMarginLeft + element.right - wrapperPosition.right + lastGap;
      }
      break;
    case C_LEFT:
      if (first.left < wrapperPosition.left && element.left < wrapperPosition.left + gap) {
        marginLeft = initialMarginLeft + element.left - wrapperPosition.left - gap;
      } else if (element.left < wrapperPosition.left + gap && !el[C_LEFT]) {
        marginLeft = initialMarginLeft + element.left - wrapperPosition.left - lastGap;
      }
      break;
    case C_DOWN:
      if (last.bottom > wrapperPosition.bottom && element.bottom + gap > wrapperPosition.bottom) {
        const bonus = el[C_DOWN] ? gap : lastGap;
        if (initialMarginTop < 0) {
          marginTop = 0;
        } else {
          marginTop = initialMarginTop + element.bottom - wrapperPosition.bottom + bonus;
        }
      } else if (element.bottom + gap > wrapperPosition.bottom) {
        if (lastGap >= gap) {
          const bonus = el[C_DOWN] ? gap : lastGap;
          marginTop = initialMarginTop + element.bottom - wrapperPosition.bottom + bonus;
        } else if (!el[C_DOWN]) {
          marginTop = initialMarginTop + element.bottom - wrapperPosition.bottom + lastGap;
        }
      }
      break;
    case C_UP:
      if (first.top < wrapperPosition.top && element.top < wrapperPosition.top + gap) {
        const bonus = el[C_UP] ? gap : firstGap;
        marginTop = initialMarginTop + element.top - wrapperPosition.top - bonus;
      } else if (element.top < wrapperPosition.top + gap && !el[C_UP]) {
        marginTop = initialMarginTop + element.top - wrapperPosition.top - firstGap;
      }
      break;
    default:
      break;
  }
  return isVertical ? marginTop : marginLeft;
}

export function gapCorrection(card, wrapper, lastCard, options, moved, size) {
  let gap = card.id === lastCard.id ? options.lastGap : options.gap;
  const maxSize = lastCard[moved] + lastCard[size];
  if (card[size] + card[moved] + gap > maxSize) {
    const lastMarginLeft = lastCard[moved] + lastCard[size] + options.lastGap
      - (wrapper[size] + wrapper[moved]);
    const currentMarginLeft = card[moved] + card[size] - (wrapper[size] + wrapper[moved]);
    gap = lastMarginLeft - currentMarginLeft;
  }
  return gap;
}

export function defineMargin(card, wrapper, marge, lastCard, options, moved, size) {
  let margin = marge;
  const gap = gapCorrection(card, wrapper, lastCard, options, moved, size);
  if (card[size] + card[moved] - wrapper[moved] >
    wrapper[size] + margin + gap) {
    switch (options.strategy) {
      case 'cut':
        margin = card[moved] - wrapper[moved] + gap;
        break;
      case 'progressive':
      default:
        margin = card[moved] + card[size] - (wrapper[size] + wrapper[moved]) + gap;
    }
  }
  return margin;
}

export function findRightElement(cards, index, circular) {
  let elementId = undefined;
  if (index + 1 === cards.length) {
    if (circular) {
      elementId = cards[0].id;
    }
  } else {
    elementId = cards[index + 1].id;
  }
  return elementId;
}

export function findLeftElement(cards, index, circular) {
  let elementId = undefined;
  if (index - 1 < 0) {
    if (circular) {
      elementId = cards[cards.length - 1].id;
    }
  } else {
    elementId = cards[index - 1].id;
  }
  return elementId;
}

export function calculate(wrapper, cards, options) {
  const moved = 'left';
  const size = 'width';
  const builtList = [];
  let marginLeft = 0;
  const lastCard = cards[cards.length - 1];
  cards.forEach((card, index) => {
    marginLeft = defineMargin(card, wrapper, marginLeft, lastCard, options, moved, size);
    const coords = {
      id: card.id,
      marginLeft: marginLeft,
      right: findRightElement(cards, index, options.circular),
      left: findLeftElement(cards, index, options.circular),
    };
    builtList.push(coords);
  });
  return builtList;
}

export function calculateVertical(wrapper, cards, options) {
  const moved = 'top';
  const size = 'height';
  const builtList = [];
  let marginTop = 0;
  const lastCard = cards[cards.length - 1];
  cards.forEach((card, index) => {
    marginTop = defineMargin(card, wrapper, marginTop, lastCard, options, moved, size);
    const coords = {
      id: card.id,
      marginTop: marginTop,
      down: findRightElement(cards, index, options.circular),
      up: findLeftElement(cards, index, options.circular),
    };
    builtList.push(coords);
  });
  return builtList;
}

function buildCardStructure(card) {
  const position = card.getBoundingClientRect();
  return {
    id: card.id,
    left: position.left,
    right: position.right,
    width: position.width,
  };
}

function buildCardVerticalStructure(card) {
  const position = card.getBoundingClientRect();
  return {
    id: card.id,
    bottom: position.bottom,
    top: position.top,
    height: position.height,
  };
}

export function build(wrapperPosition, list, options) {
  const isVertical = options.position === VERTICAL;
  const cards = isVertical ? list.map(buildCardVerticalStructure) : list.map(buildCardStructure);
  return isVertical ? calculateVertical(wrapperPosition, cards, options) : calculate(wrapperPosition, cards, options);
}

export function createList(dom, children) {
  const elements = dom.querySelectorAll(children);
  return elements ? [].slice.call(elements) : [];
}

export function selectedElement(elements, focusedId) {
  const focusedElement = focusedId
    ? elements.find(e => e.id === focusedId) : null;
  return focusedElement || elements[0];
}

export function refresh(dom, prevElements, wrapper, children, options) {
  const elements = createList(dom, children);
  if (!hasDiff(elements, prevElements)) {
    return {
      elements: prevElements,
      wrapper: null,
      selectedElement: null,
    };
  }
  const wrapperPosition = dom.querySelector(wrapper).getBoundingClientRect();
  const nextElements = build(wrapperPosition, elements, options);
  trigger('strape:update', nextElements);
  return {
    elements: nextElements,
    wrapper: wrapperPosition,
    selectedElement: selectedElement(nextElements, options.focusedId),
  };
}

export default build;
