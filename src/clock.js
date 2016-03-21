let keysLock = false;

export function block() {
  keysLock = true;
  setTimeout(() => (keysLock = false), 10);
}

export function isBlocked() {
  return keysLock;
}
