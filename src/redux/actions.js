import { globalStore } from '../listener';
import { findIdByStrategy } from '../engines/strategy';
import { boundsMargin, correctBoundsMargin } from '../engines/bounds';
import { calculateNewState } from '../engines/helpers';
import { CAROUSEL_TYPE, EXIT_STRATEGY_MEMORY, NAME } from '../constants';
import { ensureDispatch, ensureKnownBinder, isUnknownBinder } from '../ensure';
import { enterTo, execCb } from '../funcHandler';
import {
  findBinder,
  buildBinderFromProps,
  buildCarsouelFromProps,
} from './helper';

export const ADD_BINDER = `${NAME}/ADD_BINDER`;
export const MOUNT_BINDER = `${NAME}/MOUNT_BINDER`;
export const UPDATE_BINDER = `${NAME}/UPDATE_BINDER`;
export const REMOVE_BINDER = `${NAME}/REMOVE_BINDER`;
export const ACTIVE_BINDER = `${NAME}/ACTIVE_BINDER`;

export const UPDATE_BINDER_SELECTED_KEY = `${NAME}/UPDATE_BINDER_SELECTED_KEY`;
export const UPDATE_PRESS_STATUS = `${NAME}/UPDATE_PRESS_STATUS`;

export function addBinder(props, type) {
  ensureDispatch();
  if (!isUnknownBinder(props.id)) {
    globalStore.dispatch({
      type: MOUNT_BINDER,
      binderId: props.id,
      priority: props.priority,
    });
    return;
  }
  globalStore.dispatch({
    type: ADD_BINDER,
    binder:
      type === CAROUSEL_TYPE
        ? buildCarsouelFromProps(props, type)
        : buildBinderFromProps(props, type),
  });
}

export function _updateBinder(binder) {
  ensureDispatch();
  if (!ensureKnownBinder(binder.id)) return;
  globalStore.dispatch({
    type: UPDATE_BINDER,
    binder,
  });
}

export function _removeBinder(binderId) {
  ensureDispatch();
  globalStore.dispatch({
    type: REMOVE_BINDER,
    binderId,
  });
}

export function _activeBinder(binderId, nextElId, dir) {
  ensureDispatch();
  if (!ensureKnownBinder(binderId)) return;
  globalStore.dispatch({
    type: ACTIVE_BINDER,
    binderId,
  });
  const state = globalStore.getState()[NAME];
  const toActivate = findBinder(state.binders, binderId);
  const selectedId = findIdByStrategy(state, binderId, nextElId);
  if (toActivate && toActivate.type === CAROUSEL_TYPE) {
    _resetCarousel(binderId, selectedId, dir);
  } else {
    _resetBinder(binderId, selectedId, dir);
  }
}

export function _resetCarousel(binderId, wishedId) {
  ensureDispatch();
  if (!ensureKnownBinder(binderId)) return;
  const originalState = findBinder(
    globalStore.getState()[NAME].binders,
    binderId
  );
  const { elements, selectedId } = originalState;
  if (elements.length === 0) return;
  const newSelectedId = wishedId || elements[0].id;
  const binder = {
    id: binderId,
    selectedId: newSelectedId,
    hasMoved: true,
    prevEl: elements.find(e => e.id === selectedId),
    nextEl: elements.find(e => e.id === newSelectedId),
    prevDir: null,
  };
  _updateBinder(binder);
}

export function _resetBinder(binderId, wishedId) {
  ensureDispatch();
  if (!ensureKnownBinder(binderId)) return;
  const originalState = findBinder(
    globalStore.getState()[NAME].binders,
    binderId
  );
  const { elements, selectedId } = originalState;
  if (elements.length === 0) return;
  const newSelectedId = wishedId || elements[0].id;
  const margin = boundsMargin(newSelectedId, originalState);
  const binder = {
    id: binderId,
    selectedId: newSelectedId,
    hasMoved: true,
    prevEl: elements.find(e => e.id === selectedId),
    nextEl: elements.find(e => e.id === newSelectedId),
    prevDir: null,
    marginLeft: margin.marginLeft,
    marginTop: margin.marginTop,
  };
  _updateBinder(binder);
}

export function updateBinderSelectedId(binderId, selectedId) {
  ensureDispatch();
  if (!ensureKnownBinder(binderId)) return;
  const margin = boundsMargin(
    selectedId,
    findBinder(globalStore.getState()[NAME].binders, binderId)
  );
  globalStore.dispatch({
    type: UPDATE_BINDER_SELECTED_KEY,
    binderId,
    selectedId,
    marginLeft: margin.marginLeft,
    marginTop: margin.marginTop,
  });
}

export function updatePosition(binderId, selectedId) {
  ensureDispatch();
  if (!ensureKnownBinder(binderId)) return;
  const margin = correctBoundsMargin(
    selectedId,
    findBinder(globalStore.getState()[NAME].binders, binderId)
  );
  globalStore.dispatch({
    type: UPDATE_BINDER_SELECTED_KEY,
    binderId,
    selectedId,
    marginLeft: margin.marginLeft,
    marginTop: margin.marginTop,
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

export function determineNewState(binderId, dir, cb, exitCb, _this) {
  ensureDispatch();
  if (!ensureKnownBinder(binderId)) return;
  const { nextEl, prevEl, prevDir, elements } = findBinder(
    globalStore.getState()[NAME].binders,
    binderId
  );
  if (!nextEl) return;
  const binder = calculateNewState(dir, nextEl, prevEl, prevDir, elements);
  _updateBinder({ ...binder, id: binderId });
  if (binder.hasMoved) {
    updateBinderSelectedId(binderId, binder.nextEl.id, dir);
    execCb(cb, nextEl, _this);
  } else {
    resetFlipFlop(binderId);
    enterTo(exitCb);
  }
}

export function resetFlipFlop(binderId) {
  ensureDispatch();
  if (!ensureKnownBinder(binderId)) return;
  const { enterStrategy } = findBinder(
    globalStore.getState()[NAME].binders,
    binderId
  );
  if (enterStrategy !== EXIT_STRATEGY_MEMORY) {
    _updateBinder({ id: binderId, prevDir: null });
  }
}
