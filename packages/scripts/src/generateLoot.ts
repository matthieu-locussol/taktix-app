import { LootMgt, NumberMgt, monsters } from 'shared';

const AREA_BONUS = 100;
const MONSTER_NAME = 'enemy-green-slime';
const MONSTER_TYPE = 'common';
const MONSTER_LEVEL = 2;
const PROSPECT = 40;

const DECIMALS = 4;

const generateLoot = () => {
   const PROBABILITIES: string[] = [];

   console.time('Generation time');

   for (let i = 0; i <= 1000; i++) {
      const commonProbability = LootMgt.computeLootProbability({
         areaBonus: AREA_BONUS,
         monsterName: MONSTER_NAME,
         monsterLevel: MONSTER_LEVEL,
         monsterType: MONSTER_TYPE,
         prospect: i,
         rarity: 'common',
      });

      const uncommonProbability = LootMgt.computeLootProbability({
         areaBonus: AREA_BONUS,
         monsterName: MONSTER_NAME,
         monsterLevel: MONSTER_LEVEL,
         monsterType: MONSTER_TYPE,
         prospect: i,
         rarity: 'uncommon',
      });

      const rareProbability = LootMgt.computeLootProbability({
         areaBonus: AREA_BONUS,
         monsterName: MONSTER_NAME,
         monsterLevel: MONSTER_LEVEL,
         monsterType: MONSTER_TYPE,
         prospect: i,
         rarity: 'rare',
      });

      const epicProbability = LootMgt.computeLootProbability({
         areaBonus: AREA_BONUS,
         monsterName: MONSTER_NAME,
         monsterLevel: MONSTER_LEVEL,
         monsterType: MONSTER_TYPE,
         prospect: i,
         rarity: 'epic',
      });

      const uniqueProbability = LootMgt.computeLootProbability({
         areaBonus: AREA_BONUS,
         monsterName: MONSTER_NAME,
         monsterLevel: MONSTER_LEVEL,
         monsterType: MONSTER_TYPE,
         prospect: i,
         rarity: 'unique',
      });

      PROBABILITIES.push(
         [
            i.toString(),
            `${(uniqueProbability * 100).toFixed(DECIMALS)}%`,
            `${(epicProbability * 100).toFixed(DECIMALS)}%`,
            `${(rareProbability * 100).toFixed(DECIMALS)}%`,
            `${(uncommonProbability * 100).toFixed(DECIMALS)}%`,
            `${(commonProbability * 100).toFixed(DECIMALS)}%`,
         ].join('   '),
      );
   }

   console.log(JSON.stringify(PROBABILITIES, null, 3));
   console.timeEnd('Generation time');

   const monstersCount = NumberMgt.random(1, 3);
   const generatedMonsters = Array.from({ length: monstersCount }).map(() =>
      monsters['enemy-green-slime']()({ level: NumberMgt.random(1, 3) }),
   );
   const loots = LootMgt.computeMonstersLoot({
      areaBonus: AREA_BONUS,
      monsters: generatedMonsters,
      prospect: PROSPECT,
   });

   console.log(
      JSON.stringify(
         {
            monstersCount,
            generatedMonsters: generatedMonsters.map((monster) => monster.type),
            loots,
         },
         null,
         3,
      ),
   );
};

generateLoot();
