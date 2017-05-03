import React from 'react';
import Keys from '../Keys';
import { createStore, combineReducers } from 'redux';
import { mount, render } from 'enzyme';
import sinon from 'sinon';
import { keysInit, keysReducer, config } from '../../';
import { keyPress, keyUp } from '../../../test/helpers';

describe('Keys', () => {

  let store;

  beforeEach(() => {
    store = createStore(combineReducers({ '@@keys': keysReducer }));
    keysInit({ store: store, config: { back: 8 } });
  });

  it('should return empty html', () => {
    const basic = render(<Keys id="2"/>);
    basic.html().should.be.empty;
  });

  it('should perform onBack callback on back press', sinon.test(function() {
    const onBackSpy = this.spy();
    const basic = mount(<Keys id="2" onBack={onBackSpy}/>);
    this.clock.tick(10)
    keyPress(config().back);
    keyUp(config().back);
    this.clock.tick(10); // I need to tick 10 to unlock Basic
    onBackSpy.should.have.been.calledOnce;
    basic.unmount();
  }));

  it('should perform onEnter callback on enter press', sinon.test(function() {
    const onEnterSpy = this.spy();
    const basic = mount(<Keys id="2" onEnter={onEnterSpy}/>);
    keyPress(config().enter);
    keyUp(config().enter);
    this.clock.tick(10); // I need to tick 10 to unlock Basic
    onEnterSpy.should.have.been.calledOnce;
    basic.unmount();
  }));


});