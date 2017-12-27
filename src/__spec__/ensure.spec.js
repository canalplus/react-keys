import { createStore } from 'redux';
import { _init } from '../listener';
import { ensureKnownBinder, ensureState, isUnknownBinder } from '../ensure';
import * as store from '../store';
import sinon from 'sinon';

describe('ensure', () => {
  describe('ensureState', () => {
    it('should not throw exception when state is ok', () => {
      const fn = () => ensureState();
      fn.should.not.throw(Error);
    });

    it('should throw exception when react-key state is not present', () => {
      _init({ store: createStore(() => ({}), {}) });
      const fn = () => ensureState();
      fn.should.throw(Error);
    });
  });

  describe('ensureMountedBinder', () => {
    it(
      'should return true when binderId exists',
      sinon.test(function() {
        const binderId = 'myId';
        this.stub(store, 'getBinders').returns([{ id: binderId }]);
        ensureKnownBinder(binderId).should.be.true;
      })
    );

    it(
      'should return false when binderId does not exist',
      sinon.test(function() {
        const binderId = 'myId';
        this.stub(store, 'getBinders').returns([]);
        ensureKnownBinder(binderId).should.be.false;
      })
    );
  });

  describe('isUnmountedBinder', () => {
    it(
      'return false when binder already exists',
      sinon.test(function() {
        const binderId = 'myId';
        this.stub(store, 'getBinders').returns([{ id: binderId }]);
        isUnknownBinder(binderId).should.be.false;
      })
    );

    it(
      'return true when there is no binder in state',
      sinon.test(function() {
        const binderId = 'myId';
        this.stub(store, 'getBinders').returns([]);
        isUnknownBinder(binderId).should.be.true;
      })
    );
  });
});
