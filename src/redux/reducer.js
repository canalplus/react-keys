import {
  ACTIVE_KEYBINDER,
  ADD_KEYBINDER_TO_STORE,
  UPDATE_SELECTED_KEY,
} from './actions';

const initialKeysSate = {
  getBinder: function(binderId) {
    return this[binderId] || {marginLeft: 0};
  },
};

export const _keyReducer = function(state = initialKeysSate, action) {
  switch (action.type) {
    case ACTIVE_KEYBINDER:
    case ADD_KEYBINDER_TO_STORE:
    case UPDATE_SELECTED_KEY:
      return {...state, ...action.state};
    default:
      return state;
  }
};
