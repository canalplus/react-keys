export let keysListeners = [];
export let globalStore;

export function cb(e) {
  const keyCode = e.keyCode ? e.keyCode : e;
  for (const listener of keysListeners) {
    listener.callback.call(listener.context, keyCode);
  }
}

export function _init(ops) {
  globalStore = ops && ops.store ? ops.store : null;
  if (!ops || (ops && !ops.bindkeys)) {
    document.addEventListener('keydown', cb);
  } else {
    ops.bindkeys(cb);
  }
}

export function addListener(callback, context) {
  const id = Math.random().toString(36).substring(2, 5);
  keysListeners.push({
    id: id,
    callback: callback,
    context: context,
  });
  return id;
}

export function removeListener(id) {
  keysListeners = keysListeners.filter(listener => listener.id !== id);
}
