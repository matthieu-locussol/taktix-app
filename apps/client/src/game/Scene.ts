import { Direction, GridEngine, Position } from 'grid-engine';
import { TELEPORTATION_SPOTS } from 'shared/src/data/teleportationSpots';
import { INTERNAL_PLAYER_NAME } from 'shared/src/types/Player';
import { SceneData } from 'shared/src/types/SceneData';
import { store } from '../store';
import { makeLight } from './lights/makeLight';

export const SCALE_FACTOR = 3;

interface IScene extends Phaser.Scene {
   gridEngine: GridEngine;
}

export abstract class Scene extends Phaser.Scene {
   public tilemap: Phaser.Tilemaps.Tilemap | null = null;

   public gridEngine: GridEngine;

   public entrancePosition: Position = { x: 0, y: 0 };

   public entranceDirection: Direction = Direction.DOWN;

   public playersSprites = new Map<string, Phaser.GameObjects.Container>();

   constructor(config: string | Phaser.Types.Scenes.SettingsConfig, sceneData?: SceneData) {
      super(config);
      this.gridEngine = (this as unknown as IScene).gridEngine;

      if (sceneData !== undefined) {
         this.init(sceneData);
      }
   }

   public init({ entrancePosition, entranceDirection }: SceneData): void {
      if (entrancePosition !== undefined) {
         this.entrancePosition = entrancePosition;
      }

      if (entranceDirection !== undefined) {
         this.entranceDirection = entranceDirection;
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
      this.cameras.main.fadeIn(1000, 0, 0, 0);

      const tilemap = this.createTilemap();
      this.gridEngine.create(tilemap, { characters: [] });
      this.createPlayer(store.characterStore.name);

      if (store.characterStore.map !== '') {
         this.sendChangeMapSocket(this.entrancePosition);
      }

      this.gridEngine.positionChangeFinished().subscribe((entity) => {
         if (this.sys.isVisible() && entity.charId === INTERNAL_PLAYER_NAME) {
            this.sendMoveSocket();
         }
      });

      store.characterStore.players.forEach(({ nickname, x, y }) => {
         this.addExternalPlayer(nickname, { x, y });
      });

      this.lights.enable();
      this.lights.setAmbientColor(0x637681);
      this.lights.addLight(0, 0, 12800).setColor(0xffffff).setIntensity(1.0);
   }

   public createPlayer(nickname: string): void {
      const playerSprite = this.add.sprite(0, 0, 'player');
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
         charLayer: 'player',
         container: playerContainer,
      });

      this.cameras.main.startFollow(playerContainer, true);
      this.cameras.main.setFollowOffset(-playerContainer.width, -playerContainer.height);
      this.gridEngine.turnTowards(INTERNAL_PLAYER_NAME, this.entranceDirection);
   }

   public abstract createTilemap(): Phaser.Tilemaps.Tilemap;

   public initializeTilemap(tileset: string) {
      if (this.tilemap === null) {
         return;
      }

      for (let i = 0; i < this.tilemap.layers.length; i += 1) {
         const layer = this.tilemap.createLayer(i, tileset, 0, 0);

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

   public override update(): void {
      this.updateMoves();
      this.updateTeleportationSpots();
   }

   public updateMoves(): void {
      if (this.input.keyboard !== null) {
         const cursors = this.input.keyboard.createCursorKeys();

         if (cursors.left.isDown) {
            this.gridEngine.move(INTERNAL_PLAYER_NAME, Direction.LEFT);
         } else if (cursors.right.isDown) {
            this.gridEngine.move(INTERNAL_PLAYER_NAME, Direction.RIGHT);
         } else if (cursors.up.isDown) {
            this.gridEngine.move(INTERNAL_PLAYER_NAME, Direction.UP);
         } else if (cursors.down.isDown) {
            this.gridEngine.move(INTERNAL_PLAYER_NAME, Direction.DOWN);
         }
      }
   }

   public sendMoveSocket(): void {
      const position = this.gridEngine.getPosition(INTERNAL_PLAYER_NAME);

      store.socketStore.send({
         type: 'move',
         posX: position.x,
         posY: position.y,
      });
   }

   public sendChangeMapSocket(position: Position): void {
      store.socketStore.send({
         type: 'changeMap',
         map: this.scene.key,
         x: position.x,
         y: position.y,
      });
   }

   public updateTeleportationSpots(): void {
      const playerPosition = this.gridEngine.getPosition(INTERNAL_PLAYER_NAME);
      const teleportationSpots = TELEPORTATION_SPOTS[this.scene.key];

      for (const { x, y, destinationMapName, destinationMapData } of teleportationSpots) {
         if (playerPosition.x === x && playerPosition.y === y) {
            this.scene.start(destinationMapName, destinationMapData);
         }
      }
   }

   public addExternalPlayer(name: string, position: Position): void {
      if (this.gridEngine.getAllCharacters().find((cha) => cha === name)) {
         return;
      }

      const externalPlayerSprite = this.add.sprite(0, 0, 'player');
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
         charLayer: 'player',
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

   public moveExternalPlayer(name: string, x: number, y: number): void {
      this.gridEngine.moveTo(name, { x, y });
   }

   public deleteAllExternalPlayers(): void {
      const players = this.gridEngine
         .getAllCharacters()
         .filter((name) => name !== INTERNAL_PLAYER_NAME);
      players.forEach((p) => this.deleteExternalPlayer(p));
   }
}
