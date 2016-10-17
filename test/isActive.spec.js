import { isActive } from '../src/isActive';
import { createStore } from 'redux';

describe('isActive.js', () => {
  it('should return true when no state and props active = true', () => {
    const props = { id: '1', active: true };
    isActive(() => null, props).should.be.true;
  });
  it('should return false when no state and props active = false', () => {
    const props = { id: '1', active: false };
    isActive(() => null, props).should.be.false;
  });
  it('should return false when state and no @@keys sub state', () => {
    const props = { id: '1', active: true };
    const store = createStore((state = {}) => state);
    isActive(store, props).should.be.false;
  });
  it('should return false when state and noe @@keys.id sub state', () => {
    const props = { id: '1', active: true };
    const store = createStore((state = { '@@keys': {} }) => state);
    isActive(store, props).should.be.false;
  });
  it('should return false when state and @@keys.active = false sub state', () => {
    const props = { id: '1', active: true };
    const store = createStore((state = { '@@keys': { 1: { active: false } } }) => state);
    isActive(store, props).should.be.false;
  });
  it('should return true when state and @@keys.id.active = true sub state', () => {
    const props = { id: '1', active: true };
    const store = createStore((state = { '@@keys': { 1: { active: true } } }) => state);
    isActive(store, props).should.be.true;
  });
  it('should return false when state and @@keys.id.active = true sub state and props active === false', () => {
    const props = { id: '1', active: false };
    const store = createStore((state = { '@@keys': { 1: { active: true } } }) => state);
    isActive(store, props).should.be.false;
  });
  it('should return false when state and @@keys.id.active = false sub state and props active === false', () => {
    const props = { id: '1', active: false };
    const store = createStore((state = { '@@keys': { 1: { active: false } } }) => state);
    isActive(store, props).should.be.false;
  });
});
