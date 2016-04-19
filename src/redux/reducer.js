import {
  ACTIVE_KEYBINDER,
  ADD_KEYBINDER_TO_STORE,
  UPDATE_SELECTED_KEY,
} from './actions';

const initialKeysSate = {
  activeBinder: null,
  selectedKeyId: null,
  marginLeft: null,
  keysState: [],
};

function updateKeysState(state, action) {
  const binder = state.keysState.find(binderState => binderState.id === state.activeBinder);
  binder.selectedId = action.selectedKeyId;
  binder.marginLeft = action.marginLeft;
  return state.keysState.slice(0);
}

export const _keyReducer = function(state = initialKeysSate, action) {
  switch (action.type) {
    case ACTIVE_KEYBINDER:
      return {
        ...state, ...{
          activeBinder: action.binderId,
          selectedKeyId: action.selectedKeyId,
          marginLeft: action.marginLeft,
        },
      };
    case ADD_KEYBINDER_TO_STORE:
      return {...state, ...{keysState: state.keysState.concat([action.state])}};
    case UPDATE_SELECTED_KEY:
      return {
        ...state, ...{
          selectedKeyId: action.selectedKeyId,
          marginLeft: action.marginLeft,
          keysState: updateKeysState(state, action),
        },
      };
    default:
      return state;
  }
};
