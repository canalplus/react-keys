import { NAME } from './constants';

export let globalStore = {
  dispatch: () => ({}),
  getState: () => {
    return { [NAME]: {} };
  },
};

export const updateStore = store => (globalStore = store);
export const getStore = () => globalStore.getState()[NAME];
export const dispatch = action => globalStore.dispatch(action);
export const getBinders = () => globalStore.getState()[NAME].binders;
export const getPress = () => globalStore.getState()[NAME]['PRESS'];
