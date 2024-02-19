export const registerInteractiveObjectEvents = (polygon: Phaser.GameObjects.Polygon) => {
   polygon.on(
      `${Phaser.Data.Events.CHANGE_DATA_KEY}hovered`,
      (polygonRef: Phaser.GameObjects.Polygon, value: boolean, previousValue: boolean) => {
         if (value && !previousValue) {
            polygonRef.setFillStyle(0x000000, 0.5);
         } else if (!value && previousValue) {
            polygonRef.setFillStyle(0x000000, 0);
         }
      },
   );
};
