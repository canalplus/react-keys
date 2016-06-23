/* eslint no-unused-expressions:0 */
import * as actions from '../../src/redux/actions';
import * as module from '../../src/listener';
import {createStore} from 'redux';
import sinon from 'sinon';
import * as strape from '../../src/engines/strape';

describe('redux/actions.js', () => {
  describe('clone', () => {
    it('should clone an object', () => {
      const ob1 = {id: 1, context: {obladi: 'oblada'}};
      const ob2 = actions.clone(ob1);
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
        this.mock(module.globalStore)
          .expects('dispatch')
          .once()
          .withArgs({
            type: actions.ACTIVE_KEYBINDER,
            state: {
              binderId: {active: true, selectedId: undefined},
              binderId2: {active: false},
            },
          });
        actions._activeKeyBinder('binderId');
      }));
    it('should not dispatch anything if binderId not found in state', sinon.test(function() {
      const store = createStore((state = {
        '@@keys': {
          binderId: {active: false},
        },
      }) => state);
      module._init({store: store}); // init globalStore
      this.mock(module.globalStore)
        .expects('dispatch')
        .never();
      actions._activeKeyBinder('binderId2');
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
      this.mock(module.globalStore)
        .expects('dispatch')
        .once()
        .withArgs({
          type: actions.ADD_KEYBINDER_TO_STORE,
          state: {binderId: {active: false}, binderId2: {active: false, id: 'binderId2'}},
        });
      actions.addKeyBinderToStore('binderId2', false);
    }));
    it('should activated binder when active is true', sinon.test(function() {
      const store = createStore((state = {
        '@@keys': {
          binderId: {active: false},
        },
      }) => state);
      module._init({store: store}); // init globalStore
      this.mock(module.globalStore)
        .expects('dispatch')
        .once()
        .withArgs({
          type: actions.ADD_KEYBINDER_TO_STORE,
          state: {binderId: {active: false}, binderId2: {active: true, id: 'binderId2'}},
        });
      actions.addKeyBinderToStore('binderId2', true);
    }));
    it('should not dipatch if binderId already exists in state', sinon.test(function() {
      const store = createStore((state = {
        '@@keys': {
          binderId: {active: false},
        },
      }) => state);
      module._init({store: store}); // init globalStore
      this.mock(module.globalStore)
        .expects('dispatch')
        .never();
      actions.addKeyBinderToStore('binderId', false);
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
      this.mock(module.globalStore)
        .expects('dispatch')
        .once()
        .withArgs({
          type: actions.UPDATE_SELECTED_KEY,
          state: {
            binderId: {active: false, selectedId: 2, marginLeft: 10},
          },
        });
      actions.updateSelectedId('binderId', 2, 10);
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
      this.mock(module.globalStore)
        .expects('dispatch')
        .once()
        .withArgs({
          type: actions.UPDATE_BINDER_STATE,
          state: sinon.match.object,
        });
      actions._updateBinderState('binderId', {});
    }));
  });

  describe('exitBinder', () => {
    it('should not call activeKeyBinder when call is undefined', sinon.test(function() {
      this.mock(actions)
        .expects('_activeKeyBinder')
        .never();
      actions.exitBinder('bounds', null, '1');
    }));

    it('should call callback when callback is a function', sinon.test(function() {
      const callback = this.spy();
      actions.exitBinder('bounds', callback, '1');
      callback.should.have.been.calledOnce;
    }));

    // it('should call findMirrorExitId when strategy is mirror', sinon.test(function() {
    //   this.mock(strape)
    //     .expects('findMirrorExitId')
    //     .once();
    //   actions.exitBinder(EXIT_STRATEGY_MIRROR, 'strape', 'ID');
    // }));
    //
    // it('should call findStartExitId when strategy is start', sinon.test(function() {
    //   this.mock(strape)
    //     .expects('findStartExitId')
    //     .once();
    //   actions.exitBinder(EXIT_STRATEGY_START, 'strape', 'ID');
    // }));

    it('should not call any engine when other strategy', sinon.test(function() {
      const mirrorSpy = this.spy(strape, 'findMirrorExitId');
      const startSpy = this.spy(strape, 'findStartExitId');
      actions.exitBinder('FUCKING_STRATEGY', 'strape', 'ID');
      mirrorSpy.should.have.been.not.called;
      startSpy.should.have.been.not.called;
    }));
  });
});
