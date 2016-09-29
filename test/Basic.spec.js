// import React from 'react';
// import Basic from '../src/Basic';
// import { mount } from 'enzyme';
// import sinon from 'sinon';
// import { BACK, ENTER, NUM0, MENU, REC, NEXTPROG, PREVPROG } from '../src/keys';
//
// describe('Basic', () => {
//   let clock;
//
//   before(() => {
//     clock = sinon.useFakeTimers();
//   });
//
//   after(() => {
//     clock.restore();
//   });
//
//   function trigger(keyCode) {
//     clock.tick(10);
//     const evt = document.createEvent('HTMLEvents');
//     evt.initEvent('keydown', false, false);
//     evt.keyCode = keyCode;
//     document.dispatchEvent(evt);
//     clock.tick(10);
//     const evt2 = document.createEvent('HTMLEvents');
//     evt2.initEvent('keyup', false, false);
//     evt2.keyCode = keyCode;
//     document.dispatchEvent(evt2);
//   }
//
//   it('should wrap with div hoc-keys id', () => {
//     const wrapper = mount(<Basic id="1"></Basic>);
//     wrapper.find('#1').should.have.length(1);
//   });
//   it('should bind back event', sinon.test(function() {
//     const onBackKey = this.spy();
//     const wrapper = mount(<Basic id="1" onBack={onBackKey} active={true}></Basic>);
//     trigger(BACK);
//     onBackKey.should.have.been.calledOnce;
//     wrapper.unmount();
//   }));
//   it('should stop listening event on unmount', sinon.test(function() {
//     const onBackKey = this.spy();
//     const wrapper = mount(<Basic id="1" onBack={onBackKey} active={true}></Basic>);
//     wrapper.unmount();
//     trigger(BACK);
//     onBackKey.should.have.not.been.called;
//   }));
//   it('should bind digit event', sinon.test(function() {
//     const onDigit = this.spy();
//     const wrapper = mount(<Basic id="1" onDigit={onDigit} active={true}></Basic>);
//     trigger(NUM0);
//     onDigit.should.have.been.calledOnce;
//     wrapper.unmount();
//   }));
//   it('should bind menu event', sinon.test(function() {
//     const onMenu = this.spy();
//     const wrapper = mount(<Basic id="1" onMenu={onMenu} active={true}></Basic>);
//     trigger(MENU);
//     onMenu.should.have.been.calledOnce;
//     wrapper.unmount();
//   }));
//   it('should bind Rec event', sinon.test(function() {
//     const onRec = this.spy();
//     const wrapper = mount(<Basic id="1" onRec={onRec} active={true}></Basic>);
//     trigger(REC);
//     onRec.should.have.been.calledOnce;
//     wrapper.unmount();
//   }));
//   it('should bind nextprog event', sinon.test(function() {
//     const onNextProg = this.spy();
//     const wrapper = mount(<Basic id="1" onNextProg={onNextProg} active={true}></Basic>);
//     trigger(NEXTPROG);
//     onNextProg.should.have.been.calledOnce;
//     wrapper.unmount();
//   }));
//   it('should bind prevprog event', sinon.test(function() {
//     const onPrevProg = this.spy();
//     const wrapper = mount(<Basic id="1" onPrevProg={onPrevProg} active={true}></Basic>);
//     trigger(PREVPROG);
//     onPrevProg.should.have.been.calledOnce;
//     wrapper.unmount();
//   }));
//   it('should bind enter event', sinon.test(function() {
//     const onEnter = this.spy();
//     const wrapper = mount(<Basic id="1" onEnter={onEnter} active={true}></Basic>);
//     trigger(ENTER);
//     onEnter.should.have.been.calledOnce;
//     wrapper.unmount();
//   }));
// });
