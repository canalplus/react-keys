/* eslint no-unused-expressions:0 */
import {
  findRightElement,
  findLeftElement,
  findDownElement,
  findUpElement,
  isBetween,
  createList,
  selectedElement,
  build,
} from '../../src/engines/mosaic';
import {expect} from 'chai';
import jsdom from 'jsdom';

describe('engine/mosaic.js', () => {
  it('createList should return an array', () => {
    const dom = jsdom.jsdom('<li id="0"></li><li id="1"></li><li id="2"></li>');
    createList(dom, 'li').should.be.an.array;
    createList(dom, 'li').should.have.lengthOf(3);
  });
  it('build should return an array', () => {
    const dom = jsdom.jsdom('<li id="0"></li><li id="1"></li><li id="2"></li>');
    const list = createList(dom, 'li');
    const options = {};
    const builded = build(list, options);
    builded[0].id.should.equal('0');
    builded[1].id.should.equal('1');
    builded[2].id.should.equal('2');
  });
  const mosaicCoords = [
    {
      id: 1,
      top: 0,
      left: 0,
    },
    {
      id: 2,
      top: 0,
      left: 10,
    },
    {
      id: 3,
      top: 0,
      left: 20,
    },
    {
      id: 4,
      top: 10,
      left: 0,
    },
    {
      id: 5,
      top: 10,
      left: 10,
    },
    {
      id: 6,
      top: 10,
      left: 20,
    },
  ];

  it('findRightElement should find first id element at right', () => {
    const secondEl = {
      id: 2,
      top: 0,
      left: 10,
    };
    const options = {accuracy: 0};
    findRightElement(secondEl, mosaicCoords, options).should.equal(3);
  });

  it('findRightElement should return undefined when there is no elements at right', () => {
    const thirdEl = {
      id: 3,
      top: 0,
      left: 20,
    };
    const options = {accuracy: 0};
    expect(findRightElement(thirdEl, mosaicCoords, options)).to.be.undefined;
  });

  it('findLeftElement should find first element id at left', () => {
    const secondEl = {
      id: 2,
      top: 0,
      left: 10,
    };
    const options = {accuracy: 0};
    findLeftElement(secondEl, mosaicCoords, options).should.equal(1);
  });

  it('findLeftElement should return undefined when there is no elements at left', () => {
    const firstEl = {
      id: 1,
      top: 0,
      left: 0,
    };
    const options = {accuracy: 0};
    expect(findLeftElement(firstEl, mosaicCoords, options)).to.be.undefined;
  });

  it('findDownElement should return first element id at down', () => {
    const secondEl = {
      id: 2,
      top: 0,
      left: 10,
    };
    const options = {accuracy: 0};
    findDownElement(secondEl, mosaicCoords, options).should.equal(5);
  });

  it('findDownElement should return undefined when there is no elements at down', () => {
    const fifthEl = {
      id: 5,
      top: 10,
      left: 10,
    };
    const options = {accuracy: 0};
    expect(findDownElement(fifthEl, mosaicCoords, options)).to.be.undefined;
  });

  it('findUpElement should return first element id at up', () => {
    const fifthEl = {
      id: 5,
      top: 10,
      left: 10,
    };
    const options = {accuracy: 0};
    findUpElement(fifthEl, mosaicCoords, options).should.equal(2);
  });

  it('findUpElement should return undefined when there is no elements at up', () => {
    const secondEl = {
      id: 2,
      top: 0,
      left: 10,
    };
    const options = {accuracy: 0};
    expect(findUpElement(secondEl, mosaicCoords, options)).to.be.undefined;
  });

  describe('isBetween', () => {
    it('should return true if is in between', () => {
      isBetween(5, 5, 5).should.be.true;
      isBetween(5, 6, 4).should.be.true;
      isBetween(5, 10, 1).should.be.true;
    });

    it('should return false when not between or NaN', () => {
      isBetween(5, 4, 3).should.be.false;
      isBetween(5, 2, 5).should.be.false;
      isBetween('5', 10, 1).should.be.false;
    });
  });

  describe('selectedElement', () => {
    it('should return element from id when it exists in array', () => {
      const array = [{id: '1'}, {id: '2'}];
      selectedElement(array, '2').id.should.equal('2');
    });
    it('should should return first element when id is not found', () => {
      const array = [{id: '1'}, {id: '2'}];
      selectedElement(array, '3').id.should.equal('1');
      selectedElement(array, null).id.should.equal('1');
    });
  });
});
