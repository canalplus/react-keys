import { NAME } from '../constants';

export const findBinder = (state, binderId) => {
  let binders;
  if (state[NAME]) {
    binders = state[NAME].priority.concat(state[NAME].standards);
  } else {
    binders = state.priority.concat(state.standards);
  }
  return binders.find(binder => binder.id === binderId);
};

export const addOrUpdateBinder = (state, binderId, values) => {
  const priority = [...state.priority];
  const standards = [...state.standards];
  const indexP = priority.findIndex(prio => prio.id === binderId);
  const indexS = standards.findIndex(s => s.id === binderId);
  if (indexP !== -1) {
    const prio = priority[indexP];
    priority.splice(indexP, 1, {
      ...prio,
      ...values,
    });
    return { priority };
  } else if (indexS !== -1){
    const standard = standards[indexS];
    standards.splice(indexS, 1, {
      ...standard,
      ...values,
    });
    return { standards }
  } else if (values.isPriority) {
    priority.push(values);
    return { priority };
  } else {
    standards.push(values);
    return { standards };
  }
};
