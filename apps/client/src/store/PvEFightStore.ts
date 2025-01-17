import type { CharacterSprite } from 'shared/src/data/charactersSprites';
import type { MonsterSprite } from 'shared/src/data/monstersSprites';
import type { AnimationFile } from 'shared/src/types/Animation';
import type { PvEFightResults, PvEFighterSimplified } from 'shared/src/types/PvEFight';
import type { Store } from './Store';

import { makeAutoObservable } from 'mobx';
import { STATISTICS_POINTS_PER_LEVEL, TALENTS_POINTS_PER_LEVEL } from 'shared/src/config';
import { weaponsAnimations } from 'shared/src/data/animations';
import { charactersSprites } from 'shared/src/data/charactersSprites';
import { isMonsterName, monsters } from 'shared/src/data/monsters';
import { monstersSprites } from 'shared/src/data/monstersSprites';
import { ANIMATION_TO_FILE, Animation } from 'shared/src/types/Animation';
import { _assert, _assertTrue } from 'shared/src/utils/_assert';
import { ArrayMgt } from 'shared/src/utils/arrayMgt';
import { LevelMgt } from 'shared/src/utils/levelMgt';

type PvEFightMode = 'fight' | 'spectate';

export class PvEFightStore {
   private _fightResults: PvEFightResults | null = null;

   private _store: Store;

   fightOngoing = false;

   currentTurn = 1;

   currentFighter = 1;

   mode: PvEFightMode = 'fight';

   isFightResultsMenuOpened = false;

   fightersHealth: Record<number, number> = {};

   fightersMagicShield: Record<number, number> = {};

   startTimestamp: number = Date.now();

   alliesMoney: Record<string, number> = {};

   constructor(store: Store) {
      makeAutoObservable(this);

      this._store = store;
   }

   public setFightResults(fightResults: PvEFightResults): void {
      this._fightResults = fightResults;
      this.isFightResultsMenuOpened = false;
   }

   public setAlliesMoney(alliesMoney: Record<string, number>): void {
      this.alliesMoney = alliesMoney;
   }

   public startFight(): void {
      this.fightOngoing = true;
      this.startTimestamp = Date.now();
      this._store.discordStore.updateDiscordRichPresence();
   }

   public endFight(): void {
      this.fightOngoing = false;
      this._store.discordStore.updateDiscordRichPresence();

      this.checkLevelUp();

      const allyInfosIdx = this.fightResults.allies.findIndex(
         ({ name }) => name === this._store.characterStore.name,
      );

      _assertTrue(allyInfosIdx !== -1, 'Ally infos should be defined');

      const allyInfos = this.fightResults.allies[allyInfosIdx];
      const experienceGained = this.fightResults.experiences[allyInfosIdx];

      const oldLevel = LevelMgt.getLevel(this._store.characterStore.experience - experienceGained);
      const newLevel = LevelMgt.getLevel(this._store.characterStore.experience);

      if (newLevel > oldLevel) {
         this._store.characterStore.setCurrentHealth(this._store.characterStore.maxHealth);
      } else {
         this._store.characterStore.setCurrentHealth(Math.max(1, allyInfos.health));
      }

      const moneyEarned = this.alliesMoney[this._store.characterStore.name] ?? 0;

      this._store.characterStore.setMoney(this._store.characterStore.money + moneyEarned);
   }

   public setCurrentTurn(currentTurn: number): void {
      this.currentTurn = currentTurn;
   }

   public setCurrentFighter(currentFighter: number): void {
      this.currentFighter = currentFighter;
   }

   public setMode(mode: PvEFightMode): void {
      this.mode = mode;
   }

   public openFightResults(): void {
      this.isFightResultsMenuOpened = true;
   }

   public closeFightResults(): void {
      this.isFightResultsMenuOpened = false;
      this._store.soundsStore.play('check');
   }

   public setFighterHealth(fighterId: number, health: number): void {
      this.fightersHealth[fighterId] = health;
   }

   public setFighterMagicShield(fighterId: number, magicShield: number): void {
      this.fightersMagicShield[fighterId] = magicShield;
   }

