import React, { Component, PropTypes } from 'react';
import { isBlocked, block } from '../clock';
import { addListener, removeListener } from '../listener';
import blocks from '../blocks';
import { addKeyToStore } from '../redux/actions';
import {
  BACK,
  ESC,
  DOWN,
  ENTER,
  UP,
  MENU,
  INFO,
  REC,
  NEXTPROG,
  PREVPROG,
  SHUTDOWN,
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
} from '../keys';
import { execCb } from '../funcHandler';
import { KEYS_TYPE } from '../constants';

class Keys extends Component {

  static get propTypes() {
    return {
      children: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array,
      ]),
      id: PropTypes.string.isRequired,
      onBack: PropTypes.func,
      context: PropTypes.object,
      onDown: PropTypes.func,
      onEnter: PropTypes.func,
      onUp: PropTypes.func,
      onDigit: PropTypes.func,
      onMenu: PropTypes.func,
      onInfo: PropTypes.func,
      onRec: PropTypes.func,
      onNextProg: PropTypes.func,
      onPrevProg: PropTypes.func,
      onShutDown: PropTypes.func,
      active: PropTypes.bool,
    }
  }

  static get defaultProps() {
    return {
      active: true,
      context: {},
    }
  }

  constructor(props) {
    super(props);
    this.listenerId = addListener(this.keysHandler, this);
  }

  keysHandler(keyCode) {
    if (this.props.active
      && !isBlocked()
      && !blocks.isBlocked(this.props.id)) {
      switch (keyCode) {
        case BACK:
        case ESC:
          this.performAction(this.props.onBack, keyCode);
          break;
        case ENTER:
          this.performAction(this.props.onEnter, keyCode);
          break;
        case UP:
          this.performAction(this.props.onUp, keyCode);
          break;
        case DOWN:
          this.performAction(this.props.onDown, keyCode);
          break;
        case MENU:
          this.performAction(this.props.onMenu, keyCode);
          break;
        case INFO:
          this.performAction(this.props.onInfo, keyCode);
          break;
        case REC:
          this.performAction(this.props.onRec, keyCode);
          break;
        case NEXTPROG:
          this.performAction(this.props.onNextProg, keyCode);
          break;
        case PREVPROG:
          this.performAction(this.props.onPrevProg, keyCode);
          break;
        case SHUTDOWN:
          this.performAction(this.props.onShutDown, keyCode);
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
          this.performAction(this.props[`on${keyCode}`], keyCode);
      }
    }
  }

  performAction(callback, keyCode) {
    if (callback) {
      block();
      execCb(callback, keyCode, this, this.props.context);
    }
  }

  componentDidMount() {
    addKeyToStore(this.props, KEYS_TYPE);
  }

  componentWillUnmount() {
    removeListener(this.listenerId);
  }

  render() {
    return <div id={this.props.id}>{this.props.children}</div>;
  }
}

export default Keys;
