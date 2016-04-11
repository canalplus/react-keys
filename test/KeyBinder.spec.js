/* eslint no-unused-expressions:0 */
/* eslint no-unused-vars:0 */
import React from 'react';
import KeyBinder from '../src/KeyBinder';
import {shallow} from 'enzyme';
import * as constants from '../src/constants';

describe('KeyBinder.jsx', () => {
  it('should wrap with tagName div', () => {
    const keyBinder = shallow(<KeyBinder />);
    keyBinder.should.have.tagName('div');
  });

  describe('_flipflop', () => {
    let keyBinder;
    beforeEach(() => {
      keyBinder = new KeyBinder({});
    });
    it('should flipflop from down to up', () => {
      keyBinder.previousDirection = constants.C_DOWN;
      keyBinder._flipflop(constants.C_UP);
      keyBinder.previousDirection.should.equal(constants.C_UP);
    });
    it('should do nothing when not a flipflop from down', () => {
      keyBinder.previousDirection = constants.C_DOWN;
      keyBinder._flipflop(constants.C_LEFT);
      keyBinder.previousDirection.should.equal(constants.C_DOWN);
    });
    it('should flipflop from up to down', () => {
      keyBinder.previousDirection = constants.C_UP;
      keyBinder._flipflop(constants.C_DOWN);
      keyBinder.previousDirection.should.equal(constants.C_DOWN);
    });
    it('should do nothing when not a flipflop from up', () => {
      keyBinder.previousDirection = constants.C_UP;
      keyBinder._flipflop(constants.C_LEFT);
      keyBinder.previousDirection.should.equal(constants.C_UP);
    });
    it('should flipflop from left to right', () => {
      keyBinder.previousDirection = constants.C_LEFT;
      keyBinder._flipflop(constants.C_RIGHT);
      keyBinder.previousDirection.should.equal(constants.C_RIGHT);
    });
    it('should do nothing when not a flipflop from left', () => {
      keyBinder.previousDirection = constants.C_LEFT;
      keyBinder._flipflop(constants.C_DOWN);
      keyBinder.previousDirection.should.equal(constants.C_LEFT);
    });
    it('should flipflop from right to left', () => {
      keyBinder.previousDirection = constants.C_RIGHT;
      keyBinder._flipflop(constants.C_LEFT);
      keyBinder.previousDirection.should.equal(constants.C_LEFT);
    });
    it('should do nothing when not a flipflop from right', () => {
      keyBinder.previousDirection = constants.C_RIGHT;
      keyBinder._flipflop(constants.C_UP);
      keyBinder.previousDirection.should.equal(constants.C_RIGHT);
    });
    it('should flipflop prev/next elements when previous direction is found', () => {
      keyBinder.previousDirection = constants.C_RIGHT;
      keyBinder.prevFocusedElement = '1';
      keyBinder.nextFocusedElement = '2';
      keyBinder._flipflop(constants.C_LEFT);
      keyBinder.prevFocusedElement.should.equal('2');
      keyBinder.nextFocusedElement.should.equal('1');
    });
    it('should no flipflop prev/next elements where previous direction not found', () => {
      keyBinder.previousDirection = constants.C_RIGHT;
      keyBinder.prevFocusedElement = '1';
      keyBinder.nextFocusedElement = '2';
      keyBinder._flipflop(constants.UP);
      keyBinder.prevFocusedElement.should.equal('1');
      keyBinder.nextFocusedElement.should.equal('2');
    });
  });
});
