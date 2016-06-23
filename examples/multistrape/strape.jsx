const {StrapeBinder, keysInit, keysReducer, activeKeyBinder} = ReactKeys;
const {createStore, combineReducers, applyMiddleware} = Redux;
const {connect, Provider} = ReactRedux;

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
}), applyMiddleware(logger));

keysInit({store: store});

const Card = ({id, active}) => {
  const style = active ? 'selected' : '';
  return (
    <li id={id} className={style}>#{id}</li>
  );
};

const PureStrape = ({selectedId, marginLeft, binderId, active, onDownExit, onUpExit}) => {
  const listStyle = {
    marginLeft: -marginLeft,
  };
  return (
    <StrapeBinder
      id={binderId}
      active={active}
      wrapper="#wrapper"
      strategy="progressive"
      gap={13}
      lastGap={13}
      onDownExit={onDownExit}
      onUpExit={onUpExit}>
      <div id="wrapper">
        <ul style={listStyle}>
          <Card id={binderId + '-1'} active={active && selectedId === binderId + '-1'}/>
          <Card id={binderId + '-2'} active={active && selectedId === binderId + '-2'}/>
          <Card id={binderId + '-3'} active={active && selectedId === binderId + '-3'}/>
          <Card id={binderId + '-4'} active={active && selectedId === binderId + '-4'}/>
          <Card id={binderId + '-5'} active={active && selectedId === binderId + '-5'}/>
          <Card id={binderId + '-6'} active={active && selectedId === binderId + '-6'}/>
          <Card id={binderId + '-7'} active={active && selectedId === binderId + '-7'}/>
          <Card id={binderId + '-8'} active={active && selectedId === binderId + '-8'}/>
          <Card id={binderId + '-9'} active={active && selectedId === binderId + '-9'}/>
        </ul>
      </div>
    </StrapeBinder>
  );
};

const Strape1 = connect(state => state['@@keys'].getBinder('strape-1'))(PureStrape);
const Strape2 = connect(state => state['@@keys'].getBinder('strape-2'))(PureStrape);

ReactDOM.render(<Provider store={store}>
  <div>
    <Strape1 binderId="strape-1" onDownExit="strape-2" active={true}/>
    <Strape2 binderId="strape-2" onUpExit="strape-1" active={false}/>
  </div>
</Provider>, document.getElementById('body'));
