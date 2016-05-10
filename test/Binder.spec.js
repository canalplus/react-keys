/* eslint no-unused-expressions:0 */
/* eslint no-unused-vars:0 */
import React from 'react';
import Binder from '../src/Binder';
import {shallow, mount} from 'enzyme';
import * as actions from '../src/redux/actions';
import * as listener from '../src/listener';
import * as funcHandler from '../src/funcHandler';
import * as calculation from '../src/calculateNewState';
import * as next from '../src/nextFocusedElement';
import * as clock from '../src/clock';
import * as active from '../src/isActive';
import sinon from 'sinon';
import {expect} from 'chai';

describe('Binder.jsx', () => {
  it('should wrap with tagName div', () => {
    const mosaic = shallow(<Binder id="1"/>);
    mosaic.should.have.tagName('div');
  });

  it('should call refreshState and _addKeyBinderToStore on mount', sinon.test(function() {
    const refreshStateSpy = this.spy(Binder.prototype, 'refreshState');
    const addToStoreSpy = this.spy(actions, '_addKeyBinderToStore');
    mount(<Binder id="1">
      <li id="li1"></li>
    </Binder>);
    refreshStateSpy.should.have.been.calledOnce;
    addToStoreSpy.should.have.been.calledOnce;
    addToStoreSpy.should.have.been.calledWith('1');
  }));

  it('should call refreshState on update', sinon.test(function() {
    const mosaic = mount(<Binder id="1">
      <li id="li1"></li>
    </Binder>);
    const spy = this.spy(Binder.prototype, 'refreshState');
    mosaic.update();
    spy.should.have.been.calledOnce;
  }));

  it('should call removeListener on unmout', sinon.test(function() {
    const spy = this.spy(listener, 'removeListener');
    const mosaic = mount(<Binder id="1">
      <li id="li1"></li>
    </Binder>);
    mosaic.unmount();
    spy.should.have.been.calledOne;
  }));

  it('should set first element id', () => {
    const mosaic = mount(<Binder id="1" active={true}>
      <li id="li1"></li>
      <li id="li2"></li>
    </Binder>);
    mosaic.node.nextEl.id.should.equal('li1');
  });

  it('should set element selected', () => {
    const mosaic = mount(<Binder id="1" active={true} focusedElementId="li2">
      <li id="li1"></li>
      <li id="li2"></li>
    </Binder>);
    mosaic.node.nextEl.id.should.equal('li2');
  });

  it('should set element selected', () => {
    const mosaic = mount(<Binder id="1" active={true} focusedElementId="li2">
      <li id="li1"></li>
      <li id="li2"></li>
    </Binder>);
    mosaic.node.nextEl.id.should.equal('li2');
  });

  it('should send action updateBinderState when elements are updated', sinon.test(function() {
    this.mock(actions).expects('_updateBinderState')
      .once()
      .withArgs('1', sinon.match.object);
    const Component = ({elems}) => {
      return (
        <Binder id="1" active={true} focusedElementId="li2">
          {elems.map(el => <li key={el.id} id={el.id}></li>)}
        </Binder>
      );
    };
    const elems = [];
    const mosaic = mount(<Component elems={elems}/>);
    mosaic.setProps({elems: [{id: 1}, {id: 2}]});
  }));

  it('should perform action call calculateNewState with right dir', sinon.test(function() {
    const mosaic = new Binder();
    const dir = 'left';
    const cb = () => null;
    const exitCb = () => null;
    this.mock(mosaic)
      .expects('calculateNewState')
      .once()
      .withArgs(dir);
    mosaic.performAction(dir, cb, exitCb);
  }));

  it('should update selected id et exec cb when it has moved on performAction',
    sinon.test(function() {
      const mosaic = new Binder();
      mosaic.hasMoved = true;
      mosaic.nextEl = {
        id: 1,
        marginLeft: 0,
      };
      mosaic.props = {
        id: 1,
      };
      const dir = 'left';
      const cb = () => null;
      const exitCb = () => null;
      this.mock(mosaic)
        .expects('calculateNewState')
        .once()
        .withArgs(dir);
      const updateSelectedIdSpy = this.spy(actions, '_updateSelectedId');
      const execCbSpy = this.spy(funcHandler, 'execCb');
      const exitCbSpy = this.spy(funcHandler, 'exitTo');
      mosaic.performAction(dir, cb, exitCb);
      updateSelectedIdSpy.should.have.been.calledOnce;
      execCbSpy.should.have.been.calledOnce;
      exitCbSpy.should.have.been.callCount(0);
    }));

  it('should call exitCb when it has not moved on performAction', sinon.test(function() {
    const mosaic = new Binder();
    mosaic.hasMoved = false;
    mosaic.nextEl = {
      id: 1,
      marginLeft: 0,
    };
    mosaic.props = {
      id: 1,
    };
    const dir = 'left';
    const cb = () => null;
    const exitCb = () => null;
    this.mock(mosaic)
      .expects('calculateNewState')
      .once()
      .withArgs(dir);
    const updateSelectedIdSpy = this.spy(actions, '_updateSelectedId');
    const execCbSpy = this.spy(funcHandler, 'execCb');
    const exitCbSpy = this.spy(funcHandler, 'exitTo');
    mosaic.performAction(dir, cb, exitCb);
    updateSelectedIdSpy.should.have.been.callCount(0);
    execCbSpy.should.have.been.callCount(0);
    exitCbSpy.should.have.been.calledOnce;
  }));

  it('should calculateNewState set new props to component', sinon.test(function() {
    this.stub(calculation, 'calculateNewState').returns({
      nextEl: '1',
      prevEl: '2',
      prevDir: 'right',
      hasMoved: true,
    });
    const mosaic = new Binder();
    expect(mosaic.nextEl).to.be.null;
    expect(mosaic.prevEl).to.be.null;
    expect(mosaic.prevDir).to.be.null;
    mosaic.hasMoved.should.be.false;
    mosaic.calculateNewState('left');
    mosaic.nextEl.should.equal('1');
    mosaic.prevEl.should.equal('2');
    mosaic.prevDir.should.equal('right');
    mosaic.hasMoved.should.be.true;
  }));

  it('should looking for next focused element on keysHandler when it is active',
    sinon.test(function() {
      this.mock(next)
        .expects('nextFocusedElement')
        .once();
      this.stub(active, 'isActive').returns(true);
      this.stub(clock, 'isBlocked').returns(false);
      const mosaic = new Binder();
      mosaic.props = {
        id: 1,
      };
      mosaic.keysHandler(30);
    }));

  it('should not looking for next focused element on keysHandler when it is inactive',
    sinon.test(function() {
      this.mock(next)
        .expects('nextFocusedElement')
        .never();
      this.stub(active, 'isActive').returns(false);
      this.stub(clock, 'isBlocked').returns(true);
      const mosaic = new Binder();
      mosaic.props = {
        id: 1,
      };
      mosaic.keysHandler(30);
    }));
});
