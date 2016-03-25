# React Keys

[![Build Status](https://travis-ci.org/canalplus/react-keys.svg?branch=master)](https://travis-ci.org/canalplus/react-keys)
[![codecov.io](https://codecov.io/github/canalplus/react-keys/coverage.svg?branch=master)](https://codecov.io/github/canalplus/react-keys?branch=master)

Simple way to bind keyboard to react with flux in mind. (< 4ko gzipped)

## Why ?

The need of a non-intrusive and fast way to bind keys to a react-powered UI.

## Dependencies

While not having direct dependencies, react-keys have to be used with `react` and `react-dom`:

```javscript
npm i react -S
npm i react-dom -S
```

## Example

```javascript
import {KeyBinder} from 'react-keys';

const Component = () => {
  return (
    <KeyBinder
       selector="li"
       keys={{onRightKey, onLeftKey}}>
        <ul>
          <li id="1">ELEMENT 1</li> // first element focused by default
          <li id="2">ELEMENT 2</li>
          <li id="3">ELEMENT 3</li>
          ...
        </ul>
    </KeyBinder>
  )
}

function onRightKey(element) {
  dispatch.action(element.id); //new element id focused
}

function onLeftKey(element) {
  dispatch.action(element.id); //new element id focused
}
```

## API

### KeyBinder (React Component)

#### keys : object

Object of functions triggered by each actions

Available actions :
+ `onUpKey`
+ `onRightKey`
+ `onDownKey`
+ `onLeftKey`
+ `onEnterKey`

#### mode: string (default : "mosaic")

Mode used to calculate actions

Available modes :
+ mosaic : regular table
+ strape : horizontal list scrollable

#### active: boolean (default : true)

Determine whether the keys are active or not for one KeyBinder. You can put many KeyBinder on one view but usually just one should be active.

#### selector: string  (default "li") useful with mosaic mode

DOM element to define selected elements

#### wrapper: string (default : "ul") useful with strape mode

DOM element to define wrapper

#### wChildren: string  (default "li") useful with strape mode

DOM element to define children elements

### register (function)

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

### keysUnit (function)

By default `react-keys` use `keydown` event to trigger actions, but you can overwride the behavior to suite better your needs.

```javascript
import {keysInit, keys} from 'react-keys';

keysInit((cb) => {
    R7.grabKey('Left', () => cb(keys.LEFT));
    R7.grabKey('Up', () => cb(keys.UP));
    R7.grabKey('Right', () => cb(keys.RIGHT));
    R7.grabKey('Down', () => cb(keys.DOWN));
    R7.grabKey('Enter', () => cb(keys.ENTER));
  });
```

### keys

list of available keys triggered :
+ LEFT
+ UP
+ RIGHT
+ DOWN
+ ENTER

# Tests

`npm run test`
