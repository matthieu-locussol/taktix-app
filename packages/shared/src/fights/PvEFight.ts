import {
   PvEFightMove,
   PvEFightParameters,
   PvEFightResults,
   PvEFightTurn,
   PvEFighter,
   PvEInitialConditions,
} from '../types/PvEFight';
import { WeaponDamagesType } from '../types/Weapon';
import { _assert, _assertTrue } from '../utils/_assert';
import { ArrayMgt } from '../utils/arrayMgt';
import { LevelMgt } from '../utils/levelMgt';
import { NumberMgt } from '../utils/numberMgt';
import { StatisticMgt } from '../utils/statisticMgt';

export class PvEFight {
   private static MAX_TURNS = 100;

   private parameters: PvEFightParameters;

   private fighters: PvEFighter[];

   private turns: PvEFightTurn[];

   private initialConditions: PvEInitialConditions;

   constructor(parameters: PvEFightParameters) {
      this.parameters = parameters;

      this.fighters = this.initializeFighters();
      this.initialConditions = this.initializeInitialConditions();
      this.turns = [];
   }

   public run(): PvEFightResults {
      while (!this.isDone() && this.turns.length < PvEFight.MAX_TURNS) {
         const turn = this.computeTurn();
         this.turns.push(turn);
      }

      return this.getResults();
   }

   private computeTurn(): PvEFightTurn {
      const moves: PvEFightMove[] = ArrayMgt.filterNullish(
         this.fighters.map((fighter) => {
            if (fighter.health <= 0) {
               return null;
            }

            return this.computeMove(fighter);
         }),
      );

      const fighters = this.fighters.map(({ id, health, magicShield, type }) => ({
         id,
         health,
         magicShield,
         type,
      }));

      return { fighters, moves };
   }

   private computeMove(fighter: PvEFighter): PvEFightMove | null {
      const target = this.getRandomAliveTarget(fighter);
      if (target === null) {
         return null;
      }

      const hasDodged = this.computeHasDodged(fighter, target);
      if (hasDodged) {
         return {
            fighterId: fighter.id,
            targetId: target.id,
            damages: [],
            damagesAoE: [],
            hasDodged,
            lifeStolen: 0,
            magicalThornsDamages: 0,
            physicalThornsDamages: 0,
         };
      }

      const fighterInfos = this.initialConditions.find(({ fighterId }) => fighterId === fighter.id);
      _assert(fighterInfos, 'fighterInfos should be defined!');
      const { maxHealth } = fighterInfos;

      const damages = this.computeDamages(fighter, target);
      const totalDamages = damages.reduce((acc, { value }) => acc + value, 0);
      const lifeStolen = this.computeLifeStolen(totalDamages, maxHealth, fighter, target);

      const damagesOnShield = Math.min(totalDamages, target.magicShield);
      const damagesOnHealth = Math.min(totalDamages - damagesOnShield, target.health);
      const { magicalThornsDamages, physicalThornsDamages } = this.computeThornsDamages(
         damagesOnShield,
         damagesOnHealth,
         target,
      );
      const totalThornsDamages = magicalThornsDamages + physicalThornsDamages;

      target.magicShield -= damagesOnShield;
      target.health -= damagesOnHealth;

      const thornsDamagesOnShield = Math.min(totalThornsDamages, fighter.magicShield);
      const thornsDamagesOnHealth = Math.min(
         totalThornsDamages - thornsDamagesOnShield,
         fighter.health,
      );
      fighter.magicShield -= thornsDamagesOnShield;
      fighter.health = Math.max(0, fighter.health - thornsDamagesOnHealth);
      fighter.health = Math.min(maxHealth, fighter.health + lifeStolen);

      // TODO: apply damagesAoE
      const damagesAoE = this.computeDamagesAoE(fighter, target);

      return {
         fighterId: fighter.id,
         targetId: target.id,
         damages,
         damagesAoE,
         hasDodged,
         lifeStolen,
         magicalThornsDamages,
         physicalThornsDamages,
      };
   }

   private computeDamages(
      fighter: PvEFighter,
      target: PvEFighter,
   ): {
      type: WeaponDamagesType;
      value: number;
      isCriticalStrike: boolean;
   }[] {
      return fighter.weaponDamages.map(({ type, min, max }) => {
         const { finalDamages, isCriticalStrike } = StatisticMgt.computeDamages(
            min,
            max,
            fighter.statistics[`${fighter.weaponType}Damages`],
            fighter.statistics[type],
            {
               strength: target.statistics.earthResistance,
               dexterity: target.statistics.windResistance,
               intelligence: target.statistics.fireResistance,
               luck: target.statistics.iceResistance,
            }[type],
            {
               strength: target.statistics.earthResistancePercent,
               dexterity: target.statistics.windResistancePercent,
               intelligence: target.statistics.fireResistancePercent,
               luck: target.statistics.iceResistancePercent,
            }[type],
            fighter.statistics.criticalStrikeChance,
            fighter.statistics.criticalStrikeChancePercent,
            fighter.statistics.criticalStrikeDamages,
            target.statistics.criticalStrikeResistance,
         );

         return {
            type,
            value:
               finalDamages +
               {
                  strength: fighter.statistics.earthDamages,
                  dexterity: fighter.statistics.windDamages,
                  intelligence: fighter.statistics.fireDamages,
                  luck: fighter.statistics.iceDamages,
               }[type],
            isCriticalStrike,
         };
      });
   }

   private computeDamagesAoE(
      _fighter: PvEFighter,
      _target: PvEFighter,
   ): { type: string; value: number; targetId: number }[] {
      return [];
   }

