/* eslint no-unused-vars:0 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {refresh} from './engines/mosaic';
import {UP, DOWN, LEFT, RIGHT, ENTER} from './keys';
import {C_UP, C_DOWN, C_LEFT, C_RIGHT} from './constants';
import {isBlocked, block} from './clock';
import {isActive} from './isActive';
import {nextFocusedElement} from './nextFocusedElement';
import {execCb} from './execCb';
import {calculateNewState} from './calculateNewState';
import {addListener, removeListener, globalStore} from './listener';
import {_addKeyBinderToStore, _updateSelectedId, _activeKeyBinder} from './redux/actions';

class MosaicBinder extends Component {

  static get propTypes() {
    return {
      binderId: PropTypes.string.isRequired,
      selector: PropTypes.string,
      focusedElementId: PropTypes.string,
      context: PropTypes.object,
      active: PropTypes.bool,
      accuracy: PropTypes.number,
      onRight: PropTypes.func,
      onLeft: PropTypes.func,
      onUp: PropTypes.func,
      onDown: PropTypes.func,
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
    };
  }

  static get defaultProps() {
    return {
      selector: 'li',
      accuracy: 0,
      active: true,
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
          this.calculateNewState(C_LEFT);
          if (this.hasMoved) {
            _updateSelectedId(this.nextEl.id, this.nextEl.marginLeft, this.props.binderId);
            execCb(this.props.onLeft, this.nextEl, this, this.props);
          } else if (this.props.onLeftExit) {
            if (typeof this.props.onLeftExit === 'string') {
              _activeKeyBinder(this.props.onLeftExit);
            } else {
              this.props.onLeftExit();
            }
          }

          break;
        case UP:
          this.calculateNewState(C_UP);
          if (this.hasMoved) {
            _updateSelectedId(this.nextEl.id, this.nextEl.marginLeft, this.props.binderId);
            execCb(this.props.onUp, this.nextEl, this, this.props);
          } else if (this.props.onUpExit) {
            if (typeof this.props.onUpExit === 'string') {
              _activeKeyBinder(this.props.onUpExit);
            } else {
              this.props.onUpExit();
            }
          }
          break;
        case DOWN:
          this.calculateNewState(C_DOWN);
          if (this.hasMoved) {
            _updateSelectedId(this.nextEl.id, this.nextEl.marginLeft, this.props.binderId);
            execCb(this.props.onDown, this.nextEl, this, this.props);
          } else if (this.props.onDownExit) {
            if (typeof this.props.onDownExit === 'string') {
              _activeKeyBinder(this.props.onDownExit);
            } else {
              this.props.onDownExit();
            }
          }
          break;
        case RIGHT:
          this.calculateNewState(C_RIGHT);
          if (this.hasMoved) {
            _updateSelectedId(this.nextEl.id, this.nextEl.marginLeft, this.props.binderId);
            execCb(this.props.onRight, this.nextEl, this, this.props);
          } else if (this.props.onRightExit) {
            if (typeof this.props.onRightExit === 'string') {
              _activeKeyBinder(this.props.onRightExit);
            } else {
              this.props.onRightExit();
            }
          }
          break;
        case ENTER:
          execCb(this.props.onEnter, this.nextEl, this, this.props);
          break;
        default:
          break;
      }
    }
  }

  refreshState() {
    const dom = ReactDOM.findDOMNode(this);
    const value = refresh(
      dom,
      this.elements,
      this.props.selector,
      this.props.focusedElementId,
      {accuracy: this.props.accuracy},
    );
    const {elements, selectedElement} = value;
    this.elements = elements;
    this.nextEl = selectedElement || this.nextEl;
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
    _addKeyBinderToStore({
      id: this.props.binderId,
      elements: this.elements,
      selectedId: this.nextEl.id,
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

export default MosaicBinder;
