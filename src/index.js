import _Binder from './components/Binder';
import _Keys from './components/Keys';
import _Carousel from './components/Carousel';
import _Catcher from './components/Catcher';
import _catcher from './catcher';
import { _init, getConfig } from './listener';
import { _keyReducer } from './redux/reducer';
import { _activeBinder, _updateBinder, _resetBinder, _resetCarousel } from './redux/actions';
import {
  _selector,
  _isCurrentBinder,
  _isBinderActive,
  _getBinderMarginLeft,
  _getBinderMarginTop,
  _getBinderSelectedId
} from './redux/selector';
import blocks from './blocks';

export const config = getConfig;
export const keysInit = _init;

export const Keys = _Keys;
export const Binder = _Binder;
export const Carousel = _Carousel;
export const Catcher = _Catcher;

export const keysReducer = _keyReducer;
export const keysSelector = _selector;
export const isCurrentBinder = _isCurrentBinder;
export const isBinderActive = _isBinderActive;
export const getBinderMarginLeft = _getBinderMarginLeft;
export const getBinderMarginTop = _getBinderMarginTop;
export const getBinderSelectedId = _getBinderSelectedId;

export const catcher = _catcher;

export const activeBinder = _activeBinder;
export const updateBinder = _updateBinder;
export const resetBinder = _resetBinder;
export const resetCarousel = _resetCarousel;

export const block = blocks.block;
export const unblock = blocks.unblock;
export const blockExcept = blocks.blockExcept;
export const unblockExcept = blocks.unblockExcept;
export const _blocks = blocks;
