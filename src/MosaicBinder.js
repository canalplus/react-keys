/* eslint no-unused-vars:0 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {refresh} from './engines/mosaic';
import {UP, DOWN, LEFT, RIGHT, ENTER} from './keys';
import {C_UP, C_DOWN, C_LEFT, C_RIGHT} from './constants';
import {isBlocked, block} from './clock';
import {isActive} from './isActive';
import {nextFocusedElement} from './nextFocusedElement';
import {addListener, removeListener, globalStore} from './listener';
import {_addKeyBinderToStore, _updateSelectedId, _activeKeyBinder} from './redux/actions';

class MosaicBinder extends Component {

  static get propTypes() {
    return {
      binderId: PropTypes.string.isRequired,
      selector: PropTypes.string,
      focusedElementId: PropTypes.string,
      context: PropTypes.object,
      active: PropTypes.bool,
      accuracy: PropTypes.number,
      onRight: PropTypes.func,
      onLeft: PropTypes.func,
      onUp: PropTypes.func,
      onDown: PropTypes.func,
      onEnter: PropTypes.func,
      onLeftExit: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.func,
      ]),
      onRightExit: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.func,
      ]),
      onUpExit: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.func,
      ]),
      onDownExit: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.func,
      ]),
    };
  }

  static get defaultProps() {
    return {
      selector: 'li',
      accuracy: 0,
      active: true,
    };
  }

  constructor(props) {
    super(props);
    this.elements = [];
    this.listenerId = addListener(this.keysHandler, this);
    this.prevFocusedElement = null;
    this.nextFocusedElement = null;
    this.previousDirection = null;
    this.hasMoved = false;
  }

  executeFunctionAction(functionAction) {
    functionAction.call(this,
      this.nextFocusedElement || {},
      this.prevFocusedElement || {},
      this.props.context);
  }

  keysHandler(keyCode) {
    if (isActive(globalStore, this.props) && !isBlocked()) {
      this.nextFocusedElement = nextFocusedElement(
        this.nextFocusedElement,
        globalStore,
        this.elements,
        this.props.binderId);
      block();
      switch (keyCode) {
        case LEFT:
          this._giveFocusTo(C_LEFT);
          if (this.hasMoved) {
            _updateSelectedId(
              this.nextFocusedElement.id,
              this.nextFocusedElement.marginLeft,
              this.props.binderId);
            if (this.props.onLeft) {
              this.executeFunctionAction(this.props.onLeft);
            }
          } else if (this.props.onLeftExit) {
            if (typeof this.props.onLeftExit === 'string') {
              _activeKeyBinder(this.props.onLeftExit);
            } else {
              this.props.onLeftExit();
            }
          }

          break;
        case UP:
          this._giveFocusTo(C_UP);
          if (this.hasMoved) {
            _updateSelectedId(
              this.nextFocusedElement.id,
              this.nextFocusedElement.marginLeft,
              this.props.binderId);
            if (this.props.onUp) {
              this.executeFunctionAction(this.props.onUp);
            }
          } else if (this.props.onUpExit) {
            if (typeof this.props.onUpExit === 'string') {
              _activeKeyBinder(this.props.onUpExit);
            } else {
              this.props.onUpExit();
            }
          }
          break;
        case DOWN:
          this._giveFocusTo(C_DOWN);
          if (this.hasMoved) {
            _updateSelectedId(
              this.nextFocusedElement.id,
              this.nextFocusedElement.marginLeft,
              this.props.binderId);
            if (this.props.onDown) {
              this.executeFunctionAction(this.props.onDown);
            }
          } else if (this.props.onDownExit) {
            if (typeof this.props.onDownExit === 'string') {
              _activeKeyBinder(this.props.onDownExit);
            } else {
              this.props.onDownExit();
            }
          }
          break;
        case RIGHT:
          this._giveFocusTo(C_RIGHT);
          if (this.hasMoved) {
            _updateSelectedId(
              this.nextFocusedElement.id,
              this.nextFocusedElement.marginLeft,
              this.props.binderId);
            if (this.props.onRight) {
              this.executeFunctionAction(this.props.onRight);
            }
          } else if (this.props.onRightExit) {
            if (typeof this.props.onRightExit === 'string') {
              _activeKeyBinder(this.props.onRightExit);
            } else {
              this.props.onRightExit();
            }
          }
          break;
        case ENTER:
          if (this.props.onEnter) {
            this.executeFunctionAction(this.props.onEnter);
          }
          break;
        default:
          break;
      }
    }
  }

  refreshState() {
    const dom = ReactDOM.findDOMNode(this);
    const value = refresh(
      dom,
      this.elements,
      this.props.selector,
      this.props.focusedElementId,
      {accuracy: this.props.accuracy},
    );
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
      elements: this.elements,
      selectedId: this.nextFocusedElement.id,
    });
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

export default MosaicBinder;
