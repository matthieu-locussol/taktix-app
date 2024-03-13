import { describe, expect, it, vi } from 'vitest';
import { Store } from './Store';
import { TalentsMenuStore } from './TalentsMenuStore';

vi.mock('./Store', () => {
   const MockedStore = vi.fn().mockImplementation(() => ({}));

   return { Store: MockedStore };
});

vi.mock('shared/src/data/talents', () => ({
   STARTING_TALENTS: [1, 2],
   TALENTS: {
      1: { id: 1, edges: [] },
      2: { id: 2, edges: [] },
   },
}));

describe('TalentsMenuStore', () => {
   it('should be initialized', () => {
      const store = new TalentsMenuStore(new Store());

      expect(store).toBeDefined();
      expect(store.isOpened).toBe(false);
      expect(store.talents).toEqual([]);
      expect(store.talentsPoints).toBe(0);
      expect(store.hoveredTalent).toBe(null);
   });

   it('can be opened', () => {
      const store = new TalentsMenuStore(new Store());

      store.open();
      expect(store.isOpened).toBe(true);
   });

   it('can be closed', () => {
      const store = new TalentsMenuStore(new Store());

      store.open();
      store.close();
      expect(store.isOpened).toBe(false);
   });

   it('can be toggled', () => {
      const store = new TalentsMenuStore(new Store());

      store.toggle();
      expect(store.isOpened).toBe(true);

      store.toggle();
      expect(store.isOpened).toBe(false);
   });

   it('can add a talent', () => {
      const store = new TalentsMenuStore(new Store());

      store.addTalent(1);
      expect(store.talents).toEqual([1]);

      store.addTalent(2);
      expect(store.talents).toEqual([1, 2]);
   });

   it('can remove a talent', () => {
      const store = new TalentsMenuStore(new Store());

      store.addTalent(1);
      store.addTalent(2);
      store.removeTalent(1);
      expect(store.talents).toEqual([2]);
   });

   it('can set a hovered talent', () => {
      const store = new TalentsMenuStore(new Store());

      store.setHoveredTalent(1);
      expect(store.hoveredTalent).toBe(1);
   });

   it('can clear a hovered talent', () => {
      const store = new TalentsMenuStore(new Store());

      store.setHoveredTalent(1);
      store.setHoveredTalent(null);
      expect(store.hoveredTalent).toBe(null);
   });

   it('computes the tooltip state', () => {
      const store = new TalentsMenuStore(new Store());

      store.setHoveredTalent(1);
      expect(store.tooltipOpened).toBe(true);

      store.setHoveredTalent(null);
      expect(store.tooltipOpened).toBe(false);
   });

   it('computes the talents map', () => {
      const store = new TalentsMenuStore(new Store());

      store.addTalent(1);
      store.addTalent(2);
      expect(store.talentsMap).toEqual({ 1: true, 2: true });
   });

   it('computes the hovered talent data', () => {
      const store = new TalentsMenuStore(new Store());

      store.setHoveredTalent(1);
      expect(store.hoveredTalentData).toEqual({
         id: 1,
         edges: [],
      });
   });

   it('can set talents points', () => {
      const store = new TalentsMenuStore(new Store());

      store.setTalentsPoints(5);
      expect(store.talentsPoints).toBe(5);
   });

   it('can set talents', () => {
      const store = new TalentsMenuStore(new Store());

      store.setTalents([1, 2]);
      expect(store.talents).toEqual([1, 2]);
   });

   it('can toggle a talent', () => {
      const store = new TalentsMenuStore(new Store());
      store.setTalentsPoints(1);

      store.toggleNode(1);
      expect(store.talents).toEqual([1]);

      store.toggleNode(1);
      expect(store.talents).toEqual([]);

      store.toggleNode(2);
      expect(store.talents).toEqual([2]);
   });
});
