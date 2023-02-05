import { Direction, GridEngine, Position } from 'grid-engine';
import { TELEPORTATION_SPOTS } from '../data/teleportationSpots';
import { store } from '../store';
import { teleportPlayer } from '../utils/game';

export interface SceneData {
   entrancePosition?: Position;
   entranceDirection?: Direction;
}

interface IScene extends Phaser.Scene {
   gridEngine: GridEngine;
}

export abstract class Scene extends Phaser.Scene {
   public gridEngine: GridEngine;

   public entrancePosition: Position = { x: 0, y: 0 };

   public entranceDirection: Direction = Direction.DOWN;

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
      const tilemap = this.createTilemap();
      const player = this.createPlayer();

      const gridEngineConfig = {
         characters: [
            {
               id: 'player',
               sprite: player,
               walkingAnimationMapping: 6,
               startPosition: this.entrancePosition,
               charLayer: 'player',
            },
         ],
      };

      this.gridEngine.create(tilemap, gridEngineConfig);
      this.gridEngine.turnTowards('player', this.entranceDirection);
   }

   public createPlayer(): Phaser.GameObjects.Sprite {
      const playerSprite = this.add.sprite(0, 0, 'player');
      playerSprite.setDepth(3);
      playerSprite.scale = 3;
      this.cameras.main.startFollow(playerSprite, true);
      this.cameras.main.setFollowOffset(-playerSprite.width, -playerSprite.height);
      return playerSprite;
   }

   public abstract createTilemap(): Phaser.Tilemaps.Tilemap;

   public override update(): void {
      this.updateMoves();
      this.updateTeleportationSpots();
   }

   public updateMoves(): void {
      const cursors = this.input.keyboard.createCursorKeys();

      if (cursors.left.isDown) {
         this.gridEngine.move('player', Direction.LEFT);
      } else if (cursors.right.isDown) {
         this.gridEngine.move('player', Direction.RIGHT);
      } else if (cursors.up.isDown) {
         this.gridEngine.move('player', Direction.UP);
      } else if (cursors.down.isDown) {
         this.gridEngine.move('player', Direction.DOWN);
      } else if (cursors.space.isDown) {
         teleportPlayer({ x: 10, y: 10 });
      }
   }

   public updateTeleportationSpots(): void {
      const playerPosition = this.gridEngine.getPosition('player');
      const teleportationSpots = TELEPORTATION_SPOTS[this.scene.key];

      for (const { x, y, destinationMapName, destinationMapData } of teleportationSpots) {
         if (playerPosition.x === x && playerPosition.y === y) {
            this.scene.start(destinationMapName, destinationMapData);
         }
      }
   }
}
