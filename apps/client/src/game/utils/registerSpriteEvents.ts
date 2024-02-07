import { SpriteType } from '../../utils/spriteType';

export const registerSpriteEvents = (sprite: Phaser.GameObjects.Sprite) => {
   if (sprite.getData('type') === SpriteType.Character) {
      sprite.on(
         `${Phaser.Data.Events.CHANGE_DATA_KEY}hovered`,
         (spriteRef: Phaser.GameObjects.Sprite, value: boolean, previousValue: boolean) => {
            if (value && !previousValue) {
               spriteRef.setTint(0x94a3b8);
            } else if (!value && previousValue) {
               spriteRef.clearTint();
            }
         },
      );
   }
};
