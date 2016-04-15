import _KeyBinder from './KeyBinder';
import _StrapeBinder from './StrapeBinder.jsx';
import {_register} from './events';
import {_init} from './listener';
import {UP, DOWN, LEFT, RIGHT, ENTER} from './keys';
import {_keyReducer} from './redux/reducer';
import {_activeKeyBinder} from './redux/actions';

export const register = _register;
export const KeyBinder = _KeyBinder;
export const StrapeBinder = _StrapeBinder;
export const keysInit = _init;
export const keys = {UP, DOWN, LEFT, RIGHT, ENTER};
export const keysReducer = _keyReducer;
export const activeKeyBinder = _activeKeyBinder;
