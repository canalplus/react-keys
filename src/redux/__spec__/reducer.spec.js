import { reducer, initialKeysSate } from '../reducer';
import sinon from 'sinon';
import { MOUNT_BINDER } from '../actions';
describe('redux/reducer', () => {
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
