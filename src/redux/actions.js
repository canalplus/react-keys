import { dispatch, getBinders, getPress, getStore } from '../store';
import { findIdByStrategy } from '../engines/strategy';
import { boundsMargin } from '../engines/bounds';
import { calculateNewState } from '../engines/helpers';
import { CAROUSEL_TYPE, NAME } from '../constants';
import { ensureKnownBinder, isUnknownBinder } from '../ensure';
import {
  buildBinderFromProps,
  buildCarsouelFromProps,
  computeResetBinder,
  findBinder,
} from './helper';

export const ADD_BINDER = `${NAME}/ADD_BINDER`;
export const MOUNT_BINDER = `${NAME}/MOUNT_BINDER`;
export const UPDATE_BINDER = `${NAME}/UPDATE_BINDER`;
export const REMOVE_BINDER = `${NAME}/REMOVE_BINDER`;
export const ACTIVE_BINDER = `${NAME}/ACTIVE_BINDER`;

export const UPDATE_PRESS_STATUS = `${NAME}/UPDATE_PRESS_STATUS`;

export function addBinder(props, type) {
  if (!isUnknownBinder(props.id)) {
    dispatch({
      type: MOUNT_BINDER,
      binderId: props.id,
      priority: props.priority,
    });
    return;
  }
  dispatch({
    type: ADD_BINDER,
    binder:
      type === CAROUSEL_TYPE
        ? buildCarsouelFromProps(props, type)
        : buildBinderFromProps(props, type),
  });
}

export function _updateBinder(binder) {
  if (!ensureKnownBinder(binder.id)) return;
  dispatch({
    type: UPDATE_BINDER,
    binder,
  });
}

export function _removeBinder(binderId, force = false) {
  dispatch({
    type: REMOVE_BINDER,
    binderId,
    force,
  });
}

export function _activeBinder(binderId, nextElId, dir) {
  if (!ensureKnownBinder(binderId)) return;
  const selectedId = findIdByStrategy(getStore(), binderId, nextElId);
  const originalState = findBinder(getBinders(), binderId);
  const binder = computeResetBinder(originalState, binderId, selectedId);
  dispatch({
    type: ACTIVE_BINDER,
    binder,
  });
  const toActivate = findBinder(getBinders(), binderId);
  if (toActivate && toActivate.type === CAROUSEL_TYPE) {
    _resetCarousel(binderId, selectedId, dir);
  }
}

export function _resetCarousel(binderId, wishedId) {
  if (!ensureKnownBinder(binderId)) return;
  const originalState = findBinder(getBinders(), binderId);
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
  if (!ensureKnownBinder(binderId)) return;
  const originalState = findBinder(getBinders(), binderId);
  const binder = computeResetBinder(originalState, binderId, wishedId);
  if (!binder) return;
  _updateBinder(binder);
}

export function updatePressStatus(press, keyCode = null) {
  if (getPress().press !== press) {
    dispatch({
      type: UPDATE_PRESS_STATUS,
      press,
      keyCode,
    });
  }
}

export function execCb(func, nextEl, _this) {
  if (!func) return;
  func.call(_this, nextEl || {});
}

export function enterTo(callback, selectedId) {
  if (callback) {
    if (typeof callback === 'string') {
      _activeBinder(callback);
    } else {
      callback(selectedId);
    }
  }
}

export function determineNewState(binderId, props, dir, cb, exitCb, _this) {
  if (!ensureKnownBinder(binderId)) return;
  const { nextEl, prevEl, prevDir, elements } = findBinder(
    getBinders(),
    binderId
  );
  if (!nextEl) return;
  const binder = calculateNewState(dir, nextEl, prevEl, prevDir, elements);
  if (binder.hasMoved) {
    const bounds = boundsMargin(
      binder.nextEl.id,
      findBinder(getBinders(), binderId),
      props
    );

    _updateBinder({
      ...binder,
      id: binderId,
      selectedId: binder.nextEl.id,
      elements: bounds.elements,
      marginLeft: bounds.marginLeft,
      marginTop: bounds.marginTop,
    });
    execCb(cb, nextEl, _this);
  } else {
    resetFlipFlop(binderId);
    enterTo(exitCb);
  }
}

export function resetFlipFlop(binderId) {
  if (!ensureKnownBinder(binderId)) return;
  const { memory, prevDir } = findBinder(getBinders(), binderId);
  if (!memory && prevDir) {
    _updateBinder({ id: binderId, prevDir: null });
  }
}
