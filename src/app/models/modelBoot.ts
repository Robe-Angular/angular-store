export class ModelBoot{
	constructor(
		public _id: string = '',
        public description: string = '',
        public title: string = '',
        public color: string = '', 
        public price: number = 0,  
        public mainImage: string = '', 
        public images: Array<string> = [], 
        public keyWords: Array<string> = [],
        public minSize: number = 0,
        public maxSize: number = 0

	){}
}