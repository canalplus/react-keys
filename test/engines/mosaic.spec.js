/* eslint no-unused-expressions:0 */
import {
  findRightElement,
  findLeftElement,
  findDownElement,
  findUpElement,
  isBetween,
} from '../../src/engines/mosaic';
import {expect} from 'chai';

describe('engine/mosaic.js', () => {
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
});
