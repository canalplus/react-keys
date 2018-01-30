class Blocks {
  constructor() {
    this.blockedStuff = [];
    this.generalBlock = false;
    this.block = this.block.bind(this);
    this.unblock = this.unblock.bind(this);
    this.blockExcept = this.blockExcept.bind(this);
    this.unblockExcept = this.unblockExcept.bind(this);
    this.isBlocked = this.isBlocked.bind(this);
  }

  block() {
    this.blockedStuff = [];
    const args = Array.prototype.slice.call(arguments);
    if (args.length > 0) {
      this.generalBlock = false;
      args.forEach(arg => {
        if (arg instanceof Array) {
          this.blockedStuff = this.blockedStuff.concat(arg);
          this.blockedStuff = [...new Set(this.blockedStuff)];
        } else if (this.blockedStuff.indexOf(arg) === -1) {
          this.blockedStuff.push(arg);
        }
      });
    } else {
      this.generalBlock = true;
    }
  }

  blockExcept() {
    this.generalBlock = true;
    this.blockedStuff = [];
    const args = Array.prototype.slice.call(arguments);
    args.forEach(arg => {
      if (arg instanceof Array) {
        this.blockedStuff = this.blockedStuff.concat(arg);
        this.blockedStuff = [...new Set(this.blockedStuff)];
      } else if (this.blockedStuff.indexOf(arg) === -1) {
        this.blockedStuff.push(arg);
      }
    });
  }

  unblockExcept() {
    this.generalBlock = false;
    const args = Array.prototype.slice.call(arguments);
    if (args.length > 0) {
      this.block(...args);
    } else {
      throw new Error(
        'unblockExcept need at least on arg, maybe you want to just unblock()'
      );
    }
  }

  unblock() {
    this.generalBlock = false;
    const args = Array.prototype.slice.call(arguments);
    if (args.length > 0) {
      args.forEach(arg => {
        if (arg instanceof Array) {
          arg.forEach(el => {
            if (this.blockedStuff.indexOf(el) !== -1) {
              this.blockedStuff.splice(this.blockedStuff.indexOf(el), 1);
            }
          });
        } else if (this.blockedStuff.indexOf(arg) !== -1) {
          this.blockedStuff.splice(this.blockedStuff.indexOf(arg), 1);
        }
      });
    } else {
      this.blockedStuff = [];
    }
  }

  isBlocked(id) {
    return (
      (!this.generalBlock && this.blockedStuff.indexOf(id) !== -1) ||
      (this.generalBlock && this.blockedStuff.indexOf(id) === -1)
    );
  }

  getStuff() {
    return this.blockedStuff;
  }

  isGeneralBlocked() {
    return this.generalBlock;
  }
}

export default new Blocks();
