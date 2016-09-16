const { StrapeBinder, keysInit, keysReducer } = ReactKeys;
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
}), applyMiddleware(logger));

keysInit({ store: store });

const Card = ({ id, active }) => {
  const style = active ? 'selected' : '';
  return (
    <li id={id} className={style}>#{id}</li>
  );
};

Card.propTypes = {
  id: React.PropTypes.number,
  active: React.PropTypes.bool
}

const PureStrape = ({ selectedId, marginTop, binderId, active, onRightExit, onLeftExit }) => {

  const listStyle = {
    marginTop: -marginTop,
  };
  return (
    <div style={{ display: 'inline-block', marginRight: '10px' }}>
      <StrapeBinder
        id={binderId}
        active={active}
        enterStrategy="start"
        strategy="bounds"
        wrapper="#wrapper"
        position='vertical'
        gap={230}
        firstGap={100}
        lastGap={10}
        onLeftExit={onLeftExit}
        onRightExit={onRightExit}>
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
            <Card id={binderId + '-10'} active={active && selectedId === binderId + '-10'}/>
            <Card id={binderId + '-11'} active={active && selectedId === binderId + '-11'}/>
            <Card id={binderId + '-12'} active={active && selectedId === binderId + '-12'}/>
            <Card id={binderId + '-13'} active={active && selectedId === binderId + '-13'}/>
            <Card id={binderId + '-14'} active={active && selectedId === binderId + '-14'}/>
            <Card id={binderId + '-15'} active={active && selectedId === binderId + '-15'}/>
          </ul>
        </div>
      </StrapeBinder>
    </div>
  );
};


PureStrape.propTypes = {
  selectedId: React.PropTypes.number,
  marginTop: React.PropTypes.number,
  binderId: React.PropTypes.object,
  active: React.PropTypes.bool,
  onRightExit: React.PropTypes.func,
  onLeftExit: React.PropTypes.func
}

const Strape1 = connect(state => state['@@keys'].getBinder('strape-1'))(PureStrape);
const Strape2 = connect(state => state['@@keys'].getBinder('strape-2'))(PureStrape);


ReactDOM.render(<Provider store={store}>
  <div>
    <Strape1 binderId="strape-1" onRightExit="strape-2" active={true}/>
    <Strape2 binderId="strape-2" onLeftExit="strape-1" active={false}/>
  </div>
</Provider>, document.getElementById('body'));