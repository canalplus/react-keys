import {
  createList,
  calculDowScore,
  calculLeftScore,
  calculUpScore,
  calculRightScore,
  elementSort,
  findElement,
  upArray,
  downArray,
  leftArray,
  rightArray,
  build,
} from '../mosaic';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';

describe('engine/mosaic.js', () => {
  describe('calculDowScore', () => {
    it('should return 5 with values', () => {
      const el = { top: 10, left: 15 };
      const elCoords = { down: 5, left: 15 };
      calculDowScore(el, elCoords).should.equal(5);
    });
    it('should return 10 with values', () => {
      const el = { top: 10, left: 15 };
      const elCoords = { down: 5, left: 10 };
      calculDowScore(el, elCoords).should.equal(10);
    });
    it('should return 20 with values', () => {
      const el = { top: 10, left: 15 };
      const elCoords = { down: 25, left: 10 };
      calculDowScore(el, elCoords).should.equal(20);
    });
  });
  describe('calculLeftScore', () => {
    it('should return 5 with values', () => {
      const el = { top: 10, right: 15 };
      const elCoords = { top: 5, left: 15 };
      calculLeftScore(el, elCoords).should.equal(5);
    });
    it('should return 10 with values', () => {
      const el = { top: 10, right: 15 };
      const elCoords = { top: 5, left: 10 };
      calculLeftScore(el, elCoords).should.equal(10);
    });
    it('should return 20 with values', () => {
      const el = { top: 10, right: 15 };
      const elCoords = { top: 25, left: 10 };
      calculLeftScore(el, elCoords).should.equal(20);
    });
  });
  describe('calculUpScore', () => {
    it('should return 5 with values', () => {
      const el = { down: 10, left: 15 };
      const elCoords = { top: 5, left: 15 };
      calculUpScore(el, elCoords).should.equal(5);
    });
    it('should return 10 with values', () => {
      const el = { down: 10, left: 15 };
      const elCoords = { top: 5, left: 10 };
      calculUpScore(el, elCoords).should.equal(10);
    });
    it('should return 20 with values', () => {
      const el = { down: 10, left: 15 };
      const elCoords = { top: 25, left: 10 };
      calculUpScore(el, elCoords).should.equal(20);
    });
  });
  describe('calculRightScore', () => {
    it('should return 5 with values', () => {
      const el = { top: 10, left: 15 };
      const elCoords = { top: 5, right: 15 };
      calculRightScore(el, elCoords).should.equal(5);
    });
    it('should return 10 with values', () => {
      const el = { top: 10, left: 15 };
      const elCoords = { top: 5, right: 10 };
      calculRightScore(el, elCoords).should.equal(10);
    });
    it('should return 20 with values', () => {
      const el = { top: 10, left: 15 };
      const elCoords = { top: 25, right: 10 };
      calculRightScore(el, elCoords).should.equal(20);
    });
  });
  describe('elementSort', () => {
    it('should return score for two elements', () => {
      const elCoords = { top: 25, right: 10 };
      const prev = { top: 25, left: 15 };
      const next = { top: 25, left: 20 };
      const rightScore = elementSort(elCoords, calculRightScore);
      rightScore(prev, next).should.equal(-5);
    });
  });
  describe('findElement', () => {
    it('should return first id element of table', () => {
      findElement([{ id: 1 }, { id: 2 }]).should.equal(1);
    });
    it('should return underfined if empty', () => {
      expect(findElement([])).to.equal(undefined);
    });
  });
  describe('upArray', () => {
    it('should filter and sort array', () => {
      const elCoords = { top: 30, left: 10 };
      const coords = [
        { down: 40, left: 10 },
        { down: 10, left: 10 },
        { down: 20, left: 10 },
      ];
      upArray(elCoords, coords).should.eql([
        { down: 20, left: 10 },
        { down: 10, left: 10 },
      ]);
    });
  });
  describe('downArray', () => {
    it('should filter and sort array', () => {
      const elCoords = { down: 30, left: 10 };
      const coords = [
        { top: 40, left: 10 },
        { top: 10, left: 10 },
        { top: 30, left: 10 },
      ];
      downArray(elCoords, coords).should.eql([
        { top: 30, left: 10 },
        { top: 40, left: 10 },
      ]);
    });
  });
  describe('leftArray', () => {
    it('should filter and sort array', () => {
      const elCoords = { top: 30, left: 10 };
      const coords = [
        { top: 40, right: 20 },
        { top: 10, right: 5 },
        { top: 30, right: 10 },
      ];
      leftArray(elCoords, coords).should.eql([
        { top: 30, right: 10 },
        { top: 10, right: 5 },
      ]);
    });
  });
  describe('rightArray', () => {
    it('should filter and sort array', () => {
      const elCoords = { top: 30, right: 10 };
      const coords = [
        { top: 40, left: 20 },
        { top: 10, left: 5 },
        { top: 30, left: 10 },
      ];
      rightArray(elCoords, coords).should.eql([
        { top: 30, left: 10 },
        { top: 40, left: 20 },
      ]);
    });
  });
  it('createList should return an array', () => {
    const { document } = new JSDOM(
      '<li id="0"></li><li id="1"></li><li id="2"></li>'
    ).window;
    createList(document, 'li').should.be.an.instanceOf(Array);
    createList(document, 'li').should.have.lengthOf(3);
  });
  it('build should return an array', () => {
    const { document } = new JSDOM(
      '<li id="0"></li><li id="1"></li><li id="2"></li>'
    ).window;
    const list = createList(document, 'li');
    const options = { wrapper: { top: 0, down: 0, left: 0, right: 0 } };
    const builded = build(list, options);
    builded[0].id.should.equal('0');
    builded[1].id.should.equal('1');
    builded[2].id.should.equal('2');
  });
});
