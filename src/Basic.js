import React, { PropTypes } from 'react';
import { isBlocked, block } from './clock';
import { addListener, removeListener } from './listener';
import {
  BACK,
  DOWN,
  UP,
  MENU,
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

const Keys = React.createClass({

  propTypes: {
    onBack: PropTypes.func,
    onDown: PropTypes.func,
    onUp: PropTypes.func,
    onDigit: PropTypes.func,
    onMenu: PropTypes.func,
    onNextProg: PropTypes.func,
    onPrevProg: PropTypes.func,
    active: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      active: true,
    };
  },

  componentDidMount() {
    this.listenerId = addListener(this.keysHandler, this);
  },

  componentWillUnmount() {
    removeListener(this.listenerId);
  },

  keysHandler(keyCode) {
    if (this.props.active && !isBlocked()) {
      switch (keyCode) {
        case BACK:
          this.performAction(this.props.onBack);
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
  },

  performAction(callback, keyCode) {
    if (callback) {
      block();
      execCb(callback, keyCode, this, this.props);
    }
  },

  render() {
    return <div id="hoc-keys">{this.props.children}</div>;
  },

});

export default Keys;
