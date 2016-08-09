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
      elWidth: PropTypes.number,
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
      onDownExit: () => {
      },
      onUpExit: () => {
      },
    };
  }

  constructor(props) {
    super(props);
    this.ids = this.props.children.map((el, index) => index);
    this.cursor = props.index;
    this.selectedId = props.children[this.cursor].props.id;
    this.state = {
      elements: this.buildWrapper(),
    };
    this.listenerId = addListener(this.keysHandler, this);
  }

  componentDidMount() {
    addKeyBinderToStore(this.props.id, this.props.active);
  }

  componentWillUnmount() {
    removeListener(this.listenerId);
  }

  buildWrapper() {
    const { children, size, elWidth } = this.props;
    const indexs = build(this.ids, size + 4, this.cursor);
    return children.map((el, index) => {
      if (indexs.indexOf(index) !== -1) {
        const x = (indexs.indexOf(index) - 2) * elWidth;
        return React.createElement('div', {
          key: index,
          className: 'carousel-el',
          style: {
            transform: `translateX(${x}px)`,
            opacity: (x === -200 || x === (size + 1) * elWidth) ? 0 : 1,
          },
        }, el);
      }
      return null;
    });
  }

  performAction(cursor) {
    this.cursor = cursor;
    const elements = this.buildWrapper();
    this.selectedId = this.props.children[this.cursor].props.id;
    _updateBinderState(this.props.id, { selectedId: this.selectedId });
    this.setState({ elements: elements });
  }

  keysHandler(keyCode) {
    if (isActive(globalStore, this.props) && !isBlocked()) {
      block(82);
      switch (keyCode) {
        case LEFT:
          this.performAction(getPrev(this.state.elements, this.cursor));
          break;
        case RIGHT:
          this.performAction(getNext(this.state.elements, this.cursor));
          break;
        case DOWN:
          this.props.onDownExit();
          break;
        case UP:
          this.props.onUpExit();
          break;
        case ENTER:
          execCb(this.props.onEnter, this.selectedId, this, this.props);
          break;
        default:
          break;
      }
    }
  }

  render() {
    return <div className="carousel">{this.state.elements}</div>;
  }

}

export default Carousel;
