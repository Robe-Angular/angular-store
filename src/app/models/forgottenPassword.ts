export class ForgottenPassword {
    constructor(
      public email:string,
      public recoveryPasswordCode:string,//name important to send to Backend
      public newPassword:string,
      public passwordConfirmation:string
    ){}
}//Class for send request body