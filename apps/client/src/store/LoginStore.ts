import { makeAutoObservable } from 'mobx';

export type Mode = 'login' | 'register' | 'characterSelection' | 'characterCreation';

export class LoginStore {
   public email: string = '';

   public username: string = '';

   public password: string = '';

   public errorMessage: string = '';

   public successMessage: string = '';

   public serverOnline: boolean = false;

   public loggedIn: boolean = false;

   public loading: boolean = false;

   public mode: Mode = 'login';

   public characters: { name: string }[] = [];

   public selectedCharacter: string = '';

   public characterName: string = '';

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

   setMode(mode: Mode) {
      this.mode = mode;
   }

   setCharacters(characters: { name: string }[]) {
      this.characters = characters;
   }

   setSelectedCharacter(selectedCharacter: string) {
      this.selectedCharacter = selectedCharacter;
   }

   setCharacterName(characterName: string) {
      this.characterName = characterName;
   }

   reset() {
      this.setEmail('');
      this.setUsername('');
      this.setPassword('');
      this.setErrorMessage('');
      this.setSuccessMessage('');
      this.setLoading(false);
   }

   get canLogin() {
      return this.username !== '' && this.password !== '';
   }

   get canRegister() {
      return this.email !== '' && this.username !== '' && this.password !== '';
   }

   get canCreateCharacter() {
      return this.characterName !== '';
   }

   get currentPage() {
      return this.mode === 'login' ? 'Log In' : 'Register';
   }

   get otherPage() {
      return this.mode === 'login' ? 'Register' : 'Log In';
   }
}
