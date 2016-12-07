import {
  ACTIVATE_BINDER,
  ADD_BINDER_TO_STORE,
  UPDATE_BINDER_STATE,
  UPDATE_PRESS_STATUS,
  UPDATE_BINDER_SELECTED_KEY,
  UPDATE_CURRENT,
  RESET_BINDER,
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
    case ADD_BINDER_TO_STORE:
      return { ...state, ...action.inactiveBinders, ...action.newBinder };
    case ACTIVATE_BINDER:
      return {
        ...state,
        ...action.inactiveBinders,
        [action.binderId]: {
          ...state[action.binderId],
          selectedId: action.selectedId,
          nextEl: state[action.binderId].elements.find(e => e.id === action.selectedId),
          active: true,
        },
        current: {
          ...state['current'],
          binderId: action.binderId,
          selectedId: action.selectedId,
        },
      };
    case UPDATE_BINDER_STATE:
      return {
        ...state,
        [action.binderId]: {
          ...state[action.binderId], ...action.binderState,
        },
      };
    case RESET_BINDER:
      return {
        ...state,
        [action.binderId]: {
          ...state[action.binderId],
          selectedId: action.selectedId,
          nextEl: state[action.binderId].elements.find(e => e.id === action.selectedId),
        },
      };
    case UPDATE_BINDER_SELECTED_KEY:
      return {
        ...state,
        [action.binderId]: {
          ...state[action.binderId],
          selectedId: action.selectedId,
          marginLeft: action.marginLeft,
          marginTop: action.marginTop,
        },
        current: {
          ...state['current'],
          binderId: action.binderId,
          selectedId: action.selectedId,
        },
      };
    case UPDATE_CURRENT:
      return {
        ...state,
        current: {
          ...state['current'],
          binderId: action.binderId,
          selectedId: action.selectedId
        }
      };
    case UPDATE_PRESS_STATUS:
      return { ...state, 'PRESS': { press: action.press, keyCode: action.keyCode } };
    case 'RESET_STATE':
      return initialKeysSate;
    default:
      return state;
  }
}
