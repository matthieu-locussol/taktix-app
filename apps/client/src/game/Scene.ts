import type { GridEngine, Position } from 'grid-engine';
import type { CharacterSprite } from 'shared/src/data/charactersSprites.ts';
import type { MonsterSprite } from 'shared/src/data/monstersSprites.ts';
import type { Room } from 'shared/src/types/Room.ts';
import type { SceneData } from 'shared/src/types/SceneData.ts';

import { Direction, NoPathFoundStrategy, PathBlockedStrategy } from 'grid-engine';
import { TILE_SIZE } from 'shared/src/config.ts';
import { zCharacterSprite } from 'shared/src/data/charactersSprites.ts';
import { zMonsterSprite } from 'shared/src/data/monstersSprites.ts';
import { NPC_SPOTS } from 'shared/src/data/npcSpots.ts';
import { NPCS } from 'shared/src/data/npcs.ts';
import { isInteractiveObject } from 'shared/src/types/InteractiveObject.ts';
import { INTERNAL_PLAYER_NAME } from 'shared/src/types/Player.ts';
import { _assert } from 'shared/src/utils/_assert.ts';
import { NumberMgt } from 'shared/src/utils/numberMgt.ts';

import { AnimatedTiles } from '../plugins/AnimatedTiles.ts';
import { store } from '../store/index.tsx';
import { isObjectProperties } from '../utils/phaser.ts';

import { makeCharacter } from './utils/makeCharacter.ts';
import { makeGrid } from './utils/makeGrid.ts';
import { makeInteractiveObject } from './utils/makeInteractiveObject.ts';
import { makeLight } from './utils/makeLight.ts';
import { makeMarker } from './utils/makeMarker.ts';
import { makeMinimap } from './utils/makeMinimap.ts';
import { makeMonster } from './utils/makeMonster.ts';

export const SCALE_FACTOR = 2;
export const PLAYER_LAYER = 'Player';
export const PLAYER_GE_LAYER = 'player';
export const PLAYER_SPEED = 2.5;
export const CHARACTER_WIDTH = 24;
export const CHARACTER_HEIGHT = 24;
export const CHARACTER_LETTER_WIDTH = 8;
export const ZOOM_MIN = 1.3;
export const ZOOM_MAX = 2;
export const ZOOM_STEP = 0.1;
export const FADE_IN_DURATION = 1000;
export const FADE_OUT_DURATION = 300;
export const INTERACTIVE_OBJECT_DEPTH = 999;

