/* eslint no-unused-expressions:0 */
/* eslint no-unused-vars:0 */
import React from 'react';
import StrapeBinder from '../src/StrapeBinder';
import {shallow, mount} from 'enzyme';
import {DOWN, UP, BACK} from '../src/keys';
import * as actions from '../src/redux/actions';
import * as listener from '../src/listener';
import * as funcHandler from '../src/funcHandler';
import * as calculation from '../src/calculateNewState';
import * as next from '../src/nextFocusedElement';
import * as clock from '../src/clock';
import * as active from '../src/isActive';
import * as engine from '../src/engines/strape';
import {expect} from 'chai';
import sinon from 'sinon';

describe('StrapeBinder.jsx', () => {
  it('should wrap with tagName div', () => {
    const keyBinder = shallow(<StrapeBinder id="1"/>);
    keyBinder.should.have.tagName('div');
  });
  it('should have right default props', () => {
    const keyBinder = mount(<StrapeBinder id="1"/>);
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
    const addToStoreSpy = this.spy(actions, 'addKeyBinderToStore');
    mount(<StrapeBinder id="1">
      <ul>
        <li id="li1"></li>
      </ul>
    </StrapeBinder>);
    refreshStateSpy.should.have.been.calledOnce;
    addToStoreSpy.should.have.been.calledOnce;
    addToStoreSpy.should.have.been.calledWith('1');
  }));

  it('should call refreshState on update', sinon.test(function() {
    const strape = mount(<StrapeBinder id="1">
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
    const strape = mount(<StrapeBinder id="1">
      <ul>
        <li id="li1"></li>
      </ul>
    </StrapeBinder>);
    strape.unmount();
    spy.should.have.been.calledOne;
  }));

  it('should set first element id', () => {
    const strape = mount(<StrapeBinder id="1" active={true}>
      <ul>
        <li id="li1"></li>
        <li id="li2"></li>
      </ul>
    </StrapeBinder>);
    strape.node.nextEl.id.should.equal('li1');
  });

  it('should set element selected', () => {
    const strape = mount(<StrapeBinder id="1" active={true} focusedElementId="li2">
      <ul>
        <li id="li1"></li>
        <li id="li2"></li>
      </ul>
    </StrapeBinder>);
    strape.node.nextEl.id.should.equal('li2');
  });

  it('should send action updateBinderState when elements are updated', sinon.test(function() {
    this.mock(actions)
      .expects('_updateBinderState')
      .once()
      .withArgs('1', sinon.match.object);
    const Component = ({elems}) => {
      return (
        <StrapeBinder id="1" active={true} focusedElementId="li2">
          <ul>
            {elems.map(el => <li key={el.id} id={el.id}></li>)}
          </ul>
        </StrapeBinder>
      );
    };
    const elems = [];
    const mosaic = mount(<Component elems={elems}/>);
    mosaic.setProps({elems: [{id: 1}, {id: 2}]});
  }));

  it('should perform action call calculateNewState with right dir', sinon.test(function() {
    const strape = new StrapeBinder();
    const dir = 'left';
    const cb = () => null;
    const exitCb = () => null;
    this.mock(strape)
      .expects('calculateNewState')
      .once()
      .withArgs(dir);
    strape.performAction(dir, cb, exitCb);
  }));

  it('should perform action call calculateBounds when stratey is bounds', sinon.test(function() {
    const strape = new StrapeBinder();
    const dir = 'left';
    const cb = () => null;
    const exitCb = () => null;
    strape.hasMoved = true;
    strape.nextEl = {};
    strape.props = {
      strategy: 'bounds',
      id: '1',
    };
    this.stub(strape, 'calculateNewState').returns(null);
    this.mock(engine)
      .expects('calculateBounds')
      .once()
      .withArgs(dir, strape.nextEl, strape.wrapperPosition, strape.marginLeft, strape.props);
    strape.performAction(dir, cb, exitCb);
  }));

  it('should perform action do not call calculateBounds when stratey is not bounds',
    sinon.test(function() {
      const strape = new StrapeBinder();
      const dir = 'left';
      const cb = () => null;
      const exitCb = () => null;
      strape.hasMoved = true;
      strape.nextEl = {};
      strape.props = {
        strategy: 'cut',
        id: '1',
      };
      this.stub(strape, 'calculateNewState').returns(null);
      this.mock(engine)
        .expects('calculateBounds')
        .never();
      strape.performAction(dir, cb, exitCb);
    }));

  it('should update selected id et exec cb when it has moved on performAction',
    sinon.test(function() {
      const strape = new StrapeBinder();
      strape.hasMoved = true;
      strape.nextEl = {
        id: 1,
        marginLeft: 0,
      };
      strape.props = {
        id: 1,
      };
      const dir = 'left';
      const cb = () => null;
      const exitCb = () => null;
      this.mock(strape)
        .expects('calculateNewState')
        .once()
        .withArgs(dir);
      const updateSelectedIdSpy = this.spy(actions, 'updateSelectedId');
      const execCbSpy = this.spy(funcHandler, 'execCb');
      const exitCbSpy = this.spy(funcHandler, 'exitTo');
      strape.performAction(dir, cb, exitCb);
      updateSelectedIdSpy.should.have.been.calledOnce;
      execCbSpy.should.have.been.calledOnce;
      exitCbSpy.should.have.been.callCount(0);
    }));

  it('should call exitCb when it has not moved on performAction', sinon.test(function() {
    const strape = new StrapeBinder();
    strape.hasMoved = false;
    strape.nextEl = {
      id: 1,
      marginLeft: 0,
    };
    strape.props = {
      id: 1,
    };
    const dir = 'left';
    const cb = () => null;
    const exitCb = () => null;
    this.mock(strape)
      .expects('calculateNewState')
      .once()
      .withArgs(dir);
    const updateSelectedIdSpy = this.spy(actions, 'updateSelectedId');
    const execCbSpy = this.spy(funcHandler, 'execCb');
    const exitCbSpy = this.spy(funcHandler, 'exitTo');
    strape.performAction(dir, cb, exitCb);
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
    const strape = new StrapeBinder();
    expect(strape.nextEl).to.be.null;
    expect(strape.prevEl).to.be.null;
    expect(strape.prevDir).to.be.null;
    strape.hasMoved.should.be.false;
    strape.calculateNewState('left');
    strape.nextEl.should.equal('1');
    strape.prevEl.should.equal('2');
    strape.prevDir.should.equal('right');
    strape.hasMoved.should.be.true;
  }));

  it('should looking for next focused element on keysHandler when it is active',
    sinon.test(function() {
      this.mock(next)
        .expects('nextFocusedElement')
        .once();
      this.stub(active, 'isActive').returns(true);
      this.stub(clock, 'isBlocked').returns(false);
      const strape = new StrapeBinder();
      strape.props = {
        id: 1,
      };
      strape.keysHandler(30);
    }));

  it('should not looking for next focused element on keysHandler when it is inactive',
    sinon.test(function() {
      this.mock(next)
        .expects('nextFocusedElement')
        .never();
      this.stub(active, 'isActive').returns(false);
      this.stub(clock, 'isBlocked').returns(true);
      const strape = new StrapeBinder();
      strape.props = {
        id: 1,
      };
      strape.keysHandler(30);
    }));

  it('should call exitBinder and init prevDir on UP key', sinon.test(function() {
    this.mock(actions)
      .expects('exitBinder')
      .once()
      .withArgs('bounds', 'myup', 'nextEl2');
    this.stub(active, 'isActive').returns(true);
    this.stub(clock, 'isBlocked').returns(false);
    const strape = new StrapeBinder();
    strape.props = {
      id: 1,
      strategy: 'bounds',
      onUpExit: 'myup',
    };
    strape.nextEl = {id: 'nextEl2'};
    strape.prevDir = 'right';
    strape.keysHandler(UP);
    expect(strape.prevDir).to.be.null;
  }));

  it('should call exitBinder and init prevDir on DOWN key', sinon.test(function() {
    this.mock(actions)
      .expects('exitBinder')
      .once()
      .withArgs('bounds', 'mydown', 'nextEl2');
    this.stub(active, 'isActive').returns(true);
    this.stub(clock, 'isBlocked').returns(false);
    const strape = new StrapeBinder();
    strape.props = {
      id: 1,
      strategy: 'bounds',
      onDownExit: 'mydown',
    };
    strape.nextEl = {id: 'nextEl2'};
    strape.prevDir = 'right';
    strape.keysHandler(DOWN);
    expect(strape.prevDir).to.be.null;
  }));

  it('should call execCb and init prevDir on BACK key', sinon.test(function() {
    this.mock(funcHandler)
      .expects('execCb')
      .once();
    this.stub(active, 'isActive').returns(true);
    this.stub(clock, 'isBlocked').returns(false);
    const strape = new StrapeBinder();
    strape.props = {
      id: 1,
    };
    strape.prevDir = 'right';
    strape.keysHandler(BACK);
    expect(strape.prevDir).to.be.null;
  }));
});
