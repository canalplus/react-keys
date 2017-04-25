import { JSDOM } from 'jsdom';

const window = (new JSDOM('<!doctype html><html><body><div id="container"></div></body></html>')).window;
global.window = window.document.defaultView;
global.document = window.document;
global.navigator = window.navigator;

const blacklist = Object.keys(window);
blacklist.push('constructor');

for (const key in window) {
  if (!window.hasOwnProperty(key)) continue;
  if (~blacklist.indexOf(key)) continue;
  if (key in global) continue;
  global[key] = window[key];
}
