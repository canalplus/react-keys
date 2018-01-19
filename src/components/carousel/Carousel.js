/* eslint no-unused-vars:0 */
import React, { Component } from 'react';
import { build, getNext, getPrev } from '../../engines/carousel';
import { isInsideLeft, isInsideRight } from '../../engines/bounds';
import { calculateElSpace, hasElementsDiff } from '../../engines/helpers';
import { addListener, removeListener, userConfig } from '../../listener';
import { block, isBlocked } from '../../clock';
import { isActive } from '../../isActive';
import { enterTo } from '../../redux/actions';
import {
  _updateBinder,
  addBinder,
  _removeBinder,
  execCb,
} from '../../redux/actions';
import { CAROUSEL_TYPE, NAVIGATION_BOUND } from '../../constants';
import { defaultProps, propTypes } from './props';

class Carousel extends Component {
  uniqElement = true;

  constructor(props) {
    super(props);
    this.timeout = null;
    this.movingCountDown = () =>
      (this.timeout = setTimeout(
        () =>
          _updateBinder({
            id: props.id,
            moving: false,
            selectedId: this.selectedId,
          }),
        props.speed
      ));
    this.state = { cursor: props.index, elements: [] };
  }

  componentWillMount() {
    this.listenerId = addListener(this.keysHandler, this);
    addBinder(this.props, CAROUSEL_TYPE);
    this.updateState(this.state.cursor, this.props.children);
  }

  componentWillUpdate({ index, children, updateIndex }) {
    if (
      hasElementsDiff(children, this.props.children) ||
      this.props.index !== index
    ) {
      const cursor = updateIndex ? index : this.state.cursor;
      this.updateState(cursor, children);
    }
  }

  componentWillUnmount() {
    removeListener(this.listenerId);
    _removeBinder(this.props.id);
  }

  computeChildren(children) {
    let returnValue = children;
    if (Object.prototype.toString.call(children) !== '[object Array]') {
      returnValue = [children];
    }
    if (returnValue.length === 0) {
      return returnValue;
    }
    let inc = 1;
    while (returnValue.length <= this.props.size + 4) {
      const addedValues = returnValue.map(child => {
        const props = {
          ...child.props,
          id: child.props.id + '_' + inc,
        };
        return { ...child, props: props, key: child.props.id + '_' + inc };
      });
      returnValue = returnValue.concat(addedValues);
      inc++;
    }
    return returnValue;
  }

  keysHandler(keyCode, longPress, click) {
    const {
      children,
      circular,
      onDownExit,
      onUpExit,
      onEnter,
      triggerClick,
      debounce,
    } = this.props;
    const { cursor } = this.state;
    if (click && triggerClick && isActive(this.props) && !isBlocked()) {
      document.getElementById(children[cursor].props.id).click();
    }
    if (isActive(this.props) && !isBlocked()) {
      switch (keyCode) {
        case userConfig.left:
          if (!circular && cursor === 0) return;
          this.performAction(getPrev(children.length, cursor));
          break;
        case userConfig.right:
          if (!circular && cursor === children.length - 1) return;
          this.performAction(getNext(children.length, cursor));
          break;
        case userConfig.down:
          this.performCallback(onDownExit);
          break;
        case userConfig.up:
          this.performCallback(onUpExit);
          break;
        case userConfig.enter:
          block(debounce);
          this.performCallback(onEnter);
          break;
      }
    }
  }

  isLeftMove(currentCursor, nextCursor, children) {
    return (
      nextCursor < currentCursor ||
      (currentCursor === 0 && nextCursor === children.length - 1)
    );
  }

  performAction(cursor) {
    const { debounce, onChange, children } = this.props;
    block(debounce);
    clearTimeout(this.timeout);
    this.updateState(cursor, children);
    this.movingCountDown();
    execCb(onChange, this.selectedId, this);
  }

  updateState(cursor, children) {
    const computedChildren = this.computeChildren(children);
    const { id, size, circular } = this.props;
    if (!computedChildren[cursor]) {
      return;
    }
    this.selectedId = computedChildren[cursor].props.id;
    _updateBinder({ id, selectedId: this.selectedId, cursor, moving: true });
    const elements = build(computedChildren, size + 4, cursor, circular);
    this.setState({
      cursor,
      elements,
      gaps: this.determineGap(
        elements,
        this.isLeftMove(this.state.cursor, cursor, elements),
        cursor
      ),
    });
  }

  performCallback(callback) {
    if (callback) {
      block();
      enterTo(callback, this.selectedId);
    }
  }

  determineGap(elements, leftMove, cursor) {
    const {
      navigation,
      id,
      elWidth,
      size,
      gap,
      index: currentIndex,
    } = this.props;
    const { gaps } = this.state;
    const standardGaps =
      gaps ||
      elements.map(
        (el, inc) =>
          (inc - (navigation === NAVIGATION_BOUND ? size - 1 : 2)) * elWidth +
          gap
      );

    if (navigation === NAVIGATION_BOUND) {
      const selected = calculateElSpace(
        document.getElementById(this.selectedId)
      );

      if (gaps === undefined) return standardGaps;

      const wrapper = calculateElSpace(document.getElementById(id));

      if (!selected)
        return this.determineJumpGap(wrapper.width, elements, cursor, leftMove);

      const jump = elWidth * Math.abs(cursor - currentIndex);

      if (!leftMove && isInsideRight(wrapper, selected, gap))
        return standardGaps.map(stdGap => stdGap + jump);

      if (leftMove && isInsideLeft(wrapper, selected, gap))
        return standardGaps.map(stdGap => stdGap - jump);

      return this.determineJumpGap(wrapper.width, elements, cursor, leftMove);
    }

    return standardGaps;
  }

  determineJumpGap(wrapperWidth, elements, targetIndex, leftMove) {
    const { elWidth } = this.props;

    const itemsInsideWrapper = Math.floor(wrapperWidth / elWidth);
    const focusPosition = elements.findIndex(
      el => el && el.props.id === this.selectedId
    );

    const targetIndexScrollPosition = leftMove ||
      targetIndex < itemsInsideWrapper
      ? focusPosition
      : focusPosition - (itemsInsideWrapper - 1);

    const jumpGaps = [];

    for (let i = 0; i < elements.length; i++)
      jumpGaps[i] = (i - targetIndexScrollPosition) * elWidth;

    return jumpGaps;
  }

  render() {
    const { size, elWidth, childrenClassName, className, id } = this.props;
    const { elements, gaps } = this.state;
    return (
      <div
        id={id}
        className={className}
        style={{ overflow: 'hidden', position: 'absolute' }}
      >
        {elements.map((element, inc) => {
          if (!element) return;
          const gap = gaps[inc];
          return (
            <div
              id={element.props.id}
              key={element.props.id}
              className={childrenClassName}
              style={{
                transform: `translateX(${gap}px)`,
                position: 'absolute',
                width: `${elWidth}px`,
                display: 'block',
                opacity: gap === -(2 * elWidth) || gap === (size + 1) * elWidth
                  ? 0
                  : 1,
              }}
            >
              {element}
            </div>
          );
        })}
      </div>
    );
  }
}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

export default Carousel;
