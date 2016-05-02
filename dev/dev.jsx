import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {connect, Provider} from 'react-redux';
import {MosaicBinder, StrapeBinder, keysInit, keysReducer, activeKeyBinder} from '../src';


const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.info('next state', store.getState());
  console.groupEnd(action.type);
  return result;
};

function reducer(state = {list: [{id: 1}, {id: 2}]}, action) {
  switch (action.type) {
    case 'LOAD':
      return {...state, ...{list: action.list}};
    default:
      return state;
  }
}

const store = createStore(combineReducers({
  '@@keys': keysReducer,
  main: reducer,
}), applyMiddleware(logger));

keysInit({store: store});

const Card = ({id, active}) => {
  const style = active ? 'selected' : '';
  return (
    <li id={id} className={style}>#{id}</li>
  );
};

const PureStrape = ({list, selectedId}) => {
  console.log(selectedId);
  return (
    <div>
      <StrapeBinder binderId="mosaic">
        <ul>
          {list.map(el => {
            return <Card key={el.id} id={el.id} active={true}/>;
          })}
        </ul>
      </StrapeBinder>
    </div>
  );
};

setTimeout(() => {
  store.dispatch({
    type: 'LOAD',
    list: [{id: 1}, {id: 2}, {id: 3}],
  });
}, 1000);

const selector = state => {
  return {
    selectedId: state['@@keys'].getBinder('mosaic').selectedId,
    list: state.main.list,
  };
};

const ButtonEl = connect(selector)(PureStrape);

ReactDOM.render(<Provider store={store}>
  <div>
    <ButtonEl />
  </div>
</Provider>, document.getElementById('body'));

activeKeyBinder('mosaic');

