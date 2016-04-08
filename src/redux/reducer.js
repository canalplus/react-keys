import {CHANGE_FOCUSED_AREA} from './actions';

const initialKeysSate = {
  activeArea: null,
};

export const _keyReducer = function(state = initialKeysSate, action) {
  switch (action.type) {
    case CHANGE_FOCUSED_AREA:
      return {...state, ...{activeArea: action.area}};
    default:
      return state;
  }
};
