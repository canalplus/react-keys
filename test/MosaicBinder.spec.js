/* eslint no-unused-expressions:0 */
/* eslint no-unused-vars:0 */
import React from 'react';
import MosaicBinder from '../src/MosaicBinder';
import {shallow} from 'enzyme';
import * as constants from '../src/constants';

describe('MosaicBinder.jsx', () => {
  it('should wrap with tagName div', () => {
    const keyBinder = shallow(<MosaicBinder binderId="1"/>);
    keyBinder.should.have.tagName('div');
  });
});
