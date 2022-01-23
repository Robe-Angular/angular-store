export class VerifyRequest {
    constructor(
      public email:string,
      public confirmationCode: string
    ){}
}