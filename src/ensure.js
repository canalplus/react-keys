/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
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
  const state = globalStore.getState()[NAME];
  if (
    !state.standards
      .some(standard => binderId === standard.id)
  ) {
    console.warn(
      `${prefix}You cannot activate a unmounted binder (${binderId}).`
    );
    return false;
  }
  return true;
}

export function isUnmountedBinder(binderId) {
  return !globalStore
    .getState()
    [NAME].standards.some(standard => binderId === standard.id);
}
