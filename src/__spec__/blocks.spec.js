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

    it('should unlock seelcted keys in array', () => {
      blocks.block([1, 2, 3]);
      blocks.getStuff().should.eql([1, 2, 3]);
      blocks.unblock([2]);
      blocks.getStuff().should.eql([1, 3]);
    });

    it('should unlock all keys when no args', () => {
      blocks.block([1, 2, 3]);
      blocks.getStuff().should.eql([1, 2, 3]);
      blocks.unblock();
      blocks.getStuff().should.be.empty;
    });

  });

  describe('blockExcept', () => {

    it('should global block and save keys when value', () => {
      blocks.blockExcept(2);
      blocks.getStuff().should.eql([2]);
      blocks.isGeneralBlocked().should.be.true;
    });

    it('should global block and save keys when array', () => {
      blocks.blockExcept(2, [3]);
      blocks.getStuff().should.eql([2, 3]);
      blocks.isGeneralBlocked().should.be.true;
    });

  });

  describe('unblockExcept', () => {

    it('should keep blocked selected element in array', () => {
      blocks.block([1, 2, 3]);
      blocks.getStuff().should.eql([1, 2, 3]);
      blocks.unblockExcept([2]);
      blocks.getStuff().should.eql([2]);
      blocks.isGeneralBlocked().should.be.false;
    });

    it('should keep blocked selected element has value', () => {
      blocks.block([1, 2, 3]);
      blocks.getStuff().should.eql([1, 2, 3]);
      blocks.unblockExcept(3);
      blocks.getStuff().should.eql([3]);
      blocks.isGeneralBlocked().should.be.false;
    });

    it('should throw error when no args', () => {
      blocks.unblockExcept.should.throw(Error);
    });

  });

  describe('isBlocked', () => {

    it('should work with block/unblock', () => {
      const id = 'X';
      blocks.isBlocked(id).should.be.false;
      blocks.block(id);
      blocks.isBlocked(id).should.be.true;
      blocks.unblock();
      blocks.isBlocked(id).should.be.false;
      blocks.block();
      blocks.isBlocked(id).should.be.true;
      blocks.unblock(id);
      blocks.isBlocked(id).should.be.false;
    });

    it('should work with blockExpect/unblockExpect', () => {
      const id = 'X';
      blocks.isBlocked(id).should.be.false;
      blocks.blockExcept(id);
      blocks.isBlocked(id).should.be.false;
      blocks.blockExcept('STUFF');
      blocks.isBlocked(id).should.be.true;
      blocks.unblockExcept(id);
      blocks.isBlocked(id).should.be.true;
      blocks.unblockExcept('STUFF');
      blocks.isBlocked(id).should.be.false;
      blocks.unblock();
    });

  });

});