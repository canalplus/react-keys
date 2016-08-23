import { globalStore } from '../listener';
import { findMirrorExitId, findStartExitId } from '../engines/strape';
import {
  EXIT_STRATEGY_MIRROR,
  EXIT_STRATEGY_START,
  EXIT_STRATEGY_MEMORY,
  BINDER_TYPE,
} from '../constants';

export const NAME = '@@keys';
export const ACTIVE_KEYBINDER = [NAME, '/ACTIVE_KEYBINDER'].join('');
export const ADD_KEYBINDER_TO_STORE = [NAME, '/ADD_KEYBINDER_TO_STORE'].join('');
export const UPDATE_SELECTED_KEY = [NAME, '/UPDATE_SELECTED_KEY'].join('');
export const UPDATE_BINDER_STATE = [NAME, '/UPDATE_BINDER_STATE'].join('');

export function clone(obj) {
  const cloneObject = {};
  for (const property in obj) {
    if (typeof obj[property] === 'object') {
      cloneObject[property] = clone(obj[property]);
    } else if (typeof obj[property] !== 'function') {
      cloneObject[property] = obj[property];
    }
  }
  return cloneObject;
}

export function bindersKeys(newState) {
  const keys = Object.keys(newState);
  keys.splice(keys.indexOf('current'), 1);
  return keys;
}

export function _activeKeyBinder(binderId, id, memory = false) {
  if (globalStore.dispatch) {
    const newState = clone(globalStore.getState()[NAME]);
    for (const key of bindersKeys(newState)) {
      newState[key].active = false;
    }
    if (bindersKeys(newState).some(key => key === binderId)) {
      newState[binderId].active = true;
      if (!memory) {
        newState[binderId].selectedId =
          newState[binderId].elements && newState[binderId].elements[0].id;
      } else {
        newState[binderId].selectedId = id || newState[binderId].selectedId;
      }
      newState.current = {
        selectedId: newState[binderId].selectedId,
        binderId: binderId,
      };
      globalStore.dispatch({
        type: ACTIVE_KEYBINDER,
        state: newState,
      });
    }
  }
}

export function addKeyBinderToStore(binderId, active) {
  if (globalStore.dispatch) {
    const newState = clone(globalStore.getState()[NAME]);
    if (!bindersKeys(newState).some(key => key === binderId)) {
      newState[binderId] = {};
      newState[binderId].id = binderId;
      newState[binderId].active = active;
      globalStore.dispatch({
        type: ADD_KEYBINDER_TO_STORE,
        state: newState,
      });
    }
    if (active) {
      _activeKeyBinder(binderId,
        newState[binderId].elements && newState[binderId].elements[0].id);
    }
  }
}

export function _updateBinderState(binderId, binderState) {
  if (globalStore.dispatch) {
    const newState = clone(globalStore.getState()[NAME]);
    newState[binderId] = { ...newState[binderId], ...binderState };
    if (newState[binderId].active) {
      newState.current = {
        selectedId: binderState.selectedId,
        binderId: binderId,
      };
    }
    globalStore.dispatch({
      type: UPDATE_BINDER_STATE,
      state: newState,
    });
  }
}

export function enterStrape(strategy, callback, nextElId, children, dom) {
  switch (strategy) {
    case EXIT_STRATEGY_MIRROR:
      const leftElement = document.getElementById(nextElId);
      const mirrorId = findMirrorExitId(leftElement, children);
      _activeKeyBinder(callback, mirrorId, true);
      break;
    case EXIT_STRATEGY_START:
      const startId = findStartExitId(children, dom);
      _activeKeyBinder(callback, startId, true);
      break;
    case EXIT_STRATEGY_MEMORY:
      _activeKeyBinder(callback, null, true);
      break;
    default:
      _activeKeyBinder(callback);
      break;
  }
}

export function enterBinder(strategy, callback) {
  switch (strategy) {
    case EXIT_STRATEGY_MEMORY:
      _activeKeyBinder(callback, null, true);
      break;
    default:
      _activeKeyBinder(callback);
      break;
  }
}

export function enter(callback, nextElId) {
  if (callback) {
    if (typeof callback === 'string') {
      const nextBinderState = globalStore.getState()[NAME][callback] || {};
      const strategy = nextBinderState.enterStrategy;
      if (nextBinderState.type === BINDER_TYPE) {
        enterBinder(strategy, callback);
      } else {
        const dom = document.getElementById(callback) || document;
        const children = [].slice.call(dom.querySelectorAll(nextBinderState.wChildren));
        enterStrape(strategy, callback, nextElId, children, dom);
      }
    } else {
      callback();
    }
  }
}

export function updateSelectedId(binderId, selectedId, marginLeft) {
  if (globalStore.dispatch) {
    const newState = clone(globalStore.getState()[NAME]);
    newState[binderId].selectedId = selectedId;
    newState[binderId].marginLeft = marginLeft;
    newState.current.selectedId = selectedId;
    globalStore.dispatch({
      type: UPDATE_SELECTED_KEY,
      state: newState,
    });
  }
}
