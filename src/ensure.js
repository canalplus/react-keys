/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
import { getBinders, getStore } from './store';

const prefix = '[react-keys] - ';

export function ensureState() {
  if (!getStore()) {
    throw new Error(`${prefix}keys state not present un global state`);
  }
}

export function ensureKnownBinder(binderId) {
  if (!getBinders().some(binder => binderId === binder.id)) {
    console.warn(
      `${prefix}You cannot activate a unknown binder (${binderId}).`
    );
    return false;
  }
  return true;
}

export function isUnknownBinder(binderId) {
  return !getBinders().some(binder => binderId === binder.id);
}
