import * as actions from '../../src/redux/actions';
import * as listener from '../../src/listener';
import { createStore } from 'redux';
import sinon from 'sinon';
import { expect } from 'chai';
import * as strape from '../../src/engines/strape';

describe('redux/actions.js', () => {
  describe('clone', () => {
    it('should clone an object', () => {
      const ob1 = { id: 1, context: { obladi: 'oblada' } };
      const ob2 = actions.clone(ob1);
      ob1.should.not.equal(ob2);
      ob1.id.should.equal(ob2.id);
      ob1.context.should.not.equal(ob2.context);
      ob1.context.obladi.should.equal(ob2.context.obladi);
    });
    it('should not clone if prop is a function', () => {
      const ob1 = {
        id: 1, context: {
          obladi: () => {
          },
        },
      };
      const ob2 = actions.clone(ob1);
      expect(ob2.context.obladi).to.be.undefined;
    });
  });
  describe('_activeKeyBinder', () => {
    it('should dispatch new state with binderId activated and others disactivated',
      sinon.test(function() {
        const store = createStore((state = {
          '@@keys': {
            current: {},
            binderId: { active: false, elements: [{ id: '1' }] },
            binderId2: { active: true, elements: [{ id: '2' }] },
          },
        }) => state);
        listener._init({ store: store }); // init globalStore
        this.mock(listener.globalStore)
          .expects('dispatch')
          .once()
          .withArgs({
            type: actions.ACTIVE_KEYBINDER,
            state: {
              binderId: { active: true, elements: { 0: { id: '1' } }, selectedId: '1' },
              binderId2: { active: false, elements: { 0: { id: '2' } } },
              current: { binderId: 'binderId', selectedId: '1' },
            },
          });
        actions._activeKeyBinder('binderId');
      }));
    it('should not dispatch anything if binderId not found in state', sinon.test(function() {
      const store = createStore((state = {
        '@@keys': {
          binderId: { active: false },
        },
      }) => state);
      listener._init({ store: store }); // init globalStore
      this.mock(listener.globalStore)
        .expects('dispatch')
        .never();
      actions._activeKeyBinder('binderId2');
    }));
    it('should keep in memory the selected Id when memory is true', sinon.test(function() {
      const store = createStore((state = {
        '@@keys': {
          current: {},
          binderId: { active: false, selectedId: '2', elements: [{ id: '1' }] },
          binderId2: { active: true, selectedId: '3' },
        },
      }) => state);
      listener._init({ store: store }); // init globalStore
      this.mock(listener.globalStore)
        .expects('dispatch')
        .once()
        .withArgs({
          type: actions.ACTIVE_KEYBINDER,
          state: {
            binderId: { active: true, elements: { 0: { id: '1' } }, selectedId: '2' },
            binderId2: { active: false, selectedId: '3' },
            current: { selectedId: '2', binderId: 'binderId' },
          },
        });
      actions._activeKeyBinder('binderId', null, true);
    }));
  });
  describe('_addKeyBinderToStore', () => {
    it('should add new binder to store if not exists yet', sinon.test(function() {
      const store = createStore((state = {
        '@@keys': {
          current: {},
          binderId: { active: false },
        },
      }) => state);
      listener._init({ store: store }); // init globalStore
      this.mock(listener.globalStore)
        .expects('dispatch')
        .once()
        .withArgs({
          type: actions.ADD_KEYBINDER_TO_STORE,
          state: {
            binderId: { active: false },
            binderId2: { active: false, id: 'binderId2' },
            current: {},
          },
        });
      actions.addKeyBinderToStore('binderId2', false);
    }));
    it('should activated binder when active is true', sinon.test(function() {
      const store = createStore((state = {
        '@@keys': {
          current: {},
          binderId: { active: false },
        },
      }) => state);
      listener._init({ store: store }); // init globalStore
      this.mock(listener.globalStore)
        .expects('dispatch')
        .once()
        .withArgs({
          type: actions.ADD_KEYBINDER_TO_STORE,
          state: {
            binderId: { active: false },
            binderId2: { active: true, id: 'binderId2' },
            current: {},
          },
        });
      actions.addKeyBinderToStore('binderId2', true);
    }));
    it('should not dipatch if binderId already exists in state', sinon.test(function() {
      const store = createStore((state = {
        '@@keys': {
          current: {},
          binderId: { active: false },
        },
      }) => state);
      listener._init({ store: store }); // init globalStore
      this.mock(listener.globalStore)
        .expects('dispatch')
        .never();
      actions.addKeyBinderToStore('binderId', false);
    }));
  });
  describe('_updateSelectedId', () => {
    it('should update margin and selectedId to state', sinon.test(function() {
      const store = createStore((state = {
        '@@keys': {
          current: { selectedId: null },
          binderId: { active: false, selectedId: 1, marginLeft: 0, marginTop: 0 },
        },
      }) => state);
      listener._init({ store: store }); // init globalStore
      this.mock(listener.globalStore)
        .expects('dispatch')
        .once()
        .withArgs({
          type: actions.UPDATE_SELECTED_KEY,
          state: {
            binderId: { active: false, selectedId: 2, marginLeft: 10, marginTop: 0 },
            current: { selectedId: 2 },
          },
        });
      actions.updateSelectedId('binderId', 2, 10, 0);
    }));
  });

  describe('_updateBinderState', () => {
    it('should update state', sinon.test(function() {
      const store = createStore((state = {
        '@@keys': {
          binderId: { active: false, selectedId: 1, marginLeft: 0 },
        },
      }) => state);
      listener._init({ store: store }); // init globalStore
      this.mock(listener.globalStore)
        .expects('dispatch')
        .once()
        .withArgs({
          type: actions.UPDATE_BINDER_STATE,
          state: sinon.match.object,
        });
      actions._updateBinderState('binderId', {});
    }));
  });
  describe('exit', () => {
    it('should not call activeKeyBinder when call is undefined', sinon.test(function() {
      this.mock(actions)
        .expects('_activeKeyBinder')
        .never();
      actions.enter('bounds', null, '1');
    }));

    it('should call callback when callback is a function', sinon.test(function() {
      const callback = this.spy();
      actions.enter(callback, '1');
      callback.should.have.been.calledOnce;
    }));

    it('should not call any engine when other strategy', sinon.test(function() {
      const mirrorSpy = this.spy(strape, 'findMirrorExitId');
      const startSpy = this.spy(strape, 'findStartExitId');
      actions.enter('FUCKING_STRATEGY', 'strape', 'ID');
      mirrorSpy.should.have.been.not.called;
      startSpy.should.have.been.not.called;
    }));
  });
  describe('bindersKeys', () => {
    it('should delete current keys and return list of objet keys', () => {
      const object = {
        current: {},
        binder1: {},
        binder2: {},
      };
      actions.bindersKeys(object).should.eql(['binder1', 'binder2']);
    });
  });
});
