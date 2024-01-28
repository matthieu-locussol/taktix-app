import {
   Direction,
   GridEngine,
   MoveToResult,
   NoPathFoundStrategy,
   PathBlockedStrategy,
   Position,
} from 'grid-engine';
import { Channel } from 'shared/src/types/Channel';
import { INTERNAL_PLAYER_NAME } from 'shared/src/types/Player';
import { Room } from 'shared/src/types/Room';
import { SceneData } from 'shared/src/types/SceneData';
import { _assert } from 'shared/src/utils/_assert';
import { NumberMgt } from 'shared/src/utils/numberMgt';
import { store } from '../store';
import { makeLight } from './lights/makeLight';

export const TILE_SIZE = 16;
export const SCALE_FACTOR = 2;
export const PLAYER_LAYER = 'player';
export const PLAYER_SPEED = 2.5;
export const CHARACTER_WIDTH = 26;
export const CHARACTER_LETTER_WIDTH = 8;
export const ZOOM_MIN = 1;
export const ZOOM_MAX = 2;
export const ZOOM_STEP = 0.1;
export const FADE_IN_DURATION = 1000;
export const FADE_OUT_DURATION = 300;

interface IScene extends Phaser.Scene {
   gridEngine: GridEngine;
}

export abstract class Scene extends Phaser.Scene {
   public tilemap: Phaser.Tilemaps.Tilemap | null = null;

   public gridEngine: GridEngine;

   public entrancePosition: Position = { x: 0, y: 0 };

   public entranceDirection: Direction = Direction.DOWN;

   public playersSprites = new Map<string, Phaser.GameObjects.Container>();

   public nextPositions = new Map<string, Position>();

   public marker: Phaser.GameObjects.Graphics | null = null;

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
      this.cameras.main.setZoom(ZOOM_MIN);
      this.cameras.main.fadeIn(FADE_IN_DURATION, 31, 41, 55);

      const tilemap = this.createTilemap();
      this.gridEngine.create(tilemap, { characters: [], cacheTileCollisions: true });
      this.createPlayer(store.characterStore.name);

