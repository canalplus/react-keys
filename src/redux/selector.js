import { NAME } from '../constants';
import { getBinders, getStore, globalStore } from '../store';
import { ensureState } from '../ensure';
import { findBinder } from './helper';

export const _selector = id => () => {
  ensureState();
  const binder = findBinder(getBinders(), id);
  return binder || { marginLeft: 0, marginTop: 0 };
};

export const _isCurrentBinder = id => () => {
  ensureState();
  const currentBinderId =
    getStore()['current'] && getStore()['current'].binderId;
  return currentBinderId === id;
};

export const _getCurrentSelectedId = () => () => {
  ensureState();
  return getStore().current.selectedId;
};

export const _getBinders = () => () => {
  ensureState();
  return getBinders();
};

export const _getCurrentBinder = () => () => {
  ensureState();
  const { binders, current } = getStore();
  return findBinder(binders, current.binderId);
};

export const _getCurrentBinderId = () => () => {
  return getStore().current.binderId;
};

export const _getKeyCode = () => () => {
  ensureState();
  return getStore().PRESS.keyCode;
};

export const _isLongPress = () => () => {
  ensureState();
  return getStore().PRESS.press;
};

export const _getBinderSelectedId = id => () => {
  ensureState();
  const binder = findBinder(getBinders(), id);
  return binder ? binder.selectedId : '';
};

export const _getBinderMarginLeft = id => () => {
  ensureState();
  const binder = findBinder(getBinders(), id);
  return binder ? binder.marginLeft : 0;
};

export const _getBinderMarginTop = id => () => {
  ensureState();
  const binder = findBinder(getBinders(), id);
  return binder ? binder.marginTop : 0;
};

export const _getCarouselTargetIndexScrollPosition = id => () => {
  ensureState();
  const binder = findBinder(getBinders(), id);
  return binder && binder.targetIndexScrollPosition;
};

export const _isBinderActive = id => () => {
  ensureState();
  const binder = findBinder(getBinders(), id);
  return binder && binder.mounted;
};

export const _isVisibleInBinder = (binderId, elementId) => () => {
  ensureState();
  const binder = findBinder(getBinders(), binderId);
  if (!binder) return false;
  const element = binder.elements.find(el => el.id === elementId);
  if (!element) return false;
  return element.isVisible;
};
