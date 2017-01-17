import { rkDebounce } from './listener';

let keysLock = false;

export function block(timeout = rkDebounce) {
  keysLock = true;
  setTimeout(() => (keysLock = false), timeout);
}

export function isBlocked() {
  return keysLock;
}
