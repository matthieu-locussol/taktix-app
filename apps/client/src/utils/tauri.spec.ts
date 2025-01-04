import { describe, expect, it } from 'vitest';

import { isTauri } from './tauri.ts';

describe('tauri', () => {
   describe('isTauri', () => {
      it('should be false', () => {
         window.__TAURI__ = undefined as unknown as typeof window.__TAURI__;
         expect(isTauri()).toBeFalsy();
      });

      it('should be true', () => {
         window.__TAURI__ = { convertFileSrc: () => '' };
         expect(isTauri()).toBeTruthy();
      });
   });
});
