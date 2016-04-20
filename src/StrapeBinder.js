/* eslint no-unused-vars:0 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {UP, DOWN, LEFT, RIGHT, ENTER} from './keys';
import {C_LEFT, C_RIGHT} from './constants';
import {refresh} from './engines/strape';
import {isBlocked, block} from './clock';
import {isActive} from './isActive';
import {nextFocusedElement} from './nextFocusedElement';
import {addListener, removeListener, globalStore} from './listener';
import {
  _addKeyBinderToStore,
  _updateSelectedId,
  _activeKeyBinder,
} from './redux/actions';

class StrapeBinder extends Component {

  static get propTypes() {
    return {
      binderId: PropTypes.string.isRequired,
      focusedElementId: PropTypes.string,
      context: PropTypes.object,
      onRight: PropTypes.func,
      onLeft: PropTypes.func,
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
      strategy: PropTypes.string,
      gap: PropTypes.number,
      lastGap: PropTypes.number,
      circular: PropTypes.bool,
      wrapper: PropTypes.string,
      wChildren: PropTypes.string,
      active: PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      strategy: 'progressive',
      gap: 0,
      lastGap: 0,
      accuracy: 0,
      circular: false,
      wrapper: 'ul',
      wChildren: 'li',
      active: true,
      context: {},
    };
  }

  constructor(props) {
    super(props);
    this.elements = [];
    this.listenerId = addListener(this.keysHandler, this);
    this.prevEl = null;
    this.nextEl = null;
    this.hasMoved = false;
  }

  executeFunctionAction(functionAction) {
    functionAction.call(this,
      this.nextEl || {},
      this.props.context);
  }

  keysHandler(keyCode) {
    if (isActive(globalStore, this.props) && !isBlocked()) {
      this.nextEl = nextFocusedElement(
        this.nextEl,
        globalStore,
        this.elements,
        this.props.binderId);
      block();
      switch (keyCode) {
        case LEFT:
          this._giveFocusTo(C_LEFT);
          if (this.hasMoved) {
            _updateSelectedId(
              this.nextEl.id,
              this.nextEl.marginLeft,
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
        case RIGHT:
          this._giveFocusTo(C_RIGHT);
          if (this.hasMoved) {
            _updateSelectedId(
              this.nextEl.id,
              this.nextEl.marginLeft,
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
        case UP:
          if (this.props.onUpExit) {
            if (typeof this.props.onUpExit === 'string') {
              _activeKeyBinder(this.props.onUpExit);
            } else {
              this.props.onUpExit();
            }
          }
          break;
        case DOWN:
          if (this.props.onDownExit) {
            if (typeof this.props.onDownExit === 'string') {
              _activeKeyBinder(this.props.onDownExit);
            } else {
              this.props.onDownExit();
            }
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
      this.props.wrapper,
      this.props.wChildren,
      {
        gap: this.props.gap,
        lastGap: this.props.lastGap,
        strategy: this.props.strategy,
        cicrular: this.props.circular,
      }
    );

    const {elements, selectedElement} = value;
    this.elements = elements;
    this.nextEl = selectedElement || this.nextEl;
  }

  _giveFocusTo(direction) {
    const intermediate = this.nextEl;
    if (!intermediate) {
      this.hasMoved = false;
      return null;
    }
    if (intermediate[direction]) {
      this.nextEl =
        this.elements.find(e => e.id === intermediate[direction]);
    }
    if (this.nextEl.id !== intermediate.id) {
      this.hasMoved = true;
      this.prevEl = intermediate;
    } else {
      this.hasMoved = false;
    }
    return this.nextEl;
  }

  componentDidMount() {
    this.refreshState();
    if (!this.nextEl) {
      return;
    }
    _addKeyBinderToStore({
      id: this.props.binderId,
      elements: this.elements,
      visibleElements: this.elements.filter(element => element.marginLeft === 0).length,
      selectedId: this.nextEl.id,
      marginLeft: this.nextEl.marginLeft,
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

export default StrapeBinder;
