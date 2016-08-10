import React, { PropTypes } from 'react';
import { BACK, DOWN, UP } from './keys';
import { execCb } from './funcHandler';

const Keys = React.createClass({

  propTypes: {
    onBack: PropTypes.func,
    onDown: PropTypes.func,
    onUp: PropTypes.func,
  },

  componentDidMount() {
    this.callback = ({ keyCode }) => {
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
        default:
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
