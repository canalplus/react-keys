import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Binder, keysInit, keysReducer, Keys } from '../src';

const store = createStore(
  combineReducers({
    '@@keys': keysReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

keysInit({ store });

const App = () => {
  return (
    <div>
      <Keys
        id="my-key"
        onUp={() => console.log('ON UP')}
        onDown={() => console.log('ON DOWN')}
      />
      <Binder id={'B1'} active={false}>
        <ul>
          <li id={'B11'}>CLICK</li>
        </ul>
      </Binder>
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('body')
);
