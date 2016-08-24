/* eslint no-unused-expressions:0 */
/* eslint no-unused-vars:0 */
import React from 'react';
import Basic from '../src/Basic';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { BACK, NUM0, MENU } from '../src/keys';

function trigger(keyCode) {
  const evt = document.createEvent('HTMLEvents');
  evt.initEvent('keydown', false, false);
  evt.keyCode = keyCode;
  document.dispatchEvent(evt);
}

describe('Basic', () => {
  it('should wrap with div hoc-keys id', () => {
    const wrapper = mount(<Basic></Basic>);
    wrapper.find('#hoc-keys').should.have.length(1);
  });
  it('should bind back event', () => {
    const onBackKey = sinon.spy();
    const wrapper = mount(<Basic onBack={onBackKey} active={true}></Basic>);
    trigger(BACK);
    onBackKey.should.have.been.calledOnce;
    wrapper.unmount();
  });
  it('should stop listening event on unmount', () => {
    const onBackKey = sinon.spy();
    const wrapper = mount(<Basic onBack={onBackKey} active={true}></Basic>);
    wrapper.unmount();
    trigger(BACK);
    onBackKey.should.have.not.been.called;
  });
  it('should bind digit event', () => {
    const onDigit = sinon.spy();
    const wrapper = mount(<Basic onDigit={onDigit} active={true}></Basic>);
    trigger(NUM0);
    onDigit.should.have.been.calledOnce;
    wrapper.unmount();
  });
  it('should bind menu event', () => {
    const onMenu = sinon.spy();
    const wrapper = mount(<Basic onMenu={onMenu} active={true}></Basic>);
    trigger(MENU);
    onMenu.should.have.been.calledOnce;
    wrapper.unmount();
  });
});
