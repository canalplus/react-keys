import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {connect, Provider} from 'react-redux';
import {Binder, StrapeBinder, keysInit, keysReducer, activeKeyBinder} from '../src';

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
}), applyMiddleware(logger));

keysInit({store: store});

const PureMosaic = ({binder1, binder2}) => {
  const selectedId1 = binder1.selectedId;
  const active1 = binder1.active;
  const selectedId2 = binder2.selectedId;
  const active2 = binder2.active;
  return (
    <div>
      <Binder id="binder1" active={true} onDownExit="binder2">
        <ul>
          <li id="b1" className={active1 && selectedId1 === 'b1' ? 'selected' : ''}>BOUTON 1</li>
          <li id="b2" className={active1 && selectedId1 === 'b2' ? 'selected' : ''}>BOUTON 2</li>
          <li id="b3" className={active1 && selectedId1 === 'b3' ? 'selected' : ''}>BOUTON 3</li>
        </ul>
      </Binder>
      <StrapeBinder id="binder2" onUpExit="binder1" exitStrategy="start">
        <ul>
          <li id="b4" className={active2 && selectedId2 === 'b4' ? 'selected' : ''}>BOUTON 4</li>
          <li id="b5" className={active2 && selectedId2 === 'b5' ? 'selected' : ''}>BOUTON 5</li>
          <li id="b6" className={active2 && selectedId2 === 'b6' ? 'selected' : ''}>BOUTON 6</li>
        </ul>
      </StrapeBinder>
    </div>
  );
};

function onEnter(element) {
  alert('ELEMENT #' + element.id);
}

const Mosaic = connect(state => {
  return {
    binder1: state['@@keys'].getBinder('binder1'),
    binder2: state['@@keys'].getBinder('binder2'),
  };
})(PureMosaic);

ReactDOM.render(<Provider store={store}>
  <Mosaic/>
</Provider>, document.getElementById('body'));

activeKeyBinder('strape-1');

