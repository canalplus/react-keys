import { Component } from 'react';
import PropTypes from 'prop-types';
import { block, isBlocked } from '../clock';
import { addListener, removeListener, userConfig } from '../listener';
import blocks from '../blocks';
import { execCb } from '../redux/actions';

class Keys extends Component {
  static get propTypes() {
    return {
      children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      id: PropTypes.string.isRequired,
      debounce: PropTypes.number,
      active: PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      active: true,
    };
  }

  constructor(props) {
    super(props);
    this.listenerId = addListener(this.keysHandler, this);
  }

  isActive() {
    return (
      this.props.active && !isBlocked() && !blocks.isBlocked(this.props.id)
    );
  }

  keysHandler(keyCode, longPress, click) {
    if (click) {
      return;
    }
    if (this.isActive()) {
      for (const key in userConfig) {
        const value = userConfig[key];
        const action = key
          .toLowerCase()
          .replace(/\b[a-z](?=[a-z]{1})/g, letter => letter.toUpperCase());
        if (
          (Number.isInteger(value) && value === keyCode) ||
          (Array.isArray(value) && value.indexOf(keyCode) !== -1)
        ) {
          this.performAction(this.props[`on${action}`], keyCode);
          break;
        }
      }
    }
  }

  performAction(callback, keyCode) {
    const { debounce } = this.props;
    if (callback) {
      block(debounce);
      execCb(callback, keyCode, this);
    }
  }

  componentWillUnmount() {
    removeListener(this.listenerId);
  }

  render() {
    return this.props.children || null;
  }
}

export default Keys;
