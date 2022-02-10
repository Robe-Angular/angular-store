export class ModelBoot{
	constructor(
		public _id: string = '',
        description: string = '',
        title: string = '',
        color: string = '',
        price: number = 0,
        mainImage: string = '',
        images: Array<string> = [],
        keyWords: Array<string> = []
	){}
}