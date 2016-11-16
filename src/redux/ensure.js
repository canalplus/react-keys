import { globalStore } from '../listener';
import { NAME } from '../constants';

export function ensureDispatch() {
  if (!globalStore.dispatch) {
    throw new Error('You better have Redux to use this feature');
  }
}

export function ensureMountedBinder(binderId) {
  if (!Object.keys(globalStore.getState()[NAME]).some(key => binderId === key)) {
    throw new Error(`You cannot activate a unmounted binder (${binderId}).`);
  }
}

export function ensureUnmountedBinder(binderId) {
  if (Object.keys(globalStore.getState()[NAME]).some(key => binderId === key)) {
    throw new Error(`Already mounted (${binderId}).`);
  }
}
