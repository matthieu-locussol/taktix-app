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
import { _assert } from 'shared/src/utils/_assert';
import { NumberMgt } from 'shared/src/utils/numberMgt';
import { AnimatedTiles } from '../plugins/AnimatedTiles';
import { store } from '../store';
import { makeCharacter } from './utils/makeCharacter';
import { makeGrid } from './utils/makeGrid';
import { makeLight } from './utils/makeLight';
import { makeMarker } from './utils/makeMarker';
import { makeMinimap } from './utils/makeMinimap';

export const TILE_SIZE = 16;
export const SCALE_FACTOR = 2;
export const PLAYER_LAYER = 'Player';
export const PLAYER_GE_LAYER = 'player';
export const PLAYER_SPEED = 2.5;
export const CHARACTER_WIDTH = 26;
export const CHARACTER_HEIGHT = 36;
export const CHARACTER_LETTER_WIDTH = 8;
export const ZOOM_MIN = 1;
export const ZOOM_MAX = 2;
export const ZOOM_STEP = 0.1;
export const FADE_IN_DURATION = 1000;
export const FADE_OUT_DURATION = 300;
export const TRANSPARENCY_FACTOR = 0.75;

interface PlayerWrappers {
   square: Phaser.GameObjects.Rectangle;
   name: Phaser.GameObjects.Text;
}

interface IScene extends Phaser.Scene {
   gridEngine: GridEngine;
}

export abstract class Scene extends Phaser.Scene {
   public tilemap: Phaser.Tilemaps.Tilemap | null = null;

   public gridEngine: GridEngine;

   public entrancePosition: Position = { x: 0, y: 0 };

   public entranceDirection: Direction = Direction.DOWN;

   public playersSprites = new Map<string, Phaser.GameObjects.Sprite>();

   public playersWrappers = new Map<string, PlayerWrappers>();

   public nextPositions = new Map<string, Position>();

   public grid: Phaser.GameObjects.Grid | null = null;

   public marker: Phaser.GameObjects.Graphics | null = null;

