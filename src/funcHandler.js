import {enter} from './redux/actions';

export function execCb(func, nextEl, _this, props) {
  if (!func) return;
  if (props && props.context) {
    func.call(_this, nextEl || {}, props.context);
  } else {
    func.call(_this, nextEl || {});
  }
}

export function enterTo(callback, nextId) {
  if (callback) {
    if (typeof callback === 'string') {
      enter(callback, nextId);
    } else {
      callback();
    }
  }
}
