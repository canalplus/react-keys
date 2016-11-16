import { globalStore } from './listener';
import { NAME } from './constants';
import { ensureState } from './ensure';

export function _selector(id) {
  ensureState();
  return () => globalStore.getState()[NAME][id] || { marginLeft: 0, marginTop: 0 };
}
