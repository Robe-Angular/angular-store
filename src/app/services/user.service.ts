import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ForgottenPassword } from '../models/forgottenPassword';
import { VerifyRequest } from '../models/verifyRequest';
import{ ConfirmationCodeUpdate } from '../models/confirmationCodeUpdate'
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

	getConsumerData(consumerId: string,token:string):Observable<any>{
		
		let params = consumerId;
		let headers = new HttpHeaders().set('content-Type','application/json')
			.set('Authorization', token);
		return this._http.get(this.url + 'user/' + params, {headers: headers});
	}

	update(token:string, user:any, userId:string):Observable<any>{
		let params = JSON.stringify(user);		
		
		let headers = new HttpHeaders().set('content-Type', 'application/json')
			.set('Authorization', token);

		return this._http.put(this.url + 'update/' + userId , params, {headers: headers});
	}

	confirmEmailUpdate(token:string, confirmationCode:ConfirmationCodeUpdate):Observable<any>{
		let params = JSON.stringify(confirmationCode);
		
		
		let headers = new HttpHeaders().set('content-Type', 'application/json')
			.set('Authorization', token);

		return this._http.post(this.url + 'changeEmail', params, {headers: headers});
	}

	getUsers(page:number,sort:string, token:string):Observable<any>{
		let headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded')
			.set('Authorization', token);

		
		let pageString = page.toString()
		let requestString = '';
		requestString = sort == '' ? this.url + 'users/' + pageString : this.url + 'users/' + pageString + '/' + sort;
		return this._http.get(requestString, {headers: headers});
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

	
}