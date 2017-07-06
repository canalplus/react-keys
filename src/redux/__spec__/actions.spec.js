import {
  addBinderToStore,
  _updateBinder,
  UPDATE_BINDER_STATE,
  updateBinderSelectedId,
  UPDATE_BINDER_SELECTED_KEY,
  desactivateBinders,
  _activeBinder,
  updatePressStatus,
  UPDATE_PRESS_STATUS,
  determineNewState,
  resetFlipFlop,
} from '../actions';
import { EXIT_STRATEGY_MEMORY } from '../../constants';
import * as ensure from '../../ensure';
import * as listener from '../../listener';
import * as strategy from '../../engines/strategy';
import * as helpers from '../../engines/helpers';
import * as bounds from '../../engines/bounds';
import sinon from 'sinon';
import { reset } from '../../../test/mocks';

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
  enterStrategy: 'none',
};

const type = 'BINDER';

describe('redux/actions.js', () => {
  describe('addBinderToStore', () => {
    afterEach(reset);

    it(
      'should call ensureDispatch',
      sinon.test(function() {
        this.mock(ensure).expects('ensureDispatch').once();
        addBinderToStore(props, type);
      })
    );

    it(
      'should call isUnmountedBinder',
      sinon.test(function() {
        addBinderToStore(props, type);
        this.mock(ensure).expects('isUnmountedBinder').once();
        this.stub(helpers, 'calculateElSpace').returns({});
        this.stub(bounds, 'boundsMargin').returns({});
        addBinderToStore(props, type);
      })
    );

    it(
      'should dispatch newBinder',
      sinon.test(function() {
        const props = {};
        this.mock(listener.globalStore).expects('dispatch').once();
        // .withArgs({
        //   type: ADD_BINDER_TO_STORE,
        //   inactiveBinders: sinon.match.object,
        //   newBinder: sinon.match.object,
        // });
        addBinderToStore(props, type);
      })
    );
  });
  describe('_updateBinderState', () => {
    afterEach(reset);

    it(
      'should call ensureDispatch',
      sinon.test(function() {
        addBinderToStore(props, type);
        this.mock(ensure).expects('ensureDispatch').once();
        _updateBinder('myId', {});
      })
    );

    it(
      'should call ensureUnmountedBinder',
      sinon.test(function() {
        addBinderToStore(props, type);
        const id = 'myId';
        this.mock(ensure).expects('ensureMountedBinder').once().withArgs(id);
        _updateBinder(id, {});
      })
    );

    it(
      'should update current when binder is active',
      sinon.test(function() {
        const binderId = 'myId';
        addBinderToStore({ ...props, active: true }, type);
        const binderState = { active: false };
        this.mock(listener.globalStore).expects('dispatch').twice();
        _updateBinder(binderId, binderState);
      })
    );
  });

  describe('updateBinderSelectedId', () => {
    afterEach(reset);

    it(
      'should call ensureDispatch',
      sinon.test(function() {
        addBinderToStore(props, type);
        this.stub(bounds, 'boundsMargin').returns({
          marginTop: 0,
          marginLeft: 0,
        });
        this.mock(ensure).expects('ensureDispatch').once();
        updateBinderSelectedId('myId', '1', 0, 0);
      })
    );

    it(
      'should dispatch to update binder selected id',
      sinon.test(function() {
        addBinderToStore(props, type);
        this.stub(bounds, 'boundsMargin').returns({
          marginTop: 0,
          marginLeft: 0,
        });
        const binderId = 'myId';
        const selectedId = '1';
        this.mock(listener.globalStore).expects('dispatch').once().withArgs({
          type: UPDATE_BINDER_SELECTED_KEY,
          binderId,
          selectedId,
          marginLeft: 0,
          marginTop: 0,
        });
        updateBinderSelectedId(binderId, selectedId);
      })
    );
  });

  describe('desactivateBinders', () => {
    it('should desactive binder except current and PRESS', () => {
      const binders = {
        current: ' OK',
        PRESS: 'OK',
        binder1: { active: true },
        binder2: { active: true },
      };
      desactivateBinders(binders, 'binder2').should.eql({
        binder1: { active: false },
      });
    });
  });

  describe('activateBinder', () => {
    afterEach(reset);

    it(
      'should call ensureDispatch',
      sinon.test(function() {
        addBinderToStore(props, type);
        this.stub(strategy, 'findIdByStrategy').returns({});
        this.stub(helpers, 'calculateElSpace').returns({});
        this.stub(bounds, 'boundsMargin').returns({});
        this.mock(ensure).expects('ensureDispatch').atLeast(1);
        _activeBinder('myId', {});
      })
    );

    it(
      'should call ensureUnmountedBinder',
      sinon.test(function() {
        const binderId = 'myId';
        addBinderToStore(props, type);
        this.stub(strategy, 'findIdByStrategy').returns({});
        this.stub(helpers, 'calculateElSpace').returns({});
        this.stub(bounds, 'boundsMargin').returns({});
        this.mock(ensure)
          .expects('ensureMountedBinder')
          .atLeast(1)
          .withArgs(binderId);
        _activeBinder(binderId, {});
      })
    );

    it(
      'should dispatch to activate binder selected id',
      sinon.test(function() {
        const binderId = 'myId';
        addBinderToStore(props, type);
        this.stub(strategy, 'findIdByStrategy').returns('myId');
        this.stub(helpers, 'calculateElSpace').returns({});
        this.stub(bounds, 'boundsMargin').returns({});
        this.mock(listener.globalStore).expects('dispatch').atLeast(1);
        _activeBinder(binderId, {});
      })
    );
  });

  describe('updatePressStatus', () => {
    afterEach(reset);

    it(
      'should call ensureDispatch',
      sinon.test(function() {
        addBinderToStore(props, type);
        this.mock(ensure).expects('ensureDispatch').once();
        updatePressStatus(false, {});
      })
    );

    it(
      'should not dispatch if press !== press',
      sinon.test(function() {
        this.mock(listener.globalStore).expects('dispatch').once().withArgs({
          type: UPDATE_PRESS_STATUS,
          press: true,
          keyCode: null,
        });
        updatePressStatus(true);
        updatePressStatus(false);
      })
    );
  });

  describe('determineNewState', () => {
    afterEach(reset);

    it(
      'should call ensureDispatch',
      sinon.test(function() {
        addBinderToStore(props, type);
        this.mock(ensure).expects('ensureDispatch').twice(); // because of _updateBinderState
        this.stub(helpers, 'calculateNewState').returns({
          nextEl: { id: 'myId' },
        });
        determineNewState('myId', 'dir');
      })
    );

    it(
      'should call ensureUnmountedBinder',
      sinon.test(function() {
        const binderId = 'myId';
        addBinderToStore(props, type);
        this.stub(helpers, 'calculateNewState').returns({
          nextEl: { id: 'myId' },
        });
        this.mock(ensure)
          .expects('ensureMountedBinder')
          .once() // because of _updateBinderState
          .withArgs(binderId);
        determineNewState(binderId, 'dir');
      })
    );

    it(
      'should not call calculate new state if nextEl does not exist',
      sinon.test(function() {
        addBinderToStore({ ...props, nextEl: null }, type);
        this.mock(helpers).expects('calculateNewState').never();
        determineNewState(props.id, 'dir');
      })
    );
  });

  describe('resetFlipFlop', () => {
    afterEach(reset);

    it(
      'should call ensureDispatch',
      sinon.test(function() {
        addBinderToStore(
          { ...props, enterStrategy: EXIT_STRATEGY_MEMORY },
          type
        );
        this.mock(ensure).expects('ensureDispatch').once();
        resetFlipFlop('myId');
      })
    );

    it(
      'should call ensureUnmountedBinder',
      sinon.test(function() {
        const binderId = 'myId';
        addBinderToStore(
          { ...props, enterStrategy: EXIT_STRATEGY_MEMORY },
          type
        );
        this.mock(ensure)
          .expects('ensureMountedBinder')
          .once() // because of _updateBinderState
          .withArgs(binderId);
        resetFlipFlop('myId');
      })
    );

    it(
      'should set prevDir at null when exit strategy !== memory',
      sinon.test(function() {
        addBinderToStore(props, type);
        this.mock(listener.globalStore).expects('dispatch').once().withArgs({
          type: UPDATE_BINDER_STATE,
          binderId: 'myId',
          state: { prevDir: null },
        });
        resetFlipFlop('myId');
      })
    );
  });
});
