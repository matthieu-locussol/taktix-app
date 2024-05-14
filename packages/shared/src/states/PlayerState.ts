import { Schema, type } from '@colyseus/schema';
import { STATISTICS_POINTS_PER_LEVEL, TALENTS_POINTS_PER_LEVEL } from '../config';
import { Item, ItemPosition } from '../types/Item';
import { ProfessionType, zProfessionType } from '../types/Profession';
import { Room } from '../types/Room';
import { RealStatistic, Statistic } from '../types/Statistic';
import { WeaponDamages, WeaponType, isWeaponType, zWeaponType } from '../types/Weapon';
import { LevelMgt } from '../utils/levelMgt';
import { StatisticMgt } from '../utils/statisticMgt';
import { StringMgt } from '../utils/stringMgt';
import { TalentMgt } from '../utils/talentMgt';

export interface PlayerStateConstructor {
   id: number;
   name: string;
   spritesheet: string;
   x: number;
   y: number;
   direction: string;
   profession: string;
   talents: string;
   talentsPoints: number;
   baseStatistics: string;
   baseStatisticsPoints: number;
   experience: number;
   health: number;
   teleporters: string;
   money: number;
   gachix: number;
   items: Item[];
}

export class PlayerState extends Schema {
   @type('string')
   name: string;

   @type('string')
   spritesheet: string;

   @type('number')
   x: number;

   @type('number')
   y: number;

   @type('string')
   direction: string;

   @type('boolean')
   isMoving = false;

   @type('boolean')
   isFight = false;

   fightTimestamp = 0;

   fightTurns = 0;

   id: number = 0;

   profession: ProfessionType = ProfessionType.Warrior;

   talents: number[] = [];

   talentsPoints: number = 0;

   baseStatistics: Partial<Record<Statistic, number>> = {
      'vitality_+f': 0,
      'magicShield_+f': 0,
      'strength_+f': 0,
      'dexterity_+f': 0,
      'intelligence_+f': 0,
      'luck_+f': 0,
   };

   baseStatisticsPoints = 0;

   experience = 0;

   health = 0;

   teleporters: Room[] = [];

   money = 0;

   gachix = 0;

   items: Item[] = [];

   itemsToRemove: number[] = [];

   constructor({
      id,
      name,
      spritesheet,
      x,
      y,
      direction,
      profession,
      talents,
      talentsPoints,
      baseStatistics,
      baseStatisticsPoints,
      experience,
      health,
      teleporters,
      money,
      gachix,
      items,
   }: PlayerStateConstructor) {
      super();

      this.id = id;
      this.name = name;
      this.spritesheet = spritesheet;
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.profession = zProfessionType.parse(profession);
      this.talents = TalentMgt.deserializeTalents(talents);
      this.talentsPoints = talentsPoints;
      this.baseStatistics = StatisticMgt.deserializeStatistics(baseStatistics);
      this.baseStatisticsPoints = baseStatisticsPoints;
      this.experience = experience;
      this.health = health;
      this.teleporters = StringMgt.deserializeTeleporters(teleporters);
      this.money = money;
      this.gachix = gachix;
      this.items = items;
   }

   move(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.isMoving = true;
   }

   stopMoving(direction: string, x: number, y: number) {
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.isMoving = false;
   }

   startFight() {
      this.isFight = true;
      this.fightTimestamp = Date.now();
      this.fightTurns = 0;
   }

   stopFight() {
      this.isFight = false;
   }

   setFightTurns(turns: number) {
      this.fightTurns = turns;
   }

   setTalents(talents: string) {
      this.talents = TalentMgt.deserializeTalents(talents);
   }

   setTalentsPoints(talentsPoints: number) {
      this.talentsPoints = talentsPoints;
   }

   setBaseStatistics(baseStatistics: string) {
      this.baseStatistics = StatisticMgt.deserializeStatistics(baseStatistics);
      const newRealStatistics = this.getRealStatistics();
      this.setHealth(Math.min(this.health, newRealStatistics.vitality));
   }

   setBaseStatisticsPoints(baseStatisticsPoints: number) {
      this.baseStatisticsPoints = baseStatisticsPoints;
   }

   setExperience(experience: number) {
      this.experience = experience;
   }

   addExperience(experienceGained: number) {
      const newLevel = LevelMgt.getLevel(this.experience + experienceGained);
      const oldLevel = LevelMgt.getLevel(this.experience);

      if (newLevel > oldLevel) {
         const levelsGained = newLevel - oldLevel;

         this.setHealthAtMax();
         this.setBaseStatisticsPoints(
            this.baseStatisticsPoints + levelsGained * STATISTICS_POINTS_PER_LEVEL,
         );
         this.setTalentsPoints(this.talentsPoints + levelsGained * TALENTS_POINTS_PER_LEVEL);
      }

      this.experience += experienceGained;
   }

   setHealth(health: number) {
      this.health = health;
   }

   setHealthAtMax() {
      this.health = this.getRealStatistics().vitality;
   }

   setMoney(money: number) {
      this.money = money;
   }

   addGachix(gachix: number) {
      this.gachix += gachix;
   }

   removeGachix(gachix: number) {
      this.gachix -= gachix;
   }

   addTeleporter(teleporter: Room) {
      this.teleporters.push(teleporter);
   }

   addItems(items: Item[]) {
      this.items = [...items, ...this.items];
   }

   removeItems(itemIds: number[]) {
      this.items = this.items.filter((item) => !itemIds.includes(item.id));
      this.itemsToRemove = [...itemIds, ...this.itemsToRemove];
   }

   equipItem(itemId: number) {
      const item = this.items.find((item) => item.id === itemId);

      if (item) {
         item.position = ItemPosition.Equipment;
      }
   }

   unequipItem(itemId: number) {
      const item = this.items.find((item) => item.id === itemId);

      if (item) {
         item.position = ItemPosition.Inventory;
      }
   }

   getEquippedItems() {
      return this.items.filter((item) => item.position === ItemPosition.Equipment);
   }

   getEquippedWeapon(): Item | undefined {
      const weapon = this.getEquippedItems().find((item) => isWeaponType(item.type));
      return weapon;
   }

   getEquippedWeaponType(): WeaponType | undefined {
      const weapon = this.getEquippedWeapon();
      if (weapon === undefined) {
         return undefined;
      }

      return zWeaponType.parse(weapon.type);
   }

   getEquippedWeaponDamages(): WeaponDamages[] {
      const weapons = this.getEquippedItems().filter((item) => isWeaponType(item.type));
      return weapons.flatMap((weapon) => weapon.damages);
   }

   getBaseStatistics(): Partial<Record<Statistic, number>> {
      return {
         'vitality_+f': this.baseStatistics['vitality_+f'],
         'magicShield_+f': this.baseStatistics['magicShield_+f'],
         'strength_+f': this.baseStatistics['strength_+f'],
         'dexterity_+f': this.baseStatistics['dexterity_+f'],
         'intelligence_+f': this.baseStatistics['intelligence_+f'],
         'luck_+f': this.baseStatistics['luck_+f'],
      };
   }

   getRealStatistics(): Record<RealStatistic, number> {
      return StatisticMgt.computeRealStatistics(
         StatisticMgt.aggregateStatistics(
            StatisticMgt.makeMockedStatistics(this.baseStatistics),
            this.experience,
            this.profession,
            this.talents,
            this.items,
         ),
      );
   }

   getLevel(): number {
      return LevelMgt.getLevel(this.experience);
   }
}
