import {
  ACTIVE_KEYBINDER,
  ADD_KEYBINDER_TO_STORE,
  UPDATE_SELECTED_KEY,
  UPDATE_BINDER_STATE,
} from './actions';

const initialKeysSate = {
  current: {
    selectedId: null,
    binderId: null,
  },
  getBinder: function(binderId) {
    return this[binderId] || { marginLeft: 0, marginTop: 0 };
  },
};

export function _keyReducer(state = initialKeysSate, action) {
  switch (action.type) {
    case ACTIVE_KEYBINDER:
    case ADD_KEYBINDER_TO_STORE:
    case UPDATE_BINDER_STATE:
    case UPDATE_SELECTED_KEY:
      return { ...state, ...action.state };
    default:
      return state;
  }
}
