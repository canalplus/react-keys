import _StrapeBinder from './StrapeBinder';
import _Binder from './Binder';
import _Keys from './Basic';
import _Carousel from './Carousel';
import { _register } from './events';
import { _init } from './listener';
import { UP, DOWN, LEFT, RIGHT, ENTER } from './keys';
import { _keyReducer } from './redux/reducer';
import { _activeKeyBinder, _updateBinderState } from './redux/actions';

export const keys = { UP, DOWN, LEFT, RIGHT, ENTER };
export const keysInit = _init;

export const Keys = _Keys;
export const Binder = _Binder;
export const StrapeBinder = _StrapeBinder;
export const Carousel = _Carousel;

export const keysReducer = _keyReducer;

export const register = _register;
export const activeKeyBinder = _activeKeyBinder;
export const updateBinderState = _updateBinderState;
