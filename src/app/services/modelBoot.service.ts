import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelBoot } from '../models/modelBoot';
import { global } from './global';

@Injectable()
export class ModelBootService{
	public url: string;

	constructor(
		public _http: HttpClient,
        
	){
		this.url = global.url;
	}
    newModel(modelBoot:ModelBoot,token:string):Observable<any>{
		let params = JSON.stringify(modelBoot);

		let headers = new HttpHeaders().set('content-Type', 'application/json')
            .set('Authorization', token);

		return this._http.post(this.url+'saveModel', params, {headers: headers});
	}

	getModels(page:number = 1, sort:string = ''):Observable<any>{
		let reqUrlSuffix = sort != '' ? page.toString() : page.toString() + '/' + sort;
		console.log(reqUrlSuffix);
		let headers = new HttpHeaders().set('content-Type', 'application/json');
		return this._http.get(this.url + 'getModels/' + reqUrlSuffix, {headers: headers});
	}

	getModelBootSizes(modelBootId:string):Observable<any>{
		
		let headers = new HttpHeaders().set('content-Type', 'application/json');
		return this._http.get(this.url + 'getModel/' + modelBootId , {headers: headers});
	}

	deleteModel(modelId:string, token:string):Observable<any>{	

		let headers = new HttpHeaders().set('content-Type', 'application/json')
            .set('Authorization', token);

		return this._http.delete(this.url+ 'deleteModel/' + modelId , {headers: headers});
	}

	updateModel(modelBoot:ModelBoot, token:string):Observable<any>{
		let params = JSON.stringify(modelBoot);

		let headers = new HttpHeaders().set('content-Type', 'application/json')
            .set('Authorization', token);

		return this._http.post(this.url+'updateModel/' + modelBoot._id , params, {headers: headers});
	}

}