import { expect, it } from 'vitest';
import { TELEPORTATION_SPOTS } from './teleportationSpots';

it('all teleportation spots have a destinationMapName different from the key of the scene', () => {
   for (const [key, teleportationSpots] of Object.entries(TELEPORTATION_SPOTS)) {
      for (const { destinationMapName } of teleportationSpots) {
         expect(destinationMapName).not.toBe(key);
      }
   }
});
