import { animationFilesData, animationsData } from 'shared/src/data/animations';
import { ANIMATION_TO_FILE } from 'shared/src/types/Animation';
import { CharacterSpritesheet, ProfessionType } from 'shared/src/types/Profession';
import { PvEFightMove } from 'shared/src/types/PvEFight';
import { Room } from 'shared/src/types/Room';
import { Position } from 'shared/src/types/SceneData';
import { WeaponDamagesType } from 'shared/src/types/Weapon';
import { _assert, _assertTrue } from 'shared/src/utils/_assert';
import { NumberMgt } from 'shared/src/utils/numberMgt';
import { TimeMgt } from 'shared/src/utils/timeMgt';
import { store } from '../../store';
import { STATS_COLORS } from '../../styles/appTheme';
import {
   CHARACTER_HEIGHT,
   CHARACTER_WIDTH,
   FADE_IN_DURATION,
   FADE_OUT_DURATION,
   SCALE_FACTOR,
} from '../Scene';

const HEALTH_MARGIN = 10;
const HEALTH_HEIGHT = 8;
const HEALTH_WIDTH = 80;
const MAGICSHIELD_MARGIN = 4 + HEALTH_HEIGHT + HEALTH_MARGIN;
const MAGICSHIELD_HEIGHT = 8;
const MAGICSHIELD_WIDTH = 80;

export class PvEFightScene extends Phaser.Scene {
   private fighters: Record<number, Phaser.GameObjects.Container> = {};

   private animationRunning: boolean = false;

   private movesQueue: {
      move: PvEFightMove;
      turnId: number;
      moveId: number;
   }[] = [];

   constructor(_config: Room | Phaser.Types.Scenes.SettingsConfig) {
      super('PvEFightScene');
   }

   public preload(): void {
      this.load.audio('PvEFight', '/assets/musics/PvEFight.mp3');
      this.load.image('background', '/assets/fights/mountains/background.png');
      this.load.image('foreground-trees', '/assets/fights/mountains/foreground-trees.png');
      this.load.image('mountain-far', '/assets/fights/mountains/mountain-far.png');
      this.load.image('mountains', '/assets/fights/mountains/mountains.png');
      this.load.image('trees', '/assets/fights/mountains/trees.png');

      this.load.spritesheet('PlayerSpritesheet', '/assets/characters/characters.png', {
         frameWidth: CHARACTER_WIDTH,
         frameHeight: CHARACTER_HEIGHT,
      });

      store.pveFightStore.uniqueMonstersNames.forEach((name) => {
         this.load.spritesheet(name, `/assets/monsters/body/${name}.png`, {
            frameWidth: 32,
            frameHeight: 32,
         });
      });

      store.pveFightStore.uniqueAnimationFiles.forEach((animationFile) => {
         const { frameHeight, frameWidth, path, id } = animationFilesData[animationFile];
         this.load.spritesheet(id, path, { frameWidth, frameHeight });
      });
   }

   public create(): void {
      _assert(store.pveFightStore.fightResults, 'fightResults must be set!');

      this.sound.pauseAll();
      this.sound.play('PvEFight', { loop: true, volume: 0.5 });
      this.sound.pauseOnBlur = false;

      this.createTileSprite('background');
      this.createTileSprite('foreground-trees');
      this.createTileSprite('mountain-far');
      this.createTileSprite('mountains');
      this.createTileSprite('trees');

      for (const animation of store.pveFightStore.uniqueAnimations) {
         const { id: fileId, framesPerRow } = animationFilesData[ANIMATION_TO_FILE[animation]];
         const { id, frameRate, offset } = animationsData[animation];

         if (this.anims.get(id) === undefined) {
            this.anims.create({
               key: id,
               frames: this.anims.generateFrameNumbers(fileId, {
                  frames: new Array(framesPerRow)
                     .fill(0)
                     .map((_, idx) => offset * framesPerRow + idx),
               }),
               frameRate,
               repeat: 0,
            });
         }
      }

      this.sys.setVisible(store.loadingScreenStore.sceneVisible);
      this.fadeIn();

      this.initializeHandlers();
      this.initializeFight();

      window.setTimeout(() => {
         this.run();
      }, 1500);
   }

