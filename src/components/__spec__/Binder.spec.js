/* eslint react/prop-types:0 */
import React from 'react';
import Binder from '../Binder';
import { shallow, mount } from 'enzyme';
import * as actions from '../../redux/actions';
import * as listener from '../../listener';
import sinon from 'sinon';

describe('Binder.jsx', () => {
  it('should wrap with tagName div', () => {
    const mosaic = shallow(<Binder id="1"/>);
    mosaic.should.have.tagName('div');
  });

  it('should call refreshState and _addKeyBinderToStore on mount', sinon.test(function() {
    const refreshStateSpy = this.spy(Binder.prototype, 'refreshState');
    const addToStoreSpy = this.spy(actions, 'addBinderToStore');
    mount(<Binder id="1">
      <li id="li1"></li>
    </Binder>);
    refreshStateSpy.should.have.been.calledOnce;
    addToStoreSpy.should.have.been.calledOnce;
  }));

  // it('should call refreshState on update', sinon.test(function() {
  //   const mosaic = mount(<Binder id="1">
  //     <li id="li1"></li>
  //   </Binder>);
  //   const spy = this.spy(Binder.prototype, 'refreshState');
  //   mosaic.update();
  //   spy.should.have.been.calledOnce;
  // }));
  //
  // it('should call removeListener on unmout', sinon.test(function() {
  //   const spy = this.spy(listener, 'removeListener');
  //   const mosaic = mount(<Binder id="1">
  //     <li id="li1"></li>
  //   </Binder>);
  //   mosaic.unmount();
  //   spy.should.have.been.calledOne;
  // }));
  //
  // it('should send action updateBinderState when elements are updated', sinon.test(function() {
  //   this.mock(actions).expects('_updateBinder')
  //     .once()
  //     .withArgs('1', sinon.match.object);
  //   const Component = ({ elems }) => {
  //     return (
  //       <Binder id="1" active={true} focusedElementId="li2">
  //         {elems.map(el => <li key={el.id} id={el.id}></li>)}
  //       </Binder>
  //     );
  //   };
  //   const elems = [];
  //   const mosaic = mount(<Component elems={elems}/>);
  //   mosaic.setProps({ elems: [{ id: 1 }, { id: 2 }] });
  // }));
});
