import { globalStore } from './listener';
import { NAME } from './constants';
import { ensureState } from './ensure';

export function _selector(id) {
  ensureState();
  return () => globalStore.getState()[NAME][id] || { marginLeft: 0, marginTop: 0 };
}

export function _isCurrentBinder(id) {
  ensureState();
  const currentBinderId = globalStore.getState()['current'] &&
    globalStore.getState()['current'].binderId;
  return () => currentBinderId === id;
}

export function _getBinderSelectedId(id) {
  ensureState();
  return () => globalStore.getState()[NAME][id] ? globalStore.getState()[NAME][id].selectedId : '';
}

export function _getBinderMarginLeft(id) {
  ensureState();
  return () => globalStore.getState()[NAME][id] ? globalStore.getState()[NAME][id].marginLeft : 0;
}

export function _getBinderMarginTop(id) {
  ensureState();
  return () => globalStore.getState()[NAME][id] ? globalStore.getState()[NAME][id].marginTop : 0;
}

export function _isBinderActive(id) {
  ensureState();
  return () => globalStore.getState()[NAME][id] && globalStore.getState()[NAME][id].active;
}