   public initializeFight(): void {
      const { initialConditions } = store.pveFightStore;
      const alliesCount = store.pveFightStore.fightResults.allies.length;
      const monstersCount = store.pveFightStore.fightResults.monsters.length;

      store.pveFightStore.fightResults.allies.forEach(({ profession, id }, idx) => {
         _assert(profession, 'profession must be set!');

         const playerSprite = this.add.sprite(0, 0, 'PlayerSpritesheet');
         playerSprite.anims.create({
            key: 'idle',
            frames: playerSprite.anims.generateFrameNumbers('PlayerSpritesheet', {
               frames: this.getAllyFrames(profession),
            }),
            frameRate: 4,
            repeat: -1,
         });
         playerSprite.setScale(SCALE_FACTOR);
         playerSprite.play('idle');
         playerSprite.setName('sprite');

         const container = this.add.container(0, 0, [playerSprite]);
         container.setPosition(
            this.getAllyPosition(playerSprite, idx, alliesCount).x,
            this.getAllyPosition(playerSprite, idx, alliesCount).y,
         );
         this.fighters[id] = container;
         store.pveFightStore.setFighterHealth(id, initialConditions[id].health);
         store.pveFightStore.setFighterMagicShield(id, initialConditions[id].magicShield);

         this.createFighterHealthBar(id);
         this.createFighterMagicShieldBar(id);
         this.updateFighterHealthBar(id);
         this.updateFighterMagicShieldBar(id);
      });

      store.pveFightStore.fightResults.monsters.forEach(({ id, name }, idx) => {
         const monsterSprite = this.add.sprite(0, 0, name);
         monsterSprite.anims.create({
            key: 'idle',
            frames: monsterSprite.anims.generateFrameNumbers(name, {
               frames: [0, 1, 2, 3, 4, 5, 6, 7],
            }),
            frameRate: 8,
            repeat: -1,
         });
         monsterSprite.setScale(SCALE_FACTOR * 2);
         monsterSprite.play('idle');
         monsterSprite.setName('sprite');

         const container = this.add.container(0, 0, [monsterSprite]);
         container.setPosition(
            this.getMonsterPosition(monsterSprite, idx, monstersCount).x,
            this.getMonsterPosition(monsterSprite, idx, monstersCount).y,
         );
         this.fighters[id] = container;
         store.pveFightStore.setFighterHealth(id, initialConditions[id].health);
         store.pveFightStore.setFighterMagicShield(id, initialConditions[id].magicShield);

         this.createFighterHealthBar(id);
         this.createFighterMagicShieldBar(id);
         this.updateFighterHealthBar(id);
         this.updateFighterMagicShieldBar(id);
      });
   }

   public async run(): Promise<void> {
      store.pveFightStore.startFight();
      const { turns } = store.pveFightStore.fightResults;

      for (let idx = 0; idx < turns.length; idx++) {
         const { moves } = turns[idx];

         for (let moveIdx = 0; moveIdx < moves.length; moveIdx++) {
            const move = moves[moveIdx];
            this.movesQueue.push({
               move,
               turnId: idx,
               moveId: moveIdx,
            });
         }
      }

      while (this.movesQueue.length > 0) {
         const move = this.movesQueue.shift();
         _assert(move, 'move must be set');
         await this.executeMove(move.move, move.turnId, move.moveId);
      }
   }

   public async stop(): Promise<void> {
      await TimeMgt.wait(1000 / store.settingsMenuStore.speedFactor);

      this.animationRunning = false;

      for (const container of Object.values(this.fighters)) {
         if (container.active) {
            const sprite = container.getByName('sprite') as Phaser.GameObjects.Sprite;

            if (sprite.active) {
               sprite.anims.stop();
            }
         }
      }

      await TimeMgt.wait(1000 / store.settingsMenuStore.speedFactor);
      store.pveFightStore.openFightResults();

      this.fadeOut(async (_, progress) => {
         if (progress === 1) {
            store.pveFightStore.endFight();
            this.scene.resume(store.characterStore.map);
            this.scene.stop(this.scene.key);

            store.colyseusStore.stopFighting();

            await TimeMgt.wait(300);
            store.gameStore.currentScene.fadeIn();
         }
      });
   }

