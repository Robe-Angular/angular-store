import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { CategoryKeyWord } from '../models/categoryKeyWord';

@Injectable({
  providedIn: 'root'
})
export class KeywordServiceService {
  public url: string;

	constructor(
		public _http: HttpClient,
        
	){
		this.url = global.url;
	}
  getCategories(page:number,token:string):Observable<any>{
    let headers = new HttpHeaders().set('content-Type', 'application/json')
            .set('Authorization', token);

		return this._http.get(this.url+'categories/'+page, {headers: headers});
  }

  createCategory(newCategoryKeyWord:CategoryKeyWord, token:string){
    let params = JSON.stringify(newCategoryKeyWord);
    let headers = new HttpHeaders().set('content-Type', 'application/json')
            .set('Authorization', token);

		return this._http.post(this.url+'createCategory',params, {headers: headers});
  }
}
