/* eslint import/no-mutable-exports:0 */
import { updatePressStatus } from './redux/actions';
import { LONG_PRESS_TIMEOUT, NAME } from './constants';

export let keysListeners = [];
export let globalStore = {
  getState: () => {
    return { [NAME]: {} };
  },
};
export let fired = false;
export let block = false;
export let pressTimeout = null;
export let eventCb = null;

export function cb(e) {
  const keyCode = e.keyCode ? e.keyCode : e;
  if (!block) {
    eventCb(keyCode, 'short');
  }
  if (!block || globalStore.getState()[NAME]['PRESS'].press) {
    for (const listener of keysListeners) {
      listener.callback.call(listener.context, keyCode);
    }
    block = true;
  }
  if (!fired) {
    fired = true;
    pressTimeout = setTimeout(() => {
      eventCb(keyCode, 'long');
      updatePressStatus(true, keyCode);
    }, LONG_PRESS_TIMEOUT);
  }
}

export function cbRelease() {
  clearTimeout(pressTimeout);
  block = false;
  fired = false;
  updatePressStatus(fired);
}


export function _init(ops) {
  globalStore = ops && ops.store ? ops.store : globalStore;
  eventCb = ops && ops.eventCb ? ops.eventCb : function() {
    };
  if (!ops || (ops && !ops.bindkeys)) {
    document.addEventListener('keydown', cb);
    document.addEventListener('keyup', cbRelease);
  } else {
    ops.bindkeys(cb, cbRelease);
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
