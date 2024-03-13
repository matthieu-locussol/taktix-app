import { describe, expect, it } from 'vitest';
import { TALENTS } from './talents';

describe('talents', () => {
   const nodesIds = Object.values(TALENTS).map(({ id }) => id);

   it.each(Object.values(TALENTS))('Talent $id should be well-defined', ({ edges }) => {
      for (const edge of edges) {
         expect(nodesIds).toContain(edge);
      }
   });
});
