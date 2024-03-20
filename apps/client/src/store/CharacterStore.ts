import type { Position } from 'grid-engine';
import { makeAutoObservable } from 'mobx';
import { DEFAULT_CHARACTER_STATISTICS } from 'shared/src/config';
import { LEVEL_TO_EXPERIENCE } from 'shared/src/data/levels';
import { levelUpStatistics } from 'shared/src/data/professions';
import { Player } from 'shared/src/types/Player';
import { ProfessionType } from 'shared/src/types/Profession';
import { Room } from 'shared/src/types/Room';
import { Statistics } from 'shared/src/types/Statistic';
import { LevelMgt } from 'shared/src/utils/levelMgt';
import { StatisticMgt } from 'shared/src/utils/statisticMgt';

export class CharacterStore {
   public map: Room = 'AAA_InitialRoom';

   public name: string = '';

   public profession: ProfessionType = ProfessionType.Warrior;

   public position: Position = { x: 0, y: 0 };

   public players: Player[] = [];

   public talents: number[] = [];

   public talentsPoints: number = 0;

   public baseStatistics: Statistics = StatisticMgt.makeMockedStatistics({});

   public baseStatisticsPoints: number = 0;

   public experience: number = 0;

   public currentHealth: number = 35;

   constructor() {
      makeAutoObservable(this);
   }

   public setMap(map: Room) {
      this.map = map;
   }

   public setName(name: string) {
      this.name = name;
   }

   public setProfession(profession: ProfessionType) {
      this.profession = profession;
   }

   public setPosition(position: Position) {
      this.position = position;
   }

   public setPositionX(x: number) {
      this.position.x = x;
   }

   public setPositionY(y: number) {
      this.position.y = y;
   }

   public setPlayers(players: Player[]) {
      this.players = players;
   }

   public setTalents(talents: number[]) {
      this.talents = [...talents];
   }

   public setTalentsPoints(talentsPoints: number) {
      this.talentsPoints = talentsPoints;
   }

   public setBaseStatistics(baseStatistics: Statistics) {
      this.baseStatistics = { ...baseStatistics };
   }

   public setBaseStatisticsPoints(baseStatisticsPoints: number) {
      this.baseStatisticsPoints = baseStatisticsPoints;
   }

   public setExperience(experience: number) {
      this.experience = experience;
   }

   public setCurrentHealth(currentHealth: number) {
      this.currentHealth = currentHealth;
   }

   public get healthPercentage() {
      return (this.currentHealth / this.maxHealth) * 100;
   }

   public get maxHealth() {
      return StatisticMgt.computeVitality(this.statistics);
   }

   public get experiencePercentage() {
      return (this.experience / this.maxExperience) * 100;
   }

   public get maxExperience() {
      return LEVEL_TO_EXPERIENCE[this.level + 1];
   }

   public get level() {
      return LevelMgt.getLevel(this.experience);
   }

   public get statistics(): Statistics {
      // TODO: Accumulate every stats from items & talents
      // return StatisticMgt.mergeStatistics(...[this.baseStatistics, ...this.talents.map((talent) => StatisticMgt.getTalentStatistics(talent.statistic)), ...this.items.map((item) => StatisticMgt.getItemStatistics(item.statistics))]);
      return StatisticMgt.mergeStatistics(
         this.baseStatistics,
         DEFAULT_CHARACTER_STATISTICS,
         ...new Array(this.level - 1).fill(levelUpStatistics[this.profession]),
      );
   }
}
