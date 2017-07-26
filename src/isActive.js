import { globalStore } from './listener';
import { NAME } from './constants';
import { findMountedId } from './redux/helper';

export function isActive({ id, active }) {
  if (!active) return false;
  return findMountedId(globalStore.getState()[NAME].binders) === id;
}