   private computeThornsDamages(
      damagesOnShield: number,
      damagesOnHealth: number,
      target: PvEFighter,
   ) {
      const { thornsMagical, thornsPhysical } = target.statistics;

      return {
         physicalThornsDamages: Math.floor(damagesOnHealth * thornsPhysical),
         magicalThornsDamages: Math.floor(damagesOnShield * thornsMagical),
      };
   }

   private computeHasDodged(fighter: PvEFighter, target: PvEFighter): boolean {
      const hitChance = StatisticMgt.computeHitChance(
         fighter.statistics.precision,
         target.statistics.evasion,
      );

      return Math.random() > hitChance;
   }

   private computeLifeStolen(
      totalDamages: number,
      maxHealth: number,
      fighter: PvEFighter,
      target: PvEFighter,
   ): number {
      if (fighter.health === maxHealth) {
         return 0;
      }

      const missingLife = maxHealth - fighter.health;
      const lifeStolen = StatisticMgt.computeLifeStolen(
         totalDamages,
         fighter.statistics.lifeSteal,
         fighter.statistics.lifeStealPercent,
         target.health,
         target.magicShield,
      );

      const cappedLifeStolen = Math.min(missingLife, lifeStolen);
      if (cappedLifeStolen <= 0) {
         return 0;
      }

      return cappedLifeStolen;
   }

   private getRandomAliveTarget(fighter: PvEFighter): PvEFighter | null {
      const targets = fighter.type === 'ally' ? this.getMonsters() : this.getAllies();
      const aliveTargets = targets.filter((target) => target.health > 0);

      if (aliveTargets.length === 0) {
         return null;
      }

      return aliveTargets[NumberMgt.random(0, aliveTargets.length - 1)];
   }

   private getAllies(): PvEFighter[] {
      return this.fighters.filter((fighter) => fighter.type === 'ally');
   }

   private getMonsters(): PvEFighter[] {
      return this.fighters.filter((fighter) => fighter.type === 'monster');
   }

   private getAlliesHealth(): number {
      return this.getAllies().reduce((acc, ally) => acc + ally.health, 0);
   }

   private getMonstersHealth(): number {
      return this.getMonsters().reduce((acc, monster) => acc + monster.health, 0);
   }

   private isDone(): boolean {
      return this.getAlliesHealth() <= 0 || this.getMonstersHealth() <= 0;
   }

   private hasWon(): boolean {
      return this.getAlliesHealth() > 0;
   }

   private getExperiences(): number[] {
      return this.getAllies().map((ally) =>
         LevelMgt.computeExperienceGain(
            ally.level,
            this.getMonsters().map(({ level, experience }) => ({ level, experience })),
            this.getAllies().map(({ experience }) => ({ experience })),
            this.hasWon(),
         ),
      );
   }

   private getLoots(): unknown[][] {
      return this.getAllies().map(() => []);
   }

   private getResults(): PvEFightResults {
      return {
         initialConditions: this.initialConditions,
         allies: this.getAllies().map(
            ({
               id,
               name,
               monsterType,
               type,
               health,
               magicShield,
               level,
               experience,
               profession,
               weaponType,
            }) => ({
               id,
               name,
               type,
               monsterType,
               health,
               magicShield,
               level,
               experience,
               profession,
               weaponType,
            }),
         ),
         monsters: this.getMonsters().map(
            ({ id, name, monsterType, type, health, magicShield, level }) => ({
               id,
               name,
               monsterType,
               type,
               health,
               magicShield,
               level,
            }),
         ),
         experiences: this.getExperiences(),
         loots: this.getLoots(),
         won: this.hasWon(),
         turns: this.turns,
      };
   }

   private initializeFighters(): PvEFighter[] {
      const allies: PvEFighter[] = this.parameters.alliesInformations.map((infos, idx) => {
         _assert(infos.profession, 'profession should be defined!');

         return {
            ...infos,
            id: idx + 1,
            type: 'ally',
            statistics: StatisticMgt.computeRealStatistics(
               StatisticMgt.aggregateStatistics(
                  StatisticMgt.deserializeStatistics(infos.rawStatistics),
                  infos.experience,
                  infos.profession,
                  infos.talents,
               ),
            ),
         };
      });

      const monsters: PvEFighter[] = this.parameters.monstersInformations.map((infos, idx) => {
         _assertTrue(infos.profession === undefined, 'profession should not be defined!');

         return {
            ...infos,
            id: allies.length + idx + 1,
            type: 'monster',
            statistics: StatisticMgt.computeRealStatistics(
               StatisticMgt.deserializeStatistics(infos.rawStatistics),
            ),
         };
      });

      return this.orderFighters(allies, monsters);
   }

   private orderFighters(allies: PvEFighter[], monsters: PvEFighter[]): PvEFighter[] {
      const orderedAllies = this.orderFightersByInitiative(allies);
      const orderedMonsters = this.orderFightersByInitiative(monsters);

      if (orderedAllies[0].statistics.initiative > orderedMonsters[0].statistics.initiative) {
         return ArrayMgt.staggeredMerge(orderedAllies, orderedMonsters);
      }

      return ArrayMgt.staggeredMerge(orderedMonsters, orderedAllies);
   }

   private orderFightersByInitiative(fighters: PvEFighter[]): PvEFighter[] {
      return [...fighters].sort((a, b) => b.statistics.initiative - a.statistics.initiative);
   }

   private initializeInitialConditions(): PvEInitialConditions {
      return this.fighters.map(({ id, health, magicShield, statistics, type }) => {
         return {
            fighterId: id,
            health,
            magicShield,
            maxHealth: type === 'ally' ? statistics.vitality : health,
            maxMagicShield: magicShield,
         };
      });
   }
}