   public async executeMove(move: PvEFightMove, turnId: number, moveId: number): Promise<void> {
      const { fighters } = store.pveFightStore.fightResults.turns[turnId];
      const targetShouldDie = fighters.find(({ id }) => id === move.targetId)?.health === 0;

      if (this.animationRunning) {
         await TimeMgt.wait(200 / store.settingsMenuStore.speedFactor);
         return this.executeMove(move, turnId, moveId);
      }

      store.pveFightStore.setCurrentFighter(move.fighterId);
      this.attackPhysical(move, targetShouldDie);
      this.stopOnLastMove(turnId, moveId);
      store.pveFightStore.setCurrentTurn(turnId + 1);
   }

   private createFighterHealthBar(fighterId: number): void {
      const container = this.fighters[fighterId];
      const fighterSprite = container.getByName('sprite') as Phaser.GameObjects.Sprite;

      const healthBgSprite = this.add.graphics();
      healthBgSprite.fillStyle(0x111827, 0.3);
      healthBgSprite.fillRoundedRect(
         fighterSprite.x - 40,
         fighterSprite.y - HEALTH_HEIGHT - CHARACTER_HEIGHT / 2 - HEALTH_MARGIN,
         HEALTH_WIDTH,
         HEALTH_HEIGHT,
         4,
      );
      healthBgSprite.lineStyle(2, 0x111827, 1);
      healthBgSprite.strokeRoundedRect(
         fighterSprite.x - 40,
         fighterSprite.y - HEALTH_HEIGHT - CHARACTER_HEIGHT / 2 - HEALTH_MARGIN,
         HEALTH_WIDTH,
         HEALTH_HEIGHT,
         4,
      );
      healthBgSprite.setDepth(1);
      healthBgSprite.setName('healthBg');

      const healthSprite = this.add.graphics();
      healthSprite.fillStyle(NumberMgt.hexStringToNumber(STATS_COLORS.vitality));
      healthSprite.fillRoundedRect(
         fighterSprite.x - 40 + 1,
         fighterSprite.y - HEALTH_HEIGHT - CHARACTER_HEIGHT / 2 - HEALTH_MARGIN + 1,
         HEALTH_WIDTH - 2,
         HEALTH_HEIGHT - 2,
         4,
      );
      healthSprite.setDepth(2);
      healthSprite.setName('health');

      container.add(healthBgSprite);
      container.add(healthSprite);
   }

   private createFighterMagicShieldBar(fighterId: number): void {
      const container = this.fighters[fighterId];
      const fighterSprite = container.getByName('sprite') as Phaser.GameObjects.Sprite;

      const magicShieldBgSprite = this.add.graphics();
      magicShieldBgSprite.fillStyle(0x111827, 0.3);
      magicShieldBgSprite.fillRoundedRect(
         fighterSprite.x - 40,
         fighterSprite.y - MAGICSHIELD_HEIGHT - CHARACTER_HEIGHT / 2 - MAGICSHIELD_MARGIN,
         MAGICSHIELD_WIDTH,
         MAGICSHIELD_HEIGHT,
         4,
      );
      magicShieldBgSprite.lineStyle(2, 0x111827, 1);
      magicShieldBgSprite.strokeRoundedRect(
         fighterSprite.x - 40,
         fighterSprite.y - MAGICSHIELD_HEIGHT - CHARACTER_HEIGHT / 2 - MAGICSHIELD_MARGIN,
         MAGICSHIELD_WIDTH,
         MAGICSHIELD_HEIGHT,
         4,
      );
      magicShieldBgSprite.setDepth(1);
      magicShieldBgSprite.setName('magicShieldBg');

      const magicShieldSprite = this.add.graphics();
      magicShieldSprite.fillStyle(NumberMgt.hexStringToNumber(STATS_COLORS.magicShield));
      magicShieldSprite.fillRoundedRect(
         fighterSprite.x - 40 + 1,
         fighterSprite.y - MAGICSHIELD_HEIGHT - CHARACTER_HEIGHT / 2 - MAGICSHIELD_MARGIN + 1,
         MAGICSHIELD_WIDTH - 2,
         MAGICSHIELD_HEIGHT - 2,
         4,
      );
      magicShieldSprite.setDepth(2);
      magicShieldSprite.setName('magicShield');

      container.add(magicShieldBgSprite);
      container.add(magicShieldSprite);
   }

