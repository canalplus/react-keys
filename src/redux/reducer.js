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
      return {...state, ...{selectedKeyId: action.selectedKeyId, marginLeft: action.marginLeft}};
    default:
      return state;
  }
};
