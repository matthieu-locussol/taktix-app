import { describe, expect, it } from 'vitest';
import { isTauri } from './tauri';

describe('isTauri', () => {
   it('should be false', () => {
      window.__TAURI__ = undefined;
      expect(isTauri()).toBeFalsy();
   });

   it('should be true', () => {
      window.__TAURI__ = 'value';
      expect(isTauri()).toBeTruthy();
   });
});
