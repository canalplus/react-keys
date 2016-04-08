const {KeyBinder, keysInit} = ReactKeys;
const {createStore} = Redux;

keysInit();

function selectedId(state = {selectedId: 1, marginLeft: 0}, action) {
  switch (action.type) {
    case 'UPDATE_SELECT':
      return {...state, ...{selectedId: action.selectedId, marginLeft: action.marginLeft}};
    default:
      return state;
  }
}

const store = createStore(selectedId);

store.subscribe(() => {
  ReactDOM.render(<Strape selectedId={store.getState().selectedId}
                          marginLeft={store.getState().marginLeft}/>,
    document.getElementById('body'));
});

const Strape = ({selectedId, marginLeft}) => {
  const listStyle = {
    marginLeft: -marginLeft,
  };
  return (
    <KeyBinder
      mode="strape"
      wrapper="#wrapper"
      options={{
        strategy: 'cut',
      }}
      keys={{onRightKey, onLeftKey, onDownKey, onUpKey, onEnterKey}}>
      <div id="wrapper">
        <ul style={listStyle}>
          <li id="1" className={selectedId === '1' ? 'selected' : ''}>#1</li>
          <li id="2" className={selectedId === '2' ? 'selected' : ''}>#2</li>
          <li id="3" className={selectedId === '3' ? 'selected' : ''}>#3</li>
          <li id="4" className={selectedId === '4' ? 'selected' : ''}>#4</li>
          <li id="5" className={selectedId === '5' ? 'selected' : ''}>#5</li>
          <li id="6" className={selectedId === '6' ? 'selected' : ''}>#6</li>
          <li id="7" className={selectedId === '7' ? 'selected' : ''}>#7</li>
          <li id="8" className={selectedId === '8' ? 'selected' : ''}>#8</li>
          <li id="9" className={selectedId === '9' ? 'selected' : ''}>#9</li>
          <li id="10" className={selectedId === '10' ? 'selected' : ''}>#10</li>
          <li id="11" className={selectedId === '11' ? 'selected' : ''}>#11</li>
          <li id="12" className={selectedId === '12' ? 'selected' : ''}>#12</li>
        </ul>
      </div>
    </KeyBinder>
  );
};

function onRightKey(element) {
  store.dispatch({type: 'UPDATE_SELECT', selectedId: element.id, marginLeft: element.marginLeft});
}

function onLeftKey(element) {
  store.dispatch({type: 'UPDATE_SELECT', selectedId: element.id, marginLeft: element.marginLeft});
}

function onDownKey(element) {
  store.dispatch({type: 'UPDATE_SELECT', selectedId: element.id, marginLeft: element.marginLeft});
}

function onUpKey(element) {
  store.dispatch({type: 'UPDATE_SELECT', selectedId: element.id, marginLeft: element.marginLeft});
}

function onEnterKey(element) {
  alert('ELEMENT #' + element.id);
}

ReactDOM.render(<Strape selectedId="1" marginLeft="0"/>, document.getElementById('body'));
