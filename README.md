# React Keys
Simple way to bind keyboard to react with redux (or not).

[![Build Status](https://travis-ci.org/canalplus/react-keys.svg?branch=master)](https://travis-ci.org/canalplus/react-keys)
[![npm version](https://badge.fury.io/js/react-keys.svg)](https://badge.fury.io/js/react-keys)
[![codecov.io](https://codecov.io/github/canalplus/react-keys/coverage.svg?branch=master)](https://codecov.io/github/canalplus/react-keys?branch=master)


## Why ?

The need of a non-intrusive and fast way to bind keys to a react-powered UI.

## Installation
`react-keys` requires **React 0.14 or later**

`npm i react-keys -S`

## Dependencies

While not having direct dependencies, react-keys have to be used with `react` and `react-dom`:

```javscript
npm i react -S
npm i react-dom -S
```

## Example

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

## API

### `<Binder ...options />`
* `id` (string / **mandatory**) Define the binder id
* `selector` (string / *optional*) DOM selector which define each element (default `li`)
* `focusedElementId` (string / *optional*) id to define the element focused (first element by default)
* `context` (object / *optional*) context object passed within every callback
* `active` (boolean / *optional*) determine if binder has to listen keys events (default `true`) **/!\ no need to use it with redux**
* `accuracy` (number / *optional*) give tolerance for elements calculation, useful when your elements are not well aligned (default `O`)
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

### `<StrapeBinder ..options />`
* `id` (string / **mandatory**) Define the binder id
* `wrapper` (string / *optional*) DOM selector which define parent element (default `ul`)
* `wChildren` (string / *optional*) DOM selector which define children elements (default `li`)
* `strategy` (string / *optional*) define strape strategy : `progressive` or `cut` (default `progressive`)
* `circular` (boolean / *optional*) define if strape has no boundaries (default `false`)
* `gap` (number / *optional*) reduce or increase elements margin (default `0`)
* `lastGap` (number / *optional*) reduce or increase last element margin (default `0`)
* `focusedElementId` (string / *optional*) id to define the element focused (first element by default)
* `context` (object / *optional*) context object passed within every callback
* `active` (boolean / *optional*) determine if binder has to listen keys events (default `true`) **/!\ no need to use it with redux**
* `onRight` (function / *optional*) callback for right events `function(nextElement, {context})`
* `onLeft` (function / *optional*) callback for left events `function(nextElement, {context})`
* `onUp` (function / *optional*) callback for up events `function(nextElement, {context})`
* `onDown` (function / *optional*) callback for down events `function(nextElement, {context})`
* `onEnter` (function / *optional*) callback for enter events `function(nextElement, {context})`
* `onRightExit` (function/string / *optional*) triggered when right event would go outside the elements block, it can be a function or the binder id we want to reach
* `onLeftExit` (function/string / *optional*) triggered when left event would go outside the elements block, it can be a function or the binder id we want to reach
* `onUpExit` (function/string / *optional*) triggered when up event would go outside the elements block, it can be a function or the binder id we want to reach
* `onDownExit` (function/string / *optional*) triggered when down event would go outside the elements block, it can be a function or the binder id we want to reach

### `keysInit({store, bindKeys})` **mandatory**
You have to call this function to boot all binders `keysInit()`
* `store` (ReduxStore / *optional*) if you want to link your binders with your redux store, add it there.
* `bindKeys` (function / *optional*) by default `react-keys` use `keydown` event to trigger actions, but you can overwride the behavior to better suite your needs.

```javascript
import {keysInit, keys} from 'react-keys';

keysInit({
  bindKeys : (cb) => {
     R7.grabKey('Left', () => cb(keys.LEFT));
     R7.grabKey('Up', () => cb(keys.UP));
     R7.grabKey('Right', () => cb(keys.RIGHT));
     R7.grabKey('Down', () => cb(keys.DOWN));
     R7.grabKey('Enter', () => cb(keys.ENTER));
   }
});
```

### `register` (function)

React keys send some events when some stuff have been done with infos like geo positions. You can listen these events with `register`

```javascript
import {register} from 'react-keys';

register('strape:update', (elements) => {
    for(const element of elements){
      console.log(element.marginLeft);
    }
});
```

#### available events

+ `strape:update` --> triggered everytime strape structure is updated

### `keys`

list of available keys triggered :
+ LEFT
+ UP
+ RIGHT
+ DOWN
+ ENTER

## With Redux

`react-keys` is built to be used with redux, it reduces lot of boilerplate and give you more controle to your actions.

### Example

```javascript
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {connect, Provider} from 'react-redux';
import {Binder, keysInit, keysReducer, activeKeyBinder} from 'react-keys';

const store = createStore(combineReducers({
  '@@keys': keysReducer, // you have to had the react-keys reducer with the @@keys id
}));``

keysInit({store: store}); // add the store there

const PureMosaic = ({selectedId}) => {
  return (
    <Binder
      id="mosaic-1"
      onEnter={onEnter}
    >
      <ul>
        <li id="1" className={selectedId === '1' ? 'selected' : ''}>#1</li>
        <li id="2" className={selectedId === '2' ? 'selected' : ''}>#2</li>
        <li id="3" className={selectedId === '3' ? 'selected' : ''}>#3</li>
        <li id="4" className={selectedId === '4' ? 'selected' : ''}>#4</li>
        <li id="5" className={selectedId === '5' ? 'selected' : ''}>#5</li>
        <li id="6" className={selectedId === '6' ? 'selected' : ''}>#6</li>
      </ul>
    </Binder>
  );
};

function onEnter(element) {alert('ELEMENT #' + element.id)}

const Mosaic = connect(state => state['@@keys'].getBinder('mosaic-1'))(PureMosaic); // listen every changes of your mosaic like that

ReactDOM.render(<Provider store={store}>
  <div>
    <Mosaic/> // your mosaic
  </div>
</Provider>, document.getElementById('body'));

activeKeyBinder('mosaic-1'); // active the binder you want to use
```

three steps are needed to link `react-keys` to your redux store :-)
```javascript
//ONE
const store = createStore(combineReducers({
  '@@keys': keysReducer, // you have to had the react-keys reducer with the @@keys id
}));``
//TWO
keysInit({store: store}); // add the store there
//TRHEE
const Mosaic = connect(state => state['@@keys'].getBinder('mosaic-1'))(PureMosaic); // listen every changes of your mosaic like that
```

the keys store will manage the state of each binders (no matter how many they are). Each state is structured as following
```javascipt
{
    id: 'binder id',
    selectedId: 'current selected id',
    marginLeft: 'margin for strapes',
    elements: 'array of all elements',
    active: 'boolean to know if binder is active'
    visibleElements: 'length of elements visible',
}
```
So  you can listen the change of theses values for each binder

### Actions

Here list of actions emitted by `react-router`
* `ADD_KEYBINDER_TO_STORE` when a new binder is mount
* `ACTIVE_KEYBINDER` when a new binder is activated
* `UPDATE_SELECTED_KEY` when a new element is selected
* `UPDATE_BINDER_STATE` when state is updated

### Action launchers
* `activeKeyBinder([binderId])` activate a new binder by giving its id
* `updateBinderState(binderId, binderState)` when you want to update the state manually

# Tests

`npm run test`
