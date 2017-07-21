import { NAME } from './constants';
import { globalStore } from './listener';
import { findBinder } from './redux/helper';

export function isActive({ id, active }) {
  const state = globalStore.getState();
  const binder = findBinder(state, id);
  if (binder) {
    if (binder.isPriority){
      return !!binder.active;
    } else if (state[NAME].priority.length > 0) {
      return false;
    }
    return !!binder.active;
  }
  return !!active;
}
