/* eslint no-unused-vars:0 */
import React, { Component, PropTypes } from 'react';
import { build, getNext, getPrev } from './engines/carousel';
import { addListener, removeListener, globalStore } from './listener';
import { isBlocked, block } from './clock';
import { isActive } from './isActive';
import { execCb } from './funcHandler';
import { addKeyBinderToStore, _updateBinderState } from './redux/actions';
import { LEFT, RIGHT, DOWN, UP, ENTER } from './keys';

class Carousel extends Component {

  static get propTypes() {
    return {
      index: PropTypes.number,
      size: PropTypes.number,
      speed: PropTypes.number,
      debounce: PropTypes.number,
      elWidth: PropTypes.number,
      className: PropTypes.string,
      childrenClassName: PropTypes.string,
      onChange: PropTypes.func,
      onDownExit: PropTypes.func,
      onUpExit: PropTypes.func,
      onEnter: PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      index: 0,
      size: 3,
      elWidth: 100,
      speed: 100,
      debounce: 82,
      className: 'carousel',
      childrenClassName: 'carousel-child',
      onDownExit: () => {
      },
      onUpExit: () => {
      },
    };
  }

  constructor(props) {
    super(props);
    this.ids = this.props.children.map((el, index) => index);
    this.selectedId = props.children[props.index].props.id;
    this.listenerId = addListener(this.keysHandler, this);
    addKeyBinderToStore(this.props.id, this.props.active);
    _updateBinderState(this.props.id, { selectedId: this.selectedId, cursor: this.props.index });
    this.state = { elements: this.buildWrapper() };
  }

  componentWillUnmount() {
    removeListener(this.listenerId);
  }

  buildWrapper() {
    const { children, size, elWidth, speed, childrenClassName } = this.props;
    const indexs = build(this.ids, size + 4, this.getCursor());
    return children.map((el, index) => {
      if (indexs.indexOf(index) !== -1) {
        const x = (indexs.indexOf(index) - 2) * elWidth;
        return React.createElement('div', {
          key: index,
          className: childrenClassName,
          style: {
            transform: `translateX(${x}px)`,
            transition: `transform ${speed}ms`,
            opacity: (x === -(2 * elWidth) || x === (size + 1) * elWidth) ? 0 : 1,
          },
        }, el);
      }
      return null;
    });
  }

  performAction(cursor) {
    this.selectedId = this.props.children[cursor].props.id;
    _updateBinderState(this.props.id, { selectedId: this.selectedId, cursor: cursor });
    this.setState({ elements: this.buildWrapper() });
    execCb(this.props.onChange, this.selectedId, this, this.props);
  }

  keysHandler(keyCode) {
    if (isActive(globalStore, this.props) && !isBlocked()) {
      block(this.props.debounce);
      switch (keyCode) {
        case LEFT:
          this.performAction(getPrev(this.state.elements, this.getCursor()));
          break;
        case RIGHT:
          this.performAction(getNext(this.state.elements, this.getCursor()));
          break;
        case DOWN:
          execCb(this.props.onDownExit, this.selectedId, this, this.props);
          break;
        case UP:
          execCb(this.props.onUpExit, this.selectedId, this, this.props);
          break;
        case ENTER:
          execCb(this.props.onEnter, this.selectedId, this, this.props);
          break;
        default:
          break;
      }
    }
  }

  getCursor() {
    return globalStore.getState()['@@keys'].getBinder(this.props.id).cursor;
  }

  render() {
    return <div className={this.props.className}>{this.state.elements}</div>;
  }

}

export default Carousel;
