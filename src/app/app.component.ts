import { ChangeDetectorRef,Component, OnInit, DoCheck, AfterViewChecked } from '@angular/core';
import { UserService } from './services/user.service';
import { LoadingService } from './services/loading.service';
import { global } from  './services/global';

import { CreateModelBootComponent } from './components/create-model-boot/create-model-boot.component';
import { ModelsBootComponent } from './components/models-boot/models-boot.component';


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
	public createModelBootFeedback: string;
  	title = 'client-store';
	loading$ = this.loader.loading$;

  	constructor(
		private _userService: UserService,
		public loader: LoadingService,
		private _changeDetector: ChangeDetectorRef
	){
		this.loadUser();
		this.url = global.url;
		this.createModelBootFeedback = '';
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

	receiveMessage($event:any){
		if(($event instanceof CreateModelBootComponent)){
			const child : CreateModelBootComponent = $event;
			child.messageEvent.subscribe( value => {
				this.createModelBootFeedback = value;
			},error => {
				console.log(error);
			});
		}else if($event instanceof ModelsBootComponent){
			$event.parentFeedback(this.createModelBootFeedback);
		}
	}

	reset($event:any){
		if($event instanceof ModelsBootComponent){
			this.createModelBootFeedback = '';
			$event.createModelStatus = '';
		}
		
	}

}
