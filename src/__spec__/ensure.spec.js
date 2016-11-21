import { createStore } from 'redux';
import { _init } from '../listener';
import { ops, reset } from '../../test/mocks';
import { addBinderToStore } from '../redux/actions';
import { ensureState, ensureDispatch, ensureMountedBinder, ensureUnmountedBinder } from '../ensure';

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
      const fn = () => ensureMountedBinder(binderId);
      fn.should.throw(Error);
    });

  });

  describe('ensureUnmountedBinder', () => {

    it('should throw exception when binderId exists', () => {
      const binderId = 'myId';
      addBinderToStore({ id: binderId }, '');
      const fn = () => ensureUnmountedBinder(binderId);
      fn.should.throw(Error);
      reset();
    });

    it('should not throw exception when binderId does not exist', () => {
      const binderId = 'myId';
      const fn = () => ensureUnmountedBinder(binderId);
      fn.should.not.throw(Error);
    });

  });

});

