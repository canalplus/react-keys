import React, { Component, PropTypes } from 'react';
import { isBlocked, block } from './clock';
import { addListener, removeListener } from './listener';
import { addKeyBinderToStore } from './redux/actions';
import {
  BACK,
  DOWN,
  ENTER,
  UP,
  MENU,
  REC,
  NEXTPROG,
  PREVPROG,
  NUM0,
  NUM1,
  NUM2,
  NUM3,
  NUM4,
  NUM5,
  NUM6,
  NUM7,
  NUM8,
  NUM9,
} from './keys';
import { execCb } from './funcHandler';
import { KEYS_TYPE } from './constants';

class Keys extends Component {

  static get propTypes() {
    return {
      children: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array,
      ]),
      id: PropTypes.string.isRequired,
      onBack: PropTypes.func,
      onDown: PropTypes.func,
      onEnter: PropTypes.func,
      onUp: PropTypes.func,
      onDigit: PropTypes.func,
      onMenu: PropTypes.func,
      onRec: PropTypes.func,
      onNextProg: PropTypes.func,
      onPrevProg: PropTypes.func,
      active: PropTypes.bool,
    }
  }

  static get defaultProps() {
    return {
      active: true,
    }
  }

  constructor(props) {
    super(props);
    this.listenerId = addListener(this.keysHandler, this);
  }

  keysHandler(keyCode) {
    if (this.props.active && !isBlocked()) {
      switch (keyCode) {
        case BACK:
          this.performAction(this.props.onBack);
          break;
        case ENTER:
          this.performAction(this.props.onEnter);
          break;
        case UP:
          this.performAction(this.props.onUp);
          break;
        case DOWN:
          this.performAction(this.props.onDown);
          break;
        case MENU:
          this.performAction(this.props.onMenu);
          break;
        case REC:
          this.performAction(this.props.onRec);
          break;
        case NEXTPROG:
          this.performAction(this.props.onNextProg);
          break;
        case PREVPROG:
          this.performAction(this.props.onPrevProg);
          break;
        case NUM0:
        case NUM1:
        case NUM2:
        case NUM3:
        case NUM4:
        case NUM5:
        case NUM6:
        case NUM7:
        case NUM8:
        case NUM9:
          this.performAction(this.props.onDigit, keyCode);
          break;
        default:
      }
    }
  }

  performAction(callback, keyCode) {
    if (callback) {
      block();
      execCb(callback, keyCode, this, this.props);
    }
  }

  componentDidMount() {
    addKeyBinderToStore(this.props.id, this.props.active, KEYS_TYPE);
  }

  componentWillUnmount() {
    removeListener(this.listenerId);
  }

  render() {
    return <div id={this.props.id}>{this.props.children}</div>;
  }
}

export default Keys;
