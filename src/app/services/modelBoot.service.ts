import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelBoot } from '../models/modelBoot';
import { UserService } from './user.service';
import { global } from './global';

@Injectable()
export class ModelBootService{
	public url: string;
	public identity:any;
	public token:any;

	constructor(
		public _http: HttpClient,
        private _userService: UserService
	){
		this.url = global.url;
        this.identity = null;
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
	}
    newModel(modelBoot:ModelBoot):Observable<any>{
		let params = JSON.stringify(modelBoot);

		let headers = new HttpHeaders().set('content-Type', 'application/json')
            .set('Authorization', this.token.token);

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

	deleteModel(modelId:string):Observable<any>{
		

		let headers = new HttpHeaders().set('content-Type', 'application/json')
            .set('Authorization', this.token.token);

		return this._http.delete(this.url+ 'deleteModel/' + modelId , {headers: headers});
	}

	updateModel(modelBoot:ModelBoot):Observable<any>{
		let params = JSON.stringify(modelBoot);

		let headers = new HttpHeaders().set('content-Type', 'application/json')
            .set('Authorization', this.token.token);

		return this._http.post(this.url+'updateModel/' + modelBoot._id , params, {headers: headers});
	}

}