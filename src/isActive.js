export const isActive = (state, {binderId, active}) => {
  let response = false;
  if (state) {
    response = state.getState()['@@keys'] && state.getState()['@@keys'][binderId]
      && state.getState()['@@keys'][binderId].active;
  } else {
    response = active;
  }
  return !!response;
};
