import _Binder from './components/Binder';
import _Keys from './components/Basic';
import _Carousel from './components/Carousel';
import { _init } from './listener';
import { UP, DOWN, LEFT, RIGHT, ENTER, NUMERICS } from './keys';
import { _keyReducer } from './redux/reducer';
import { activateBinder, _updateBinderState } from './redux/actions';
import { _selector } from './selector';

export const keys = { UP, DOWN, LEFT, RIGHT, ENTER, NUMERICS };
export const keysInit = _init;

export const Keys = _Keys;
export const Binder = _Binder;
export const Carousel = _Carousel;

export const keysReducer = _keyReducer;
export const keysSelector = _selector;

export const activeKeyBinder = activateBinder;
export const updateBinderState = _updateBinderState;
