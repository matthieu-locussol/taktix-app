import { PvEFightParameters } from '../types/PvEFight';
import { WeaponType } from '../types/Weapon';
import { StatisticMgt } from '../utils/statisticMgt';

export const getMonstersInformations = (
   monsterGroupId: number,
): PvEFightParameters['monstersInformations'] => {
   if (monsterGroupId === 1) {
      return [
         {
            name: 'Character 1',
            health: 50,
            magicShield: 0,
            level: 1,
            experience: 50,
            weaponType: WeaponType.Axe1H,
            weaponDamages: [{ type: 'strength', min: 1, max: 2 }],
            rawStatistics: StatisticMgt.serializeStatistics(
               StatisticMgt.makeMockedStatistics({
                  'strength_+f': 10,
               }),
            ),
            talents: [],
            uniquesPowers: [],
         },
         {
            name: 'Character 2',
            health: 10,
            magicShield: 0,
            level: 1,
            experience: 5,
            weaponType: WeaponType.Axe1H,
            weaponDamages: [{ type: 'dexterity', min: 2, max: 4 }],
            rawStatistics: StatisticMgt.serializeStatistics(
               StatisticMgt.makeMockedStatistics({
                  'dexterity_+f': 10,
               }),
            ),
            talents: [],
            uniquesPowers: [],
         },
         {
            name: 'Character 3',
            health: 30,
            magicShield: 0,
            level: 1,
            experience: 5,
            weaponType: WeaponType.Axe1H,
            weaponDamages: [{ type: 'strength', min: 1, max: 2 }],
            rawStatistics: StatisticMgt.serializeStatistics(
               StatisticMgt.makeMockedStatistics({
                  'strength_+f': 10,
               }),
            ),
            talents: [],
            uniquesPowers: [],
         },
      ];
   }

   throw new Error(`Unknown monsterGroupId: '${monsterGroupId}'`);
};
