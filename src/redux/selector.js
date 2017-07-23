import { NAME } from '../constants';
import { globalStore } from '../listener';
import { ensureState } from '../ensure';
import { findBinder } from './helper';

export function _selector(id) {
  ensureState();
  const binder = findBinder(globalStore.getState()[NAME].binders, id);
  return () => binder || { marginLeft: 0, marginTop: 0 };
}

export function _isCurrentBinder(id) {
  ensureState();
  const currentBinderId =
    globalStore.getState()['current'] &&
    globalStore.getState()['current'].binderId;
  return () => currentBinderId === id;
}

export function _getBinderSelectedId(id) {
  ensureState();
  const binder = findBinder(globalStore.getState()[NAME].binders, id);
  return () => (binder ? binder.selectedId : '');
}

export function _getBinderMarginLeft(id) {
  ensureState();
  const binder = findBinder(globalStore.getState()[NAME].binders, id);
  return () => (binder ? binder.marginLeft : 0);
}

export function _getBinderMarginTop(id) {
  ensureState();
  const binder = findBinder(globalStore.getState()[NAME].binders, id);
  return () => (binder ? binder.marginTop : 0);
}

export function _isBinderActive(id) {
  ensureState();
  const binder = findBinder(globalStore.getState()[NAME].binders, id);
  return () => binder && binder.active;
}
