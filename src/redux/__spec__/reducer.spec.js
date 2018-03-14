import { reducer, initialKeysSate } from '../reducer';
import sinon from 'sinon';
import {
  ACTIVE_BINDER,
  ADD_BINDER,
  MOUNT_BINDER,
  REMOVE_BINDER,
  RESET_STATE,
  UPDATE_BINDER,
  UPDATE_PRESS_STATUS,
} from '../actions';

describe('redux/reducer', () => {
  describe('INITIAL STATE', () => {
    it('should return the initial state', () => {
      reducer(undefined, {}).should.eql(initialKeysSate);
    });
  });

  describe('ACTIVE_BINDER', () => {
    it(
      'should add binder',
      sinon.test(function() {
        const binder = { id: '1', priority: 1 };
        const binder2 = { id: '2', priority: 1 };
        const state = { ...initialKeysSate, binders: [binder, binder2] };
        const action = {
          type: ACTIVE_BINDER,
          binder: { id: '2', priority: 1, sleep: false },
        };
        const result = reducer(state, action);
        result.should.eqls({
          ...initialKeysSate,
          binders: [
            { id: '1', priority: 1, mounted: false },
            {
              id: '2',
              priority: 1,
              sleep: false,
              mounted: true,
              mountedTime: 0,
            },
          ],
          current: { binderId: '2', selectedId: undefined },
        });
      })
    );
  });

  describe('ADD_BINDER', () => {
    it(
      'should add binder',
      sinon.test(function() {
        const binder = { id: '1', priority: 1 };
        const state = { ...initialKeysSate, binders: [binder] };
        const action = {
          type: ADD_BINDER,
          binder: { id: '2', priority: 1, sleep: false },
        };
        const result = reducer(state, action);
        result.should.eqls({
          ...initialKeysSate,
          binders: [binder, action.binder],
        });
      })
    );
  });

  describe('UPDATE_BINDER', () => {
    it(
      'should update binder',
      sinon.test(function() {
        const binder = { id: '1', priority: 1 };
        const state = { ...initialKeysSate, binders: [binder] };
        const action = {
          type: UPDATE_BINDER,
          binder: { id: '1', priority: 3, sleep: false },
        };
        const result = reducer(state, action);
        result.should.eqls({ ...initialKeysSate, binders: [action.binder] });
      })
    );
  });

  describe('REMOVE_BINDER', () => {
    it(
      'should remove binder',
      sinon.test(function() {
        const binder = { id: '1', priority: 1 };
        const state = { ...initialKeysSate, binders: [binder] };
        const action = { type: REMOVE_BINDER, binderId: '1', force: true };
        const result = reducer(state, action);
        result.should.eqls({ ...initialKeysSate, binders: [] });
      })
    );
  });

  describe('RESET_STATE', () => {
    it(
      'should reset state',
      sinon.test(function() {
        const binder = { id: '1', priority: 1 };
        const state = { ...initialKeysSate, binders: [binder] };
        const action = { type: RESET_STATE };
        const result = reducer(state, action);
        result.should.eqls({ ...initialKeysSate });
      })
    );
  });

  describe('UPDATE_PRESS_STATUS', () => {
    it(
      'should update press status',
      sinon.test(function() {
        const state = { ...initialKeysSate };
        const action = { type: UPDATE_PRESS_STATUS, press: true, keyCode: 432 };
        const result = reducer(state, action);
        result.should.eqls({
          ...initialKeysSate,
          PRESS: { press: true, keyCode: 432 },
        });
      })
    );
  });

  describe('MOUNT_BINDER', () => {
    it(
      'should mount binder with fresh priority from props',
      sinon.test(function() {
        const binder = { id: '1', priority: 1 };
        const state = { ...initialKeysSate, binders: [binder] };
        const action = { type: MOUNT_BINDER, binderId: '1', priority: 2 };
        const result = reducer(state, action);
        result.should.eqls({
          ...initialKeysSate,
          binders: [
            {
              ...binder,
              mountedTime: 0,
              priority: 2,
              sleep: false,
              mounted: true,
            },
          ],
          current: {
            binderId: '1',
            selectedId: undefined,
          },
        });
      })
    );
  });
});
