# React Keys
Simple way to bind keyboard to react with redux.

[![Build Status](https://travis-ci.org/canalplus/react-keys.svg?branch=master)](https://travis-ci.org/canalplus/react-keys)
[![npm version](https://badge.fury.io/js/react-keys.svg)](https://badge.fury.io/js/react-keys)
[![codecov.io](https://codecov.io/github/canalplus/react-keys/coverage.svg?branch=master)](https://codecov.io/github/canalplus/react-keys?branch=master)


## Why ?

The need a fast way to bind keys to a react-powered UI with awesome redux for state management.

## Installation
`react-keys` requires **React 0.14 or later**

`yarn add react-keys`

## Dependencies

While not having direct dependencies, react-keys have to be used with `react`, `react-dom` and `redux` :

```javscript
yarn add react
yarn add react-dom
yarn add redux
```

# Link it with Redux (Otherwise it doesn't work !) 
```javascript
import { keysInit, keyReducer, keysSelector } from 'react-keys';
import { createStore, combineReducers } from 'redux';
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

# keysInit (object)
This is the entry point you need to define your redux store here. You can also define global behaviors
* `store` (redux store / **mandatory**) Link the redux store to `react-keys`
* `eventCb` (function / *optional*) Define a callback triggered when short/long press are done
* `debounce` (number / *optional*) define a global debounce in ms, it can be overrided by components (default : `10`)
* `config` (object / *optional*) define keys to work with, this is the core concept for Keys components and it works as below 
* `longPressTouch` (array / *optional*) define list of keycode active for long press handling ( default : `[37, 38, 39, 40]`) 

The default config of `react-keys` is 
```javascript
{
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  enter: 13,
}
```
You can get your computed config by calling like that
```javascript
import { config } from 'react-keys';
const getConfig = () => config();
```
You can use them by adding a prop to `Keys` component with the keyword `on` before the key with CamelCase (`onBack`, `onUp`, `onEnter`...)
You can extend this config by adding your own object config that will extend the default config.

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
            onBack={ () => console.log('Did I just push A ?') } 
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
* `debounce` (number / *optional*) define a debounce for keys press in ms (default global debounce)

# Catcher
A basic component that can execute a *callback* when observing a *sequence*. This component has two props:
* `sequence` (string / **mandatory**) the sequence to observe.
* `cb` (function / **mandatory**) the callback to execute.

```javascript
import { Catcher } from 'react-keys';

const ComponentWithCatcher = () => {
  return(
    <div>
      <Catcher sequence="424242"
            cb={ () => console.log('Yeah ! Cheat code activated') }/>
    </div>
  );
}

// When 42 is enter 3 times
// It will print on console 'Yeah ! Cheat code activated'
```

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
* `filter` (string / *optional*) class name which exclude element 
* `debounce` (number / *optional*) define a debounce for keys press in ms (default global debounce) 
* `enterStrategy` (string / *optional*) define strape strategy on enter: `start` / `mirror` / `memory` / `none` (default `none`)
* `position` (string / *optional*) to better handle for  enterStrategy (vertial/horizontal) (default `horizontal`)
* `gap` (number / *optional*) reduce or increase elements margin (default `0`)`
* `boundedGap` (number / *optional*) reduce or increase bounded margin (default `0`)
* `triggerClick` (boolean / *optional*) elements will trigger a click event on enter event (default `true`)`
* `topGap` (number / *optional*) reduce or increase last top margin (default `0`)
* `longPress` (boolean / *optional*) active long press handler (default `true`) 
* `rightGap` (number / *optional*) reduce or increase last right margin (default `0`)
* `leftGap` (number / *optional*) reduce or increase last left margin (default `0`)
* `downGap` (number / *optional*) reduce or increase last down margin (default `0`)
* `onRight` (function / *optional*) callback for right events `function(nextElement)`
* `onLeft` (function / *optional*) callback for left events `function(nextElement)`
* `onUp` (function / *optional*) callback for up events `function(nextElement)`
* `onDown` (function / *optional*) callback for down events `function(nextElement)`
* `onEnter` (function / *optional*) callback for enter events `function(nextElement)`
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
      onEnter={ element => console.log(`ENTER with ${element.id}`) }>
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
````

So you can listen the change of theses values for each binder

### Selectors
Selectors give you easy control on your data binder, here few selectors for common use. they return a function
* `isCurrentBinder(binderId)` determine if your binder is the current binder
* `isBinderActive(binderId)` determine if your binder is active
* `getBinderMarginLeft(binderId)` determine marginLeft of a binder
* `getBinderMarginTop(binderId)` determine marginTop of a binder
* `getBinderSelectedId(binderId)` determine selectedId of a binder

### Action launchers
* `activeBinder(binderId, selectedId(optional))` activate a new binder by giving its id (first id by default)
* `resetBinder(binderId, selectedId(optional))` reset binder by giving its id (first id by default)
* `updateBinder(binderId, binderState)` when you want to update the state manually (you must know what you do !)

### Keys/Binder blockers

For some reason you want sometime block a specific binder or a specific key, you can perform that with these functions. Don't forget to unblock when you block :-) 

* `bock(values or array of values(optional))` it can be keyCode or binderId. when no argument are passed, it blocks everything.
* `unblock(values or array of values(optional))` it can be keyCode or binderId. when no argument are passed, it unblocks everything.
* `blockExcept(values or array of values)` it can be keyCode or binderId. Note  when you want toi except a binder, you have to refers its keyCode associated 
```javascript
blockExcept('binderId', [config().down, config().up, config().left, config().right, config().enter]);
```
* `unblockExcept(values or array of values)` it can be keyCode or binderId.

### HOC
* `catcher(sequence, callback)` it trigger the callback when a `string` sequence is catched

# Tests

`npm run test`
