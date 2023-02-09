import { Direction, GridEngine, Position } from 'grid-engine';
import { ClientPacket } from 'shared';
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
      const player = this.createPlayer();

      const offsetX = (78 - store.characterStore.name.length * 10) / 2;
      const playerName = this.add.text(offsetX, -8, store.characterStore.name, { align: 'center' });
      const container = this.add.container(0, 0, [playerName, player]);

      const gridEngineConfig = {
         characters: [
            {
               id: 'player',
               sprite: player,
               walkingAnimationMapping: 6,
               startPosition: this.entrancePosition,
               charLayer: 'player',
               container,
            },
         ],
      };

      this.cameras.main.startFollow(container, true);
      this.cameras.main.setFollowOffset(-container.width, -container.height);

      this.gridEngine.create(tilemap, gridEngineConfig);
      this.gridEngine.turnTowards('player', this.entranceDirection);

      this.sendChangeMapSocket(this.entrancePosition);

      this.gridEngine.positionChangeFinished().subscribe((entity) => {
         if (this.sys.isVisible()) {
            this.sendMoveSocket(entity.charId);
         }
      });

      store.characterStore.players.forEach(({ name, posX, posY }) => {
         this.addExternalPlayer(name, { x: posX, y: posY });
      });
   }

   public createPlayer(): Phaser.GameObjects.Sprite {
      const playerSprite = this.add.sprite(0, 0, 'player');
      playerSprite.setDepth(3);
      playerSprite.scale = 3;
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

   public sendMoveSocket(entityId: string): void {
      const position = this.gridEngine.getPosition(entityId);

      const packet: ClientPacket = {
         type: 'message',
         packet: {
            type: 'move',
            data: {
               posX: position.x,
               posY: position.y,
            },
         },
      };

      if (store.socket !== null && store.socket.readyState === store.socket.OPEN) {
         store.socket.send(JSON.stringify(packet));
      }
   }

   public sendChangeMapSocket(position: Position): void {
      const packet: ClientPacket = {
         type: 'message',
         packet: {
            type: 'changeMap',
            data: {
               map: this.scene.key,
               x: position.x,
               y: position.y,
            },
         },
      };

      if (store.socket !== null && store.socket.readyState === store.socket.OPEN) {
         store.socket.send(JSON.stringify(packet));
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

   public addExternalPlayer(name: string, position: Position): void {
      const externalPlayerSprite = this.add.sprite(0, 0, 'player');
      externalPlayerSprite.setDepth(3);
      externalPlayerSprite.scale = 3;

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
      this.gridEngine.removeCharacter(name);
      const sprite = this.playersSprites.get(name);
      sprite?.destroy();
   }

   public moveExternalPlayer(name: string, x: number, y: number): void {
      this.gridEngine.moveTo(name, { x, y });
   }
}
