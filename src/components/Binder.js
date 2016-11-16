/* eslint no-unused-vars:0 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { refresh } from '../engines/mosaic';
import { UP, DOWN, LEFT, RIGHT, ENTER, BACK } from '../keys';
import { C_UP, C_DOWN, C_LEFT, C_RIGHT, BINDER_TYPE, EXIT_STRATEGY_MEMORY } from '../constants';
import { isBlocked, block } from '../clock';
import { isActive } from '../isActive';
import { nextFocusedElement } from '../nextFocusedElement';
import { execCb, enterTo } from '../funcHandler';
import { calculateNewState } from '../calculateNewState';
import { addListener, removeListener } from '../listener';
import { addBinderToStore, updateBinderSelectedId, _updateBinderState } from '../redux/actions';
import { hasDiff } from '../hasDiff';

class Binder extends Component {

  static get propTypes() {
    return {
      id: PropTypes.string.isRequired,
      children: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array,
      ]),
      selector: PropTypes.string,
      filter: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]),
      focusedId: PropTypes.string,
      enterStrategy: PropTypes.string,
      context: PropTypes.object,
      active: PropTypes.bool,
      onRight: PropTypes.func,
      onLeft: PropTypes.func,
      onUp: PropTypes.func,
      onDown: PropTypes.func,
      onEnter: PropTypes.func,
      onBack: PropTypes.func,
      onLeftExit: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]),
      onRightExit: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]),
      onUpExit: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]),
      onDownExit: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]),
    };
  }

  static get defaultProps() {
    return {
      selector: 'li',
      active: true,
      enterStrategy: 'none',
      filter: null,
    };
  }

  constructor(props) {
    super(props);
    this.listenerId = addListener(this.keysHandler, this);
    this.elements = [];
    this.prevEl = null;
    this.nextEl = null;
    this.prevDir = null;
    this.hasMoved = false;
  }

  keysHandler(keyCode) {
    if (isActive(this.props) && !isBlocked()) {
      this.nextEl = nextFocusedElement(
        this.nextEl,
        this.elements,
        this.props.id);
      switch (keyCode) {
        case LEFT:
          this.performAction(C_LEFT, this.props.onLeft, this.props.onLeftExit);
          break;
        case UP:
          this.performAction(C_UP, this.props.onUp, this.props.onUpExit);
          break;
        case RIGHT:
          this.performAction(C_RIGHT, this.props.onRight, this.props.onRightExit);
          break;
        case DOWN:
          this.performAction(C_DOWN, this.props.onDown, this.props.onDownExit);
          break;
        case ENTER:
          if (this.props.onEnter) {
            block();
            execCb(this.props.onEnter, this.nextEl, this, this.props);
          }
          break;
        case BACK:
          if (this.props.onBack) {
            block();
            execCb(this.props.onBack, this.nextEl, this, this.props);
          }
          break;
        default:
          break;
      }
    }
  }

  performAction(dir, cb, exitCb) {
    block();
    this.calculateNewState(dir);
    if (this.hasMoved) {
      updateBinderSelectedId(this.props.id, this.nextEl.id);
      execCb(cb, this.nextEl, this, this.props);
    } else {
      this.resetFlipFlop();
      enterTo(exitCb, this.nextEl.id);
    }
  }

  resetFlipFlop() {
    if (this.props.enterStrategy !== EXIT_STRATEGY_MEMORY) {
      this.prevDir = null;
    }
  }

  refreshState() {
    const dom = ReactDOM.findDOMNode(this);
    const value = refresh(
      dom,
      this.elements,
      this.props.selector,
      this.props.focusedId,
      { filter: this.props.filter }
    );
    const { elements, selectedElement } = value;
    this.nextEl = selectedElement || this.nextEl || {};
    if (hasDiff(elements, this.elements)) {
      this.elements = elements;
      _updateBinderState(this.props.id, {
        id: this.props.id,
        enterStrategy: this.props.enterStrategy,
        elements: this.elements,
        selectedId: this.nextEl.id,
      });
    }
  }

  calculateNewState(direction) {
    const response =
      calculateNewState(direction, this.nextEl, this.prevEl, this.prevDir, this.elements);
    this.nextEl = response.nextEl;
    this.prevEl = response.prevEl;
    this.prevDir = response.prevDir;
    this.hasMoved = response.hasMoved;
  }

  componentDidMount() {
    addBinderToStore(this.props.id, this.props.active, BINDER_TYPE);
    this.refreshState();
  }

  componentDidUpdate() {
    this.refreshState();
  }

  componentWillUnmount() {
    removeListener(this.listenerId);
  }

  render() {
    return <div id={this.props.id}>{this.props.children}</div>;
  }

}

export default Binder;
