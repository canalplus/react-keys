/* eslint no-unused-expressions:0 */
/* eslint no-unused-vars:0 */
import React from 'react';
import MosaicBinder from '../src/MosaicBinder';
import {shallow, mount} from 'enzyme';
import * as actions from '../src/redux/actions';
import * as listener from '../src/listener';
import sinon from 'sinon';

describe('MosaicBinder.jsx', () => {
  it('should wrap with tagName div', () => {
    const mosaic = shallow(<MosaicBinder binderId="1"/>);
    mosaic.should.have.tagName('div');
  });

  it('should call refreshState and _addKeyBinderToStore on mount', sinon.test(function() {
    const refreshStateSpy = this.spy(MosaicBinder.prototype, 'refreshState');
    const addToStoreSpy = this.spy(actions, '_addKeyBinderToStore');
    mount(<MosaicBinder binderId="1">
      <li id="li1"></li>
    </MosaicBinder>);
    refreshStateSpy.should.have.been.calledOnce;
    addToStoreSpy.should.have.been.calledOnce;
    addToStoreSpy.should.have.been.calledWith({
      elements: [{down: undefined, id: 'li1', left: undefined, right: undefined, up: undefined}],
      id: '1',
      selectedId: 'li1',
    });
  }));

  it('should call refreshState on update', sinon.test(function() {
    const mosaic = mount(<MosaicBinder binderId="1">
      <li id="li1"></li>
    </MosaicBinder>);
    const spy = this.spy(MosaicBinder.prototype, 'refreshState');
    mosaic.update();
    spy.should.have.been.calledOnce;
  }));

  it('should call removeListener on unmout', sinon.test(function() {
    const spy = this.spy(listener, 'removeListener');
    const mosaic = mount(<MosaicBinder binderId="1">
      <li id="li1"></li>
    </MosaicBinder>);
    mosaic.unmount();
    spy.should.have.been.calledOne;
  }));

  it('should set first element id', () => {
    const mosaic = mount(<MosaicBinder binderId="1" active={true}>
      <li id="li1"></li>
      <li id="li2"></li>
    </MosaicBinder>);
    mosaic.node.nextEl.id.should.equal('li1');
  });

  it('should set element selected', () => {
    const mosaic = mount(<MosaicBinder binderId="1" active={true} focusedElementId="li2">
      <li id="li1"></li>
      <li id="li2"></li>
    </MosaicBinder>);
    mosaic.node.nextEl.id.should.equal('li2');
  });

  it('should set element selected', () => {
    const mosaic = mount(<MosaicBinder binderId="1" active={true} focusedElementId="li2">
      <li id="li1"></li>
      <li id="li2"></li>
    </MosaicBinder>);
    mosaic.node.nextEl.id.should.equal('li2');
  });

  it('should send action updateBinderState when elements are updated', sinon.test(function() {
    this.mock(actions).expects('_updateBinderState')
      .once()
      .withArgs('1', sinon.match.object);
    const Component = React.createClass({
      render: function() {
        return (
          <MosaicBinder binderId="1" active={true} focusedElementId="li2">
            {this.props.elems.map(el => <li key={el.id} id={el.id}></li>)}
          </MosaicBinder>
        );
      },
    });
    const elems = [];
    const mosaic = mount(<Component elems={elems}/>);
    mosaic.setProps({elems: [{id: 1}, {id: 2}]});
  }));
});
