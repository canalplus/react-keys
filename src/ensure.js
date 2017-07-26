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

export function ensureKnownBinder(binderId) {
  const state = globalStore.getState()[NAME];
  if (!state.binders.some(binder => binderId === binder.id)) {
    console.warn(
      `${prefix}You cannot activate a unknown binder (${binderId}).`
    );
    return false;
  }
  return true;
}

export function isUnknownBinder(binderId) {
  return !globalStore
    .getState()
    [NAME].binders.some(binder => binderId === binder.id);
}
