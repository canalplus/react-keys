/* eslint no-unused-vars:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addListener, removeListener } from '../listener';

class Catcher extends Component {
  constructor(props) {
    super(props);
    this.history = '';
    this.listenerId = addListener(this.keysHandler, this);
  }

  componentWillUnmount() {
    removeListener(this.listenerId);
  }

  render() {
    return this.props.children || null;
  }

  keysHandler(keyCode) {
    this.history += String.fromCharCode(keyCode);

    if (this.history.length > this.props.sequence.length) {
      this.history = this.history.slice(1);
    }

    if (this.history.toUpperCase() === this.props.sequence.toUpperCase()) {
      this.history = '';
      this.props.cb();
    }
  }
}

Catcher.propTypes = {
  sequence: PropTypes.string.isRequired,
  cb: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Catcher;
