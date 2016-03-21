'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cb = cb;
exports._init = _init;
exports.addListener = addListener;
exports.removeListener = removeListener;
var keysListeners = exports.keysListeners = [];

function cb(e) {
  var keyCode = e.keyCode ? e.keyCode : e;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keysListeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var listener = _step.value;

      listener.callback.call(listener.context, keyCode);
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

function _init(bindkeysFunc) {
  if (!bindkeysFunc) {
    document.addEventListener('keydown', cb);
  } else {
    bindkeysFunc(cb);
  }
}

function addListener(callback, context) {
  var id = Math.random().toString(36).substring(2, 5);
  keysListeners.push({
    id: id,
    callback: callback,
    context: context
  });
  return id;
}

function removeListener(id) {
  exports.keysListeners = keysListeners = keysListeners.filter(function (listener) {
    return listener.id !== id;
  });
}