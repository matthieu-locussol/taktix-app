import { _assertTrue } from 'shared/src/utils/_assert';
import { z } from 'zod';
import { SCALE_FACTOR, Scene } from '../Scene';

const zLightObject = z.object({
   x: z.number(),
   y: z.number(),
   properties: z.object({
      blinking: z.boolean(),
      blinkingDuration: z.number().int(),
      blinkingMaxIntensity: z.number(),
      blinkingMinIntensity: z.number(),
      blinkingSteps: z.number().int(),
      color: z.string().regex(/^#(?:[0-9a-fA-F]{8})$/),
      intensity: z.number(),
      attenuation: z.number(),
      radius: z.number().int(),
      point: z.boolean(),
   }),
});

type LightObject = z.infer<typeof zLightObject>;

const isLightObject = (value: unknown): value is LightObject =>
   zLightObject.safeParse(value).success;

export const makeLight = (scene: Scene, object: Phaser.Types.Tilemaps.TiledObject) => {
   _assertTrue(Array.isArray(object.properties));
   const rawObject = {
      ...object,
      properties: object.properties.reduce(
         (acc, curr) => ({
            ...acc,
            [curr.name]: curr.value,
         }),
         {},
      ),
   };
   _assertTrue(isLightObject(rawObject), JSON.stringify(rawObject));

   const lightObject: LightObject = rawObject;
   const color = Number.parseInt(lightObject.properties.color.replace('#', '0x'), 16);

   const light = lightObject.properties.point
      ? scene.lights
           .addPointLight(
              lightObject.x * SCALE_FACTOR,
              lightObject.y * SCALE_FACTOR,
              color,
              lightObject.properties.radius,
              lightObject.properties.intensity,
              lightObject.properties.attenuation,
           )
           .setDepth(4)
      : scene.lights
           .addLight(
              lightObject.x * SCALE_FACTOR,
              lightObject.y * SCALE_FACTOR,
              lightObject.properties.radius,
              color,
              lightObject.properties.intensity,
           )
           .setVisible(true);

   if (lightObject.properties.blinking) {
      scene.tweens.add({
         targets: light,
         yoyo: true,
         intensity: {
            from: lightObject.properties.blinkingMinIntensity,
            to: lightObject.properties.blinkingMaxIntensity,
         },
         ease: 'Stepped',
         easeParams: [lightObject.properties.blinkingSteps],
         duration: lightObject.properties.blinkingDuration,
         loop: -1,
      });
   }
};
