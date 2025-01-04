import type { CharacterSprite } from 'shared/src/data/charactersSprites';
import type { TranslationKey } from 'shared/src/data/translations';

import { makeAutoObservable } from 'mobx';
import { charactersSprites } from 'shared/src/data/charactersSprites';
import { ProfessionType } from 'shared/src/types/Profession';

export class CharacterCreationStore {
   public errorMessage: TranslationKey | '' = '';

   public errorMessageOptions: Record<string, string> = {};

   public name: string = '';

   public profession: ProfessionType = ProfessionType.Warrior;

   public spritesheet: CharacterSprite = charactersSprites[0];

   public loading: boolean = false;

   constructor() {
      makeAutoObservable(this);
   }

   setName(name: string) {
      this.name = name;
   }

   setProfession(professionType: ProfessionType) {
      this.profession = professionType;
   }

   setNextSpritesheet() {
      const index = charactersSprites.findIndex((sprite) => sprite === this.spritesheet);

      this.spritesheet = charactersSprites[(index + 1) % charactersSprites.length];
   }

   setPreviousSpritesheet() {
      const index = charactersSprites.findIndex((sprite) => sprite === this.spritesheet);

      this.spritesheet =
         charactersSprites[(index - 1 + charactersSprites.length) % charactersSprites.length];
   }

   setLoading(loading: boolean) {
      this.loading = loading;
   }

   setErrorMessage(errorMessage: TranslationKey | '', options: Record<string, string> = {}) {
      this.errorMessage = errorMessage;
      this.errorMessageOptions = options;
   }

   reset() {
      this.errorMessage = '';
      this.name = '';
      this.profession = ProfessionType.Warrior;
      this.loading = false;
   }

   get canSubmit() {
      return this.name !== '' && !this.loading;
   }

   get skinNumber() {
      return charactersSprites.findIndex((sprite) => sprite === this.spritesheet) + 1;
   }
}
