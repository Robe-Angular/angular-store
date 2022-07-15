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
	
	uploadModelImage(files:Array<File>, token: string, modelId: string){

		let urlUploadModelImg = this.url + "uploadModelImage/" + modelId;
		/*
		return new Promise(function(resolve, reject){
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();
			console.log(files);

			-----------------
			Array.from(files).forEach( file => {
				formData.append('file0',file,file.name);
			});
			-----------------
			//O this
			-----------------
			
			for(var i = 0; i < files.length; i++){
				formData.append('file0',files[i]);
			}
			-----------------
			
			console.log(formData);
			
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));

					}else{
						reject(xhr.response);
					}
				}
			}
			
			xhr.open('POST', urlUploadModelImg,true);
			xhr.setRequestHeader('Authorization', token);
			xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
			xhr.send(formData);
		});*/
		const requestXH = new XMLHttpRequest();
		const formData = new FormData();
		requestXH.open('POST',urlUploadModelImg, true);
		requestXH.onreadystatechange = () => {
			if (requestXH.readyState === 4 && requestXH.status === 200) {
			  console.log(requestXH.responseText);
			}
		};
		for (let i = 0; i < files.length; i++) {
			formData.append(files[i].name, files[i])
		}
		requestXH.setRequestHeader('Authorization', token);
		requestXH.send(formData);
	}

}