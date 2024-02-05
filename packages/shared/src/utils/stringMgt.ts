export namespace StringMgt {
   export const isCharacterNameValid = (characterName: string): boolean =>
      /^[a-zA-Z0-9_-]{2,15}$/.test(characterName);
}
