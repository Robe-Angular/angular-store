import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AdminGuard implements CanActivate{

	constructor(
		private _router: Router,
		private _userService: UserService
 	){}

 	canActivate(){
		let identity = this._userService.getIdentity();

		if(identity && identity.user.name && identity.user.role == 'ROLE_ADMIN'){
            
			return true;
		}else{
            console.log(identity);
			this._router.navigate(['/']);
			return false;
		}
	}
}