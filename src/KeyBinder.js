/* eslint no-unused-vars:0 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {refresh as refreshMosaic} from './engines/mosaic';
import {UP, DOWN, LEFT, RIGHT, ENTER} from './keys';
import {refresh as refreshStrape} from './engines/strape';
import {isBlocked, block} from './clock';
import {addListener, removeListener} from './listener';

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

class KeyBinder extends Component {

  constructor(props) {
    super(props);
    this.elements = [];
    this.prevFocusedElement = null;
    this.nextFocusedElement = null;
    this.previousDirection = null;
    this.listenerId = addListener(this.keysHandler, this);
    this.keysOptions = {
      ...{
        strategy: 'progressive',
        gap: 0,
        circular: false,
      }, ...this.props.options,
    };
  }

  static get propTypes() {
    return {
      mode: PropTypes.string,
      focusedElementId: PropTypes.string,
      context: PropTypes.object,
      keys: PropTypes.object,
      wrapper: PropTypes.string,
      wChildren: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      keys: {},
      mode: 'mosaic',
      active: true,
      selector: 'li',
      wrapper: 'ul',
      wChildren: 'li',
    };
  }

  executeFunctionAction(functionAction) {
    functionAction.call(this,
      this.nextFocusedElement || {},
      this.prevFocusedElement || {},
      this.props.context);
  }

  keysHandler(keyCode) {
    if (this.props.active && !isBlocked()) {
      block();
      switch (keyCode) {
        case LEFT:
          if (this.props.keys.onLeftKey && isFunction(this.props.keys.onLeftKey)) {
            this._giveFocusTo('left');
            this.executeFunctionAction(this.props.keys.onLeftKey);
          }
          break;
        case UP:
          if (this.props.keys.onUpKey && isFunction(this.props.keys.onUpKey)) {
            this._giveFocusTo('up');
            this.executeFunctionAction(this.props.keys.onUpKey);
          }
          break;
        case DOWN:
          if (this.props.keys.onDownKey && isFunction(this.props.keys.onDownKey)) {
            this._giveFocusTo('down');
            this.executeFunctionAction(this.props.keys.onDownKey);
          }
          break;
        case RIGHT:
          if (this.props.keys.onRightKey && isFunction(this.props.keys.onRightKey)) {
            this._giveFocusTo('right');
            this.executeFunctionAction(this.props.keys.onRightKey);
          }
          break;
        case ENTER:
          if (this.props.keys.onEnterKey && isFunction(this.props.keys.onEnterKey)) {
            this.executeFunctionAction(this.props.keys.onEnterKey);
          }
          break;
        default:
          break;
      }
    }
  }

  refreshState() {
    const dom = ReactDOM.findDOMNode(this);
    let value = {};
    switch (this.props.mode) {
      case 'strape':
        value = refreshStrape(
          dom,
          this.elements,
          this.props.wrapper,
          this.props.wChildren,
          this.keysOptions);
        break;
      default:
        value = refreshMosaic(dom, this.elements, this.props.selector, this.props.focusedElementId);
        break;
    }
    const {elements, selectedElement} = value;
    this.elements = elements;
    this.nextFocusedElement = selectedElement || this.nextFocusedElement;
  }

  _flipflop(direction) {
    let previousDirection = null;
    switch (direction) {
      case 'up':
        previousDirection = this.previousDirection === 'down' ? 'up' : null;
        break;
      case 'right':
        previousDirection = this.previousDirection === 'left' ? 'right' : null;
        break;
      case 'down':
        previousDirection = this.previousDirection === 'up' ? 'down' : null;
        break;
      case 'left':
        previousDirection = this.previousDirection === 'right' ? 'left' : null;
        break;
      default:
    }
    if (previousDirection) {
      this._updateElements(this.prevFocusedElement, this.nextFocusedElement, previousDirection);
    }
    return !!previousDirection;
  }

  _updateElements(prevFocusElement, nextFocusedElement, previousDirection) {
    const intermediate = prevFocusElement;
    this.prevFocusedElement = nextFocusedElement;
    this.nextFocusedElement = intermediate;
    this.previousDirection = previousDirection;
  }

  _giveFocusTo(direction) {
    if (!this._flipflop(direction)) {
      const intermediate = this.nextFocusedElement;
      if (!intermediate) {
        return null;
      }
      if (intermediate[direction]) {
        this.nextFocusedElement =
          this.elements.find(e => e.id === intermediate[direction]);
      }
      if (this.nextFocusedElement.id !== intermediate.id) {
        this.prevFocusedElement = intermediate;
        this.previousDirection = direction;
      }
    }
    return this.nextFocusedElement;
  }

  componentDidMount() {
    this.refreshState();
  }

  componentDidUpdate() {
    this.refreshState();
  }

  componentWillUnmount() {
    removeListener(this.listenerId);
  }

  render() {
    return <div>{this.props.children}</div>;
  }

}

export default KeyBinder;