   private updateFighterHealthBar(fighterId: number): void {
      const container = this.fighters[fighterId];
      const healthSprite = container.getByName('health') as Phaser.GameObjects.Graphics;
      const healthBgSprite = container.getByName('healthBg') as Phaser.GameObjects.Graphics;

      if (healthSprite !== null && healthBgSprite !== null) {
         const { maxHealth } = store.pveFightStore.initialConditions[fighterId];
         const health = store.pveFightStore.fightersHealth[fighterId];

         healthSprite.setScale(health / maxHealth, 1);
         const emptySpace = HEALTH_WIDTH - (health / maxHealth) * HEALTH_WIDTH;
         healthSprite.setX(healthBgSprite.x - emptySpace / 2);
      }
   }

   private updateFighterMagicShieldBar(fighterId: number): void {
      const container = this.fighters[fighterId];
      const magicShieldSprite = container.getByName('magicShield') as Phaser.GameObjects.Graphics;
      const magicShieldBgSprite = container.getByName(
         'magicShieldBg',
      ) as Phaser.GameObjects.Graphics;

      if (magicShieldSprite !== null && magicShieldBgSprite !== null) {
         const { maxMagicShield } = store.pveFightStore.initialConditions[fighterId];
         const magicShield = store.pveFightStore.fightersMagicShield[fighterId];

         magicShieldSprite.setScale(magicShield / maxMagicShield, 1);
         const emptySpace = MAGICSHIELD_WIDTH - (magicShield / maxMagicShield) * MAGICSHIELD_WIDTH;
         magicShieldSprite.setX(magicShieldBgSprite.x - emptySpace / 2);
      }
   }

   private stopOnLastMove(turnId: number, moveId: number): void {
      if (turnId === store.pveFightStore.fightResults.turns.length - 1) {
         if (moveId === store.pveFightStore.fightResults.turns[turnId].moves.length - 1) {
            this.stop();
         }
      }
   }

   private getAllyPosition(
      sprite: Phaser.GameObjects.Sprite,
      allyIdx: number,
      alliesCount: number,
   ): Position {
      const { width, height } = this.sys.cameras.main;
      const { width: allyWidth, height: allyHeight } = sprite;

      if (alliesCount === 1) {
         _assertTrue(allyIdx === 0, 'allyIdx must be 0');

         return {
            x: width / 8 - allyWidth / 2,
            y: height / 2 - allyHeight / 2 - allyHeight,
         };
      }

      if (alliesCount === 2) {
         _assertTrue(allyIdx === 0 || allyIdx === 1, 'allyIdx must be 0 or 1');

         return {
            0: { x: width / 8 - allyWidth / 2, y: height / 2 - allyHeight / 2 - 3 * allyHeight },
            1: { x: width / 8 - allyWidth / 2, y: height / 2 - allyHeight / 2 + 1 * allyHeight },
         }[allyIdx];
      }

      if (alliesCount === 3) {
         _assertTrue(allyIdx === 0 || allyIdx === 1 || allyIdx === 2, 'allyIdx must be 0, 1 or 2');

         return {
            0: { x: width / 8 - allyWidth / 2, y: height / 2 - allyHeight / 2 - 5 * allyHeight },
            1: { x: width / 6 - allyWidth / 2, y: height / 2 - allyHeight / 2 - 1 * allyHeight },
            2: { x: width / 8 - allyWidth / 2, y: height / 2 - allyHeight / 2 + 3 * allyHeight },
         }[allyIdx];
      }

      _assertTrue(alliesCount === 4, 'alliesCount must be 4');
      _assertTrue(
         allyIdx === 0 || allyIdx === 1 || allyIdx === 2 || allyIdx === 3,
         'allyIdx must be 0, 1, 2 or 3',
      );

      return {
         0: { x: width / 8 - allyWidth / 2, y: height / 2 - allyHeight / 2 - 7 * allyHeight },
         1: { x: width / 6 - allyWidth / 2, y: height / 2 - allyHeight / 2 - 3 * allyHeight },
         2: { x: width / 6 - allyWidth / 2, y: height / 2 - allyHeight / 2 + 1 * allyHeight },
         3: { x: width / 8 - allyWidth / 2, y: height / 2 - allyHeight / 2 + 5 * allyHeight },
      }[allyIdx];
   }