      this.initializeLights();
      this.initializeHandlers();
      this.initializeMarker();
   }

   private initializeLights(): void {
      this.lights.enable();
      this.lights.setAmbientColor(0xd8d8d8);
      this.lights.addLight(-100, -100, 12800).setColor(0xffffff).setIntensity(1.0);
   }

   private initializeHandlers(): void {
      this.input.on(Phaser.Input.Events.POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {
         if (pointer.leftButtonReleased()) {
            this.handlePointerDown(pointer);
         }
      });

      this.input.on(
         Phaser.Input.Events.POINTER_WHEEL,
         (
            _pointer: Phaser.Input.Pointer,
            _gameObjects: unknown,
            _deltaX: number,
            deltaY: number,
            _deltaZ: number,
         ) => {
            this.handlePointerWheel(deltaY);
         },
      );
   }

   private initializeMarker(): void {
      this.marker = this.add.graphics();
      this.marker.lineStyle(2, 0x115e59, 0.4);
      this.marker.strokeRect(0, 0, TILE_SIZE * SCALE_FACTOR, TILE_SIZE * SCALE_FACTOR);
      this.marker.setDepth(Number.MAX_SAFE_INTEGER);
      this.marker.setVisible(false);
   }

   private handlePointerDown(pointer: Phaser.Input.Pointer): void {
      const pointerPosition = pointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;
      const pointerWorldPosition: Position = {
         x: Math.floor(pointerPosition.x / (TILE_SIZE * SCALE_FACTOR)),
         y: Math.floor(pointerPosition.y / (TILE_SIZE * SCALE_FACTOR)),
      };

      this.gridEngine
         .moveTo(INTERNAL_PLAYER_NAME, pointerWorldPosition, {
            algorithm: 'A_STAR',
            noPathFoundStrategy: NoPathFoundStrategy.STOP,
            pathBlockedStrategy: PathBlockedStrategy.STOP,
         })
         .subscribe(({ result }) => {
            this.highlightTile(pointerWorldPosition, false);

            if (result === MoveToResult.NO_PATH_FOUND) {
               store.chatStore.addMessage({
                  author: 'Server',
                  content: 'This cell is not accessible!',
                  channel: Channel.ERROR,
               });
            }
         });

      this.highlightTile(pointerWorldPosition, true);

      if (this.sys.isVisible() && !this.isPositionBlocked(pointerWorldPosition)) {
         store.colyseusStore.movePlayer(pointerWorldPosition.x, pointerWorldPosition.y);
      }
   }

   private handlePointerWheel(deltaY: number): void {
      const currentZoom = this.cameras.main.zoom;
      const newZoom = NumberMgt.clamp(currentZoom + deltaY * ZOOM_STEP, ZOOM_MIN, ZOOM_MAX);
      this.cameras.main.zoomTo(newZoom, 100);
   }

   private isPositionBlocked(position: Position): boolean {
      const shortestPath = this.gridEngine.findShortestPath(
         {
            position: this.gridEngine.getPosition(INTERNAL_PLAYER_NAME),
            charLayer: PLAYER_LAYER,
         },
         {
            position,
            charLayer: PLAYER_LAYER,
         },
      );

      return shortestPath.path.length === 0;
   }

   private highlightTile({ x, y }: Position, highlight: boolean): void {
      _assert(this.tilemap, 'tilemap should be defined');
      const tile = this.tilemap.layers.some((layer) =>
         this.tilemap?.getTileAt(x, y, undefined, layer.name),
      );

      if (tile !== null) {
         _assert(this.marker, 'marker should be defined');
         if (highlight) {
            this.marker.setPosition(x * TILE_SIZE * SCALE_FACTOR, y * TILE_SIZE * SCALE_FACTOR);
            this.marker.setVisible(true);
         } else {
            this.marker.setVisible(false);
         }
      }
   }

   public createPlayer(nickname: string): void {
      const playerSprite = this.add.sprite(0, 0, PLAYER_LAYER);
      playerSprite.setDepth(3);
      playerSprite.scale = SCALE_FACTOR;
      playerSprite.setPipeline('Light2D');

      const offsetX =
         (CHARACTER_WIDTH * SCALE_FACTOR - nickname.length * CHARACTER_LETTER_WIDTH) / 2;
      const playerName = this.add.text(offsetX, -8, nickname, {
         align: 'center',
         fontSize: 6,
         fontFamily: 'Orbitron',
         resolution: 2,
      });
      playerName.scale = SCALE_FACTOR;
      const playerContainer = this.add.container(0, 0, [playerName, playerSprite]);

      this.gridEngine.addCharacter({
         id: INTERNAL_PLAYER_NAME,
         sprite: playerSprite,
         walkingAnimationMapping: 6,
         startPosition: this.entrancePosition,
         charLayer: PLAYER_LAYER,
         container: playerContainer,
         speed: PLAYER_SPEED,
         collides: true,
      });

      this.gridEngine.movementStopped().subscribe((entity) => {
         if (this.sys.isVisible() && entity.charId === INTERNAL_PLAYER_NAME) {
            store.colyseusStore.stopMoving();
         }
      });

      this.cameras.main.startFollow(playerContainer, true);
      this.cameras.main.setFollowOffset(-playerContainer.width, -playerContainer.height);
      this.gridEngine.turnTowards(INTERNAL_PLAYER_NAME, this.entranceDirection);
      this.nextPositions.set(INTERNAL_PLAYER_NAME, this.entrancePosition);
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
      this.updateMoves();
   }

   public updateMoves(): void {
      if (this.input.keyboard !== null) {
         const cursors = this.input.keyboard.createCursorKeys();
         const playerPosition = this.gridEngine.getPosition(INTERNAL_PLAYER_NAME);

         if (!this.gridEngine.isMoving(INTERNAL_PLAYER_NAME)) {
            if (cursors.left.isDown) {
               this.gridEngine.move(INTERNAL_PLAYER_NAME, Direction.LEFT);
               const newPosition = { x: playerPosition.x - 1, y: playerPosition.y };

               if (!this.isPositionBlocked(newPosition)) {
                  store.colyseusStore.movePlayer(newPosition.x, newPosition.y);
               }
            } else if (cursors.right.isDown) {
               this.gridEngine.move(INTERNAL_PLAYER_NAME, Direction.RIGHT);
               const newPosition = { x: playerPosition.x + 1, y: playerPosition.y };

               if (!this.isPositionBlocked(newPosition)) {
                  store.colyseusStore.movePlayer(newPosition.x, newPosition.y);
               }
            } else if (cursors.up.isDown) {
               this.gridEngine.move(INTERNAL_PLAYER_NAME, Direction.UP);
               const newPosition = { x: playerPosition.x, y: playerPosition.y - 1 };

               if (!this.isPositionBlocked(newPosition)) {
                  store.colyseusStore.movePlayer(newPosition.x, newPosition.y);
               }
            } else if (cursors.down.isDown) {
               this.gridEngine.move(INTERNAL_PLAYER_NAME, Direction.DOWN);
               const newPosition = { x: playerPosition.x, y: playerPosition.y + 1 };

               if (!this.isPositionBlocked(newPosition)) {
                  store.colyseusStore.movePlayer(newPosition.x, newPosition.y);
               }
            }
         }
      }
   }

   public addExternalPlayer(name: string, position: Position): void {
      if (this.gridEngine.getAllCharacters().find((playerName) => playerName === name)) {
         return;
      }

      const externalPlayerSprite = this.add.sprite(0, 0, PLAYER_LAYER);
      externalPlayerSprite.setDepth(3);
      externalPlayerSprite.setPipeline('Light2D');
      externalPlayerSprite.scale = SCALE_FACTOR;

      const offsetX = (CHARACTER_WIDTH * SCALE_FACTOR - name.length * CHARACTER_LETTER_WIDTH) / 2;
      const externalPlayerName = this.add.text(offsetX, -8, name, {
         align: 'center',
         fontSize: 6,
         fontFamily: 'Orbitron',
         resolution: 2,
      });
      externalPlayerName.scale = SCALE_FACTOR;
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
         speed: PLAYER_SPEED,
         collides: false,
      });

      this.playersSprites.set(name, externalPlayerContainer);
      this.nextPositions.set(name, position);
   }

   public deleteExternalPlayer(name: string): void {
      try {
         this.gridEngine.removeCharacter(name);
         this.nextPositions.delete(name);
      } catch (e) {
         console.error(e);
      }

      const sprite = this.playersSprites.get(name);
      sprite?.destroy();
   }

   public setNextX(name: string, x: number): void {
      const currentNextPosition = this.nextPositions.get(name);

      if (currentNextPosition !== undefined) {
         this.nextPositions.set(name, { ...currentNextPosition, x });
         this.moveIfNeeded(name);
      }
   }

   public setNextY(name: string, y: number): void {
      const currentNextPosition = this.nextPositions.get(name);

      if (currentNextPosition !== undefined) {
         this.nextPositions.set(name, { ...currentNextPosition, y });
         this.moveIfNeeded(name);
      }
   }

   public moveIfNeeded(name: string) {
      const { x, y } = this.gridEngine.getPosition(name);
      const newPosition = this.nextPositions.get(name);

      if (newPosition !== undefined) {
         if (x !== newPosition.x || y !== newPosition.y) {
            if (this.gridEngine.isMoving(name)) {
               setTimeout(() => {
                  this.moveIfNeeded(name);
               }, 100);
            } else {
               this.gridEngine.moveTo(name, newPosition, {
                  algorithm: 'A_STAR',
                  noPathFoundStrategy: NoPathFoundStrategy.STOP,
                  pathBlockedStrategy: PathBlockedStrategy.STOP,
               });
            }
         }
      }
   }

   public fadeOut(callback: (_: unknown, progress: number) => void): void {
      this.cameras.main.fade(FADE_OUT_DURATION, 31, 41, 55, false, callback);
   }
}
