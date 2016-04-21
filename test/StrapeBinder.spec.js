/* eslint no-unused-expressions:0 */
/* eslint no-unused-vars:0 */
import React from 'react';
import StrapeBinder from '../src/StrapeBinder';
import {shallow, mount} from 'enzyme';
import * as actions from '../src/redux/actions';
import * as listener from '../src/listener';
import sinon from 'sinon';

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

  it('should call refreshState and _addKeyBinderToStore on mount', sinon.test(function() {
    const refreshStateSpy = this.spy(StrapeBinder.prototype, 'refreshState');
    const addToStoreSpy = this.spy(actions, '_addKeyBinderToStore');
    mount(<StrapeBinder binderId="1">
      <ul>
        <li id="li1"></li>
      </ul>
    </StrapeBinder>);
    refreshStateSpy.should.have.been.calledOnce;
    addToStoreSpy.should.have.been.calledOnce;
    addToStoreSpy.should.have.been.calledWith({
      elements: [{id: 'li1', left: undefined, right: undefined, marginLeft: 0}],
      id: '1',
      marginLeft: 0,
      selectedId: 'li1',
      visibleElements: 1,
    });
  }));

  it('should call refreshState on update', sinon.test(function() {
    const strape = mount(<StrapeBinder binderId="1">
      <ul>
        <li id="li1"></li>
      </ul>
    </StrapeBinder>);
    const spy = this.spy(StrapeBinder.prototype, 'refreshState');
    strape.update();
    spy.should.have.been.calledOnce;
  }));

  it('should call removeListener on unmout', sinon.test(function() {
    const spy = this.spy(listener, 'removeListener');
    const strape = mount(<StrapeBinder binderId="1">
      <ul>
        <li id="li1"></li>
      </ul>
    </StrapeBinder>);
    strape.unmount();
    spy.should.have.been.calledOne;
  }));

  it('should set first element id', () => {
    const strape = mount(<StrapeBinder binderId="1" active={true}>
      <ul>
        <li id="li1"></li>
        <li id="li2"></li>
      </ul>
    </StrapeBinder>);
    strape.node.nextEl.id.should.equal('li1');
  });

  it('should set element selected', () => {
    const strape = mount(<StrapeBinder binderId="1" active={true} focusedElementId="li2">
      <ul>
        <li id="li1"></li>
        <li id="li2"></li>
      </ul>
    </StrapeBinder>);
    strape.node.nextEl.id.should.equal('li2');
  });
});
