export class User{
	constructor(
		public id: string,
        public nick: string,
		public name: string,
		public lastName: string,
        public email:string,
        public password: string,
		public role: string,	
		public telephone: string,
		public gettoken: any
	){}
}