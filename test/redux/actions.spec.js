/* eslint no-unused-expressions:0 */
import {
  clone,
  _activeKeyBinder,
  _addKeyBinderToStore,
  _updateSelectedId,
  _updateBinderState,
  ACTIVE_KEYBINDER,
  ADD_KEYBINDER_TO_STORE,
  UPDATE_SELECTED_KEY,
  UPDATE_BINDER_STATE,
} from '../../src/redux/actions';
import * as module from '../../src/listener';
import {createStore} from 'redux';
import sinon from 'sinon';

describe('redux/actions.js', () => {
  describe('clone', () => {
    it('should clone an object', () => {
      const ob1 = {id: 1, context: {obladi: 'oblada'}};
      const ob2 = clone(ob1);
      ob1.should.not.equal(ob2);
      ob1.id.should.equal(ob2.id);
      ob1.context.should.not.equal(ob2.context);
      ob1.context.obladi.should.equal(ob2.context.obladi);
    });
  });
  describe('_activeKeyBinder', () => {
    it('should dispatch new state with binderId activated and others disactivated',
      sinon.test(function() {
        const store = createStore((state = {
          '@@keys': {
            binderId: {active: false},
            binderId2: {active: true},
          },
        }) => state);
        module._init({store: store}); // init globalStore
        this.mock(module.globalStore).expects('dispatch').once().withArgs({
          type: ACTIVE_KEYBINDER,
          state: {
            binderId: {active: true},
            binderId2: {active: false},
          },
        });
        _activeKeyBinder('binderId');
      }));
    it('should not dispatch anything if binderId not found in state', sinon.test(function() {
      const store = createStore((state = {
        '@@keys': {
          binderId: {active: false},
        },
      }) => state);
      module._init({store: store}); // init globalStore
      this.mock(module.globalStore).expects('dispatch').never();
      _activeKeyBinder('binderId2');
    }));
  });
  describe('_addKeyBinderToStore', () => {
    it('should add new binder to store if not exists yet', sinon.test(function() {
      const store = createStore((state = {
        '@@keys': {
          binderId: {active: false},
        },
      }) => state);
      module._init({store: store}); // init globalStore
      this.mock(module.globalStore).expects('dispatch').once().withArgs({
        type: ADD_KEYBINDER_TO_STORE,
        state: {
          binderId: {active: false},
          binderId2: {active: false, id: 'binderId2'},
        },
      });
      _addKeyBinderToStore({id: 'binderId2'});
    }));
    it('should not dipatch if binderId already exists in state', sinon.test(function() {
      const store = createStore((state = {
        '@@keys': {
          binderId: {active: false},
        },
      }) => state);
      module._init({store: store}); // init globalStore
      this.mock(module.globalStore).expects('dispatch').never();
      _addKeyBinderToStore({id: 'binderId'});
    }));
  });
  describe('_updateSelectedId', () => {
    it('should update margin and selectedId to state', sinon.test(function() {
      const store = createStore((state = {
        '@@keys': {
          binderId: {active: false, selectedId: 1, marginLeft: 0},
        },
      }) => state);
      module._init({store: store}); // init globalStore
      this.mock(module.globalStore).expects('dispatch').once().withArgs({
        type: UPDATE_SELECTED_KEY,
        state: {
          binderId: {active: false, selectedId: 2, marginLeft: 10},
        },
      });
      _updateSelectedId(2, 10, 'binderId');
    }));
  });

  describe('_updateBinderState', () => {
    it('should update state', sinon.test(function() {
      const store = createStore((state = {
        '@@keys': {
          binderId: {active: false, selectedId: 1, marginLeft: 0},
        },
      }) => state);
      module._init({store: store}); // init globalStore
      this.mock(module.globalStore).expects('dispatch').once()
        .withArgs({
          type: UPDATE_BINDER_STATE,
          state: sinon.match.object,
        });
      _updateBinderState('binderId', {});
    }));
  });
});
