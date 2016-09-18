import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { UP, DOWN, LEFT, RIGHT, ENTER, BACK } from './keys';
import { C_LEFT, C_RIGHT, C_UP, C_DOWN, STRAPE_TYPE, HORIZONTAL, VERTICAL } from './constants';
import { refresh, calculateBounds } from './engines/strape';
import { isBlocked, block } from './clock';
import { isActive } from './isActive';
import { execCb, enterTo } from './funcHandler';
import { nextFocusedElement } from './nextFocusedElement';
import { calculateNewState } from './calculateNewState';
import { addListener, removeListener } from './listener';
import {
  addKeyBinderToStore,
  updateSelectedId,
  _updateBinderState,
  enter,
} from './redux/actions';
import { hasDiff } from './hasDiff';

class StrapeBinder extends Component {

  static get propTypes() {
    return {
      children: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array,
      ]),
      id: PropTypes.string.isRequired,
      focusedElementId: PropTypes.string,
      context: PropTypes.object,
      onRight: PropTypes.func,
      onLeft: PropTypes.func,
      onUp: PropTypes.func,
      onDown: PropTypes.func,
      onEnter: PropTypes.func,
      onBack: PropTypes.func,
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
      enterStrategy: PropTypes.string,
      gap: PropTypes.number,
      firstGap: PropTypes.number,
      lastGap: PropTypes.number,
      circular: PropTypes.bool,
      wrapper: PropTypes.string,
      wChildren: PropTypes.string,
      active: PropTypes.bool,
      position: PropTypes.string
    };
  }

	static get defaultProps() {
		return {
			strategy: 'progressive',
			enterStrategy: 'none',
			position: HORIZONTAL,
			gap: 0,
			lastGap: 0,
			firstGap: 0,
			accuracy: 0,
			circular: false,
			wrapper: 'ul',
			wChildren: 'li',
			active: false,
			context: {},
		};
	}

  constructor(props) {
    super(props);
    this.elements = [];
    this.wrapperPosition = {};
    this.listenerId = addListener(this.keysHandler, this);
    this.prevEl = null;
    this.nextEl = null;
    this.prevDir = null;
    this.hasMoved = false;
    this.marginLeft = 0;
    this.marginTop = 0;
  }

  isVertical() {
    return this.props.position === VERTICAL;
  }

  keysHandler(keyCode) {
    if (isActive(this.props) && !isBlocked()) {
      this.nextEl = nextFocusedElement(
        this.nextEl,
        this.elements,
        this.props.id);
      switch (keyCode) {
        case LEFT:
          this.isVertical()
            ? this.performEnter(this.props.onLeftExit)
            : this.performAction(C_LEFT, this.props.onLeft, this.props.onLeftExit);
          break;
        case RIGHT:
          this.isVertical()
            ? this.performEnter(this.props.onRightExit)
            : this.performAction(C_RIGHT, this.props.onRight, this.props.onRightExit);
          break;
        case ENTER:
          this.performCallback(this.props.onEnter);
          break;
        case UP:
          this.isVertical()
            ? this.performAction(C_UP, this.props.onUp, this.props.onUpExit)
            : this.performEnter(this.props.onUpExit);
          break;
        case DOWN:
          this.isVertical()
            ? this.performAction(C_DOWN, this.props.onDown, this.props.onDownExit)
            : this.performEnter(this.props.onDownExit);
          break;
        case BACK:
          this.performCallback(this.props.onBack);
          break;
        default:
          break;
      }
    }
  }

  performCallback(callback) {
    if (callback) {
      block();
      this.prevDir = null;
      execCb(callback, this.nextEl, this, this.props);
    }
  }

  performEnter(callback) {
    if (callback) {
      block();
      this.prevDir = null;
      enter(callback, this.nextEl.id);
    }
  }

  performAction(dir, cb, exitCb) {
    const lastCard = this.elements[this.elements.length - 1];
    const firstCard = this.elements[0];
    block();
    this.calculateNewState(dir);
    if (this.hasMoved) {
      if (this.isVertical()) {
        this.marginTop = this.calculateMargin(dir, this.nextEl.marginTop, lastCard, firstCard);
      } else {
        this.marginLeft = this.calculateMargin(dir, this.nextEl.marginLeft, lastCard, firstCard);
      }
      updateSelectedId(this.props.id, this.nextEl.id, this.marginLeft, this.marginTop);
      execCb(cb, this.nextEl, this, this.props);
    } else {
      enterTo(exitCb);
    }
  }

  calculateMargin(dir, margin, lastCard, firstCard) {
    return this.props.strategy === 'bounds'
      ? calculateBounds(
      dir,
      this.nextEl,
      this.wrapperPosition,
      this.marginLeft,
      this.marginTop,
      this.props,
      lastCard,
      firstCard)
      : margin;
  }

  refreshState() {
    const dom = ReactDOM.findDOMNode(this);
    const response = refresh(
      dom,
      this.elements,
      this.props.wrapper,
      this.props.wChildren,
      {
        gap: this.props.gap,
        lastGap: this.props.lastGap,
        strategy: this.props.strategy,
        cicrular: this.props.circular,
        focusedElementId: this.props.focusedElementId,
        position: this.props.position
      }
    );

    const { elements, selectedElement, wrapper } = response;
    this.nextEl = selectedElement || this.nextEl || {};
    if (hasDiff(elements, this.elements)) {
      this.wrapperPosition = wrapper || this.wrapperPosition;
      this.elements = elements;
      _updateBinderState(this.props.id, {
        id: this.props.id,
        elements: this.elements,
        enterStrategy: this.props.enterStrategy,
        selectedId: this.nextEl.id,
        marginLeft: this.nextEl.marginLeft,
        marginTop: this.nextEl.marginTop,
        wChildren: this.props.wChildren,
        position: this.props.position
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
    addKeyBinderToStore(this.props.id, this.props.active, STRAPE_TYPE);
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

export default StrapeBinder;
