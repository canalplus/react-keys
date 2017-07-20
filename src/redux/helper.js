import { NAME } from '../constants';

export const findBinder = (state, binderId) => {
  return state[NAME].standards.find(standard => standard.id === binderId);
};

export const addOrUpdateBinder = (standards, binderId, values) => {
  const index = standards.findIndex(standard => standard.id === binderId);
  if (index !== -1) {
    return Object.assign([], standards, { [index]: values });
  } else {
    return [...state[NAME].standards, values];
  }
};
