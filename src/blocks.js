class Blocks {

  constructor() {
    this.blockedStuff = [];
    this.generalBlock = false;
    this.block = this.block.bind(this);
    this.unblock = this.unblock.bind(this);
  }

  block() {
    this.blockedStuff = [];
    if (arguments.length > 0) {
      this.generalBlock = false;
      for (const arg of arguments) {
        if (arg instanceof Array) {
          this.blockedStuff = this.blockedStuff.concat(arg);
          this.blockedStuff = [...new Set(this.blockedStuff)];
        } else if (this.blockedStuff.indexOf(arg) === -1) {
          this.blockedStuff.push(arg);
        }
      }
    } else {
      this.generalBlock = true;
    }
  }

  unblock() {
    this.generalBlock = false;
    if (arguments.length > 0) {
      for (const arg of arguments) {
        if (arg instanceof Array) {
          this.blockedStuff = this.blockedStuff.concat(arg);
        } else if (this.blockedStuff.indexOf(arg) !== -1) {
          this.blockedStuff.splice(this.blockedStuff.indexOf(arg), 1);
        }
      }
    } else {
      this.blockedStuff = [];
    }
  }

  getStuff() {
    return this.blockedStuff;
  }

  isGeneralBlocked() {
    return this.generalBlock;
  }
}

export default new Blocks();