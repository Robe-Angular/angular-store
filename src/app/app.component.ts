import { ChangeDetectorRef,Component, OnInit, DoCheck, AfterViewChecked } from '@angular/core';
import { UserService } from './services/user.service';
import { LoadingService } from './services/loading.service';

import { global } from  './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck, AfterViewChecked{
  
  	public identity:any;
  	public token:any;
  	public url;
  	title = 'client-store';
	loading$ = this.loader.loading$;

  	constructor(
		private _userService: UserService,
		public loader: LoadingService,
		private _changeDetector: ChangeDetectorRef
	){
		this.loadUser();
		this.url = global.url;
	}
	ngAfterViewChecked(): void {  
		this._changeDetector.detectChanges();
	}
	ngOnInit(){
		
	}

	ngDoCheck(){
		this.loadUser();
	}

  	loadUser(){
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();		
	}

}
