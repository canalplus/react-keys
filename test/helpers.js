export const keyDown = keyCode => {
  const evt = document.createEvent("KeyboardEvent");
  evt.initKeyboardEvent("keydown", true, false, document, '', 0, false, false, false);
  document.dispatchEvent(Object.defineProperties(evt, {
    keyCode: {
      get: function() {
        return keyCode
      }
    },
  }))
};

export const keyUp = keyCode => {
  const evt = document.createEvent("KeyboardEvent");
  evt.initKeyboardEvent("keyup", true, false, document, '', 0, false, false, false);
  document.dispatchEvent(Object.defineProperties(evt, {
    keyCode: {
      get: function() {
        return keyCode
      }
    },
  }))
};