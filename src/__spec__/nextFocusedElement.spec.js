import { nextFocusedElement } from '../nextFocusedElement';
import { globalStore } from '../listener';
import { NAME } from '../constants';
import sinon from 'sinon';
import { expect } from 'chai';

describe('nextFocusedElement.js', () => {
  it('should throw error when state does not exists', sinon.test(function() {
    this.stub(globalStore, 'getState').returns({});
    expect(() => nextFocusedElement({}, [], '')).to.throw(Error);
  }));
  it('should return current element when no store', () => {
    const el = { id: '2' };
    const elements = [{ id: '1' }, { id: '2' }];
    nextFocusedElement(el, elements, '1').should.equal(el);
  });
  it('should return new element from selectedId when having a store', sinon.test(function() {
    this.stub(globalStore, 'getState').returns({ [NAME]: { 1: { selectedId: '2' } } });
    const el1 = { id: '1' };
    const el2 = { id: '2' };
    const elements = [el1, el2];
    nextFocusedElement(el1, elements, '1').should.equal(el2);
  }));
  it('should return current element when having a store but not found element', sinon.test(function() {
    this.stub(globalStore, 'getState').returns({ [NAME]: { 1: { selectedId: '3' } } });
    const el1 = { id: '1' };
    const el2 = { id: '2' };
    const elements = [el1, el2];
    nextFocusedElement(el1, elements, '1').should.equal(el1);
  }));
});
