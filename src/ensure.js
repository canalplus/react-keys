import { globalStore } from './listener';
import { NAME } from './constants';

const prefix = '[react-keys] - ';

export function ensureState() {
  if (!globalStore.getState()[NAME]) {
    throw new Error(`${prefix}keys state not present un global state`);
  }
}

export function ensureDispatch() {
  if (!globalStore.dispatch) {
    throw new Error(`${prefix}You better have Redux to use this feature`);
  }
}

export function ensureMountedBinder(binderId) {
  if (!Object.keys(globalStore.getState()[NAME]).some(key => binderId === key)) {
    throw new Error(`${prefix}You cannot activate a unmounted binder (${binderId}).`);
  }
}

export function isUnmountedBinder(binderId) {
  return !Object.keys(globalStore.getState()[NAME]).some(key => binderId === key);
}
