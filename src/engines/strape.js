import {trigger} from '../events';
import {hasDiff} from '../hasDiff';

export function defineMarginLeft(card, wrapper, marginLeft, options) {
  let margin = marginLeft;
  if (card.width + card.left - wrapper.left >
    wrapper.width + marginLeft) {
    switch (options.strategy) {
      case 'cut':
        margin = card.left - wrapper.left + options.gap;
        break;
      case 'progressive':
      default:
        margin = card.left + card.width - (wrapper.width + wrapper.left) + options.gap;
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

  cards.forEach((card, index) => {
    marginLeft = defineMarginLeft(card, wrapper, marginLeft, options);
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

function build(dom, wrapper, list, options) {
  const wrapperPosition = dom.querySelector(wrapper).getBoundingClientRect();
  const cards = list.map(buildCardStructure);
  return calculate(wrapperPosition, cards, options);
}

function createList(dom, children) {
  const elements = dom.querySelectorAll(children);
  return elements ? [].slice.call(elements) : [];
}

export function refresh(dom, prevElements, wrapper, children, options) {
  const elements = createList(dom, children);
  if (!hasDiff(elements, prevElements)) {
    return {
      elements: prevElements,
      selectedElement: null,
    };
  }
  const nextElements = build(dom, wrapper, elements, options);
  trigger('strape:update', nextElements);
  return {
    elements: nextElements,
    selectedElement: nextElements[0],
  };
}

export default build;
