/* eslint no-unused-expressions:0 */
import {_init, cb, addListener, removeListener, globalStore, keysListeners} from '../src/listener';
import sinon from 'sinon';

describe('listener.js', () => {
  beforeEach(() => {
    keysListeners.length = 0;
  });

  afterEach(() => {
    keysListeners.length = 0;
  });

  it('globalStore should be a function', () => {
    globalStore.should.be.instanceOf(Function);
  });

  it('shoule cb call all listeners cb', () => {
    const mySpy = sinon.spy();
    const keyCode = 'keyCode';
    const internCb = {
      id: 0,
      callback: mySpy,
      context: {},
    };
    keysListeners.push(internCb);
    cb(keyCode);
    mySpy.should.have.been.calledOnce;
    mySpy.should.have.been.calledWith(keyCode);
  });

  it('_init should listen on keydown event by default', sinon.test(function() {
    this.mock(document).expects('addEventListener')
      .once()
      .withArgs('keydown', cb);
    _init();
  }));

  it('_init should execute callback if one is passed', sinon.test(function() {
    this.mock(document).expects('addEventListener').never();
    const callback = sinon.spy();
    _init({
      bindkeys: callback,
    });
    callback.should.have.been.calledOnce;
    callback.should.have.been.calledWith(cb);
  }));

  it('addListener should add callback with context to keysListener array', () => {
    keysListeners.should.be.empty;
    const callback = sinon.spy();
    const listenerId = addListener(callback, 'CONTEXT');
    keysListeners.should.have.lengthOf(1);
    keysListeners[0].id.should.equals(listenerId);
    keysListeners[0].callback.should.equals(callback);
    keysListeners[0].context.should.equals('CONTEXT');
  });

  it('should removeListener remove a callback through the id', () => {
    keysListeners.should.be.empty;
    const callback = sinon.spy();
    const listenerId = addListener(callback, 'CONTEXT');
    keysListeners.should.have.lengthOf(1);
    removeListener(listenerId);
    keysListeners.should.be.empty;
  });
});
