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

const buildClassName = (id, selectedId) => {
  return id === selectedId ? 'selected' : '';
};

const PureStrape = ({selectedKeyId, marginLeft, binderId, activeBinder, onDownExit, onUpExit}) => {
  const listStyle = {
    marginLeft: activeBinder === binderId ? -marginLeft : 0,
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
              className={buildClassName(selectedKeyId, binderId + '-1')}>{binderId} #1
          </li>
          <li id={binderId + '-2'}
              className={buildClassName(selectedKeyId, binderId + '-2')}>{binderId} #2
          </li>
          <li id={binderId + '-3'}
              className={buildClassName(selectedKeyId, binderId + '-3')}>{binderId} #3
          </li>
          <li id={binderId + '-4'}
              className={buildClassName(selectedKeyId, binderId + '-4')}>{binderId} #4
          </li>
          <li id={binderId + '-5'}
              className={buildClassName(selectedKeyId, binderId + '-5')}>{binderId} #5
          </li>
          <li id={binderId + '-6'}
              className={buildClassName(selectedKeyId, binderId + '-6')}>{binderId} #6
          </li>
          <li id={binderId + '-7'}
              className={buildClassName(selectedKeyId, binderId + '-7')}>{binderId} #7
          </li>
          <li id={binderId + '-8'}
              className={buildClassName(selectedKeyId, binderId + '-8')}>{binderId} #8
          </li>
          <li id={binderId + '-9'}
              className={buildClassName(selectedKeyId, binderId + '-9')}>{binderId} #9
          </li>
          <li id={binderId + '-10'} className={buildClassName(selectedKeyId, binderId + '-10')}>
            {binderId} #10
          </li>
          <li id={binderId + '-11'} className={buildClassName(selectedKeyId, binderId + '-11')}>
            {binderId} #11
          </li>
          <li id={binderId + '-12'} className={buildClassName(selectedKeyId, binderId + '-12')}>
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

const Strape = connect(state => state['@@keys'])(PureStrape);

ReactDOM.render(<Provider store={store}>
  <div>
    <Strape binderId="strape-1" onDownExit={onDownExit}/>
    <Strape binderId="strape-2" onUpExit={onUpExit}/>
  </div>
</Provider>, document.getElementById('body'));

activeKeyBinder('strape-1');

