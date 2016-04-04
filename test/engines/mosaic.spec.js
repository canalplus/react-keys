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

  it('findRightElement shoud return first element on right when not align', () => {
    const exempleCoords = [
      {
        id: '1',
        left: 100,
        top: 0,
      },
      {
        id: '2',
        left: 200,
        top: 0,
      },
      {
        id: '3',
        left: 300,
        top: 0,
      },
    ];
    const selectedElement = {
      id: '1',
      left: 100,
      top: 0,
    };
    findRightElement(selectedElement, exempleCoords).should.equal('2');
  });

  it('findRightElement should return undefined when there is no elements at right', () => {
    const thirdEl = {
      id: 3,
      top: 0,
      left: 20,
    };
    expect(findRightElement(thirdEl, mosaicCoords)).to.be.undefined;
  });

  it('findRightElement shoud return first element on right when not align', () => {
    const exempleCoords = [
      {
        id: '1',
        left: 200,
        top: 0,
      },
      {
        id: '2',
        left: 200,
        top: 100,
      },
      {
        id: '3',
        left: 0,
        top: 300,
      },
    ];
    const selectedElement = {
      id: '3',
      left: 0,
      top: 300,
    };
    findRightElement(selectedElement, exempleCoords).should.equal('2');
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

  it('findLeftElement shoud return first element on left when not align on bottom', () => {
    const porfilesCoords = [
      {
        id: '1',
        left: 300,
        top: 0,
      },
      {
        id: '2',
        left: 100,
        top: 100,
      },
      {
        id: '3',
        left: 100,
        top: 300,
      },
    ];
    const selectedElement = {
      id: '1',
      left: 300,
      top: 0,
    };
    findLeftElement(selectedElement, porfilesCoords).should.equal('2');
  });

  it('findLeftElement shoud return first element on left when not align on top', () => {
    const porfilesCoords = [
      {
        id: '1',
        left: 300,
        top: 400,
      },
      {
        id: '2',
        left: 100,
        top: 100,
      },
      {
        id: '3',
        left: 100,
        top: 300,
      },
    ];
    const selectedElement = {
      id: '1',
      left: 300,
      top: 400,
    };
    findLeftElement(selectedElement, porfilesCoords).should.equal('3');
  });

  it('findDownElement should return first element id at down', () => {
    const secondEl = {
      id: 2,
      top: 0,
      left: 10,
    };
    findDownElement(secondEl, mosaicCoords).should.equal(5);
  });

  it('findDownElement should return first element id at down #2', () => {
    const exempleCoords = [
      {
        id: '1',
        left: 0,
        top: 0,
      },
      {
        id: '2',
        left: 0,
        top: 100,
      },
      {
        id: '3',
        left: 0,
        top: 200,
      },
    ];
    const selectedElement = {
      id: '1',
      left: 0,
      top: 0,
    };
    findDownElement(selectedElement, exempleCoords).should.equal('2');
  });

  it('findDownElement should return undefined when there is no elements at down', () => {
    const fifthEl = {
      id: 5,
      top: 10,
      left: 10,
    };
    expect(findDownElement(fifthEl, mosaicCoords)).to.be.undefined;
  });

  it('findDownElement shoud return first element on top when not align', () => {
    const exampleCoords = [
      {
        id: '1',
        left: 0,
        top: 100,
      },
      {
        id: '2',
        left: 200,
        top: 300,
      },
      {
        id: '3',
        left: 300,
        top: 300,
      },
    ];
    const selectedElement = {
      id: '1',
      left: 0,
      top: 100,
    };
    findDownElement(selectedElement, exampleCoords).should.equal('2');
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

  it('findUpElement shoud return first element on top when not align', () => {
    const porfilesCoords = [
      {
        id: '1',
        left: 100,
        top: 100,
      },
      {
        id: '2',
        left: 200,
        top: 100,
      },
      {
        id: '3',
        left: 0,
        top: 200,
      },
    ];
    const selectedElement = {
      id: '3',
      left: 0,
      top: 200,
    };
    findUpElement(selectedElement, porfilesCoords).should.equal('1');
  });

  it('findUpElement shoud return first element on top on colunm', () => {
    const exampleCoords = [
      {
        id: '1',
        left: 0,
        top: 100,
      },
      {
        id: '2',
        left: 0,
        top: 200,
      },
      {
        id: '3',
        left: 0,
        top: 300,
      },
    ];
    const selectedElement = {
      id: '3',
      left: 0,
      top: 300,
    };
    findUpElement(selectedElement, exampleCoords).should.equal('2');
  });
});
