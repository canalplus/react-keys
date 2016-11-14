import _StrapeBinder from './StrapeBinder';
import _Binder from './Binder';
import _Keys from './Basic';
import _Carousel from './Carousel';
import { _register } from './events';
import { _init } from './listener';
import { UP, DOWN, LEFT, RIGHT, ENTER, NUMERICS } from './keys';
import { _keyReducer } from './redux/reducer';
import { activateBinder, _updateBinderState } from './redux/actions';
import { _selector } from './selector';

export const keys = { UP, DOWN, LEFT, RIGHT, ENTER, NUMERICS };
export const keysInit = _init;

export const Keys = _Keys;
export const Binder = _Binder;
export const StrapeBinder = _StrapeBinder;
export const Carousel = _Carousel;

export const keysReducer = _keyReducer;
export const keysSelector = _selector;

export const register = _register;
export const activeKeyBinder = activateBinder;
export const updateBinderState = _updateBinderState;
