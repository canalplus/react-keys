/* eslint no-unused-vars:0 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {refresh as refreshMosaic} from './engines/mosaic';
import {UP, DOWN, LEFT, RIGHT, ENTER} from './keys';
import {C_UP, C_DOWN, C_LEFT, C_RIGHT} from './constants';
import {refresh as refreshStrape} from './engines/strape';
import {isBlocked, block} from './clock';
import {addListener, removeListener, globalStore} from './listener';
import {_addKeyBinderToStore, _updateSelectedId} from './redux/actions';

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
    this.hasMoved = false;
    this.listenerId = addListener(this.keysHandler, this);
    this.keysOptions = {
      ...{
        strategy: 'progressive',
        gap: 0,
        lastGap: 0,
        accuracy: 0,
        circular: false,
      }, ...this.props.options,
    };
  }

  static get propTypes() {
    return {
      binderId: PropTypes.string.isRequired,
      mode: PropTypes.string,
      focusedElementId: PropTypes.string,
      context: PropTypes.object,
      keys: PropTypes.object,
      onLeftExit: PropTypes.func,
      onRightExit: PropTypes.func,
      onUpExit: PropTypes.func,
      onDownExit: PropTypes.func,
      wrapper: PropTypes.string,
      wChildren: PropTypes.string,
      options: PropTypes.object,
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
      options: {},
    };
  }

  executeFunctionAction(functionAction) {
    functionAction.call(this,
      this.nextFocusedElement || {},
      this.prevFocusedElement || {},
      this.props.context);
  }

  keysHandler(keyCode) {
    const state = globalStore.getState()['@@keys'];
    if (state.activeBinder === this.props.binderId && !isBlocked()) {
      this.nextFocusedElement = this.elements.find(el => el.id === state.selectedKeyId);
      block();
      switch (keyCode) {
        case LEFT:
          this._giveFocusTo(C_LEFT);
          _updateSelectedId(this.nextFocusedElement.id, this.nextFocusedElement.marginLeft);
          if (this.hasMoved) {
            if (this.props.keys.onLeftKey && isFunction(this.props.keys.onLeftKey)) {
              this.executeFunctionAction(this.props.keys.onLeftKey);
            }
          } else if (this.props.onLeftExit) {
            this.props.onLeftExit();
          }

          break;
        case UP:
          this._giveFocusTo(C_UP);
          _updateSelectedId(this.nextFocusedElement.id, this.nextFocusedElement.marginLeft);
          if (this.hasMoved) {
            if (this.props.keys.onUpKey && isFunction(this.props.keys.onUpKey)) {
              this.executeFunctionAction(this.props.keys.onUpKey);
            }
          } else if (this.props.onUpExit) {
            this.props.onUpExit();
          }
          break;
        case DOWN:
          this._giveFocusTo(C_DOWN);
          _updateSelectedId(this.nextFocusedElement.id, this.nextFocusedElement.marginLeft);
          if (this.hasMoved) {
            if (this.props.keys.onDownKey && isFunction(this.props.keys.onDownKey)) {
              this.executeFunctionAction(this.props.keys.onDownKey);
            }
          } else if (this.props.onDownExit) {
            this.props.onDownExit();
          }
          break;
        case RIGHT:
          this._giveFocusTo(C_RIGHT);
          _updateSelectedId(this.nextFocusedElement.id, this.nextFocusedElement.marginLeft);
          if (this.hasMoved) {
            if (this.props.keys.onRightKey && isFunction(this.props.keys.onRightKey)) {
              this.executeFunctionAction(this.props.keys.onRightKey);
            }
          } else if (this.props.onRightExit) {
            this.props.onRightExit();
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
          this.keysOptions,
        );
        break;
      default:
        value = refreshMosaic(
          dom,
          this.elements,
          this.props.selector,
          this.props.focusedElementId,
          this.keysOptions,
        );
        break;
    }
    const {elements, selectedElement} = value;
    this.elements = elements;
    this.nextFocusedElement = selectedElement || this.nextFocusedElement;
  }

  _flipflop(direction) {
    let previousDirection = null;
    switch (direction) {
      case C_UP:
        previousDirection = this.previousDirection === C_DOWN ? C_UP : null;
        break;
      case C_RIGHT:
        previousDirection = this.previousDirection === C_LEFT ? C_RIGHT : null;
        break;
      case C_DOWN:
        previousDirection = this.previousDirection === C_UP ? C_DOWN : null;
        break;
      case C_LEFT:
        previousDirection = this.previousDirection === C_RIGHT ? C_LEFT : null;
        break;
      default:
    }
    if (previousDirection) {
      const intermediate = this.prevFocusedElement;
      this.prevFocusedElement = this.nextFocusedElement;
      this.nextFocusedElement = intermediate;
      this.previousDirection = previousDirection;
      this.hasMoved = true;
    }
    return !!previousDirection;
  }

  _giveFocusTo(direction) {
    if (!this._flipflop(direction)) {
      const intermediate = this.nextFocusedElement;
      if (!intermediate) {
        this.hasMoved = false;
        return null;
      }
      if (intermediate[direction]) {
        this.nextFocusedElement =
          this.elements.find(e => e.id === intermediate[direction]);
      }
      if (this.nextFocusedElement.id !== intermediate.id) {
        this.hasMoved = true;
        this.prevFocusedElement = intermediate;
        this.previousDirection = direction;
      } else {
        this.hasMoved = false;
      }
    }
    return this.nextFocusedElement;
  }

  componentDidMount() {
    this.refreshState();
    _addKeyBinderToStore({
      id: this.props.binderId,
      selectedId: this.nextFocusedElement.id,
      marginLeft: this.nextFocusedElement.marginLeft,
    });
  }

  componentDidUpdate() {
    console.log('UPDATE');
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
