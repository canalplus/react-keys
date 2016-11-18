import { globalStore } from '../listener';
import { findIdByStrategy } from '../engines/strategy';
import { boundsMargin } from '../engines/bounds';
import { NAME } from '../constants';
import { ensureDispatch, ensureMountedBinder, ensureUnmountedBinder } from '../ensure';

export const ACTIVATE_BINDER = [NAME, '/ACTIVATE_BINDER'].join('');
export const ADD_BINDER_TO_STORE = [NAME, '/ADD_BINDER_TO_STORE'].join('');
export const UPDATE_BINDER_SELECTED_KEY = [NAME, '/UPDATE_BINDER_SELECTED_KEY'].join('');
export const UPDATE_BINDER_STATE = [NAME, '/UPDATE_BINDER_STATE'].join('');
export const UPDATE_CURRENT = [NAME, '/UPDATE_CURRENT'].join('');
export const UPDATE_PRESS_STATUS = [NAME, '/UPDATE_PRESS_STATUS'].join('');

export function addBinderToStore(props, type) {
  ensureDispatch();
  ensureUnmountedBinder();
  const {
    id,
    active,
    selector,
    gap,
    boundedGap,
    topGap,
    rightGap,
    leftGap,
    downGap,
  } = props;
  globalStore.dispatch({
    type: ADD_BINDER_TO_STORE,
    newBinder: {
      [id]: {
        id,
        active,
        type,
        selector,
        gap,
        boundedGap,
        topGap,
        rightGap,
        leftGap,
        downGap,
        marginLeft: 0,
        marginTop: 0
      }
    },
  });
}

export function _updateBinderState(binderId, binderState) {
  ensureDispatch();
  ensureMountedBinder(binderId);
  const { active, selectedId } = globalStore.getState()[NAME][binderId];
  globalStore.dispatch({
    type: UPDATE_BINDER_STATE,
    binderId,
    binderState,
  });
  if (active) {
    globalStore.dispatch({
      type: UPDATE_CURRENT,
      binderId,
      selectedId,
    });
  }
}

export function updateBinderSelectedId(binderId, selectedId, dir) {
  ensureDispatch();
  ensureMountedBinder(binderId);
  const margin = boundsMargin(dir, selectedId, globalStore.getState()[NAME][binderId]);
  globalStore.dispatch({
    type: UPDATE_BINDER_SELECTED_KEY,
    binderId,
    selectedId,
    marginLeft: margin.marginLeft,
    marginTop: margin.marginTop,
  });
}

export function desactivateBinders(binders, binderId) {
  let updatedBinders = {};
  Object.keys(binders).map(key => {
    if (key !== 'current' && key !== 'PRESS' && key !== binderId)
      updatedBinders[key] = { ...binders[key], active: false };
  });
  return updatedBinders;
}

export function activateBinder(binderId, nextElId) {
  ensureDispatch();
  ensureMountedBinder(binderId);
  const state = globalStore.getState()[NAME];
  globalStore.dispatch({
    type: ACTIVATE_BINDER,
    binderId,
    inactiveBinders: desactivateBinders(state, binderId),
    selectedId: findIdByStrategy(state, binderId, nextElId),
  });
}

export function updatePressStatus(press, keyCode = null) {
  ensureDispatch();
  if (globalStore.getState()[NAME]['PRESS'].press !== press) {
    globalStore.dispatch({
      type: UPDATE_PRESS_STATUS,
      press,
      keyCode,
    });
  }
}
