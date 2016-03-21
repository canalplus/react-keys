'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _mosaic = require('./engines/mosaic');

var _keys = require('./keys');

var _strape = require('./engines/strape');

var _clock = require('./clock');

var _listener = require('./listener');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-unused-vars:0 */


function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

var KeyBinder = function (_Component) {
  _inherits(KeyBinder, _Component);

  function KeyBinder(props) {
    _classCallCheck(this, KeyBinder);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(KeyBinder).call(this, props));

    _this.elements = [];
    _this.prevFocusedElement = null;
    _this.nextFocusedElement = null;
    _this.listenerId = (0, _listener.addListener)(_this.keysHandler, _this);
    return _this;
  }

  _createClass(KeyBinder, [{
    key: 'executeFunctionAction',
    value: function executeFunctionAction(functionAction) {
      functionAction.call(this, this.nextFocusedElement || {}, this.prevFocusedElement || {}, this.props.context);
    }
  }, {
    key: 'keysHandler',
    value: function keysHandler(keyCode) {
      if (this.props.active && !(0, _clock.isBlocked)()) {
        (0, _clock.block)();
        switch (keyCode) {
          case _keys.LEFT:
            if (this.props.keys.onLeftKey && isFunction(this.props.keys.onLeftKey)) {
              this._giveFocusTo('left');
              this.executeFunctionAction(this.props.keys.onLeftKey);
            }
            break;
          case _keys.UP:
            if (this.props.keys.onUpKey && isFunction(this.props.keys.onUpKey)) {
              this._giveFocusTo('up');
              this.executeFunctionAction(this.props.keys.onUpKey);
            }
            break;
          case _keys.DOWN:
            if (this.props.keys.onDownKey && isFunction(this.props.keys.onDownKey)) {
              this._giveFocusTo('down');
              this.executeFunctionAction(this.props.keys.onDownKey);
            }
            break;
          case _keys.RIGHT:
            if (this.props.keys.onRightKey && isFunction(this.props.keys.onRightKey)) {
              this._giveFocusTo('right');
              this.executeFunctionAction(this.props.keys.onRightKey);
            }
            break;
          case _keys.ENTER:
            if (this.props.keys.onEnterKey && isFunction(this.props.keys.onEnterKey)) {
              this.executeFunctionAction(this.props.keys.onEnterKey);
            }
            break;
          default:
            break;
        }
      }
    }
  }, {
    key: 'refreshState',
    value: function refreshState() {
      var dom = _reactDom2.default.findDOMNode(this);
      var value = {};
      switch (this.props.mode) {
        case 'strape':
          value = (0, _strape.refresh)(dom, this.elements, this.props.wrapper, this.props.wChildren);
          break;
        default:
          value = (0, _mosaic.refresh)(dom, this.elements, this.props.selector, this.props.focusedElementId);
          break;
      }
      var _value = value;
      var elements = _value.elements;
      var selectedElement = _value.selectedElement;

      this.elements = elements;
      this.nextFocusedElement = selectedElement || this.nextFocusedElement;
    }
  }, {
    key: '_giveFocusTo',
    value: function _giveFocusTo(direction) {
      var _this2 = this;

      this.prevFocusedElement = this.nextFocusedElement;
      if (!this.prevFocusedElement) {
        return null;
      }
      if (this.prevFocusedElement[direction]) {
        this.nextFocusedElement = this.elements.find(function (e) {
          return e.id === _this2.prevFocusedElement[direction];
        });
      }
      return this.nextFocusedElement;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refreshState();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.refreshState();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _listener.removeListener)(this.listenerId);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.props.children
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        mode: _react.PropTypes.string,
        focusedElementId: _react.PropTypes.string,
        context: _react.PropTypes.object,
        keys: _react.PropTypes.object,
        wrapper: _react.PropTypes.string,
        wChildren: _react.PropTypes.string
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        keys: {},
        mode: 'mosaic',
        active: true,
        selector: 'li',
        wrapper: 'ul',
        wChildren: 'li'
      };
    }
  }]);

  return KeyBinder;
}(_react.Component);

exports.default = KeyBinder;