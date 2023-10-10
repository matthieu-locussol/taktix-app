import { makeAutoObservable } from 'mobx';

export class LoginStore {
   public username: string = '';

   public password: string = '';

   public errorMessage: string = '';

   public successMessage: string = '';

   public loading: boolean = false;

   constructor() {
      makeAutoObservable(this);
   }

   setUsername(username: string) {
      this.username = username;
   }

   setPassword(password: string) {
      this.password = password;
   }

   setErrorMessage(errorMessage: string) {
      this.successMessage = '';
      this.errorMessage = errorMessage;
   }

   setSuccessMessage(successMessage: string) {
      this.errorMessage = '';
      this.successMessage = successMessage;
   }

   setLoading(loading: boolean) {
      this.loading = loading;
   }

   reset() {
      this.setUsername('');
      this.setPassword('');
      this.setErrorMessage('');
      this.setSuccessMessage('');
      this.setLoading(false);
   }

   get canSubmit() {
      return this.username !== '' && this.password !== '' && !this.loading;
   }
}
