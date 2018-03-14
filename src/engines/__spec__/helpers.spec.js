import sinon from 'sinon';
import { C_UP, C_DOWN, C_LEFT, C_RIGHT } from '../../constants';
import {
  calculateElSpace,
  calculateNewState,
  downLimit,
  hasElementsDiff,
  hasWrapperDiff,
  getCurrentChildren,
  getDomElement,
  flipflop,
  rightLimit,
} from '../helpers';

describe('helpers.js', () => {
  describe('calculateElSpace', () => {
    it('should return right and bottom values', () => {
      const el = {
        id: 'C+',
        offsetLeft: 10,
        offsetTop: 20,
        offsetWidth: 30,
        offsetHeight: 40,
      };
      calculateElSpace(el).id.should.equal('C+');
      calculateElSpace(el).down.should.equal(60);
      calculateElSpace(el).right.should.equal(40);
    });

    it('should return undefined if no el passed', () => {
      const el = null;
      (calculateElSpace(el) === undefined).should.be.true;
    });
  });
  describe('downLimit', () => {
    it('should return right and bottom values', () => {
      const elements = [
        {
          id: '1',
          coords: {
            down: 10,
          },
        },
        {
          id: '2',
          coords: {
            down: 20,
          },
        },
        {
          id: '3',
          coords: {
            down: 30,
          },
        },
        {
          id: '4',
          coords: {
            down: 40,
          },
        },
      ];
      downLimit(elements).should.equal(40);
    });
  });
  describe('rightLimit', () => {
    it('should return right and bottom values', () => {
      const elements = [
        {
          id: '1',
          coords: {
            right: 10,
          },
        },
        {
          id: '2',
          coords: {
            right: 20,
          },
        },
        {
          id: '3',
          coords: {
            right: 30,
          },
        },
        {
          id: '4',
          coords: {
            right: 40,
          },
        },
      ];
      rightLimit(elements).should.equal(40);
    });
  });
  describe('getCurrentChildren', () => {
    it('should return current children', () => {
      const dom = {
        querySelectorAll: () => ['batman'],
      };

      getCurrentChildren(dom).should.eql(['batman']);
    });
  });
  describe('getDomElement', () => {
    it(
      'should return dom element',
      sinon.test(function() {
        this.stub(document, 'getElementById');
        document.getElementById.withArgs('spiderman').returns({});

        getDomElement('spiderman').should.eql({});
      })
    );
  });
  describe('hasElementsDiff', () => {
    it('should return false if nextEls is empty', () => {
      const nextEls = [];
      const prevEls = [{ id: '1' }];
      hasElementsDiff(nextEls, prevEls).should.be.false;
    });

    it('should return true if prevEls is empty', () => {
      const nextEls = [{ id: '1' }];
      const prevEls = [];
      hasElementsDiff(nextEls, prevEls).should.be.true;
    });

    it('should return true if first id is different', () => {
      const nextEls = [{ id: '1' }, { id: '2' }];
      const prevEls = [{ id: '2' }, { id: '4' }];
      hasElementsDiff(nextEls, prevEls).should.be.true;
    });

    it('should return true if length is different', () => {
      const nextEls = [{ id: '2' }, { id: '4' }, { id: '5' }];
      const prevEls = [{ id: '2' }, { id: '4' }];
      hasElementsDiff(nextEls, prevEls).should.be.true;
    });

    it('should return false is elements are identicals', () => {
      const nextEls = [{ id: '2' }, { id: '4' }];
      const prevEls = [{ id: '2' }, { id: '4' }];
      hasElementsDiff(nextEls, prevEls).should.be.false;
    });

    it('should return false when ids are differents', () => {
      const nextEls = [{ id: '2' }, { id: '3' }, { id: '5' }];
      const prevEls = [{ id: '2' }, { id: '4' }, { id: '5' }];
      hasElementsDiff(nextEls, prevEls).should.be.true;
    });

    it('should return false when ids are differents and are as props', () => {
      const nextEls = [
        { props: { id: '2' } },
        { props: { id: '3' } },
        { props: { id: '5' } },
      ];
      const prevEls = [
        { props: { id: '2' } },
        { props: { id: '4' } },
        { props: { id: '5' } },
      ];
      hasElementsDiff(nextEls, prevEls).should.be.true;
    });
  });
  describe('hasWrapperDiff', () => {
    it('should return false if no wrapper', () => {
      hasWrapperDiff(undefined, undefined).should.be.false;
    });
    it('should return false if direction === horizontal, then prev & next wrappers have same width - height - left', () => {
      const nextWrapper = {
        left: 10,
        height: 50,
        width: 50,
      };

      const prevWrapper = {
        left: 10,
        height: 50,
        width: 50,
      };

      hasWrapperDiff(nextWrapper, prevWrapper, 'horizontal').should.be.false;
    });
    it('should return true if direction === horizontal, then prev & next wrappers have different width - height - left', () => {
      const nextWrapper = {
        left: 10,
        height: 50,
        width: 50,
      };

      const prevWrapper = {
        left: 10,
        height: 50,
        width: 40,
      };

      hasWrapperDiff(nextWrapper, prevWrapper, 'horizontal').should.be.true;
    });
    it('should return false if direction === vertical, then prev & next wrappers have same width - height - left', () => {
      const nextWrapper = {
        left: 10,
        height: 50,
        width: 50,
      };

      const prevWrapper = {
        left: 10,
        height: 50,
        width: 50,
      };

      hasWrapperDiff(nextWrapper, prevWrapper, 'vertical').should.be.false;
    });
    it('should return true if direction === vertical, then prev & next wrappers have different width - height - left', () => {
      const nextWrapper = {
        left: 10,
        height: 50,
        width: 50,
      };

      const prevWrapper = {
        left: 10,
        height: 30,
        width: 50,
      };

      hasWrapperDiff(nextWrapper, prevWrapper, 'vertical').should.be.true;
    });
    it('should return false if no direction provided, then prev & next wrappers have same width - height - left', () => {
      const nextWrapper = {
        top: 0,
        left: 10,
        height: 50,
        width: 50,
      };

      const prevWrapper = {
        top: 0,
        left: 10,
        height: 50,
        width: 50,
      };

      hasWrapperDiff(nextWrapper, prevWrapper).should.be.false;
    });
    it('should return false if no direction provided, then prev & next wrappers have different width - height - top - left', () => {
      const nextWrapper = {
        top: 10,
        left: 5,
        height: 30,
        width: 40,
      };

      const prevWrapper = {
        top: 0,
        left: 10,
        height: 50,
        width: 50,
      };

      hasWrapperDiff(nextWrapper, prevWrapper).should.be.true;
    });
  });
  describe('flipflop', () => {
    it('should flipflop from down to up', () => {
      const nextEl = { id: 2 };
      const prevEl = { id: 1 };
      const response = flipflop(C_UP, nextEl, prevEl, C_DOWN);
      response.hasMoved.should.be.true;
      response.prevDir.should.equal(C_UP);
      response.nextEl.should.equal(prevEl);
      response.prevEl.should.equal(nextEl);
    });
    it('should do nothing when not a flipflop from down', () => {
      const nextEl = { id: 2 };
      const prevEl = { id: 1 };
      const response = flipflop(C_LEFT, nextEl, prevEl, C_DOWN);
      response.hasMoved.should.be.false;
      response.prevDir.should.equal(C_DOWN);
      response.nextEl.should.equal(nextEl);
      response.prevEl.should.equal(prevEl);
    });
    it('should flipflop from up to down', () => {
      const nextEl = { id: 2 };
      const prevEl = { id: 1 };
      const response = flipflop(C_DOWN, nextEl, prevEl, C_UP);
      response.hasMoved.should.be.true;
      response.prevDir.should.equal(C_DOWN);
      response.nextEl.should.equal(prevEl);
      response.prevEl.should.equal(nextEl);
    });
    it('should flipflop from up to down when prevDir isnt C_UP', () => {
      const nextEl = { id: 2 };
      const prevEl = { id: 1 };
      const response = flipflop(C_DOWN, nextEl, prevEl, C_LEFT);
      response.hasMoved.should.be.false;
      response.prevDir.should.equal(C_LEFT);
      response.nextEl.should.equal(nextEl);
      response.prevEl.should.equal(prevEl);
    });
    it('should do nothing when not a flipflop from up', () => {
      const nextEl = { id: 2 };
      const prevEl = { id: 1 };
      const response = flipflop(C_RIGHT, nextEl, prevEl, C_UP);
      response.hasMoved.should.be.false;
      response.prevDir.should.equal(C_UP);
      response.nextEl.should.equal(nextEl);
      response.prevEl.should.equal(prevEl);
    });
    it('should flipflop from left to right', () => {
      const nextEl = { id: 2 };
      const prevEl = { id: 1 };
      const response = flipflop(C_RIGHT, nextEl, prevEl, C_LEFT);
      response.hasMoved.should.be.true;
      response.prevDir.should.equal(C_RIGHT);
      response.nextEl.should.equal(prevEl);
      response.prevEl.should.equal(nextEl);
    });
    it('should do nothing when not a flipflop from left', () => {
      const nextEl = { id: 2 };
      const prevEl = { id: 1 };
      const response = flipflop(C_UP, nextEl, prevEl, C_LEFT);
      response.hasMoved.should.be.false;
      response.prevDir.should.equal(C_LEFT);
      response.nextEl.should.equal(nextEl);
      response.prevEl.should.equal(prevEl);
    });
    it('should flipflop from right to left', () => {
      const nextEl = { id: 2 };
      const prevEl = { id: 1 };
      const response = flipflop(C_LEFT, nextEl, prevEl, C_RIGHT);
      response.hasMoved.should.be.true;
      response.prevDir.should.equal(C_LEFT);
      response.nextEl.should.equal(prevEl);
      response.prevEl.should.equal(nextEl);
    });
    it('should do nothing when not a flipflop from right', () => {
      const nextEl = { id: 2 };
      const prevEl = { id: 1 };
      const response = flipflop(C_UP, nextEl, prevEl, C_RIGHT);
      response.hasMoved.should.be.false;
      response.prevDir.should.equal(C_RIGHT);
      response.nextEl.should.equal(nextEl);
      response.prevEl.should.equal(prevEl);
    });
    it('should do nothing when no direction', () => {
      const nextEl = { id: 2 };
      const prevEl = { id: 1 };
      const response = flipflop(undefined, nextEl, prevEl, undefined);
      response.hasMoved.should.be.false;
      (response.prevDir === undefined).should.be.true;
      response.nextEl.should.equal(nextEl);
      response.prevEl.should.equal(prevEl);
    });
  });
  describe('calculateNewState', () => {
    it('should find new elements state', () => {
      const el1 = { id: 1 };
      const el2 = { id: 2, [C_UP]: 3 };
      const el3 = { id: 3 };
      const elements = [el1, el2, el3];
      const response = calculateNewState(C_UP, el2, el1, C_LEFT, elements);
      response.hasMoved.should.be.true;
      response.prevDir.should.equal(C_UP);
      response.nextEl.should.equal(el3);
      response.prevEl.should.equal(el2);
    });
    it('should not move when nextEl = prevEl', () => {
      const el1 = { id: 1 };
      const el2 = { id: 2, [C_UP]: 2 };
      const el3 = { id: 3 };
      const elements = [el1, el2, el3];
      const response = calculateNewState(C_UP, el2, el1, C_LEFT, elements);
      response.hasMoved.should.be.false;
      response.prevDir.should.equal(C_LEFT);
      response.nextEl.should.equal(el2);
      response.prevEl.should.equal(el1);
    });
  });
});
