import { keysActions, _register, trigger } from '../events';
import sinon from 'sinon';

describe('events.js', () => {
  beforeEach(() => {
    keysActions.pop();
  });

  it('register should add object to keyActions array', () => {
    const callback = () => 'ADDED';
    keysActions.should.be.empty;
    _register('ADD', callback);
    keysActions.should.have.lengthOf(1);
    keysActions[0].event.should.equal('ADD');
    keysActions[0].callback.should.equal(callback);
  });

  it('trigger should execute callback with context', sinon.test(() => {
    const callback = sinon.spy();
    keysActions.should.be.empty;
    _register('ADD', callback);
    trigger('ADD', 'CONTEXT');
    callback.should.have.been.calledOnce;
    callback.should.have.been.calledWith('CONTEXT');
  }));
});
