import { findBinder } from '../../redux/helper';
import { globalStore } from '../../listener';
import { C_DOWN, C_LEFT, C_RIGHT, C_UP, NAME } from '../../constants';
import { block, isBlocked } from '../../clock';
import blocks from '../../blocks';
import { isActive } from '../../isActive';
import userConfig from '../../config';
import { determineNewState } from '../../redux/actions';
import { execCb } from '../../funcHandler';

export function keysHandler(keyCode, longPress, click) {
  const {
    id,
    onLeft,
    onLeftExit,
    onUp,
    onUpExit,
    onRight,
    onRightExit,
    onDown,
    onDownExit,
    onEnter,
    triggerClick,
  } = this.innerProps;

  if (!this.listenerId) {
    return;
  }

  const binder = findBinder(globalStore.getState()[NAME].binders, id);
  if (!binder) return;

  if (
    click &&
    triggerClick &&
    isActive(this.innerProps) &&
    !isBlocked() &&
    !blocks.isBlocked(this.innerProps.id)
  ) {
    document.getElementById(binder.nextEl.id).click();
    return;
  }
  if (
    !click &&
    isActive(this.innerProps) &&
    !isBlocked() &&
    !blocks.isBlocked(this.innerProps.id) &&
    (!longPress || (longPress && this.innerProps.longPress))
  ) {
    switch (keyCode) {
      case userConfig.left:
        performAction(this.innerProps, C_LEFT, onLeft, onLeftExit);
        break;
      case userConfig.up:
        performAction(this.innerProps, C_UP, onUp, onUpExit);
        break;
      case userConfig.right:
        performAction(this.innerProps, C_RIGHT, onRight, onRightExit);
        break;
      case userConfig.down:
        performAction(this.innerProps, C_DOWN, onDown, onDownExit);
        break;
      case userConfig.enter:
        if (onEnter) {
          block();
          execCb(onEnter, binder.nextEl, this);
        }
        break;
      default:
        break;
    }
  }
}

export const performAction = ({ id, debounce }, dir, cb, exitCb) => {
  block(debounce);
  determineNewState(id, dir, cb, exitCb, this);
};
