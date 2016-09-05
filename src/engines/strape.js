import { trigger } from '../events';
import { hasDiff } from '../hasDiff';
import { C_LEFT, C_RIGHT, C_UP, C_DOWN } from '../constants';

export function findMirrorExitId(leftElement, children, moved) {
  const leftPx = leftElement ? leftElement.getBoundingClientRect()[moved] : 0;
  const nextFocusedId = children
    .map(el => {
      return {
        id: el.id,
        diff: Math.abs(el.getBoundingClientRect()[moved] - leftPx),
      };
    })
    .sort((a, b) => a.diff - b.diff);
  return nextFocusedId[0].id;
}

export function findStartExitId(children, dom, moved) {
  const leftContainer = dom.getBoundingClientRect()[moved];
  const nextFocusedId = children
      .map(el => {
        return {
          id: el.id,
          [moved]: el.getBoundingClientRect()[moved] - leftContainer,
        };
      })
      .filter(el => el[moved] > 0)
      .sort((a, b) => a[moved] - b[moved]);
  return nextFocusedId[0].id;
}

export function calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props) {
  const element = document.getElementById(el.id).getBoundingClientRect();
  let marginLeft = initialMarginLeft;
  let marginTop = initialMarginTop;
  const { gap, lastGap } = props;
  switch (dir) {
    case C_RIGHT:
      if (element.right > wrapperPosition.right) {
        const bonus = el[C_RIGHT] ? gap : lastGap;
        marginLeft = initialMarginLeft + element.right - wrapperPosition.right + bonus;
      }
      break;
    case C_LEFT:
      if (element.left < wrapperPosition.left) {
        const bonus = el[C_LEFT] ? gap : lastGap;
        marginLeft = initialMarginLeft + element.left - wrapperPosition.left - bonus;
      }
      break;
    case C_DOWN:
      if (element.bottom > wrapperPosition.bottom) {
        const bonus = el[C_DOWN] ? gap : lastGap;
        marginTop = initialMarginTop + element.bottom - wrapperPosition.bottom + bonus;
      }
      break;
    case C_UP:
      if (element.top < wrapperPosition.top) {
        const bonus = el[C_UP] ? gap : lastGap;
        marginTop = initialMarginTop + element.top - wrapperPosition.top - bonus;
      }
      break;
    default:
      break;
  }
  return props.position ? marginTop : marginLeft;
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
    wrapper[size] + margin - gap) {
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
  let cards;
  options.position ? cards = list.map(buildCardVerticalStructure) : cards = list.map(buildCardStructure);
  return options.position ? calculateVertical(wrapperPosition, cards, options) : calculate(wrapperPosition, cards, options);
}

export function createList(dom, children) {
  const elements = dom.querySelectorAll(children);
  return elements ? [].slice.call(elements) : [];
}

export function selectedElement(elements, focusedElementId) {
  const focusedElement = focusedElementId
    ? elements.find(e => e.id === focusedElementId) : null;
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
    selectedElement: selectedElement(nextElements, options.focusedElementId),
  };
}

export default build;
