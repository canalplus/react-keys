"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._register = _register;
exports.trigger = trigger;
var keysActions = exports.keysActions = [];

function _register(event, callback) {
  keysActions.push({
    event: event,
    callback: callback
  });
}

function trigger(event, context) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keysActions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var action = _step.value;

      if (action.event === event) {
        action.callback(context);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}