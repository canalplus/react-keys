import {
  build,
  getPrev,
  getNext,
} from '../carousel';
import { expect } from 'chai';

describe('engine/carousel.js', () => {
  describe('build', () => {
    it('should get initial state of a carousel depend of its index', () => {
      const table = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
      build(table, 5, 0).should.eql(['J', 'K', 'A', 'B', 'C']);
      build(table, 5, 5).should.eql(['D', 'E', 'F', 'G', 'H']);
      build(table, 5, 10).should.eql(['I', 'J', 'K', 'A', 'B']);
      build(table, 7, 5).should.eql(['C', 'D', 'E', 'F', 'G', 'H', 'I']);
    });
    it('should build with null elements when not circular', () => {
      const table = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
      build(table, 5, 2, false).should.eql(['A', 'B', 'C', 'D', 'E']);
      build(table, 5, 0, false).should.eql([null, null, 'A', 'B', 'C']);
      build(table, 5, 10, false).should.eql(['I', 'J', 'K', null, null]);
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
    it('should return null if first element and no circular', () => {
      const table = ['A', 'B', 'C'];
      expect(getPrev(table, 0, false)).to.be.null;
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
    it('should return null if first element and no circular', () => {
      const table = ['A', 'B', 'C'];
      expect(getNext(table, 2, false)).to.be.null;
    });
  });
});
