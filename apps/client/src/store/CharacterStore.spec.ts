import { ProfessionType } from 'shared/src/types/Profession';
import { StatisticMgt } from 'shared/src/utils/statisticMgt';
import { describe, expect, it, vi } from 'vitest';

import { CharacterStore } from './CharacterStore';
import { Store } from './Store';

vi.mock('./Store', () => {
   const MockedStore = vi.fn().mockImplementation(() => ({}));

   return { Store: MockedStore };
});

describe('CharacterStore', () => {
   it('should be initialized', () => {
      const store = new CharacterStore(new Store());

      expect(store).toBeDefined();
      expect(store.map).toEqual('AAA_InitialRoom');
      expect(store.name).toEqual('');
      expect(store.profession).toEqual(ProfessionType.Warrior);
      expect(store.position).toEqual({ x: 0, y: 0 });
      expect(store.talents).toHaveLength(0);
      expect(store.talentsPoints).toBe(0);
      expect(store.baseStatistics).toEqual(StatisticMgt.makeMockedStatistics({}));
      expect(store.baseStatisticsPoints).toBe(0);
      expect(store.experience).toBe(0);
      expect(store.currentHealth).toBe(0);
      expect(store.teleporters).toHaveLength(0);
   });

   it('should set the map', () => {
      const store = new CharacterStore(new Store());

      store.setMap('MoonshadowHamletRoom');
      expect(store.map).toBe('MoonshadowHamletRoom');
   });

   it('should set the name', () => {
      const store = new CharacterStore(new Store());

      store.setName('John');
      expect(store.name).toBe('John');
   });

   it('should set the profession', () => {
      const store = new CharacterStore(new Store());

      store.setProfession(ProfessionType.Mage);
      expect(store.profession).toBe(ProfessionType.Mage);
   });

   it('should set the position', () => {
      const store = new CharacterStore(new Store());

      store.setPosition({ x: 1, y: 2 });
      expect(store.position).toEqual({ x: 1, y: 2 });
   });

   it('should set the position x', () => {
      const store = new CharacterStore(new Store());

      store.setPositionX(1);
      expect(store.position).toEqual({ x: 1, y: 0 });
   });

   it('should set the position y', () => {
      const store = new CharacterStore(new Store());

      store.setPositionY(2);
      expect(store.position).toEqual({ x: 0, y: 2 });
   });

   it('should set the talents', () => {
      const store = new CharacterStore(new Store());

      store.setTalents([1, 2, 3]);
      expect(store.talents).toEqual([1, 2, 3]);
   });

   it('should set the talents points', () => {
      const store = new CharacterStore(new Store());

      store.setTalentsPoints(5);
      expect(store.talentsPoints).toBe(5);
   });

   it('should set the base statistics', () => {
      const store = new CharacterStore(new Store());

      store.setBaseStatistics(StatisticMgt.makeMockedStatistics({ 'strength_+f': 10 }));
      expect(store.baseStatistics).toEqual(
         StatisticMgt.makeMockedStatistics({ 'strength_+f': 10 }),
      );
   });

   it('should set the base statistics points', () => {
      const store = new CharacterStore(new Store());

      store.setBaseStatisticsPoints(5);
      expect(store.baseStatisticsPoints).toBe(5);
   });
});
