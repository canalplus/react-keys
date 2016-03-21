/* eslint no-unused-expressions:0 */
import {
  findRightElement,
  findLeftElement,
  findDownElement,
  findUpElement,
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
    findRightElement(secondEl, mosaicCoords).should.equal(3);
  });

  it('findRightElement should return undefined when there is no elements at right', () => {
    const thirdEl = {
      id: 3,
      top: 0,
      left: 20,
    };
    expect(findRightElement(thirdEl, mosaicCoords)).to.be.undefined;
  });

  it('findLeftElement should find first element id at left', () => {
    const secondEl = {
      id: 2,
      top: 0,
      left: 10,
    };
    findLeftElement(secondEl, mosaicCoords).should.equal(1);
  });

  it('findLeftElement should return undefined when there is no elements at left', () => {
    const firstEl = {
      id: 1,
      top: 0,
      left: 0,
    };
    expect(findLeftElement(firstEl, mosaicCoords)).to.be.undefined;
  });

  it('findDownElement should return first element id at down', () => {
    const secondEl = {
      id: 2,
      top: 0,
      left: 10,
    };
    findDownElement(secondEl, mosaicCoords).should.equal(5);
  });

  it('findDownElement should return undefined when there is no elements at down', () => {
    const fifthEl = {
      id: 5,
      top: 10,
      left: 10,
    };
    expect(findDownElement(fifthEl, mosaicCoords)).to.be.undefined;
  });

  it('findUpElement should return first element id at up', () => {
    const fifthEl = {
      id: 5,
      top: 10,
      left: 10,
    };
    findUpElement(fifthEl, mosaicCoords).should.equal(2);
  });

  it('findUpElement should return undefined when there is no elements at up', () => {
    const secondEl = {
      id: 2,
      top: 0,
      left: 10,
    };
    expect(findUpElement(secondEl, mosaicCoords)).to.be.undefined;
  });
});
