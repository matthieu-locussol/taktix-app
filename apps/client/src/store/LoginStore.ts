import { makeAutoObservable } from 'mobx';

export class LoginStore {
   public email: string = '';

   public username: string = '';

   public password: string = '';

   public errorMessage: string = '';

   public successMessage: string = '';

   public serverOnline: boolean = false;

   public loggedIn: boolean = false;

   public loading: boolean = false;

   public mode: 'login' | 'register' = 'login';

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

   setServerOnline(serverOnline: boolean) {
      this.serverOnline = serverOnline;
   }

   setLoggedIn(loggedIn: boolean) {
      this.loggedIn = loggedIn;
   }

   setLoading(loading: boolean) {
      this.loading = loading;
   }

   setMode(mode: 'login' | 'register') {
      this.mode = mode;
   }

   switchPage() {
      this.setMode(this.mode === 'login' ? 'register' : 'login');
   }

   resetFields() {
      this.setEmail('');
      this.setUsername('');
      this.setPassword('');
   }

   get canLogin() {
      return this.username !== '' && this.password !== '';
   }

   get canRegister() {
      return this.email !== '' && this.username !== '' && this.password !== '';
   }

   get currentPage() {
      return this.mode === 'login' ? 'Log In' : 'Register';
   }

   get otherPage() {
      return this.mode === 'login' ? 'Register' : 'Log In';
   }
}
