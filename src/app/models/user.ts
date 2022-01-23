export class User{
	constructor(
		public id: number,
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