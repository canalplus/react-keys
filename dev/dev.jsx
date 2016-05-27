import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {connect, Provider} from 'react-redux';
import {StrapeBinder, keysInit, keysReducer, activeKeyBinder} from '../src';

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.info('next state', store.getState());
  console.groupEnd(action.type);
  return result;
};

const store = createStore(combineReducers({
  '@@keys': keysReducer,
}));

keysInit({store: store});

const PureMosaic = ({selectedId, marginLeft}) => {
  const ulStyle = {
    marginLeft: -marginLeft,
  };
  return (
    <StrapeBinder
      id="strape-1"
      wrapper="#wrapper"
      strategy="bounds"
      gap={30}
      onEnter={onEnter}>
      <div id="wrapper">
        <ul style={ulStyle}>
          <li id="a1" className={selectedId === 'a1' ? 'selected' : ''}>#1</li>
          <li id="a2" className={selectedId === 'a2' ? 'selected' : ''}>#2</li>
          <li id="a3" className={selectedId === 'a3' ? 'selected' : ''}>#3</li>
          <li id="e4" className={selectedId === 'e4' ? 'selected' : ''}>#4</li>
          <li id="d5" className={selectedId === 'd5' ? 'selected' : ''}>#5</li>
          <li id="f6" className={selectedId === 'f6' ? 'selected' : ''}>#6</li>
          <li id="g7" className={selectedId === 'g7' ? 'selected' : ''}>#7</li>
          <li id="h8" className={selectedId === 'h8' ? 'selected' : ''}>#8</li>
          <li id="j9" className={selectedId === 'j9' ? 'selected' : ''}>#9</li>
          <li id="j10" className={selectedId === 'j10' ? 'selected' : ''}>#10</li>
          <li id="j11" className={selectedId === 'j11' ? 'selected' : ''}>#11</li>
        </ul>
      </div>
    </StrapeBinder>
  );
};

function onEnter(element) {
  alert('ELEMENT #' + element.id);
}

const Mosaic = connect(state => state['@@keys'].getBinder('strape-1'))(PureMosaic);

ReactDOM.render(<Provider store={store}>
  <div>
    <Mosaic/>
  </div>
</Provider>, document.getElementById('body'));

activeKeyBinder('strape-1');

