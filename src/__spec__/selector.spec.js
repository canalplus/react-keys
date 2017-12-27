import { _selector } from '../redux/selector';
import { globalStore } from '../store';
import { NAME } from '../constants';
import sinon from 'sinon';

describe('selector', () => {
  it('should return a function', () => {
    _selector('default').should.be.instanceOf(Function);
  });
  it(
    'should return default object when selector find nothing',
    sinon.test(function() {
      this.stub(globalStore, 'getState').returns({ [NAME]: { binders: [] } });
      _selector('default')().should.eql({ marginLeft: 0, marginTop: 0 });
    })
  );
  it(
    'should select binder state when it exists',
    sinon.test(function() {
      const binder = { id: 'binder1', ok: 'returned' };
      this.stub(globalStore, 'getState').returns({
        [NAME]: { binders: [binder] },
      });
      _selector('binder1')().should.equals(binder);
    })
  );
});
