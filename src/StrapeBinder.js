/* eslint no-unused-vars:0 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {UP, DOWN, LEFT, RIGHT, ENTER} from './keys';
import {C_LEFT, C_RIGHT} from './constants';
import {refresh} from './engines/strape';
import {isBlocked, block} from './clock';
import {addListener, removeListener, globalStore} from './listener';
import {
  _addKeyBinderToStore,
  _updateSelectedId,
  _activeKeyBinder,
} from './redux/actions';

class StrapeBinder extends Component {

  constructor(props) {
    super(props);
    this.elements = [];
    this.listenerId = addListener(this.keysHandler, this);
    this.prevFocusedElement = null;
    this.nextFocusedElement = null;
    this.previousDirection = null;
    this.hasMoved = false;
  }

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

  executeFunctionAction(functionAction) {
    functionAction.call(this,
      this.nextFocusedElement || {},
      this.props.context);
  }

  isActiveBinder() {
    let active = false;
    if (globalStore) {
      active = globalStore.getState()['@@keys']
        && globalStore.getState()['@@keys'][this.props.binderId]
        && globalStore.getState()['@@keys'][this.props.binderId].active;
    } else {
      active = this.props.active;
    }
    return active;
  }

  keysHandler(keyCode) {
    if (this.isActiveBinder() && !isBlocked()) {
      if (globalStore) {
        const binderState = globalStore.getState()['@@keys'][this.props.binderId];
        this.nextFocusedElement = this.elements.find(el => el.id === binderState.selectedId);
      }
      block();
      switch (keyCode) {
        case LEFT:
          this._giveFocusTo(C_LEFT);
          if (this.hasMoved) {
            _updateSelectedId(
              this.nextFocusedElement.id,
              this.nextFocusedElement.marginLeft,
              this.props.binderId);
            if (this.props.onLeft) {
              this.executeFunctionAction(this.props.onLeft);
            }
          } else if (this.props.onLeftExit) {
            if (typeof this.props.onLeftExit === 'string') {
              _activeKeyBinder(this.props.onLeftExit);
            } else {
              this.props.onLeftExit();
            }
          }

          break;
        case RIGHT:
          this._giveFocusTo(C_RIGHT);
          if (this.hasMoved) {
            _updateSelectedId(
              this.nextFocusedElement.id,
              this.nextFocusedElement.marginLeft,
              this.props.binderId);
            if (this.props.onRight) {
              this.executeFunctionAction(this.props.onRight);
            }
          } else if (this.props.onRightExit) {
            if (typeof this.props.onRightExit === 'string') {
              _activeKeyBinder(this.props.onRightExit);
            } else {
              this.props.onRightExit();
            }
          }
          break;
        case ENTER:
          if (this.props.onEnter) {
            this.executeFunctionAction(this.props.onEnter);
          }
          break;
        case UP:
          if (this.props.onUpExit) {
            if (typeof this.props.onUpExit === 'string') {
              _activeKeyBinder(this.props.onUpExit);
            } else {
              this.props.onUpExit();
            }
          }
          break;
        case DOWN:
          if (this.props.onDownExit) {
            if (typeof this.props.onDownExit === 'string') {
              _activeKeyBinder(this.props.onDownExit);
            } else {
              this.props.onDownExit();
            }
          }
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
      this.props.wrapper,
      this.props.wChildren,
      {
        gap: this.props.gap,
        lastGap: this.props.lastGap,
        strategy: this.props.strategy,
        cicrular: this.props.circular,
      }
    );

    const {elements, selectedElement} = value;
    this.elements = elements;
    this.nextFocusedElement = selectedElement || this.nextFocusedElement;
  }

  _giveFocusTo(direction) {
    const intermediate = this.nextFocusedElement;
    if (!intermediate) {
      this.hasMoved = false;
      return null;
    }
    if (intermediate[direction]) {
      this.nextFocusedElement =
        this.elements.find(e => e.id === intermediate[direction]);
    }
    if (this.nextFocusedElement.id !== intermediate.id) {
      this.hasMoved = true;
      this.prevFocusedElement = intermediate;
      this.previousDirection = direction;
    } else {
      this.hasMoved = false;
    }
    return this.nextFocusedElement;
  }

  componentDidMount() {
    this.refreshState();
    if (!this.nextFocusedElement) {
      return;
    }
    _addKeyBinderToStore({
      id: this.props.binderId,
      elements: this.elements,
      visibleElements: this.elements.filter(element => element.marginLeft === 0).length,
      selectedId: this.nextFocusedElement.id,
      marginLeft: this.nextFocusedElement.marginLeft,
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
