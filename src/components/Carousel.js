/* eslint no-unused-vars:0 */
import React, { Component, PropTypes } from 'react';
import { build, getNext, getPrev } from '../engines/carousel';
import { addListener, removeListener } from '../listener';
import { isBlocked, block } from '../clock';
import { isActive } from '../isActive';
import { execCb } from '../funcHandler';
import { addBinderToStore, _updateBinderState } from '../redux/actions';
import { LEFT, RIGHT, DOWN, UP, ENTER } from '../keys';
import { CAROUSEL_TYPE } from '../constants';

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
      context: PropTypes.object,
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
      context: {},
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
    this.movingCountDown = () => this.timeout = setTimeout(() =>
      _updateBinderState(props.id, { moving: false }), props.speed);
    this.state = { cursor: props.index, elements: [] };
  }

  keysHandler(keyCode) {
    const { children, circular, onDownExit, onUpExit, onEnter } = this.props;
    const { cursor } = this.state;
    if (isActive(this.props) && !isBlocked()) {
      switch (keyCode) {
        case LEFT:
          if (!circular && cursor === 0) return;
          this.performAction(getPrev(children.length, cursor));
          break;
        case RIGHT:
          if (!circular && cursor === children.length - 1) return;
          this.performAction(getNext(children.length, cursor));
          break;
        case DOWN:
          this.performCallback(onDownExit);
          break;
        case UP:
          this.performCallback(onUpExit);
          break;
        case ENTER:
          this.performCallback(onEnter);
          break;
      }
    }
  }

  componentWillMount() {
    addBinderToStore(this.props, CAROUSEL_TYPE);
    this.updateState(this.state.cursor, this.props.children);
  }

  componentWillUpdate({ children }) {
    if (this.props.children.length === 0) {
      this.updateState(this.state.cursor, children);
    }
  }

  performAction(cursor) {
    const { debounce, onChange, children } = this.props;
    block(debounce);
    clearTimeout(this.timeout);
    this.updateState(cursor, children);
    this.movingCountDown();
    execCb(onChange, this.selectedId, this, this.props.context);
  }

  updateState(cursor, children) {
    if (!children || children.length === 0) return;
    const { id, size, circular } = this.props;
    this.selectedId = children[cursor].props.id;
    _updateBinderState(id, { selectedId: this.selectedId, cursor, moving: true });
    this.setState({
      cursor,
      elements: build(children, size + 4, cursor, circular),
    });
  }

  performCallback(callback) {
    if (callback) {
      block();
      execCb(callback, this.selectedId, this, this.props.context);
    }
  }

  render() {
    const { size, elWidth, childrenClassName, className } = this.props;
    const { elements } = this.state;
    return <div className={className} style={{ position: 'absolute', overflow: 'hidden' }}>
      {elements.map((element, inc) => {
        const gap = (inc - 2) * elWidth;
        return <div key={element.props.id} className={childrenClassName} style={{
          marginLeft: `${gap}px`,
          position: 'absolute',
          width: `${elWidth}px`,
          display: 'block',
          opacity: (gap === -(2 * elWidth) || gap === (size + 1) * elWidth) ? 0 : 1,
        }}>{element}</div>;
      })}
    </div>;
  }

  componentWillUnmount() {
    removeListener(this.listenerId);
  }

}

export default Carousel;
