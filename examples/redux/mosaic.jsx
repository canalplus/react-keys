const {KeyBinder, keysInit, keysReducer, changeAreaAction} = ReactKeys;
const {createStore, applyMiddleware, combineReducers} = Redux;

function selectedId(state = {selectedId: 1}, action) {
  switch (action.type) {
    case 'UPDATE_SELECT':
      return {...state, ...{selectedId: action.selectedId}};
    default:
      return state;
  }
}

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  console.info('next state', store.getState());
  console.groupEnd(action.type);
  return next(action);
};

let store = createStore(combineReducers({
  ID: selectedId,
  '@@keys': keysReducer,
}), applyMiddleware(logger));

keysInit({
  store: store,
});

store.subscribe(() => {
  ReactDOM.render(<Mosaic selectedId={store.getState().ID.selectedId}/>,
    document.getElementById('body'));
});

const Mosaic = ({selectedId}) => {
  return (
    <KeyBinder
      keys={{onRightKey, onLeftKey, onDownKey, onUpKey, onEnterKey}}>
      <ul>
        <li id="1" className={selectedId == 1 ? "selected" : ''}>#1</li>
        <li id="2" className={selectedId == 2 ? "selected" : ''}>#2</li>
        <li id="3" className={selectedId == 3 ? "selected" : ''}>#3</li>
        <li id="4" className={selectedId == 4 ? "selected" : ''}>#4</li>
        <li id="5" className={selectedId == 5 ? "selected" : ''}>#5</li>
        <li id="6" className={selectedId == 6 ? "selected" : ''}>#6</li>
        <li id="7" className={selectedId == 7 ? "selected" : ''}>#7</li>
        <li id="8" className={selectedId == 8 ? "selected" : ''}>#8</li>
        <li id="9" className={selectedId == 9 ? "selected" : ''}>#9</li>
        <li id="10" className={selectedId == 10 ? "selected" : ''}>#10</li>
        <li id="11" className={selectedId == 11 ? "selected" : ''}>#11</li>
        <li id="12" className={selectedId == 12 ? "selected" : ''}>#12</li>
      </ul>
    </KeyBinder>
  );
};

function onRightKey(element, prevElement) {
  if (element.id === prevElement.id) {
    changeAreaAction('CHANGE_AREA');
  } else {
    store.dispatch({type: 'UPDATE_SELECT', selectedId: element.id});
  }
}

function onLeftKey(element, prevElement) {
  if (element.id === prevElement.id) {
    changeAreaAction('CHANGE_AREA');
  } else {
    store.dispatch({type: 'UPDATE_SELECT', selectedId: element.id});
  }
}

function onDownKey(element, prevElement) {
  if (element.id === prevElement.id) {
    changeAreaAction('CHANGE_AREA');
  } else {
    store.dispatch({type: 'UPDATE_SELECT', selectedId: element.id});
  }
}

function onUpKey(element, prevElement) {
  if (element.id === prevElement.id) {
    changeAreaAction('CHANGE_AREA');
  } else {
    store.dispatch({type: 'UPDATE_SELECT', selectedId: element.id});
  }
}

function onEnterKey(element) {
  alert('ELEMENT #' + element.id);
}

ReactDOM.render(<Mosaic selectedId="1"/>, document.getElementById('body'));
