import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { VerifyRequest } from '../../models/verifyRequest';
import {UserService} from '../../services/user.service';
import { SnackbarAdviceService } from 'src/app/services/snackbar-advice.service';




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
    private _route: ActivatedRoute,
    private _snackbarService: SnackbarAdviceService
  ) { 
    this.status = '';
    this.verifyRequest = new VerifyRequest('','');
        
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let errorSending = +params['errorSending'];

      if(errorSending == 1){
        this.status = 'errorSendingAfterSaving';
        this._snackbarService.showSnackBar("errorSendingAfterSaving", 'error')
      }else if( errorSending == 0){
        this.status = 'sendingSuccess';
        this._snackbarService.showSnackBar('Se ha enviado el email', 'success');
      }
    });
  }

  onSubmit(form:any):void{
    this.status = '';
    this._userService.verifyEmailConfirmation(this.verifyRequest).subscribe(
      response => {
        this.status = response.status != Error ? 'success':'error';
        this._snackbarService.showSnackBar('Se ha confirmado el usuario', 'success') 
      },
      error => {
        this.status = 'error';
        this._snackbarService.showSnackBar(error.error.message, 'error') 
      }
    );
  }

  sendEmail(){
    this.status = '';
    this._userService.sendEmailConfirmation(this.verifyRequest).subscribe(
      response => {
        this.status = response.status != Error ? 'sendingSuccess':'error';
        this._snackbarService.showSnackBar('Se ha enviado el email','success')
        this._router.navigate(['verify-email', '0']);
      },
      error => {
        this._snackbarService.showSnackBar(error.error.message, 'error');
        console.log(error);
        this.status = 'errorSending';
      }
    )
  }
}


