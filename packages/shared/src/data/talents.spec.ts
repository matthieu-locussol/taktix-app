import { describe, expect, it } from 'vitest';

import { getTalents } from './talents';

describe('talents', () => {
   const nodesIds = Object.values(getTalents()).map(({ id }) => id);

   it.each(Object.values(getTalents()))('Talent $id should be well-defined', ({ edges }) => {
      for (const edge of edges) {
         expect(nodesIds).toContain(edge);
      }
   });
});
