import { Scene } from '../../Scene';

export class AAA_InitialScene extends Scene {
   constructor() {
      super('AAA_InitialRoom');
   }

   public loadAssets(): void {}

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('AAA_Initial_music', { loop: true, volume: 0.25 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap();

      return this.tilemap;
   }
}
