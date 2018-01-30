import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import {
  Binder,
  keysInit,
  keysReducer,
  keysSelector,
  removeBinder,
} from '../src';

function reducer(state = { active: false }, action) {
  switch (action.type) {
    case 'LOOL':
      return { ...state, active: true };
    default:
      return state;
  }
}

setTimeout(() => store.dispatch({ type: 'LOOL' }), 2000);

const store = createStore(
  combineReducers({
    '@@keys': keysReducer,
    LOL: reducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

keysInit({ store: store });

const Card = ({ id, active }) => {
  const style = active ? 'selected' : '';
  return (
    <li id={id} className={style} onClick={e => console.log(e)}>
      #{id}
    </li>
  );
};

const PureStrape = ({
  selectedId,
  marginLeft,
  binderId,
  active,
  onDownExit,
  onUpExit,
}) => {
  const listStyle = {
    marginLeft,
  };
  return (
    <Binder
      id={binderId}
      active={active}
      wrapper="#wrapper"
      selector="li"
      strategy="mirror"
      gap={100}
      boundedGap={10}
      priority={0}
      onDownExit={onDownExit}
      onEnter={() => console.log('ENTER LOG')}
      onUpExit={onUpExit}
    >
      <div id="wrapper">
        <ul style={listStyle}>
          <Card
            id={binderId + '-1'}
            active={active && selectedId === binderId + '-1'}
          />
          <Card
            id={binderId + '-2'}
            active={active && selectedId === binderId + '-2'}
          />
          <Card
            id={binderId + '-3'}
            active={active && selectedId === binderId + '-3'}
          />
          <Card
            id={binderId + '-4'}
            active={active && selectedId === binderId + '-4'}
          />
          <Card
            id={binderId + '-5'}
            active={active && selectedId === binderId + '-5'}
          />
          <Card
            id={binderId + '-6'}
            active={active && selectedId === binderId + '-6'}
          />
          <Card
            id={binderId + '-7'}
            active={active && selectedId === binderId + '-7'}
          />
          <Card
            id={binderId + '-8'}
            active={active && selectedId === binderId + '-8'}
          />
          <Card
            id={binderId + '-9'}
            active={active && selectedId === binderId + '-9'}
          />
        </ul>
      </div>
    </Binder>
  );
};

const PureStrape2 = ({
  selectedId,
  marginLeft,
  binderId,
  active,
  onDownExit,
  onUpExit,
}) => {
  const listStyle = {
    marginLeft,
  };
  return (
    <Binder
      id={binderId}
      active={active}
      wrapper="#wrapper"
      selector="li"
      strategy="mirror"
      gap={100}
      boundedGap={10}
      onDownExit={onDownExit}
      priority={1}
      onEnter={() => console.log('ENTER LOG')}
      onUpExit={onUpExit}
    >
      <div id="wrapper">
        <ul style={listStyle}>
          <Card
            id={binderId + '-1'}
            active={active && selectedId === binderId + '-1'}
          />
          <Card
            id={binderId + '-2'}
            active={active && selectedId === binderId + '-2'}
          />
          <Card
            id={binderId + '-3'}
            active={active && selectedId === binderId + '-3'}
          />
          <Card
            id={binderId + '-4'}
            active={active && selectedId === binderId + '-4'}
          />
          <Card
            id={binderId + '-5'}
            active={active && selectedId === binderId + '-5'}
          />
          <Card
            id={binderId + '-6'}
            active={active && selectedId === binderId + '-6'}
          />
          <Card
            id={binderId + '-7'}
            active={active && selectedId === binderId + '-7'}
          />
          <Card
            id={binderId + '-8'}
            active={active && selectedId === binderId + '-8'}
          />
          <Card
            id={binderId + '-9'}
            active={active && selectedId === binderId + '-9'}
          />
        </ul>
      </div>
    </Binder>
  );
};

const Strape1 = connect(() => keysSelector('strape-1')())(PureStrape);
const Strape2 = connect(() => keysSelector('strape-2')())(PureStrape);

class PureMosaic extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        <Strape1 binderId="strape-1" onDownExit="strape-2" />
        <Strape2 binderId="strape-2" onUpExit="strape-1" />
        <br />
        <button onClick={() => removeBinder('strape-1')}>BOUTON</button>
      </div>
    );
  }
}

const Mosaic = connect(state => {
  return {
    lool: state['LOL'].active,
  };
})(PureMosaic);

ReactDOM.render(
  <Provider store={store}>
    <Mosaic />
  </Provider>,
  document.getElementById('body')
);

// activeBinder('rk-carousel');
