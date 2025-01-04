import { describe, expect, it } from 'vitest';

import { TimeMgt } from './timeMgt';

describe('TimeMgt', () => {
   describe('wait', async () => {
      it('should wait for the specified duration', async () => {
         const start = Date.now();

         await TimeMgt.wait(100);
         const end = Date.now();

         expect(end - start).toBeGreaterThanOrEqual(100);
      });
   });
});
