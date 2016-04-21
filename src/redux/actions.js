export const NAME = '@@keys';
export const ACTIVE_KEYBINDER = [NAME, '/ACTIVE_KEYBINDER'].join('');
export const ADD_KEYBINDER_TO_STORE = [NAME, '/ADD_KEYBINDER_TO_STORE'].join('');
export const UPDATE_SELECTED_KEY = [NAME, '/UPDATE_SELECTED_KEY'].join('');
import {globalStore} from '../listener';

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

export function _activeKeyBinder(binderId) {
  if (globalStore.dispatch) {
    const newState = clone(globalStore.getState()[NAME]);
    for (const key of Object.keys(newState)) {
      newState[key].active = false;
    }
    if (Object.keys(newState).some(key => key === binderId)) {
      newState[binderId].active = true;
      globalStore.dispatch({
        type: ACTIVE_KEYBINDER,
        state: newState,
      });
    }
  }
}

export function _addKeyBinderToStore(keyBinderState) {
  if (globalStore.dispatch) {
    const newState = clone(globalStore.getState()[NAME]);
    if (!Object.keys(newState).some(key => key === keyBinderState.id)) {
      newState[keyBinderState.id] = keyBinderState;
      newState[keyBinderState.id].active = false;
      globalStore.dispatch({
        type: ADD_KEYBINDER_TO_STORE,
        state: newState,
      });
    }
  }
}

export function _updateSelectedId(selectedId, marginLeft, binderId) {
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
