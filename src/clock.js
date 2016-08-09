let keysLock = false;

export function block(timeout = 10) {
  keysLock = true;
  setTimeout(() => (keysLock = false), timeout);
}

export function isBlocked() {
  return keysLock;
}
