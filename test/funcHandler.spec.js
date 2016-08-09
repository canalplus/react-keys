/* eslint no-unused-expressions:0 */
import { execCb, enterTo } from '../src/funcHandler';
import * as actions from '../src/redux/actions';
import sinon from 'sinon';

describe('funcHandler.js', () => {
  describe('execCb', () => {
    it('should not throw error if function is null', () => {
      execCb(null);
    });

    it('should call function this next element', () => {
      const spy = sinon.spy();
      const el = { id: 1 };
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
      const el = { id: 1 };
      const props = { context: { obladi: 'olbada' } };
      execCb(spy, el, this, props);
      spy.should.have.been.calledOnce;
      spy.should.have.been.calledWith(el, props.context);
    });
  });
  describe('enterTo', () => {
    it('should not throw error if function is null', () => {
      enterTo(null);
    });

    it('should call function when callback is a func', () => {
      const spy = sinon.spy();
      enterTo(spy);
      spy.should.have.been.calledOnce;
    });

    it('should call enter when callback is a string', sinon.test(function() {
      this.mock(actions)
        .expects('enter')
        .once();
      enterTo('binder1', '1');
    }));
  });
});
