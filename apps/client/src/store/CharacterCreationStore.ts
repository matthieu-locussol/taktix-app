import { makeAutoObservable } from 'mobx';

export class CharacterCreationStore {
   public errorMessage: string = '';

   public successMessage: string = '';

   public name: string = '';

   public loading: boolean = false;

   constructor() {
      makeAutoObservable(this);
   }

   setName(name: string) {
      this.name = name;
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
      this.loading = false;
   }

   get canSubmit() {
      return this.name !== '' && !this.loading;
   }
}
