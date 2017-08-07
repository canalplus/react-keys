import { createStore } from 'redux';
import { _init } from '../listener';
import { ops, reset } from '../../test/mocks';
import { addBinder } from '../redux/actions';
import {
  ensureState,
  ensureDispatch,
  ensureKnownBinder,
  isUnknownBinder,
} from '../ensure';

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
      _init(ops);
    });
  });

  describe('ensureDispatch', () => {
    it('should not throw exception when state is ok', () => {
      const fn = () => ensureDispatch();
      fn.should.not.throw(Error);
    });

    it('should throw exception when no state is present', () => {
      _init({ store: {} });
      const fn = () => ensureDispatch();
      fn.should.throw(Error);
      _init(ops);
    });
  });

  describe('ensureMountedBinder', () => {
    it('should return true when binderId exists', () => {
      const binderId = 'myId';
      addBinder({ id: binderId }, '');
      ensureKnownBinder(binderId).should.be.true;
      reset();
    });

    it('should return false when binderId does not exist', () => {
      const binderId = 'myId';
      ensureKnownBinder(binderId).should.be.false;
    });
  });

  describe('isUnmountedBinder', () => {
    it('return false when binder already exists', () => {
      const binderId = 'myId';
      addBinder({ id: binderId }, '');
      isUnknownBinder(binderId).should.be.false;
      reset();
    });

    it('return true when there is no binder in state', () => {
      reset();
      const binderId = 'myId';
      isUnknownBinder(binderId).should.be.true;
    });
  });
});
