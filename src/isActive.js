import { NAME } from './constants';
import { globalStore } from './listener';

export function isActive({ id, active }) {
  const state = globalStore.getState();
  return state[NAME] && state[NAME][id]
    ? !!state[NAME][id].active && !!active
    : !!active;
}
