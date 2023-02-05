import { expect, test } from 'vitest';
import { TELEPORTATION_SPOTS } from './teleportationSpots';

test('all teleportation spots have a destinationMapName different from the key of the scene', () => {
   for (const [key, teleportationSpots] of Object.entries(TELEPORTATION_SPOTS)) {
      for (const { destinationMapName } of teleportationSpots) {
         expect(destinationMapName).not.toBe(key);
      }
   }
});
