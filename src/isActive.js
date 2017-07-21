import { globalStore } from './listener';
import { findBinder } from './redux/helper';
import { NAME } from './constants';

export function isActive({ id, active }) {
  const state = globalStore.getState();
  const binder = findBinder(state, id);
  const firstBinder = state[NAME].standards[0];
  if (binder && firstBinder && firstBinder.id !== id){
    return false;
  } else if (binder){
    return !!binder.active;
  }
  return !!active;
}
