import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ForgottenPassword } from '../models/forgottenPassword';
import { VerifyRequest } from '../models/verifyRequest';
import { global } from './global';

@Injectable()
export class UserService{
	public url: string;
	public identity:any;
	public token:any;

	constructor(
		public _http: HttpClient
	){
		this.url = global.url;
        this.identity = null;
        this.token = null;
	}
	
	register(user:User):Observable<any>{
		let params = JSON.stringify(user);

		let headers = new HttpHeaders().set('content-Type', 'application/json');

		return this._http.post(this.url+'register', params, {headers: headers});
	}
    
    signup(user:User, gettoken:any = null):Observable<any>{
		if(gettoken != null){
			user.gettoken = gettoken;
		}
		let params = JSON.stringify(user);
		
		let headers = new HttpHeaders().set('content-Type','application/json');
		
		return this._http.post(this.url + 'login', params, {headers:headers});
	}

	verifyEmailConfirmation(verifyRequest:VerifyRequest):Observable<any>{
		let params = JSON.stringify(verifyRequest);
		let headers = new HttpHeaders().set('content-Type','application/json');
		return this._http.post(this.url + 'confirm', params, {headers: headers});
	}

	sendEmailConfirmation(verifyRequest:VerifyRequest):Observable<any>{
		let params = JSON.stringify(verifyRequest);
		let headers = new HttpHeaders().set('content-Type','application/json');
		return this._http.post(this.url + 'trySendConfirmation', params, {headers: headers});
	}
	sendEmailForgotten(email:ForgottenPassword):Observable<any>{
		let params = JSON.stringify(email);
		let headers = new HttpHeaders().set('content-Type','application/json');
		return this._http.post(this.url + 'recover', params, {headers: headers});
	}

	resetPassword(resetObject:ForgottenPassword):Observable<any>{
		let params = JSON.stringify(resetObject);
		let headers = new HttpHeaders().set('content-Type','application/json');
		return this._http.post(this.url + 'reset', params, {headers: headers});
	}

	update(token:string, user:any):Observable<any>{
		let json = JSON.stringify(user);
		let params = "json="+ encodeURIComponent(json);
		

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', token);

		return this._http.put(this.url + 'user/update', params, {headers: headers});
	}


	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('identity') as string);
		if(identity && identity != "undefined"){
			this.identity = identity;
		}else{
			this.identity = '';
		}

		return this.identity;
	}

	getToken(){
		let token = JSON.parse(localStorage.getItem('token') as string);

		if(token != 'undefined'){
			this.token = token;
		}else{
			this.token = '';
		}

		return this.token;
	}
	
	getUser(id:any):Observable<any>{
		let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
		return this._http.get(this.url + 'user/detail/' + id, {headers: headers});
	}
}