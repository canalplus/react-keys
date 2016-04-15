export const NAME = '@@keys';
export const ACTIVE_KEYBINDER = [NAME, '/ACTIVE_KEYBINDER'].join('');
export const ADD_KEYBINDER_TO_STORE = [NAME, '/ADD_KEYBINDER_TO_STORE'].join('');
export const UPDATE_SELECTED_KEY = [NAME, '/UPDATE_SELECTED_KEY'].join('');
import {globalStore} from '../listener';

export const _activeKeyBinder = binderId => {
  if (globalStore && globalStore.dispatch) {
    const keysState = globalStore.getState()[NAME].keysState;
    const keyBinder = keysState.find(state => state.id === binderId);
    globalStore.dispatch({
      type: ACTIVE_KEYBINDER,
      binderId: binderId,
      selectedKeyId: keyBinder.selectedId,
      marginLeft: keyBinder.marginLeft,
    });
  }
};

export const _addKeyBinderToStore = keyBinderState => {
  if (globalStore && globalStore.dispatch) {
    const keysState = globalStore.getState()[NAME].keysState;
    if (!keysState.some(state => state.id === keyBinderState.id)) {
      globalStore.dispatch({
        type: ADD_KEYBINDER_TO_STORE,
        state: keyBinderState,
      });
    }
  }
};

export const _updateSelectedId = (selectedKeyId, marginLeft) => {
  if (globalStore && globalStore.dispatch) {
    globalStore.dispatch({
      type: UPDATE_SELECTED_KEY,
      selectedKeyId: selectedKeyId,
      marginLeft: marginLeft,
    });
  }
}
