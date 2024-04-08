import { CharacterSpritesheet, ProfessionType } from 'shared/src/types/Profession';
import { PvEFightMove } from 'shared/src/types/PvEFight';
import { Room } from 'shared/src/types/Room';
import { Position } from 'shared/src/types/SceneData';
import { _assert, _assertTrue } from 'shared/src/utils/_assert';
import { TimeMgt } from 'shared/src/utils/timeMgt';
import { store } from '../../store';
import {
   CHARACTER_HEIGHT,
   CHARACTER_WIDTH,
   FADE_IN_DURATION,
   FADE_OUT_DURATION,
   SCALE_FACTOR,
} from '../Scene';

const PARALLAX_FACTOR = 0.3;
const SPEED_FACTOR = 1.25;

const DAMAGES_COLORS = {
   strength: '#854d0e',
   dexterity: '#10b981',
   intelligence: '#ef4444',
   luck: '#06b6d4',
};

export class PvEFightScene extends Phaser.Scene {
   private background: Phaser.GameObjects.TileSprite | null = null;

   private foregroundTrees: Phaser.GameObjects.TileSprite | null = null;

   private mountainFar: Phaser.GameObjects.TileSprite | null = null;

   private mountains: Phaser.GameObjects.TileSprite | null = null;

   private trees: Phaser.GameObjects.TileSprite | null = null;

   private fighters: Record<number, Phaser.GameObjects.Sprite> = {};

   private animationRunning: boolean = false;

   private parallaxActive: boolean = true;

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

      this.load.spritesheet('MonsterSpritesheet', '/assets/monsters/golem.png', {
         frameWidth: 32,
         frameHeight: 32,
      });

