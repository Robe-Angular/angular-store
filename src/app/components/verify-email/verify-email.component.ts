import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { VerifyRequest } from '../../models/verifyRequest';
import {UserService} from '../../services/user.service';




@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {  

  public status:string;
  public verifyRequest: VerifyRequest;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute

  ) { 
    this.status = '';
    this.verifyRequest = new VerifyRequest('','');
        
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let errorSending = +params['errorSending'];

      if(errorSending == 1){
        this.status = 'errorSendingAfterSaving';
      }else if( errorSending == 0){
        this.status = 'sendingSuccess';
      }
    });
  }

  onSubmit(form:any):void{
    this.status = '';
    this._userService.verifyEmailConfirmation(this.verifyRequest).subscribe(
      response => {
        this.status = response.status != Error ? 'success':'error';        
      },
      error => {
        this.status = 'error';
      }
    );
  }

  sendEmail(){
    this.status = '';
    this._userService.sendEmailConfirmation(this.verifyRequest).subscribe(
      response => {
        this.status = response.status != Error ? 'sendingSuccess':'error';

        this._router.navigate(['verify-email', '0']);
      },
      error => {

        this.status = 'errorSending';
      }
    )
  }
}


