import React, { PropTypes } from 'react';
import {
  BACK,
  DOWN,
  UP,
  MENU,
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
    active: PropTypes.bool,
  },

  defaultProps: {
    active: true,
  },

  componentDidMount() {
    this.callback = ({ keyCode }) => {
      if (this.props.active) {
        switch (keyCode) {
          case BACK:
            execCb(this.props.onBack, null, this, this.props);
            break;
          case UP:
            execCb(this.props.onUp, null, this, this.props);
            break;
          case DOWN:
            execCb(this.props.onDown, null, this, this.props);
            break;
          case MENU:
            execCb(this.props.onMenu, null, this, this.props);
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
            execCb(this.props.onDigit, keyCode, this, this.props);
            break;
          default:
        }
      }
    };
    window.document.addEventListener('keydown', this.callback);
  },

  componentWillUnmount() {
    window.document.removeEventListener('keydown', this.callback);
  },

  render() {
    return <div id="hoc-keys">{this.props.children}</div>;
  },

});

export default Keys;
