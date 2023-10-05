import { makeAutoObservable } from 'mobx';

export class LoginStore {
   public username: string = '';

   public password: string = '';

   public errorMessage: string = '';

   public serverOnline: boolean = false;

   public loggedIn: boolean = false;

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
      this.errorMessage = errorMessage;
   }

   setServerOnline(serverOnline: boolean) {
      this.serverOnline = serverOnline;
   }

   setLoggedIn(loggedIn: boolean) {
      this.loggedIn = loggedIn;
   }

   setLoading(loading: boolean) {
      this.loading = loading;
   }

   get canLogin() {
      return this.username !== '' && this.password !== '';
   }
}
