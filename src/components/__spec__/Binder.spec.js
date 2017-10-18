import React from 'react';
import Binder from '../Binder';
import { createStore, combineReducers } from 'redux';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import { keyDown, keyUp } from '../../../test/helpers';
import { keysInit, keysReducer, block, unblock, config } from '../../';
import { findBinder } from '../../redux/helper';

describe.skip('Binder', () => {
  let store;

  beforeEach(() => {
    store = createStore(combineReducers({ '@@keys': keysReducer }));
    keysInit({ store: store });
  });

  it('should wrap with tagName div', () => {
    const mosaic = mount(<Binder id="1" />);
    mosaic.should.have.tagName('div');
    mosaic.unmount();
  });

  it(
    'should setup wrapper and children with custom tag',
    sinon.test(function() {
      // Setup
      const wrapperBCR = {
        top: 0,
        left: 0,
        right: 10,
        bottom: 10,
        width: 10,
        height: 10,
      };
      const fistChild = {
        top: 0,
        left: 0,
        right: 10,
        bottom: 10,
        width: 10,
        height: 10,
      };
      this.stub(window.Element.prototype, 'getBoundingClientRect')
        .onCall(0)
        .returns(fistChild)
        .onCall(1)
        .returns(wrapperBCR)
        .onCall(2)
        .returns(fistChild);

      // Given
      const id = '1';
      const binder = mount(
        <div id="wrapper">
          <Binder id={id} wrapper="#wrapper" selector="div">
            <div id="01" />
          </Binder>
        </div>,
        {
          attachTo: document.getElementById('container'),
        }
      );

      // Then
      const binders = store.getState()['@@keys'].binders;
      const state = findBinder(binders, id);

      const current = store.getState()['@@keys']['current'];
      state.active.should.be.true;
      state.elements.should.have.lengthOf(1);
      state.selectedId.should.equal('01');
      current.binderId.should.equal('1');
      current.selectedId.should.equal('01');

      binder.unmount();
    })
  );

  it(
    'should navigate on right',
    sinon.test(function() {
      // _______________
      // || 1 - 2 - 3 ||
      // ||___________||

      // Setup
      const wrapperBCR = {
        top: 0,
        left: 0,
        right: 50,
        bottom: 10,
        width: 10,
        height: 10,
      };
      const firstLiBCR = {
        top: 0,
        left: 10,
        right: 20,
        bottom: 10,
        width: 10,
        height: 10,
      };
      const secondLiBCR = {
        top: 0,
        left: 20,
        right: 30,
        bottom: 10,
        width: 10,
        height: 10,
      };
      const thirdLiBCR = {
        top: 0,
        left: 30,
        right: 40,
        bottom: 10,
        width: 10,
        height: 10,
      };

      const stub = this.stub(window.Element.prototype, 'getBoundingClientRect');
      stub
        .onCall(0)
        .returns(firstLiBCR)
        .onCall(1)
        .returns(secondLiBCR)
        .onCall(2)
        .returns(thirdLiBCR)
        .onCall(3)
        .returns(wrapperBCR)
        .onCall(4)
        .returns(firstLiBCR);

      // Given
      const id = '1';
      const binder = mount(
        <Binder id={id}>
          <ul>
            <li id="01" />
            <li id="02" />
            <li id="03" />
          </ul>
        </Binder>,
        {
          attachTo: document.getElementById('container'),
        }
      );

      const state = findBinder(store.getState()['@@keys'].binders, id);
      const current = store.getState()['@@keys']['current'];
      state.active.should.be.true;
      state.elements.should.have.lengthOf(3);
      state.selectedId.should.equal('01');
      current.binderId.should.equal('1');
      current.selectedId.should.equal('01');

      // When
      stub
        .onCall(5)
        .returns(firstLiBCR)
        .onCall(6)
        .returns(secondLiBCR);
      keyDown(config().right);
      keyUp(config().right); // I need to keyUp to unlock callback

      // Then I move to right
      const movedState = findBinder(store.getState()['@@keys'].binders, id);
      const movedCurrent = store.getState()['@@keys']['current'];
      movedState.selectedId.should.equal('02');
      movedCurrent.binderId.should.equal('1');
      movedCurrent.selectedId.should.equal('02');

      // When
      this.clock.tick(10); // I need to tick 10 to unlock Binder
      stub
        .onCall(7)
        .returns(secondLiBCR)
        .onCall(8)
        .returns(thirdLiBCR);
      keyDown(config().right);
      keyUp(config().right); // I need to keyUp to unlock callback

      // Then I move to right
      const movedState2 = findBinder(store.getState()['@@keys'].binders, id);
      const movedCurrent2 = store.getState()['@@keys']['current'];
      movedState2.selectedId.should.equal('03');
      movedCurrent2.binderId.should.equal('1');
      movedCurrent2.selectedId.should.equal('03');

      // When
      this.clock.tick(10); // I need to tick 10 to unlock Binder
      stub
        .onCall(9)
        .returns(secondLiBCR)
        .onCall(10)
        .returns(thirdLiBCR);
      keyDown(config().right);
      keyUp(config().right);

      // Then stay on last child
      const movedState3 = findBinder(store.getState()['@@keys'].binders, id);
      const movedCurrent3 = store.getState()['@@keys']['current'];
      movedState3.selectedId.should.equal('03');
      movedCurrent3.binderId.should.equal('1');
      movedCurrent3.selectedId.should.equal('03');

      // release keys
      this.clock.tick(10);

      binder.unmount();
    })
  );

  it(
    'should navigate on bottom',
    sinon.test(function() {
      //_____
      //| 1 |
      //| 2 |
      //| 3 |
      //-----

      // Setup
      const wrapperBCR = {
        top: 0,
        left: 0,
        right: 10,
        bottom: 40,
        width: 10,
        height: 10,
      };
      const firstLiBCR = {
        top: 10,
        left: 0,
        right: 10,
        bottom: 20,
        width: 10,
        height: 10,
      };
      const secondLiBCR = {
        top: 20,
        left: 0,
        right: 10,
        bottom: 30,
        width: 10,
        height: 10,
      };
      const thirdLiBCR = {
        top: 30,
        left: 0,
        right: 10,
        bottom: 40,
        width: 10,
        height: 10,
      };

      const stub = this.stub(window.Element.prototype, 'getBoundingClientRect');
      stub
        .onCall(0)
        .returns(firstLiBCR)
        .onCall(1)
        .returns(secondLiBCR)
        .onCall(2)
        .returns(thirdLiBCR)
        .onCall(3)
        .returns(wrapperBCR)
        .onCall(4)
        .returns(firstLiBCR);

      // Given
      const id = '1';
      const binder = mount(
        <Binder id={id}>
          <ul>
            <li id="01" />
            <li id="02" />
            <li id="03" />
          </ul>
        </Binder>,
        {
          attachTo: document.getElementById('container'),
        }
      );

      // Then
      const state = findBinder(store.getState()['@@keys'].binders, id);
      const current = store.getState()['@@keys']['current'];
      state.active.should.be.true;
      state.elements.should.have.lengthOf(3);
      state.selectedId.should.equal('01');
      current.binderId.should.equal('1');
      current.selectedId.should.equal('01');

      // When
      stub
        .onCall(5)
        .returns(firstLiBCR)
        .onCall(6)
        .returns(secondLiBCR);
      keyDown(config().down);
      keyUp(config().down); // I need to keyUp to unlock callback

      // Then I move to bottom
      const movedState = findBinder(store.getState()['@@keys'].binders, id);
      const movedCurrent = store.getState()['@@keys']['current'];
      movedState.selectedId.should.equal('02');
      movedCurrent.binderId.should.equal('1');
      movedCurrent.selectedId.should.equal('02');

      // When
      this.clock.tick(10); // I need to tick 10 to unlock Binder
      stub
        .onCall(7)
        .returns(secondLiBCR)
        .onCall(8)
        .returns(thirdLiBCR);
      keyDown(config().down);
      keyUp(config().down); // I need to keyUp to unlock callback

      // Then I move to bottom
      const movedState2 = findBinder(store.getState()['@@keys'].binders, id);
      const movedCurrent2 = store.getState()['@@keys']['current'];
      movedState2.selectedId.should.equal('03');
      movedCurrent2.binderId.should.equal('1');
      movedCurrent2.selectedId.should.equal('03');

      // When
      this.clock.tick(10); // I need to tick 10 to unlock Binder
      stub
        .onCall(9)
        .returns(secondLiBCR)
        .onCall(10)
        .returns(thirdLiBCR);
      keyDown(config().down);
      keyUp(config().down);

      // Then stay on last child
      const movedState3 = findBinder(store.getState()['@@keys'].binders, id);
      const movedCurrent3 = store.getState()['@@keys']['current'];
      movedState3.selectedId.should.equal('03');
      movedCurrent3.binderId.should.equal('1');
      movedCurrent3.selectedId.should.equal('03');

      this.clock.tick(10);

      binder.unmount();
    })
  );

  it(
    'should exec callback on enter',
    sinon.test(function() {
      // Setup
      const spy = this.spy();
      const wrapperBCR = {
        top: 0,
        left: 0,
        right: 10,
        bottom: 10,
        width: 10,
        height: 10,
      };
      const fistChild = {
        top: 0,
        left: 0,
        right: 10,
        bottom: 10,
        width: 10,
        height: 10,
      };
      this.stub(window.Element.prototype, 'getBoundingClientRect')
        .onCall(0)
        .returns(fistChild)
        .onCall(1)
        .returns(wrapperBCR)
        .onCall(2)
        .returns(fistChild);

      // Given
      const id = '1';
      const binder = mount(
        <Binder id={id} onEnter={spy}>
          <ul id="wrapper">
            <li id="01" />
          </ul>
        </Binder>,
        {
          attachTo: document.getElementById('container'),
        }
      );

      // When
      keyDown(config().enter);
      keyUp(config().enter);

      // Then
      spy.should.have.been.calledOnce;

      this.clock.tick(10);

      binder.unmount();
    })
  );

  it(
    'should call refreshState on update',
    sinon.test(function() {
      const wrapperBCR = {
        top: 0,
        left: 0,
        right: 20,
        bottom: 10,
        width: 20,
        height: 10,
      };
      const fistChild = {
        top: 0,
        left: 0,
        right: 10,
        bottom: 10,
        width: 10,
        height: 10,
      };
      this.stub(window.Element.prototype, 'getBoundingClientRect')
        .onCall(0)
        .returns(fistChild)
        .onCall(1)
        .returns(wrapperBCR)
        .onCall(2)
        .returns(fistChild);

      // Given
      let children = <li id="01" />;
      const binder = mount(
        <Binder id={'1'}>
          <ul id="wrapper">{children}</ul>
        </Binder>,
        {
          attachTo: document.getElementById('container'),
        }
      );

      this.mock(Binder.prototype)
        .expects('refreshState')
        .once();

      binder.update();
      binder.unmount();
    })
  );

  it(
    'should not call when key is blocked',
    sinon.test(function() {
      // Setup
      const spy = this.spy();
      const wrapperBCR = {
        top: 0,
        left: 0,
        right: 10,
        bottom: 10,
        width: 10,
        height: 10,
      };
      const fistChild = {
        top: 0,
        left: 0,
        right: 10,
        bottom: 10,
        width: 10,
        height: 10,
      };
      this.stub(window.Element.prototype, 'getBoundingClientRect')
        .onCall(0)
        .returns(fistChild)
        .onCall(1)
        .returns(wrapperBCR)
        .onCall(2)
        .returns(fistChild);

      // Given
      const id = '1';
      const binder = mount(
        <Binder id={id} onEnter={spy}>
          <ul id="wrapper">
            <li id="01" />
          </ul>
        </Binder>,
        {
          attachTo: document.getElementById('container'),
        }
      );

      // When
      block(config().enter);
      keyDown(config().enter);
      keyUp(config().enter);

      // Then
      spy.should.have.been.callCount(0);

      // release keys
      unblock(config().enter);
      this.clock.tick(10);

      binder.unmount();
    })
  );

  it(
    'should not call when binder id is blocked',
    sinon.test(function() {
      // Setup
      const spy = this.spy();
      const wrapperBCR = {
        top: 0,
        left: 0,
        right: 10,
        bottom: 10,
        width: 10,
        height: 10,
      };
      const fistChild = {
        top: 0,
        left: 0,
        right: 10,
        bottom: 10,
        width: 10,
        height: 10,
      };
      this.stub(window.Element.prototype, 'getBoundingClientRect')
        .onCall(0)
        .returns(fistChild)
        .onCall(1)
        .returns(wrapperBCR)
        .onCall(2)
        .returns(fistChild);

      // Given
      const id = '1';
      const binder = mount(
        <Binder id={id} onEnter={spy}>
          <ul id="wrapper">
            <li id="01" />
          </ul>
        </Binder>,
        {
          attachTo: document.getElementById('container'),
        }
      );

      // When
      block(id);
      keyDown(config().enter);

      // Then
      spy.should.have.been.callCount(0);

      // release keys
      keyUp(config().enter);
      unblock(id);
      this.clock.tick(10);

      binder.unmount();
    })
  );

  it('should remove binder state when component is unmounted', () => {
    // Given
    const binder = mount(<Binder id="batman" />);

    // When
    binder.unmount();

    // Then
    expect(store.getState()['@@keys'].batman).to.equal(undefined);
  });

  it('should not remove component when strategy is "memory"', () => {
    // Given
    const binder = mount(<Binder id="robin" strategy="memory" />);

    // When
    binder.unmount();

    // Then
    expect(findBinder(store.getState()['@@keys'].binders, 'robin').id).to.equal(
      'robin'
    );
  });
});
