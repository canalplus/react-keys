/* eslint no-unused-expressions:0 */
import {
  calculate,
  defineMarginLeft,
  gapCorrection,
  findLeftElement,
  findRightElement,
  createList,
  build,
} from '../../src/engines/strape';
import {expect} from 'chai';
import jsdom from 'jsdom';

describe('engine/strape', () => {
  it('build should return an array', () => {
    const dom = jsdom.jsdom('<div id="wrapper"><li id="1"></li><li id="2"></li></div>');
    const list = [];
    const options = {};
    build(dom, '#wrapper', list, options).should.be.an.array;
  });

  it('createList should return a list from dom', () => {
    const dom = jsdom.jsdom('<div><li id="1"></li><li id="2"></li></div>');
    const list = createList(dom, 'li');
    list.should.have.lengthOf(2);
    list[0].should.be.instanceOf(HTMLLIElement);
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
});