   private getAllyFrames(profession: ProfessionType): number[] {
      return [
         Math.floor(CharacterSpritesheet[profession] / 4) * 36 +
            CharacterSpritesheet[profession] * 3 +
            4 * 3 * 2,
         Math.floor(CharacterSpritesheet[profession] / 4) * 36 +
            CharacterSpritesheet[profession] * 3 +
            4 * 3 * 2 +
            1,
         Math.floor(CharacterSpritesheet[profession] / 4) * 36 +
            CharacterSpritesheet[profession] * 3 +
            4 * 3 * 2 +
            2,
         Math.floor(CharacterSpritesheet[profession] / 4) * 36 +
            CharacterSpritesheet[profession] * 3 +
            4 * 3 * 2 +
            1,
      ];
   }

   private getMonsterPosition(
      sprite: Phaser.GameObjects.Sprite,
      monsterIdx: number,
      monstersCount: number,
   ): Position {
      const { width, height } = this.sys.cameras.main;
      const { width: monsterWidth, height: monsterHeight } = sprite;

      if (monstersCount === 1) {
         _assertTrue(monsterIdx === 0, 'monsterIdx must be 0');

         return {
            x: (7 * width) / 8 - monsterWidth / 2,
            y: height / 2 - monsterHeight / 2 - monsterHeight,
         };
      }

      if (monstersCount === 2) {
         _assertTrue(monsterIdx === 0 || monsterIdx === 1, 'monsterIdx must be 0 or 1');

         return {
            0: {
               x: (7 * width) / 8 - monsterWidth / 2,
               y: height / 2 - monsterHeight / 2 - 3 * monsterHeight,
            },
            1: {
               x: (7 * width) / 8 - monsterWidth / 2,
               y: height / 2 - monsterHeight / 2 + 1 * monsterHeight,
            },
         }[monsterIdx];
      }

      if (monstersCount === 3) {
         _assertTrue(
            monsterIdx === 0 || monsterIdx === 1 || monsterIdx === 2,
            'monsterIdx must be 0, 1 or 2',
         );

         return {
            0: {
               x: (7 * width) / 8 - monsterWidth / 2,
               y: height / 2 - monsterHeight / 2 - 5 * monsterHeight,
            },
            1: {
               x: (5 * width) / 6 - monsterWidth / 2,
               y: height / 2 - monsterHeight / 2 - 1 * monsterHeight,
            },
            2: {
               x: (7 * width) / 8 - monsterWidth / 2,
               y: height / 2 - monsterHeight / 2 + 3 * monsterHeight,
            },
         }[monsterIdx];
      }

      _assertTrue(monstersCount === 4, 'monstersCount must be 4');
      _assertTrue(
         monsterIdx === 0 || monsterIdx === 1 || monsterIdx === 2 || monsterIdx === 3,
         'monsterIdx must be 0, 1, 2 or 3',
      );

      return {
         0: {
            x: (7 * width) / 8 - monsterWidth / 2,
            y: height / 2 - monsterHeight / 2 - 7 * monsterHeight,
         },
         1: {
            x: (5 * width) / 6 - monsterWidth / 2,
            y: height / 2 - monsterHeight / 2 - 3 * monsterHeight,
         },
         2: {
            x: (5 * width) / 6 - monsterWidth / 2,
            y: height / 2 - monsterHeight / 2 + 1 * monsterHeight,
         },
         3: {
            x: (7 * width) / 8 - monsterWidth / 2,
            y: height / 2 - monsterHeight / 2 + 5 * monsterHeight,
         },
      }[monsterIdx];
   }

