import { isActive } from '../isActive';
import sinon from 'sinon';
import * as helper from '../redux/helper';

describe('isActive.js', () => {
  it('should return false when active props is false', () => {
    const props = { id: '1', active: false };
    isActive(props).should.be.false;
  });

  it(
    'should return false when first active binder has different id',
    sinon.test(function() {
      this.stub(helper, 'findFirstActiveBinderId').returns('2');
      const props = { id: '1', active: true };
      isActive(props).should.be.false;
    })
  );

  it(
    'should return true when first active binder has same id',
    sinon.test(function() {
      this.stub(helper, 'findFirstActiveBinderId').returns('1');
      const props = { id: '1', active: true };
      isActive(props).should.be.true;
    })
  );
});
