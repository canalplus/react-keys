import React, { Component } from 'react';
import { defaultProps, propTypes } from './props';
import { keysHandler } from './handler';
import { BINDER_TYPE } from '../../constants';
import { addListener, removeListener } from '../../listener';
import { addBinder, _removeBinder } from '../../redux/actions';
import compatibility from '../compatibility';
import { refreshState, mountState } from './refresh';

class Binder extends Component {
  uniqElement = true;

  constructor(props) {
    super(props);
    this.innerProps = compatibility(props);
    this.state = { mounted: false };
  }

  componentWillMount() {
    this.listenerId = addListener(keysHandler, this);
    addBinder(this.innerProps, BINDER_TYPE);
  }

  componentWillReceiveProps(nextProps) {
    this.innerProps = compatibility(nextProps);
  }

  componentDidMount() {
    this.setState({ mounted: true });
    setTimeout(() => {
      this.state.mounted && mountState.apply(this);
    }, 0);
  }

  componentDidUpdate() {
    refreshState.apply(this);
  }

  componentWillUnmount() {
    this.setState({ mounted: false });
    this.listenerId = removeListener(this.listenerId);
    _removeBinder(this.innerProps.id);
  }

  render() {
    const { id, children } = this.innerProps;
    return <div id={id}>{children}</div>;
  }
}

Binder.propTypes = propTypes;
Binder.defaultProps = defaultProps;

export default Binder;
