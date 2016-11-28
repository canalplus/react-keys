import { activateBinder } from './redux/actions';

export function execCb(func, nextEl, _this, context) {
  if (!func) return;
  func.call(_this, nextEl || {}, context);
}

export function enterTo(callback) {
  if (callback) {
    if (typeof callback === 'string') {
      activateBinder(callback);
    } else {
      callback();
    }
  }
}