export interface InteractiveObjectPhaser {
   polygon: Phaser.GameObjects.Polygon;
   geometry: Phaser.Geom.Polygon;
}

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

   public interactiveObjects: InteractiveObjectPhaser[] = [];

   public fightIcons: Record<string, Phaser.GameObjects.Image> = {};

   public monstersSpritesMap = new Map<string, Phaser.GameObjects.Sprite>();

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
      this.load.image('FightIcon', 'assets/fights/fight.png');
      this.load.scenePlugin('animatedTiles', AnimatedTiles, 'animatedTiles', 'animatedTiles');
   }

   public abstract loadAssets(): void;

   public create(): void {
      this.sys.setVisible(store.loadingScreenStore.sceneVisible);
      this.cameras.main.setZoom(store.gameStore.zoom);
      this.fadeIn();

      this.minimap = makeMinimap(this);

      this.createTilemap();
      this.initializePlugins();
      this.createPlayer(store.characterStore.name);

      this.initializeLights();
      this.initializeInteractiveObjects();
      this.initializeHandlers();
      this.initializeGrid();
      this.initializeMarker();
      this.initializeNPCs();
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

   private initializeInteractiveObjects(): void {
      if (this.tilemap === null) {
         return;
      }

      const layer = this.tilemap.getObjectLayer('Interactive');

      if (layer === null) {
         return;
      }

      for (const object of layer.objects) {
         if (object.polygon !== undefined && isObjectProperties(object.properties)) {
            const idProperty = object.properties.find(({ name }) => name === 'id');

            if (idProperty !== undefined && isInteractiveObject(idProperty.value)) {
               const interactiveObject = makeInteractiveObject(this, idProperty.value, object);

               this.interactiveObjects.push(interactiveObject);
            }
         }
      }
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

      this.scale.on(Phaser.Scale.Events.ENTER_FULLSCREEN, () => {
         store.settingsMenuStore.setFullScreen(true);
      });

      this.scale.on(Phaser.Scale.Events.LEAVE_FULLSCREEN, () => {
         store.settingsMenuStore.setFullScreen(false);
      });
   }

   private initializeGrid(): void {
      this.grid = makeGrid(this);
   }

   private initializeMarker(): void {
      this.marker = makeMarker(this);
   }

   private initializeNPCs(): void {
      if (this.tilemap === null) {
         return;
      }

      const npcs = NPC_SPOTS[this.scene.key as Room];

      for (const { npcName, x, y, direction } of npcs) {
         const { name, spritesheet } = NPCS[npcName];

         const npc = makeCharacter({
            scene: this,
            name,
            spritesheet,
            characterType: 'npc',
         });

         _assert(npc, 'npc should be defined');
         const { sprite, wrapper } = npc;

         this.gridEngine.addCharacter({
            id: `NPC@${name}`,
            sprite,
            walkingAnimationMapping: 0,
            startPosition: { x, y },
            charLayer: PLAYER_GE_LAYER,
            speed: PLAYER_SPEED,
            collides: true,
            facingDirection: direction,
         });

         this.playersSprites.set(`NPC@${name}`, sprite);
         this.playersWrappers.set(`NPC@${name}`, wrapper);
      }
   }

   private initializeSceneState(): void {
      const { hudStore } = store;

      this.setGridVisibility(hudStore.isGridVisible);
      this.setMinimapVisibility(hudStore.isMinimapVisible);
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

   private handlePointerMove(
      pointer: Phaser.Input.Pointer,
      gameObjects: Phaser.GameObjects.GameObject[],
   ): void {
      const position = pointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;

      gameObjects
         .filter(({ type }) => type === 'Sprite')
         .map((gameObject) => gameObject as Phaser.GameObjects.Sprite)
         .forEach((gameObject) => {
            gameObject.setData('hovered', gameObject.getBounds().contains(position.x, position.y));
         });

      this.interactiveObjects.forEach(({ polygon, geometry }) => {
         polygon.setData('hovered', Phaser.Geom.Polygon.Contains(geometry, position.x, position.y));
      });
   }

   private handlePointerDown(
      pointer: Phaser.Input.Pointer,
      gameObjects: Phaser.GameObjects.GameObject[],
   ): void {
      const pointerPosition = pointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;

      const clickedSprites = gameObjects
         .filter(({ type }) => type === 'Sprite')
         .map((gameObject) => gameObject as Phaser.GameObjects.Sprite)
         .filter((gameObject) => gameObject.getData('hovered'));

      const clickedInteractiveObjects = this.interactiveObjects.filter(({ polygon }) =>
         polygon.getData('hovered'),
      );

      if (clickedSprites.length > 0 || clickedInteractiveObjects.length > 0) {
         if (pointer.event instanceof MouseEvent) {
            store.contextMenuStore.openContextMenu(
               pointer.event.clientX,
               pointer.event.clientY,
               clickedSprites,
               clickedInteractiveObjects,
            );
         }

         return;
      }

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
      const { spritesheet } = store.characterStore;

      const character = makeCharacter({
         scene: this,
         name: nickname,
         spritesheet,
         characterType: 'player',
      });

      if (character !== null) {
         const { sprite, wrapper } = character;

         this.playersWrappers.set(INTERNAL_PLAYER_NAME, wrapper);

         this.gridEngine.addCharacter({
            id: INTERNAL_PLAYER_NAME,
            sprite,
            walkingAnimationMapping: 0,
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
               store.characterStore.setPosition(position);
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

   public createMonster(
      spritesheet: MonsterSprite,
      id: string,
      name: string,
      radius: number,
      positionX: number,
      positionY: number,
      fightId: number,
   ) {
      const monsterSprite = makeMonster({
         scene: this,
         id,
         name,
         spritesheet,
         fightId,
      });

      if (monsterSprite !== null) {
         this.gridEngine.addCharacter({
            id,
            sprite: monsterSprite,
            walkingAnimationMapping: 0,
            startPosition: { x: positionX, y: positionY },
            charLayer: PLAYER_GE_LAYER,
            speed: 1.5,
            collides: true,
         });

         this.gridEngine.moveRandomly(id, NumberMgt.random(3500, 6000), radius);

         this.monstersSpritesMap.set(id, monsterSprite);
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

      if (store.gameStore.shouldProcessPlayerQueue) {
         this.updatePlayers();
      }

      if (store.gameStore.shouldProcessFightQueue) {
         this.updateMonsters();
      }

      this.updatePlayersWrappers();
   }

   public updatePlayers(): void {
      for (const player of store.gameStore.playersToAddQueue) {
         const { spritesheet, name, x, y, direction } = player;

         if (!this.gridEngine.hasCharacter(name)) {
            this.addExternalPlayer(
               name,
               zCharacterSprite.parse(spritesheet),
               { x, y },
               direction as Direction,
            );

            player.listen('x', (newX) => {
               this.setNextX(name, newX);
            });

            player.listen('y', (newY) => {
               this.setNextY(name, newY);
            });

            player.listen('direction', (newDirection) => {
               this.setPlayerDirection(name, newDirection as Direction);
            });

            player.listen('isFight', (isFight) => {
               this.setCharacterFighting(name, isFight);
            });
         }
      }

      store.gameStore.playersToAddQueue = [];

      for (const { name } of store.gameStore.playersToRemoveQueue) {
         this.deleteExternalPlayer(name);
      }

      store.gameStore.playersToRemoveQueue = [];
   }

   public updateMonsters(): void {
      for (const { id, positionX, positionY, radius, spritesheet, name, fightId } of store.gameStore
         .fightsToAddQueue) {
         if (!this.gridEngine.hasCharacter(id)) {
            this.createMonster(
               zMonsterSprite.parse(spritesheet),
               id,
               name,
               radius,
               positionX,
               positionY,
               fightId,
            );
         }
      }

      store.gameStore.fightsToAddQueue = [];

      for (const { id } of store.gameStore.fightsToRemoveQueue) {
         if (this.gridEngine.hasCharacter(id)) {
            this.deleteMonster(id);
         }
      }

      store.gameStore.fightsToRemoveQueue = [];
   }

   public updatePlayersWrappers(): void {
      for (const [name, wrapper] of this.playersWrappers) {
         const realName = name === INTERNAL_PLAYER_NAME ? store.characterStore.name : name;

         try {
            if (this.gridEngine.hasCharacter(name)) {
               const characterSprite = this.gridEngine.getSprite(name);

               if (characterSprite !== undefined) {
                  const { name: characterName, square } = wrapper;

                  Phaser.Display.Align.To.TopCenter(
                     characterName,
                     characterSprite,
                     (CHARACTER_WIDTH * SCALE_FACTOR - realName.length * CHARACTER_LETTER_WIDTH) /
                        4,
                     0,
                  );

                  Phaser.Display.Align.To.BottomCenter(
                     square,
                     characterSprite,
                     CHARACTER_WIDTH / 2,
                  );
               }
            }
         } catch (e) {
            console.error(e);
         }
      }
   }

   private getKeyboardCursors(): Phaser.Types.Input.Keyboard.CursorKeys {
      _assert(this.input.keyboard, 'input.keyboard should be defined');
      const { keyboardLayout } = store.settingsMenuStore;

      if (keyboardLayout === 'zqsd') {
         return this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.Z,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.Q,
            right: Phaser.Input.Keyboard.KeyCodes.D,
         }) as Phaser.Types.Input.Keyboard.CursorKeys;
      }

      if (keyboardLayout === 'wasd') {
         return this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
         }) as Phaser.Types.Input.Keyboard.CursorKeys;
      }

      if (keyboardLayout === 'arrows') {
         return this.input.keyboard.createCursorKeys();
      }

      throw new Error('Invalid keyboard layout');
   }

   public updateMoves(): void {
      if (!store.screenStore.loggedIn) {
         return;
      }

      if (this.input.keyboard !== null) {
         const cursors = this.getKeyboardCursors();
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

   public addExternalPlayer(
      name: string,
      spritesheet: CharacterSprite,
      position: Position,
      direction: Direction,
   ): void {
      const character = makeCharacter({
         scene: this,
         name,
         spritesheet,
         characterType: 'externalPlayer',
      });

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

      const fightIcon = this.fightIcons[name];

      if (fightIcon !== undefined) {
         fightIcon.destroy();
         delete this.fightIcons[name];
      }
   }

   public deleteMonster(id: string): void {
      try {
         this.gridEngine.removeCharacter(id);
      } catch (e) {
         console.error(e);
      }

      const sprite = this.monstersSpritesMap.get(id);

      if (sprite !== undefined) {
         sprite.destroy();
         this.monstersSpritesMap.delete(id);
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

   public doesPlayerExist(name: string): boolean {
      return (
         this.gridEngine.getAllCharacters().find((playerName) => playerName === name) !== undefined
      );
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

   public setCharacterFighting(name: string, isFighting: boolean): void {
      const spriteName = store.characterStore.name === name ? INTERNAL_PLAYER_NAME : name;
      const characterSprite = this.gridEngine.getSprite(spriteName);

      if (this.gridEngine.isMoving(spriteName)) {
         const subscription = this.gridEngine.movementStopped().subscribe(({ charId }) => {
            if (charId === spriteName) {
               this.setCharacterFighting(name, isFighting);
               subscription.unsubscribe();
            }
         });
      } else if (characterSprite !== undefined) {
         const fightIconSprite = this.fightIcons[spriteName];

         if (fightIconSprite !== undefined) {
            fightIconSprite.destroy();
            delete this.fightIcons[spriteName];
         }

         if (isFighting) {
            const fightIconSprite = this.add
               .image(characterSprite.x + 24, characterSprite.y - CHARACTER_HEIGHT + 8, 'FightIcon')
               .setDepth(INTERACTIVE_OBJECT_DEPTH);

            this.fightIcons[spriteName] = fightIconSprite;
         }
      }
   }

   public fadeIn(): void {
      this.cameras.main.fadeIn(FADE_IN_DURATION, 31, 41, 55).setRoundPixels(true);
   }

   public fadeOut(callback: (_: unknown, progress: number) => void, freeMemory?: boolean): void {
      if (freeMemory) {
         for (const character of this.gridEngine.getAllCharacters()) {
            if (character !== INTERNAL_PLAYER_NAME) {
               this.deleteExternalPlayer(character);
            }
         }

         this.interactiveObjects.forEach(({ polygon }) => polygon.destroy());
         this.interactiveObjects = [];
      }

      this.cameras.main.fade(FADE_OUT_DURATION, 31, 41, 55, false, callback);
   }

   public getRoomType(): 'map' | 'fight' {
      return 'map';
   }

   public setAlcoholEffect(): void {
      this.time.delayedCall(1000, () => {
         const tiltFx = this.cameras.main.postFX.addTiltShift(0.6);
         const tweenTilt = this.tweens
            .add({
               targets: tiltFx,
               amount: 1.6,
               radius: 1,
               contrast: 0.4,
               strength: {
                  from: 0.8,
                  to: 1.2,
               },
               yoyo: true,
               loop: -1,
               ease: 'sine.inout',
               duration: 10_000,
            })
            .play();

         this.time.delayedCall(9_000, () => {
            tweenTilt.stop();
            tweenTilt.destroy();
            tiltFx.setActive(false);
            tiltFx.destroy();
            this.cameras.main.postFX.remove(tiltFx);
         });
      });

      this.time.delayedCall(3000, () => {
         const barrelFx = this.cameras.main.postFX.addBarrel(1);
         const tweenBarrel = this.tweens
            .add({
               targets: barrelFx,
               amount: {
                  from: 0.9,
                  to: 1.2,
               },
               yoyo: true,
               loop: -1,
               ease: 'sine.inout',
            })
            .play();

         this.time.delayedCall(6_000, () => {
            tweenBarrel.stop();
            tweenBarrel.destroy();
            barrelFx.setActive(false);
            barrelFx.destroy();
            this.cameras.main.postFX.remove(barrelFx);
         });
      });

      this.time.delayedCall(5_000, () => {
         const tweenZoom = this.tweens
            .add({
               targets: this.cameras.main,
               zoom: 2,
               duration: 2000,
               ease: 'Linear',
               yoyo: true,
               loop: -1,
            })
            .play();

         this.time.delayedCall(3_000, () => {
            tweenZoom.stop();
            tweenZoom.destroy();
            this.cameras.main.zoomTo(1, 500, 'Linear');
         });
      });

      this.time.delayedCall(4000, () => {
         this.cameras.main.shake(2000, 0.001);

         this.time.delayedCall(2000, () => {
            this.cameras.main.shake(0, 0);
         });
      });
   }
}
