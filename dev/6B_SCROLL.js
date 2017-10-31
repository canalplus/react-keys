import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { StyleSheet, css } from 'aphrodite/no-important';
import { createStore, combineReducers } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect, Provider } from 'react-redux';
import {
  Binder,
  keysInit,
  keysReducer,
  getBinderMarginLeft,
  getCurrentSelectedId,
  getCurrentBinder,
  isVisibleInBinder,
} from '../src';

const styles = StyleSheet.create({
  screen: {
    display: 'block',
    width: 1280,
    height: 720,
    overflow: 'hidden',
    padding: 0,
    margin: 0,
  },
  container: {
    height: 220,
    width: 360,
    overflow: 'hidden',
  },
  ulStyle: {
    listStyle: 'none',
    width: 10000,
    height: 220,
    padding: 0,
    margin: 0,
  },
  card: {
    display: 'inline-block',
    backgroundColor: 'yellow',
    width: 100,
    height: 200,
    margin: 10,
  },
  focused: {
    backgroundColor: 'green',
  },
});

const store = createStore(
  combineReducers({
    '@@keys': keysReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

keysInit({ store });

const PureCard = ({ id, current, isVisible }) => (
  <li id={id} className={css(styles.card, current === id && styles.focused)}>
    #{id}
    COUCOU = {`${isVisible}`}
  </li>
);

const Card = connect((state, props) => ({
  current: getCurrentSelectedId()(),
  isVisible: isVisibleInBinder(props.binderId, props.id)(),
}))(PureCard);

const GenericBinder = ({ id, priority, downExit, upExit, marginLeft }) => {
  return (
    <Binder
      id={id}
      wrapper={`#wrapper-${id}`}
      priority={priority || 0}
      onDownExit={downExit}
      onUpExit={upExit}
      visibilityOffset={200}
    >
      <div id={`wrapper-${id}`} className={css(styles.container)}>
        <ul className={css(styles.ulStyle)} style={{ marginLeft }}>
          <Card id={`${id}-1`} binderId={id} />
          <Card id={`${id}-2`} binderId={id} />
          <Card id={`${id}-3`} binderId={id} />
          <Card id={`${id}-4`} binderId={id} />
          <Card id={`${id}-5`} binderId={id} />
          <Card id={`${id}-6`} binderId={id} />
        </ul>
      </div>
    </Binder>
  );
};

const ConnectedBinder = connect((state, props) => {
  return createStructuredSelector({
    marginLeft: getBinderMarginLeft(props.id),
  });
})(GenericBinder);

class PureBase extends Component {
  constructor(props) {
    super(props);
    this.state = { position: 0 };
  }

  componentWillReceiveProps({ binder: { id } }) {
    if (id < 3) return;
    this.setState({ position: (id - 3) * 220 });
  }

  render() {
    return (
      <div style={{ marginTop: -this.state.position }}>
        {this.props.children}
      </div>
    );
  }
}

const Base = connect(() => ({ binder: getCurrentBinder()() }))(PureBase);

ReactDOM.render(
  <Provider store={store}>
    <div className={css(styles.screen)}>
      <Base>
        <ConnectedBinder id="1" downExit="2" upExit={null} priority={1} />
        <ConnectedBinder id="2" downExit="3" upExit="1" />
        <ConnectedBinder id="3" downExit="4" upExit="2" />
        <ConnectedBinder id="4" downExit="5" upExit="3" />
        <ConnectedBinder id="5" downExit="6" upExit="4" />
        <ConnectedBinder id="6" downExit="7" upExit="5" />
        <ConnectedBinder id="7" downExit="8" upExit="6" />
        <ConnectedBinder id="8" downExit="9" upExit="7" />
        <ConnectedBinder id="9" downExit="10" upExit="8" />
        <ConnectedBinder id="10" downExit="11" upExit="9" />
        <ConnectedBinder id="11" downExit={null} upExit="10" />
      </Base>
    </div>
  </Provider>,
  document.getElementById('body')
);
