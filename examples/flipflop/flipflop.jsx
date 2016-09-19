const { Binder, keysInit, keysReducer, activeKeyBinder, keysSelector } = ReactKeys;
const { createStore, combineReducers, applyMiddleware } = Redux;
const { connect, Provider } = ReactRedux;

const logger = store => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.info('next state', store.getState());
  console.groupEnd(action.type);
  return result;
};

const store = createStore(combineReducers({
  '@@keys': keysReducer,
}), applyMiddleware(logger))

keysInit({ store: store });

const Card = ({ id, active }) => {
  const style = active ? 'selected' : '';
  return (
    <li id={id} className={style}>#{id}</li>
  );
};

const PureMosaic = ({ selectedId }) => {
  return (
    <Binder
      id="mosaic-1"
      active={true}
      onEnter={onEnterKey}>
      <ul>
        <Card id="1" active={selectedId === '1'}/>
        <Card id="2" active={selectedId === '2'}/>
        <Card id="3" active={selectedId === '3'}/>
        <Card id="4" active={selectedId === '4'}/>
        <Card id="5" active={selectedId === '5'}/>
        <Card id="6" active={selectedId === '6'}/>
        <Card id="7" active={selectedId === '7'}/>
        <Card id="8" active={selectedId === '8'}/>
        <Card id="9" active={selectedId === '9'}/>
      </ul>
    </Binder>
  );
};

function onEnterKey(element) {
  alert('ELEMENT #' + element.id);
}

const Mosaic = connect(()=> keysSelector('mosaic-1'))(PureMosaic);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Mosaic />
    </div>
  </Provider>
  , document.getElementById('body'));
