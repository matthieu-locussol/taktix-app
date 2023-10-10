import { makeAutoObservable } from 'mobx';

export class RegisterStore {
   public email: string = '';

   public username: string = '';

   public password: string = '';

   public errorMessage: string = '';

   public successMessage: string = '';

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
      this.email = '';
      this.username = '';
      this.password = '';
      this.errorMessage = '';
      this.successMessage = '';
      this.loading = false;
   }

   get canSubmit() {
      return this.email !== '' && this.username !== '' && this.password !== '' && !this.loading;
   }
}
