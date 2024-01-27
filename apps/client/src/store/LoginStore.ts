import { makeAutoObservable } from 'mobx';

export class LoginStore {
   public username: string = '';

   public password: string = '';

   public errorMessage: string = '';

   public successMessage: string = '';

   public loading: boolean = false;

   public memorizeCredentials: boolean = false;

   public openMemorizeCredentials: boolean = false;

   constructor() {
      makeAutoObservable(this);

      this.loadCredentials();
   }

   private loadCredentials() {
      const saveCredentials = localStorage.getItem('saveCredentials');

      if (saveCredentials) {
         this.memorizeCredentials = true;

         const username = localStorage.getItem('username') ?? '';
         const password = localStorage.getItem('password') ?? '';

         this.setUsername(username);
         this.setPassword(password);
      }
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

   setMemorizeCredentials(memorizeCredentials: boolean) {
      this.memorizeCredentials = memorizeCredentials;

      if (memorizeCredentials) {
         this.setOpenMemorizeCredentials(true);
      } else {
         localStorage.removeItem('saveCredentials');
         localStorage.removeItem('username');
         localStorage.removeItem('password');
      }
   }

   setOpenMemorizeCredentials(openMemorizeCredentials: boolean) {
      this.openMemorizeCredentials = openMemorizeCredentials;
   }

   saveCredentials() {
      this.setOpenMemorizeCredentials(false);
      localStorage.setItem('saveCredentials', 'true');
   }

   cancelSaveCredentials() {
      this.setMemorizeCredentials(false);
      this.setOpenMemorizeCredentials(false);
      localStorage.removeItem('saveCredentials');
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
