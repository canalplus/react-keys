import { isHorizontalVisible, isVerticalVisible } from '../visibility';

describe('engine/visibility', () => {
  describe('isHorizontalVisible', () => {
    it('should return true if both side is into wrapper', () => {
      const wrapper = { width: 10 };
      isHorizontalVisible(wrapper, { left: 4, right: 6 }).should.be.true;
      isHorizontalVisible(wrapper, { left: 0, right: 6 }).should.be.true;
      isHorizontalVisible(wrapper, { left: 4, right: 10 }).should.be.true;
    });
    it('should return true if at least right side is into wrapper', () => {
      const wrapper = { width: 10 };
      isHorizontalVisible(wrapper, { left: 4, right: 6 }).should.be.true;
    });
    it('should return true if at least left side is into wrapper', () => {
      const wrapper = { width: 10 };
      isHorizontalVisible(wrapper, { left: 8, right: 12 }).should.be.true;
    });
    it('should return false if both sides are outside the wrapper', () => {
      const wrapper = { width: 10 };
      isHorizontalVisible(wrapper, { left: -4, right: -2 }).should.be.false;
      isHorizontalVisible(wrapper, { left: 11, right: 15 }).should.be.false;
    });
    it('should add an offset for the visibility', () => {
      const wrapper = { width: 10 };
      const offset = 2;
      isHorizontalVisible(wrapper, { left: 0, right: 3 }, 0, offset).should.be
        .true;
      isHorizontalVisible(wrapper, { left: 12, right: 15 }, 0, offset).should.be
        .true;
      isHorizontalVisible(wrapper, { left: -15, right: -13 }, 0, offset).should
        .be.false;
      isHorizontalVisible(wrapper, { left: 13, right: 15 }, 0, offset).should.be
        .false;
    });
    it('should handle marginLeft to determine the visiblity', () => {
      const wrapper = { width: 20 };
      const marginLeft = -10;
      isHorizontalVisible(wrapper, { left: 28, right: 33 }, marginLeft).should
        .be.true;
      isHorizontalVisible(wrapper, { left: 26, right: 37 }, marginLeft).should
        .be.true;
      isHorizontalVisible(wrapper, { left: 22, right: 25 }, marginLeft).should
        .be.true;
      isHorizontalVisible(wrapper, { left: 31, right: 34 }, marginLeft).should
        .be.false;
      isHorizontalVisible(wrapper, { left: 3, right: 9 }, marginLeft).should.be
        .false;
    });
  });

  describe('isVerticalVisible', () => {
    it('should return true if both side is into wrapper', () => {
      const wrapper = { top: 0, height: 10 };
      isVerticalVisible(wrapper, { top: 4, height: 6 }).should.be.true;
      isVerticalVisible(wrapper, { top: 0, height: 6 }).should.be.true;
      isVerticalVisible(wrapper, { top: 4, height: 10 }).should.be.true;
    });
    it('should return true if at least top side is into wrapper', () => {
      const wrapper = { height: 5 };
      isVerticalVisible(wrapper, { top: 4, height: 6 }).should.be.true;
    });
    it('should return true if at least down side is into wrapper', () => {
      const wrapper = { height: 5 };
      isVerticalVisible(wrapper, { top: -1, height: 4 }).should.be.true;
    });
    it('should return false if both sides are outside the wrapper', () => {
      const wrapper = { height: 5 };
      isVerticalVisible(wrapper, { top: -4, height: 3 }, 0, 0).should.be.false;
      isVerticalVisible(wrapper, { top: 11, height: 15 }, 0, 0).should.be.false;
    });
    it('should handle marginTop to determine the visiblity', () => {
      const wrapper = { height: 20 };
      const marginTop = -10;
      isVerticalVisible(wrapper, { top: 28, height: 5 }, marginTop).should.be
        .true;
      isVerticalVisible(wrapper, { top: 26, height: 5 }, marginTop).should.be
        .true;
      isVerticalVisible(wrapper, { top: 22, height: 5 }, marginTop).should.be
        .true;
      isVerticalVisible(wrapper, { top: 31, height: 5 }, marginTop).should.be
        .false;
      isVerticalVisible(wrapper, { top: 35, height: 5 }, marginTop).should.be
        .false;
    });
  });
});
