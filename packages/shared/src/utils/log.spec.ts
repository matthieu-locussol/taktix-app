import { describe, expect, it, vi } from 'vitest';
import { log } from './log';

describe('log', () => {
   const spy = vi.spyOn(console, 'log').mockImplementation(() => {});

   it('should not log in production mode', () => {
      process.env.NODE_ENV = 'production';
      log('should not be displayed');
      expect(spy).not.toHaveBeenCalled();
   });

   it('should log in development mode', () => {
      process.env.NODE_ENV = 'development';
      log('should be displayed');
      expect(spy).toHaveBeenCalled();
   });
});
