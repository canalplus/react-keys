import { NAME } from '../constants';

export const findBinder = (state, binderId) => {
  return state[NAME].standards.find(standard => standard.id === binderId);
};

export const addOrUpdateBinder = (standards, binderId, values) => {
  const index = standards.findIndex(standard => standard.id === binderId);
  if (index !== -1) {
    const _standards = [...standards]
    const standard = _standards[index];
    _standards.splice(index, 1, {
      ...standard,
      ...values,
    });
    return _standards;
  } else {
    standards.push(values);
    return standards;
  }
};
