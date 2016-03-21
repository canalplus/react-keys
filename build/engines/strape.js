'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refresh = refresh;

var _events = require('../events');

var _hasDiff = require('../hasDiff');

function build(dom, wrapper, list) {
  var wrapperPosition = dom.querySelector(wrapper).getBoundingClientRect();
  var builtList = [];
  var marginLeft = 0;

  list.forEach(function (el, index) {
    var elPosition = el.getBoundingClientRect();
    if (elPosition.width + elPosition.left - wrapperPosition.left > wrapperPosition.width + marginLeft) {
      marginLeft = elPosition.left - wrapperPosition.left;
    }

    var coords = {
      id: el.id,
      marginLeft: marginLeft,
      right: index + 1 === list.length ? list[0].id : list[index + 1].id,
      left: index - 1 < 0 ? list[list.length - 1].id : list[index - 1].id
    };

    builtList.push(coords);
  });

  return builtList;
}

function createList(dom, children) {
  var elements = dom.querySelectorAll(children);
  return elements ? [].slice.call(elements) : [];
}

function refresh(dom, prevElements, wrapper, children) {
  var elements = createList(dom, children);
  if (!(0, _hasDiff.hasDiff)(elements, prevElements)) {
    return {
      elements: prevElements,
      selectedElement: null
    };
  }
  var nextElements = build(dom, wrapper, elements);
  (0, _events.trigger)('strape:update', nextElements);
  return {
    elements: nextElements,
    selectedElement: nextElements[0]
  };
}

exports.default = build;