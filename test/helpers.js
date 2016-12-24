export const keyDown = keyCode => dispatchAction('keydown', keyCode);
export const keyUp = keyCode => dispatchAction('keyup', keyCode);

export const dispatchAction = (action, keyCode) => {
  const evt = document.createEvent('KeyboardEvent');
  evt.initKeyboardEvent(action, true, false, document, '', 0, false, false, false);
  document.dispatchEvent(Object.defineProperty(evt, 'keyCode', { get: () => keyCode }));
};
