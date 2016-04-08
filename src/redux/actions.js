export const NAME = '@@keys';
export const CHANGE_FOCUSED_AREA = [NAME, '/CHANGE_FOCUSED_AREA'].join('');
import {keyStore} from '../listener';

export const _changeAreaAction = (area) => {
  if (keyStore && keyStore.dispatch) {
    keyStore.dispatch({
      type: CHANGE_FOCUSED_AREA,
      area: area,
    });
  }
};
