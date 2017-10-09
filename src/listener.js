/* eslint import/no-mutable-exports:0 */
import { updatePressStatus } from './redux/actions';
import blocks from './blocks';
import config, { AVAILABLE_FOR_LONG_PRESS } from './config';
import { catcherWatcher } from './catcher';
import { LONG_PRESS_TIMEOUT, NAME, DEBOUNCE_TIMEOUT } from './constants';

export let keysListeners = [];
export let keysCopy = [];
export let globalStore = {
  getState: () => {
    return { [NAME]: {} };
  },
};
export let fired = false;
export let clicked = false;
export let pressTimeout = null;
export let eventCb = null;
export let rkDebounce = DEBOUNCE_TIMEOUT;
export let userConfig = config;
export let availableForLongPress = AVAILABLE_FOR_LONG_PRESS;

export const getConfig = () => userConfig;

export function callListeners(keyCode, longPress, click = false) {
  keysCopy.forEach(listener =>
    listener.callback.call(listener.context, keyCode, longPress, click)
  );
}

export function callTriggerClick(keyCode) {
  if (!clicked) {
    if (keyCode === userConfig.enter) {
      setTimeout(() => callListeners(keyCode, false, true), 0);
    } else {
      setTimeout(() => callListeners(keyCode, false), 0);
    }
    clicked = true;
  }
}

export function releaseClickTouch(keyCode) {
  if (keyCode === userConfig.enter) {
    setTimeout(() => callListeners(keyCode, false), 0);
  }
}

export function cb(e) {
  keysCopy = [...keysListeners];
  const keyCode = e.keyCode ? e.keyCode : e;
  if (blocks.isBlocked(keyCode)) return;
  callTriggerClick(keyCode);
  if (!fired && availableForLongPress.indexOf(keyCode) !== -1) {
    pressTimeout = setTimeout(() => {
      eventCb(keyCode, 'long');
      updatePressStatus(true, keyCode);
      fired = true;
    }, LONG_PRESS_TIMEOUT);
  }
  if (globalStore.getState()[NAME]['PRESS'].press) {
    callListeners(keyCode, true);
  }
}

export function cbRelease(e) {
  const keyCode = e.keyCode ? e.keyCode : e;
  if (blocks.isBlocked(keyCode)) return;
  catcherWatcher(keyCode);
  eventCb(keyCode, 'short');
  releaseClickTouch(keyCode);
  clearTimeout(pressTimeout);
  updatePressStatus(false);
  fired = false;
  clicked = false;
}

export function _init(ops) {
  globalStore = ops && ops.store ? ops.store : globalStore;
  rkDebounce = ops && ops.debounce ? ops.debounce : DEBOUNCE_TIMEOUT;
  eventCb = ops && ops.eventCb ? ops.eventCb : () => ({});
  userConfig =
    ops && ops.config ? { ...userConfig, ...ops.config } : userConfig;
  availableForLongPress =
    ops && ops.longPressTouch ? ops.longPressTouch : availableForLongPress;
  if (!ops || (ops && !ops.bindkeys)) {
    document.addEventListener('keydown', cb);
    document.addEventListener('keyup', cbRelease);
  } else {
    ops.bindkeys(cb, cbRelease);
  }
}

export function addListener(callback, context) {
  const id = Math.random()
    .toString(36)
    .substring(2, 10);
  keysListeners.unshift({
    id: id,
    callback: callback,
    context: context,
  });
  return id;
}

export function removeListener(id) {
  keysListeners = keysListeners.filter(listener => listener.id !== id);
  return null;
}
