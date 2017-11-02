import {
  addBinder,
  _updateBinder,
  UPDATE_BINDER,
  _activeBinder,
  updatePressStatus,
  UPDATE_PRESS_STATUS,
  determineNewState,
  resetFlipFlop,
} from '../actions';
import * as ensure from '../../ensure';
import * as listener from '../../listener';
import * as strategy from '../../engines/strategy';
import * as helpers from '../../engines/helpers';
import * as bounds from '../../engines/bounds';
import sinon from 'sinon';
import { reset } from '../../../test/mocks';
import { NAME } from '../../constants';

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
  strategy: 'none',
};

const type = 'BINDER';

describe('redux/actions.js', () => {
  describe('addBinder', () => {
    afterEach(reset);

    it(
      'should call ensureDispatch',
      sinon.test(function() {
        this.mock(ensure)
          .expects('ensureDispatch')
          .once();
        this.stub(listener.globalStore, 'dispatch').returns(null);
        addBinder(props, type);
      })
    );

    it(
      'should call isUnknownBinder',
      sinon.test(function() {
        this.mock(ensure)
          .expects('isUnknownBinder')
          .once();
        this.stub(listener.globalStore, 'dispatch').returns(null);
        addBinder(props, type);
      })
    );

    it(
      'should mount binder with priority if binder is already known',
      sinon.test(function() {
        this.mock(listener.globalStore)
          .expects('dispatch')
          .once()
          .withArgs({
            binderId: 'myId',
            priority: 2,
            type: '@@keys/MOUNT_BINDER',
          });
        this.stub(ensure, 'isUnknownBinder').returns(false);
        addBinder({ ...props, priority: 2 }, type);
      })
    );

    it(
      'should add binder if binder is new',
      sinon.test(function() {
        this.mock(listener.globalStore)
          .expects('dispatch')
          .once()
          .withArgs(sinon.match.has('type', '@@keys/ADD_BINDER'));
        this.stub(ensure, 'isUnknownBinder').returns(true);
        addBinder(props, type);
      })
    );
  });
  describe('_updateBinder', () => {
    afterEach(reset);

    it(
      'should call ensureDispatch',
      sinon.test(function() {
        addBinder(props, type);
        this.mock(ensure)
          .expects('ensureDispatch')
          .once();
        _updateBinder('myId', {});
      })
    );

    it(
      'should call ensureKnownBinder',
      sinon.test(function() {
        const id = 'myId';
        this.mock(ensure)
          .expects('ensureKnownBinder')
          .once()
          .withArgs(id);
        _updateBinder({ id });
      })
    );
  });

  describe('activateBinder', () => {
    afterEach(reset);

    it(
      'should call ensureDispatch',
      sinon.test(function() {
        addBinder(props, type);
        this.stub(listener, 'globalStore').returns({
          getState: () => ({ [NAME]: { binders: [] } }),
        });
        this.stub(strategy, 'findIdByStrategy').returns({});
        this.stub(helpers, 'calculateElSpace').returns({});
        this.stub(bounds, 'boundsMargin').returns({});
        this.mock(ensure)
          .expects('ensureDispatch')
          .atLeast(1);
        _activeBinder('myId', {});
      })
    );

    it(
      'should call ensureKnownBinder',
      sinon.test(function() {
        const binderId = 'myId';
        addBinder(props, type);
        this.stub(strategy, 'findIdByStrategy').returns({});
        this.stub(helpers, 'calculateElSpace').returns({});
        this.stub(bounds, 'boundsMargin').returns({});
        this.mock(ensure)
          .expects('ensureKnownBinder')
          .atLeast(1)
          .withArgs(binderId);
        _activeBinder(binderId, {});
      })
    );

    it(
      'should dispatch to activate binder selected id',
      sinon.test(function() {
        const binderId = 'myId';
        addBinder(props, type);
        this.stub(strategy, 'findIdByStrategy').returns('myId');
        this.stub(helpers, 'calculateElSpace').returns({});
        this.stub(bounds, 'boundsMargin').returns({});
        this.mock(listener.globalStore)
          .expects('dispatch')
          .atLeast(1);
        _activeBinder(binderId, {});
      })
    );
  });

  describe('updatePressStatus', () => {
    afterEach(reset);

    it(
      'should call ensureDispatch',
      sinon.test(function() {
        addBinder(props, type);
        this.mock(ensure)
          .expects('ensureDispatch')
          .once();
        updatePressStatus(false, {});
      })
    );

    it(
      'should not dispatch if press !== press',
      sinon.test(function() {
        this.mock(listener.globalStore)
          .expects('dispatch')
          .once()
          .withArgs({
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
        addBinder(props, type);
        this.mock(ensure)
          .expects('ensureDispatch')
          .once();
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
        addBinder(props, type);
        this.stub(helpers, 'calculateNewState').returns({
          nextEl: { id: 'myId' },
        });
        this.mock(ensure)
          .expects('ensureKnownBinder')
          .once() // because of _updateBinderState
          .withArgs(binderId);
        determineNewState(binderId, 'dir');
      })
    );

    it(
      'should not call calculate new state if nextEl does not exist',
      sinon.test(function() {
        addBinder({ ...props, nextEl: null }, type);
        this.mock(helpers)
          .expects('calculateNewState')
          .never();
        determineNewState(props.id, 'dir');
      })
    );
  });

  describe('resetFlipFlop', () => {
    afterEach(reset);

    it(
      'should call ensureDispatch',
      sinon.test(function() {
        addBinder({ ...props, memory: true }, type);
        this.mock(ensure)
          .expects('ensureDispatch')
          .once();
        resetFlipFlop('myId');
      })
    );

    it(
      'should call ensureKnownBinder',
      sinon.test(function() {
        const binderId = 'myId';
        addBinder({ ...props, memory: true }, type);
        this.mock(ensure)
          .expects('ensureKnownBinder')
          .once() // because of _updateBinderState
          .withArgs(binderId);
        resetFlipFlop('myId');
      })
    );

    it(
      'should set prevDir at null when exit strategy !== memory',
      sinon.test(function() {
        addBinder({ ...props, prevDir: 'left' }, type);
        this.mock(listener.globalStore)
          .expects('dispatch')
          .once()
          .withArgs({
            type: UPDATE_BINDER,
            binder: { id: 'myId', prevDir: null },
          });
        resetFlipFlop('myId');
      })
    );
    it(
      'should not dispatch if prevDir is already null',
      sinon.test(function() {
        addBinder({ ...props }, type);
        this.mock(listener.globalStore)
          .expects('dispatch')
          .never();
        resetFlipFlop('myId');
      })
    );
  });
});
