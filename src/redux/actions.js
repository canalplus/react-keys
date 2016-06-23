import {globalStore} from '../listener';
import {findMirrorExitId, findStartExitId} from '../engines/strape';
import {EXIT_STRATEGY_MIRROR, EXIT_STRATEGY_START} from '../constants';

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
    } else {
      cloneObject[property] = obj[property];
    }
  }
  return cloneObject;
}

export function _activeKeyBinder(binderId, id) {
  if (globalStore.dispatch) {
    const newState = clone(globalStore.getState()[NAME]);
    for (const key of Object.keys(newState)) {
      newState[key].active = false;
    }
    if (Object.keys(newState).some(key => key === binderId)) {
      newState[binderId].active = true;
      newState[binderId].selectedId = id || newState[binderId].selectedId;
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
    if (!Object.keys(newState).some(key => key === binderId)) {
      newState[binderId] = {};
      newState[binderId].id = binderId;
      newState[binderId].active = active;
      globalStore.dispatch({
        type: ADD_KEYBINDER_TO_STORE,
        state: newState,
      });
    }
  }
}

export function _updateBinderState(binderId, binderState) {
  if (globalStore.dispatch) {
    const newState = clone(globalStore.getState()[NAME]);
    newState[binderId] = {...newState[binderId], ...binderState};
    globalStore.dispatch({
      type: UPDATE_BINDER_STATE,
      state: newState,
    });
  }
}

export function exitBinder(strategy, callback, nextElId) {
  if (callback) {
    if (typeof callback === 'string') {
      const dom = document.getElementById(callback) || document;
      const exitBinderState = globalStore.getState()[NAME][callback] || {};
      const children = [].slice.call(dom.querySelectorAll(exitBinderState.wChildren));
      if (children.length === 0) {
        _activeKeyBinder(callback);
      } else {
        switch (strategy) {
          case EXIT_STRATEGY_MIRROR:
            const leftElement = document.getElementById(nextElId);
            const mirrorId = findMirrorExitId(leftElement, children);
            _activeKeyBinder(callback, mirrorId);
            break;
          case EXIT_STRATEGY_START:
            const startId = findStartExitId(children);
            _activeKeyBinder(callback, startId);
            break;
          default:
            _activeKeyBinder(callback);
            break;
        }
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
    globalStore.dispatch({
      type: UPDATE_SELECTED_KEY,
      state: newState,
    });
  }
}
