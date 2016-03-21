'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keys = exports.keysInit = exports.KeyBinder = exports.register = undefined;

var _KeyBinder2 = require('./KeyBinder');

var _KeyBinder3 = _interopRequireDefault(_KeyBinder2);

var _events = require('./events');

var _listener = require('./listener');

var _keys = require('./keys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var register = exports.register = _events._register;
var KeyBinder = exports.KeyBinder = _KeyBinder3.default;
var keysInit = exports.keysInit = _listener._init;
var keys = exports.keys = { UP: _keys.UP, DOWN: _keys.DOWN, LEFT: _keys.LEFT, RIGHT: _keys.RIGHT, ENTER: _keys.ENTER };