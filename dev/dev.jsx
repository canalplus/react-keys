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

const PureMosaic = ({strape1, strape2}) => {
  const selectedId1 = strape1.selectedId;
  const marginLeft1 = strape1.marginLeft;
  const active1 = strape1.active;
  const ulStyle1 = {
    marginLeft: -marginLeft1,
  };
  const selectedId2 = strape2.selectedId;
  const marginLeft2 = strape2.marginLeft;
  const active2 = strape2.active;
  const ulStyle2 = {
    marginLeft: -marginLeft2,
  };
  return (
    <div>
      <StrapeBinder
        id="strape-1"
        wrapper="#wrapper"
        strategy="bounds"
        exitStrategy="start"
        onDownExit="strape-2"
        gap={30}
        lastGap={10}
        onEnter={onEnter}>
        <div id="wrapper">
          <ul style={ulStyle1}>
            <li id="a1" className={selectedId1 === 'a1' & active1 ? 'selected' : ''}>#1</li>
            <li id="a2" className={selectedId1 === 'a2' & active1 ? 'selected' : ''}>#2</li>
            <li id="a3" className={selectedId1 === 'a3' & active1 ? 'selected' : ''}>#3</li>
            <li id="e4" className={selectedId1 === 'e4' & active1 ? 'selected' : ''}>#4</li>
            <li id="d5" className={selectedId1 === 'd5' & active1 ? 'selected' : ''}>#5</li>
            <li id="f6" className={selectedId1 === 'f6' & active1 ? 'selected' : ''}>#6</li>
            <li id="g7" className={selectedId1 === 'g7' & active1 ? 'selected' : ''}>#7</li>
            <li id="h8" className={selectedId1 === 'h8' & active1 ? 'selected' : ''}>#8</li>
            <li id="j9" className={selectedId1 === 'j9' & active1 ? 'selected' : ''}>#9</li>
            <li id="j10" className={selectedId1 === 'j10' & active1 ? 'selected' : ''}>#10</li>
            <li id="j11" className={selectedId1 === 'j11' & active1 ? 'selected' : ''}>#11</li>
          </ul>
        </div>
      </StrapeBinder>
      <StrapeBinder
        id="strape-2"
        wrapper="#wrapper2"
        onUpExit="strape-1"
        strategy="bounds"
        exitStrategy="start"
        gap={30}
        lastGap={10}
        onEnter={onEnter}>
        <div id="wrapper2">
          <ul style={ulStyle2}>
            <li id="a1c" className={selectedId2 === 'a1c' & active2 ? 'selected' : ''}>#1</li>
            <li id="a2c" className={selectedId2 === 'a2c' & active2 ? 'selected' : ''}>#2</li>
            <li id="a3c" className={selectedId2 === 'a3c' & active2 ? 'selected' : ''}>#3</li>
            <li id="e4c" className={selectedId2 === 'e4c' & active2 ? 'selected' : ''}>#4</li>
            <li id="d5c" className={selectedId2 === 'd5c' & active2 ? 'selected' : ''}>#5</li>
            <li id="f6c" className={selectedId2 === 'f6c' & active2 ? 'selected' : ''}>#6</li>
            <li id="g7c" className={selectedId2 === 'g7c' & active2 ? 'selected' : ''}>#7</li>
            <li id="h8c" className={selectedId2 === 'h8c' & active2 ? 'selected' : ''}>#8</li>
            <li id="j9c" className={selectedId2 === 'j9c' & active2 ? 'selected' : ''}>#9</li>
            <li id="j10c" className={selectedId2 === 'j10c' & active2 ? 'selected' : ''}>#10</li>
            <li id="j11c" className={selectedId2 === 'j11c' & active2 ? 'selected' : ''}>#11</li>
          </ul>
        </div>
      </StrapeBinder>
    </div>
  );
};

function onEnter(element) {
  alert('ELEMENT #' + element.id);
}

const Mosaic = connect(state => {
  return {
    strape1: state['@@keys'].getBinder('strape-1'),
    strape2: state['@@keys'].getBinder('strape-2'),
  };
})(PureMosaic);

ReactDOM.render(<Provider store={store}>
  <div>
    <Mosaic/>
  </div>
</Provider>, document.getElementById('body'));

activeKeyBinder('strape-1');

