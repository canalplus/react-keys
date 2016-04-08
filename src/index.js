import _KeyBinder from './KeyBinder';
import {_register} from './events';
import {_init} from './listener';
import {UP, DOWN, LEFT, RIGHT, ENTER} from './keys';
import {_keyReducer} from './redux/reducer';
import {_changeAreaAction} from './redux/actions';

export const register = _register;
export const KeyBinder = _KeyBinder;
export const keysInit = _init;
export const keys = {UP, DOWN, LEFT, RIGHT, ENTER};
export const keysReducer = _keyReducer;
export const changeAreaAction = _changeAreaAction;
