/* eslint no-unused-vars:0 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {UP, DOWN, LEFT, RIGHT, ENTER} from './keys';
import {C_LEFT, C_RIGHT} from './constants';
import {refresh} from './engines/strape';
import {isBlocked, block} from './clock';
import {isActive} from './isActive';
import {execCb, exitTo} from './funcHandler';
import {nextFocusedElement} from './nextFocusedElement';
import {calculateNewState} from './calculateNewState';
import {addListener, removeListener, globalStore} from './listener';
import {_addKeyBinderToStore, _updateSelectedId, _updateBinderState} from './redux/actions';
import {hasDiff} from './hasDiff';

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
    this.prevDir = null;
    this.hasMoved = false;
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
          this.performAction(C_LEFT, this.props.onLeft, this.props.onLeftExit);
          break;
        case RIGHT:
          this.performAction(C_RIGHT, this.props.onRight, this.props.onRightExit);
          break;
        case ENTER:
          execCb(this.props.onEnter, this.nextEl, this, this.props);
          break;
        case UP:
          exitTo(this.props.onUpExit);
          break;
        case DOWN:
          exitTo(this.props.onDownExit);
          break;
        default:
          break;
      }
    }
  }

  performAction(dir, cb, exitCb) {
    this.calculateNewState(dir);
    if (this.hasMoved) {
      _updateSelectedId(this.nextEl.id, this.nextEl.marginLeft, this.props.binderId);
      execCb(cb, this.nextEl, this, this.props);
    } else {
      exitTo(exitCb);
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
        focusedElementId: this.props.focusedElementId,
      }
    );

    const {elements, selectedElement} = value;
    this.nextEl = selectedElement || this.nextEl || {};
    if (hasDiff(elements, this.elements)) {
      this.elements = elements;
      _updateBinderState(this.props.binderId, {
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
