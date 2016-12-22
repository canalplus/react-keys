import React from 'react';
import Binder from '../Binder';
import { createStore, combineReducers } from 'redux';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { keyDown, keyUp } from '../../../test/helpers';
import { keysInit, keysReducer, keys } from '../../';

describe('Binder.jsx', () => {

  let store;

  beforeEach(() => {
    store = createStore(combineReducers({ '@@keys': keysReducer }));
    keysInit({ store: store });
  });

  it('should wrap with tagName div', () => {
    const mosaic = mount(<Binder id="1"/>);
    mosaic.should.have.tagName('div');
  });

  it('should get ul as wrapper and li as children by default', sinon.test(function() {

    // _______________
    // || 1 - 2 - 3 ||
    // ||___________||

    // Given
    const stub = this.stub(window.Element.prototype, 'getBoundingClientRect');
    // wrapper call
    stub.onCall(0).returns({ top: 0, left: 0, right: 50, bottom: 10, width: 10, height: 10 });
    // first li call
    stub.onCall(0).returns({ top: 0, left: 0, right: 10, bottom: 10, width: 10, height: 10 });
    // second li call
    stub.onCall(1).returns({ top: 0, left: 10, right: 20, bottom: 10, width: 10, height: 10 });
    // third li call
    stub.onCall(2).returns({ top: 0, left: 20, right: 30, bottom: 10, width: 10, height: 10 });
    // fourth li call
    stub.onCall(3).returns({ top: 0, left: 30, right: 40, bottom: 10, width: 10, height: 10 });

    // When
    const id = "1";
    mount(<Binder id={id}>
      <ul>
        <li id="01"></li>
        <li id="02"></li>
        <li id="03"></li>
      </ul>
    </Binder>);

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
    keyDown(keys.RIGHT);

    // Then stay on last child
    const movedState3 = store.getState()['@@keys'][id];
    const movedCurrent3 = store.getState()['@@keys']['current'];
    movedState3.selectedId.should.equal('03');
    movedCurrent3.binderId.should.equal('1');
    movedCurrent3.selectedId.should.equal('03');

  }));
});
