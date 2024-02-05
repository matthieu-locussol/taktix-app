import { describe, expect, it } from 'vitest';
import { StringMgt } from './stringMgt';

describe('stringMgt', () => {
   describe('isCharacterNameValid', () => {
      it('should return true for valid character names', () => {
         const validCharacterNames = ['user', 'user123', 'user_123', 'user-123', '_user', '-user'];
         const results = validCharacterNames.map((characterName) =>
            StringMgt.isCharacterNameValid(characterName),
         );
         results.forEach((result) => expect(result).toBe(true));
      });

      it('should return false for invalid character names', () => {
         const invalidCharacterNames = ['user 123', 'user123456789012345'];
         const results = invalidCharacterNames.map((characterName) =>
            StringMgt.isCharacterNameValid(characterName),
         );
         results.forEach((result) => expect(result).toBe(false));
      });
   });
});
