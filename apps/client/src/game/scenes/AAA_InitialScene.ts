import { CHARACTER_HEIGHT, CHARACTER_WIDTH, Scene } from '../Scene';

export class AAA_InitialScene extends Scene {
   constructor() {
      super('AAA_InitialRoom');
   }

   public loadAssets(): void {
      this.load.audio('AAA_Initial_music', '/assets/musics/Menu.mp3');
      this.load.spritesheet('PlayerSpritesheet', '/assets/characters/characters.png', {
         frameWidth: CHARACTER_WIDTH,
         frameHeight: CHARACTER_HEIGHT,
      });
   }

   public unloadAssets(): void {
      this.sound.removeByKey('AAA_Initial_music');
   }

   public createTilemap(): Phaser.Tilemaps.Tilemap {
      this.sound.stopAll();
      this.sound.play('AAA_Initial_music', { loop: true, volume: 0.2 });
      this.sound.pauseOnBlur = false;

      this.tilemap = this.make.tilemap();
      return this.tilemap;
   }
}
