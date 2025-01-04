import { describe, expect, it } from 'vitest';

import { hashPassword } from './hashPassword.ts';

describe('hashPassword', () => {
   it('should hash the password', async () => {
      const password = 'password';
      const hashedPassword = await hashPassword(password);

      expect(hashedPassword).toBe(
         '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
      );
   });
});
