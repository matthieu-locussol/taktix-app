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

   describe('toUpperCaseFirst', () => {
      it('should return the string with the first character in uppercase', () => {
         const strings = ['user', 'User', 'USER', '123user', 'user123', 'user_123', 'user-123'];
         const expectedResults = [
            'User',
            'User',
            'USER',
            '123user',
            'User123',
            'User_123',
            'User-123',
         ];

         const results = strings.map((str) => StringMgt.toUpperCaseFirst(str));

         results.forEach((result, index) => expect(result).toBe(expectedResults[index]));
      });
   });
});
