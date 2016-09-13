import {
  calculate,
  calculateVertical,
  defineMargin,
  gapCorrection,
  findLeftElement,
  findRightElement,
  createList,
  build,
  calculateBounds,
  selectedElement,
  findMirrorExitId,
  findStartExitId,
} from '../../src/engines/strape';
import { C_RIGHT, C_LEFT, C_DOWN, C_UP, VERTICAL } from '../../src/constants';
import { expect } from 'chai';
import jsdom from 'jsdom';
import sinon from 'sinon';

describe('engine/strape.js', () => {
  it('build should return an array', () => {
    const dom = jsdom.jsdom('<div id="wrapper"><li id="1"></li><li id="2"></li></div>');
    const list = [];
    const options = {};
    const wrapperPosition = dom.querySelector('#wrapper').getBoundingClientRect();
    build(wrapperPosition, list, options).should.be.an.array;
  });

  it('createList should return a list from dom', () => {
    const dom = jsdom.jsdom('<div><li id="1"></li><li id="2"></li></div>');
    const list = createList(dom, 'li');
    list.should.have.lengthOf(2);
    list[0].should.be.instanceOf(window.HTMLElement);
  });

  describe('exitStrategy', () => {
    describe('findMirrorExitId', () => {
      it('should return id of mirrored element', () => {
        const moved = 'left';
        const leftElement = {
          getBoundingClientRect: () => {
            return { left: 10 };
          },
        };
        const children = [{
          id: 1,
          getBoundingClientRect: () => {
            return { left: -10 };
          },
        }, {
          id: 2,
          getBoundingClientRect: () => {
            return { left: 0 };
          },
        }, {
          id: 3,
          getBoundingClientRect: () => {
            return { left: 10 };
          },
        }];
        findMirrorExitId(leftElement, children, moved).should.equal(3);
      });
      it('should return id of mirrored element of 0 position when no leftElement', () => {
        const moved = 'left';
        const children = [{
          id: 1,
          getBoundingClientRect: () => {
            return { left: -10 };
          },
        }, {
          id: 2,
          getBoundingClientRect: () => {
            return { left: 0 };
          },
        }, {
          id: 3,
          getBoundingClientRect: () => {
            return { left: 10 };
          },
        }];
        findMirrorExitId(null, children, moved).should.equal(2);
      });
    });
    describe('findStartExitId', () => {
      it('should return closed element to 0 left', () => {
        const moved = 'left';
        const size = 'width';
        const wrapper = {
          getBoundingClientRect: () => {
            return { left: 0 };
          },
        };
        const children = [{
          id: 1,
          getBoundingClientRect: () => {
            return { left: -10 };
          },
        }, {
          id: 2,
          getBoundingClientRect: () => {
            return { left: 2 };
          },
        }, {
          id: 3,
          getBoundingClientRect: () => {
            return { left: 12 };
          },
        }];
        findStartExitId(children, wrapper, moved, size).should.equal(2);
      });
      it('should return closed element to 0 top', () => {
        const moved = 'top';
        const size = 'height';
        const wrapper = {
          getBoundingClientRect: () => {
            return { top: 0 };
          },
        };
        const children = [{
          id: 1,
          getBoundingClientRect: () => {
            return { top: -10 };
          },
        }, {
          id: 2,
          getBoundingClientRect: () => {
            return { top: 2 };
          },
        }, {
          id: 3,
          getBoundingClientRect: () => {
            return { top: 12 };
          },
        }];
        findStartExitId(children, wrapper, moved, size).should.equal(2);
      });
      it('should wrapper left be counted', () => {
        const moved = 'left';
        const size = 'width';
        const wrapper = {
          getBoundingClientRect: () => {
            return { left: 10 };
          },
        };
        const children = [{
          id: 1,
          getBoundingClientRect: () => {
            return { left: -10 };
          },
        }, {
          id: 2,
          getBoundingClientRect: () => {
            return { left: 2 };
          },
        }, {
          id: 3,
          getBoundingClientRect: () => {
            return { left: 12 };
          },
        }];
        findStartExitId(children, wrapper, moved, size).should.equal(3);
      });
      it('should wrapper top be counted', () => {
        const moved = 'top';
        const size = 'height';
        const wrapper = {
          getBoundingClientRect: () => {
            return { top: 10 };
          },
        };
        const children = [{
          id: 1,
          getBoundingClientRect: () => {
            return { top: -10 };
          },
        }, {
          id: 2,
          getBoundingClientRect: () => {
            return { top: 2 };
          },
        }, {
          id: 3,
          getBoundingClientRect: () => {
            return { top: 12 };
          },
        }];
        findStartExitId(children, wrapper, moved, size).should.equal(3);
      });
    });
  });
  describe('strategy : bounds', () => {
    describe('calculateBounds', () => {
      it('should return same marginLeft on right action when next card in inside bounds',
          sinon.test(function () {
            this.stub(document, 'getElementById').returns({
              getBoundingClientRect: () => {
                return {left: 100, right: 200};
              },
            });
            const dir = C_RIGHT;
            const el = {id: 10, right: 'a3'};
            const wrapperPosition = {left: 0, right: 400};
            const initialMarginLeft = 0;
            const initialMarginTop = 0;
            const firstCard = { id: 9, right: 'a2' };
            const lastCard = { id: 11, right: 'a4' };
            const props = {gap: 0, position: true};
            calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props, lastCard, firstCard).should.equal(0);
          }));
      it('should return same marginTop on down action when next card in inside bounds',
          sinon.test(function () {
            this.stub(document, 'getElementById').returns({
              getBoundingClientRect: () => {
                return {top: 100, bottom: 200};
              },
            });
            const dir = C_DOWN;
            const el = {id: 10, down: 'a3'};
            const wrapperPosition = {top: 0, bottom: 400};
            const initialMarginLeft = 0;
            const initialMarginTop = 0;
            const firstCard = { id: 9, right: 'a2' };
            const lastCard = { id: 11, right: 'a4' };
            const props = {gap: 0, position: true};
            calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props, lastCard, firstCard).should.equal(0);
          }));
      it('should calculate new marginLeft with new el is out of bounds on right',
          sinon.test(function () {
            this.stub(document, 'getElementById').returns({
              getBoundingClientRect: () => {
                return {left: 350, right: 450};
              },
            });
            const dir = C_RIGHT;
            const el = {id: 10, right: 'a3'};
            const wrapperPosition = {left: 0, right: 400};
            const initialMarginLeft = 0;
            const initialMarginTop = 0;
            const firstCard = { id: 9, right: 'a2' };
            const lastCard = { id: 11, right: 'a4' };
            const props = {gap: 0};
            calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props, lastCard, firstCard).should.equal(50);
          }));
      it('should calculate new marginTop with new el is out of bounds on bottom',
          sinon.test(function () {
            this.stub(document, 'getElementById').returns({
              getBoundingClientRect: () => {
                return {top: 350, bottom: 450};
              },
            });
            const dir = C_DOWN;
            const el = {id: 10, down: 'a3'};
            const wrapperPosition = {top: 0, bottom: 400};
            const initialMarginLeft = 0;
            const initialMarginTop = 0;
            const firstCard = { id: 9, right: 'a2' };
            const lastCard = { id: 11, right: 'a4' };
            const props = { gap: 0, lastGap: 0, position: VERTICAL };
            calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props, lastCard, firstCard).should.equal(50);
          }));
      it('should return same marginLeft on left action when next card in inside bounds',
        sinon.test(function() {
          this.stub(document, 'getElementById').returns({
            getBoundingClientRect: () => {
              return { left: 200, right: 300 };
            },
          });
          const dir = C_LEFT;
          const el = { id: 10, left: 'a3' };
          const wrapperPosition = { left: 0, right: 400 };
          const initialMarginLeft = 100;
          const initialMarginTop = 0;
          const firstCard = { id: 9, right: 'a2' };
          const lastCard = { id: 11, right: 'a4' };
          const props = { gap: 0 };
          calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props, lastCard, firstCard).should.equal(100);
        }));
      it('should return same marginTop on up action when next card in inside bounds',
          sinon.test(function() {
            this.stub(document, 'getElementById').returns({
              getBoundingClientRect: () => {
                return { top: 200, bottom: 300 };
              },
            });
            const dir = C_UP;
            const el = { id: 10, up: 'a3' };
            const wrapperPosition = { top: 0, bottom: 400 };
            const initialMarginLeft = 0;
            const initialMarginTop = 100;
            const firstCard = { id: 9, right: 'a2' };
            const lastCard = { id: 11, right: 'a4' };
            const props = { gap: 0, position: VERTICAL };
            calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props, lastCard, firstCard).should.equal(100);
          }));
      it('should calculate new marginLeft with new el is out of bounds on left',
        sinon.test(function() {
          this.stub(document, 'getElementById').returns({
            getBoundingClientRect: () => {
              return { left: 50, right: 150 };
            },
          });
          const dir = C_LEFT;
          const el = { id: 10, left: 'a3' };
          const wrapperPosition = { left: 100, right: 400 };
          const initialMarginLeft = 100;
          const initialMarginTop = 0;
          const firstCard = { id: 9, right: 'a2' };
          const lastCard = { id: 11, right: 'a4' };
          const props = { gap: 0 };
          calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props, lastCard, firstCard).should.equal(50);
        }));
      it('should calculate new marginTop with new el is out of bounds on up',
          sinon.test(function() {
            this.stub(document, 'getElementById').returns({
              getBoundingClientRect: () => {
                return { top: 50, bottom: 150 };
              },
            });
            const dir = C_UP;
            const el = { id: 10, up: 'a3' };
            const wrapperPosition = { top: 100, bottom: 400 };
            const initialMarginLeft = 0;
            const initialMarginTop = 100
            const firstCard = { id: 9, right: 'a2' };
            const lastCard = { id: 11, right: 'a4' };
            const props = { gap: 0, lastGap: 0, firstGap: 0, position: VERTICAL };
            calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props, lastCard, firstCard).should.equal(50);
          }));
      it('should add gap on right when out of bounds',
        sinon.test(function() {
          this.stub(document, 'getElementById').returns({
            getBoundingClientRect: () => {
              return { left: 450, right: 450 };
            },
          });
          const dir = C_RIGHT;
          const el = { id: 10, right: 'a3' };
          const wrapperPosition = { left: 100, right: 400 };
          const initialMarginLeft = 0;
          const initialMarginTop = 0;
          const firstCard = { id: 9, right: 'a2' };
          const lastCard = { id: 11, right: 'a4' };
          const props = { gap: 10 };
          calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props, lastCard, firstCard).should.equal(60);
        }));
      it('should add gap on bottom when out of bounds',
          sinon.test(function() {
            this.stub(document, 'getElementById').returns({
              getBoundingClientRect: () => {
                return { top: 450, bottom: 450 };
              },
            });
            const dir = C_DOWN;
            const el = { id: 10, down: 'a3' };
            const wrapperPosition = { top: 100, bottom: 400 };
            const initialMarginLeft = 0;
            const initialMarginTop = 0;
            const firstCard = { id: 9, right: 'a2' };
            const lastCard = { id: 11, right: 'a4' };
            const props = { gap: 10, lastGap: 0, firstGap: 0, position: VERTICAL };
            calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props, lastCard, firstCard).should.equal(60);
          }));
      it('should sub gap on left when out of bounds',
        sinon.test(function() {
          this.stub(document, 'getElementById').returns({
            getBoundingClientRect: () => {
              return { left: 50, right: 150 };
            },
          });
          const dir = C_LEFT;
          const el = { id: 10, left: 'a3' };
          const wrapperPosition = { left: 100, right: 400 };
          const initialMarginLeft = 100;
          const initialMarginTop = 0;
          const firstCard = { id: 9, right: 'a2' };
          const lastCard = { id: 11, right: 'a4' };
          const props = { gap: 10 };
          calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props, lastCard, firstCard).should.equal(40);
        }));
      it('should sub gap on top when out of bounds',
          sinon.test(function() {
            this.stub(document, 'getElementById').returns({
              getBoundingClientRect: () => {
                return { top: 50, bottom: 150 };
              },
            });
            const dir = C_UP;
            const el = { id: 10, up: 'a3' };
            const wrapperPosition = { top: 100, bottom: 400 };
            const initialMarginLeft = 0;
            const initialMarginTop = 100;
            const firstCard = { id: 9, right: 'a2' };
            const lastCard = { id: 11, right: 'a4' };
            const props = { gap: 10, lastGap: 0, firstGap: 0, position: VERTICAL };
            calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props, lastCard, firstCard).should.equal(40);
          }));
      it('should add lastGap when lastElement on left', sinon.test(function() {
        this.stub(document, 'getElementById').returns({
          getBoundingClientRect: () => {
            return { left: 50, right: 150 };
          },
        });
        const dir = C_LEFT;
        const el = { id: 10, left: undefined };
        const wrapperPosition = { left: 100, right: 400 };
        const initialMarginLeft = 100;
        const initialMarginTop = 0;
        const firstCard = { id: 9, right: 'a2' };
        const lastCard = { id: 11, right: 'a4' };
        const props = { gap: 10, lastGap: 20 };
        calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props, lastCard, firstCard).should.equal(40);
      }));
      it('should add firstGap when lastElement on top', sinon.test(function() {
        let i = 0;
        this.stub(document, 'getElementById').returns({
          getBoundingClientRect: () => {
            switch (++i) {
              case 1:
                return { top: 18, bottom: 118 };
              case 2:
                return { top: 18, bottom: 118 };
              case 3:
                return { top: 1558, bottom: 1658 };
            }
          }
        });
        const dir = C_UP;
        const firstCard = { id: 9, up: undefined };
        const el = { id: 9, up: undefined };
        const wrapperPosition = { top: 8, bottom: 458 };
        const initialMarginLeft = 0;
        const initialMarginTop = 0;
        const lastCard = { id: 10 };
        const props = { gap: 120, firstGap: 100, lastGap: 10, position: VERTICAL }
        calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props, lastCard, firstCard).should.equal(-90);
      }));
      it('should add lastGap when lastElement on right', sinon.test(function() {
        this.stub(document, 'getElementById').returns({
          getBoundingClientRect: () => {
            return { left: 450, right: 450 };
          },
        });
        const dir = C_RIGHT;
        const el = { id: 10, right: undefined };
        const wrapperPosition = { left: 100, right: 400 };
        const initialMarginLeft = 0;
        const initialMarginTop = 0;
        const firstCard = { id: 9, right: 'a2' };
        const lastCard = { id: 11, right: 'a4' };
        const props = { gap: 10, lastGap: 20 };
        calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props, lastCard, firstCard).should.equal(60);
      }));
      it('should add lastGap when lastElement on bottom', sinon.test(function() {
        let i = 0;
        this.stub(document, 'getElementById').returns({
          getBoundingClientRect: () => {
            switch (++i) {
              case 1:
                return { top: -1192, bottom: -1092 };
              case 2:
                return { top: 348, bottom: 448 };
              case 3:
                return { top: 348, bottom: 448 };
            }
          }
        });
        const dir = C_DOWN;
        const el = { id: 10, down: undefined };
        const wrapperPosition = { top: 8, bottom: 458 };
        const initialMarginLeft = 0;
        const initialMarginTop = 1210;
        const firstCard = { id: 9, right: 'a2' };
        const lastCard = { id: 10, down: undefined };
        const props = { gap: 120, lastGap: 10, firstGap: 100, position: VERTICAL };
        calculateBounds(dir, el, wrapperPosition, initialMarginLeft, initialMarginTop, props, lastCard, firstCard).should.equal(1210);
      }));
    });
  });
  describe('strategy : progressive', () => {
    it('should set marginLeft when card is outside the wrapper', () => {
      const wrapper = { width: 200, left: 100 };
      const cards = [
        { id: 1, width: 100, left: 100 },
        { id: 2, width: 100, left: 200 },
        { id: 3, width: 100, left: 300 },
        { id: 4, width: 100, left: 400 },
      ];
      const result = calculate(wrapper, cards, { strategy: 'progressive', gap: 0, lastGap: 0 });
      result[0].marginLeft.should.equal(0);
      result[1].marginLeft.should.equal(0);
      result[2].marginLeft.should.equal(100);
      result[3].marginLeft.should.equal(200);
    });
    it('should set marginTop when card is outside the wrapper', () => {
      const wrapper = { height: 200, top: 100 };
      const cards = [
        { id: 1, height: 100, top: 100 },
        { id: 2, height: 100, top: 200 },
        { id: 3, height: 100, top: 300 },
        { id: 4, height: 100, top: 400 },
      ];
      const result = calculateVertical(wrapper, cards, { strategy: 'progressive', gap: 0, lastGap: 0 });
      result[0].marginTop.should.equal(0);
      result[1].marginTop.should.equal(0);
      result[2].marginTop.should.equal(100);
      result[3].marginTop.should.equal(200);
    });

    it('should set margin when card is outside the wrapper #2', () => {
      const wrapper = { width: 150, left: 100 };
      const cards = [
        { id: 1, width: 50, left: 100 },
        { id: 2, width: 50, left: 160 },
        { id: 3, width: 50, left: 220 },
        { id: 4, width: 50, left: 280 },
      ];
      const result = calculate(wrapper, cards, { strategy: 'progressive', gap: 0, lastGap: 0 });
      result[0].marginLeft.should.equal(0);
      result[1].marginLeft.should.equal(0);
      result[2].marginLeft.should.equal(20);
      result[3].marginLeft.should.equal(80);
    });

    it('should set margin when card is outside the wrapper #2 with position true', () => {
      const wrapper = { height: 150, top: 100 };
      const cards = [
        { id: 1, height: 50, top: 100 },
        { id: 2, height: 50, top: 160 },
        { id: 3, height: 50, top: 220 },
        { id: 4, height: 50, top: 280 },
      ];
      const result = calculateVertical(wrapper, cards, { strategy: 'progressive', gap: 0, lastGap: 0 });
      result[0].marginTop.should.equal(0);
      result[1].marginTop.should.equal(0);
      result[2].marginTop.should.equal(20);
      result[3].marginTop.should.equal(80);
    });

    it('should add a gap to margin when option is setted', () => {
      const wrapper = { width: 150, left: 100 };
      const cards = [
        { id: 1, width: 50, left: 100 },
        { id: 2, width: 50, left: 160 },
        { id: 3, width: 50, left: 220 },
        { id: 4, width: 50, left: 280 },
      ];
      const result = calculate(wrapper, cards, { strategy: 'progressive', gap: 10, lastGap: 0 });
      result[0].marginLeft.should.equal(0);
      result[1].marginLeft.should.equal(0);
      result[2].marginLeft.should.equal(30);
      result[3].marginLeft.should.equal(80); // lastGap = 0
    });

    it('should add a gap to margin when option is setted with position true', () => {
      const wrapper = { height: 150, top: 100 };
      const cards = [
        { id: 1, height: 50, top: 100 },
        { id: 2, height: 50, top: 160 },
        { id: 3, height: 50, top: 220 },
        { id: 4, height: 50, top: 280 },
      ];
      const result = calculateVertical(wrapper, cards, { strategy: 'progressive', gap: 10, lastGap: 0 });
      result[0].marginTop.should.equal(0);
      result[1].marginTop.should.equal(0);
      result[2].marginTop.should.equal(30);
      result[3].marginTop.should.equal(80); // lastGap = 0
    });

    it('should defineMargin return 0 when card is inside display', () => {
      const card = { id: 0, width: 50, left: 100 };
      const lastCard = { id: 1, width: 50, left: 1000 };
      const wrapper = { width: 100, left: 50 };
      const options = { strategy: 'progressive', gap: 0 };
      const moved = 'left';
      const size = 'width';
      defineMargin(card, wrapper, 0, lastCard, options, moved, size).should.equal(0);
    });

    it('should defineMargin return add lastGap if last element', () => {
      const card = { id: 0, width: 50, left: 200 };
      const wrapper = { width: 100, left: 100 };
      const options = { strategy: 'progressive', gap: 50, lastGap: 10 };
      const moved = 'left';
      const size = 'width';
      defineMargin(card, wrapper, 0, card, options, moved, size).should.equal(60);
    });

    it('should defineMargin return 50 when first card is outside', () => {
      const card = { id: 0, width: 50, left: 200 };
      const lastCard = { id: 1, width: 50, left: 1000 };
      const wrapper = { width: 100, left: 100 };
      const options = { strategy: 'progressive', gap: 0 };
      const moved = 'left';
      const size = 'width';
      defineMargin(card, wrapper, 0, lastCard, options, moved, size).should.equal(50);
    });

    it('should defineMargin return 60 when first card is outside with gap of 10', () => {
      const card = { id: 0, width: 50, left: 200 };
      const lastCard = { id: 1, width: 50, left: 1000 };
      const wrapper = { width: 100, left: 100 };
      const options = { strategy: 'progressive', gap: 10 };
      const moved = 'left';
      const size = 'width';
      defineMargin(card, wrapper, 0, lastCard, options, moved, size).should.equal(60);
    });

    it('should add margin to marginLeft param', () => {
      const card = { id: 0, width: 50, left: 200 };
      const lastCard = { id: 1, width: 50, left: 1000 };
      const wrapper = { width: 100, left: 100 };
      const options = { strategy: 'progressive', gap: 10 };
      const moved = 'left';
      const size = 'width';
      defineMargin(card, wrapper, 100, lastCard, options, moved, size).should.equal(100);
    });
    describe('gapCorrection()', () => {
      it('should return gap passed has option', () => {
        const card = { id: 0, width: 50, left: 200 };
        const lastCard = { id: 1, width: 50, left: 1000 };
        const wrapper = { width: 100, left: 100 };
        const options = { strategy: 'progressive', gap: 10 };
        const moved= 'left';
        const size = 'width';
        gapCorrection(card, wrapper, lastCard, options, moved, size).should.equal(10);
      });
      it('should return gap passed has option with position true', () => {
        const card = { id: 0, top: 50, bottom: 200 };
        const lastCard = { id: 1, height: 50, top: 1000 };
        const wrapper = { height: 100, top: 100 };
        const options = { strategy: 'progressive', gap: 10, position: true };
        const moved= 'top';
        const size = 'height';
        gapCorrection(card, wrapper, lastCard, options, moved, size).should.equal(10);
      });
      it('should return lastGap passed has option if last card', () => {
        const card = { id: 0, width: 50, left: 200 };
        const wrapper = { width: 100, left: 100 };
        const options = { strategy: 'progressive', gap: 10, lastGap: 20 };
        const moved= 'left';
        const size = 'width';
        gapCorrection(card, wrapper, card, options, moved, size).should.equal(20);
      });
      it('should return lastGap passed has option if last card with position true', () => {
        const card = { id: 0, height: 50, top: 200 };
        const wrapper = { height: 100, top: 100 };
        const options = { strategy: 'progressive', gap: 10, lastGap: 20, position: true };
        const moved= 'top';
        const size = 'height';
        gapCorrection(card, wrapper, card, options, moved, size).should.equal(20);
      });
      it('should correct gap if gap on card is superior of max size', () => {
        const card = { id: 0, width: 50, left: 900 };
        const lastCard = { id: 1, width: 50, left: 1000 };
        const wrapper = { width: 100, left: 100 };
        const options = { strategy: 'progressive', gap: 200, lastGap: 20 };
        const moved= 'left';
        const size = 'width';
        gapCorrection(card, wrapper, lastCard, options, moved, size).should.equal(120);
      });
      it('should correct gap if gap on card is superior of max size with position true', () => {
        const card = { id: 0, height: 50, top: 900 };
        const lastCard = { id: 1, height: 50, top: 1000 };
        const wrapper = { height: 100, top: 100 };
        const options = { strategy: 'progressive', gap: 200, lastGap: 20, position: true };
        const moved= 'top';
        const size = 'height';
        gapCorrection(card, wrapper, lastCard, options, moved, size).should.equal(120);
      });
    });
  });
  describe('strategy : cut', () => {
    it('should defineMargin return 100 when first card is outside', () => {
      const card = { id: 0, width: 50, left: 200 };
      const lastCard = { id: 1, width: 50, left: 1000 };
      const wrapper = { width: 100, left: 100 };
      const options = { strategy: 'cut', gap: 0 };
      const moved= 'left';
      const size = 'width';
      defineMargin(card, wrapper, 0, lastCard, options, moved, size).should.equal(100);
    });

    it('should defineMargin return 100 when first card is outside with position true', () => {
      const card = { id: 0, height: 50, top: 200 };
      const lastCard = { id: 1, height: 50, top: 1000 };
      const wrapper = { height: 100, top: 100 };
      const options = { strategy: 'cut', gap: 0 };
      const moved= 'top';
      const size = 'height';
      defineMargin(card, wrapper, 0, lastCard, options, moved, size).should.equal(100);
    });

    it('should defineMarginLeft return 200 when first card is outside twice', () => {
      const card = { id: 0, width: 50, left: 300 };
      const lastCard = { id: 1, width: 50, left: 1000 };
      const wrapper = { width: 100, left: 100 };
      const options = { strategy: 'cut', gap: 0 };
      const moved= 'left';
      const size = 'width';
      defineMargin(card, wrapper, 0, lastCard, options, moved, size).should.equal(200);
    });

    it('should defineMarginLeft return 200 when first card is outside twice with gap of 10', () => {
      const card = { id: 0, width: 50, left: 300 };
      const lastCard = { id: 1, width: 50, left: 1000 };
      const wrapper = { width: 100, left: 100 };
      const options = { strategy: 'cut', gap: 10 };
      const moved= 'left';
      const size = 'width';
      defineMargin(card, wrapper, 0, lastCard, options, moved, size).should.equal(210);
    });

    it('should add margin to marginLeft param', () => {
      const card = { id: 0, width: 50, left: 200 };
      const lastCard = { id: 1, width: 50, left: 1000 };
      const wrapper = { width: 100, left: 100 };
      const options = { strategy: 'cut', gap: 10 };
      const moved= 'top';
      const size = 'height';
      defineMargin(card, wrapper, 100, lastCard, options, moved, size).should.equal(100);
    });
  });

  it('should findRightElement return next element', () => {
    const cards = [
      { id: 1 },
      { id: 2 },
    ];
    findRightElement(cards, 0, false).should.equal(2);
  });

  it('should findRightElement return undefined on last element', () => {
    const cards = [
      { id: 1 },
      { id: 2 },
    ];
    expect(findRightElement(cards, 1, false)).to.be.undefined;
  });

  it('should findRightElement return first id when circular on last element', () => {
    const cards = [
      { id: 1 },
      { id: 2 },
    ];
    findRightElement(cards, 1, true).should.equal(1);
  });

  it('should findLeftElement return previous element', () => {
    const cards = [
      { id: 1 },
      { id: 2 },
    ];
    findLeftElement(cards, 1, false).should.equal(1);
  });

  it('should findLeftElement return undefined on first element', () => {
    const cards = [
      { id: 1 },
      { id: 2 },
    ];
    expect(findLeftElement(cards, 0, false)).to.be.undefined;
  });

  it('should findLeftElement return last id when circular on first element', () => {
    const cards = [
      { id: 1 },
      { id: 2 },
    ];
    findLeftElement(cards, 0, true).should.equal(2);
  });
  describe('selectedElement', () => {
    it('should return element from id when it exists in array', () => {
      const array = [{ id: '1' }, { id: '2' }];
      selectedElement(array, '2').id.should.equal('2');
    });
    it('should should return first element when id is not found', () => {
      const array = [{ id: '1' }, { id: '2' }];
      selectedElement(array, '3').id.should.equal('1');
      selectedElement(array, null).id.should.equal('1');
    });
  });
});
