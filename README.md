# React Keys
Simple way to bind keyboard to react with redux.

[![Build Status](https://travis-ci.org/canalplus/react-keys.svg?branch=master)](https://travis-ci.org/canalplus/react-keys)
[![npm version](https://badge.fury.io/js/react-keys.svg)](https://badge.fury.io/js/react-keys)
[![codecov.io](https://codecov.io/github/canalplus/react-keys/coverage.svg?branch=master)](https://codecov.io/github/canalplus/react-keys?branch=master)


## Why ?

The need a fast way to bind keys to a react-powered UI with awesome redux for state management.

## Installation
`react-keys` requires **React 0.14 or later**

`npm i react-keys -S`

## Dependencies

While not having direct dependencies, react-keys have to be used with `react`, `react-dom` and `redux` :

```javscript
npm i react -S
npm i react-dom -S
npm i redux -S
```

# Link it with Redux (Otherwise it doesn't work !) 
```javascript
import { keysInit, keyReducer, keysSelector } from 'react-keys';
import { connect } from 'react-redux';
import PureMosaic from '../PureMosaic' // Pure React Component

//ONE
const store = createStore(combineReducers({
  '@@keys': keysReducer, // you need to link the react-keys reducer with the @@keys id
}));

//TWO
keysInit({store: store}); // add the store there

//TRHEE
const Mosaic = connect(() => keysSelector('OneBinderId'))(PureMosaic); // listen every changes of your mosaic like that
```

# Keys
Very basic way to handle keyboard events. Yet is pretty powerfull :-)

```javascript
import { Keys } from 'react-keys';

function onBack(){
  alert('alert bro');
}

const Component = ({ isActive }) => {
  return(
    <div>
      <Keys id="rk-basic" 
            on65={ () => console.log('Did I just push A ?') } 
            active={ isActive } />
      <h1>Check that out !</h1>
    </div>
  );
}
```

### <Keys ..options/>
* `id` (string / **mandatory**) component id
* `on${keyCode}` (function / *optional*) keyCode callback 
* `active` (boolean / *optional*) determine is `Keys` component is active (default `true`)



# Binder
Fancy React component to deal with space navigation. It handles communication with multiple `Binder` compoments to create something great !

```javascript
import {Binder, keysInit} from 'react-keys';

keysInit(); // must call it once at the app starting to enable the triggering

function renderWithId(id) {
  ReactDOM.render(<Mosaic binderId="mosaic-1" selectedId={id}/>, document.getElementById('body'));
}

function onKey(element) {
  renderWithId(element.id);
}

const Card = ({id, active}) => {
  const style = active ? 'selected' : '';
  return <li id={id} className={style}>#{id}</li>;
};

const Mosaic = ({binderId, selectedId}) => {
  return (
    <Binder
      id={binderId}
      active={true}
      onLeft={onKey}
      onUp={onKey}
      onDown={onKey}
      onRight={onKey}>
      <ul>
        <Card id={binderId + '-1'} active={selectedId === binderId + '-1'}/> // element need a unique id
        <Card id={binderId + '-2'} active={selectedId === binderId + '-2'}/>
        <Card id={binderId + '-3'} active={selectedId === binderId + '-3'}/>
      </ul>
    </Binder>
  );
};

renderWithId('mosaic-1-1');
```

### `<Binder ...options />`
* `id` (string / **mandatory**) Define the binder id
* `active` (boolean / *optional*) determine if binder is active (default `false`)
* `selector` (string / *optional*) DOM selector which define each element (default `li`)
* `wrapper` (string / *optional*) DOM selector which define parent element (default `document`)
* `filter` (string / *optional*) Class name which exclude element 
* `context` (object / *optional*) context object passed within every callback
* `focusedId` (string / *optional*) id to define the element focused (first element by default)
* `enterStrategy` (string / *optional*) define strape strategy on enter: `start` / `mirror` / `memory` / `none` (default `none`)
* `gap` (number / *optional*) reduce or increase elements margin (default `0`)
* `boundedGap` (number / *optional*) reduce or increase bounded margin (default `0`)
* `topGap` (number / *optional*) reduce or increase last top margin (default `0`)
* `rightGap` (number / *optional*) reduce or increase last right margin (default `0`)
* `leftGap` (number / *optional*) reduce or increase last left margin (default `0`)
* `downGap` (number / *optional*) reduce or increase last down margin (default `0`)
* `onRight` (function / *optional*) callback for right events `function(nextElement, {context})`
* `onLeft` (function / *optional*) callback for left events `function(nextElement, {context})`
* `onUp` (function / *optional*) callback for up events `function(nextElement, {context})`
* `onDown` (function / *optional*) callback for down events `function(nextElement, {context})`
* `onEnter` (function / *optional*) callback for enter events `function(nextElement, {context})`
* `onBack` (function / *optional*) callback for back events `function(nextElement, {context})`
* `onRightExit` (function/string / *optional*) triggered when right event would go outside the elements block, it can be a function or the binder id we want to reach
* `onLeftExit` (function/string / *optional*) triggered when left event would go outside the elements block, it can be a function or the binder id we want to reach
* `onUpExit` (function/string / *optional*) triggered when up event would go outside the elements block, it can be a function or the binder id we want to reach
* `onDownExit` (function/string / *optional*) triggered when down event would go outside the elements block, it can be a function or the binder id we want to reach

### Example

```javascript
import { Binder, keysSelector } from 'react-keys';

const PureMosaic = ({ selectedId, marginTop, marginLeft }) => {
  return (
    <Binder
      id="rk-binder"
      wrapper="#myWrapper"
      gap={20}
      onEnter={ ( element, { context }) => console.log(`ENTER with ${element.id}`) }>
      <div id="myWrapper">
          <ul style={{ marginTop: marginTop, marginLeft: marginLeft}}>
            <li id="1" className={selectedId === '1' ? 'selected' : ''}>#1</li>
            <li id="2" className={selectedId === '2' ? 'selected' : ''}>#2</li>
            <li id="3" className={selectedId === '3' ? 'selected' : ''}>#3</li>
            <li id="4" className={selectedId === '4' ? 'selected' : ''}>#4</li>
            <li id="5" className={selectedId === '5' ? 'selected' : ''}>#5</li>
            <li id="6" className={selectedId === '6' ? 'selected' : ''}>#6</li>
          </ul>
      </div>
    </Binder>
  );
};

const Mosaic = connect(() => keysSelector('rk-binder'))(PureMosaic); // listen every changes of your mosaic like that
```

the keys store will manage the state of each binders (no matter how many they are). Each state is structured as following
```javascipt
{
    binder2: {
      id: 'binder2',
      active: false,
      type: 'binder',
      selector: 'li',
      gap: 20,
      boundedGap: 0,
      topGap: 0,
      rightGap: 0,
      leftGap: 0,
      downGap: 0,
      enterStrategy: 'none',
      elements: [
        {
          id: '43',
          coords: {
            id: '43',
            width: 1049,
            height: 37,
            left: 48,
            top: 500,
            down: 537,
            right: 1097
          },
          down: '44',
          marginTop: 0,
          marginLeft: 0
        },
        ...
      ],
      prevEl: {
        id: '44',
        coords: {
          id: '44',
          width: 1049,
          height: 37,
          left: 48,
          top: 537,
          down: 574,
          right: 1097
        },
        up: '43',
        down: '45',
        marginTop: 0,
        marginLeft: 0
      },
      prevDir: {...},
      nextEl: {
        id: '43',
        coords: {
          id: '43',
          width: 1049,
          height: 37,
          left: 48,
          top: 500,
          down: 537,
          right: 1097
        },
        down: '44',
        marginTop: 0,
        marginLeft: 0
      },
      hasMoved: false,
      marginLeft: 0,
      marginTop: 0,
      wrapper: {
        id: '',
        width: 1089,
        height: 672,
        left: 8,
        top: 8,
        down: 680,
        right: 1097
      },
      downLimit: 611,
      rightLimit: 1097,
      selectedId: '43'
    }
}
```
So you can listen the change of theses values for each binder

### Action launchers
* `activeKeyBinder(binderId, selectedId)` activate a new binder by giving its id
* `updateBinderState(binderId, binderState)` when you want to update the state manually

# Tests

`npm run test`
