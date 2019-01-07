# React Keys

Simple way to bind keyboard to react with redux.

[![Build Status](https://travis-ci.org/canalplus/react-keys.svg?branch=master)](https://travis-ci.org/canalplus/react-keys)
[![npm version](https://badge.fury.io/js/react-keys.svg)](https://badge.fury.io/js/react-keys)
[![codecov.io](https://codecov.io/github/canalplus/react-keys/coverage.svg?branch=master)](https://codecov.io/github/canalplus/react-keys?branch=master)

## Why ?

The need a fast way to bind keys to a react-powered UI with awesome redux for state management.

## Installation

`react-keys` requires **React 15 or later**

`npm install react-keys` or `yarn add react-keys`

## Dependencies

While not having direct dependencies, react-keys have to be used with `react`, `react-dom` and `redux` :

```javscript
yarn add react
yarn add react-dom
yarn add redux
```

# Link it with Redux (Otherwise it doesn't work !)

```javascript
import { keysInit, keyReducer, getCurrentBinderId } from 'react-keys';
import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';
import PureMosaic from '../PureMosaic'; // Pure React Component

//ONE
const store = createStore(
  combineReducers({
    '@@keys': keysReducer, // you need to link the react-keys reducer with the @@keys id
  })
);

//TWO
keysInit({ store: store }); // add the store there

//THREE
const Mosaic = connect(() => getCurrentBinderId()())(PureMosaic); // listen every changes of your mosaic like that
```

# keysInit (object)

This is the entry point you need to define your redux store here. You can also define global behaviors

* `store` (redux store / **mandatory**) Link the redux store to `react-keys`
* `eventCb` (function / _optional_) Define a callback triggered when short/long press are done
* `debounce` (number / _optional_) define a global debounce in ms, it can be overrided by components (default : `10`)
* `config` (object / _optional_) define keys to work with, this is the core concept for Keys components and it works as below
* `longPressTouch` (array / _optional_) define list of keycode active for long press handling ( default : `[37, 38, 39, 40]`)

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

# Principles

`react-keys` has two main `Component` to deal with keyboard : `Keys` and `Binder`. `Keys` is basically an handler for `keydown` that execute a callback from a specific `key`. `Binder` helps you to navigate throw lists with spacial context.
You can mount has much as `Keys` or `Binder` you want at same time but _there is just one handler triggered by key action_.
By default the priority is given to the lastest `Component` mounted. You can configure that by setting a `priority` property on `Keys` and `Binder`.
That means a `Binder` with priority `1` mounted before a `Keys` with priority `0` (default) will still trigger the action.
When a `Keys` or `Binder` is `unmonted`, `react-keys` will figure out which `Component` will take the lead.

# Keys

Very basic way to handle keyboard events. Yet is pretty powerfull :-)

```javascript
import { Keys } from 'react-keys';

function onBack() {
  alert('alert bro');
}

const Component = ({ isActive }) => {
  return (
    <>
      <Keys
        id="rk-basic"
        onBack={() => console.log('Did I just push A ?')}
        active={isActive}
      />
      <h1>Check that out !</h1>
    </>
  );
};
```

### <Keys ..options/>

* `id` (string / **mandatory**) component id
* `on${keyCode}` (function / _optional_) keyCode callback
* `active` (boolean / _optional_) determine is `Keys` component is active (default `true`)
* `debounce` (number / _optional_) define a debounce for keys press in ms (default global debounce)
* `priority` (number / _optional_) define the priority from others (default `0`)

# Catcher

A basic component that can execute a _callback_ when observing a _sequence_. This component has two props:

* `sequence` (string / **mandatory**) the sequence to observe.
* `cb` (function / **mandatory**) the callback to execute.

```javascript
import { Catcher } from 'react-keys';

const ComponentWithCatcher = () => {
  return (
    <div>
      <Catcher
        sequence="424242"
        cb={() => console.log('Yeah ! Cheat code activated')}
      />
    </div>
  );
};

// When 42 is enter 3 times
// It will print on console 'Yeah ! Cheat code activated'
```

# Binder

Fancy React component to deal with space navigation. It handles communication with multiple `Binder` compoments to create something great !

```javascript
import { Binder, keysInit } from 'react-keys';

keysInit(); // must call it once at the app starting to enable the triggering

function renderWithId(id) {
  ReactDOM.render(
    <Mosaic binderId="mosaic-1" selectedId={id} />,
    document.getElementById('body')
  );
}

function onKey(element) {
  renderWithId(element.id);
}

const Card = ({ id, active }) => {
  const style = active ? 'selected' : '';
  return (
    <li id={id} className={style}>
      #{id}
    </li>
  );
};

const Mosaic = ({ binderId, selectedId }) => {
  return (
    <Binder
      id={binderId}
      active={true}
      onLeft={onKey}
      onUp={onKey}
      onDown={onKey}
      onRight={onKey}
    >
      <ul>
        <Card id={binderId + '-1'} active={selectedId === binderId + '-1'} /> //
        element need a unique id
        <Card id={binderId + '-2'} active={selectedId === binderId + '-2'} />
        <Card id={binderId + '-3'} active={selectedId === binderId + '-3'} />
      </ul>
    </Binder>
  );
};

renderWithId('mosaic-1-1');
```

### `<Binder ...options />`

* `id` (string / **mandatory**) Define the binder id
* `active` (boolean / _optional_) determine if binder is active (default `false`)
* `selector` (string / _optional_) DOM selector which define each element (default `li`)
* `priority` (number / _optional_) define priority among others binders when mouting (default `0`)
* `wrapper` (string / _optional_) DOM selector which define parent element (default `document`)
* `filter` (string / _optional_) class name which exclude element
* `debounce` (number / _optional_) define a debounce for keys press in ms (default global debounce)
* `memory` (boolean / _optional_) define if binder state has to be saved on unmounting (default `false`)
* `strategy` (string / _optional_) define strape strategy on enter: `start` / `mirror` / `none` (default `none`)
* `refreshStrategy` (string / _optional_) define how the focus behave on binder elements update (which element will be focused): `first` / `previous` (default `first`)
* `position` (string / _optional_) to better handle for enterStrategy (vertial/horizontal) (default `horizontal`)
* `visibilityOffset` (number / _optional_) set an offset un pixel to determine if an element is visible or hidden (default `0`)
* `direction` (string / _optional_) give a hint to `react-keys` to know if the direction is mainly `horizontal` or `vertical` (default `none`)
* `gap` (number / _optional_) reduce or increase elements margin (default `0`)`
* `boundedGap` (number / _optional_) reduce or increase bounded margin (default `0`)
* `triggerClick` (boolean / _optional_) elements will trigger a click event on enter event (default `true`)`
* `topGap` (number / _optional_) reduce or increase last top margin (default `0`)
* `longPress` (boolean / _optional_) active long press handler (default `true`)
* `rightGap` (number / _optional_) reduce or increase last right margin (default `0`)
* `leftGap` (number / _optional_) reduce or increase last left margin (default `0`)
* `downGap` (number / _optional_) reduce or increase last down margin (default `0`)
* `onRight` (function / _optional_) callback for right events `function(nextElement)`
* `onLeft` (function / _optional_) callback for left events `function(nextElement)`
* `onUp` (function / _optional_) callback for up events `function(nextElement)`
* `onDown` (function / _optional_) callback for down events `function(nextElement)`
* `onEnter` (function / _optional_) callback for enter events `function(nextElement)`
* `onRightExit` (function/string / _optional_) triggered when right event would go outside the elements block, it can be a function or the binder id we want to reach
* `onLeftExit` (function/string / _optional_) triggered when left event would go outside the elements block, it can be a function or the binder id we want to reach
* `onUpExit` (function/string / _optional_) triggered when up event would go outside the elements block, it can be a function or the binder id we want to reach
* `onDownExit` (function/string / _optional_) triggered when down event would go outside the elements block, it can be a function or the binder id we want to reach

### Example

```javascript
import { Binder, keysSelector } from 'react-keys';

const PureMosaic = ({ selectedId, marginTop, marginLeft }) => {
  return (
    <Binder
      id="rk-binder"
      wrapper="#myWrapper"
      gap={20}
      onEnter={element => console.log(`ENTER with ${element.id}`)}
    >
      <div id="myWrapper">
        <ul style={{ marginTop: marginTop, marginLeft: marginLeft }}>
          <li id="1" className={selectedId === '1' ? 'selected' : ''}>
            #1
          </li>
          <li id="2" className={selectedId === '2' ? 'selected' : ''}>
            #2
          </li>
          <li id="3" className={selectedId === '3' ? 'selected' : ''}>
            #3
          </li>
          <li id="4" className={selectedId === '4' ? 'selected' : ''}>
            #4
          </li>
          <li id="5" className={selectedId === '5' ? 'selected' : ''}>
            #5
          </li>
          <li id="6" className={selectedId === '6' ? 'selected' : ''}>
            #6
          </li>
        </ul>
      </div>
    </Binder>
  );
};

const Mosaic = connect(() => ({
  selectedId: getCurrentSelectedId()(),
  marginTop: getBinderMarginTop('rk-binder')(),
  marginLeft: getBinderMarginLeft('rk-binder')(),
}))(PureMosaic); // listen every changes of your mosaic like that
```

the keys store will manage the state of each binders (no matter how many they are).

### Selectors

Selectors give you easy control on your data binder, here few selectors for common use. they return a function

* `isCurrentBinder(binderId)` determine if your binder is the current binder
* `isBinderActive(binderId)` determine if your binder is active
* `getBinderMarginLeft(binderId)` determine marginLeft of a binder
* `getBinderMarginTop(binderId)` determine marginTop of a binder
* `getBinderSelectedId(binderId)` determine selectedId of a binder
* `getCurrentSelectedId()` get selected id of current active binder
* `getCurrentBinder()` get state of current active binder
* `getCurrentBinderId()` get id of current active binder
* `getBinders()` get an array of all binders
* `getKeyCode()` get key code currently pressed
* `isLongPress()` determine if it is a long press
* `isVisibleInBinder(binderId, elementId)` determine if an element is visible inside its binder

### Action launchers

* `activeBinder(binderId, selectedId(optional))` activate a new binder by giving its id (first id by default)
* `resetBinder(binderId, selectedId(optional))` reset binder by giving its id (first id by default)
* `updateBinder(binderState)` when you want to update the state manually (you must know what you do !)
* `removeBinder(binderId)` remove a binder from the app state, useful when you want re-init the binder

### Keys/Binder blockers

For some reason you want sometime block a specific binder or a specific key, you can perform that with these functions. Don't forget to unblock when you block :-)

* `bock(values or array of values(optional))` it can be keyCode or binderId. when no argument are passed, it blocks everything.
* `unblock(values or array of values(optional))` it can be keyCode or binderId. when no argument are passed, it unblocks everything.
* `blockExcept(values or array of values)` it can be keyCode or binderId. Note when you want toi except a binder, you have to refers its keyCode associated

```javascript
blockExcept('binderId', [
  config().down,
  config().up,
  config().left,
  config().right,
  config().enter,
]);
```

* `unblockExcept(values or array of values)` it can be keyCode or binderId.

### HOC

* `catcher(sequence, callback)` it trigger the callback when a `string` sequence is catched

# Tests

`npm run test`
