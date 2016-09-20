const { Binder, keysInit, keysReducer, activeKeyBinder, keysSelector } = ReactKeys;
const { createStore, combineReducers } = Redux;
const { connect, Provider } = ReactRedux;

const store = createStore(combineReducers({
  '@@keys': keysReducer,
}));

keysInit({ store: store });

const PureMosaic = ({ selectedId }) => {
  return (
    <Binder
      id="mosaic-1"
      active={true}
      onEnter={onEnter}
    >
      <ul>
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
    </Binder>
  );
};

function onEnter(element) {
  alert('ELEMENT #' + element.id);
}

const Mosaic = connect(() => keysSelector('mosaic-1')())(PureMosaic);

ReactDOM.render(<Provider store={store}>
  <Mosaic/>
</Provider>, document.getElementById('body'));
