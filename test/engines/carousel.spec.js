import {
  build,
  getPrev,
  getNext,
} from '../../src/engines/carousel';

describe('engine/carousel', () => {
  describe('build', () => {
    it('should get initial state of a carousel depend of its index', () => {
      const table = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
      build(table, 5, 0).should.eql(['J', 'K', 'A', 'B', 'C']);
      build(table, 5, 5).should.eql(['D', 'E', 'F', 'G', 'H']);
      build(table, 5, 10).should.eql(['I', 'J', 'K', 'A', 'B']);
      build(table, 7, 5).should.eql(['C', 'D', 'E', 'F', 'G', 'H', 'I']);
    });
  });
  describe('getPrev', () => {
    it('should get prev element when index not 0', () => {
      const table = ['A', 'B', 'C'];
      getPrev(table, 1).should.equal(0);
    });

    it('should get last element when index is 0', () => {
      const table = ['A', 'B', 'C'];
      getPrev(table, 0).should.equal(2);
    });
  });
  describe('getNext', () => {
    it('should get next element when index not last', () => {
      const table = ['A', 'B', 'C'];
      getNext(table, 1).should.equal(2);
    });
    it('should get first element when index is last', () => {
      const table = ['A', 'B', 'C'];
      getNext(table, 2).should.equal(0);
    });
  });
});
