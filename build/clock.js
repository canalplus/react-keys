"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.block = block;
exports.isBlocked = isBlocked;
var keysLock = false;

function block() {
  keysLock = true;
  setTimeout(function () {
    return keysLock = false;
  }, 10);
}

function isBlocked() {
  return keysLock;
}