import { UNKNOWN_TALENT } from 'shared/src/data/talents';
import { describe, expect, it, vi } from 'vitest';
import { Store } from './Store';
import { TalentsMenuStore } from './TalentsMenuStore';

vi.mock('./Store', () => {
   const MockedStore = vi.fn().mockImplementation(() => ({}));
   return { Store: MockedStore };
});

describe('TalentsMenuStore', () => {
   it('should be initialized', () => {
      const store = new TalentsMenuStore(new Store());

      expect(store).toBeDefined();
      expect(store.isOpened).toBe(false);
      expect(store.loading).toBe(false);
      expect(store.talents).toEqual([]);
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

      store.addTalent('talent1');
      expect(store.talents).toEqual(['talent1']);

      store.addTalent('talent2');
      expect(store.talents).toEqual(['talent1', 'talent2']);
   });

   it('can remove a talent', () => {
      const store = new TalentsMenuStore(new Store());

      store.addTalent('talent1');
      store.addTalent('talent2');
      store.removeTalent('talent1');
      expect(store.talents).toEqual(['talent2']);
   });

   it('can set a hovered talent', () => {
      const store = new TalentsMenuStore(new Store());

      store.setHoveredTalent('talent1');
      expect(store.hoveredTalent).toBe('talent1');
   });

   it('can clear a hovered talent', () => {
      const store = new TalentsMenuStore(new Store());

      store.setHoveredTalent('talent1');
      store.setHoveredTalent(null);
      expect(store.hoveredTalent).toBe(null);
   });

   it('computes the tooltip state', () => {
      const store = new TalentsMenuStore(new Store());

      store.setHoveredTalent('talent1');
      expect(store.tooltipOpened).toBe(true);

      store.setHoveredTalent(null);
      expect(store.tooltipOpened).toBe(false);
   });

   it('computes the talents map', () => {
      const store = new TalentsMenuStore(new Store());

      store.addTalent('talent1');
      store.addTalent('talent2');
      expect(store.talentsMap).toEqual({ talent1: true, talent2: true });
   });

   it('computes the hovered talent data', () => {
      const store = new TalentsMenuStore(new Store());

      store.setHoveredTalent('talent1');
      expect(store.hoveredTalentData).toEqual(UNKNOWN_TALENT);
   });

   it('can toggle a talent', () => {
      const store = new TalentsMenuStore(new Store());

      store.addTalent('talent1');
      store.addTalent('talent2');
      store.toggleNode('talent1');
      expect(store.talents).toEqual(['talent2']);
   });
});
