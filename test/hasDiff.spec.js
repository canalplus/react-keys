/* eslint no-unused-expressions:0 */
import {hasDiff} from '../src/hasDiff';

describe('hasDiff.js', () => {
  it('should return false if nextEls is empty', () => {
    const nextEls = [];
    const prevEls = [{id: '1'}];
    hasDiff(nextEls, prevEls).should.be.false;
  });

  it('should return true if prevEls is empty', () => {
    const nextEls = [{id: '1'}];
    const prevEls = [];
    hasDiff(nextEls, prevEls).should.be.true;
  });

  it('should return true if first id is different', () => {
    const nextEls = [{id: '1'}, {id: '2'}];
    const prevEls = [{id: '2'}, {id: '4'}];
    hasDiff(nextEls, prevEls).should.be.true;
  });

  it('should return true if length is different', () => {
    const nextEls = [{id: '2'}, {id: '4'}, {id: '5'}];
    const prevEls = [{id: '2'}, {id: '4'}];
    hasDiff(nextEls, prevEls).should.be.true;
  });

  it('should return false is elements are identicals', () => {
    const nextEls = [{id: '2'}, {id: '4'}];
    const prevEls = [{id: '2'}, {id: '4'}];
    hasDiff(nextEls, prevEls).should.be.false;
  });
});
