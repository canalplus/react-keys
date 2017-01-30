import React from 'react';
import Binder from '../Binder';
import { createStore, combineReducers } from 'redux';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { keyDown, keyUp } from '../../../test/helpers';
import { keysInit, keysReducer, keys, block, unblock } from '../../';

describe('Binder', () => {

  let store;

  beforeEach(() => {
    store = createStore(combineReducers({ '@@keys': keysReducer }));
    keysInit({ store: store });
  });

  it('should wrap with tagName div', () => {
    const mosaic = mount(<Binder id="1"/>);
    mosaic.should.have.tagName('div');
  });

  it('should setup wrapper and children with custom tag', sinon.test(function() {

    // Setup
    const wrapperBCR = { top: 0, left: 0, right: 10, bottom: 10, width: 10, height: 10 };
    const fistChild = { top: 0, left: 0, right: 10, bottom: 10, width: 10, height: 10 };
    this.stub(window.Element.prototype, 'getBoundingClientRect')
      .onCall(0).returns(fistChild)
      .onCall(1).returns(wrapperBCR)
      .onCall(2).returns(fistChild);

    // Given
    const id = "1";
    mount(<div id="wrapper">
      <Binder id={id} wrapper="#wrapper" selector="div">
        <div id="01"></div>
      </Binder>
    </div>, {
      attachTo: document.getElementById('container'),
    });

    // Then
    const state = store.getState()['@@keys'][id];
    const current = store.getState()['@@keys']['current'];
    state.active.should.be.true;
    state.wrapper.should.have.not.be.empty;
    state.elements.should.have.lengthOf(1);
    state.selectedId.should.equal('01');
    current.binderId.should.equal('1');
    current.selectedId.should.equal('01');

  }));

  it('should navigate on right', sinon.test(function() {

    // _______________
    // || 1 - 2 - 3 ||
    // ||___________||

    // Setup
    const wrapperBCR = { top: 0, left: 0, right: 50, bottom: 10, width: 10, height: 10 };
    const firstLiBCR = { top: 0, left: 10, right: 20, bottom: 10, width: 10, height: 10 };
    const secondLiBCR = { top: 0, left: 20, right: 30, bottom: 10, width: 10, height: 10 };
    const thirdLiBCR = { top: 0, left: 30, right: 40, bottom: 10, width: 10, height: 10 };

    const stub = this.stub(window.Element.prototype, 'getBoundingClientRect');
    stub.onCall(0).returns(firstLiBCR)
      .onCall(1).returns(secondLiBCR)
      .onCall(2).returns(thirdLiBCR)
      .onCall(3).returns(wrapperBCR)
      .onCall(4).returns(firstLiBCR);

    // Given
    const id = "1";
    mount(<Binder id={id}>
      <ul>
        <li id="01"></li>
        <li id="02"></li>
        <li id="03"></li>
      </ul>
    </Binder>, {
      attachTo: document.getElementById('container'),
    });

    const state = store.getState()['@@keys'][id];
    const current = store.getState()['@@keys']['current'];
    state.active.should.be.true;
    state.wrapper.should.have.not.be.empty;
    state.elements.should.have.lengthOf(3);
    state.selectedId.should.equal('01');
    current.binderId.should.equal('1');
    current.selectedId.should.equal('01');

    // When
    stub.onCall(5).returns(firstLiBCR)
      .onCall(6).returns(secondLiBCR);
    keyDown(keys.RIGHT);

    // Then I move to right
    const movedState = store.getState()['@@keys'][id];
    const movedCurrent = store.getState()['@@keys']['current'];
    movedState.selectedId.should.equal('02');
    movedCurrent.binderId.should.equal('1');
    movedCurrent.selectedId.should.equal('02');

    // When
    keyUp(keys.RIGHT); // I need to keyUp to unlock callback
    this.clock.tick(10); // I need to tick 10 to unlock Binder
    stub.onCall(7).returns(secondLiBCR)
      .onCall(8).returns(thirdLiBCR);
    keyDown(keys.RIGHT);

    // Then I move to right
    const movedState2 = store.getState()['@@keys'][id];
    const movedCurrent2 = store.getState()['@@keys']['current'];
    movedState2.selectedId.should.equal('03');
    movedCurrent2.binderId.should.equal('1');
    movedCurrent2.selectedId.should.equal('03');

    // When
    keyUp(keys.RIGHT); // I need to keyUp to unlock callback
    this.clock.tick(10); // I need to tick 10 to unlock Binder
    stub.onCall(9).returns(secondLiBCR)
      .onCall(10).returns(thirdLiBCR);
    keyDown(keys.RIGHT);

    // Then stay on last child
    const movedState3 = store.getState()['@@keys'][id];
    const movedCurrent3 = store.getState()['@@keys']['current'];
    movedState3.selectedId.should.equal('03');
    movedCurrent3.binderId.should.equal('1');
    movedCurrent3.selectedId.should.equal('03');

    // release keys
    keyUp(keys.RIGHT);
    this.clock.tick(10);
  }));

  it('should navigate on bottom', sinon.test(function() {

    //_____
    //| 1 |
    //| 2 |
    //| 3 |
    //-----

    // Setup
    const wrapperBCR = { top: 0, left: 0, right: 10, bottom: 40, width: 10, height: 10 };
    const firstLiBCR = { top: 10, left: 0, right: 10, bottom: 20, width: 10, height: 10 };
    const secondLiBCR = { top: 20, left: 0, right: 10, bottom: 30, width: 10, height: 10 };
    const thirdLiBCR = { top: 30, left: 0, right: 10, bottom: 40, width: 10, height: 10 };

    const stub = this.stub(window.Element.prototype, 'getBoundingClientRect');
    stub.onCall(0).returns(firstLiBCR)
      .onCall(1).returns(secondLiBCR)
      .onCall(2).returns(thirdLiBCR)
      .onCall(3).returns(wrapperBCR)
      .onCall(4).returns(firstLiBCR);

    // Given
    const id = "1";
    mount(<Binder id={id}>
      <ul>
        <li id="01"></li>
        <li id="02"></li>
        <li id="03"></li>
      </ul>
    </Binder>, {
      attachTo: document.getElementById('container'),
    });

    // Then
    const state = store.getState()['@@keys'][id];
    const current = store.getState()['@@keys']['current'];
    state.active.should.be.true;
    state.wrapper.should.have.not.be.empty;
    state.elements.should.have.lengthOf(3);
    state.selectedId.should.equal('01');
    current.binderId.should.equal('1');
    current.selectedId.should.equal('01');

    // When
    stub.onCall(5).returns(firstLiBCR)
      .onCall(6).returns(secondLiBCR);
    keyDown(keys.DOWN);

    // Then I move to bottom
    const movedState = store.getState()['@@keys'][id];
    const movedCurrent = store.getState()['@@keys']['current'];
    movedState.selectedId.should.equal('02');
    movedCurrent.binderId.should.equal('1');
    movedCurrent.selectedId.should.equal('02');

    // When
    keyUp(keys.DOWN); // I need to keyUp to unlock callback
    this.clock.tick(10); // I need to tick 10 to unlock Binder
    stub.onCall(7).returns(secondLiBCR)
      .onCall(8).returns(thirdLiBCR);
    keyDown(keys.DOWN);

    // Then I move to bottom
    const movedState2 = store.getState()['@@keys'][id];
    const movedCurrent2 = store.getState()['@@keys']['current'];
    movedState2.selectedId.should.equal('03');
    movedCurrent2.binderId.should.equal('1');
    movedCurrent2.selectedId.should.equal('03');

    // When
    keyUp(keys.DOWN); // I need to keyUp to unlock callback
    this.clock.tick(10); // I need to tick 10 to unlock Binder
    stub.onCall(9).returns(secondLiBCR)
      .onCall(10).returns(thirdLiBCR);
    keyDown(keys.DOWN);

    // Then stay on last child
    const movedState3 = store.getState()['@@keys'][id];
    const movedCurrent3 = store.getState()['@@keys']['current'];
    movedState3.selectedId.should.equal('03');
    movedCurrent3.binderId.should.equal('1');
    movedCurrent3.selectedId.should.equal('03');

    // release keys
    keyUp(keys.DOWN);
    this.clock.tick(10);

  }));

  it('should exec callback on enter', sinon.test(function() {
    // Setup
    const spy = this.spy();
    const wrapperBCR = { top: 0, left: 0, right: 10, bottom: 10, width: 10, height: 10 };
    const fistChild = { top: 0, left: 0, right: 10, bottom: 10, width: 10, height: 10 };
    this.stub(window.Element.prototype, 'getBoundingClientRect')
      .onCall(0).returns(fistChild)
      .onCall(1).returns(wrapperBCR)
      .onCall(2).returns(fistChild);

    // Given
    const id = "1";
    mount(
      <Binder id={id} onEnter={spy}>
        <ul id="wrapper">
          <li id="01"></li>
        </ul>
      </Binder>, {
        attachTo: document.getElementById('container'),
      });

    // When
    keyDown(keys.ENTER);

    // Then
    spy.should.have.been.calledOnce;

    // release keys
    keyUp(keys.ENTER);
    this.clock.tick(10);
  }));

  it('should call refreshState on update', sinon.test(function() {

    const wrapperBCR = { top: 0, left: 0, right: 20, bottom: 10, width: 20, height: 10 };
    const fistChild = { top: 0, left: 0, right: 10, bottom: 10, width: 10, height: 10 };
    this.stub(window.Element.prototype, 'getBoundingClientRect')
      .onCall(0).returns(fistChild)
      .onCall(1).returns(wrapperBCR)
      .onCall(2).returns(fistChild);

    // Given
    let children = <li id="01"></li>;
    const binder = mount(
      <Binder id={"1"}>
        <ul id="wrapper">
          {children}
        </ul>
      </Binder>, {
        attachTo: document.getElementById('container'),
      });

    this.mock(Binder.prototype)
      .expects('refreshState')
      .once();

    binder.update();

  }));

  it('should not call when key is blocked', sinon.test(function() {
    // Setup
    const spy = this.spy();
    const wrapperBCR = { top: 0, left: 0, right: 10, bottom: 10, width: 10, height: 10 };
    const fistChild = { top: 0, left: 0, right: 10, bottom: 10, width: 10, height: 10 };
    this.stub(window.Element.prototype, 'getBoundingClientRect')
      .onCall(0).returns(fistChild)
      .onCall(1).returns(wrapperBCR)
      .onCall(2).returns(fistChild);

    // Given
    const id = "1";
    mount(
      <Binder id={id} onEnter={spy}>
        <ul id="wrapper">
          <li id="01"></li>
        </ul>
      </Binder>, {
        attachTo: document.getElementById('container'),
      });

    // When
    block(keys.ENTER);
    keyDown(keys.ENTER);

    // Then
    spy.should.have.been.callCount(0);

    // release keys
    keyUp(keys.ENTER);
    unblock(keys.ENTER);
    this.clock.tick(10);
  }));

  it('should not call when binder id is blocked', sinon.test(function() {
    // Setup
    const spy = this.spy();
    const wrapperBCR = { top: 0, left: 0, right: 10, bottom: 10, width: 10, height: 10 };
    const fistChild = { top: 0, left: 0, right: 10, bottom: 10, width: 10, height: 10 };
    this.stub(window.Element.prototype, 'getBoundingClientRect')
      .onCall(0).returns(fistChild)
      .onCall(1).returns(wrapperBCR)
      .onCall(2).returns(fistChild);

    // Given
    const id = "1";
    mount(
      <Binder id={id} onEnter={spy}>
        <ul id="wrapper">
          <li id="01"></li>
        </ul>
      </Binder>, {
        attachTo: document.getElementById('container'),
      });

    // When
    block(id);
    keyDown(keys.ENTER);

    // Then
    spy.should.have.been.callCount(0);

    // release keys
    keyUp(keys.ENTER);
    unblock(id);
    this.clock.tick(10);
  }));

});
