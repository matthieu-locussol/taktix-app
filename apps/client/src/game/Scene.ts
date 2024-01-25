import {
   Direction,
   GridEngine,
   NoPathFoundStrategy,
   PathBlockedStrategy,
   Position,
} from 'grid-engine';
import { INTERNAL_PLAYER_NAME } from 'shared/src/types/Player';
import { Room } from 'shared/src/types/Room';
import { SceneData } from 'shared/src/types/SceneData';
import { store } from '../store';
import { makeLight } from './lights/makeLight';

export const TILE_SIZE = 16;
export const SCALE_FACTOR = 3;
export const PLAYER_LAYER = 'player';

interface IScene extends Phaser.Scene {
   gridEngine: GridEngine;
}

export abstract class Scene extends Phaser.Scene {
   public tilemap: Phaser.Tilemaps.Tilemap | null = null;

   public gridEngine: GridEngine;

   public entrancePosition: Position = { x: 0, y: 0 };

   public entranceDirection: Direction = Direction.DOWN;

   public playersSprites = new Map<string, Phaser.GameObjects.Container>();

   public movingX = false;

   public nextMovesX: { name: string; x: number }[] = [];

   public movingY = false;

   public nextMovesY: { name: string; y: number }[] = [];

   constructor(config: Room | Phaser.Types.Scenes.SettingsConfig, sceneData?: SceneData) {
      super(config);
      this.gridEngine = (this as unknown as IScene).gridEngine;

      if (sceneData !== undefined) {
         this.init(sceneData);
      }
   }

   public setEntrancePosition(position: Position): void {
      this.entrancePosition = position;
   }

   public setEntranceDirection(direction: Direction): void {
      this.entranceDirection = direction;
   }

   public init({ entrancePosition, entranceDirection }: SceneData): void {
      if (entrancePosition !== undefined) {
         this.setEntrancePosition(entrancePosition);
      }

      if (entranceDirection !== undefined) {
         this.setEntranceDirection(entranceDirection);
      }
   }

   public preload(): void {
      const { loadingScreenStore } = store;

      this.load.on('start', () => {
         loadingScreenStore.setLoadingAssets(true);
      });

      this.load.on('progress', (value: number) => {
         loadingScreenStore.setProgress(value);
      });

      this.load.on('fileprogress', (file: Phaser.Loader.File) => {
         loadingScreenStore.setCurrentAssetPath(file.src);
      });

      this.load.on('complete', () => {
         loadingScreenStore.setLoadingAssets(false);
      });

      this.loadAssets();
   }

   public abstract loadAssets(): void;

   public create(): void {
      this.sys.setVisible(store.loadingScreenStore.sceneVisible);
      this.cameras.main.fadeIn(1000, 31, 41, 55);

      const tilemap = this.createTilemap();
      this.gridEngine.create(tilemap, { characters: [] });
      this.createPlayer(store.characterStore.name);

      this.lights.enable();
      this.lights.setAmbientColor(0xd8d8d8);
      this.lights.addLight(0, 0, 128).setColor(0xffffff).setIntensity(1.0);

      this.input.on(Phaser.Input.Events.POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {
         if (pointer.leftButtonReleased()) {
            this.handlePointerDown(pointer);
         }
      });
   }

   public handlePointerDown(pointer: Phaser.Input.Pointer): void {
      const pointerPosition = pointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;
      const pointerWorldPosition: Position = {
         x: Math.floor(pointerPosition.x / (TILE_SIZE * SCALE_FACTOR)),
         y: Math.floor(pointerPosition.y / (TILE_SIZE * SCALE_FACTOR)),
      };

      this.gridEngine.moveTo(INTERNAL_PLAYER_NAME, pointerWorldPosition, {
         algorithm: 'A_STAR',
         noPathFoundStrategy: NoPathFoundStrategy.STOP,
         pathBlockedStrategy: PathBlockedStrategy.STOP,
      });

      if (this.sys.isVisible()) {
         store.colyseusStore.movePlayer(pointerWorldPosition.x, pointerWorldPosition.y);
      }
   }

