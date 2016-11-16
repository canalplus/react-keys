import { hasDiff } from '../hasDiff';

describe('hasDiff.js', () => {
  it('should return false if nextEls is empty', () => {
    const nextEls = [];
    const prevEls = [{ id: '1' }];
    hasDiff(nextEls, prevEls).should.be.false;
  });

  it('should return true if prevEls is empty', () => {
    const nextEls = [{ id: '1' }];
    const prevEls = [];
    hasDiff(nextEls, prevEls).should.be.true;
  });

  it('should return true if first id is different', () => {
    const nextEls = [{ id: '1' }, { id: '2' }];
    const prevEls = [{ id: '2' }, { id: '4' }];
    hasDiff(nextEls, prevEls).should.be.true;
  });

  it('should return true if length is different', () => {
    const nextEls = [{ id: '2' }, { id: '4' }, { id: '5' }];
    const prevEls = [{ id: '2' }, { id: '4' }];
    hasDiff(nextEls, prevEls).should.be.true;
  });

  it('should return false is elements are identicals', () => {
    const nextEls = [{ id: '2' }, { id: '4' }];
    const prevEls = [{ id: '2' }, { id: '4' }];
    hasDiff(nextEls, prevEls).should.be.false;
  });

  it('should return false when ids are differents', () => {
    const nextEls = [{ id: '2' }, { id: '3' }, { id: '5' }];
    const prevEls = [{ id: '2' }, { id: '4' }, { id: '5' }];
    hasDiff(nextEls, prevEls).should.be.true;
  });
});