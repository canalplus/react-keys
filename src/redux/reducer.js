import {
  ACTIVE_BINDER,
  ADD_BINDER,
  MOUNT_BINDER,
  REMOVE_BINDER,
  UPDATE_BINDER,
  UPDATE_BINDER_SELECTED_KEY,
  UPDATE_PRESS_STATUS,
} from './actions';
import {
  computeAddingBinder,
  computeMountBinder,
  computeRemoveBinder,
  findBinder,
  mountBinder,
  updateBinder,
} from './helper';

const initialKeysSate = {
  binders: [],
  PRESS: {
    press: false,
  },
};

export function _keyReducer(state = initialKeysSate, action) {
  switch (action.type) {
    case ADD_BINDER:
      return {
        ...state,
        binders: computeAddingBinder(state.binders, action.binder),
      };
    case MOUNT_BINDER:
      const binder = findBinder(state.binders, action.binderId);
      return { ...state, binders: computeMountBinder(state.binders, binder) };
    case UPDATE_BINDER:
      return {
        ...state,
        binders: updateBinder(state.binders, action.binder),
      };
    case REMOVE_BINDER:
      return {
        ...state,
        binders: computeRemoveBinder(state.binders, action.binderId),
      };
    case ACTIVE_BINDER:
      return {
        ...state,
        binders: mountBinder(state.binders, action.binderId),
      };
    case UPDATE_BINDER_SELECTED_KEY:
      return {
        ...state,
        binders: updateBinder(state.binders, {
          id: action.binderId,
          selectedId: action.selectedId,
          marginLeft: action.marginLeft,
          marginTop: action.marginTop,
        }),
      };
    case UPDATE_PRESS_STATUS:
      return {
        ...state,
        PRESS: { press: action.press, keyCode: action.keyCode },
      };
    case 'RESET_STATE':
      return initialKeysSate;
    default:
      return state;
  }
}
