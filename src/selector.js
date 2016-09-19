import { globalStore } from './listener';
import { NAME } from './constants';

export function _selector(id) {
  if (!globalStore.getState()[NAME]) {
    throw new Error('keys state not present un global state');
  }
  return globalStore.getState()[NAME][id] || { marginLeft: 0, marginTop: 0 };
}
