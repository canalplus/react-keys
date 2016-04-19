import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {connect, Provider} from 'react-redux';
import {StrapeBinder, keysInit, keysReducer, activeKeyBinder} from '../src';


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

const buildClassName = (id, selectedId, active) => {
  return id === selectedId && active ? 'selected' : '';
};

const PureStrape = ({selectedId, marginLeft, binderId, active, onDownExit, onUpExit}) => {
  const listStyle = {
    marginLeft: -marginLeft,
  };
  return (
    <StrapeBinder
      binderId={binderId}
      wrapper="#wrapper"
      strategy="progressive"
      gap={13}
      lastGap={13}
      onDownExit={onDownExit}
      onUpExit={onUpExit}
      circular={true}>
      <div id="wrapper">
        <ul style={listStyle}>
          <li id={binderId + '-1'}
              className={buildClassName(selectedId, binderId + '-1', active)}>{binderId} #1
          </li>
          <li id={binderId + '-2'}
              className={buildClassName(selectedId, binderId + '-2', active)}>{binderId} #2
          </li>
          <li id={binderId + '-3'}
              className={buildClassName(selectedId, binderId + '-3', active)}>{binderId} #3
          </li>
          <li id={binderId + '-4'}
              className={buildClassName(selectedId, binderId + '-4', active)}>{binderId} #4
          </li>
          <li id={binderId + '-5'}
              className={buildClassName(selectedId, binderId + '-5', active)}>{binderId} #5
          </li>
          <li id={binderId + '-6'}
              className={buildClassName(selectedId, binderId + '-6', active)}>{binderId} #6
          </li>
          <li id={binderId + '-7'}
              className={buildClassName(selectedId, binderId + '-7', active)}>{binderId} #7
          </li>
          <li id={binderId + '-8'}
              className={buildClassName(selectedId, binderId + '-8', active)}>{binderId} #8
          </li>
          <li id={binderId + '-9'}
              className={buildClassName(selectedId, binderId + '-9', active)}>{binderId} #9
          </li>
          <li id={binderId + '-10'}
              className={buildClassName(selectedId, binderId + '-10', active)}>
            {binderId} #10
          </li>
          <li id={binderId + '-11'}
              className={buildClassName(selectedId, binderId + '-11', active)}>
            {binderId} #11
          </li>
          <li id={binderId + '-12'}
              className={buildClassName(selectedId, binderId + '-12', active)}>
            {binderId} #12
          </li>
        </ul>
      </div>
    </StrapeBinder>
  );
};

function onDownExit() {
  activeKeyBinder('strape-2');
}

function onUpExit() {
  activeKeyBinder('strape-1');
}

function onEnter(element) {
  alert('ELEMENT #' + element.id);
}

const Strape1 = connect(state => state['@@keys'].getBinder('strape-1'))(PureStrape);
const Strape2 = connect(state => state['@@keys'].getBinder('strape-2'))(PureStrape);

ReactDOM.render(<Provider store={store}>
  <div>
    <Strape1 binderId="strape-1" onDownExit={onDownExit}/>
    <Strape2 binderId="strape-2" onUpExit={onUpExit}/>
  </div>
</Provider>, document.getElementById('body'));

activeKeyBinder('strape-1');

