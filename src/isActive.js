import { getBinders } from './store';
import { findMountedId } from './redux/helper';

export function isActive({ id, active }) {
  if (!active) return false;
  return findMountedId(getBinders()) === id;
}
