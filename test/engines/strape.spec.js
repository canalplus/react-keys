/* eslint no-unused-expressions:0 */
/* eslint prefer-arrow-callback:0 */
import {
  calculate,
  defineMarginLeft,
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
import {C_RIGHT, C_LEFT} from '../../src/constants';
import {expect} from 'chai';
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
    list[0].should.be.instanceOf(HTMLLIElement);
  });

  describe('exitStrategy', () => {
    describe('findMirrorExitId', () => {
      it('should return id of mirrored element', () => {
        const leftElement = {
          getBoundingClientRect: () => {
            return {left: 10};
          },
        };
        const children = [{
          id: 1,
          getBoundingClientRect: () => {
            return {left: -10};
          },
        }, {
          id: 2,
          getBoundingClientRect: () => {
            return {left: 0};
          },
        }, {
          id: 3,
          getBoundingClientRect: () => {
            return {left: 10};
          },
        }];
        findMirrorExitId(leftElement, children).should.equal(3);
      });
      it('should return id of mirrored element of 0 position when no leftElement', () => {
        const children = [{
          id: 1,
          getBoundingClientRect: () => {
            return {left: -10};
          },
        }, {
          id: 2,
          getBoundingClientRect: () => {
            return {left: 0};
          },
        }, {
          id: 3,
          getBoundingClientRect: () => {
            return {left: 10};
          },
        }];
        findMirrorExitId(null, children).should.equal(2);
      });
    });
    describe('findStartExitId', () => {
      it('should return closed element to 0 left', () => {
        const children = [{
          id: 1,
          getBoundingClientRect: () => {
            return {left: -10};
          },
        }, {
          id: 2,
          getBoundingClientRect: () => {
            return {left: 2};
          },
        }, {
          id: 3,
          getBoundingClientRect: () => {
            return {left: 12};
          },
        }];
        findStartExitId(children).should.equal(2);
      });
    });
  });
  describe('strategy : bounds', () => {
    describe('calculateBounds', () => {
      it('should return same marginLeft on right action when next card in inside bounds',
        sinon.test(function() {
          this.stub(document, 'getElementById').returns({
            getBoundingClientRect: () => {
              return {left: 100, right: 200};
            },
          });
          const dir = C_RIGHT;
          const el = {id: 10, right: 'a3'};
          const wrapperPosition = {left: 0, right: 400};
          const initialMarginLeft = 0;
          const props = {gap: 0};
          calculateBounds(dir, el, wrapperPosition, initialMarginLeft, props).should.equal(0);
        }));
      it('should calculate new marginLeft with new el is out of bounds on right',
        sinon.test(function() {
          this.stub(document, 'getElementById').returns({
            getBoundingClientRect: () => {
              return {left: 350, right: 450};
            },
          });
          const dir = C_RIGHT;
          const el = {id: 10, right: 'a3'};
          const wrapperPosition = {left: 0, right: 400};
          const initialMarginLeft = 0;
          const props = {gap: 0};
          calculateBounds(dir, el, wrapperPosition, initialMarginLeft, props).should.equal(50);
        }));
      it('should return same marginLeft on left action when next card in inside bounds',
        sinon.test(function() {
          this.stub(document, 'getElementById').returns({
            getBoundingClientRect: () => {
              return {left: 200, right: 300};
            },
          });
          const dir = C_LEFT;
          const el = {id: 10, left: 'a3'};
          const wrapperPosition = {left: 0, right: 400};
          const initialMarginLeft = 100;
          const props = {gap: 0};
          calculateBounds(dir, el, wrapperPosition, initialMarginLeft, props).should.equal(100);
        }));
      it('should calculate new marginLeft with new el is out of bounds on left',
        sinon.test(function() {
          this.stub(document, 'getElementById').returns({
            getBoundingClientRect: () => {
              return {left: 50, right: 150};
            },
          });
          const dir = C_LEFT;
          const el = {id: 10, left: 'a3'};
          const wrapperPosition = {left: 100, right: 400};
          const initialMarginLeft = 100;
          const props = {gap: 0};
          calculateBounds(dir, el, wrapperPosition, initialMarginLeft, props).should.equal(50);
        }));
      it('should add gap on right when out of bounds',
        sinon.test(function() {
          this.stub(document, 'getElementById').returns({
            getBoundingClientRect: () => {
              return {left: 450, right: 450};
            },
          });
          const dir = C_RIGHT;
          const el = {id: 10, right: 'a3'};
          const wrapperPosition = {left: 100, right: 400};
          const initialMarginLeft = 0;
          const props = {gap: 10};
          calculateBounds(dir, el, wrapperPosition, initialMarginLeft, props).should.equal(60);
        }));
      it('should sub gap on left when out of bounds',
        sinon.test(function() {
          this.stub(document, 'getElementById').returns({
            getBoundingClientRect: () => {
              return {left: 50, right: 150};
            },
          });
          const dir = C_LEFT;
          const el = {id: 10, left: 'a3'};
          const wrapperPosition = {left: 100, right: 400};
          const initialMarginLeft = 100;
          const props = {gap: 10};
          calculateBounds(dir, el, wrapperPosition, initialMarginLeft, props).should.equal(40);
        }));
      it('should add lastGap when lastElement on left', sinon.test(function() {
        this.stub(document, 'getElementById').returns({
          getBoundingClientRect: () => {
            return {left: 50, right: 150};
          },
        });
        const dir = C_LEFT;
        const el = {id: 10, left: undefined};
        const wrapperPosition = {left: 100, right: 400};
        const initialMarginLeft = 100;
        const props = {gap: 10, lastGap: 20};
        calculateBounds(dir, el, wrapperPosition, initialMarginLeft, props).should.equal(30);
      }));
      it('should add lastGap when lastElement on right', sinon.test(function() {
        this.stub(document, 'getElementById').returns({
          getBoundingClientRect: () => {
            return {left: 450, right: 450};
          },
        });
        const dir = C_RIGHT;
        const el = {id: 10, right: undefined};
        const wrapperPosition = {left: 100, right: 400};
        const initialMarginLeft = 0;
        const props = {gap: 10, lastGap: 20};
        calculateBounds(dir, el, wrapperPosition, initialMarginLeft, props).should.equal(70);
      }));
    });
  });
  describe('strategy : progressive', () => {
    it('should set margin when card is outside the wrapper', () => {
      const wrapper = {width: 200, left: 100};
      const cards = [
        {id: 1, width: 100, left: 100},
        {id: 2, width: 100, left: 200},
        {id: 3, width: 100, left: 300},
        {id: 4, width: 100, left: 400},
      ];
      const result = calculate(wrapper, cards, {strategy: 'progressive', gap: 0, lastGap: 0});
      result[0].marginLeft.should.equal(0);
      result[1].marginLeft.should.equal(0);
      result[2].marginLeft.should.equal(100);
      result[3].marginLeft.should.equal(200);
    });

    it('should set margin when card is outside the wrapper #2', () => {
      const wrapper = {width: 150, left: 100};
      const cards = [
        {id: 1, width: 50, left: 100},
        {id: 2, width: 50, left: 160},
        {id: 3, width: 50, left: 220},
        {id: 4, width: 50, left: 280},
      ];
      const result = calculate(wrapper, cards, {strategy: 'progressive', gap: 0, lastGap: 0});
      result[0].marginLeft.should.equal(0);
      result[1].marginLeft.should.equal(0);
      result[2].marginLeft.should.equal(20);
      result[3].marginLeft.should.equal(80);
    });

    it('should add a gap to margin when option is setted', () => {
      const wrapper = {width: 150, left: 100};
      const cards = [
        {id: 1, width: 50, left: 100},
        {id: 2, width: 50, left: 160},
        {id: 3, width: 50, left: 220},
        {id: 4, width: 50, left: 280},
      ];
      const result = calculate(wrapper, cards, {strategy: 'progressive', gap: 10, lastGap: 0});
      result[0].marginLeft.should.equal(0);
      result[1].marginLeft.should.equal(0);
      result[2].marginLeft.should.equal(30);
      result[3].marginLeft.should.equal(80); // lastGap = 0
    });

    it('should defineMarginLeft return 0 when card is inside display', () => {
      const card = {id: 0, width: 50, left: 100};
      const lastCard = {id: 1, width: 50, left: 1000};
      const wrapper = {width: 100, left: 50};
      const options = {strategy: 'progressive', gap: 0};
      defineMarginLeft(card, wrapper, 0, lastCard, options).should.equal(0);
    });

    it('should defineMarginLeft return add lastGap if last element', () => {
      const card = {id: 0, width: 50, left: 200};
      const wrapper = {width: 100, left: 100};
      const options = {strategy: 'progressive', gap: 50, lastGap: 10};
      defineMarginLeft(card, wrapper, 0, card, options).should.equal(60);
    });

    it('should defineMarginLeft return 50 when first card is outside', () => {
      const card = {id: 0, width: 50, left: 200};
      const lastCard = {id: 1, width: 50, left: 1000};
      const wrapper = {width: 100, left: 100};
      const options = {strategy: 'progressive', gap: 0};
      defineMarginLeft(card, wrapper, 0, lastCard, options).should.equal(50);
    });

    it('should defineMarginLeft return 60 when first card is outside with gap of 10', () => {
      const card = {id: 0, width: 50, left: 200};
      const lastCard = {id: 1, width: 50, left: 1000};
      const wrapper = {width: 100, left: 100};
      const options = {strategy: 'progressive', gap: 10};
      defineMarginLeft(card, wrapper, 0, lastCard, options).should.equal(60);
    });

    it('should add margin to marginLeft param', () => {
      const card = {id: 0, width: 50, left: 200};
      const lastCard = {id: 1, width: 50, left: 1000};
      const wrapper = {width: 100, left: 100};
      const options = {strategy: 'progressive', gap: 10};
      defineMarginLeft(card, wrapper, 100, lastCard, options).should.equal(100);
    });
    describe('gapCorrection()', () => {
      it('should return gap passed has option', () => {
        const card = {id: 0, width: 50, left: 200};
        const lastCard = {id: 1, width: 50, left: 1000};
        const wrapper = {width: 100, left: 100};
        const options = {strategy: 'progressive', gap: 10};
        gapCorrection(card, wrapper, lastCard, options).should.equal(10);
      });

      it('should return lastGap passed has option if last card', () => {
        const card = {id: 0, width: 50, left: 200};
        const wrapper = {width: 100, left: 100};
        const options = {strategy: 'progressive', gap: 10, lastGap: 20};
        gapCorrection(card, wrapper, card, options).should.equal(20);
      });

      it('should correct gap if gap on card is superior of max size', () => {
        const card = {id: 0, width: 50, left: 900};
        const lastCard = {id: 1, width: 50, left: 1000};
        const wrapper = {width: 100, left: 100};
        const options = {strategy: 'progressive', gap: 200, lastGap: 20};
        gapCorrection(card, wrapper, lastCard, options).should.equal(120);
      });
    });
  });
  describe('strategy : cut', () => {
    it('should defineMarginLeft return 100 when first card is outside', () => {
      const card = {id: 0, width: 50, left: 200};
      const lastCard = {id: 1, width: 50, left: 1000};
      const wrapper = {width: 100, left: 100};
      const options = {strategy: 'cut', gap: 0};
      defineMarginLeft(card, wrapper, 0, lastCard, options).should.equal(100);
    });

    it('should defineMarginLeft return 200 when first card is outside twice', () => {
      const card = {id: 0, width: 50, left: 300};
      const lastCard = {id: 1, width: 50, left: 1000};
      const wrapper = {width: 100, left: 100};
      const options = {strategy: 'cut', gap: 0};
      defineMarginLeft(card, wrapper, 0, lastCard, options).should.equal(200);
    });

    it('should defineMarginLeft return 200 when first card is outside twice with gap of 10', () => {
      const card = {id: 0, width: 50, left: 300};
      const lastCard = {id: 1, width: 50, left: 1000};
      const wrapper = {width: 100, left: 100};
      const options = {strategy: 'cut', gap: 10};
      defineMarginLeft(card, wrapper, 0, lastCard, options).should.equal(210);
    });

    it('should add margin to marginLeft param', () => {
      const card = {id: 0, width: 50, left: 200};
      const lastCard = {id: 1, width: 50, left: 1000};
      const wrapper = {width: 100, left: 100};
      const options = {strategy: 'cut', gap: 10};
      defineMarginLeft(card, wrapper, 100, lastCard, options).should.equal(100);
    });
  });

  it('should findRightElement return next element', () => {
    const cards = [
      {id: 1},
      {id: 2},
    ];
    findRightElement(cards, 0, false).should.equal(2);
  });

  it('should findRightElement return undefined on last element', () => {
    const cards = [
      {id: 1},
      {id: 2},
    ];
    expect(findRightElement(cards, 1, false)).to.be.undefined;
  });

  it('should findRightElement return first id when circular on last element', () => {
    const cards = [
      {id: 1},
      {id: 2},
    ];
    findRightElement(cards, 1, true).should.equal(1);
  });

  it('should findLeftElement return previous element', () => {
    const cards = [
      {id: 1},
      {id: 2},
    ];
    findLeftElement(cards, 1, false).should.equal(1);
  });

  it('should findLeftElement return undefined on first element', () => {
    const cards = [
      {id: 1},
      {id: 2},
    ];
    expect(findLeftElement(cards, 0, false)).to.be.undefined;
  });

  it('should findLeftElement return last id when circular on first element', () => {
    const cards = [
      {id: 1},
      {id: 2},
    ];
    findLeftElement(cards, 0, true).should.equal(2);
  });
  describe('selectedElement', () => {
    it('should return element from id when it exists in array', () => {
      const array = [{id: '1'}, {id: '2'}];
      selectedElement(array, '2').id.should.equal('2');
    });
    it('should should return first element when id is not found', () => {
      const array = [{id: '1'}, {id: '2'}];
      selectedElement(array, '3').id.should.equal('1');
      selectedElement(array, null).id.should.equal('1');
    });
  });
});
