import { Scene } from '../Scene';

export class AAA_InitialScene extends Scene {
   constructor() {
      super('AAA_InitialRoom');
   }

   public loadAssets(): void {
      this.load.audio('AAA_Initial_music', '/assets/musics/Menu.mp3');
      this.load.spritesheet('player', '/assets/characters/characters.png', {
         frameWidth: 26,
         frameHeight: 36,
      });
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('AAA_Initial_music', { loop: true, volume: 0.05 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap();
      return this.tilemap;
   }
}
