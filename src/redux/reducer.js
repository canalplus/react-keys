import {
  ACTIVE_BINDER,
  ADD_BINDER,
  MOUNT_BINDER,
  REMOVE_BINDER,
  RESET_STATE,
  UPDATE_BINDER,
  UPDATE_PRESS_STATUS,
} from './actions';
import {
  buildCurrent,
  computeAddingBinder,
  computeMountBinder,
  computeRemoveBinder,
  findBinder,
  mountBinder,
  updateBinder,
} from './helper';

export const initialKeysSate = {
  current: {
    binderId: null,
    selectedId: null,
  },
  binders: [],
  PRESS: {
    press: false,
  },
};

export function reducer(state = initialKeysSate, action) {
  switch (action.type) {
    case ADD_BINDER: {
      let binders = computeAddingBinder(state.binders, action.binder);
      let current = buildCurrent(binders, state.current);
      return { ...state, binders, current };
    }
    case MOUNT_BINDER: {
      let binder = findBinder(state.binders, action.binderId);
      binder.priority = action.priority;
      let binders = computeMountBinder(state.binders, binder);
      let current = buildCurrent(binders, state.current);
      return { ...state, binders, current };
    }
    case UPDATE_BINDER: {
      let binders = updateBinder(state.binders, action.binder);
      let current = buildCurrent(binders, state.current);
      return { ...state, binders, current };
    }
    case REMOVE_BINDER: {
      let binders = computeRemoveBinder(
        state.binders,
        action.binderId,
        action.force
      );
      let current = buildCurrent(binders, state.current);
      return { ...state, binders, current };
    }
    case ACTIVE_BINDER: {
      let binders = state.binders;
      const activeBinderIndex = binders.findIndex(
        b => b.id === action.binder.id
      );
      binders[activeBinderIndex] = {
        ...binders[activeBinderIndex],
        ...action.binder,
      };
      binders = mountBinder(binders, action.binder.id);
      let current = buildCurrent(binders, state.current);
      return { ...state, binders, current };
    }
    case UPDATE_PRESS_STATUS:
      return {
        ...state,
        PRESS: { press: action.press, keyCode: action.keyCode },
      };
    case RESET_STATE:
      return initialKeysSate;
    default:
      return state;
  }
}
