import { describe, expect, it } from 'vitest';
import { TELEPORTATION_SPOTS } from './teleportationSpots';

describe('teleportationSpots', () => {
   it('all teleportation spots have a destinationMapName different from the key of the scene', () => {
      for (const [key, teleportationSpots] of Object.entries(TELEPORTATION_SPOTS)) {
         for (const { destinationMapName } of teleportationSpots) {
            expect(destinationMapName).not.toBe(key);
         }
      }
   });

   it('AAA_Initial map has no teleportation spots', () => {
      expect(TELEPORTATION_SPOTS.AAA_InitialRoom).toEqual([]);
   });
});
