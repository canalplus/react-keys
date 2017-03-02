import { createStore } from 'redux';
import { _init } from '../listener';
import { ops, reset } from '../../test/mocks';
import { addBinderToStore } from '../redux/actions';
import { ensureState, ensureDispatch, ensureMountedBinder, isUnmountedBinder } from '../ensure';

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

    it('should not throw exception when binderId exists', () => {
      const binderId = 'myId';
      addBinderToStore({ id: binderId }, '');
      const fn = () => ensureMountedBinder(binderId);
      fn.should.not.throw(Error);
      reset();
    });

    it('should throw exception when binderId does not exist', () => {
      const binderId = 'myId';
      ensureMountedBinder(binderId).should.be.false;
    });

  });

  describe('isUnmountedBinder', () => {

    it('return false when binder already exists', () => {
      const binderId = 'myId';
      addBinderToStore({ id: binderId }, '');
      isUnmountedBinder(binderId).should.be.false;
      reset();
    });

    it('return true when there is no binder in state', () => {
      reset();
      const binderId = 'myId';
      isUnmountedBinder(binderId).should.be.true;
    });

  });

});

