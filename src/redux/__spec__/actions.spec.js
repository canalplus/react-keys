import {
  _activeBinder,
  _updateBinder,
  addBinder,
  determineNewState,
  enterTo,
  execCb,
  resetFlipFlop,
} from '../actions';
import * as ensure from '../../ensure';
import { ensureKnownBinder } from '../../ensure';
import * as strategy from '../../engines/strategy';
import * as helpers from '../../engines/helpers';
import * as bounds from '../../engines/bounds';
import sinon from 'sinon';
import * as store from '../../store';

const props = {
  id: 'myId',
  selectedId: 'first',
  active: false,
  selector: 'li',
  gap: 0,
  boundedGap: 0,
  topGap: 0,
  rightGap: 0,
  leftGap: 0,
  downGap: 0,
  nextEl: {},
  elements: [{ id: 'myId' }],
  strategy: 'none',
};

const type = 'BINDER';

describe('redux/actions.js', () => {
  describe('addBinder', () => {
    it(
      'should call isUnknownBinder',
      sinon.test(function() {
        this.mock(ensure)
          .expects('isUnknownBinder')
          .once();
        this.stub(store, 'dispatch').returns(null);
        addBinder(props, type);
      })
    );

    it(
      'should mount binder with priority if binder is already known',
      sinon.test(function() {
        this.mock(store)
          .expects('dispatch')
          .once()
          .withArgs({
            binderId: 'myId',
            priority: 2,
            type: '@@keys/MOUNT_BINDER',
          });
        this.stub(ensure, 'isUnknownBinder').returns(false);
        addBinder({ ...props, priority: 2 }, type);
      })
    );

    it(
      'should add binder if binder is new',
      sinon.test(function() {
        this.mock(store)
          .expects('dispatch')
          .once()
          .withArgs(sinon.match.has('type', '@@keys/ADD_BINDER'));
        this.stub(ensure, 'isUnknownBinder').returns(true);
        addBinder(props, type);
      })
    );
  });
  describe('_updateBinder', () => {
    it(
      'should call ensureKnownBinder',
      sinon.test(function() {
        const id = 'myId';
        this.mock(ensure)
          .expects('ensureKnownBinder')
          .once()
          .withArgs(id);
        _updateBinder({ id });
      })
    );
  });

  describe('activateBinder', () => {
    it(
      'should call ensureKnownBinder',
      sinon.test(function() {
        const binderId = 'myId';
        this.stub(strategy, 'findIdByStrategy').returns({});
        this.stub(helpers, 'calculateElSpace').returns({});
        this.stub(bounds, 'boundsMargin').returns({});
        this.stub(store, 'getBinders').returns([]);
        this.mock(ensure)
          .expects('ensureKnownBinder')
          .atLeast(1)
          .withArgs(binderId);
        _activeBinder(binderId, {});
      })
    );
  });

  describe('determineNewState', () => {
    it(
      'should call ensureUnmountedBinder',
      sinon.test(function() {
        const binderId = 'myId';
        this.stub(store, 'getBinders').returns([]);
        this.stub(helpers, 'calculateNewState').returns({
          nextEl: { id: 'myId' },
        });
        this.mock(ensure)
          .expects('ensureKnownBinder')
          .once() // because of _updateBinderState
          .withArgs(binderId);
        addBinder(props, type);
        determineNewState(binderId, 'dir');
      })
    );

    it(
      'should not call calculate new state if nextEl does not exist',
      sinon.test(function() {
        this.mock(helpers)
          .expects('calculateNewState')
          .never();
        this.stub(store, 'getBinders').returns([]);
        addBinder({ ...props, nextEl: null }, type);
        determineNewState(props.id, 'dir');
      })
    );
  });

  describe('resetFlipFlop', () => {
    it(
      'should call ensureKnownBinder',
      sinon.test(function() {
        const binderId = 'myId';
        this.mock(ensure)
          .expects('ensureKnownBinder')
          .once() // because of _updateBinderState
          .withArgs(binderId);
        this.stub(store, 'getBinders').returns([]);
        addBinder({ ...props, memory: true }, type);
        resetFlipFlop('myId');
      })
    );
  });

  describe('execCb', () => {
    it('should not throw error if function is null', () => {
      execCb(null);
    });

    it('should call function this next element', () => {
      const spy = sinon.spy();
      const el = { id: 1 };
      execCb(spy, el);
      spy.should.have.been.calledOnce;
      spy.should.have.been.calledWith(el);
    });

    it('should call function with {} has nextEl if nextEl is null', () => {
      const spy = sinon.spy();
      execCb(spy, null);
      spy.should.have.been.calledOnce;
      spy.should.have.been.calledWith({});
    });
  });
  describe('enterTo', () => {
    it('should not throw error if function is null', () => {
      enterTo(null);
    });

    it(
      'should call function when callback is a func',
      sinon.test(function() {
        this.stub(ensure, 'isUnknownBinder').returns(false);
        const spy = this.spy();
        enterTo(spy);
        spy.should.have.been.calledOnce;
      })
    );
  });
});
