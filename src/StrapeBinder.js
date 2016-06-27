/* eslint no-unused-vars:0 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {UP, DOWN, LEFT, RIGHT, ENTER, BACK} from './keys';
import {C_LEFT, C_RIGHT, STRAPE_TYPE} from './constants';
import {refresh, calculateBounds} from './engines/strape';
import {isBlocked, block} from './clock';
import {isActive} from './isActive';
import {execCb, enterTo} from './funcHandler';
import {nextFocusedElement} from './nextFocusedElement';
import {calculateNewState} from './calculateNewState';
import {addListener, removeListener, globalStore} from './listener';
import {
  addKeyBinderToStore,
  updateSelectedId,
  _updateBinderState,
  enter,
} from './redux/actions';
import {hasDiff} from './hasDiff';

class StrapeBinder extends Component {

  static get propTypes() {
    return {
      id: PropTypes.string.isRequired,
      focusedElementId: PropTypes.string,
      context: PropTypes.object,
      onRight: PropTypes.func,
      onLeft: PropTypes.func,
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
      enterStrategy: 'none',
      gap: 0,
      lastGap: 0,
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
  }

  keysHandler(keyCode) {
    if (isActive(globalStore, this.props) && !isBlocked()) {
      this.nextEl = nextFocusedElement(
        this.nextEl,
        globalStore,
        this.elements,
        this.props.id);
      block();
      switch (keyCode) {
        case LEFT:
          this.performAction(C_LEFT, this.props.onLeft, this.props.onLeftExit);
          break;
        case RIGHT:
          this.performAction(C_RIGHT, this.props.onRight, this.props.onRightExit);
          break;
        case ENTER:
          this.prevDir = null;
          execCb(this.props.onEnter, this.nextEl, this, this.props);
          break;
        case UP:
          this.prevDir = null;
          enter(this.props.onUpExit, this.nextEl.id);
          break;
        case DOWN:
          this.prevDir = null;
          enter(this.props.onDownExit, this.nextEl.id);
          break;
        case BACK:
          this.prevDir = null;
          execCb(this.props.onBack, this.nextEl, this, this.props);
          break;
        default:
          break;
      }
    }
  }

  performAction(dir, cb, exitCb) {
    this.calculateNewState(dir);
    if (this.hasMoved) {
      this.marginLeft = this.props.strategy === 'bounds'
        ? calculateBounds(
        dir,
        this.nextEl,
        this.wrapperPosition,
        this.marginLeft,
        this.props)
        : this.nextEl.marginLeft;
      updateSelectedId(this.props.id, this.nextEl.id, this.marginLeft);
      execCb(cb, this.nextEl, this, this.props);
    } else {
      enterTo(exitCb);
    }
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
      }
    );

    const {elements, selectedElement, wrapper} = response;
    this.nextEl = selectedElement || this.nextEl || {};
    if (hasDiff(elements, this.elements)) {
      this.wrapperPosition = wrapper || this.wrapperPosition;
      this.elements = elements;
      _updateBinderState(this.props.id, {
        id: this.props.id,
        elements: this.elements,
        type: STRAPE_TYPE,
        enterStrategy: this.props.enterStrategy,
        selectedId: this.nextEl.id,
        marginLeft: this.nextEl.marginLeft,
        wChildren: this.props.wChildren,
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
    addKeyBinderToStore(this.props.id, this.props.active);
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
