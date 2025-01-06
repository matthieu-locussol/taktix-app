import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { TimeMgt } from './timeMgt.ts';

describe('TimeMgt', () => {
   describe('wait', () => {
      beforeEach(() => {
         vi.useFakeTimers();
      });

      afterEach(() => {
         vi.useRealTimers();
      });

      it('should wait for the exact specified duration using mocked time', async () => {
         const expectedDuration = 100;
         const waitPromise = TimeMgt.wait(expectedDuration);

         vi.advanceTimersByTime(expectedDuration);

         await waitPromise;

         expect(true).toBe(true);
      });

      it('should not resolve before the specified duration', async () => {
         const expectedDuration = 100;
         let resolved = false;

         const waitPromise = TimeMgt.wait(expectedDuration).then(() => {
            resolved = true;
         });

         vi.advanceTimersByTime(expectedDuration - 1);
         await Promise.resolve();

         expect(resolved).toBe(false);

         vi.advanceTimersByTime(1);
         await waitPromise;

         expect(resolved).toBe(true);
      });
   });
});
