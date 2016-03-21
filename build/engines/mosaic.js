'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findRightElement = findRightElement;
exports.findLeftElement = findLeftElement;
exports.findDownElement = findDownElement;
exports.findUpElement = findUpElement;
exports.refresh = refresh;

var _hasDiff = require('../hasDiff');

function createCoordsObject(el) {
  var bounds = el.getBoundingClientRect();
  return {
    id: el.id,
    left: bounds.left,
    top: bounds.top
  };
}

function findRightElement(elCoords, mosaicCoords) {
  var rightElement = mosaicCoords.filter(function (el) {
    return el.top === elCoords.top && el.left > elCoords.left;
  }).sort(function (prev, next) {
    return prev.left - next.left;
  });
  return rightElement[0] ? rightElement[0].id : undefined;
}

function findLeftElement(elCoords, mosaicCoords) {
  var leftElement = mosaicCoords.filter(function (el) {
    return el.top === elCoords.top && el.left < elCoords.left;
  }).sort(function (prev, next) {
    return next.left - prev.left;
  });
  return leftElement[0] ? leftElement[0].id : undefined;
}

function findDownElement(elCoords, mosaicCoords) {
  var downElement = mosaicCoords.filter(function (el) {
    return el.left <= elCoords.left && el.top > elCoords.top;
  }).sort(function (prev, next) {
    return prev.top - next.top - (prev.left - next.left);
  });
  return downElement[0] ? downElement[0].id : undefined;
}

function findUpElement(elCoords, mosaicCoords) {
  var upElement = mosaicCoords.filter(function (el) {
    return el.left <= elCoords.left && el.top < elCoords.top;
  }).sort(function (prev, next) {
    return next.top + next.left - (prev.top + prev.left);
  });
  return upElement[0] ? upElement[0].id : undefined;
}

function build(mosaic) {
  var builtMosaic = [];
  var mosaicCoords = mosaic.map(createCoordsObject);

  mosaic.forEach(function (el) {
    var elCoords = mosaicCoords.find(function (e) {
      return e.id === el.id;
    });
    var coords = {
      id: el.id,
      left: findLeftElement(elCoords, mosaicCoords),
      right: findRightElement(elCoords, mosaicCoords),
      up: findUpElement(elCoords, mosaicCoords),
      down: findDownElement(elCoords, mosaicCoords)
    };
    builtMosaic.push(coords);
  });

  return builtMosaic;
}

function createList(dom, selector) {
  var elements = dom.querySelectorAll(selector);
  return [].slice.call(elements);
}

function selectedElement(elements, focusedElementId) {
  var focusedElement = focusedElementId ? elements.find(function (e) {
    return e.id === focusedElementId;
  }) : null;
  return focusedElement || elements[0];
}

function refresh(dom, prevElement, selector, focusedElementId) {
  var elements = createList(dom, selector);
  if (!(0, _hasDiff.hasDiff)(elements, prevElement)) {
    return {
      elements: prevElement,
      selectedElement: null
    };
  }
  var nextElements = build(elements);
  return {
    elements: nextElements,
    selectedElement: selectedElement(nextElements, focusedElementId)
  };
}