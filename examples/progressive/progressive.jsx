const {StrapeBinder, keysInit, keysReducer, activeKeyBinder} = ReactKeys;
const {createStore, combineReducers} = Redux;
const {connect, Provider} = ReactRedux;

const store = createStore(combineReducers({
  '@@keys': keysReducer,
}));

keysInit({store: store});

const Card = ({id, active}) => {
  const style = active ? 'selected' : '';
  return (
    <li id={id} className={style}>#{id}</li>
  );
};

const PureStrape = ({selectedId, marginLeft, active}) => {
  const listStyle = {
    marginLeft: -marginLeft,
  };
  return (
    <StrapeBinder
      id="strape-1"
      wrapper="#wrapper"
      strategy="progressive"
      gap={30}
      onEnter={onEnterKey}
      circular={true}>
      <div id="wrapper">
        <ul style={listStyle}>
          <Card id="1" active={active && selectedId === '1'}/>
          <Card id="2" active={active && selectedId === '2'}/>
          <Card id="3" active={active && selectedId === '3'}/>
          <Card id="4" active={active && selectedId === '4'}/>
          <Card id="5" active={active && selectedId === '5'}/>
          <Card id="6" active={active && selectedId === '6'}/>
          <Card id="7" active={active && selectedId === '7'}/>
          <Card id="8" active={active && selectedId === '8'}/>
          <Card id="9" active={active && selectedId === '9'}/>
        </ul>
      </div>
    </StrapeBinder>
  );
};

const Strape = connect(state => state['@@keys'].getBinder('strape-1'))(PureStrape);

function onEnterKey(element) {
  alert('ELEMENT #' + element.id);
}

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Strape />
    </div>
  </Provider>,
  document.getElementById('body'));

activeKeyBinder('strape-1');
