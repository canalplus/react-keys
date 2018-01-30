import { isHorizontalVisible, isVerticalVisible } from '../visibility';

describe('engine/visibility', () => {
  describe('isHorizontalVisible', () => {
    it('should return true if both side is into wrapper', () => {
      const wrapper = { left: 0, right: 10 };
      isHorizontalVisible(wrapper, { left: 4, right: 6 }).should.be.true;
      isHorizontalVisible(wrapper, { left: 0, right: 6 }).should.be.true;
      isHorizontalVisible(wrapper, { left: 4, right: 10 }).should.be.true;
    });
    it('should return true if at least right side is into wrapper', () => {
      const wrapper = { left: 5, right: 10 };
      isHorizontalVisible(wrapper, { left: 4, right: 6 }).should.be.true;
    });
    it('should return true if at least left side is into wrapper', () => {
      const wrapper = { left: 5, right: 10 };
      isHorizontalVisible(wrapper, { left: 8, right: 12 }).should.be.true;
    });
    it('should return false if both sides are outside the wrapper', () => {
      const wrapper = { left: 5, right: 10 };
      isHorizontalVisible(wrapper, { left: 2, right: 4 }).should.be.false;
      isHorizontalVisible(wrapper, { left: 11, right: 15 }).should.be.false;
    });
    it('should add an offset for the visibility', () => {
      const wrapper = { left: 5, right: 10 };
      const offset = 2;
      isHorizontalVisible(wrapper, { left: 0, right: 3 }, 0, offset).should.be
        .true;
      isHorizontalVisible(wrapper, { left: 12, right: 15 }, 0, offset).should.be
        .true;
      isHorizontalVisible(wrapper, { left: 0, right: 2 }, 0, offset).should.be
        .false;
      isHorizontalVisible(wrapper, { left: 13, right: 15 }, 0, offset).should.be
        .false;
    });
    it('should handle marginLeft to determine the visiblity', () => {
      const wrapper = { left: 15, right: 20 };
      const marginLeft = -10;
      isHorizontalVisible(wrapper, { left: 28, right: 33 }, marginLeft).should
        .be.true;
      isHorizontalVisible(wrapper, { left: 26, right: 37 }, marginLeft).should
        .be.true;
      isHorizontalVisible(wrapper, { left: 22, right: 25 }, marginLeft).should
        .be.true;
      isHorizontalVisible(wrapper, { left: 31, right: 34 }, marginLeft).should
        .be.false;
      isHorizontalVisible(wrapper, { left: 10, right: 14 }, marginLeft).should
        .be.false;
    });
  });

  describe('isVerticalVisible', () => {
    it('should return true if both side is into wrapper', () => {
      const wrapper = { top: 0, down: 10 };
      isVerticalVisible(wrapper, { top: 4, down: 6 }).should.be.true;
      isVerticalVisible(wrapper, { top: 0, down: 6 }).should.be.true;
      isVerticalVisible(wrapper, { top: 4, down: 10 }).should.be.true;
    });
    it('should return true if at least top side is into wrapper', () => {
      const wrapper = { top: 5, down: 10 };
      isVerticalVisible(wrapper, { top: 4, down: 6 }).should.be.true;
    });
    it('should return true if at least down side is into wrapper', () => {
      const wrapper = { top: 5, down: 10 };
      isVerticalVisible(wrapper, { top: 8, down: 12 }).should.be.true;
    });
    it('should return false if both sides are outside the wrapper', () => {
      const wrapper = { top: 5, down: 10 };
      isVerticalVisible(wrapper, { top: 2, down: 4 }).should.be.false;
      isVerticalVisible(wrapper, { top: 11, down: 15 }).should.be.false;
    });
    it('should add an offset for the visibility', () => {
      const wrapper = { top: 5, down: 10 };
      const offset = 2;
      isVerticalVisible(wrapper, { top: 0, down: 3 }, 0, offset).should.be.true;
      isVerticalVisible(wrapper, { top: 12, down: 15 }, 0, offset).should.be
        .true;
      isVerticalVisible(wrapper, { top: 0, down: 2 }, 0, offset).should.be
        .false;
      isVerticalVisible(wrapper, { top: 13, down: 15 }, 0, offset).should.be
        .false;
    });
    it('should handle marginTop to determine the visiblity', () => {
      const wrapper = { top: 15, down: 20 };
      const marginTop = -10;
      isVerticalVisible(wrapper, { top: 28, down: 33 }, marginTop).should.be
        .true;
      isVerticalVisible(wrapper, { top: 26, down: 37 }, marginTop).should.be
        .true;
      isVerticalVisible(wrapper, { top: 22, down: 25 }, marginTop).should.be
        .true;
      isVerticalVisible(wrapper, { top: 31, down: 34 }, marginTop).should.be
        .false;
      isVerticalVisible(wrapper, { top: 10, down: 14 }, marginTop).should.be
        .false;
    });
  });
});
