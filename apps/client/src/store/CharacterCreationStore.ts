import { makeAutoObservable } from 'mobx';
import { TranslationKey } from 'shared/src/data/translations';
import { ProfessionType } from 'shared/src/types/Profession';

export class CharacterCreationStore {
   public errorMessage: TranslationKey | '' = '';

   public errorMessageOptions: Record<string, string> = {};

   public name: string = '';

   public profession: ProfessionType = ProfessionType.Warrior;

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
}
