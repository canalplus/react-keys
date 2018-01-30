import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import {
  Binder,
  Carousel,
  keysInit,
  keysReducer,
  keysSelector,
  removeBinder,
} from '../src';

const store = createStore(
  combineReducers({
    '@@keys': keysReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

keysInit({ store });

const Binder1 = () => {
  return (
    <Binder id={'B1'} wrapper="ul" priority={1}>
      <ul>
        <li id={'B11'} onClick={() => removeBinder('B1')}>
          CLICK
        </li>
      </ul>
    </Binder>
  );
};

const Binder2 = () => {
  return (
    <Binder id={'B2'} priority={3}>
      <ul>
        <li id={'B21'} onClick={() => removeBinder('B2')}>
          CLICK
        </li>
      </ul>
    </Binder>
  );
};

const Carousel1 = () => {
  return (
    <Carousel id={'C1'}>
      <li id="C11">CAROUSEL</li>
      <li id="C12">CAROUSEL</li>
      <li id="C13">CAROUSEL</li>
      <li id="C14">CAROUSEL</li>
      <li id="C15">CAROUSEL</li>
      <li id="C16">CAROUSEL</li>
      <li id="C17">CAROUSEL</li>
      <li id="C18">CAROUSEL</li>
    </Carousel>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Binder1 />
      <Binder2 />
      <Carousel1 />
    </div>
  </Provider>,
  document.getElementById('body')
);
