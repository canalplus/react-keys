import { NAME } from '../constants';

export const findBinder = (state, binderId) => {
  let binders;
  if (state[NAME]) {
    binders = state[NAME].standards;
  } else {
    binders = state.standards;
  }
  return binders.find(binder => binder.id === binderId);
};

export const addOrUpdateBinder = (state, binderId, values) => {
  const standards = [...state.standards];
  const index = standards.findIndex(s => s.id === binderId);
  if (index !== -1) {
    const standard = standards[index];
    standards.splice(index, 1, {
      ...standard,
      ...values,
    });
    return { standards };
  } else {
    standards.push(values);
    standards.sort((a, b) => {
      if (a.priority - b.priority === 0) {
        return 1;
      }
      return b.priority - a.priority
    });
    return { standards };
  }
}
