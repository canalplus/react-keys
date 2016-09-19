import { globalStore } from './listener';
import { NAME } from './constants';

export function _selector(id) {
  return globalStore.getState()[NAME][id] || { marginLeft: 0, marginTop: 0 };
}
