import React from 'react';
import Basic from '../Basic';
import { createStore, combineReducers } from 'redux';
import { mount, render } from 'enzyme';
import sinon from 'sinon';
import { keysInit, keysReducer, keys } from '../../';
import config from '../../config';
import { keyPress } from '../../../test/helpers';

describe('Basic', () => {

  let store;

  beforeEach(() => {
    store = createStore(combineReducers({ '@@keys': keysReducer }));
    keysInit({ store: store });
  });

  it('should return empty html', () => {
    const basic = render(<Basic id="2"/>);
    basic.html().should.be.empty;
  });

  it('should perform onBack callback on back press', sinon.test(function() {
    const onBackSpy = this.spy();
    const basic = mount(<Basic id="2" onBack={onBackSpy}/>);
    keyPress(config.back);
    this.clock.tick(10); // I need to tick 10 to unlock Basic
    onBackSpy.should.have.been.calledOnce;
    basic.unmount();
  }));

  it('should perform onEnter callback on enter press', sinon.test(function() {
    const onEnterSpy = this.spy();
    const basic = mount(<Basic id="2" onEnter={onEnterSpy}/>);
    keyPress(keys.ENTER);
    this.clock.tick(10); // I need to tick 10 to unlock Basic
    onEnterSpy.should.have.been.calledOnce;
    basic.unmount();
  }));


});