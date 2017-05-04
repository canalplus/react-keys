import React from 'react';
import { expect } from 'chai';
import Catcher from '../Catcher';
import { combineReducers, createStore } from 'redux';
import { mount } from 'enzyme';
import { keysInit, keysReducer } from '../../';
import { keyPress } from '../../../test/helpers';

describe('Catcher', () => {
  let store;

  beforeEach(() => {
    store = createStore(combineReducers({ '@@keys': keysReducer }));
    keysInit({ store: store, config: { back: 8 } });
  });

  it('should execute cb when keycode', () => {
    // Given
    let works = false;
    let workingMessage = 'it works !';
    let cb = () => works = workingMessage;

    let catcher = mount(<Catcher sequence='8888' cb={cb}/>);

    // When
    keyPress(56);
    keyPress(56);
    keyPress(56);
    keyPress(56);

    // Then
    expect(works).to.equal(workingMessage);
    catcher.unmount();
  });

});