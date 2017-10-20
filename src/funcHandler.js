import { _activeBinder } from './redux/actions';

export function execCb(func, nextEl, _this) {
  if (!func) return;
  func.call(_this, nextEl || {});
}

export function enterTo(callback, selectedId) {
  if (callback) {
    if (typeof callback === 'string') {
      _activeBinder(callback);
    } else {
      callback(selectedId);
    }
  }
}
