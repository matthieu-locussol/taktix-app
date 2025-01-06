import { StatisticMgt } from 'shared/src/utils/statisticMgt';
import { describe, expect, it, vi } from 'vitest';

import { StatisticsMenuStore } from './StatisticsMenuStore';
import { Store } from './Store';

vi.mock('./Store', () => {
   const characterStoreMock = {
      baseStatistics: {
         'vitality_+f': 1,
         'magicShield_+f': 2,
         'strength_+f': 3,
         'dexterity_+f': 4,
         'intelligence_+f': 5,
         'luck_+f': 6,
      },
      baseStatisticsPoints: 7,
      setBaseStatistics: vi.fn(),
      setBaseStatisticsPoints: vi.fn(),
   };

   const colyseusStoreMock = {
      updateStatistics: vi.fn(),
   };

   const soundsStoreMock = {
      play: () => ({}),
   };

   const MockedStore = vi.fn().mockImplementation(() => ({
      characterStore: characterStoreMock,
      colyseusStore: colyseusStoreMock,
      soundsStore: soundsStoreMock,
   }));

   return { Store: MockedStore };
});

describe('StatisticsMenuStore', () => {
   it('should be initialized', () => {
      const store = new StatisticsMenuStore(new Store());

      expect(store).toBeDefined();
      expect(store.isOpened).toBe(false);
      expect(store.vitality).toBe(0);
      expect(store.magicShield).toBe(0);
      expect(store.strength).toBe(0);
      expect(store.dexterity).toBe(0);
      expect(store.intelligence).toBe(0);
      expect(store.luck).toBe(0);
      expect(store.statisticsPoints).toBe(0);
   });

   it('should open', () => {
      const store = new StatisticsMenuStore(new Store());

      store.open();
      expect(store.isOpened).toBe(true);
   });

   it('should close', () => {
      const store = new StatisticsMenuStore(new Store());

      store.open();
      store.close();

      expect(store.isOpened).toBe(false);
      expect(store.vitality).toBe(1);
      expect(store.magicShield).toBe(2);
      expect(store.strength).toBe(3);
      expect(store.dexterity).toBe(4);
      expect(store.intelligence).toBe(5);
      expect(store.luck).toBe(6);
      expect(store.statisticsPoints).toBe(7);
   });

   it('should toggle', () => {
      const store = new StatisticsMenuStore(new Store());

      store.toggle();
      expect(store.isOpened).toBe(true);

      store.toggle();
      expect(store.isOpened).toBe(false);
   });

   it('should increase a stat', () => {
      const store = new StatisticsMenuStore(new Store());

      store.increase('vitality');
      expect(store.vitality).toBe(0);
      expect(store.statisticsPoints).toBe(0);

      store.setStatisticsPoints(1);
      store.increase('vitality');
      expect(store.vitality).toBe(1);
      expect(store.statisticsPoints).toBe(0);
   });

   it('should decrease a stat', () => {
      const store = new StatisticsMenuStore(new Store());

      store.decrease('vitality');
      expect(store.vitality).toBe(0);
      expect(store.statisticsPoints).toBe(0);

      store.setStatisticsPoints(1);
      store.decrease('vitality');
      expect(store.vitality).toBe(0);
      expect(store.statisticsPoints).toBe(1);

      store.increase('vitality');
      store.increase('vitality');
      expect(store.vitality).toBe(1);
      expect(store.statisticsPoints).toBe(0);

      store.decrease('vitality');
      expect(store.vitality).toBe(0);
      expect(store.statisticsPoints).toBe(1);
   });

   it('should set statistics points', () => {
      const store = new StatisticsMenuStore(new Store());

      store.setStatisticsPoints(5);
      expect(store.statisticsPoints).toBe(5);
   });

   it('should set statistics', () => {
      const store = new StatisticsMenuStore(new Store());

      store.setStatistics(
         StatisticMgt.makeMockedStatistics({
            'vitality_+f': 1,
            'magicShield_+f': 2,
            'strength_+f': 3,
            'dexterity_+f': 4,
            'intelligence_+f': 5,
            'luck_+f': 6,
         }),
      );

      expect(store.vitality).toBe(1);
      expect(store.magicShield).toBe(2);
      expect(store.strength).toBe(3);
      expect(store.dexterity).toBe(4);
      expect(store.intelligence).toBe(5);
      expect(store.luck).toBe(6);
   });

   it('should compute canIncrease', () => {
      const store = new StatisticsMenuStore(new Store());

      store.setStatisticsPoints(0);
      expect(store.canIncrease).toBe(false);

      store.setStatisticsPoints(1);
      expect(store.canIncrease).toBe(true);
   });

   it('should compute canDecrease', () => {
      const store = new StatisticsMenuStore(new Store());

      store.setStatisticsPoints(0);
      expect(store.canDecrease.vitality).toBe(false);

      store.setStatisticsPoints(1);
      expect(store.canDecrease.vitality).toBe(false);

      store.increase('vitality');
      expect(store.canDecrease.vitality).toBe(true);

      store.decrease('vitality');
      expect(store.canDecrease.vitality).toBe(false);
   });

   it('should compute canSave', () => {
      const store = new StatisticsMenuStore(new Store());

      expect(store.canSave).toBe(true);

      store.setStatistics(
         StatisticMgt.makeMockedStatistics({
            'vitality_+f': 1,
            'magicShield_+f': 2,
            'strength_+f': 3,
            'dexterity_+f': 4,
            'intelligence_+f': 5,
            'luck_+f': 6,
         }),
      );
      store.setStatisticsPoints(7);
   });

   it('should toggle advanced', () => {
      const store = new StatisticsMenuStore(new Store());

      store.toggleAdvanced();
      expect(store.showAdvanced).toBe(true);

      store.toggleAdvanced();
      expect(store.showAdvanced).toBe(false);
   });
});
