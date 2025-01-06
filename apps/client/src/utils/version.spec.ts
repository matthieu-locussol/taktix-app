import { describe, expect, it, vi } from 'vitest';

import { getVersion } from './version';

vi.mock('../../package.json', () => ({
   default: { version: '1.0.0' },
}));

describe('version', () => {
   it('getVersion', () => {
      expect(getVersion()).toBe('v1.0.0');
   });
});
