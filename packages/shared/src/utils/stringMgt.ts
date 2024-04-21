import { INTERNAL_PLAYER_NAME } from '../types/Player';

export namespace StringMgt {
   export const isCharacterNameValid = (characterName: string): boolean =>
      /^[a-zA-Z0-9_-]{2,15}$/.test(characterName);

   export const toUpperCaseFirst = (str: string): string =>
      str.charAt(0).toUpperCase() + str.slice(1);

   export const isReservedName = (name: string): boolean => {
      const reservedNames = [
         INTERNAL_PLAYER_NAME,
         'SERVER',
         'ERROR',
         'GENERAL',
         'TRADE',
         'PRIVATE',
         'PLAYER',
         'ADMIN',
         'MODERATOR',
      ].map((name) => name.toLowerCase());

      const lowerCaseName = name.toLowerCase();
      return reservedNames.includes(lowerCaseName);
   };
}
