import {
  findMountedId,
  findBinder,
  addBinder,
  updateBinder,
  findMounted,
  computeAddingBinder,
  computeMountBinder,
  isBinderShouldMount,
  mountBinder,
  computeRemoveBinder,
  computeResetBinder,
  removeBinder,
  hasMountedBinder,
  mountfreshestBinder,
  buildCurrent,
  unsleepBinder,
} from '../helper';
import { expect } from 'chai';

describe('redux/helper.js', () => {
  describe('findMountedId', () => {
    it('should return first mounted id', () => {
      const binders = [
        { id: '1', mounted: false },
        { id: '2', mounted: true },
        { id: '3', mounted: true },
      ];
      findMountedId(binders).should.equal('2');
    });
    it('should return undefined if nothing found', () => {
      const binders = [
        { id: '1', mounted: false },
        { id: '2', mounted: false },
      ];
      expect(findMountedId(binders)).to.be.undefined;
    });
  });
  describe('findMounted', () => {
    it('should retirn mounted object', () => {
      const binders = [
        { id: '1', mounted: false },
        { id: '2', mounted: true },
        { id: '3', mounted: true },
      ];
      findMounted(binders).should.eql({ id: '2', mounted: true });
    });
    it('should return undefined if nothing found', () => {
      const binders = [
        { id: '1', mounted: false },
        { id: '2', mounted: false },
      ];
      expect(findMounted(binders)).to.be.undefined;
    });
  });
  describe('findBinder', () => {
    it('should return binder by id', () => {
      const binders = [
        { id: '1', mounted: false },
        { id: '2', mounted: true },
        { id: '3', mounted: true },
      ];
      findBinder(binders, '3').should.eql({ id: '3', mounted: true });
    });
    it('should return undefined if nothing found', () => {
      const binders = [
        { id: '1', mounted: false },
        { id: '2', mounted: false },
      ];
      expect(findBinder(binders, '4')).to.be.undefined;
    });
  });
  describe('updateBinder', () => {
    it('should update binder', () => {
      const binders = [
        { id: '1', mounted: false },
        { id: '2', mounted: true },
        { id: '3', mounted: true },
      ];
      updateBinder(binders, { id: '3', mounted: false }).should.eql([
        { id: '1', mounted: false },
        { id: '2', mounted: true },
        { id: '3', mounted: false },
      ]);
    });
  });
  describe('computeAddingBinder', () => {
    it('should add binder to list', () => {
      const binders = [{ id: '1', mounted: false }];
      computeAddingBinder(binders, { id: '2', active: false }).should.eql([
        { id: '1', mounted: false },
        { id: '2', active: false, sleep: false },
      ]);
    });
    it('should mount binder if binder is active', () => {
      const binders = [{ id: '1', mounted: false }];
      const result = computeAddingBinder(binders, { id: '2', active: true });
      result.should.eql([
        { id: '1', mounted: false },
        {
          id: '2',
          active: true,
          mounted: true,
          mountedTime: result[1].mountedTime,
          sleep: false,
        },
      ]);
    });
  });
  describe('addBinder', () => {
    it('should add binder to binders list', () => {
      const binders = [{ id: '1', mounted: false }];
      addBinder(binders, { id: '2' }).should.eql([
        { id: '1', mounted: false },
        { id: '2', sleep: false },
      ]);
    });
  });
  describe('computeMountBinder', () => {
    it('should not mount binder if does not exist', () => {
      const binders = [{ id: '1', mounted: false }];
      computeMountBinder(binders, { id: '2' }).should.eql(binders);
    });

    it('should not mount binder if priority is less than the mounted binder', () => {
      const binders = [
        { id: '1', mounted: true, priority: 2 },
        { id: '2', mounted: false, priority: 1 },
      ];
      computeMountBinder(binders, { id: '2', priority: 1 }).should.eql([
        { id: '1', mounted: true, priority: 2 },
        { id: '2', mounted: false, priority: 1 },
      ]);
    });

    it('should mount binder', () => {
      const binders = [
        { id: '1', mounted: true, priority: 0 },
        { id: '2', mounted: false, priority: 0 },
      ];
      const result = computeMountBinder(binders, { id: '2', priority: 0 });
      result.should.eql([
        { id: '1', mounted: false, priority: 0 },
        {
          id: '2',
          mounted: true,
          priority: 0,
          sleep: false,
          mountedTime: result[1].mountedTime,
        },
      ]);
    });
  });
  describe('isBinderShouldMount', () => {
    it('should result true if binder no mounted binder found', () => {
      const binders = [{ id: '1', mounted: false }];
      isBinderShouldMount(binders, { id: '2' }).should.be.true;
    });

    it('should return true if binder priority is equal or sup to mounted binder', () => {
      const binders = [{ id: '1', mounted: true, priority: 0 }];
      isBinderShouldMount(binders, { id: '2', priority: 0 }).should.be.true;
    });

    it('should return false mounted binder priority is sup to binder', () => {
      const binders = [{ id: '1', mounted: true, priority: 1 }];
      isBinderShouldMount(binders, { id: '2', priority: 0 }).should.be.false;
    });
  });
  describe('mountBinder', () => {
    it('should turn mounted flag to true and add mountedTime timestsamp and sleep to false', () => {
      const binders = [
        { id: '1', mounted: true, priority: 0 },
        { id: '2', priority: 0 },
      ];
      const result = mountBinder(binders, '2');
      result.should.eql([
        { id: '1', mounted: false, priority: 0 },
        {
          id: '2',
          priority: 0,
          mounted: true,
          sleep: false,
          mountedTime: result[1].mountedTime,
        },
      ]);
    });
  });
  describe('unsleepBinder', () => {
    it('should unsleep binder if strategy is memory', () => {
      const binders = [
        { id: '1', mounted: false },
        { id: '2', memory: true, sleep: true },
        { id: '3', memory: true, sleep: true },
      ];
      unsleepBinder(binders, '2').should.eql([
        { id: '1', mounted: false },
        { id: '2', memory: true, sleep: false },
        { id: '3', memory: true, sleep: true },
      ]);
    });
  });
  describe('computeRemoveBinder', () => {
    it('should remove binder', () => {
      const binders = [{ id: '1', mounted: true }, { id: '2', mounted: false }];
      computeRemoveBinder(binders, '2').should.eql([
        { id: '1', mounted: true },
      ]);
    });

    it('should mount freshest mounted binder if no more binder mounted', () => {
      const binders = [
        { id: '1', mounted: false },
        { id: '2', mounted: false },
      ];
      const result = computeRemoveBinder(binders, '2');
      result.should.eql([
        {
          id: '1',
          mounted: true,
          mountedTime: result[0].mountedTime,
          sleep: false,
        },
      ]);
    });
  });
  describe('computeResetBinder', () => {
    it('should return updated bounds', () => {
      const state = {
        wrapper: { left: 10, top: 10, right: 10, down: 10 },
        marginLeft: 0,
        marginTop: 0,
        elements: [{ id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } }],
        downLimit: 0,
        rightLimit: 0,
        gap: 0,
        boundedGap: 0,
        topGap: 0,
        rightGap: 0,
        leftGap: 0,
        downGap: 0,
        selectedId: '2',
      };

      computeResetBinder(state, 'xoxo', '1', false).should.eql({
        id: 'xoxo',
        selectedId: '1',
        hasMoved: true,
        prevEl: undefined,
        nextEl: { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
        prevDir: null,
        elements: [{ id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } }],
        marginLeft: 0,
        marginTop: 0,
      });
    });
    it('should return undefined if no elements', () => {
      const state = {
        wrapper: { left: 10, top: 10, right: 10, down: 10 },
        marginLeft: 0,
        marginTop: 0,
        elements: [],
        downLimit: 0,
        rightLimit: 0,
        gap: 0,
        boundedGap: 0,
        topGap: 0,
        rightGap: 0,
        leftGap: 0,
        downGap: 0,
        selectedId: '2',
      };

      (computeResetBinder(state, 'xoxo', 'xixi', false) === undefined).should.be
        .true;
    });
  });
  describe('removeBinder', () => {
    it('should remove binder', () => {
      const binders = [{ id: '1', mounted: true }, { id: '2', mounted: false }];
      removeBinder(binders, '2').should.eql([{ id: '1', mounted: true }]);
    });

    it('should unmount binder if strategy is memory', () => {
      const binders = [{ id: '1', mounted: true, memory: true }];
      removeBinder(binders, '1').should.eql([
        {
          id: '1',
          memory: true,
          mounted: false,
          sleep: true,
        },
      ]);
    });
    it('should force remove binder even if strategy is memory', () => {
      const binders = [{ id: '1', mounted: true, memory: true }];
      removeBinder(binders, '1', true).should.be.empty;
    });
  });
  describe('hasMountedBinder', () => {
    it('should return true if has mounted binder', () => {
      const binders = [{ id: '1', mounted: true }];
      hasMountedBinder(binders).should.be.true;
    });

    it('should return false if no binder is mounted', () => {
      const binders = [{ id: '1', mounted: false }];
      hasMountedBinder(binders).should.be.false;
    });
  });
  describe('mountfreshestBinder', () => {
    it('should mount unsleeping binder', () => {
      const binders = [
        { id: '1', mounted: false, sleep: true },
        { id: '2', mounted: false, sleep: false },
      ];
      const result = mountfreshestBinder(binders);
      result.should.eql([
        { id: '1', mounted: false, sleep: true },
        {
          id: '2',
          mounted: true,
          sleep: false,
          mountedTime: result[1].mountedTime,
        },
      ]);
    });
    it('should mount freshest binder', () => {
      const binders = [
        { id: '1', mounted: false, sleep: false, mountedTime: 10 },
        { id: '2', mounted: false, sleep: false, mountedTime: 2 },
      ];
      const result = mountfreshestBinder(binders);
      result.should.eql([
        {
          id: '1',
          mounted: true,
          sleep: false,
          mountedTime: result[0].mountedTime,
        },
        {
          id: '2',
          mounted: false,
          mountedTime: 2,
          sleep: false,
        },
      ]);
    });
    it('should return same binders if no binders are sleeping', () => {
      const binders = [
        { id: '1', mounted: false, sleep: true, mountedTime: 10 },
        { id: '2', mounted: false, sleep: true, mountedTime: 2 },
      ];
      const result = mountfreshestBinder(binders);
      result.should.eql(binders);
    });
    it('should priorize once mounted binder', () => {
      const binders = [
        { id: '3', mounted: false, sleep: false, mountedTime: 2 },
        { id: '2', mounted: false, sleep: false, mountedTime: 4 },
        { id: '1', mounted: false, sleep: false },
      ];
      const result = mountfreshestBinder(binders);
      result.should.eql([
        {
          id: '3',
          mounted: false,
          sleep: false,
          mountedTime: 2,
        },
        {
          id: '2',
          mounted: true,
          mountedTime: result[1].mountedTime,
          sleep: false,
        },
        {
          id: '1',
          mounted: false,
          sleep: false,
        },
      ]);
    });

    it('should priorize by priority if no binder has been mounted already', () => {
      const binders = [
        { id: '3', mounted: false, sleep: false, priority: 1 },
        { id: '2', mounted: false, sleep: false, priority: 3 },
        { id: '1', mounted: false, sleep: false, priority: 2 },
      ];
      const result = mountfreshestBinder(binders);
      result.should.eql([
        {
          id: '3',
          mounted: false,
          sleep: false,
          priority: 1,
        },
        {
          id: '2',
          mounted: true,
          priority: 3,
          mountedTime: result[1].mountedTime,
          sleep: false,
        },
        {
          id: '1',
          mounted: false,
          priority: 2,
          sleep: false,
        },
      ]);
    });
  });
  describe('buildCurrent', () => {
    it('should return mounted values', () => {
      const binders = [
        { id: '1', mounted: false, sleep: true },
        { id: '2', mounted: true, sleep: false, selectedId: '22' },
      ];
      buildCurrent(binders).should.eql({ binderId: '2', selectedId: '22' });
    });

    it('should return current values if no binder mounted', () => {
      const current = { binderId: '1', selectedId: '11' };
      const binders = [
        { id: '2', mounted: false, sleep: false, selectedId: '22' },
      ];
      buildCurrent(binders, current).should.eql(current);
    });
  });
});
