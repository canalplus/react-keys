import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import { Binder, StrapeBinder, keysInit, keysReducer, activeKeyBinder, keysSelector } from '../src';

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

const PureMosaic = ({ binder1 }) => {
  const { selectedId } = binder1;
  return (
    <Binder id="binder1" active={true} filter="disabled" selector="td">
      <table colSpan="2">
        <tbody>
        <tr>
          <td id="15" className={selectedId === '15' ? 'selected' : ''}>15</td>
          <td id="16" className={selectedId === '16' ? 'selected' : ''}>16</td>
          <td id="17" className={selectedId === '17' ? 'selected' : ''}>17</td>
          <td id="18" className={selectedId === '18' ? 'selected' : ''}>18</td>
        </tr>

        <tr>
          <td id="1" rowSpan="2" className={selectedId === '1' ? 'selected' : ''}>1</td>
          <td id="2" className={selectedId === '2' ? 'selected' : ''}>2</td>
          <td id="5" className={selectedId === '5' ? 'selected' : ''}>5</td>
          <td id="6" rowSpan="2" className={selectedId === '6' ? 'selected' : ''}>6</td>
        </tr>
        <tr>
          <td id="3" className={selectedId === '3' ? 'selected' : ''}>3</td>
          <td id="4" className={selectedId === '4' ? 'selected' : ''}>4</td>
        </tr>
        <tr>
          <td id="7" className={selectedId === '7' ? 'selected' : ''}>7</td>
          <td id="8" className={selectedId === '8' ? 'selected' : ''}>8</td>
          <td id="9" className={selectedId === '9' ? 'selected' : ''}>9</td>
          <td id="10" className={selectedId === '10' ? 'selected' : 'disabled'}>10</td>
        </tr>
        <tr>
          <td id="11" className={selectedId === '11' ? 'selected' : ''}>11</td>
          <td id="12" className={selectedId === '12' ? 'selected' : ''}>12</td>
          <td id="13" className={selectedId === '13' ? 'selected' : ''}>13</td>
          <td id="14" className={selectedId === '14' ? 'selected' : ''}>14</td>
        </tr>
        <tr>
          <td></td>
          <td id="20" className={selectedId === '20' ? 'selected' : ''}>20</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td id="19" colSpan="4" className={selectedId === '19' ? 'selected' : ''}>19</td>
        </tr>
        </tbody>
      </table>
    </Binder>
  );
};

const Mosaic = connect(() => {
  return {
    binder1: keysSelector('binder1')(),
  };
})(PureMosaic);

ReactDOM.render(<Provider store={store}>
  <Mosaic/>
</Provider>, document.getElementById('body'));

activeKeyBinder('strape-1');

