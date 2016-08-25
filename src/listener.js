/* eslint import/no-mutable-exports:0 */
export let keysListeners = [];
export let globalStore = function() {
};

export function cb(e) {
  const keyCode = e.keyCode ? e.keyCode : e;
  for (const listener of keysListeners) {
    listener.callback.call(listener.context, keyCode);
  }
}

export function _init(ops) {
  globalStore = ops && ops.store ? ops.store : function() {
  };
  if (!ops || (ops && !ops.bindkeys)) {
    document.addEventListener('keydown', cb);
  } else {
    ops.bindkeys(cb);
  }
}

export function addListener(callback, context) {
  const id = Math.random().toString(36).substring(2, 10);
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
