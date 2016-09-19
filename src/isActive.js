import { NAME } from './constants';

export function isActive(state, { id, active }) {
  let response = false;
  if (state.getState) {
    response = state.getState()[NAME] && state.getState()[NAME][id]
      && state.getState()[NAME][id].active;
  } else {
    response = active;
  }
  return !!response;
}
