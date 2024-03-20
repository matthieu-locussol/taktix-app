import { Statistics } from '../types/Statistic';
import { WeaponDamages, WeaponType } from '../types/Weapon';
import { ArrayMgt } from '../utils/arrayMgt';
import { LevelMgt } from '../utils/levelMgt';
import { NumberMgt } from '../utils/numberMgt';
import { StatisticMgt } from '../utils/statisticMgt';

export class PvEFight {
   private static MAX_TURNS = 100;

   private parameters: PvEFightParameters;

   private fighters: PvEFighter[];

   private turns: PveFightTurn[];

   constructor(parameters: PvEFightParameters) {
      this.parameters = parameters;

      this.fighters = this.initializeFighters();
      this.turns = [];
   }

   public run(): PvEFightResults {
      while (!this.isDone() && this.turns.length < PvEFight.MAX_TURNS) {
         const turn = this.computeTurn();
         this.turns.push(turn);
      }

      return this.getResults();
   }

   private computeTurn(): PveFightTurn {
      const moves: PveFightMove[] = ArrayMgt.filterNullish(
         this.fighters.map((fighter) => this.computeMove(fighter)),
      );

      const fighters = this.fighters.map(({ id, health, magicShield, type }) => ({
         id,
         health,
         magicShield,
         type,
      }));

      return { fighters, moves };
   }

   private computeMove(fighter: PvEFighter): PveFightMove | null {
      const target = this.getRandomAliveTarget(fighter);
      if (target === null) {
         return null;
      }

      const damages = this.computeDamages(fighter, target);
      const totalDamages = damages.reduce((acc, { value }) => acc + value, 0);

      const damagesAoE = this.computeDamagesAoE(fighter, target);
      // TODO: apply damagesAoE

      const damagesOnShield = Math.min(totalDamages, target.magicShield);
      const damagesOnHealth = Math.min(totalDamages - damagesOnShield, target.health);

      target.magicShield -= damagesOnShield;
      target.health -= damagesOnHealth;

      return { fighterId: fighter.id, targetId: target.id, damages, damagesAoE };
   }

   private computeDamages(
      fighter: PvEFighter,
      target: PvEFighter,
   ): { type: string; value: number }[] {
      return fighter.weaponDamages.map(({ type, min, max }) => ({
         type,
         value:
            StatisticMgt.computeDamages(
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
            ) +
            {
               strength: target.statistics.earthDamages,
               dexterity: target.statistics.windDamages,
               intelligence: target.statistics.fireDamages,
               luck: target.statistics.iceDamages,
            }[type],
      }));
   }

   private computeDamagesAoE(
      _fighter: PvEFighter,
      _target: PvEFighter,
   ): { type: string; value: number; targetId: number }[] {
      return [];
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
         allies: this.getAllies().map(({ id, type, health, magicShield, level, experience }) => ({
            id,
            type,
            health,
            magicShield,
            level,
            experience,
         })),
         monsters: this.getMonsters().map(({ id, type, health, magicShield, level }) => ({
            id,
            type,
            health,
            magicShield,
            level,
         })),
         experiences: this.getExperiences(),
         loots: this.getLoots(),
         won: this.hasWon(),
         turns: this.turns,
      };
   }

   private initializeFighters(): PvEFighter[] {
      const allies: PvEFighter[] = this.parameters.alliesInformations.map((infos, idx) => ({
         ...infos,
         id: idx + 1,
         type: 'ally',
         statistics: StatisticMgt.computeRealStatistics(infos.rawStatistics),
      }));

      const monsters: PvEFighter[] = this.parameters.monstersInformations.map((infos, idx) => ({
         ...infos,
         id: allies.length + idx + 1,
         type: 'monster',
         statistics: StatisticMgt.computeRealStatistics(infos.rawStatistics),
      }));

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
}

export interface PvEFightParameters {
   alliesInformations: PvEFighterInformations[];
   monstersInformations: PvEFighterInformations[];
}

export interface PvEFightResults {
   allies: PvEAllySimplified[];
   monsters: PvEMonsterSimplified[];
   turns: PveFightTurn[];
   experiences: number[];
   loots: unknown[][];
   won: boolean;
}

interface PvEFighterInformations {
   health: number;
   magicShield: number;

   level: number;
   experience: number;

   weaponType: WeaponType;
   weaponDamages: WeaponDamages[];
   rawStatistics: Statistics;

   // TODO: talents & items powers from uniques
   talents: unknown[];
   uniquesPowers: unknown[];
}

interface PvEFighter extends PvEFighterInformations {
   id: number;
   type: 'ally' | 'monster';
   statistics: ReturnType<typeof StatisticMgt.computeRealStatistics>;
}

type PvEFighterSimplified = Pick<PvEFighter, 'id' | 'type' | 'health' | 'magicShield'>;
type PvEAllySimplified = Pick<
   PvEFighter,
   'id' | 'type' | 'health' | 'magicShield' | 'level' | 'experience'
>;
type PvEMonsterSimplified = Pick<PvEFighter, 'id' | 'type' | 'health' | 'magicShield' | 'level'>;

interface PveFightMove {
   fighterId: number;
   targetId: number;
   damages: {
      type: string;
      value: number;
   }[];
   damagesAoE: {
      type: string;
      value: number;
      targetId: number;
   }[];
}

interface PveFightTurn {
   fighters: PvEFighterSimplified[];
   moves: PveFightMove[];
}
