/* eslint no-unused-vars:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { createList, refresh } from '../engines/mosaic';
import { BINDER_TYPE, C_DOWN, C_LEFT, C_RIGHT, C_UP, NAME } from '../constants';
import { block, isBlocked } from '../clock';
import blocks from '../blocks';
import { isActive } from '../isActive';
import { execCb } from '../funcHandler';
import {
  addListener,
  globalStore,
  removeListener,
  userConfig,
} from '../listener';
import {
  _updateBinder,
  addBinder,
  determineNewState,
  _removeBinder,
  updatePosition,
} from '../redux/actions';
import {
  calculateElSpace,
  downLimit,
  hasElementsDiff,
  hasWrapperDiff,
  rightLimit,
} from '../engines/helpers';
import { findBinder } from '../redux/helper';

class Binder extends Component {
  static get propTypes() {
    return {
      id: PropTypes.string.isRequired,
      children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      selector: PropTypes.string,
      position: PropTypes.string,
      wrapper: PropTypes.string,
      filter: PropTypes.string,
      gap: PropTypes.number,
      boundedGap: PropTypes.number,
      topGap: PropTypes.number,
      rightGap: PropTypes.number,
      leftGap: PropTypes.number,
      downGap: PropTypes.number,
      enterStrategy: PropTypes.string,
      refreshStrategy: PropTypes.string,
      active: PropTypes.bool,
      onRight: PropTypes.func,
      onLeft: PropTypes.func,
      onUp: PropTypes.func,
      onDown: PropTypes.func,
      onEnter: PropTypes.func,
      debounce: PropTypes.number,
      triggerClick: PropTypes.bool,
      longPress: PropTypes.bool,
      onLeftExit: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      onRightExit: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      onUpExit: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      onDownExit: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      priority: PropTypes.number,
      direction: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      selector: 'li',
      active: true,
      enterStrategy: 'none',
      refreshStrategy: 'first',
      filter: null,
      gap: 20,
      boundedGap: 0,
      topGap: 0,
      rightGap: 0,
      leftGap: 0,
      downGap: 0,
      longPress: true,
      triggerClick: true,
      priority: 0,
    };
  }

  componentWillMount() {
    this.listenerId = addListener(this.keysHandler, this);
    addBinder(this.props, BINDER_TYPE);
  }

  componentDidMount() {
    this.refreshState();
  }

  componentDidUpdate() {
    this.refreshState();
  }

  componentWillUnmount() {
    this.listenerId = removeListener(this.listenerId);
    _removeBinder(this.props.id);
  }

  keysHandler(keyCode, longPress, click) {
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
      triggerClick,
    } = this.props;

    if (!this.listenerId) {
      return;
    }

    const { nextEl } = findBinder(globalStore.getState()[NAME].binders, id);
    if (
      click &&
      triggerClick &&
      isActive(this.props) &&
      !isBlocked() &&
      !blocks.isBlocked(this.props.id)
    ) {
      document.getElementById(nextEl.id).click();
      return;
    }
    if (
      !click &&
      isActive(this.props) &&
      !isBlocked() &&
      !blocks.isBlocked(this.props.id) &&
      (!longPress || (longPress && this.props.longPress))
    ) {
      switch (keyCode) {
        case userConfig.left:
          this.performAction(C_LEFT, onLeft, onLeftExit);
          break;
        case userConfig.up:
          this.performAction(C_UP, onUp, onUpExit);
          break;
        case userConfig.right:
          this.performAction(C_RIGHT, onRight, onRightExit);
          break;
        case userConfig.down:
          this.performAction(C_DOWN, onDown, onDownExit);
          break;
        case userConfig.enter:
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

  isPresent(elements, selectedId) {
    return (
      selectedId !== undefined &&
      elements.map(e => e.id).some(id => id === selectedId)
    );
  }

  findPreviousElement(selectedId, oldElements, newElements, inc = 0) {
    const index = oldElements.map(e => e.id).indexOf(selectedId);
    const newIndex = index === 0 ? 0 : index - 1;
    return !this.isPresent(newElements, oldElements[newIndex].id) &&
      inc < newElements.length
      ? this.findPreviousElement(
          oldElements[newIndex].id,
          oldElements,
          newElements,
          inc + 1
        )
      : newElements[newIndex];
  }

  refreshState() {
    const dom = ReactDOM.findDOMNode(this);
    const {
      id,
      filter,
      wrapper,
      selector,
      refreshStrategy,
      direction,
    } = this.props;
    const state = findBinder(globalStore.getState()[NAME].binders, id);
    const nextWrapper = calculateElSpace(
      wrapper ? document.querySelector(wrapper) : document.body
    );
    const nextElements = createList(dom, selector, filter);

    const hasDiff =
      hasElementsDiff(nextElements, state.elements) ||
      (hasWrapperDiff(nextWrapper, state.wrapper, direction) &&
        nextElements.length > 0);
    if (hasDiff) {
      const options = {
        marginLeft: state.marginLeft,
        marginTop: state.marginTop,
      };
      let { elements, selectedElement } = refresh(
        nextElements,
        state.selectedId,
        options
      );

      if (
        refreshStrategy === 'previous' &&
        state.selectedId &&
        !this.isPresent(elements, state.selectedId)
      ) {
        const previousElement = this.findPreviousElement(
          state.selectedId,
          state.elements,
          elements
        );
        selectedElement = previousElement;
      }

      _updateBinder({
        id: id,
        wrapper: calculateElSpace(
          wrapper ? document.querySelector(wrapper) : document.body
        ),
        downLimit: downLimit(elements),
        rightLimit: rightLimit(elements),
        elements: elements,
        nextEl: selectedElement,
        selectedId: selectedElement.id,
        prevDir: null,
      });
      updatePosition(id, selectedElement.id);
    }
  }

  render() {
    const { id, children } = this.props;
    return <div id={id}>{children}</div>;
  }
}

export default Binder;
