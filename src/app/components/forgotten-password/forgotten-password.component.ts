import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {UserService} from '../../services/user.service';
import { ForgottenPassword } from '../../models/forgottenPassword'


@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})

export class ForgottenPasswordComponent implements OnInit {

  public status:string;
  public forgottenPassword: ForgottenPassword;
  public resetActivated: Boolean;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute

  ) { 
    this.status = '';
    this.forgottenPassword = new ForgottenPassword('','','','');
    this.resetActivated = false;
  }

  ngOnInit(): void {
  }

  onSubmit(form:any):void{
    if(this.resetActivated){
      this._userService.resetPassword(this.forgottenPassword).subscribe(
        response => {
          if(response.status != Error){
            console.log(response.status);
            this._router.navigate(['/login','reset-success']);
          }else{
            this.status = 'errorResetting';
          }
          
        },error => {
          if(error.error.status == 500){
            this.status = 'serverErrorResetting';
          }else{
            this.status = 'errorResetting';
          }
        }
      );
    }else{
      this.sendEmail();
    }
    
  }
  sendEmail():void{
    this._userService.sendEmailForgotten(this.forgottenPassword).subscribe(
      response => {
        this.status = response.status != Error ? 'sendingSuccess':'error';
        this.resetActivated = response.status != Error ? true:false;
      },
      error => {
        if(error.error.status == 500){
          this.status = 'serverError';
        }else{
          this.status = 'error';
        }
        
      }
    );
  }
}