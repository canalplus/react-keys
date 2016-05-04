export function isActive(state, {id, active}) {
  let response = false;
  if (state) {
    response = state.getState()['@@keys'] && state.getState()['@@keys'][id]
      && state.getState()['@@keys'][id].active;
  } else {
    response = active;
  }
  return !!response;
}
