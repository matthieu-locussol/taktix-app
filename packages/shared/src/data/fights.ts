import { PvEFightParameters } from '../types/PvEFight';
import { WeaponType } from '../types/Weapon';
import { StatisticMgt } from '../utils/statisticMgt';

export const getMonstersInformations = (
   monsterGroupId: number,
): PvEFightParameters['monstersInformations'] => {
   if (monsterGroupId === 1) {
      return [
         {
            health: 90,
            magicShield: 150,
            level: 5,
            experience: 200,
            weaponType: WeaponType.Mace2H,
            weaponDamages: [
               { type: 'strength', min: 3, max: 5 },
               { type: 'strength', min: 2, max: 4 },
            ],
            rawStatistics: StatisticMgt.serializeStatistics(
               StatisticMgt.makeMockedStatistics({
                  'vitality_+f': 600,
                  'strength_+f': 240,
               }),
            ),
            talents: [],
            uniquesPowers: [],
         },
      ];
   }

   throw new Error(`Unknown monsterGroupId: '${monsterGroupId}'`);
};
