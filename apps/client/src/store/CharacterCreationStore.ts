import { makeAutoObservable } from 'mobx';
import { ProfessionType } from 'shared/src/types/Profession';

export class CharacterCreationStore {
   public errorMessage: string = '';

   public successMessage: string = '';

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

   setErrorMessage(errorMessage: string) {
      this.successMessage = '';
      this.errorMessage = errorMessage;
   }

   setSuccessMessage(successMessage: string) {
      this.errorMessage = '';
      this.successMessage = successMessage;
   }

   reset() {
      this.errorMessage = '';
      this.successMessage = '';
      this.name = '';
      this.profession = ProfessionType.Warrior;
      this.loading = false;
   }

   get canSubmit() {
      return this.name !== '' && !this.loading;
   }
}
