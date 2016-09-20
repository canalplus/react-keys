import { _selector } from '../src/selector';
import { globalStore } from '../src/listener';
import { NAME } from '../src/constants';
import sinon from 'sinon';
import { expect } from 'chai';

describe('selector', () => {
  it('should return a function', () => {
    _selector('default').should.be.instanceOf(Function);
  });
  it('should throw error when state does not exists', sinon.test(function() {
    this.stub(globalStore, 'getState').returns({});
    expect(() => _selector()()).to.throw(Error);
  }));
  it('should return default object when selector find nothing', sinon.test(function() {
    this.stub(globalStore, 'getState').returns({ [NAME]: {} });
    _selector('default')().should.eql({ marginLeft: 0, marginTop: 0 });
  }));
  it('should select binder state when it exists', sinon.test(function() {
    const binderState = { ok: 'returned' };
    this.stub(globalStore, 'getState').returns({ [NAME]: { 'binder1': binderState } });
    _selector('binder1')().should.equals(binderState);
  }));
});
