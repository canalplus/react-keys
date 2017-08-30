import React, { Component } from 'react';

let catchers = [];

export function catcherWatcher(keyCode) {
  const char = String.fromCharCode(keyCode);
  catchers.forEach(catcher => {
    catcher.history += char;
    if (catcher.history.length > catcher.sequence.length) {
      catcher.history = catcher.history.slice(1);
    }
    if (catcher.history.toUpperCase() === catcher.sequence.toUpperCase()) {
      catcher.history = [];
      catcher.cb();
    }
  });
}

export function addCatcher(sequence, cb) {
  const id = Math.random().toString(36).substring(2, 10);
  catchers.push({ id, sequence, cb, history: [] });
  return id;
}

export function removeCatcher(id) {
  catchers = catchers.filter(catcher => catcher.id !== id);
}

export default (catcher, cb) => BaseComponent => {
  return class CatcherComponent extends Component {
    componentDidMount() {
      const _props = this.props;
      this.id = addCatcher(catcher, () => cb.call(this, _props));
    }

    componentWillUnmount() {
      removeCatcher(this.id);
    }

    render() {
      return React.createElement(BaseComponent, this.props);
    }
  };
};
