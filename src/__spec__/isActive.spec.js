import { isActive } from '../isActive';
import sinon from 'sinon';
import { globalStore } from '../listener';
import { NAME } from '../constants';

describe('isActive.js', () => {
  it('should return true when no state and props active = true', () => {
    const props = { id: '1', active: true };
    isActive(props).should.be.true;
  });
  it('should return false when no state and props active = false', () => {
    const props = { id: '1', active: false };
    isActive(props).should.be.true;
  });
  it('should return active status when state and no sub state', sinon.test(function() {
    this.stub(globalStore, 'getState').returns({});
    const props = { id: '1', active: true };
    isActive(props).should.be.true;
  }));
  it('should return active status when state and one id sub state', sinon.test(function() {
    this.stub(globalStore, 'getState').returns({ [NAME]: {} });
    const props = { id: '1', active: false };
    isActive(props).should.be.false;
  }));
  it('should return false when state and active = false sub state', sinon.test(function() {
    this.stub(globalStore, 'getState').returns({ [NAME]: { 1: { active: false } } });
    const props = { id: '1', active: true };
    isActive(props).should.be.false;
  }));
  it('should return true when state and id.active = true sub state', sinon.test(function() {
    this.stub(globalStore, 'getState').returns({ [NAME]: { 1: { active: true } } });
    const props = { id: '1', active: true };
    isActive(props).should.be.true;
  }));
  it('should return true when state and id.active = true  and props = false sub state', sinon.test(function() {
    this.stub(globalStore, 'getState').returns({ [NAME]: { 1: { active: true } } });
    const props = { id: '1', active: false };
    isActive(props).should.be.true;
  }));
});
