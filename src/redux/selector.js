import { NAME } from '../constants';
import { globalStore } from '../listener';
import { ensureState } from '../ensure';
import { findBinder } from './helper';

export const _selector = id => () => {
  ensureState();
  const binder = findBinder(globalStore.getState()[NAME].binders, id);
  return binder || { marginLeft: 0, marginTop: 0 };
};

export const _isCurrentBinder = id => () => {
  ensureState();
  const currentBinderId =
    globalStore.getState()[NAME]['current'] &&
    globalStore.getState()[NAME]['current'].binderId;
  return currentBinderId === id;
};

export const _getBinderSelectedId = id => () => {
  ensureState();
  const binder = findBinder(globalStore.getState()[NAME].binders, id);
  return binder ? binder.selectedId : '';
};

export const _getBinderMarginLeft = id => () => {
  ensureState();
  const binder = findBinder(globalStore.getState()[NAME].binders, id);
  return binder ? binder.marginLeft : 0;
};

export const _getBinderMarginTop = id => () => {
  ensureState();
  const binder = findBinder(globalStore.getState()[NAME].binders, id);
  return binder ? binder.marginTop : 0;
};

export const _isBinderActive = id => () => {
  ensureState();
  const binder = findBinder(globalStore.getState()[NAME].binders, id);
  return binder && binder.mounted;
};
