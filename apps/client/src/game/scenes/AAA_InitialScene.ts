import { Scene } from '../Scene';
import { loadCharactersAssets } from '../utils/loadCharactersAssets';

export class AAA_InitialScene extends Scene {
   constructor() {
      super('AAA_InitialRoom');
   }

   public loadAssets(): void {
      this.load.audio('AAA_Initial_music', '/assets/musics/Menu.mp3');
      loadCharactersAssets(this);
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('AAA_Initial_music', { loop: true, volume: 0.25 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap();
      return this.tilemap;
   }
}
