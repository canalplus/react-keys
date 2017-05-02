import {
  keysListeners,
  globalStore,
} from '../listener';

import sinon from 'sinon';

describe('listener.js', () => {
  let clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    keysListeners.length = 0;
  });

  afterEach(function() {
    clock.restore();
    keysListeners.length = 0;
  });

  it('globalStore should be an object', () => {
    globalStore.should.be.instanceOf(Object);
  });


});
