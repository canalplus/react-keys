import sinon from 'sinon';
import {
  calculMarginOnLeft,
  calculMarginOnRight,
  calculMarginOnDown,
  calculMarginOnTop,
  isReachableRight,
  isReachableLeft,
  isReachableDown,
  isReachableTop,
  boundsMargin,
} from '../bounds';
import * as helpers from '../helpers';

describe('bounds', () => {
  describe('boundsMargin', () => {
    it(
      'should calcul left dir',
      sinon.test(function() {
        const state = {
          wrapper: { left: 10, top: 10, right: 10, down: 10 },
          marginLeft: 0,
          marginTop: 0,
          elements: [
            { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          ],
          downLimit: 0,
          rightLimit: 0,
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          rightGap: 0,
          leftGap: 0,
          downGap: 0,
          selectedId: 0,
        };
        this.stub(helpers, 'calculateElSpace')
          .onCall(0)
          .returns({
            id: '1',
            top: 5,
            left: 5,
            right: 5,
            down: 5,
          })
          .onCall(1)
          .returns({
            id: '0',
            top: 5,
            left: 0,
            right: 10,
            down: 5,
          });
        boundsMargin('1', state).should.eql({
          marginTop: 0,
          marginLeft: 0,
          elements: [
            {
              coords: {
                down: 5,
                left: 5,
                right: 5,
                top: 5,
              },
              id: '1',
            },
          ],
        });
      })
    );

    it(
      'should calcul right dir',
      sinon.test(function() {
        const state = {
          wrapper: { left: 10, top: 10, right: 20, down: 20 },
          marginLeft: 0,
          marginTop: 0,
          elements: [
            { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          ],
          downLimit: 0,
          rightLimit: 0,
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          rightGap: 0,
          leftGap: 0,
          downGap: 0,
          selectedId: 0,
        };
        this.stub(helpers, 'calculateElSpace')
          .onCall(0)
          .returns({
            id: '1',
            top: 5,
            left: 20,
            right: 5,
            down: 5,
          })
          .onCall(1)
          .returns({
            id: '0',
            top: 5,
            left: 25,
            right: 10,
            down: 5,
          });
        boundsMargin('1', state).should.eql({
          marginTop: 0,
          marginLeft: 0,
          elements: [
            {
              coords: {
                down: 5,
                left: 5,
                right: 5,
                top: 5,
              },
              id: '1',
            },
          ],
        });
      })
    );

    it(
      'should calcul up dir',
      sinon.test(function() {
        const state = {
          wrapper: { left: 10, top: 10, right: 10, down: 10 },
          marginLeft: 0,
          marginTop: 0,
          elements: [
            { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          ],
          downLimit: 0,
          rightLimit: 0,
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          rightGap: 0,
          leftGap: 0,
          downGap: 0,
          selectedId: 0,
        };
        this.stub(helpers, 'calculateElSpace')
          .onCall(0)
          .returns({
            id: '1',
            top: 5,
            left: 10,
            right: 5,
            down: 5,
          })
          .onCall(1)
          .returns({
            id: '0',
            top: 5,
            left: 15,
            right: 10,
            down: 5,
          });
        boundsMargin('1', state).should.eql({
          marginTop: 0,
          marginLeft: 0,
          elements: [
            {
              coords: {
                down: 5,
                left: 5,
                right: 5,
                top: 5,
              },
              id: '1',
            },
          ],
        });
      })
    );

    it(
      'should calcul down dir',
      sinon.test(function() {
        const state = {
          wrapper: { left: 10, top: 10, right: 10, down: 10 },
          marginLeft: 0,
          marginTop: 0,
          elements: [
            { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          ],
          downLimit: 0,
          rightLimit: 0,
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          rightGap: 0,
          leftGap: 0,
          downGap: 0,
        };
        this.stub(helpers, 'calculateElSpace').returns({
          id: '1',
          top: 5,
          left: 5,
          right: 5,
          down: 5,
        });
        boundsMargin('1', state).should.eql({
          marginTop: 0,
          marginLeft: 0,
          elements: [
            {
              coords: {
                down: 5,
                left: 5,
                right: 5,
                top: 5,
              },
              id: '1',
            },
          ],
        });
      })
    );
  });

  describe('isReachableTop', () => {
    it('should return false if selected top + marginTop > wrapper height + gap', () => {
      const wrapper = { height: 100 };
      const selectedId = { top: 115 };
      const gap = 10;
      const marginTop = 0;
      isReachableTop(wrapper, selectedId, gap, marginTop).should.be.false;
    });

    it('should return true if selected top + marginTop <= wrapper height + gap', () => {
      const wrapper = { height: 100 };
      const selectedId = { top: 15 };
      const gap = 2;
      const marginTop = 50;
      isReachableTop(wrapper, selectedId, gap, marginTop).should.be.true;
    });

    it('should return true if selected top = 0', () => {
      const wrapper = { height: 100 };
      const selectedId = { top: 0 };
      const gap = 5;
      const marginTop = 0;
      isReachableTop(wrapper, selectedId, gap, marginTop).should.be.true;
    });
  });

  describe('isReachableDown', () => {
    it('should return false if wrapper height < selected down + marginTop + gap', () => {
      const wrapper = { height: 200 };
      const selectedId = { down: 220 };
      const gap = 10;
      const marginTop = -15;
      isReachableDown(wrapper, selectedId, gap, marginTop).should.be.false;
    });

    it('should return true if wrapper height >= selected down + marginTop + gap', () => {
      const wrapper = { height: 20 };
      const selectedId = { down: 5 };
      const gap = 10;
      const marginTop = 0;
      isReachableDown(wrapper, selectedId, gap, marginTop).should.be.true;
    });

    it('should return true if wrapper height = selected down + marginTop + gap', () => {
      const wrapper = { height: 15 };
      const selectedId = { down: 5 };
      const gap = 10;
      const marginTop = 0;
      isReachableDown(wrapper, selectedId, gap, marginTop).should.be.true;
    });
  });

  describe('isReachableLeft', () => {
    it('should return true if selected left + marginLeft > gap', () => {
      const selectedId = { left: 35 };
      const gap = 10;
      const marginLeft = -15;
      isReachableLeft(selectedId, gap, marginLeft).should.be.true;
    });

    it('should return false if selected left + marginLeft < gap', () => {
      const selectedId = { left: 25 };
      const gap = 10;
      const marginLeft = -20;
      isReachableLeft(selectedId, gap, marginLeft).should.be.false;
    });

    it('should return true if selected left + marginLeft = gap', () => {
      const selectedId = { left: 20 };
      const gap = 10;
      const marginLeft = -10;
      isReachableLeft(selectedId, gap, marginLeft).should.be.true;
    });
  });

  describe('isReachableRight', () => {
    it('should return false if wrapper width < selected right - marginLeft + gap', () => {
      const wrapper = { width: 10 };
      const selectedId = { right: 25 };
      const gap = 10;
      const marginLeft = -10;
      isReachableRight(wrapper, selectedId, gap, marginLeft).should.be.false;
    });

    it('should return true if wrapper width > selected right - marginLeft + gap', () => {
      const wrapper = { width: 20 };
      const selectedId = { right: 5 };
      const gap = 3;
      const marginLeft = -10;
      isReachableRight(wrapper, selectedId, gap, marginLeft).should.be.true;
    });

    it('should return true if wrapper width = selected right - marginLeft + gap', () => {
      const wrapper = { width: 20 };
      const selectedId = { right: 5 };
      const gap = 5;
      const marginLeft = -10;
      isReachableRight(wrapper, selectedId, gap, marginLeft).should.be.true;
    });
  });

  describe('calculMarginOnTop', () => {
    it('should return down selectedEl coords by default', () => {
      const wrapper = { top: 0 };
      const selectedEl = { coords: { top: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const topGap = 0;
      calculMarginOnTop(
        wrapper,
        selectedEl,
        gap,
        boundedGap,
        topGap
      ).should.equal(-10);
    });

    it('should minor wrapper top from selectedEL cords top', () => {
      const wrapper = { top: 5 };
      const selectedEl = { coords: { top: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const topGap = 0;
      calculMarginOnTop(
        wrapper,
        selectedEl,
        gap,
        boundedGap,
        topGap
      ).should.equal(-5);
    });

    it('should minor gap from that', () => {
      const wrapper = { top: 5 };
      const selectedEl = { coords: { top: 10 } };
      const gap = 3;
      const boundedGap = 0;
      const topGap = 0;
      calculMarginOnTop(
        wrapper,
        selectedEl,
        gap,
        boundedGap,
        topGap
      ).should.equal(-2);
    });

    it('should use boundedGap if gap < 0', () => {
      const wrapper = { top: 5 };
      const selectedEl = { coords: { top: 10 } };
      const gap = 15;
      const boundedGap = 2;
      const topGap = 3;
      calculMarginOnTop(
        wrapper,
        selectedEl,
        gap,
        boundedGap,
        topGap
      ).should.equal(0);
    });

    it('should use topGap if boundedGap does not exist', () => {
      const wrapper = { top: 5 };
      const selectedEl = { coords: { top: 10 } };
      const gap = 15;
      const boundedGap = 0;
      const topGap = 3;
      calculMarginOnTop(
        wrapper,
        selectedEl,
        gap,
        boundedGap,
        topGap
      ).should.equal(0);
    });
  });

  describe('calculMarginOnDown', () => {
    it('should return down selectedEl coords by default', () => {
      const wrapper = { height: 0 };
      const selectedEl = { coords: { down: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const downLimit = 50;
      const downGap = 0;
      calculMarginOnDown(
        wrapper,
        selectedEl,
        gap,
        downLimit,
        boundedGap,
        downGap
      ).should.equal(-10);
    });

    it('should minor wrapper from selectedEl coords down', () => {
      const wrapper = { height: 5 };
      const selectedEl = { coords: { down: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const downLimit = 50;
      const downGap = 0;
      calculMarginOnDown(
        wrapper,
        selectedEl,
        gap,
        downLimit,
        boundedGap,
        downGap
      ).should.equal(-5);
    });

    it('should add gap from that', () => {
      const wrapper = { height: 5 };
      const selectedEl = { coords: { down: 10 } };
      const gap = 3;
      const boundedGap = 0;
      const downLimit = 50;
      const downGap = 0;
      calculMarginOnDown(
        wrapper,
        selectedEl,
        gap,
        downLimit,
        boundedGap,
        downGap
      ).should.equal(-8);
    });

    it('should use boundedGap if gap > downLimit', () => {
      const wrapper = { height: 5 };
      const selectedEl = { coords: { down: 10 } };
      const gap = 45;
      const boundedGap = 10;
      const downLimit = 50;
      const downGap = 0;
      calculMarginOnDown(
        wrapper,
        selectedEl,
        gap,
        downLimit,
        boundedGap,
        downGap
      ).should.equal(-45);
    });

    it('should use downGap if downLimit does not exist', () => {
      const wrapper = { height: 5 };
      const selectedEl = { coords: { down: 10 } };
      const gap = 45;
      const boundedGap = 0;
      const downLimit = 50;
      const downGap = 5;
      calculMarginOnDown(
        wrapper,
        selectedEl,
        gap,
        downLimit,
        boundedGap,
        downGap
      ).should.equal(-45);
    });
  });

  describe('calculMarginOnRight', () => {
    it('should return right selectedEl coords by default', () => {
      const wrapper = { width: 0 };
      const selectedEl = { coords: { right: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const rightLimit = 50;
      const rightGap = 0;
      calculMarginOnRight(
        wrapper,
        selectedEl,
        gap,
        rightLimit,
        boundedGap,
        rightGap
      ).should.equal(-10);
    });

    it('should minor wrapper right from selectedEl coords right', () => {
      const wrapper = { width: 5 };
      const selectedEl = { coords: { right: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const rightLimit = 50;
      const rightGap = 0;
      calculMarginOnRight(
        wrapper,
        selectedEl,
        gap,
        rightLimit,
        boundedGap,
        rightGap
      ).should.equal(-5);
    });

    it('should add gap from that', () => {
      const wrapper = { width: 5 };
      const selectedEl = { coords: { right: 10 } };
      const gap = 2;
      const boundedGap = 0;
      const rightLimit = 50;
      const rightGap = 0;
      calculMarginOnRight(
        wrapper,
        selectedEl,
        gap,
        rightLimit,
        boundedGap,
        rightGap
      ).should.equal(-7);
    });

    it('should use boundedGap if gap > rightLimit', () => {
      const wrapper = { width: 5 };
      const selectedEl = { coords: { right: 10 } };
      const gap = 45;
      const boundedGap = 5;
      const rightLimit = 50;
      const rightGap = 0;
      calculMarginOnRight(
        wrapper,
        selectedEl,
        gap,
        rightLimit,
        boundedGap,
        rightGap
      ).should.equal(-45);
    });

    it('should use right gap if boundedGap does not exist', () => {
      const wrapper = { width: 5 };
      const selectedEl = { coords: { right: 10 } };
      const gap = 45;
      const boundedGap = 0;
      const rightLimit = 50;
      const rightGap = 2;
      calculMarginOnRight(
        wrapper,
        selectedEl,
        gap,
        rightLimit,
        boundedGap,
        rightGap
      ).should.equal(-45);
    });
  });

  describe('calculMarginOnLeft', () => {
    it('should return left selectedEl coords by default', () => {
      const selectedEl = { coords: { left: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const leftGap = 0;
      calculMarginOnLeft(selectedEl, gap, boundedGap, leftGap).should.equal(
        -10
      );
    });

    it('should minor wrapper left from selectedEl coords left', () => {
      const selectedEl = { coords: { left: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const leftGap = 0;
      calculMarginOnLeft(selectedEl, gap, boundedGap, leftGap).should.equal(
        -10
      );
    });

    it('should minor gap from that', () => {
      const selectedEl = { coords: { left: 10 } };
      const gap = 2;
      const boundedGap = 0;
      const leftGap = 0;
      calculMarginOnLeft(selectedEl, gap, boundedGap, leftGap).should.equal(
        -10
      );
    });

    it('should take bounded gap when gap is > to marginLeft', () => {
      const selectedEl = { coords: { left: 10 } };
      const gap = 20;
      const boundedGap = 2;
      const leftGap = 1;
      calculMarginOnLeft(selectedEl, gap, boundedGap, leftGap).should.equal(-8);
    });

    it('should take left gap when there is no bounded gap', () => {
      const selectedEl = { coords: { left: 10 } };
      const gap = 20;
      const boundedGap = 0;
      const leftGap = 1;
      calculMarginOnLeft(selectedEl, gap, boundedGap, leftGap).should.equal(-9);
    });
  });
});
