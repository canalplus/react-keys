export const keysActions = [];

export function _register(event, callback) {
  keysActions.push({
    event: event,
    callback: callback,
  });
}

export function trigger(event, context) {
  for (const action of keysActions) {
    if (action.event === event) {
      action.callback(context);
    }
  }
}
