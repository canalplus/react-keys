import { trigger } from '../events';
import { hasDiff } from '../hasDiff';
import { C_LEFT, C_RIGHT } from '../constants';

export function findMirrorExitId(leftElement, children) {
  const leftPx = leftElement ? leftElement.getBoundingClientRect().left : 0;
  const nextFocusedId = children
    .map(el => {
      return {
        id: el.id,
        diff: Math.abs(el.getBoundingClientRect().left - leftPx),
      };
    })
    .sort((a, b) => a.diff - b.diff);
  return nextFocusedId[0].id;
}

export function findStartExitId(children, dom) {
  const leftContainer = dom.getBoundingClientRect().left;
  const nextFocusedId = children
    .map(el => {
      return {
        id: el.id,
        left: el.getBoundingClientRect().left - leftContainer,
      };
    })
    .filter(el => el.left > 0)
    .sort((a, b) => a.left - b.left);
  return nextFocusedId[0].id;
}

export function calculateBounds(dir, el, wrapperPosition, initialMarginLeft, props) {
  const element = document.getElementById(el.id).getBoundingClientRect();
  let marginLeft = initialMarginLeft;
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
    default:
      break;
  }
  return marginLeft;
}

export function gapCorrection(card, wrapper, lastCard, options) {
  let gap = card.id === lastCard.id ? options.lastGap : options.gap;
  const maxSize = lastCard.left + lastCard.width;
  if (card.width + card.left + gap > maxSize) {
    const lastMarginLeft = lastCard.left + lastCard.width + options.lastGap
      - (wrapper.width + wrapper.left);
    const currentMarginLeft = card.left + card.width - (wrapper.width + wrapper.left);
    gap = lastMarginLeft - currentMarginLeft;
  }
  return gap;
}

export function defineMarginLeft(card, wrapper, marginLeft, lastCard, options) {
  let margin = marginLeft;
  const gap = gapCorrection(card, wrapper, lastCard, options);
  if (card.width + card.left - wrapper.left >
    wrapper.width + marginLeft - gap) {
    switch (options.strategy) {
      case 'cut':
        margin = card.left - wrapper.left + gap;
        break;
      case 'progressive':
      default:
        margin = card.left + card.width - (wrapper.width + wrapper.left) + gap;
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
  const builtList = [];
  let marginLeft = 0;
  const lastCard = cards[cards.length - 1];
  cards.forEach((card, index) => {
    marginLeft = defineMarginLeft(card, wrapper, marginLeft, lastCard, options);
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

function buildCardStructure(card) {
  const position = card.getBoundingClientRect();
  return {
    id: card.id,
    left: position.left,
    right: position.right,
    width: position.width,
  };
}

export function build(wrapperPosition, list, options) {
  const cards = list.map(buildCardStructure);
  return calculate(wrapperPosition, cards, options);
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