      this.load.spritesheet('HitsSpritesheet', '/assets/animations/hits.png', {
         frameWidth: 64,
         frameHeight: 64,
      });
   }

   public create(): void {
      this.sound.pauseAll();
      this.sound.play('PvEFight', { loop: true, volume: 0.5 });
      this.sound.pauseOnBlur = false;

      this.background = this.createTileSprite('background');
      this.foregroundTrees = this.createTileSprite('foreground-trees');
      this.mountainFar = this.createTileSprite('mountain-far');
      this.mountains = this.createTileSprite('mountains');
      this.trees = this.createTileSprite('trees');

      // TODO: refactor animations in a separate file
      this.anims.create({
         key: 'physical',
         frames: this.anims.generateFrameNumbers('HitsSpritesheet', {
            frames: new Array(11).fill(0).map((_, idx) => 7 * 11 + idx),
         }),
         frameRate: 16,
         repeat: 0,
      });

      this.sys.setVisible(store.loadingScreenStore.sceneVisible);
      this.fadeIn();

      this.initializeHandlers();
      this.initializeFight();

      window.setTimeout(() => {
         this.run();
      }, 1500 / SPEED_FACTOR);
   }

   public initializeFight(): void {
      _assert(store.pveFightStore.fightResults, 'fightResults must be set!');
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
         this.fighters[id] = playerSprite;

         playerSprite.setPosition(
            this.getAllyPosition(playerSprite, idx, alliesCount).x,
            this.getAllyPosition(playerSprite, idx, alliesCount).y,
         );
      });

      store.pveFightStore.fightResults.monsters.forEach(({ id }, idx) => {
         const monsterSprite = this.add.sprite(0, 0, 'MonsterSpritesheet');
         monsterSprite.anims.create({
            key: 'idle',
            frames: monsterSprite.anims.generateFrameNumbers('MonsterSpritesheet', {
               frames: [0, 1, 2, 3, 4, 5, 6, 7],
            }),
            frameRate: 8,
            repeat: -1,
         });
         monsterSprite.setScale(SCALE_FACTOR * 2);
         monsterSprite.play('idle');
         this.fighters[id] = monsterSprite;

         monsterSprite.setPosition(
            this.getMonsterPosition(monsterSprite, idx, monstersCount).x,
            this.getMonsterPosition(monsterSprite, idx, monstersCount).y,
         );
      });
   }

   public run(): void {
      _assert(store.pveFightStore.fightResults, 'fightResults must be set!');
      const { turns } = store.pveFightStore.fightResults;

      turns.forEach(({ moves }, idx) => {
         moves.forEach(async (move, moveIdx) => {
            await TimeMgt.wait(200 / SPEED_FACTOR);
            await this.executeMove(move, idx, moveIdx);
         });
      });
   }

   public async stop(): Promise<void> {
      await TimeMgt.wait(1000 / SPEED_FACTOR);

      this.animationRunning = false;
      this.parallaxActive = false;

      for (const sprite of Object.values(this.fighters)) {
         if (sprite.active) {
            sprite.stop();
         }
      }

      await TimeMgt.wait(1000 / SPEED_FACTOR);
      store.pveFightStore.openFightResults();

      this.fadeOut(async (_, progress) => {
         if (progress === 1) {
            this.scene.resume(store.characterStore.map);
            this.scene.stop(this.scene.key);

            await TimeMgt.wait(300);
            store.gameStore.currentScene.fadeIn();
         }
      });
   }

   public async executeMove(move: PvEFightMove, turnId: number, moveId: number): Promise<void> {
      _assert(store.pveFightStore.fightResults, 'fightResults must be set!');
      const { fighters } = store.pveFightStore.fightResults.turns[turnId];
      const targetShouldDie = fighters.find(({ id }) => id === move.targetId)?.health === 0;

      if (this.animationRunning) {
         await TimeMgt.wait(200 / SPEED_FACTOR);
         this.executeMove(move, turnId, moveId);
      } else {
         this.attackPhysical(move, targetShouldDie);

         if (turnId === store.pveFightStore.fightResults.turns.length - 1) {
            if (moveId === store.pveFightStore.fightResults.turns[turnId].moves.length - 1) {
               this.stop();
            }
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
         Math.floor(CharacterSpritesheet[profession] / 4) * 48 +
            CharacterSpritesheet[profession] * 3 +
            4 * 3 * 1,
         Math.floor(CharacterSpritesheet[profession] / 4) * 48 +
            CharacterSpritesheet[profession] * 3 +
            4 * 3 * 1 +
            1,
         Math.floor(CharacterSpritesheet[profession] / 4) * 48 +
            CharacterSpritesheet[profession] * 3 +
            4 * 3 * 1 +
            2,
         Math.floor(CharacterSpritesheet[profession] / 4) * 48 +
            CharacterSpritesheet[profession] * 3 +
            4 * 3 * 1 +
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
      { fighterId, targetId, damages }: PvEFightMove,
      targetShouldDie: boolean,
   ): void {
      _assert(store.pveFightStore.fightResults, 'fightResults must be set!');

      const fighter =
         store.pveFightStore.fightResults.allies.find(({ id }) => id === fighterId) ||
         store.pveFightStore.fightResults.monsters.find(({ id }) => id === fighterId);
      const target =
         store.pveFightStore.fightResults.monsters.find(({ id }) => id === targetId) ||
         store.pveFightStore.fightResults.allies.find(({ id }) => id === targetId);

      _assert(fighter, 'fighter must be set');
      _assert(target, 'target must be set');

      const fighterSprite = this.fighters[fighterId];
      const targetSprite = this.fighters[targetId];

      const initialPositionX = fighterSprite.x;
      const initialPositionY = fighterSprite.y;

      const xFactor =
         targetSprite.x > fighterSprite.x ? -4 * fighterSprite.width : 4 * fighterSprite.width;

      const chain = this.tweens.chain({
         targets: fighterSprite,
         tweens: [
            {
               x: targetSprite.x + xFactor,
               y: targetSprite.y,
               duration: 500 / SPEED_FACTOR,
               ease: 'Power2',
               yoyo: true,
               repeat: 0,
               onYoyo: () => {
                  const hitAnimation = this.add
                     .sprite(targetSprite.x, targetSprite.y, 'HitsSpritesheet')
                     .setTint(0x10b981)
                     .setAlpha(0.8)
                     .setScale(targetSprite.scaleX / 2, targetSprite.scaleY / 2);
                  hitAnimation.postFX.addGlow(0x111827, 16, 0, false, 1, 10);
                  hitAnimation.play('physical');
                  hitAnimation.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                     hitAnimation.destroy();
                  });

                  this.displayDamages(damages, targetSprite);

                  if (targetShouldDie) {
                     this.kill(targetId);
                  }
               },
            },
            {
               x: initialPositionX,
               y: initialPositionY,
               duration: 750 / SPEED_FACTOR,
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

      this.animationRunning = true;
      chain.play();
   }

   private displayDamages(
      damages: PvEFightMove['damages'],
      targetSprite: Phaser.GameObjects.Sprite,
   ): void {
      const damagesSprites = damages.map(({ value, type }) => {
         const sprite = this.add
            .text(targetSprite.x, targetSprite.y - 20, `-${value}`, {
               fontFamily: 'Orbitron',
               fontSize: 24,
               color: DAMAGES_COLORS[type],
            })
            .setOrigin(0.5, 0.5)
            .setAlpha(0)
            .setDepth(1)
            .setScale(0.5, 0.5);
         sprite.postFX.addGlow(0x111827, 16, 0, false, 1, 10);
         return sprite;
      });

      damagesSprites.forEach((sprite, idx) => {
         this.tweens.add({
            targets: sprite,
            alpha: 1,
            y: targetSprite.y * 0.7,
            duration: 750 / SPEED_FACTOR,
            ease: 'Power2',
            repeat: 0,
            scaleX: 1.25,
            scaleY: 1.25,
            delay: (idx * 200) / SPEED_FACTOR,
            onComplete: () => {
               this.tweens.add({
                  targets: sprite,
                  alpha: 0,
                  duration: 300 / SPEED_FACTOR,
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

   private kill(fighterId: number): void {
      const enemySprite = this.fighters[fighterId];

      const tween = this.tweens.add({
         targets: enemySprite,
         alpha: 0,
         duration: 500 / SPEED_FACTOR,
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

   private adjustTileSpritePosition(tileSprite: Phaser.GameObjects.TileSprite): void {
      const { width, height } = this.sys.cameras.main;

      tileSprite.setScale(
         width / tileSprite.width,
         height / (tileSprite.height + this.getHeightOffset() / 4.25),
      );
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

   public override update(_time: number, _delta: number): void {
      if (this.parallaxActive) {
         _assert(this.background, 'background must be set');
         _assert(this.mountainFar, 'mountainFar must be set');
         _assert(this.mountains, 'mountains must be set');
         _assert(this.trees, 'trees must be set');
         _assert(this.foregroundTrees, 'foregroundTrees must be set');

         this.mountainFar.tilePositionX += (0.2 * PARALLAX_FACTOR) / SPEED_FACTOR;
         this.mountains.tilePositionX += (0.4 * PARALLAX_FACTOR) / SPEED_FACTOR;
         this.trees.tilePositionX += (0.8 * PARALLAX_FACTOR) / SPEED_FACTOR;
         this.foregroundTrees.tilePositionX += (1 * PARALLAX_FACTOR) / SPEED_FACTOR;

         this.adjustTileSpritePosition(this.background);
         this.adjustTileSpritePosition(this.mountainFar);
         this.adjustTileSpritePosition(this.mountains);
         this.adjustTileSpritePosition(this.trees);
         this.adjustTileSpritePosition(this.foregroundTrees);
      }
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
}
