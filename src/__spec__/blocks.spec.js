import blocks from '../blocks';

describe('blocks', () => {

  describe('block', () => {

    it('should add keys by list args to blockedKeys', () => {
      blocks.block(1, 2, 3);
      blocks.getStuff().should.eql([1, 2, 3]);
      blocks.isGeneralBlocked().should.be.false;
    });

    it('should add keys by array to blockedKeys', () => {
      blocks.block([1, 2, 3]);
      blocks.getStuff().should.eql([1, 2, 3]);
      blocks.isGeneralBlocked().should.be.false;
    });

    it('should add keys by array or list args to blockedKeys', () => {
      blocks.block([1, 2, 3], 4, 5, [6]);
      blocks.getStuff().should.eql([1, 2, 3, 4, 5, 6]);
      blocks.isGeneralBlocked().should.be.false;
    });

    it('should generalBlock keys when no arguments', () => {
      blocks.block();
      blocks.getStuff().should.eql([]);
      blocks.isGeneralBlocked().should.be.true;
    });

    it('should not add keys twice', () => {
      blocks.block([1, 2, 3], 1, 2, [3]);
      blocks.getStuff().should.eql([1, 2, 3]);
      blocks.isGeneralBlocked().should.be.false;
    });

  });

  describe('unblock', () => {

    it('should unlock selected keys', () => {
      blocks.block([1, 2, 3]);
      blocks.getStuff().should.eql([1, 2, 3]);
      blocks.unblock(2);
      blocks.getStuff().should.eql([1, 3]);
      blocks.isGeneralBlocked().should.be.false;
      blocks.unblock(2);
      blocks.getStuff().should.eql([1, 3]);
    });

    it('should unlock all keys when no args', () => {
      blocks.block([1, 2, 3]);
      blocks.getStuff().should.eql([1, 2, 3]);
      blocks.unblock();
      blocks.getStuff().should.be.empty;
    });

  });

});