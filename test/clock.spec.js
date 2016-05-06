/* eslint no-unused-expressions:0 */
import {block, isBlocked} from '../src/clock';
import sinon from 'sinon';

describe('clock.js', () => {
  let clock;

  before(() => {
    clock = sinon.useFakeTimers();
  });

  after(() => {
    clock.restore();
  });

  it('isBlock should return block state', () => {
    block();
    clock.tick(10);
    isBlocked().should.be.false;
  });

  it('block should block for 10ms', () => {
    block();
    isBlocked().should.be.true;
    clock.tick(9);
    isBlocked().should.be.true;
    clock.tick(1);
    isBlocked().should.be.false;
  });
});
