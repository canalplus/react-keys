const {StrapeBinder, keysInit, keysReducer, activeKeyBinder} = ReactKeys;
const {createStore, combineReducers} = Redux;
const {connect, Provider} = ReactRedux;

const store = createStore(combineReducers({
  '@@keys': keysReducer,
}));

keysInit({store: store});

const PureStrape = ({selectedKeyId, marginLeft}) => {
  const listStyle = {
    marginLeft: -marginLeft,
  };
  return (
    <StrapeBinder
      binderId="strape-1"
      wrapper="#wrapper"
      strategy="progressive"
      gap={30}
      onEnter={onEnterKey}
      circular={true}>
      <div id="wrapper">
        <ul style={listStyle}>
          <li id="1" className={selectedKeyId === '1' ? 'selected' : ''}>#1</li>
          <li id="2" className={selectedKeyId === '2' ? 'selected' : ''}>#2</li>
          <li id="3" className={selectedKeyId === '3' ? 'selected' : ''}>#3</li>
          <li id="4" className={selectedKeyId === '4' ? 'selected' : ''}>#4</li>
          <li id="5" className={selectedKeyId === '5' ? 'selected' : ''}>#5</li>
          <li id="6" className={selectedKeyId === '6' ? 'selected' : ''}>#6</li>
          <li id="7" className={selectedKeyId === '7' ? 'selected' : ''}>#7</li>
          <li id="8" className={selectedKeyId === '8' ? 'selected' : ''}>#8</li>
          <li id="9" className={selectedKeyId === '9' ? 'selected' : ''}>#9</li>
          <li id="10" className={selectedKeyId === '10' ? 'selected' : ''}>#10</li>
          <li id="11" className={selectedKeyId === '11' ? 'selected' : ''}>#11</li>
          <li id="12" className={selectedKeyId === '12' ? 'selected' : ''}>#12</li>
        </ul>
      </div>
    </StrapeBinder>
  );
};

const Strape = connect(state => state['@@keys'])(PureStrape);

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
