import sinon from 'sinon';
import {
  _isCurrentBinder,
  _getBinders,
  _getBinderMarginLeft,
  _getBinderMarginTop,
  _getBinderSelectedId,
  _getCurrentBinder,
  _getCurrentBinderId,
  _getCurrentSelectedId,
  _getKeyCode,
  _isBinderActive,
  _isLongPress,
  _isVisibleInBinder,
} from '../selector';
import { NAME } from '../../constants';
import * as ensure from '../../ensure';
import * as store from '../../store';

describe('redux/selector', () => {
  it(
    'should return true if binder is current',
    sinon.test(function() {
      this.stub(ensure, 'ensureState').returns(true);

      this.stub(store, 'getStore').returns({ current: { binderId: 'batman' } });

      _isCurrentBinder('batman')().should.equal(true);
    })
  );

  it(
    'should return false if binder is current',
    sinon.test(function() {
      this.stub(ensure, 'ensureState').returns(true);

      this.stub(store, 'getStore').returns({
        current: { binderId: 'superman' },
      });

      _isCurrentBinder('batman')().should.equal(false);
    })
  );

  it(
    'should return binders state',
    sinon.test(function() {
      this.stub(ensure, 'ensureState').returns(true);

      this.stub(store, 'getBinders').returns({
        binders: [{ id: 'batman' }, { id: 'spiderman' }],
      });

      _getBinders()().should.eql({
        binders: [{ id: 'batman' }, { id: 'spiderman' }],
      });
    })
  );

  it(
    'should return binder current selected id state',
    sinon.test(function() {
      this.stub(ensure, 'ensureState').returns(true);

      this.stub(store, 'getStore').returns({ current: { selectedId: '6' } });

      _getCurrentSelectedId()().should.equal('6');
    })
  );

  it(
    'should return current binder state',
    sinon.test(function() {
      this.stub(ensure, 'ensureState').returns(true);

      const fakeState = {
        binders: [{ id: 'batman' }, { id: 'spiderman' }],
        current: {
          binderId: 'batman',
        },
      };

      this.stub(store, 'getStore').returns(fakeState);

      _getCurrentBinder()().should.eql({ id: 'batman' });
    })
  );

  it(
    'should return current binder id state',
    sinon.test(function() {
      this.stub(ensure, 'ensureState').returns(true);

      this.stub(store, 'getStore').returns({
        current: { binderId: 'superman' },
      });

      _getCurrentBinderId()().should.equal('superman');
    })
  );

  it(
    'should return current key code state',
    sinon.test(function() {
      this.stub(ensure, 'ensureState').returns(true);

      this.stub(store, 'getStore').returns({ PRESS: { keyCode: 42 } });

      _getKeyCode()().should.equal(42);
    })
  );

  it(
    'should return is long press state',
    sinon.test(function() {
      this.stub(ensure, 'ensureState').returns(true);

      this.stub(store, 'getStore').returns({ PRESS: { press: true } });

      _isLongPress()().should.equal(true);
    })
  );

  it(
    'should return binder selected id state',
    sinon.test(function() {
      this.stub(ensure, 'ensureState').returns(true);

      this.stub(store, 'getBinders').returns([
        { id: 'batman', selectedId: '3' },
        { id: 'spiderman' },
      ]);

      _getBinderSelectedId('batman')().should.equal('3');
    })
  );

  it(
    'should return binder margin left state',
    sinon.test(function() {
      this.stub(ensure, 'ensureState').returns(true);

      this.stub(store, 'getBinders').returns([
        { id: 'batman', marginLeft: 10, selectedId: '3' },
        { id: 'spiderman', marginLeft: 15 },
      ]);

      _getBinderMarginLeft('batman')().should.equal(10);
    })
  );

  it(
    'should return binder margin top state',
    sinon.test(function() {
      this.stub(ensure, 'ensureState').returns(true);

      this.stub(store, 'getBinders').returns([
        { id: 'batman', marginTop: 10, selectedId: '3' },
        { id: 'spiderman', marginTop: 15 },
      ]);

      _getBinderMarginTop('batman')().should.equal(10);
    })
  );

  it(
    'should return binder active state',
    sinon.test(function() {
      this.stub(ensure, 'ensureState').returns(true);

      this.stub(store, 'getBinders').returns([
        { id: 'batman', mounted: true },
        { id: 'spiderman', marginTop: 15 },
      ]);

      _isBinderActive('batman')().should.equal(true);
    })
  );

  it(
    'should return if binder is visible',
    sinon.test(function() {
      this.stub(ensure, 'ensureState').returns(true);

      this.stub(store, 'getBinders').returns([
        { id: 'batman', mounted: true },
        { id: 'spiderman', marginTop: 15 },
      ]);

      _isBinderActive('batman')().should.equal(true);
    })
  );

  it(
    'should return if binder is visible',
    sinon.test(function() {
      this.stub(ensure, 'ensureState').returns(true);

      this.stub(store, 'getBinders').returns([
        {
          id: 'batman',
          mounted: true,
          elements: [{ id: '3', isVisible: true }],
        },
      ]);

      _isVisibleInBinder(null, '3')().should.equal(false);
      _isVisibleInBinder('batman', '1')().should.equal(false);
      _isVisibleInBinder('batman', '3')().should.equal(true);
    })
  );
});
