/* eslint no-unused-vars:0 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {UP, DOWN, LEFT, RIGHT, ENTER} from './keys';
import {C_LEFT, C_RIGHT} from './constants';
import {refresh} from './engines/strape';
import {isBlocked, block} from './clock';
import {addListener, removeListener, globalStore} from './listener';
import {_addKeyBinderToStore, _updateSelectedId} from './redux/actions';

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
      onLeftExit: PropTypes.func,
      onRightExit: PropTypes.func,
      onUpExit: PropTypes.func,
      onDownExit: PropTypes.func,
      strategy: PropTypes.string,
      gap: PropTypes.number,
      lastGap: PropTypes.number,
      circular: PropTypes.bool,
      wrapper: PropTypes.string,
      wChildren: PropTypes.string,
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
    };
  }

  executeFunctionAction(functionAction) {
    functionAction.call(this,
      this.nextFocusedElement || {},
      this.props.context);
  }

  keysHandler(keyCode) {
    const state = globalStore.getState()['@@keys'];
    if (state.activeBinder === this.props.binderId && !isBlocked()) {
      this.nextFocusedElement = this.elements.find(el => el.id === state.selectedKeyId);
      block();
      switch (keyCode) {
        case LEFT:
          this._giveFocusTo(C_LEFT);
          _updateSelectedId(this.nextFocusedElement.id, this.nextFocusedElement.marginLeft);
          if (this.hasMoved) {
            if (this.props.onLeftKey) {
              this.executeFunctionAction(this.props.onLeftKey);
            }
          } else if (this.props.onLeftExit) {
            this.props.onLeftExit();
          }

          break;
        case RIGHT:
          this._giveFocusTo(C_RIGHT);
          _updateSelectedId(this.nextFocusedElement.id, this.nextFocusedElement.marginLeft);
          if (this.hasMoved) {
            if (this.props.onRightKey) {
              this.executeFunctionAction(this.props.onRightKey);
            }
          } else if (this.props.onRightExit) {
            this.props.onRightExit();
          }
          break;
        case ENTER:
          if (this.props.onEnterKey) {
            this.executeFunctionAction(this.props.onEnterKey);
          }
          break;
        case UP:
          if (this.props.onUpExit) {
            this.props.onUpExit();
          }
          break;
        case DOWN:
          if (this.props.onDownExit) {
            this.props.onDownExit();
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
    _addKeyBinderToStore({
      id: this.props.binderId,
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
