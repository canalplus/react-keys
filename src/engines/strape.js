import {trigger} from '../events';
import {hasDiff} from '../hasDiff';

function build(dom, wrapper, list) {
  const wrapperPosition = dom.querySelector(wrapper).getBoundingClientRect();
  const builtList = [];
  let marginLeft = 0;

  list.forEach((el, index) => {
    const elPosition = el.getBoundingClientRect();
    if (elPosition.width + elPosition.left - wrapperPosition.left >
      wrapperPosition.width + marginLeft) {
      marginLeft = elPosition.left - wrapperPosition.left;
    }

    const coords = {
      id: el.id,
      marginLeft: marginLeft,
      right: index + 1 === list.length ?
        list[0].id : list[index + 1].id,
      left: index - 1 < 0 ?
        list[list.length - 1].id : list[index - 1].id,
    };

    builtList.push(coords);
  });

  return builtList;
}

function createList(dom, children) {
  const elements = dom.querySelectorAll(children);
  return elements ? [].slice.call(elements) : [];
}

export function refresh(dom, prevElements, wrapper, children) {
  const elements = createList(dom, children);
  if (!hasDiff(elements, prevElements)) {
    return {
      elements: prevElements,
      selectedElement: null,
    };
  }
  const nextElements = build(dom, wrapper, elements);
  trigger('strape:update', nextElements);
  return {
    elements: nextElements,
    selectedElement: nextElements[0],
  };
}

export default build;