   public checkLevelUp() {
      const { characterStore, statisticsMenuStore, talentsMenuStore } = this._store;
      const { name, experience, baseStatisticsPoints, talentsPoints } = characterStore;

      const allyIdx = this.fightResults.allies.findIndex((ally) => ally.name === name);
      const experienceGained = this.fightResults.experiences[allyIdx];
      const newExperience = experience + experienceGained;

      const levelGained = LevelMgt.computeGainedLevels(experience, newExperience);
      const baseStatisticsPointsGained = levelGained * STATISTICS_POINTS_PER_LEVEL;
      const talentsPointsGained = levelGained * TALENTS_POINTS_PER_LEVEL;

      characterStore.setExperience(newExperience);
      characterStore.setBaseStatisticsPoints(baseStatisticsPoints + baseStatisticsPointsGained);
      characterStore.setTalentsPoints(talentsPoints + talentsPointsGained);

      statisticsMenuStore.setStatisticsPoints(baseStatisticsPoints + baseStatisticsPointsGained);
      talentsMenuStore.setTalentsPoints(talentsPoints + talentsPointsGained);
   }

   public get fightersOrder(): (PvEFighterSimplified & {
      name: string;
      spritesheet: CharacterSprite | MonsterSprite;
   })[] {
      if (this._fightResults === null) {
         return [];
      }

      const names = this.fightResults.turns[0].fighters.map((fighter) => {
         if (fighter.type === 'ally') {
            const ally = this.fightResults.allies.find((ally) => ally.id === fighter.id);

            return ally?.name ?? 'Unknown';
         }

         const monster = this.fightResults.monsters.find((monster) => monster.id === fighter.id);

         return monster?.name ?? 'Unknown';
      });

      const spritesheets = this.fightResults.turns[0].fighters.map((fighter) => {
         if (fighter.type === 'ally') {
            const ally = this.fightResults.allies.find((ally) => ally.id === fighter.id);

            return ally?.spritesheet ?? charactersSprites[0];
         }

         const monster = this.fightResults.monsters.find((monster) => monster.id === fighter.id);

         return monster?.spritesheet ?? monstersSprites[0];
      });

      return this.fightResults.turns[0].fighters.map((fighter, index) => ({
         ...fighter,
         name: names[index],
         spritesheet: spritesheets[index],
      }));
   }

   public get fightResults(): PvEFightResults {
      _assert(this._fightResults, 'fightResults should be defined');

      return this._fightResults;
   }

   public get initialConditions(): Record<number, PvEFightResults['initialConditions'][number]> {
      return this.fightResults.initialConditions.reduce(
         (acc, { fighterId, health, magicShield, maxHealth, maxMagicShield }) => ({
            ...acc,
            [fighterId]: { health, magicShield, maxHealth, maxMagicShield },
         }),
         {},
      );
   }

   public get uniqueMonstersNames(): string[] {
      return ArrayMgt.makeUnique(this.fightResults.monsters.map(({ name }) => name));
   }

   public get uniqueAnimations(): Animation[] {
      const monstersAnimations = this.fightResults.monsters.map(({ name }) => {
         if (isMonsterName(name)) {
            return monsters[name]()({ level: 1 }).animation;
         }

         throw new Error('Monster name should be defined');
      });

      const alliesAnimations = this.fightResults.allies.map(() => {
         return Animation.Explosion;
      });

      return ArrayMgt.makeUnique([...monstersAnimations, ...alliesAnimations]);
   }

   public get uniqueAnimationFiles(): AnimationFile[] {
      return this.uniqueAnimations.map((animation) => ANIMATION_TO_FILE[animation]);
   }

   public get animationByFighterId(): Record<number, Animation> {
      const monstersAnimations = this.fightResults.monsters.reduce((acc, { id, name }) => {
         if (isMonsterName(name)) {
            return {
               ...acc,
               [id]: monsters[name]()({ level: 1 }).animation,
            };
         }

         throw new Error('Monster name should be defined');
      }, {});

      const alliesAnimations = this.fightResults.allies.reduce(
         (acc, { id, weaponDamages }) => ({
            ...acc,
            [id]:
               weaponDamages.length > 0
                  ? weaponsAnimations[weaponDamages[0].weaponType]
                  : weaponsAnimations.sword1H,
         }),
         {},
      );

      return { ...monstersAnimations, ...alliesAnimations };
   }
}
