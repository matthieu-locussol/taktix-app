import { makeAutoObservable } from 'mobx';

export class LoginStore {
   public input: string = '';

   public errorMessage: string = '';

   constructor() {
      makeAutoObservable(this);
   }

   setInput(input: string) {
      this.input = input;
   }

   setErrorMessage(errorMessage: string) {
      this.input = errorMessage;
   }
}
