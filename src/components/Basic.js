import React, { Component, PropTypes } from 'react';
import { isBlocked, block } from '../clock';
import { addListener, removeListener, userConfig } from '../listener';
import blocks from '../blocks';
import config from '../config';
import { execCb } from '../funcHandler';

class Keys extends Component {

  static get propTypes() {
    return {
      children: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array,
      ]),
      id: PropTypes.string.isRequired,
      debounce: PropTypes.number,
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
    if (this.props.active
      && !isBlocked()
      && !blocks.isBlocked(this.props.id)) {
      const mergeConfig = { ...config, ...userConfig };
      for (const key in mergeConfig) {
        const value = mergeConfig[key];
        const action = key.toLowerCase().replace(/\b[a-z](?=[a-z]{1})/g,
          letter => letter.toUpperCase());
        if ((Number.isInteger(value) && value === keyCode)
          || (Array.isArray(value) && value.indexOf(keyCode) !== -1)) {
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
