import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {connect, Provider} from 'react-redux';
import {KeyBinder, keysInit, keysReducer, activeKeyBinder} from '../src';


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

const PureStrape = ({binderId, activeBinder, selectedKeyId, marginLeft, onDownExit, onUpExit}) => {
  const listStyle = {
    marginLeft: binderId === activeBinder && marginLeft ? -marginLeft : 0,
  };
  return (
    <KeyBinder
      binderId={binderId}
      mode="strape"
      onDownExit={onDownExit}
      onUpExit={onUpExit}
      options={{
        strategy: 'progressive',
      }}
      keys={{onEnterKey}}
      wrapper="#wrapper">
      <div id="wrapper">
        <ul style={listStyle}>
          <li id={binderId + '-1'} className={selectedKeyId === binderId + '-1' ? 'selected' : ''}>
            #1
          </li>
          <li id={binderId + '-2'} className={selectedKeyId === binderId + '-2' ? 'selected' : ''}>
            #2
          </li>
          <li id={binderId + '-3'} className={selectedKeyId === binderId + '-3' ? 'selected' : ''}>
            #3
          </li>
          <li id={binderId + '-4'} className={selectedKeyId === binderId + '-4' ? 'selected' : ''}>
            #4
          </li>
          <li id={binderId + '-5'} className={selectedKeyId === binderId + '-5' ? 'selected' : ''}>
            #5
          </li>
        </ul>
      </div>
    </KeyBinder>
  );
};

function onEnterKey(element) {
  alert('ELEMENT #' + element.id);
}

function onDownStrap1Exit() {
  activeKeyBinder('strape-2');
}

function onUpStrap2Exit() {
  activeKeyBinder('strape-1');
}

const Strap = connect(state => state['@@keys'])(PureStrape);

ReactDOM.render(<Provider store={store}>
  <div>
    <Strap binderId="strape-1" onDownExit={onDownStrap1Exit}/>
    <Strap binderId="strape-2" onUpExit={onUpStrap2Exit}/>
  </div>
</Provider>, document.getElementById('body'));

activeKeyBinder('strape-1');

