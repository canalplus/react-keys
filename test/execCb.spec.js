/* eslint no-unused-expressions:0 */
import {execCb} from '../src/execCb';
import sinon from 'sinon';

describe('execCb', () => {
  it('should not throw error if function is null', () => {
    execCb(null);
  });

  it('should call function this next element', () => {
    const spy = sinon.spy();
    const el = {id: 1};
    execCb(spy, el);
    spy.should.have.been.calledOnce;
    spy.should.have.been.calledWith(el);
  });

  it('should call function with {} has nextEl if nextEl is null', () => {
    const spy = sinon.spy();
    execCb(spy, null);
    spy.should.have.been.calledOnce;
    spy.should.have.been.calledWith({});
  });

  it('should call with el and context if props.context', () => {
    const spy = sinon.spy();
    const el = {id: 1};
    const props = {context: {obladi: 'olbada'}};
    execCb(spy, el, this, props);
    spy.should.have.been.calledOnce;
    spy.should.have.been.calledWith(el, props.context);
  });
});
