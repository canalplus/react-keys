/* eslint import/no-mutable-exports:0 */
import {  _updateBinderState } from './redux/actions';
import { LONG_PRESS_TIMEOUT } from './constants';

export let keysListeners = [];
export let globalStore = function() {
};
export let fired = false;
export let pressTimeout = null;

export function cb(e) {
  const keyCode = e.keyCode ? e.keyCode : e;
  for (const listener of keysListeners) {
    listener.callback.call(listener.context, keyCode);
  }
  if (!fired) {
    fired = true;
    for (const listener of keysListeners) {
      pressTimeout = setTimeout(() => {
        _updateBinderState(listener.context.props.id, { press: fired })
      }, LONG_PRESS_TIMEOUT);
    }
  }
}

export function cbRelease() {
  clearTimeout(pressTimeout);
  fired = false;
  for (const listener of keysListeners) {
    _updateBinderState(listener.context.props.id, { press: fired })
  }
}


export function _init(ops) {
  globalStore = ops && ops.store ? ops.store : function() {
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
