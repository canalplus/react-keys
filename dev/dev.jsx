import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {connect, Provider} from 'react-redux';
import {Binder, StrapeBinder, keysInit, keysReducer, activeKeyBinder} from '../src';

const logger = store => next => action => {
  // console.group(action.type);
  // console.info('dispatching', action);
  const result = next(action);
  // console.info('next state', store.getState());
  // console.groupEnd(action.type);
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
  const binder2Style = {
    marginLeft: -binder2.marginLeft,
  };
  return (
    <div className="container">
      <Binder id="binder1" onDownExit="binder2" active={true}>
        <li id="b1" className={active1 && selectedId1 === 'b1' ? 'selected' : ''}>BOUTON 1</li>
        <li id="b2" className={active1 && selectedId1 === 'b2' ? 'selected' : ''}>BOUTON 2</li>
      </Binder>
      <StrapeBinder id="binder2" onUpExit="binder1" enterStrategy="start" strategy="bounds"
                    wrapper=".wrapper">
        <div className="wrapper">
          <ul style={binder2Style}>
            <li id="b7" className={active2 && selectedId2 === 'b7' ? 'selected' : ''}>BOUTON 7</li>
            <li id="b8" className={active2 && selectedId2 === 'b8' ? 'selected' : ''}>BOUTON 8</li>
            <li id="b9" className={active2 && selectedId2 === 'b9' ? 'selected' : ''}>BOUTON 9</li>
            <li id="b10" className={active2 && selectedId2 === 'b10' ? 'selected' : ''}>BOUTON 10
            </li>
            <li id="b11" className={active2 && selectedId2 === 'b11' ? 'selected' : ''}>BOUTON 11
            </li>
            <li id="b12" className={active2 && selectedId2 === 'b12' ? 'selected' : ''}>BOUTON 12
            </li>
          </ul>
        </div>
      </StrapeBinder>
    </div>
  );
};

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

