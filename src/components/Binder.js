/* eslint no-unused-vars:0 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { refresh } from '../engines/mosaic';
import { UP, DOWN, LEFT, RIGHT, ENTER } from '../keys';
import { NAME, C_UP, C_DOWN, C_LEFT, C_RIGHT, BINDER_TYPE } from '../constants';
import { isBlocked, block } from '../clock';
import blocks from '../blocks';
import { isActive } from '../isActive';
import { execCb } from '../funcHandler';
import { globalStore, addListener, removeListener } from '../listener';
import {
  addBinderToStore,
  _updateBinder,
  determineNewState,
  updatePosition,
} from '../redux/actions';
import {
  calculateElSpace,
  downLimit,
  rightLimit,
  hasDiff,
} from '../engines/helpers';

class Binder extends Component {

  static get propTypes() {
    return {
      id: PropTypes.string.isRequired,
      children: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array,
      ]),
      selector: PropTypes.string,
      wrapper: PropTypes.string,
      filter: PropTypes.string,
      gap: PropTypes.number,
      boundedGap: PropTypes.number,
      topGap: PropTypes.number,
      rightGap: PropTypes.number,
      leftGap: PropTypes.number,
      downGap: PropTypes.number,
      enterStrategy: PropTypes.string,
      active: PropTypes.bool,
      onRight: PropTypes.func,
      onLeft: PropTypes.func,
      onUp: PropTypes.func,
      onDown: PropTypes.func,
      onEnter: PropTypes.func,
      debounce: PropTypes.number,
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
      gap: 20,
      boundedGap: 0,
      topGap: 0,
      rightGap: 0,
      leftGap: 0,
      downGap: 0,
    };
  }

  constructor(props) {
    super(props);
    this.listenerId = addListener(this.keysHandler, this);
  }

  keysHandler(keyCode) {
    if (isActive(this.props)
      && !isBlocked()
      && !blocks.isBlocked(this.props.id)) {
      const {
        id,
        onLeft,
        onLeftExit,
        onUp,
        onUpExit,
        onRight,
        onRightExit,
        onDown,
        onDownExit,
        onEnter,
      } = this.props;
      const { nextEl } = globalStore.getState()['@@keys'][id];
      switch (keyCode) {
        case LEFT:
          this.performAction(C_LEFT, onLeft, onLeftExit);
          break;
        case UP:
          this.performAction(C_UP, onUp, onUpExit);
          break;
        case RIGHT:
          this.performAction(C_RIGHT, onRight, onRightExit);
          break;
        case DOWN:
          this.performAction(C_DOWN, onDown, onDownExit);
          break;
        case ENTER:
          if (onEnter) {
            block();
            execCb(onEnter, nextEl, this);
          }
          break;
        default:
          break;
      }
    }
  }

  performAction(dir, cb, exitCb) {
    const { id, debounce } = this.props;
    block(debounce);
    determineNewState(id, dir, cb, exitCb, this);
  }

  refreshState() {
    const dom = ReactDOM.findDOMNode(this);
    const { id, filter, wrapper } = this.props;
    const state = globalStore.getState()[NAME][id];
    const { elements, selectedElement } = refresh(
      dom,
      state.elements,
      state.selector,
      state.selectedId,
      { filter: filter, marginLeft: state.marginLeft, marginTop: state.marginTop }
    );
    if (hasDiff(elements, state.elements)) {
      _updateBinder(id, {
        wrapper: calculateElSpace(wrapper ? document.querySelector(wrapper) : document.body),
        downLimit: downLimit(elements),
        rightLimit: rightLimit(elements),
        elements: elements,
        nextEl: selectedElement || {},
        selectedId: selectedElement.id,
      });
      updatePosition(id, selectedElement.id);
    }
  }

  componentDidMount() {
    addBinderToStore(this.props, BINDER_TYPE);
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
