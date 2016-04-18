/* eslint no-unused-expressions:0 */
/* eslint no-unused-vars:0 */
import React from 'react';
import StrapeBinder from '../src/StrapeBinder';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import * as constants from '../src/constants';

describe('StrapeBinder.jsx', () => {
  it('should wrap with tagName div', () => {
    const keyBinder = shallow(<StrapeBinder binderId="1"/>);
    keyBinder.should.have.tagName('div');
  });
  it('should have right default props', () => {
    const keyBinder = mount(<StrapeBinder binderId="1"/>);
    keyBinder.props().strategy.should.equal('progressive');
    keyBinder.props().gap.should.equal(0);
    keyBinder.props().lastGap.should.equal(0);
    keyBinder.props().accuracy.should.equal(0);
    keyBinder.props().circular.should.be.false;
    keyBinder.props().wrapper.should.equal('ul');
    keyBinder.props().wChildren.should.equal('li');
    keyBinder.props().context.should.be.instanceOf(Object);
  });
  it('executeFunctionAction should call function', sinon.test(function() {
    const keyBinder = new StrapeBinder({context: 'context'});
    const spy = this.spy();
    keyBinder.executeFunctionAction(spy);
    spy.should.have.been.calledOnce;
  }));
});
