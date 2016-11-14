import { _keyReducer } from '../src/redux/reducer';
import { globalStore } from '../src/listener';
import { createStore, combineReducers } from 'redux';
import { NAME } from '../src/constants';

export const ops = {
  store: createStore(combineReducers({ [NAME]: _keyReducer }), {}),
};

export const reset = () => globalStore.dispatch({ type: 'RESET_STATE' });
