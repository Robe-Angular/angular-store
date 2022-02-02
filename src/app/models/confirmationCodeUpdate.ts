export class ConfirmationCodeUpdate {
    constructor(
      public password:string,
      public confirmationCode:string
    ){}
}//Class for send request body