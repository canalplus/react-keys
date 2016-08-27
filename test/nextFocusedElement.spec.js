import { nextFocusedElement } from '../src/nextFocusedElement';
import { createStore } from 'redux';

describe('nextFocusedElement.js', () => {
  it('should return current element when no store', () => {
    const el = { id: '2' };
    const elements = [{ id: '1' }, { id: '2' }];
    nextFocusedElement(el, () => null, elements, '1').should.equal(el);
  });
  it('should return new element from selectedId when having a store', () => {
    const el1 = { id: '1' };
    const el2 = { id: '2' };
    const elements = [el1, el2];
    const store = createStore((state = { '@@keys': { 1: { selectedId: '2' } } }) => state);
    nextFocusedElement(el1, store, elements, '1').should.equal(el2);
  });
  it('should return current element when having a store but not found element', () => {
    const el1 = { id: '1' };
    const el2 = { id: '2' };
    const elements = [el1, el2];
    const store = createStore((state = { '@@keys': { 1: { selectedId: '3' } } }) => state);
    nextFocusedElement(el1, store, elements, '1').should.equal(el1);
  });
});
