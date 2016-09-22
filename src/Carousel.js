/* eslint no-unused-vars:0 */
import React, { Component, PropTypes } from 'react';
import { build, getNext, getPrev } from './engines/carousel';
import { addListener, removeListener } from './listener';
import { isBlocked, block } from './clock';
import { isActive } from './isActive';
import { execCb } from './funcHandler';
import { addKeyBinderToStore, _updateBinderState } from './redux/actions';
import { LEFT, RIGHT, DOWN, UP, ENTER } from './keys';
import { CAROUSEL_TYPE } from './constants';

class Carousel extends Component {

  static get propTypes() {
    return {
      children: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array,
      ]),
      id: PropTypes.string.isRequired,
      active: PropTypes.bool,
      index: PropTypes.number,
      size: PropTypes.number,
      speed: PropTypes.number,
      debounce: PropTypes.number,
      elWidth: PropTypes.number,
      circular: PropTypes.bool,
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
      circular: true,
      active: true,
      speed: 100,
      debounce: 82,
      className: 'carousel',
      childrenClassName: 'carousel-child',
    };
  }

  constructor(props) {
    super(props);
    this.listenerId = addListener(this.keysHandler, this);
    this.timeout = null;
    this.sketch = [];
    this.movingCountDown = () => {
      this.timeout = setTimeout(() => _updateBinderState(props.id, { moving: false }), props.speed);
    };
    this.state = { cursor: props.index };
  }

  componentWillMount() {
    const { id, active, children } = this.props;
    addKeyBinderToStore(id, active, CAROUSEL_TYPE);
    if (children.length !== 0) {
      this.initializeCarousel(children);
    }
  }

  componentWillUpdate(nextProps) {
    const { children } = nextProps;
    if (this.props.children.length === 0 && children.length !== 0) {
      this.initializeCarousel(children);
    }
  }

  initializeCarousel(children) {
    const { id, index } = this.props;
    this.selectedId = children[index].props.id;
    this.sketch = children.map(() => '');
    _updateBinderState(id, {
      selectedId: this.selectedId,
      cursor: index,
      moving: false,
    });
  }

  componentWillUnmount() {
    removeListener(this.listenerId);
  }

  performAction(cursor) {
    block(this.props.debounce);
    clearTimeout(this.timeout);
    this.selectedId = this.props.children[cursor].props.id;
    _updateBinderState(this.props.id, {
      selectedId: this.selectedId,
      cursor: cursor,
      moving: true,
    });
    this.setState({ cursor: cursor });
    this.movingCountDown();
    execCb(this.props.onChange, this.selectedId, this, this.props);
  }

  keysHandler(keyCode) {
    if (isActive(this.props) && !isBlocked()) {
      const { cursor } = this.state;
      switch (keyCode) {
        case LEFT:
          if (!this.props.circular && cursor === 0) return;
          this.performAction(getPrev(this.sketch, cursor));
          break;
        case RIGHT:
          if (!this.props.circular && cursor === this.props.children.length - 1) return;
          this.performAction(getNext(this.sketch, cursor));
          break;
        case DOWN:
          this.performCallback(this.props.onDownExit);
          break;
        case UP:
          this.performCallback(this.props.onUpExit);
          break;
        case ENTER:
          this.performCallback(this.props.onEnter);
          break;
        default:
          break;
      }
    }
  }

  performCallback(callback) {
    if (callback) {
      block();
      execCb(callback, this.selectedId, this, this.props);
    }
  }

  render() {
    const { size, elWidth, speed, childrenClassName, circular, children, className } = this.props;
    const { cursor } = this.state;
    const ids = children.map((el, index) => index);
    const indexs = build(ids, size + 4, cursor, circular);
    return <div className={className} style={{
      position: 'absolute',
      overflow: 'hidden',
    }}>
      {indexs.map((index) => {
        if (index === null) {
          return;
        }
        const x = (indexs.indexOf(index) - 2) * elWidth;
        return <div key={index} className={childrenClassName} style={{
          transform: `translate3d(${x}px, 0, 0)`,
          WebkitTransform: `translate3d(${x}px, 0, 0)`,
          transition: (x === -(2 * elWidth) || x === (size + 1) * elWidth) ? 'none' : `transform ${speed}ms`,
          WebkitTransition: (x === -(2 * elWidth) || x === (size + 1) * elWidth) ? 'none' : `transform ${speed}ms`,
          willChange: "transform",
          opacity: (x === -(2 * elWidth) || x === (size + 1) * elWidth) ? 0 : 1,
        }}>{children[index]}</div>;
      })}
    </div>;
  }

}

export default Carousel;