   private attackPhysical(
      { fighterId, targetId, damages, hasDodged }: PvEFightMove,
      targetShouldDie: boolean,
   ): void {
      this.animationRunning = true;

      const fighter =
         store.pveFightStore.fightResults.allies.find(({ id }) => id === fighterId) ||
         store.pveFightStore.fightResults.monsters.find(({ id }) => id === fighterId);
      const target =
         store.pveFightStore.fightResults.monsters.find(({ id }) => id === targetId) ||
         store.pveFightStore.fightResults.allies.find(({ id }) => id === targetId);

      _assert(fighter, 'fighter must be set');
      _assert(target, 'target must be set');

      const fighterContainer = this.fighters[fighterId];
      const targetContainer = this.fighters[targetId];

      const initialPositionX = fighterContainer.x;
      const initialPositionY = fighterContainer.y;

      const xFactor =
         targetContainer.x > fighterContainer.x
            ? -4 * fighterContainer.width
            : 4 * fighterContainer.width;

      const highestDamagesType = damages.reduce<{ type: WeaponDamagesType; value: number }>(
         (acc, { type, value }) => {
            if (value > acc.value) {
               return { type, value };
            }

            return acc;
         },
         { type: 'intelligence', value: 0 },
      ).type;

      const animationId = store.pveFightStore.animationByFighterId[fighterId];
      const animationFileId = ANIMATION_TO_FILE[animationId];
      const { scale } = animationsData[animationId];

      const chain = this.tweens.chain({
         targets: fighterContainer,
         tweens: [
            {
               x: targetContainer.x + xFactor,
               y: targetContainer.y,
               duration: 500 / store.settingsMenuStore.speedFactor,
               ease: 'Power2',
               yoyo: true,
               repeat: 0,
               onYoyo: () => {
                  if (hasDodged) {
                     return;
                  }

                  const hitAnimation = this.add
                     .sprite(targetContainer.x, targetContainer.y, animationFileId)
                     .setTint(NumberMgt.hexStringToNumber(STATS_COLORS[highestDamagesType]))
                     .setAlpha(0.8)
                     .setScale(
                        (targetContainer.scaleX * scale) / 2,
                        (targetContainer.scaleY * scale) / 2,
                     );
                  hitAnimation.postFX.addGlow(0x111827, 16, 0, false, 1, 10);
                  hitAnimation.play(animationId);
                  hitAnimation.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                     hitAnimation.destroy();
                  });

                  this.displayDamages(damages, targetContainer);

                  if (targetShouldDie) {
                     this.kill(targetId);
                  }
               },
               onComplete: () => {
                  if (hasDodged) {
                     const dodgeAnimation = this.tweens.add({
                        targets: [targetContainer],
                        x: targetContainer.x + (targetContainer.x > fighterContainer.x ? 20 : -20),
                        duration: 150 / store.settingsMenuStore.speedFactor,
                        ease: 'Power2',
                        yoyo: true,
                        repeat: 0,
                        onComplete: () => {
                           dodgeAnimation.destroy();
                        },
                     });
                     dodgeAnimation.play();
                     this.displayDodge(targetContainer);
                     return;
                  }

                  const totalDamages = damages.reduce((acc, { value }) => acc + value, 0);

                  const damagesOnShield = Math.min(
                     totalDamages,
                     store.pveFightStore.fightersMagicShield[targetId],
                  );
                  const damagesOnHealth = Math.min(
                     totalDamages - damagesOnShield,
                     store.pveFightStore.fightersHealth[targetId],
                  );

                  store.pveFightStore.setFighterMagicShield(
                     targetId,
                     store.pveFightStore.fightersMagicShield[targetId] - damagesOnShield,
                  );
                  store.pveFightStore.setFighterHealth(
                     targetId,
                     store.pveFightStore.fightersHealth[targetId] - damagesOnHealth,
                  );

                  this.updateFighterHealthBar(targetId);
                  this.updateFighterMagicShieldBar(targetId);
               },
            },
            {
               x: initialPositionX,
               y: initialPositionY,
               duration: 750 / store.settingsMenuStore.speedFactor,
               ease: 'Power2',
               yoyo: false,
               repeat: 0,
            },
         ],
         onComplete: () => {
            this.animationRunning = false;
            chain.destroy();
         },
      });

      chain.play();
   }

   private displayDamages(
      damages: PvEFightMove['damages'],
      targetSprite: Phaser.GameObjects.Container,
   ): void {
      const damagesSprites = damages.map(({ value, type, isCriticalStrike }) => {
         const sprite = this.add
            .text(
               targetSprite.x,
               targetSprite.y - 20,
               `-${value}${isCriticalStrike ? ' !!' : ''}`,
               {
                  fontFamily: 'Orbitron',
                  fontSize: 24,
                  color: STATS_COLORS[type],
               },
            )
            .setOrigin(0.5, 0.5)
            .setAlpha(0)
            .setDepth(1)
            .setScale(0.5, 0.5);
         sprite.postFX.addGlow(isCriticalStrike ? 0xfbbf24 : 0x111827, 4, 0, false, 0.3, 10);
         return sprite;
      });

      damagesSprites.forEach((sprite, idx) => {
         this.tweens.add({
            targets: sprite,
            alpha: 1,
            y: targetSprite.y * 0.7,
            duration: 750 / store.settingsMenuStore.speedFactor,
            ease: 'Power2',
            repeat: 0,
            scaleX: 1.25,
            scaleY: 1.25,
            delay: (idx * 300) / store.settingsMenuStore.speedFactor,
            onComplete: () => {
               this.tweens.add({
                  targets: sprite,
                  alpha: 0,
                  duration: 400 / store.settingsMenuStore.speedFactor,
                  ease: 'Power2',
                  repeat: 0,
                  onComplete: () => {
                     sprite.destroy();
                  },
               });
            },
         });
      });
   }

   private displayDodge(targetSprite: Phaser.GameObjects.Container): void {
      const dodgeSprite = this.add
         .text(targetSprite.x, targetSprite.y - 20, 'Dodged!', {
            fontFamily: 'Orbitron',
            fontSize: 18,
         })
         .setOrigin(0.5, 0.5)
         .setAlpha(0)
         .setDepth(1)
         .setScale(0.5, 0.5);

      this.tweens.add({
         targets: dodgeSprite,
         alpha: 1,
         y: targetSprite.y * 0.7,
         duration: 750 / store.settingsMenuStore.speedFactor,
         ease: 'Power2',
         repeat: 0,
         scaleX: 1.25,
         scaleY: 1.25,
         delay: 300 / store.settingsMenuStore.speedFactor,
         onComplete: () => {
            this.tweens.add({
               targets: dodgeSprite,
               alpha: 0,
               duration: 400 / store.settingsMenuStore.speedFactor,
               ease: 'Power2',
               repeat: 0,
               onComplete: () => {
                  dodgeSprite.destroy();
               },
            });
         },
      });
   }

   private kill(fighterId: number): void {
      const enemySprite = this.fighters[fighterId];

      const tween = this.tweens.add({
         targets: enemySprite,
         alpha: 0,
         duration: 500 / store.settingsMenuStore.speedFactor,
         ease: 'Power2',
         repeat: 0,
         onComplete: () => {
            enemySprite.destroy();
            tween.destroy();
         },
      });
   }

   private createTileSprite(texture: string): Phaser.GameObjects.TileSprite {
      const { width, height } = this.sys.cameras.main;
      const sprite = this.add.tileSprite(0, 0, width / 3.75, height / 5, texture).setOrigin(0);

      sprite.setScale(
         width / sprite.width,
         height / (sprite.height + this.getHeightOffset() / 4.25),
      );

      return sprite;
   }

   private getHeightOffset(): number {
      const gameLayoutBoxHeight = document.getElementById('game-layout-box')?.offsetHeight ?? 0;
      return gameLayoutBoxHeight - 8;
   }

   private initializeHandlers(): void {
      this.scale.on(Phaser.Scale.Events.ENTER_FULLSCREEN, () => {
         store.settingsMenuStore.setFullScreen(true);
      });

      this.scale.on(Phaser.Scale.Events.LEAVE_FULLSCREEN, () => {
         store.settingsMenuStore.setFullScreen(false);
      });
   }

   public fadeIn(): void {
      this.cameras.main.fadeIn(FADE_IN_DURATION, 31, 41, 55).setRoundPixels(true);
   }

   public fadeOut(callback: (_: unknown, progress: number) => void): void {
      this.cameras.main.fade(FADE_OUT_DURATION, 31, 41, 55, false, callback);

      this.sound.stopByKey('PvEFight');
      this.sound.resumeAll();
      this.sound.pauseOnBlur = false;
   }

   public getRoomType(): 'map' | 'fight' {
      return 'fight';
   }
}
