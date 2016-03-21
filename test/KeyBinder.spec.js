/* eslint no-unused-expressions:0 */
/* eslint no-unused-vars:0 */
import React from 'react';
import KeyBinder from '../src/KeyBinder';
import {shallow} from 'enzyme';

describe('should wrap with tagName div', () => {
  it('should exist', () => {
    const keyBinder = shallow(<KeyBinder />);
    keyBinder.should.have.tagName('div');
  });
});
