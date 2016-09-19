import {
  ACTIVE_KEYBINDER,
  ADD_KEYBINDER_TO_STORE,
  UPDATE_SELECTED_KEY,
  UPDATE_BINDER_STATE,
  UPDATE_PRESS_STATUS,
} from './actions';

const initialKeysSate = {
  current: {
    selectedId: null,
    binderId: null,
  },
  'PRESS': {
    press: false,
  }
};

export function _keyReducer(state = initialKeysSate, action) {
  switch (action.type) {
    case ACTIVE_KEYBINDER:
    case ADD_KEYBINDER_TO_STORE:
    case UPDATE_BINDER_STATE:
    case UPDATE_SELECTED_KEY:
      return { ...state, ...action.state };
    case UPDATE_PRESS_STATUS:
      return { ...state, ...{ 'PRESS': { press: action.press, keyCode: action.keyCode } } };
    default:
      return state;
  }
}
