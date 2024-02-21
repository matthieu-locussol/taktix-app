import { makeAutoObservable } from 'mobx';
import { TranslationKey } from 'shared/src/data/translations';

export class RegisterStore {
   public email: string = '';

   public username: string = '';

   public password: string = '';

   public errorMessage: TranslationKey | '' = '';

   public errorMessageOptions: Record<string, string> = {};

   public loading: boolean = false;

   constructor() {
      makeAutoObservable(this);
   }

   setEmail(email: string) {
      this.email = email;
   }

   setUsername(username: string) {
      this.username = username;
   }

   setPassword(password: string) {
      this.password = password;
   }

   setErrorMessage(errorMessage: TranslationKey | '', options: Record<string, string> = {}) {
      this.errorMessage = errorMessage;
      this.errorMessageOptions = options;
   }

   setLoading(loading: boolean) {
      this.loading = loading;
   }

   reset() {
      this.email = '';
      this.username = '';
      this.password = '';
      this.errorMessage = '';
      this.loading = false;
   }

   get canSubmit() {
      return this.email !== '' && this.username !== '' && this.password !== '' && !this.loading;
   }
}