   public minimap: Phaser.Cameras.Scene2D.Camera | null = null;

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
      this.load.scenePlugin('animatedTiles', AnimatedTiles, 'animatedTiles', 'animatedTiles');
   }

   public abstract loadAssets(): void;

   public abstract unloadAssets(): void;

   public create(): void {
      this.sys.setVisible(store.loadingScreenStore.sceneVisible);
      this.cameras.main.setZoom(store.gameStore.zoom);
      this.cameras.main.fadeIn(FADE_IN_DURATION, 31, 41, 55);

      this.minimap = makeMinimap(this);

      this.createTilemap();
      this.initializePlugins();
      this.createPlayer(store.characterStore.name);

      this.initializeLights();
      this.initializeHandlers();
      this.initializeGrid();
      this.initializeMarker();
      this.initializeSceneState();
   }

   private initializePlugins() {
      _assert(this.tilemap, 'tilemap should be defined');

      this.gridEngine.create(this.tilemap, { characters: [], cacheTileCollisions: true });
      this.sys.animatedTiles.init(this.tilemap);
   }

   private initializeLights(): void {
      this.lights.enable();
      this.lights.setAmbientColor(0xd8d8d8);
      this.lights.addLight(-100, -100, 12800).setColor(0xffffff).setIntensity(1.0);
   }

   private initializeHandlers(): void {
      this.input.on(
         Phaser.Input.Events.POINTER_DOWN,
         (pointer: Phaser.Input.Pointer, gameObjects: Phaser.GameObjects.GameObject[]) => {
            if (pointer.leftButtonReleased()) {
               this.handlePointerDown(pointer, gameObjects);
            }
         },
      );

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

      this.input.on(
         Phaser.Input.Events.POINTER_MOVE,
         (pointer: Phaser.Input.Pointer, gameObjects: Phaser.GameObjects.GameObject[]) => {
            this.handlePointerMove(pointer, gameObjects);
         },
      );
   }

   private initializeGrid(): void {
      this.grid = makeGrid(this);
   }

   private initializeMarker(): void {
      this.marker = makeMarker(this);
   }

   public initializeSceneState(): void {
      const { hudStore } = store;

      this.setGridVisibility(hudStore.isGridVisible);
      this.setMinimapVisibility(hudStore.isMinimapVisible);
      this.setTransparency(hudStore.isTransparencyEnabled);
   }

   public setGridVisibility(isVisible: boolean): void {
      if (this.grid !== null) {
         this.grid.setVisible(isVisible);
      }
   }

   public setMinimapVisibility(isVisible: boolean): void {
      if (this.minimap !== null) {
         this.minimap.setVisible(isVisible);
      }
   }

   public setTransparency(isEnabled: boolean): void {
      if (this.tilemap !== null) {
         const playerLayer = this.tilemap.getLayer(PLAYER_LAYER);

         if (playerLayer !== null) {
            for (const layer of this.tilemap.layers) {
               layer.tilemapLayer.setAlpha(
                  isEnabled
                     ? layer.tilemapLayer.alpha * TRANSPARENCY_FACTOR
                     : layer.tilemapLayer.alpha / TRANSPARENCY_FACTOR,
               );
            }
         }
      }
   }

   private handlePointerMove(
      pointer: Phaser.Input.Pointer,
      gameObjects: Phaser.GameObjects.GameObject[],
   ): void {
      const position = pointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;

      gameObjects
         .filter(({ type }) => type === 'Sprite')
         .map((gameObject) => gameObject as Phaser.GameObjects.Sprite)
         .forEach((gameObject) => {
            if (gameObject.getBounds().contains(position.x, position.y)) {
               gameObject.setData('hovered', true);
            } else {
               gameObject.setData('hovered', false);
            }
         });
   }

   private handlePointerDown(
      pointer: Phaser.Input.Pointer,
      _gameObjects: Phaser.GameObjects.GameObject[],
   ): void {
      const pointerPosition = pointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;
      const pointerWorldPosition: Position = {
         x: Math.floor(pointerPosition.x / (TILE_SIZE * SCALE_FACTOR)),
         y: Math.floor(pointerPosition.y / (TILE_SIZE * SCALE_FACTOR)),
      };

      if (
         this.isPositionClickable(pointerWorldPosition) &&
         this.isPositionVisible(pointerPosition)
      ) {
         this.gridEngine
            .moveTo(INTERNAL_PLAYER_NAME, pointerWorldPosition, {
               algorithm: 'A_STAR',
               noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
               pathBlockedStrategy: PathBlockedStrategy.STOP,
            })
            .subscribe(() => {
               this.highlightTile(pointerWorldPosition, false);
            });

         this.highlightTile(pointerWorldPosition, true);

         if (this.sys.isVisible()) {
            store.colyseusStore.movePlayer(pointerWorldPosition.x, pointerWorldPosition.y);
         }
      }
   }

   private handlePointerWheel(deltaY: number): void {
      const currentZoom = this.cameras.main.zoom;
      const newZoom = NumberMgt.clamp(currentZoom - deltaY * ZOOM_STEP, ZOOM_MIN, ZOOM_MAX);
      this.cameras.main.zoomTo(newZoom, 100);
      store.gameStore.setZoom(newZoom);
   }

   private isPositionClickable(position: Position): boolean {
      _assert(this.tilemap, 'tilemap should be defined');

      return this.tilemap.layers.some((layer) => {
         _assert(this.tilemap, 'tilemap should be defined');
         const tile = this.tilemap.getTileAt(position.x, position.y, undefined, layer.name);
         return tile !== null;
      });
   }

   private isPositionVisible(position: Position): boolean {
      return this.cameras.main.worldView.contains(position.x, position.y);
   }

   private highlightTile({ x, y }: Position, highlight: boolean): void {
      _assert(this.tilemap, 'tilemap should be defined');

      const tile = this.tilemap.layers.some((layer) => {
         _assert(this.tilemap, 'tilemap should be defined');
         return this.tilemap.getTileAt(x, y, undefined, layer.name);
      });

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
      const character = makeCharacter(this, nickname, true);

      if (character !== null) {
         const { sprite, wrapper } = character;
         this.playersWrappers.set(INTERNAL_PLAYER_NAME, wrapper);

         this.gridEngine.addCharacter({
            id: INTERNAL_PLAYER_NAME,
            sprite,
            walkingAnimationMapping: 6,
            startPosition: this.entrancePosition,
            charLayer: PLAYER_GE_LAYER,
            speed: PLAYER_SPEED,
            collides: true,
         });

         this.gridEngine.positionChangeStarted().subscribe((entity) => {
            if (this.sys.isVisible() && entity.charId === INTERNAL_PLAYER_NAME) {
               const position = this.gridEngine.getPosition(INTERNAL_PLAYER_NAME);
               store.characterStore.setPosition(position);
            }
         });

         this.gridEngine.movementStopped().subscribe((entity) => {
            if (this.sys.isVisible() && entity.charId === INTERNAL_PLAYER_NAME) {
               const position = this.gridEngine.getPosition(INTERNAL_PLAYER_NAME);
               store.colyseusStore.stopMoving(entity.direction, position);
            }
         });

         this.cameras.main.startFollow(sprite, true, 0.3, 0.3, -sprite.width, -sprite.height);

         if (this.minimap !== null) {
            this.minimap.startFollow(sprite, false, 0.3, 0.3, -sprite.width, -sprite.height);
         }

         this.gridEngine.turnTowards(INTERNAL_PLAYER_NAME, this.entranceDirection);
         this.nextPositions.set(INTERNAL_PLAYER_NAME, this.entrancePosition);
      }
   }

   public abstract createTilemap(): Phaser.Tilemaps.Tilemap;

   public initializeTilemap(tilesets: string[]) {
      if (this.tilemap === null) {
         return;
      }

      for (let i = 0; i < this.tilemap.layers.length; i += 1) {
         const layer = this.tilemap.createLayer(i, tilesets, 0, 0);

         if (layer !== null) {
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
      this.updatePlayersWrappers();
   }

   public updatePlayersWrappers(): void {
      for (const [name, wrapper] of this.playersWrappers) {
         const realName = name === INTERNAL_PLAYER_NAME ? store.characterStore.name : name;
         const characterSprite = this.gridEngine.getSprite(name);

         if (characterSprite !== undefined) {
            const { name: characterName, square } = wrapper;

            Phaser.Display.Align.To.TopCenter(
               characterName,
               characterSprite,
               (CHARACTER_WIDTH * SCALE_FACTOR - realName.length * CHARACTER_LETTER_WIDTH) / 4,
               0,
            );

            Phaser.Display.Align.To.BottomCenter(square, characterSprite, CHARACTER_WIDTH / 2);
         }
      }
   }

   public updateMoves(): void {
      if (this.input.keyboard !== null) {
         const cursors = this.input.keyboard.createCursorKeys();
         const playerPosition = this.gridEngine.getPosition(INTERNAL_PLAYER_NAME);

         if (!this.gridEngine.isMoving(INTERNAL_PLAYER_NAME)) {
            if (cursors.left.isDown) {
               this.gridEngine.move(INTERNAL_PLAYER_NAME, Direction.LEFT);
               const newPosition = { x: playerPosition.x - 1, y: playerPosition.y };

               if (!this.isPositionClickable(newPosition)) {
                  store.colyseusStore.movePlayer(newPosition.x, newPosition.y);
               }
            } else if (cursors.right.isDown) {
               this.gridEngine.move(INTERNAL_PLAYER_NAME, Direction.RIGHT);
               const newPosition = { x: playerPosition.x + 1, y: playerPosition.y };

               if (!this.isPositionClickable(newPosition)) {
                  store.colyseusStore.movePlayer(newPosition.x, newPosition.y);
               }
            } else if (cursors.up.isDown) {
               this.gridEngine.move(INTERNAL_PLAYER_NAME, Direction.UP);
               const newPosition = { x: playerPosition.x, y: playerPosition.y - 1 };

               if (!this.isPositionClickable(newPosition)) {
                  store.colyseusStore.movePlayer(newPosition.x, newPosition.y);
               }
            } else if (cursors.down.isDown) {
               this.gridEngine.move(INTERNAL_PLAYER_NAME, Direction.DOWN);
               const newPosition = { x: playerPosition.x, y: playerPosition.y + 1 };

               if (!this.isPositionClickable(newPosition)) {
                  store.colyseusStore.movePlayer(newPosition.x, newPosition.y);
               }
            }
         }
      }
   }

   public addExternalPlayer(name: string, position: Position, direction: Direction): void {
      const character = makeCharacter(this, name, false);

      if (character !== null) {
         const { sprite, wrapper } = character;
         this.playersWrappers.set(name, wrapper);

         this.gridEngine.addCharacter({
            id: name,
            sprite,
            walkingAnimationMapping: 0,
            startPosition: position,
            charLayer: PLAYER_GE_LAYER,
            speed: PLAYER_SPEED,
            collides: true,
            facingDirection: direction,
         });

         this.playersSprites.set(name, sprite);
         this.nextPositions.set(name, position);
      }
   }

   public deleteExternalPlayer(name: string): void {
      try {
         this.gridEngine.removeCharacter(name);
         this.nextPositions.delete(name);
      } catch (e) {
         console.error(e);
      }

      const sprite = this.playersSprites.get(name);
      if (sprite !== undefined) {
         sprite.destroy();
         this.playersSprites.delete(name);
      }

      const wrapper = this.playersWrappers.get(name);
      if (wrapper !== undefined) {
         wrapper.name.destroy();
         wrapper.square.destroy();
         this.playersWrappers.delete(name);
      }
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
                  noPathFoundStrategy: NoPathFoundStrategy.CLOSEST_REACHABLE,
                  pathBlockedStrategy: PathBlockedStrategy.STOP,
               });
            }
         }
      }
   }

   public setPlayerDirection(name: string, direction: Direction): void {
      this.gridEngine.turnTowards(name, direction);
   }

   public fadeOut(callback: (_: unknown, progress: number) => void): void {
      this.cameras.main.fade(FADE_OUT_DURATION, 31, 41, 55, false, callback);
   }
}
