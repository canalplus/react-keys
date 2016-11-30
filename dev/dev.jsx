import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connect, Provider } from 'react-redux';
import {
  Binder,
  keysInit,
  keysReducer,
  activeKeyBinder,
  keysSelector,
  Keys,
  Carousel
} from '../src';

function reducer(state = { active: false }, action) {
  switch (action.type) {
    case 'LOOL':
      return { ...state, active: true };
    default:
      return state;
  }
}

setTimeout(() => store.dispatch({ type: 'LOOL' }), 2000);

const store = createStore(combineReducers({
  '@@keys': keysReducer,
  'LOL': reducer,
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

keysInit({ store: store });

function clickHandler() {
  activeKeyBinder('binder1', '4');
}

const Card = ({ id, active }) => {
  const style = active ? 'selected' : '';
  return (
    <li id={id} className={style}>#{id}</li>
  );
};

const PureStrape = ({ selectedId, marginLeft, binderId, active, onDownExit, onUpExit }) => {
  const listStyle = {
    marginLeft: -marginLeft,
  };
  return (
    <Binder
      id={binderId}
      active={active}
      wrapper="#wrapper"
      selector="li"
      strategy="progressive"
      enterStrategy="mirror"
      gap={100}
      boundedGap={10}
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
    </Binder>
  );
};

const Strape1 = connect(() => keysSelector('strape-1')())(PureStrape);
const Strape2 = connect(() => keysSelector('strape-2')())(PureStrape);

const PureMosaic = ({ binder1, binder2, lool }) => {
  const { selectedId, active, marginTop, marginLeft } = binder1;
  const selectedId2 = binder2.selectedId;
  const active2 = binder2.active;
  return (
    <div>
      <Carousel
        id="rk-carousel"
        className="carousel-wrapper"
        childrenClassName="carousel-children"
        circular={false}
        index={4}
        elWidth={280}>
        <span id="c1">
          <img
            src="http://image.canal-plus.com/media_cpa/img/movie/default/280_157/jpg/ANT_1163084_1_280_157.jpg"/>
        </span>
        <span id="c2">
          <img
            src="http://image.canal-plus.com/media_cpa/img/movie/default/280_157/jpg/ANT_1168811_1_280_157.jpg"/>
        </span>
        <span id="c3">
          <img
            src="http://image.canal-plus.com/media_cpa/img/movie/default/280_157/jpg/ANT_1158341_1_280_157.jpg"/>
        </span>
        <span id="c4">
          <img
            src="http://image.canal-plus.com/media_cpa/img/movie/default/280_157/jpg/ANT_1166105_1_280_157.jpg"/>
        </span>
        <span id="c5">
          <img
            src="http://image.canal-plus.com/media_cpa/img/movie/default/280_157/jpg/ANT_1168594_1_280_157.jpg"/>
        </span>
        <span id="c6">
          <img
            src="http://image.canal-plus.com/media_cpa/img/movie/default/280_157/jpg/ANT_1169173_1_280_157.jpg"/>
        </span>
        <span id="c7">
          <img
            src="http://image.canal-plus.com/media_cpa/img/movie/default/280_157/jpg/ANT_1163388_1_280_157.jpg"/>
        </span>
      </Carousel>
      <Keys id="rk2" on65={(keyCode) => console.log('OK', keyCode)}/>
      <Keys id="rk" onEnter={() => console.log('ENTER')}/>
      <Binder id="binder1"
              filter="disabled"
              wrapper="#myWrapper"
              selector="td"
              onDownExit="strape-1"
              enterStrategy="memory">
        <div id="myWrapper" style={{
          width: '200px',
          height: '200px',
          overflow: 'hidden'
        }}>
          <table colSpan="2"
                 style={{
                   width: '300px',
                   marginTop: `-${marginTop}px`,
                   marginLeft: `-${marginLeft}px`
                 }}>
            <tbody>
            <tr>
              <td id="15" className={selectedId === '15' && active ? 'selected' : ''}>15</td>
              <td id="16" className={selectedId === '16' && active ? 'selected' : ''}>16</td>
              <td id="17" className={selectedId === '17' && active ? 'selected' : ''}>17</td>
              <td id="18" className={selectedId === '18' && active ? 'selected' : ''}>18</td>
            </tr>

            <tr>
              <td id="1" rowSpan="2" className={selectedId === '1' && active ? 'selected' : ''}>1
              </td>
              <td id="2" className={selectedId === '2' && active ? 'selected' : ''}>2</td>
              <td id="5" className={selectedId === '5' && active ? 'selected' : ''}>5</td>
              <td id="6" rowSpan="2" className={selectedId === '6' && active ? 'selected' : ''}>6
              </td>
            </tr>
            <tr>
              <td id="3" className={selectedId === '3' && active ? 'selected' : ''}>3</td>
              <td id="4" className={selectedId === '4' && active ? 'selected' : ''}>4</td>
            </tr>
            <tr>
              <td id="7" className={selectedId === '7' && active ? 'selected' : ''}>7</td>
              <td id="8" className={selectedId === '8' && active ? 'selected' : ''}>8</td>
              <td id="9" className={selectedId === '9' && active ? 'selected' : ''}>9</td>
              <td id="10" className={selectedId === '10' && active ? 'selected' : 'disabled'}>10
              </td>
            </tr>
            <tr>
              <td id="11" className={selectedId === '11' && active ? 'selected' : ''}>11</td>
              <td id="12" className={selectedId === '12' && active ? 'selected' : ''}>12</td>
              <td id="13" className={selectedId === '13' && active ? 'selected' : ''}>13</td>
              <td id="14" className={selectedId === '14' && active ? 'selected' : ''}>14</td>
            </tr>
            <tr>
              <td></td>
              <td id="20" className={selectedId === '20' && active ? 'selected' : ''}>20</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td id="19" colSpan="4" className={selectedId === '19' && active ? 'selected' : ''}>19
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </Binder>
      <Strape1 binderId="strape-1" onDownExit="strape-2" onUpExit="binder1" active={false}/>
      <Strape2 binderId="strape-2" onUpExit="strape-1" onDownExit="binder2" active={false}/>
      {lool ? <Binder id="binder2" onUpExit="strape-2">
        <ul>
          <li id="43" className={selectedId2 === '43' && active2 ? 'selected' : ''}>LALA</li>
          <li id="44" className={selectedId2 === '44' && active2 ? 'selected' : ''}>LILI</li>
          <li id="45" className={selectedId2 === '45' && active2 ? 'selected' : ''}>LULU</li>
        </ul>
      </Binder> : null}
      <button onClick={clickHandler}>ON CLICK</button>
    </div>
  );
};

const Mosaic = connect((state) => {
  return {
    binder1: keysSelector('binder1')(),
    binder2: keysSelector('binder2')(),
    lool: state['LOL'].active,
  };
})(PureMosaic);

ReactDOM.render(
  <Provider store={store}>
    <Mosaic/>
  </Provider>
  , document.getElementById('body'));

activeKeyBinder('rk-carousel');
