import { addCatcher, removeCatcher, catcherWatcher } from '../catcher';
import sinon from 'sinon';

describe('catcher', () => {

  it('should execute callback when trigger sequence', sinon.test(function() {
    const cb = this.spy();
    const id = addCatcher('1234', cb);
    catcherWatcher(49); // 1
    catcherWatcher(50); // 2
    catcherWatcher(51); // 3
    catcherWatcher(52); // 4
    catcherWatcher(52); // 4
    catcherWatcher(52); // 4
    cb.should.have.been.calledOnce;
    removeCatcher(id);
  }));

});