import _KeyBinder from './KeyBinder';
import {_register} from './events';
import {_init} from './listener';
import {UP, DOWN, LEFT, RIGHT, ENTER} from './keys';

export const register = _register;
export const KeyBinder = _KeyBinder;
export const keysInit = _init;
export const keys = {UP, DOWN, LEFT, RIGHT, ENTER};
