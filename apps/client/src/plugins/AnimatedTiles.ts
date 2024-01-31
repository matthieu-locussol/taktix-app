import { _assert } from 'shared/src/utils/_assert';

export interface Animation {
   tileid: number;
   duration: number;
}

export interface AnimatedTileData {
   currentFrame: number;
   frames: any[];
   index: number;
   next: number;
   rate: number;
   tiles: Phaser.Tilemaps.Tile[][];
}

export interface AnimatedTile {
   map: Phaser.Tilemaps.Tilemap;
   animatedTiles: AnimatedTileData[];
   active: boolean;
   rate: number;
   activeLayer: boolean[];
}

export class AnimatedTiles extends Phaser.Plugins.ScenePlugin {
   map: any;

   animatedTiles: AnimatedTile[];

   rate: number;

   active: boolean;

   activeLayer: boolean[];

   followTimeScale: boolean;

   constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
      super(scene, pluginManager, 'animatedTiles');

      this.map = null;

      this.animatedTiles = [];

      this.rate = 1;

      this.active = false;

      this.activeLayer = [];

      this.followTimeScale = true;

      if (!scene.sys.settings.isBooted) {
         scene.sys.events.once('boot', this.boot, this);
      }
   }

   boot() {
      if (this.systems !== null) {
         const eventEmitter = this.systems.events;
         eventEmitter.on('postupdate', this.postUpdate, this);
         eventEmitter.on('shutdown', this.shutdown, this);
         eventEmitter.on('destroy', this.destroy, this);
      }
   }

   init(map: Phaser.Tilemaps.Tilemap) {
      const mapAnimData = this.getAnimatedTiles(map);
      const animatedTiles: AnimatedTile = {
         map,
         animatedTiles: mapAnimData,
         active: true,
         rate: 1,
         activeLayer: [],
      };

      map.layers.forEach(() => animatedTiles.activeLayer.push(true));
      this.animatedTiles.push(animatedTiles);

      if (this.animatedTiles.length === 1) {
         this.active = true;
      }
   }

   setRate(rate: number, gid: number | null = null, mapIndex: number | null = null) {
      if (gid === null) {
         if (mapIndex === null) {
            this.rate = rate;
         } else {
            this.animatedTiles[mapIndex].rate = rate;
         }
      } else {
         const loopThrough = (animatedTiles: AnimatedTileData[]) => {
            animatedTiles.forEach((animatedTile) => {
               if (animatedTile.index === gid) {
                  animatedTile.rate = rate;
               }
            });
         };

         if (mapIndex === null) {
            this.animatedTiles.forEach((animatedTiles) => {
               loopThrough(animatedTiles.animatedTiles);
            });
         } else {
            loopThrough(this.animatedTiles[mapIndex].animatedTiles);
         }
      }
   }

   resetRates(mapIndex: number | null = null) {
      if (mapIndex === null) {
         this.rate = 1;
         this.animatedTiles.forEach((mapAnimData) => {
            mapAnimData.rate = 1;
            mapAnimData.animatedTiles.forEach((tileAnimData) => {
               tileAnimData.rate = 1;
            });
         });
      } else {
         this.animatedTiles[mapIndex].rate = 1;
         this.animatedTiles[mapIndex].animatedTiles.forEach((tileAnimData) => {
            tileAnimData.rate = 1;
         });
      }
   }

   resume(layerIndex: number | null = null) {
      const scope = this;

      if (layerIndex === null) {
         scope.active = true;
      } else {
         scope.activeLayer[layerIndex] = true;
      }
   }

   // Stop (or pause) animations
   pause(layerIndex: number | null = null, mapIndex: number | null = null) {
      const scope = mapIndex === null ? this : this.animatedTiles[mapIndex];

      if (layerIndex === null) {
         scope.active = false;
      } else {
         scope.activeLayer[layerIndex] = false;
      }
   }

   postUpdate(_time: number, delta: number) {
      if (!this.active) {
         return;
      }

      if (!this.scene) {
         return;
      }

      const globalElapsedTime =
         delta * this.rate * (this.followTimeScale ? this.scene.time.timeScale : 1);
      this.animatedTiles.forEach((mapAnimData) => {
         if (!mapAnimData.active) {
            return;
         }

         const elapsedTime = globalElapsedTime * mapAnimData.rate;

         mapAnimData.animatedTiles.forEach((animatedTile) => {
            animatedTile.next -= elapsedTime * animatedTile.rate;

            if (animatedTile.next < 0) {
               const currentIndex = animatedTile.currentFrame;
               const oldTileId = animatedTile.frames[currentIndex]?.tileid;

               if (!oldTileId) {
                  return;
               }

               let newIndex = currentIndex + 1;
               if (newIndex > animatedTile.frames.length - 1) {
                  newIndex = 0;
               }

               animatedTile.next = animatedTile.frames[newIndex].duration;
               animatedTile.currentFrame = newIndex;

               animatedTile.tiles.forEach((layer, layerIndex) => {
                  if (!mapAnimData.activeLayer[layerIndex]) {
                     return;
                  }

                  this.updateLayer(animatedTile, layer, oldTileId);
               });
            }
         });
      });
   }

   updateLayer(
      animatedTile: AnimatedTileData,
      layer: Phaser.Tilemaps.Tile[],
      oldTileId: number = -1,
   ) {
      const tilesToRemove: Phaser.Tilemaps.Tile[] = [];
      const tileId = animatedTile.frames[animatedTile.currentFrame].tileid;

      layer.forEach((tile) => {
         if (oldTileId > -1 && (tile === null || tile.index !== oldTileId)) {
            tilesToRemove.push(tile);
         } else {
            tile.index = tileId;
         }
      });

      tilesToRemove.forEach((tile) => {
         const pos = layer.indexOf(tile);

         if (pos > -1) {
            layer.splice(pos, 1);
         } else {
            console.error(
               "This shouldn't happen. Not at all. Blame Phaser Animated Tiles plugin. You'll be fine though.",
            );
         }
      });
   }

   //  Called when a Scene shuts down, it may then come back again later (which will invoke the 'start' event) but should be considered dormant.
   shutdown() {
      // dercetech@github: this fixes a memory leak; a ref to all tiles in a scene would be retained in spite of switching scenes.
      this.animatedTiles.length = 0;
   }

   //  Called when a Scene is destroyed by the Scene Manager. There is no coming back from a destroyed Scene, so clear up all resources here.
   destroy() {
      this.shutdown();
      this.scene = null;
   }

   getAnimatedTiles(map: Phaser.Tilemaps.Tilemap) {
      // this.animatedTiles is an array of objects with information on how to animate and which tiles.
      const animatedTiles: AnimatedTileData[] = [];
      // loop through all tilesets
      map.tilesets.forEach(
         // Go through the data stored on each tile (not tile on the tilemap but tile in the tileset)
         (tileset) => {
            const { tileData } = tileset;
            Object.keys(tileData).forEach((indexStr) => {
               const index = parseInt(indexStr, 10);
               const tileDataObject = (tileData as Record<number, Object>)[index];

               if (Object.prototype.hasOwnProperty.call(tileDataObject, 'animation')) {
                  const animatedTileData: AnimatedTileData = {
                     index: index + tileset.firstgid,
                     frames: [],
                     currentFrame: 0,
                     tiles: [],
                     rate: 1,
                     next: 0,
                  };

                  if ('animation' in tileDataObject) {
                     (tileDataObject.animation as Animation[]).forEach((frameData) => {
                        const frame = {
                           duration: frameData.duration,
                           tileid: frameData.tileid + tileset.firstgid,
                        };
                        animatedTileData.frames.push(frame);
                     });
                  }

                  animatedTileData.next = animatedTileData.frames[0].duration;
                  animatedTileData.currentFrame = animatedTileData.frames.findIndex(
                     (f) => f.tileid === index + tileset.firstgid,
                  );

                  map.layers.forEach((layer) => {
                     if (layer.tilemapLayer && layer.tilemapLayer.type) {
                        if (layer.tilemapLayer.type === 'StaticTilemapLayer') {
                           animatedTileData.tiles.push([]);
                           return;
                        }
                     }

                     const tiles: Phaser.Tilemaps.Tile[] = [];

                     layer.data.forEach((tileRow) => {
                        tileRow.forEach((tile) => {
                           if (tile && tile.index - tileset.firstgid === index) {
                              tiles.push(tile);
                           }
                        });
                     });

                     animatedTileData.tiles.push(tiles);
                  });

                  animatedTiles.push(animatedTileData);
               }
            });
         },
      );

      map.layers.forEach((_, layerIndex) => {
         this.activeLayer[layerIndex] = true;
      });

      return animatedTiles;
   }

   putTileAt(
      _layer: Phaser.Tilemaps.TilemapLayer,
      _tile: Phaser.Tilemaps.Tile,
      _x: number,
      _y: number,
   ) {}

   updateAnimatedTiles() {
      const x = null;
      const y = null;
      const w = null;
      const h = null;
      let container: AnimatedTile[] | null = null;

      if (container === null) {
         container = [];

         this.animatedTiles.forEach((mapAnimData) => {
            _assert(container, 'container should be defined!');
            container.push(mapAnimData);
         });
      }

      container.forEach((mapAnimData) => {
         const chkX = x !== null ? x : 0;
         const chkY = y !== null ? y : 0;
         const chkW = w !== null ? mapAnimData.map.width : 10;
         const chkH = h !== null ? mapAnimData.map.height : 10;

         mapAnimData.animatedTiles.forEach((tileAnimData) => {
            tileAnimData.tiles.forEach((tiles, layerIndex) => {
               const layer = mapAnimData.map.layers[layerIndex];

               if ('type' in layer && layer.type === 'StaticTilemapLayer') {
                  return;
               }

               for (let i = chkX; i < chkX + chkW; i += 1) {
                  for (let j = chkY; j < chkY + chkH; j += 1) {
                     const tile = mapAnimData.map.layers[layerIndex].data[i][j];

                     if (tile.index === tileAnimData.index) {
                        if (tiles.indexOf(tile) === -1) {
                           tiles.push(tile);
                        }

                        tile.index = tileAnimData.frames[tileAnimData.currentFrame].tileid;
                     }
                  }
               }
            });
         });
      });
   }
}
