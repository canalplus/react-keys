import {exitBinder} from './redux/actions';

export function execCb(func, nextEl, _this, props) {
  if (!func) return;
  if (props && props.context) {
    func.call(_this, nextEl || {}, props.context);
  } else {
    func.call(_this, nextEl || {});
  }
}

export function exitTo(strategy, callback, nextId) {
  if (callback) {
    if (typeof callback === 'string') {
      exitBinder(strategy, callback, nextId);
    } else {
      callback();
    }
  }
}
