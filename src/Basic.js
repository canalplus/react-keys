import React, { PropTypes } from 'react';
import { BACK, DOWN, UP } from './keys';

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
          this.props.onBack();
          break;
        case UP:
          this.props.onUp();
          break;
        case DOWN:
          this.props.onDown();
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
