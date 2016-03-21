import jsdom from 'jsdom';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

const blacklist = Object.keys(global);
blacklist.push('constructor');

for (const key in window) {
  if (!window.hasOwnProperty(key)) continue;
  if (~blacklist.indexOf(key)) continue;
  if (key in global) continue;
  global[key] = window[key];
}
