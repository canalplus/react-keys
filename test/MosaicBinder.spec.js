/* eslint no-unused-expressions:0 */
/* eslint no-unused-vars:0 */
import React from 'react';
import MosaicBinder from '../src/MosaicBinder';
import {shallow} from 'enzyme';
import * as constants from '../src/constants';

describe('MosaicBinder.jsx', () => {
  it('should wrap with tagName div', () => {
    const keyBinder = shallow(<MosaicBinder binderId="1"/>);
    keyBinder.should.have.tagName('div');
  });

  describe('_flipflop', () => {
    let keyBinder;
    beforeEach(() => {
      keyBinder = new MosaicBinder({});
    });
    it('should flipflop from down to up', () => {
      keyBinder.prevDir = constants.C_DOWN;
      keyBinder._flipflop(constants.C_UP);
      keyBinder.prevDir.should.equal(constants.C_UP);
    });
    it('should do nothing when not a flipflop from down', () => {
      keyBinder.prevDir = constants.C_DOWN;
      keyBinder._flipflop(constants.C_LEFT);
      keyBinder.prevDir.should.equal(constants.C_DOWN);
    });
    it('should flipflop from up to down', () => {
      keyBinder.prevDir = constants.C_UP;
      keyBinder._flipflop(constants.C_DOWN);
      keyBinder.prevDir.should.equal(constants.C_DOWN);
    });
    it('should do nothing when not a flipflop from up', () => {
      keyBinder.prevDir = constants.C_UP;
      keyBinder._flipflop(constants.C_LEFT);
      keyBinder.prevDir.should.equal(constants.C_UP);
    });
    it('should flipflop from left to right', () => {
      keyBinder.prevDir = constants.C_LEFT;
      keyBinder._flipflop(constants.C_RIGHT);
      keyBinder.prevDir.should.equal(constants.C_RIGHT);
    });
    it('should do nothing when not a flipflop from left', () => {
      keyBinder.prevDir = constants.C_LEFT;
      keyBinder._flipflop(constants.C_DOWN);
      keyBinder.prevDir.should.equal(constants.C_LEFT);
    });
    it('should flipflop from right to left', () => {
      keyBinder.prevDir = constants.C_RIGHT;
      keyBinder._flipflop(constants.C_LEFT);
      keyBinder.prevDir.should.equal(constants.C_LEFT);
    });
    it('should do nothing when not a flipflop from right', () => {
      keyBinder.prevDir = constants.C_RIGHT;
      keyBinder._flipflop(constants.C_UP);
      keyBinder.prevDir.should.equal(constants.C_RIGHT);
    });
    it('should flipflop prev/next elements when previous direction is found', () => {
      keyBinder.prevDir = constants.C_RIGHT;
      keyBinder.prevEl = '1';
      keyBinder.nextEl = '2';
      keyBinder._flipflop(constants.C_LEFT);
      keyBinder.prevEl.should.equal('2');
      keyBinder.nextEl.should.equal('1');
    });
    it('should no flipflop prev/next elements where previous direction not found', () => {
      keyBinder.prevDir = constants.C_RIGHT;
      keyBinder.prevEl = '1';
      keyBinder.nextEl = '2';
      keyBinder._flipflop(constants.UP);
      keyBinder.prevEl.should.equal('1');
      keyBinder.nextEl.should.equal('2');
    });
  });
});
