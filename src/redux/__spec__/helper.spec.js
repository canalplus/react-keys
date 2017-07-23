import {
  findMountedId,
  findBinder,
  addBinder,
  updateBinder,
} from '../helper';
import { NAME } from '../../constants';
import { expect } from 'chai';

describe('redux/helper.js', () => {
  describe('findFirstActiveBinderId', () => {
    it('should return undefined when no binders', () => {
      const state = { [NAME]: { binders: [] } };
      expect(findMountedId(state)).to.be.undefined;
    });
    it('should return indefined when no binders active', () => {
      const state = {
        [NAME]: {
          binders: [{ id: '1', active: false }, { id: '2', active: false }],
        },
      };
      expect(findMountedId(state)).to.be.undefined;
    });
    it('should return first active binder id', () => {
      const state = {
        [NAME]: {
          binders: [
            { id: '1', active: false },
            { id: '2', active: true },
            { id: '3', active: true },
          ],
        },
      };
      findMountedId(state).should.equal('2');
    });
  });
  describe('findBinder', () => {
    it('should return undefined if there is no binder', () => {
      const state = {
        [NAME]: {
          binders: [],
        },
      };
      expect(findBinder(state, '4')).to.be.undefined;
    });
    it('should return undefined when no binder found', () => {
      const state = {
        [NAME]: {
          binders: [{ id: '1' }, { id: '2' }, { id: '3' }],
        },
      };
      expect(findBinder(state, '4')).to.be.undefined;
    });
    it('should return found binber', () => {
      const state = {
        [NAME]: {
          binders: [{ id: '1' }, { id: '2' }, { id: '3' }],
        },
      };
      findBinder(state, '3').should.eql({ id: '3' });
    });
  });
  describe('addBinder', () => {
    it('should add binder at the beggining if same ranking', () => {
      const state = {
        binders: [
          { id: '1', priority: 0 },
          { id: '2', priority: 0 },
          { id: '3', priority: 0 },
        ],
      };
      addBinder(state, { id: '4', priority: 0 }).should.eql([
        { id: '4', priority: 0 },
        { id: '3', priority: 0 },
        { id: '2', priority: 0 },
        { id: '1', priority: 0 },
      ]);
    });
    it('should add binder at the right tanking position', () => {
      const state = {
        binders: [
          { id: '1', priority: 1 },
          { id: '2', priority: 3 },
          { id: '3', priority: 5 },
        ],
      };
      addBinder(state, { id: '4', priority: 4 }).should.eql([
        { id: '3', priority: 5 },
        { id: '4', priority: 4 },
        { id: '2', priority: 3 },
        { id: '1', priority: 1 },
      ]);
    });
  });
  describe('updateBinder', () => {
    const state = {
      binders: [
        { id: '1', priority: 1 },
        { id: '2', priority: 3 },
        { id: '3', priority: 5 },
      ],
    };
    updateBinder(state, { id: '3', active: true }).should.eql([
      { id: '1', priority: 1 },
      { id: '2', priority: 3 },
      { id: '3', priority: 5, active: true },
    ]);
  });
  describe('activeBinder', () => {
    it('should desactivate binders except given id', () => {
      const state = {
        binders: [
          { id: '1', active: true },
          { id: '2', active: true },
          { id: '3', active: true },
        ],
      };
      desactiveBinders(state, '2').should.eql([
        { id: '1', active: false },
        { id: '2', active: true },
        { id: '3', active: false },
      ]);
    });
  });
});