   public createPlayer(nickname: string): void {
      const playerSprite = this.add.sprite(0, 0, PLAYER_LAYER);
      playerSprite.setDepth(3);
      playerSprite.scale = SCALE_FACTOR;
      playerSprite.setPipeline('Light2D');

      const offsetX = (78 - nickname.length * 10) / 2;
      const playerName = this.add.text(offsetX, -8, nickname, { align: 'center' });
      const playerContainer = this.add.container(0, 0, [playerName, playerSprite]);

      this.gridEngine.addCharacter({
         id: INTERNAL_PLAYER_NAME,
         sprite: playerSprite,
         walkingAnimationMapping: 6,
         startPosition: this.entrancePosition,
         charLayer: PLAYER_LAYER,
         container: playerContainer,
      });

      this.cameras.main.startFollow(playerContainer, true);
      this.cameras.main.setFollowOffset(-playerContainer.width, -playerContainer.height);
      this.gridEngine.turnTowards(INTERNAL_PLAYER_NAME, this.entranceDirection);
   }

   public abstract createTilemap(): Phaser.Tilemaps.Tilemap;

   public initializeTilemap(tilesets: string[]) {
      if (this.tilemap === null) {
         return;
      }

      for (let i = 0; i < this.tilemap.layers.length; i += 1) {
         const layer = this.tilemap.createLayer(i, tilesets, 0, 0);

         if (layer !== null) {
            layer.setDepth(i);
            layer.scale = SCALE_FACTOR;
            layer.setPipeline('Light2D');
         }
      }

      const lightsLayer = this.tilemap.getObjectLayer('Lights');
      if (lightsLayer !== null) {
         for (const object of lightsLayer.objects) {
            makeLight(this, object);
         }
      }
   }

   public override update(time: number, delta: number): void {
      this.gridEngine.update(time, delta);
   }

   public addExternalPlayer(name: string, position: Position): void {
      if (this.gridEngine.getAllCharacters().find((playerName) => playerName === name)) {
         return;
      }

      const externalPlayerSprite = this.add.sprite(0, 0, PLAYER_LAYER);
      externalPlayerSprite.setDepth(3);
      externalPlayerSprite.setPipeline('Light2D');
      externalPlayerSprite.scale = SCALE_FACTOR;

      const offsetX = (78 - name.length * 10) / 2;
      const externalPlayerName = this.add.text(offsetX, -8, name, {
         align: 'center',
      });
      const externalPlayerContainer = this.add.container(0, 0, [
         externalPlayerName,
         externalPlayerSprite,
      ]);

      this.gridEngine.addCharacter({
         id: name,
         sprite: externalPlayerSprite,
         walkingAnimationMapping: 0,
         startPosition: position,
         charLayer: PLAYER_LAYER,
         container: externalPlayerContainer,
      });

      this.playersSprites.set(name, externalPlayerContainer);
   }

   public deleteExternalPlayer(name: string): void {
      try {
         this.gridEngine.removeCharacter(name);
      } catch (e) {
         console.error(e);
      }
      const sprite = this.playersSprites.get(name);
      sprite?.destroy();
   }

   public moveExternalPlayerX(name: string, x: number): void {
      const { y } = this.gridEngine.getPosition(name);

      if (!this.movingX) {
         this.movingX = true;
         this.gridEngine.moveTo(name, { x, y }).subscribe((_) => {
            this.movingX = false;

            if (this.nextMovesX.length > 0) {
               const nextMove = this.nextMovesX.shift()!;
               this.moveExternalPlayerX(nextMove.name, nextMove.x);
            }
         });
      } else {
         this.nextMovesX.push({ name, x });
      }
   }

   public moveExternalPlayerY(name: string, y: number): void {
      const { x } = this.gridEngine.getPosition(name);

      if (!this.movingY) {
         this.movingY = true;
         this.gridEngine.moveTo(name, { x, y }).subscribe((_) => {
            this.movingY = false;

            if (this.nextMovesY.length > 0) {
               const nextMove = this.nextMovesY.shift()!;
               this.moveExternalPlayerY(nextMove.name, nextMove.y);
            }
         });
      } else {
         this.nextMovesY.push({ name, y });
      }
   }

   public fadeOut(callback: (_: unknown, progress: number) => void): void {
      this.cameras.main.fade(500, 31, 41, 55, false, callback);
   }
}
