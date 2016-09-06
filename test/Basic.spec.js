import React from 'react';
import Basic from '../src/Basic';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { BACK, ENTER, NUM0, MENU, NEXTPROG, PREVPROG } from '../src/keys';

describe('Basic', () => {
  let clock;

  before(() => {
    clock = sinon.useFakeTimers();
  });

  after(() => {
    clock.restore();
  });

  function trigger(keyCode) {
    clock.tick(10);
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('keydown', false, false);
    evt.keyCode = keyCode;
    document.dispatchEvent(evt);
    evt.initEvent('keyup', false, false);
    evt.keyCode = keyCode;
    document.dispatchEvent(evt);
  }

  it('should wrap with div hoc-keys id', () => {
    const wrapper = mount(<Basic id="'1"></Basic>);
    wrapper.find('#hoc-keys').should.have.length(1);
  });
  it('should bind back event', () => {
    const onBackKey = sinon.spy();
    const wrapper = mount(<Basic id="1" onBack={onBackKey} active={true}></Basic>);
    trigger(BACK);
    onBackKey.should.have.been.calledOnce;
    wrapper.unmount();
  });
  it('should stop listening event on unmount', () => {
    const onBackKey = sinon.spy();
    const wrapper = mount(<Basic id="1" onBack={onBackKey} active={true}></Basic>);
    wrapper.unmount();
    trigger(BACK);
    onBackKey.should.have.not.been.called;
  });
  it('should bind digit event', () => {
    const onDigit = sinon.spy();
    const wrapper = mount(<Basic id="1" onDigit={onDigit} active={true}></Basic>);
    trigger(NUM0);
    onDigit.should.have.been.calledOnce;
    wrapper.unmount();
  });
  it('should bind menu event', () => {
    const onMenu = sinon.spy();
    const wrapper = mount(<Basic id="1" onMenu={onMenu} active={true}></Basic>);
    trigger(MENU);
    onMenu.should.have.been.calledOnce;
    wrapper.unmount();
  });
  it('should bind nextprog event', () => {
    const onNextProg = sinon.spy();
    const wrapper = mount(<Basic id="1" onNextProg={onNextProg} active={true}></Basic>);
    trigger(NEXTPROG);
    onNextProg.should.have.been.calledOnce;
    wrapper.unmount();
  });
  it('should bind prevprog event', () => {
    const onPrevProg = sinon.spy();
    const wrapper = mount(<Basic id="1" onPrevProg={onPrevProg} active={true}></Basic>);
    trigger(PREVPROG);
    onPrevProg.should.have.been.calledOnce;
    wrapper.unmount();
  });
  it('should bind enter event', () => {
    const onEnter = sinon.spy();
    const wrapper = mount(<Basic onEnter={onEnter} active={true}></Basic>);
    trigger(ENTER);
    onEnter.should.have.been.calledOnce;
    wrapper.unmount();
  });
});
