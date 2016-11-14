import { NAME } from './constants';
import { globalStore } from './listener';

export function isActive({ id, active }) {
  const state = globalStore.getState();
  if ((state[NAME] && state[NAME][id])) {
    return !!state[NAME][id].active;
  }
  return !!active
}
