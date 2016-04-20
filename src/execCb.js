export const execCb = (func, nextEl, _this, props) => {
  if (!func) return;
  if (props && props.context) {
    func.call(_this, nextEl || {}, props.context);
  } else {
    func.call(_this, nextEl || {});
  }
};
