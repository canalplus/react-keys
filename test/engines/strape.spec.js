/* eslint no-unused-expressions:0 */
import {
  calculate,
} from '../../src/engines/strape';

describe('engine/strape', () => {
  describe('strategy : progressive', () => {
    it('should set margin when card is outside the wrapper', () => {
      const wrapper = {width: 200, left: 100};
      const cards = [
        {id: 1, width: 100, left: 100},
        {id: 2, width: 100, left: 200},
        {id: 3, width: 100, left: 300},
        {id: 4, width: 100, left: 400},
      ];
      const result = calculate(wrapper, cards, {strategy: 'progressive', gap: 0});
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
      const result = calculate(wrapper, cards, {strategy: 'progressive', gap: 0});
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
      const result = calculate(wrapper, cards, {strategy: 'progressive', gap: 10});
      result[0].marginLeft.should.equal(0);
      result[1].marginLeft.should.equal(0);
      result[2].marginLeft.should.equal(30);
      result[3].marginLeft.should.equal(90);
    });
  });
});
